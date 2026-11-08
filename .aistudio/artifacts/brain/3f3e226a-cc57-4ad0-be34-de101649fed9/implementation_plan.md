# Implementation Plan: Official Draft Sahayak (प्रारूप सहायक)

An AI-powered official legal draft, affidavit, and grievance letter generator that empowers citizens to generate perfectly formatted government drafts on their smartphones without paying ₹300–₹1,500 to cyber cafes, typists, or court agents.

---

## 1. Problem & Context

- **The Problem**: Government portals (e.g., BharatKosh Gazette, CPGRAMS, NTA, Parivahan) require strict, legally binding affidavits or formal grievance letters with specific legal clauses (*"Deponent"*, *"Solemnly affirm"*, *"Citizen's Charter Rule"*, *"Verification"*).
- **The Ground Reality**: Illiterate or semi-literate citizens cannot write these formal legal drafts in English or formal Hindi. Cyber cafes and roadside notary typists charge extortionate fees (₹500 to ₹1,500) for simple 1-page template printouts.
- **The Solution**: **Official Draft Sahayak (प्रारूप सहायक)** — an integrated modal with preloaded official formats, conversational Gemini AI draft generation, 1-click step synchronization, and instant A4 print/copy capabilities.

---

## 2. Key Capabilities & Workflow

### A. Preloaded Statutory Draft Templates
1. **Central Gazette Name Change Affidavit (नाम परिवर्तन शपथ पत्र)**:
   - Official proforma mandated by the Department of Publication (Ministry of Housing & Urban Affairs) for BharatKosh Gazette notifications.
   - Includes: Old name, new name, parent/spouse name, address, newspaper publication dates, and oath verification clause.
2. **CPGRAMS / CVC Anti-Corruption & Delayed Service Grievance (भ्रष्टाचार / कार्य में देरी शिकायत पत्र)**:
   - Statutory complaint letter format addressed to Public Grievance Officer under DARPG Citizen's Charter guidelines.
   - Includes: Ministry/Department, application reference number, days delayed beyond statutory limit, bribe solicitation details, and formal relief sought.
3. **NEET / NTA Exam Self-Declaration & Name Discrepancy Undertaking (परीक्षा स्व-घोषणा पत्र)**:
   - Official format for candidate undertaking regarding discrepancy between Aadhaar and Class 10 marksheet spelling, or examination center grievance.
4. **Birth Date / Record Correction Affidavit (जन्म तिथि / अभिलेख सुधार शपथ पत्र)**:
   - Notary-compliant format for rectification of errors in civil records.

### B. AI Prompt-Based Draft Generation with Gemini
- **Conversational Input**: Users enter basic facts in natural Hindi, Hinglish, or English (e.g., *"My name is Ramesh Kumar, I want to change it to Ramesh Sharma, living in Ward 4 Varanasi"*).
- **Backend API Route (`/api/generate-draft`)**:
  - Leverages Google Gemini 2.5 Flash with strict legal formatting prompts.
  - Automatically structures the draft with proper legal clauses, date/place placeholders, deponent signature blocks, and notary verification.
  - Provides statutory stamp paper guidance (e.g., *"Print on ₹10 or ₹50 Non-Judicial Stamp Paper and get attested by Notary Public"*).

### C. 1-Click Step Synchronization Inside Guided Coach
- When a citizen reaches a step requiring an affidavit (such as Step 2 of *Central Gazette Name Change* or Step 3 of *Delayed Service Escalation*), a prominent button appears: **"📝 Generate Official Draft"**.
- Clicking opens the modal with the exact matching template pre-selected and context pre-filled.

### D. Output & Utility Features
- **Live Formatted Document View**: Standard legal paper preview simulation with serif/monospace typography and signature lines.
- **1-Click Copy**: Copies clean formatted text for instant pasting into portal text areas (like CPGRAMS).
- **1-Click Print / PDF Export**: Clean, printable A4 layout with print styles that remove surrounding UI headers and buttons.
- **Language Switcher**: Toggle draft language between **English** (required by most central portals) and **Hindi** (accepted in district courts and state portals).

---

## 3. Architecture & File Changes

| File | Proposed Changes |
| :--- | :--- |
| **`server.ts`** | Add `/api/generate-draft` endpoint powered by Gemini 2.5 Flash with structured legal template prompts and deterministic fallback templates. |
| **`src/components/DraftGeneratorModal.tsx`** | New component: Integrated draft generator modal with template selector, conversational prompt input, live formatted draft preview, 1-click copy, and A4 print stylesheet. |
| **`src/components/GuidedCoach.tsx`** | Add 1-click step sync trigger button on steps requiring an affidavit or formal complaint (e.g., Gazette Name Change Step 2, Delayed Service Step 3). |
| **`src/components/Header.tsx`** | Add "Draft Generator (प्रारूप)" quick action trigger in top header / secondary navigation. |
| **`src/App.tsx`** | Manage `isDraftModalOpen` and `draftModalInitialTemplate` state; wire step sync callbacks from GuidedCoach to modal. |
| **`src/utils/procedures.ts`** | Add `draftTemplateId` metadata to applicable procedure steps for seamless 1-click synchronization. |

---

## 4. Verification & Testing Plan
1. **Compilation & Linting**: Run `compile_applet` and `lint_applet` to ensure zero TypeScript and ESLint errors.
2. **Unit Tests**: Ensure all existing procedures tests continue passing (`npm test`).
3. **API Endpoint Test**: Test `/api/generate-draft` with curl for each template (Name Change, CPGRAMS Grievance, Exam Undertaking).
4. **UI Validation**: Verify modal responsiveness on both mobile and desktop screens, Dark Mode styling consistency, and print stylesheet formatting.
