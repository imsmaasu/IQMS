# Marriage Bureau Setup Guide (Owner's Handbook)

## 1. What This Does
When a family or candidate submits the Marriage Bureau registration form on your website:
1. Their answers are saved as a new row in your private **Google Sheet**.
2. Their generated biodata **PDF** and optional **photo** are saved inside a private **Google Drive** folder.
3. You receive a brief **notification email** with a link straight to that row and PDF.

---

## 2. Step-by-Step Setup (Google Account + Vercel)

### a. Create your Google Sheet
1. Sign in to the Google account where you want to store registrations.
2. Open Google Drive or Google Sheets and create a brand-new blank spreadsheet.
3. Name it: **`Marriage Bureau Registrations`**.

### b. Add the Apps Script files
1. Inside that spreadsheet, open **Extensions > Apps Script**.
2. You will see a default file named `Code.gs` containing a blank `myFunction()`. Delete everything inside it.
3. Open `apps-script/Code.gs` from this project, copy the entire file, and paste it into `Code.gs` in Apps Script.
4. Click the **`+`** button next to **Files** in the left sidebar, choose **Script**, and name the new file **`Fields`** (Apps Script saves it as `Fields.gs`).
5. Delete any sample lines inside `Fields.gs`, then copy and paste the entire contents of `apps-script/Fields.gs` from this project.
6. Click **Save project** (floppy disk icon or `Ctrl+S`).

### c. Run `setup()` once
1. In the toolbar dropdown next to **Debug**, select **`setup`** and click **Run**.
2. Google will ask you to authorize permissions. Click **Review permissions** and choose your Google account.
3. If Google shows a screen saying *"Google hasn't verified this app"*, click **Advanced**, then click **Go to ... (unsafe)** at the bottom.
   - This is your own private script running inside your own Google account. It only requests access to your Google Sheets, Google Drive, and email sending.
4. Allow the permissions and wait a few seconds for execution to complete.

### d. Copy your Token (and optionally change email)
1. Look at the **Execution log** at the bottom of the Apps Script editor.
2. Copy the **`TOKEN`** value printed after `TOKEN (put this in Vercel as VITE_MB_TOKEN): `. Keep this token private.
3. By default, notifications go to the Google account email that ran `setup()`. To send notifications to a different email address:
   - Open **Project Settings** (gear icon on the left).
   - Scroll down to **Script properties** > **Edit script properties**.
   - Edit `NOTIFY_EMAIL` to your preferred address and save.

### e. Deploy as a Web App
1. At the top right of Apps Script, click **Deploy > New deployment**.
2. Click the gear icon next to **Select type** and choose **Web app**.
3. Set:
   - **Description:** `Marriage Bureau Receiver v1`
   - **Execute as:** **`Me`**
   - **Who has access:** **`Anyone`**
4. Click **Deploy**.
5. Copy the **Web app URL** (it ends with **`/exec`**).

### f. Add Environment Variables in Vercel & Redeploy
1. Open your project in **Vercel**.
2. Go to **Project > Settings > Environment Variables**.
3. Add two variables for **Production** (and Preview if you test preview links):
   - **`VITE_MB_SCRIPT_URL`** = your Apps Script `/exec` URL
   - **`VITE_MB_TOKEN`** = the token you copied from the Execution log
4. Go to **Deployments**, open the menu on your latest deployment, and click **Redeploy**.
   - **Important:** Vite embeds these variables during the build, so a redeploy is required for any change to take effect.

---

## 3. Real-World Test Checklist
Run these checks on your live Google account and deployed website after setup:

| Check | How to test | Expected pass result |
| --- | --- | --- |
| **Health check** | Paste your `/exec` URL in a browser address bar and press Enter. | Page shows `{"ok":true,"service":"marriage-bureau-receiver"}`. |
| **Apps Script `selfTest`** | In Apps Script editor, select `selfTest` from the toolbar dropdown and click **Run**. | Execution log prints `{"ok":true,"id":"MB-..."}`. A `TEST` row appears in the `Registrations` sheet and you receive an email. **Delete the `TEST` row afterwards.** |
| **Formula & phone safety** | On your live website, submit a test registration with First Name `=1+1` and Contact Number `0300 1234567`. | The Sheet shows ` =1+1` as plain text (never `2`), and the phone keeps its leading `0` (`0300 1234567`). |
| **Age check (18+)** | Try submitting with a Birth's Date less than 18 years ago. | Form refuses submission and shows `"Registration is for adults, 18 or older."` |
| **Private Drive links** | Click the PDF link and photo link in the Sheet while logged into your Google account, then try the same links in a Private/Incognito browser window. | Both open when logged in as you, and **do NOT open** in an Incognito window. |
| **Notification email privacy** | Inspect the notification email you received. | It shows Reference ID, Name, Gender, Age, Marital status, and Contact number, with **no CNIC, passport, income, or health details**. |

---

## 4. Day-to-Day Usage
- Open your **`Marriage Bureau Registrations`** Google Sheet whenever a notification email arrives.
- Use the **`Status`** column (starts as `New`) and **`Staff Notes`** column (columns C and D) to track follow-ups, WhatsApp calls, and shortlisting.
- Use Google Sheets filters (`Data > Create a filter`) to filter by Gender, Marital Status, Age, City/Area, or Status.
- All biodata PDFs and candidate photos live inside the **`Marriage Bureau Submissions`** folder in your Google Drive, linked directly from each row.

---

## 5. Safety Rules
- **Never share** the Google Sheet or the `Marriage Bureau Submissions` Drive folder with anyone outside your trusted team.
- **Never reorder, rename, or delete columns** in the Sheet after launch (`setup()` will intentionally refuse to run if existing headers do not match `Fields.gs`).
- **Download a monthly backup:** `File > Download > Microsoft Excel (.xlsx)` and store it safely offline.
- **Delete test rows** after testing so your records stay clean.

---

## 6. Updating the Apps Script Later
If you ever paste an updated `Code.gs` or `Fields.gs`:
1. Click **Deploy > Manage deployments**.
2. Click the **pencil (Edit)** icon on your active Web app deployment.
3. Under **Version**, select **New version**.
4. Click **Deploy**.
- **Do NOT click "New deployment"** for updates — that creates a brand-new URL and breaks your live website until you update Vercel.

---

## 7. Troubleshooting

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| Console/logs show `unauthorized` or form enters fallback | `VITE_MB_TOKEN` does not match `TOKEN` in Apps Script Properties | Re-copy `TOKEN` from **Project Settings > Script properties** in Apps Script, update `VITE_MB_TOKEN` in Vercel, and **Redeploy**. |
| Form falls back to PDF download + WhatsApp | Missing Vercel env vars, wrong `/exec` URL, or deployment access is not **Anyone** | Verify both env vars in Vercel (then **Redeploy**), and verify Apps Script Web app **Who has access** is set to **Anyone**. |
| Registrations save to Sheet, but no email arrives | Gmail daily sending cap reached or email went to Spam | Check your Spam folder; verify `NOTIFY_EMAIL` in Script Properties; note free Gmail limits. |
| Error mentions `Run setup() first` | `setup()` was not run after creating the Sheet | Open Apps Script editor, select `setup`, and click **Run**. |

---

## 8. Daily Limits
- **Email limit:** Free Google accounts can send at most **100 emails per day** via Apps Script `MailApp`.
- **Registration limit:** `Code.gs` caps accepted submissions at **150 registrations per day** (`DAILY_CAP = 150`) and allows one registration per phone number every 2 minutes (`PHONE_COOLDOWN_SEC = 120`) to protect your sheet from spam.

