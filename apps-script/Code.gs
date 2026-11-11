/**
 * SerajUlMaymar · Marriage Bureau receiver (Google Apps Script)
 *
 * Files in this Apps Script project: Code.gs (this file) + Fields.gs (generated, do not edit).
 * Deploy as a Web app: Execute as "Me", Who has access "Anyone".
 * Secrets live in Project Settings > Script properties (TOKEN, NOTIFY_EMAIL, ...), never in this file.
 */

var SHEET_NAME = 'Registrations';
var FOLDER_NAME = 'Marriage Bureau Submissions';
var TZ = 'Asia/Karachi';
var MIN_AGE = 18;
var MAX_AGE = 100;
var MIN_FILL_MS = 8000;            // forms filled faster than this come from bots
var MAX_BODY_CHARS = 6000000;      // whole request (JSON containing base64 PDF and photo)
var MAX_TEXT_LEN = 2000;           // per answer
var MAX_PDF_BYTES = 3 * 1024 * 1024;
var MAX_PHOTO_BYTES = 2 * 1024 * 1024;
var PHONE_COOLDOWN_SEC = 120;      // same phone number: one registration per 2 minutes
var DAILY_CAP = 150;               // accepted registrations per day
var ID_PATTERN = /^MB-[A-Z0-9]{8}$/;
var META_HEADERS = ['Submission ID', 'Received (PKT)', 'Status', 'Staff Notes', 'PDF'];

/* ---------- One-time setup: run this once from the editor ---------- */
function setup() {
  var props = PropertiesService.getScriptProperties();
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  keyFields_(); // throws if Fields.gs is missing a field this script depends on

  props.setProperty('SHEET_ID', ss.getId());
  if (!props.getProperty('TOKEN')) {
    props.setProperty('TOKEN', (Utilities.getUuid() + Utilities.getUuid()).replace(/-/g, ''));
  }
  if (!props.getProperty('NOTIFY_EMAIL')) {
    props.setProperty('NOTIFY_EMAIL', Session.getEffectiveUser().getEmail());
  }
  if (!props.getProperty('FOLDER_ID')) {
    props.setProperty('FOLDER_ID', DriveApp.createFolder(FOLDER_NAME).getId());
  }

  var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  var headers = META_HEADERS.concat(FIELDS.map(function (f) { return f.header; }));
  if (sheet.getMaxColumns() < headers.length) {
    sheet.insertColumnsAfter(sheet.getMaxColumns(), headers.length - sheet.getMaxColumns());
  }
  if (sheet.getLastRow() > 1) {
    var existing = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
    if (existing.join('|') !== headers.join('|')) {
      throw new Error('The sheet already has registrations and its headers differ from Fields.gs. Do not reorder or rename fields after launch.');
    }
  }
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight('bold').setBackground('#F7E3E7');
  sheet.setFrozenRows(1);
  sheet.setFrozenColumns(2);

  Logger.log('SETUP DONE');
  Logger.log('TOKEN (put this in Vercel as VITE_MB_TOKEN): ' + props.getProperty('TOKEN'));
  Logger.log('Notification email: ' + props.getProperty('NOTIFY_EMAIL'));
  Logger.log('Next: Deploy > New deployment > Web app > Execute as Me > Anyone.');
}

/* ---------- Health check (open the /exec URL in a browser) ---------- */
function doGet() {
  return json_({ ok: true, service: 'marriage-bureau-receiver' });
}

/* ---------- Receives a registration ---------- */
function doPost(e) {
  var lock = LockService.getScriptLock();
  var locked = false;
  try {
    var raw = e && e.postData && e.postData.contents;
    if (!raw) return json_({ ok: false, error: 'empty' });
    if (raw.length > MAX_BODY_CHARS) return json_({ ok: false, error: 'too_large' });

    var data;
    try { data = JSON.parse(raw); } catch (err) { return json_({ ok: false, error: 'bad_json' }); }
    if (!data || typeof data !== 'object') return json_({ ok: false, error: 'bad_json' });

    // 1. Honeypot: pretend success so bots learn nothing, save nothing.
    if (data.hp) return json_({ ok: true, id: 'MB-IGNORED' });

    // 2. Secret token.
    var props = PropertiesService.getScriptProperties();
    var token = props.getProperty('TOKEN');
    if (!token || data.token !== token) return json_({ ok: false, error: 'unauthorized' });

    // 3. Shape and timing.
    var id = String(data.id || '');
    if (!ID_PATTERN.test(id)) return json_({ ok: false, error: 'bad_id' });
    if (!data.answers || typeof data.answers !== 'object') return json_({ ok: false, error: 'bad_answers' });
    if (!(Number(data.elapsedMs) >= MIN_FILL_MS)) return json_({ ok: false, error: 'too_fast' });

    // 4. Validate and clean every answer.
    var K = keyFields_();
    var checked = validate_(data.answers);
    if (!checked.ok) return json_({ ok: false, error: 'validation', field: checked.field, message: checked.message });
    var clean = checked.clean;

    // 5. Only one request at a time past this point.
    locked = lock.tryLock(25000);
    if (!locked) return json_({ ok: false, error: 'busy' });

    var sheet = getSheet_(props);

    // 6. Retries with the same ID are safe: report success, save nothing twice.
    if (findRow_(sheet, id)) return json_({ ok: true, id: id, duplicate: true });

    // 7. Abuse limits.
    var cache = CacheService.getScriptCache();
    var phoneKey = 'ph_' + digits_(clean[K.phone.id]);
    if (cache.get(phoneKey)) return json_({ ok: false, error: 'too_many' });
    if (capReached_(props)) return json_({ ok: false, error: 'daily_cap' });

    // 8. Save PDF and photo to Drive. A bad file never blocks the registration.
    var folder = DriveApp.getFolderById(props.getProperty('FOLDER_ID'));
    var base = id + '_' + (slug_(clean[K.first.id]) || 'candidate') + '_' + (slug_(clean[K.last.id]) || 'x');
    var pdfUrl = '';
    var photoUrl = '';

    var pdfBytes = decode_(data.pdf, MAX_PDF_BYTES);
    if (pdfBytes && isPdf_(pdfBytes)) {
      pdfUrl = folder.createFile(Utilities.newBlob(pdfBytes, 'application/pdf', base + '.pdf')).getUrl();
    }
    var photoBytes = decode_(data.photo, MAX_PHOTO_BYTES);
    var photoType = photoBytes ? imageType_(photoBytes) : null;
    if (photoType) {
      var ext = photoType === 'image/png' ? '.png' : '.jpg';
      photoUrl = folder.createFile(Utilities.newBlob(photoBytes, photoType, base + '_photo' + ext)).getUrl();
    }

    // 9. Append the row (plain-text format keeps leading zeros and "+92" intact).
    var row = [id, Utilities.formatDate(new Date(), TZ, 'yyyy-MM-dd HH:mm:ss'), 'New', '', pdfUrl];
    for (var i = 0; i < FIELDS.length; i++) {
      var f = FIELDS[i];
      row.push(f.type === 'file' ? photoUrl : safeCell_(clean[f.id]));
    }
    var target = sheet.getLastRow() + 1;
    if (target > sheet.getMaxRows()) sheet.insertRowsAfter(sheet.getMaxRows(), 500);
    var range = sheet.getRange(target, 1, 1, row.length);
    range.setNumberFormat('@');
    range.setValues([row]);

    // 10. Bookkeeping and notification (a failed email never fails the registration).
    cache.put(phoneKey, '1', PHONE_COOLDOWN_SEC);
    bumpCap_(props);
    notify_(props, sheet, target, id, clean, K, pdfUrl);

    return json_({ ok: true, id: id });
  } catch (err) {
    console.error(err && err.stack ? err.stack : String(err));
    return json_({ ok: false, error: 'server' });
  } finally {
    if (locked) lock.releaseLock();
  }
}

/* ---------- Validation ---------- */
function validate_(answers) {
  var clean = {};
  for (var i = 0; i < FIELDS.length; i++) {
    var f = FIELDS[i];
    if (f.type === 'file') continue;
    var v = answers[f.id];
    v = (v === undefined || v === null) ? '' : String(v);
    v = v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim();

    if (v.length > MAX_TEXT_LEN) return fail_(f, 'This answer is too long.');
    if (f.required && !v) return fail_(f, 'This field is required.');
    if (v) {
      if (f.options && f.options.length && f.options.indexOf(v) < 0) return fail_(f, 'Please choose one of the listed options.');
      if (f.type === 'num') {
        var n = Number(v);
        if (!isFinite(n) || n < 0) return fail_(f, 'Enter a valid number.');
        if (f.max !== null && f.max !== undefined && n > f.max) return fail_(f, 'Enter a smaller number.');
      }
      if (f.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return fail_(f, 'Enter a valid email address.');
      if (f.type === 'tel') {
        var d = digits_(v);
        if (d.length < 10 || d.length > 15) return fail_(f, 'Enter a valid phone number.');
      }
      if (f.type === 'time' && !/^\d{2}:\d{2}$/.test(v)) return fail_(f, 'Enter a valid time.');
      if (f.type === 'date18') {
        var age = ageFrom_(v);
        if (age < MIN_AGE) return fail_(f, 'Registration is for adults, 18 or older.');
        if (age > MAX_AGE) return fail_(f, 'Enter a valid date of birth.');
      }
    }
    clean[f.id] = v;
  }
  return { ok: true, clean: clean };
}

function fail_(f, message) {
  return { ok: false, field: f.id, message: message };
}

/* ---------- Helpers ---------- */
function keyFields_() {
  return {
    first: fieldByLabel_('personal', "Candidate's First Name"),
    last: fieldByLabel_('personal', "Candidate's Last Name"),
    birth: fieldByLabel_('personal', "Birth's Date"),
    gender: fieldByLabel_('personal', 'Gender'),
    marital: fieldByLabel_('personal', 'Marital Status'),
    phone: fieldByLabel_('personal', 'Contact Number')
  };
}

function fieldByLabel_(part, label) {
  for (var i = 0; i < FIELDS.length; i++) {
    if (FIELDS[i].part === part && FIELDS[i].label === label) return FIELDS[i];
  }
  throw new Error('Fields.gs is missing the field: ' + label);
}

function getSheet_(props) {
  var sheet = SpreadsheetApp.openById(props.getProperty('SHEET_ID')).getSheetByName(SHEET_NAME);
  if (!sheet) throw new Error('Run setup() first: sheet "' + SHEET_NAME + '" not found.');
  return sheet;
}

function findRow_(sheet, id) {
  var last = sheet.getLastRow();
  if (last < 2) return 0;
  var hit = sheet.getRange(2, 1, last - 1, 1).createTextFinder(id).matchEntireCell(true).findNext();
  return hit ? hit.getRow() : 0;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function digits_(s) {
  return String(s || '').replace(/\D/g, '');
}

function slug_(s) {
  return String(s || '').replace(/[^A-Za-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 24);
}

function safeCell_(v) {
  v = String(v === undefined || v === null ? '' : v);
  return /^=/.test(v) ? ' ' + v : v; // never let a cell become a formula
}

function ageFrom_(iso) {
  var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return -1;
  var y = +m[1], mo = +m[2], d = +m[3];
  var dt = new Date(Date.UTC(y, mo - 1, d));
  if (dt.getUTCFullYear() !== y || dt.getUTCMonth() !== mo - 1 || dt.getUTCDate() !== d) return -1;
  var t = Utilities.formatDate(new Date(), TZ, 'yyyy-MM-dd').split('-');
  var age = +t[0] - y;
  if (+t[1] < mo || (+t[1] === mo && +t[2] < d)) age--;
  return age;
}

function decode_(b64, maxBytes) {
  if (typeof b64 !== 'string' || !b64) return null;
  try {
    var bytes = Utilities.base64Decode(b64);
    return (bytes.length && bytes.length <= maxBytes) ? bytes : null;
  } catch (err) {
    return null;
  }
}

function isPdf_(b) { // "%PDF"
  return b.length > 4 && b[0] === 0x25 && b[1] === 0x50 && b[2] === 0x44 && b[3] === 0x46;
}

function imageType_(b) { // Apps Script bytes are signed: 0xFF = -1, 0xD8 = -40, 0x89 = -119
  if (b.length > 4 && b[0] === -1 && b[1] === -40 && b[2] === -1) return 'image/jpeg';
  if (b.length > 4 && b[0] === -119 && b[1] === 0x50 && b[2] === 0x4E && b[3] === 0x47) return 'image/png';
  return null;
}

function today_() {
  return Utilities.formatDate(new Date(), TZ, 'yyyyMMdd');
}

function capReached_(props) {
  var parts = String(props.getProperty('DAY_COUNT') || '').split(':');
  var n = parts[0] === today_() ? (Number(parts[1]) || 0) : 0;
  return n >= DAILY_CAP;
}

function bumpCap_(props) {
  var parts = String(props.getProperty('DAY_COUNT') || '').split(':');
  var n = parts[0] === today_() ? (Number(parts[1]) || 0) : 0;
  props.setProperty('DAY_COUNT', today_() + ':' + (n + 1));
}

function esc_(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/* ---------- Email to the owner: no ID, passport, income or health data ---------- */
function notify_(props, sheet, row, id, clean, K, pdfUrl) {
  try {
    var to = props.getProperty('NOTIFY_EMAIL');
    if (!to) return;
    var name = (clean[K.first.id] + ' ' + clean[K.last.id]).trim();
    var sheetUrl = 'https://docs.google.com/spreadsheets/d/' + props.getProperty('SHEET_ID') +
      '/edit#gid=' + sheet.getSheetId() + '&range=A' + row;
    var rows = [
      ['Reference', id],
      ['Name', name],
      ['Gender', clean[K.gender.id]],
      ['Age', ageFrom_(clean[K.birth.id])],
      ['Marital status', clean[K.marital.id]],
      ['Contact number', clean[K.phone.id]]
    ];
    var text = rows.map(function (r) { return r[0] + ': ' + r[1]; }).join('\n') +
      '\n\nOpen the row: ' + sheetUrl + (pdfUrl ? '\nBiodata PDF: ' + pdfUrl : '');
    var html = '<table cellpadding="6" style="font-family:Arial,sans-serif;font-size:14px">' +
      rows.map(function (r) { return '<tr><td><b>' + esc_(r[0]) + '</b></td><td>' + esc_(r[1]) + '</td></tr>'; }).join('') +
      '</table><p><a href="' + esc_(sheetUrl) + '">Open the row in the Sheet</a>' +
      (pdfUrl ? ' &nbsp;|&nbsp; <a href="' + esc_(pdfUrl) + '">Biodata PDF</a>' : '') + '</p>';
    MailApp.sendEmail({
      to: to,
      subject: 'New Marriage Bureau registration: ' + name + ' (' + id + ')',
      body: text,
      htmlBody: html,
      name: 'SerajUlMaymar Website'
    });
  } catch (err) {
    console.error('Email failed: ' + err);
  }
}

/* ---------- Test from the editor without the website: run selfTest() ---------- */
function selfTest() {
  var answers = {};
  FIELDS.forEach(function (f) {
    if (!f.required) return;
    var v = 'TEST';
    if (f.type === 'date18') v = '1995-05-15';
    else if (f.type === 'tel') v = '+92 300 1234567';
    else if (f.type === 'email') v = 'test@example.com';
    else if (f.type === 'num') v = '1';
    else if (f.type === 'time') v = '10:30';
    else if (f.type === 'range') v = '25 to 30';
    else if (f.options && f.options.length) v = f.options[0];
    answers[f.id] = v;
  });
  var id = 'MB-' + Utilities.getUuid().replace(/-/g, '').slice(0, 8).toUpperCase();
  var props = PropertiesService.getScriptProperties();
  var fake = { postData: { contents: JSON.stringify({
    token: props.getProperty('TOKEN'), hp: '', id: id, elapsedMs: 20000, answers: answers
  }) } };
  Logger.log(doPost(fake).getContent());
  Logger.log('A TEST row was added. Delete it from the Sheet after checking.');
}

