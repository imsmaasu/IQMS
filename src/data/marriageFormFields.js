/**
 * Marriage Bureau Registration Form — Single Source of Truth (150 fields)
 *
 * Structure:
 *   FIELDS      — flat ordered array of 150 field objects matching the data contract:
 *                 { id, part, label, type, required, options, min, max, secret, row, col }
 *   FORM_PARTS  — two sheet headings ("Personal Detail Information" and "Requirements")
 *   FORM_STEPS  — 10-step UI grouping by row range (Steps 1–9 hold rows, Step 10 is Review)
 *   FIELD_UI    — non-contract UI hints (placeholders, decimal step, numeric range flag)
 */

function toCamelCase(str) {
  const words = str.split(/[^a-zA-Z0-9]+/).filter(Boolean);
  return words
    .map((w, idx) => {
      const lower = w.toLowerCase();
      if (idx === 0) return lower;
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join('');
}

const makeField = (part, row, col, label, type, opts = {}) => {
  const prefix = part === 'personal' ? 'p_' : 'r_';
  const id = prefix + toCamelCase(label);
  const options =
    type === 'yn'
      ? ['Yes', 'No']
      : Array.isArray(opts.options)
      ? opts.options
      : null;

  return {
    id,
    part,
    label,
    type,
    required: Boolean(opts.required),
    options,
    min: opts.min !== undefined ? opts.min : type === 'num' ? 0 : null,
    max: opts.max !== undefined ? opts.max : null,
    secret: Boolean(opts.secret),
    row,
    col,
  };
};

// Raw row definitions preserving exact R-numbers and verbatim field labels
const RAW_ROWS = [
  // ── Part 1: Personal Detail Information (R2 – R42, 41 rows × 3 = 123 fields) ──
  {
    part: 'personal',
    row: 2,
    fields: [
      makeField('personal', 2, 0, "Candidate's First Name", 'text', { required: true }),
      makeField('personal', 2, 1, "Candidate's Middle Name", 'text'),
      makeField('personal', 2, 2, "Candidate's Last Name", 'text', { required: true }),
    ],
  },
  {
    part: 'personal',
    row: 3,
    fields: [
      makeField('personal', 3, 0, "Father's First Name", 'text'),
      makeField('personal', 3, 1, "Father's Middle Name", 'text'),
      makeField('personal', 3, 2, "Father's Last Name", 'text'),
    ],
  },
  {
    part: 'personal',
    row: 4,
    fields: [
      makeField('personal', 4, 0, "Mother's First Name", 'text'),
      makeField('personal', 4, 1, "Mother's Middle Name", 'text'),
      makeField('personal', 4, 2, "Mother's Last Name", 'text'),
    ],
  },
  {
    part: 'personal',
    row: 5,
    fields: [
      makeField('personal', 5, 0, "Guardian's First Name", 'text'),
      makeField('personal', 5, 1, "Guardian's Middle Name", 'text'),
      makeField('personal', 5, 2, "Guardian's Last Name", 'text'),
    ],
  },
  {
    part: 'personal',
    row: 6,
    fields: [
      makeField('personal', 6, 0, "Birth's Date", 'date18', { required: true }),
      makeField('personal', 6, 1, "Birth's Country", 'text'),
      makeField('personal', 6, 2, "Birth's City", 'text'),
    ],
  },
  {
    part: 'personal',
    row: 7,
    fields: [
      makeField('personal', 7, 0, 'Birth Time', 'time'),
      makeField('personal', 7, 1, 'Birth Place / Hospital', 'text'),
      makeField('personal', 7, 2, 'Zodiac Sign / Star', 'text'),
    ],
  },
  {
    part: 'personal',
    row: 8,
    fields: [
      makeField('personal', 8, 0, 'Religion', 'text', { required: true }),
      makeField('personal', 8, 1, 'Sect / Denomination', 'text'),
      makeField('personal', 8, 2, 'Sub Caste / Clan / Tribe', 'text'),
    ],
  },
  {
    part: 'personal',
    row: 9,
    fields: [
      makeField('personal', 9, 0, 'Mother Tongue', 'text'),
      makeField('personal', 9, 1, 'Spoken Language', 'text'),
      makeField('personal', 9, 2, 'Religious Practice Level', 'sel', {
        options: ['Very practicing', 'Practicing', 'Moderate', 'Not practicing'],
      }),
    ],
  },
  {
    part: 'personal',
    row: 10,
    fields: [
      makeField('personal', 10, 0, 'Education', 'text', { required: true }),
      makeField('personal', 10, 1, 'Field', 'text'),
      makeField('personal', 10, 2, 'Percentage', 'num', { min: 0, max: 100 }),
    ],
  },
  {
    part: 'personal',
    row: 11,
    fields: [
      makeField('personal', 11, 0, 'Highest Degree', 'text'),
      makeField('personal', 11, 1, 'Board / University', 'text'),
      makeField('personal', 11, 2, 'School / Institute', 'text'),
    ],
  },
  {
    part: 'personal',
    row: 12,
    fields: [
      makeField('personal', 12, 0, 'Division', 'text'),
      makeField('personal', 12, 1, 'Grade', 'text'),
      makeField('personal', 12, 2, 'CGPA', 'num'),
    ],
  },
  {
    part: 'personal',
    row: 13,
    fields: [
      makeField('personal', 13, 0, 'Additional Certifications', 'text'),
      makeField('personal', 13, 1, 'Education Sector (Govt/Private)', 'sel', {
        options: ['Govt', 'Private'],
      }),
      makeField('personal', 13, 2, 'Studied Abroad (Yes/No)', 'yn'),
    ],
  },
  {
    part: 'personal',
    row: 14,
    fields: [
      makeField('personal', 14, 0, 'Gender', 'sel', {
        required: true,
        options: ['Male', 'Female'],
      }),
      makeField('personal', 14, 1, 'Caste', 'text'),
      makeField('personal', 14, 2, 'Belongs', 'text'),
    ],
  },
  {
    part: 'personal',
    row: 15,
    fields: [
      makeField('personal', 15, 0, 'Marital Status', 'sel', {
        required: true,
        options: ['Never Married', 'Divorced', 'Widowed', 'Separated'],
      }),
      makeField('personal', 15, 1, 'Height', 'text'),
      makeField('personal', 15, 2, 'Weight', 'text'),
    ],
  },
  {
    part: 'personal',
    row: 16,
    fields: [
      makeField('personal', 16, 0, 'Have Children (Yes/No)', 'yn'),
      makeField('personal', 16, 1, 'Number of Children', 'num'),
      makeField('personal', 16, 2, 'Children Living Status', 'text'),
    ],
  },
  {
    part: 'personal',
    row: 17,
    fields: [
      makeField('personal', 17, 0, 'Boys', 'num'),
      makeField('personal', 17, 1, 'Girls', 'num'),
      makeField('personal', 17, 2, 'Children Not Alive', 'num'),
    ],
  },
  {
    part: 'personal',
    row: 18,
    fields: [
      makeField('personal', 18, 0, 'Complexion', 'text'),
      makeField('personal', 18, 1, 'Body Type', 'text'),
      makeField('personal', 18, 2, 'Blood Group', 'sel', {
        options: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      }),
    ],
  },
  {
    part: 'personal',
    row: 19,
    fields: [
      makeField('personal', 19, 0, 'Physical Disability', 'yn'),
      makeField('personal', 19, 1, 'Disability Details', 'text'),
      makeField('personal', 19, 2, 'Special Needs / Health Conditions', 'long'),
    ],
  },
  {
    part: 'personal',
    row: 20,
    fields: [
      makeField('personal', 20, 0, 'Hobbies & Interests', 'text'),
      makeField('personal', 20, 1, 'Fitness / Sports', 'text'),
      makeField('personal', 20, 2, 'Dietary Preferences', 'text'),
    ],
  },
  {
    part: 'personal',
    row: 21,
    fields: [
      makeField('personal', 21, 0, 'Smoking Habits', 'text'),
      makeField('personal', 21, 1, 'Drinking Habits', 'text'),
      makeField('personal', 21, 2, 'Pet Friendly', 'yn'),
    ],
  },
  {
    part: 'personal',
    row: 22,
    fields: [
      makeField('personal', 22, 0, 'Profession', 'text', { required: true }),
      makeField('personal', 22, 1, 'Experience', 'text'),
      makeField('personal', 22, 2, "Profession's Area", 'text'),
    ],
  },
  {
    part: 'personal',
    row: 23,
    fields: [
      makeField('personal', 23, 0, 'Income', 'num'),
      makeField('personal', 23, 1, 'Income Period (Monthly/Annual)', 'sel', {
        options: ['Monthly', 'Annual'],
      }),
      makeField('personal', 23, 2, 'Currency', 'sel', {
        options: ['PKR', 'USD', 'GBP', 'AED', 'SAR', 'Other'],
      }),
    ],
  },
  {
    part: 'personal',
    row: 24,
    fields: [
      makeField('personal', 24, 0, 'Business Name', 'text'),
      makeField('personal', 24, 1, "Business's Type", 'text'),
      makeField('personal', 24, 2, "Business's Designation", 'text'),
    ],
  },
  {
    part: 'personal',
    row: 25,
    fields: [
      makeField('personal', 25, 0, 'Job Name', 'text'),
      makeField('personal', 25, 1, "Job's Type", 'text'),
      makeField('personal', 25, 2, "Job's Designation", 'text'),
    ],
  },
  {
    part: 'personal',
    row: 26,
    fields: [
      makeField('personal', 26, 0, 'Company / Organization Name', 'text'),
      makeField('personal', 26, 1, 'Work Location', 'text'),
      makeField('personal', 26, 2, 'Employment Sector (Govt/Pvt)', 'sel', {
        options: ['Govt', 'Pvt'],
      }),
    ],
  },
  {
    part: 'personal',
    row: 27,
    fields: [
      makeField('personal', 27, 0, 'Remote Work Status', 'text'),
      makeField('personal', 27, 1, 'Career Goals / Future Plans', 'long'),
      makeField('personal', 27, 2, 'Own House / Property Status', 'text'),
    ],
  },
  {
    part: 'personal',
    row: 28,
    fields: [
      makeField('personal', 28, 0, 'Family Type', 'text'),
      makeField('personal', 28, 1, 'Family Status / Class', 'text'),
      makeField('personal', 28, 2, 'Parental Status', 'text'),
    ],
  },
  {
    part: 'personal',
    row: 29,
    fields: [
      makeField('personal', 29, 0, "Father's Occupation", 'text'),
      makeField('personal', 29, 1, "Father's Income Status", 'text'),
      makeField('personal', 29, 2, "Father's Income", 'num'),
    ],
  },
  {
    part: 'personal',
    row: 30,
    fields: [
      makeField('personal', 30, 0, "Mother's Occupation", 'text'),
      makeField('personal', 30, 1, "Mother's Income Status", 'text'),
      makeField('personal', 30, 2, "Mother's Income", 'num'),
    ],
  },
  {
    part: 'personal',
    row: 31,
    fields: [
      makeField('personal', 31, 0, 'Family Values (Liberal/Moderate)', 'sel', {
        options: ['Liberal', 'Moderate'],
      }),
      makeField('personal', 31, 1, 'Ancestral Origin / Hometown', 'text'),
      makeField('personal', 31, 2, 'Family House Type', 'text'),
    ],
  },
  {
    part: 'personal',
    row: 32,
    fields: [
      makeField('personal', 32, 0, 'Brothers', 'num'),
      makeField('personal', 32, 1, 'Elders Brothers', 'num'),
      makeField('personal', 32, 2, 'Youngers Brothers', 'num'),
    ],
  },
  {
    part: 'personal',
    row: 33,
    fields: [
      makeField('personal', 33, 0, 'Married Brothers', 'num'),
      makeField('personal', 33, 1, 'Unmarried Brothers', 'num'),
      makeField('personal', 33, 2, "Brother's Occupations", 'text'),
    ],
  },
  {
    part: 'personal',
    row: 34,
    fields: [
      makeField('personal', 34, 0, 'Sisters', 'num'),
      makeField('personal', 34, 1, 'Elders Sisters', 'num'),
      makeField('personal', 34, 2, 'Youngers Sisters', 'num'),
    ],
  },
  {
    part: 'personal',
    row: 35,
    fields: [
      makeField('personal', 35, 0, 'Married Sisters', 'num'),
      makeField('personal', 35, 1, 'Unmarried Sisters', 'num'),
      makeField('personal', 35, 2, "Sister's Occupations", 'text'),
    ],
  },
  {
    part: 'personal',
    row: 36,
    fields: [
      makeField('personal', 36, 0, 'Residencey Status', 'text'),
      makeField('personal', 36, 1, 'Permanent Address', 'long', { required: true }),
      makeField('personal', 36, 2, 'Current Zip / Postal Code', 'text'),
    ],
  },
  {
    part: 'personal',
    row: 37,
    fields: [
      makeField('personal', 37, 0, 'Citizenship / Nationality', 'text'),
      makeField('personal', 37, 1, 'Passport Number', 'text', { secret: true }),
      makeField('personal', 37, 2, 'Passport Held (Yes/No)', 'yn'),
    ],
  },
  {
    part: 'personal',
    row: 38,
    fields: [
      makeField('personal', 38, 0, 'Dual Citizenship', 'yn'),
      makeField('personal', 38, 1, 'Visa Type / Status', 'text'),
      makeField('personal', 38, 2, 'Willingness to Relocate', 'yn'),
    ],
  },
  {
    part: 'personal',
    row: 39,
    fields: [
      makeField('personal', 39, 0, 'Relocation Countries Preference', 'text'),
      makeField('personal', 39, 1, 'Contact Number', 'tel', { required: true }),
      makeField('personal', 39, 2, 'Email Address', 'email'),
    ],
  },
  {
    part: 'personal',
    row: 40,
    fields: [
      makeField('personal', 40, 0, 'Guardian Contact Number', 'tel'),
      makeField('personal', 40, 1, 'Primary Contact Person', 'text'),
      makeField('personal', 40, 2, 'Preferred Contact Time', 'text'),
    ],
  },
  {
    part: 'personal',
    row: 41,
    fields: [
      makeField('personal', 41, 0, 'About Self / Bio', 'long'),
      makeField('personal', 41, 1, 'Profile Photo Upload / Privacy', 'file'),
      makeField('personal', 41, 2, 'Photo Privacy Preference', 'sel', {
        options: [
          'Visible to all',
          'Visible after both families agree',
          'Share on request only',
        ],
      }),
    ],
  },
  {
    part: 'personal',
    row: 42,
    fields: [
      makeField('personal', 42, 0, 'ID Verification Type (CNIC)', 'text', { secret: true }),
      makeField('personal', 42, 1, 'ID Verification Status', 'sel', {
        options: ['Pending', 'Verified', 'Not verified'],
      }),
      makeField('personal', 42, 2, 'Social Media Handles (Optional)', 'text'),
    ],
  },

  // ── Part 2: Requirements (R46 – R54, 9 rows × 3 = 27 fields) ──
  {
    part: 'requirements',
    row: 46,
    fields: [
      makeField('requirements', 46, 0, 'Age Range', 'range', { required: true }),
      makeField('requirements', 46, 1, 'Height Range', 'range'),
      makeField('requirements', 46, 2, 'Weight Range', 'range'),
    ],
  },
  {
    part: 'requirements',
    row: 47,
    fields: [
      makeField('requirements', 47, 0, 'Marital Status', 'sel', {
        required: true,
        options: ['Never Married', 'Divorced', 'Widowed', 'Separated', 'Any'],
      }),
      makeField('requirements', 47, 1, 'Caste', 'text'),
      makeField('requirements', 47, 2, 'Belongs', 'text'),
    ],
  },
  {
    part: 'requirements',
    row: 48,
    fields: [
      makeField('requirements', 48, 0, 'Preferred Religion / Sect', 'text'),
      makeField('requirements', 48, 1, 'Preferred Mother Tongue', 'text'),
      makeField('requirements', 48, 2, 'Preferred Sub Caste / Tribe', 'text'),
    ],
  },
  {
    part: 'requirements',
    row: 49,
    fields: [
      makeField('requirements', 49, 0, 'Education', 'text'),
      makeField('requirements', 49, 1, 'Profession', 'text'),
      makeField('requirements', 49, 2, 'Income', 'text'),
    ],
  },
  {
    part: 'requirements',
    row: 50,
    fields: [
      makeField('requirements', 50, 0, 'Area', 'text'),
      makeField('requirements', 50, 1, 'Preferred Country / Residency', 'text'),
      makeField('requirements', 50, 2, 'Preferred Residency Status', 'text'),
    ],
  },
  {
    part: 'requirements',
    row: 51,
    fields: [
      makeField('requirements', 51, 0, 'Dietary Preferences', 'text'),
      makeField('requirements', 51, 1, 'Smoking / Drinking Preferences', 'text'),
      makeField('requirements', 51, 2, 'Preferred Citizenship', 'text'),
    ],
  },
  {
    part: 'requirements',
    row: 52,
    fields: [
      makeField('requirements', 52, 0, 'Complexion Preference', 'text'),
      makeField('requirements', 52, 1, 'Body Type Preference', 'text'),
      makeField('requirements', 52, 2, 'Religious Value Preference', 'text'),
    ],
  },
  {
    part: 'requirements',
    row: 53,
    fields: [
      makeField('requirements', 53, 0, 'Accept Children from Previous Marriage', 'yn'),
      makeField('requirements', 53, 1, 'Accept Disability / Special Needs', 'yn'),
      makeField('requirements', 53, 2, 'Family Type Preference', 'text'),
    ],
  },
  {
    part: 'requirements',
    row: 54,
    fields: [
      makeField('requirements', 54, 0, 'About Ideal Partner', 'long'),
      makeField('requirements', 54, 1, 'Mandatory Requirements / Dealbreakers', 'long'),
      makeField('requirements', 54, 2, 'Preferred Willingness to Relocate', 'yn'),
    ],
  },
];

// Flat ordered 150-field array
export const FIELDS = RAW_ROWS.flatMap((r) => r.fields);

// Field UI hints outside the strict data contract
export const FIELD_UI = {
  p_cgpa: { step: '0.01', placeholder: 'e.g. 3.45' },
  p_percentage: { step: '0.01', placeholder: '0 – 100' },
  p_height: { placeholder: 'e.g. 5 ft 8 in' },
  p_weight: { placeholder: 'e.g. 70 kg' },
  p_contactNumber: { placeholder: 'e.g. +92 300 1234567' },
  p_guardianContactNumber: { placeholder: 'e.g. +92 300 1234567' },
  p_emailAddress: { placeholder: 'e.g. name@example.com' },
  p_idVerificationTypeCnic: { placeholder: 'e.g. 42101-1234567-1' },
  r_ageRange: { numeric: true, minPlaceholder: 'e.g. 24', maxPlaceholder: 'e.g. 30' },
  r_heightRange: { numeric: false, minPlaceholder: 'e.g. 5 ft 4 in', maxPlaceholder: 'e.g. 5 ft 11 in' },
  r_weightRange: { numeric: false, minPlaceholder: 'e.g. 55 kg', maxPlaceholder: 'e.g. 75 kg' },
};

const STEP_DEFINITIONS = [
  { number: 1, id: 'step-names', part: 'personal', title: 'Names and family heads', rowStart: 2, rowEnd: 5 },
  { number: 2, id: 'step-birth-faith', part: 'personal', title: 'Birth, faith and language', rowStart: 6, rowEnd: 9 },
  { number: 3, id: 'step-education', part: 'personal', title: 'Education', rowStart: 10, rowEnd: 13 },
  { number: 4, id: 'step-personal', part: 'personal', title: 'Personal, health and lifestyle', rowStart: 14, rowEnd: 21 },
  { number: 5, id: 'step-work', part: 'personal', title: 'Work and income', rowStart: 22, rowEnd: 27 },
  { number: 6, id: 'step-family', part: 'personal', title: 'Family background', rowStart: 28, rowEnd: 35 },
  { number: 7, id: 'step-residency', part: 'personal', title: 'Residency, citizenship and contact', rowStart: 36, rowEnd: 40 },
  { number: 8, id: 'step-about-id', part: 'personal', title: 'About you, photo and ID', rowStart: 41, rowEnd: 42 },
  { number: 9, id: 'step-requirements', part: 'requirements', title: 'Partner requirements', rowStart: 46, rowEnd: 54 },
  { number: 10, id: 'step-review', part: 'review', title: 'Review and submit', rowStart: null, rowEnd: null },
];

export const PART_TITLES = {
  personal: 'Personal Detail Information',
  requirements: 'Requirements',
};

export const FORM_STEPS = STEP_DEFINITIONS.map((step) => {
  const rows =
    step.rowStart === null
      ? []
      : RAW_ROWS.filter((r) => r.row >= step.rowStart && r.row <= step.rowEnd);
  return {
    ...step,
    partTitle: PART_TITLES[step.part] || null,
    rows,
    fields: rows.flatMap((r) => r.fields),
  };
});

export const FORM_PARTS = [
  {
    id: 'personal',
    title: 'Personal Detail Information',
    steps: FORM_STEPS.filter((s) => s.part === 'personal'),
  },
  {
    id: 'requirements',
    title: 'Requirements',
    steps: FORM_STEPS.filter((s) => s.part === 'requirements'),
  },
];

export const TOTAL_FIELDS_COUNT = FIELDS.length;
export const REQUIRED_FIELDS = FIELDS.filter((f) => f.required);
export const FIELD_STEP_MAP = Object.fromEntries(
  FORM_STEPS.flatMap((step, idx) => step.fields.map((f) => [f.id, idx]))
);

