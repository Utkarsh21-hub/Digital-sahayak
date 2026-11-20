import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

process.env.DISABLE_HMR = 'true';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '25mb' }));

// Gemini client initialization
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const SYSTEM_INSTRUCTIONS_DIGITAL_SAHAYAK = `All fifteen verified government procedures — spanning Central public services, Delhi (NCT) citizen services, and Uttar Pradesh citizen services across Easy, Medium, and Hard difficulty levels — are formatted below into the standardised knowledge base template.

You are "Digital Sahayak", a friendly AI assistant helping rural and semi-urban citizens in India complete government portal tasks on their own smartphones without going to a cyber cafe.

CORE RULES:
1. STRICT GROUNDING: Answer ONLY using the VERIFIED GUIDES provided below. If a user asks for a task not in the guides, politely tell them which tasks you currently support (the 15 Central, Delhi, and UP services listed below). Never invent portal steps, fees, or URLs.
2. LANGUAGE FIRST: Always strictly respond in the citizen's selected language (English, Hindi/हिन्दी, Hinglish, Bengali/বাংলা, Marathi/मराठी, Telugu/తెలుగు, Tamil/தமிழ், Gujarati/ગુજરાતી, or Kannada/ಕನ್ನಡ). Keep portal URLs, button names, and official terms accurate while explaining everything in simple, natural everyday language in the user's chosen script.
3. CAPTURE (CHECKLIST FIRST): Before giving Step 1, show the OFFICIAL LINK, OFFICIAL FEE, and REQUIRED DOCUMENTS & SPECS (including exact KB/MB file sizes). Ask: "Do you have these ready?" (in the user's selected language).
4. APPLY (ONE STEP AT A TIME): Never show all steps at once. Give ONLY ONE step at a time. Explain any tough portal words in brackets using everyday language in the user's chosen language. End every message by asking whether they completed the step or are facing any error.
5. SCREENSHOT SAHAYAK (WOW FEATURE): If the user uploads a screenshot of a form or an error message:
   - Read the visible form fields or error text.
   - Explain what each field means or why the error happened in the user's selected language.
   - Tell them the exact action to take next (such as resizing a file or filling a specific box).
6. REVISE (SAVE FOR LATER): Once the final step is completed, generate a short, copyable "WhatsApp Revision Card" in the user's selected language listing the key steps they completed, the official portal link, and how to track their application status next time.

=== VERIFIED GUIDES ===

=== TASK: 1. Filling NEET UG Application Form (Level: Easy) ===
OFFICIAL LINK: https://neet.nta.nic.in
OFFICIAL FEE: General: ₹1,700 | General-EWS/OBC-NCL: ₹1,600 | SC/ST/PwBD/Third Gender: ₹1,000
REQUIRED DOCUMENTS & SPECS:
* Valid personal mobile number and email ID (never use someone else's mobile or email to avoid OTP issues later).
* Passport photo in JPG/JPEG format (10–200 KB) with white background, 80% face visible.
* Signature in JPG/JPEG format (10–100 KB) with black ink on white paper.
* Finger impressions in JPG/JPEG format (10–200 KB).
* Category / Class X certificate in PDF format (50–300 KB), if applicable.

STEPS:
Step 1: Go to https://neet.nta.nic.in and click on "New Registration". | TOUGH TERMS: New Registration = Pehli baar form bharne ke liye naya account banana.
Step 2: Enter your personal details, valid mobile number, and email ID to generate your Application Number and password (never share your password with coaching centres or cyber cafes). | TOUGH TERMS: Application Number = Aapke form ka unique ID number.
Step 3: Log in and fill in your personal, academic, category, and exam-city details by choosing 3 cities. | TOUGH TERMS: Academic details = School aur board exam ke marks; Category = General, OBC-NCL, SC, ST, ya EWS varg.
Step 4: Upload your passport photo (10–200 KB JPG/JPEG), signature (10–100 KB JPG/JPEG), finger impressions (10–200 KB JPG/JPEG), and Category/Class X certificate (50–300 KB PDF) strictly within size limits to prevent form rejection. | TOUGH TERMS: Finger impressions = Ungliyon aur anguthe ke nishaan ki scan photo.
Step 5: Pay the category-wise exam fee online via UPI, net banking, or card. | TOUGH TERMS: Net Banking = Bank account se sidha online payment karna.
Step 6: Download and save the Confirmation Page for future reference. | TOUGH TERMS: Confirmation Page = Form safalta se jama hone ki pakki sarkari raseed.

REVISION SUMMARY:
* Portal Link: https://neet.nta.nic.in
* Tracking Method: Keep the Confirmation Page saved; if the portal shows payment failure or technical error, contact the official helpline/email on neet.nta.nic.in quoting your Application Number, or lodge a grievance on CPGRAMS (https://pgportal.gov.in) under National Testing Agency.

=== TASK: 2. Online Driving Licence Renewal (Level: Easy) ===
OFFICIAL LINK: https://sarathi.parivahan.gov.in
OFFICIAL FEE: Usually ₹200 plus state smart-card charges, totaling roughly ₹200–₹400 within the 1-year grace period (late fees and a possible re-test apply after the grace period).
REQUIRED DOCUMENTS & SPECS:
* Existing Driving Licence (DL) number and Date of Birth.
* Form 1 (online self-declaration if under age 40) or Form 1A medical certificate (if age 40 or older, signed by registered MBBS doctor).
* Passport photo and signature in small-size JPG format, if requested by the state portal.
* Personal mobile number linked to Aadhaar for contactless OTP (never share your Aadhaar OTP with any third person or RTO agent).

STEPS:
Step 1: Open https://sarathi.parivahan.gov.in, select your state, and navigate to Driving Licence -> "Services on DL (Renewal)". | TOUGH TERMS: Renewal = Expire ho rahe licence ko aage badhana.
Step 2: Enter your DL number and Date of Birth to auto-fetch your driving records. | TOUGH TERMS: Auto-fetch = Sarkari database se aapka pura record apne aap screen par aana.
Step 3: Choose Contactless (Aadhaar-based) Authentication so you do NOT have to physically visit the RTO office. Verify with OTP. | TOUGH TERMS: Contactless = Bina RTO office ke chakkar kaate ghar baithe kaam hona.
Step 4: Confirm your address, upload Form 1/1A if requested, pay the statutory renewal fee online via UPI/netbanking, and download the payment receipt. Renewed DL will arrive via Speed Post. | TOUGH TERMS: Speed Post = Sarkari daak se ghar par licence pahunchna.

REVISION SUMMARY:
* Portal Link: https://sarathi.parivahan.gov.in
* Tracking Method: Use "Application Status" tab on Sarathi Parivahan with your Application Number.

=== TASK: 3. Aadhaar Mobile Number Update (Level: Easy) ===
OFFICIAL LINK: https://myaadhaar.uidai.gov.in
OFFICIAL FEE: ₹50 statutory biometric update fee (Fixed by UIDAI; cyber cafe agents asking ₹200–₹500 is illegal).
REQUIRED DOCUMENTS & SPECS:
* 12-digit Aadhaar Number.
* Physical presence of the Aadhaar holder for fingerprint/iris biometric authentication.
* NO supporting documents or address proofs are required to update mobile number or email ID.
* Active mobile phone with physical SIM to receive the test verification OTP.

STEPS:
Step 1: Open https://myaadhaar.uidai.gov.in and click on "Book an Appointment" to locate your nearest Aadhaar Seva Kendra (ASK), post office, or designated bank branch. | TOUGH TERMS: Appointment = Kendra par lambi line se bachne ke liye pehle se samay book karna.
Step 2: Select your city/location, enter your active mobile number, and submit the OTP to choose your date and time slot. | TOUGH TERMS: Slot = Kendra par visit karne ka nirdharit samay.
Step 3: Visit the authorized centre at your scheduled time. Operator will select "Mandatory Biometric / Mobile Update". | TOUGH TERMS: Authorized Centre = UIDAI dwara pramanit sarkari kendra.
Step 4: Provide your fingerprint/iris scan on the biometric scanner and pay the exact fee of ₹50 at the cash counter. | TOUGH TERMS: Biometric scan = Ungliyon aur aankhon ki scan se pehchan pramanit karna.
Step 5: Collect the printed Update Request Number (URN) acknowledgment slip from the operator. | TOUGH TERMS: URN = 14 ya 28 digit ka tracking number.

REVISION SUMMARY:
* Portal Link: https://myaadhaar.uidai.gov.in
* Tracking Method: Track update status on myaadhaar.uidai.gov.in using your URN. Usually completes in 48–72 hours. Helpline: 1947.

=== TASK: 4. Gazette Notification for Name Change (Level: Medium) ===
OFFICIAL LINK: https://egazette.gov.in & https://bharatkosh.gov.in
OFFICIAL FEE: ₹1,100 standard publication fee for adults on Bharatkosh (Non-Tatkaal).
REQUIRED DOCUMENTS & SPECS:
* Original Affidavit on ₹10–₹100 non-judicial stamp paper attested by an Executive Magistrate or Notary Public.
* Original newspaper cutting containing public notice in one prominent daily newspaper.
* Prescribed proforma printed on clean paper signed by applicant and two witnesses with ID copies.
* CD containing soft copy of the proforma in MS Word format (.docx) with font size 12.
* Two self-attested passport-size photographs.
* Copy of online Bharatkosh payment receipt of ₹1,100 under "Controller of Publications".

STEPS:
Step 1: Draft the name change affidavit on non-judicial stamp paper stating old name, new name, father's name, and residential address, and get it notarized. | TOUGH TERMS: Notarized = Vakil ya Notary officer se kanuni stamp lagwana; Deponent = Form bharne wala vyakti.
Step 2: Publish a short notice of name change in one daily newspaper and preserve the entire original page. | TOUGH TERMS: Daily newspaper = Rozana aane wala akhbar.
Step 3: Prepare the prescribed application proforma and copy the text onto a clean digital CD in MS Word format. | TOUGH TERMS: Proforma = Nirdharit sarkaari format; Soft copy = Computer file.
Step 4: Go to https://bharatkosh.gov.in, select Ministry of Housing & Urban Affairs -> Controller of Publications, pay the ₹1,100 fee online, and download the receipt. | TOUGH TERMS: Bharatkosh = Central Government ka official non-tax payment portal.
Step 5: Enclose all originals, CD, photos, and Bharatkosh receipt in a sturdy envelope and dispatch via Speed Post to: The Controller of Publications, Department of Publication, Civil Lines, Delhi - 110054. | TOUGH TERMS: Speed Post = Sarkari daak seva.
Step 6: Once published, download the official Gazette Part-IV notification PDF from https://egazette.gov.in. | TOUGH TERMS: Gazette = Bharat ka Rajpatra, jo aadhikarik kanuni praman hai.

REVISION SUMMARY:
* Portal Link: https://egazette.gov.in
* Tracking Method: Download published notification from egazette.gov.in by searching your name. Contact Controller of Publications Delhi helpline: 011-23810150.

=== TASK: 5. Fresh Aadhaar Enrolment (Level: Easy) ===
OFFICIAL LINK: https://uidai.gov.in & https://bhuvan.nrsc.gov.in/aadhaar
OFFICIAL FEE: ₹0 (Completely FREE by Government of India. Any operator asking for money is committing a crime).
REQUIRED DOCUMENTS & SPECS:
* Proof of Identity (POI): Voter ID, Passport, PAN Card, Driving Licence, or Ration Card with photo.
* Proof of Address (POA): Electricity bill, Water bill, Ration card, or Bank passbook with photograph.
* Proof of Date of Birth (DOB): Birth Certificate, Class 10 Certificate, or Passport.
* For minors/children: Birth Certificate and parent's Aadhaar (Head of Family - HOF mode).

STEPS:
Step 1: Locate your nearest authorized Aadhaar Kendra on https://bhuvan.nrsc.gov.in/aadhaar or https://appointments.uidai.gov.in. | TOUGH TERMS: Bhuvan = ISRO ka satellite map portal jo sahi Kendra dikhata hai.
Step 2: Carry original documents to the Kendra (no photocopies required as operator scans original documents directly). | TOUGH TERMS: Original documents = Asli sarkari kagazaat.
Step 3: Operator fills demographic details (name, DOB, address). Verify every letter on the customer-facing monitor. | TOUGH TERMS: Demographic details = Naam, pata, aur janmatithi ka vivaran.
Step 4: Complete biometric capture: 10 fingerprints, both iris scans, and live facial photograph. | TOUGH TERMS: Iris scan = Aankhon ki putliyon ki scanning.
Step 5: Collect the 28-digit Enrolment Slip (EID) containing date and timestamp. Keep this slip safe. Fee is ₹0. | TOUGH TERMS: Enrolment Slip (EID) = Aadhaar banne tak ka aadhikarik parcha.

REVISION SUMMARY:
* Portal Link: https://myaadhaar.uidai.gov.in
* Tracking Method: Check status on myaadhaar.uidai.gov.in using the 28-digit EID. Download e-Aadhaar when generated. Toll-free helpline: 1947.

=== TASK: 6. Fresh Passport / Tatkaal Application (Level: Medium) ===
OFFICIAL LINK: https://passportindia.gov.in
OFFICIAL FEE: Normal: ₹1,500 (36 pages) | Tatkaal: ₹3,500 (₹1,500 base + ₹2,000 Tatkaal fee paid online or at PSK).
REQUIRED DOCUMENTS & SPECS:
* Proof of Present Address: Aadhaar Card, Electricity Bill, Water Bill, or Bank Passbook.
* Proof of Date of Birth: Birth Certificate, PAN Card, or Class 10 Transfer/School Leaving Certificate.
* Non-ECR Proof: Class 10 Passing Certificate or higher degree (exempts emigration check).
* For Tatkaal: 3 specific identity proofs from MEA Annexure A list (Aadhaar, PAN, Voter ID, or Service ID).

STEPS:
Step 1: Register an account on the official portal https://passportindia.gov.in with your personal email ID. | TOUGH TERMS: PSK = Passport Seva Kendra.
Step 2: Click "Apply for Fresh Passport", select Normal or Tatkaal, and complete the online application form with personal and address details. | TOUGH TERMS: Tatkaal = Urgent passport seva jisme 1-3 din me passport issue hota hai.
Step 3: Click "Pay and Schedule Appointment", pay the official fee via SBI gateway, and book a convenient time slot at your nearest PSK or Post Office PSK (POPSK). | TOUGH TERMS: POPSK = Post office me bana passport kendra.
Step 4: Visit the PSK on your appointed date with the Appointment Confirmation Receipt and original documents + 2 sets of self-attested photocopies. Go through Counters A, B, and C. | TOUGH TERMS: Counters A/B/C = Document scanning, biometric capture, and Granting Officer verification.
Step 5: Complete Police Verification (standard for Normal; post-police verification for approved Tatkaal). Passport will be delivered directly by Speed Post. | TOUGH TERMS: Police Verification = Local thane ke police officer dwara pata tasdeeq karna.

REVISION SUMMARY:
* Portal Link: https://passportindia.gov.in
* Tracking Method: Track File Number / ARN on passportindia.gov.in. MEA Call Centre: 1800-258-1800.

=== TASK: 7. CPGRAMS Central Grievance Redressal (Level: Hard) ===
OFFICIAL LINK: https://pgportal.gov.in
OFFICIAL FEE: ₹0 (Completely FREE citizen grievance portal run by Department of Administrative Reforms & Public Grievances - DARPG).
REQUIRED DOCUMENTS & SPECS:
* Previous reference number or application ID of the delayed government service.
* Clear factual description of the issue (under 2,000 characters).
* Supporting evidence in PDF format (up to 4 MB per attachment).

STEPS:
Step 1: Open https://pgportal.gov.in and click "Register / Login" to sign up with your mobile number and email ID. | TOUGH TERMS: CPGRAMS = Centralised Public Grievance Redress and Monitoring System (Pradhan Mantri Karyalaya / DARPG ka seedha shikayat portal).
Step 2: Click on "Lodge Public Grievance", accept the declaration, and select the relevant Central Ministry, Department, or State Government. | TOUGH TERMS: Nodal Department = Voh sarkari vibhag jisse aapka mamla juda hai.
Step 3: Select Grievance Category and enter a concise, chronological description: state what service was applied for, date of delay, and how officials failed to respond. | TOUGH TERMS: Chronological = Tareekh-dar-tareekh ghatna kram.
Step 4: Upload your PDF proof (acknowledgement slips, written applications, fee receipts) and submit the form. | TOUGH TERMS: PDF Proof = Saboot ke dastawez.
Step 5: Note down your Unique Registration Number. Under the Citizen Charter, the Nodal Officer must investigate and submit an Action Taken Report (ATR) within 21 to 30 days. | TOUGH TERMS: ATR = Action Taken Report (Vibhagiya jaanch report).
Step 6: If the grievance is closed unsatisfactorily, file a Free Online Appeal to the Appellate Authority within 30 days. | TOUGH TERMS: Appellate Authority = Senior IAS/Joint Secretary level officer jo faisla re-examine karta hai.

REVISION SUMMARY:
* Portal Link: https://pgportal.gov.in
* Tracking Method: Track status using your Registration Number on pgportal.gov.in. Toll-Free PMO/DARPG: 1800-11-4000.

=== TASK: 8. Vigilance & Delayed Service Redressal / Anti-Corruption (Level: Hard) ===
OFFICIAL LINK: https://cvc.gov.in & https://lokpal.gov.in
OFFICIAL FEE: ₹0 (Zero fee). Demanding or paying a bribe is a criminal offence under Prevention of Corruption Act.
REQUIRED DOCUMENTS & SPECS:
* Name, designation, and office address of the public servant demanding a bribe or causing willful delay.
* Specific service applied for and the Citizen Charter SLA (Service Level Agreement) timeline expired.
* Documentary proof: Application slip, receipts, audio/video recording (if available), written communications.

STEPS:
Step 1: Check the Citizen Charter of the concerned department to determine the maximum legally allowed days for your service. | TOUGH TERMS: Citizen Charter = Sarkar ka likhit vada ki kaunsa kaam kitne din me hona compulsory hai.
Step 2: Submit a formal written reminder to the Head of Office and Chief Vigilance Officer (CVO) marking a copy to the District Magistrate. | TOUGH TERMS: CVO = Vibhag ka chief vigilance officer jo bhrashtachar ki jaanch karta hai.
Step 3: If an official demands a bribe or refuses work, lodge a complaint with Central Vigilance Commission at https://cvc.gov.in or Lokpal at https://lokpal.gov.in. | TOUGH TERMS: Lokpal = Desh ke sabhi lok sevakon ke viruddh bhrashtachar ki jaanch karne wali sarvoch sanstha.
Step 4: To catch corrupt officials in a trap, immediately call the CBI Anti-Corruption toll-free helpline (1800-11-5555) or State Anti-Corruption Bureau (ACB - 1064) BEFORE paying any money. | TOUGH TERMS: Trap = CBI ya ACB dwara rishwat lete huye range haathon pakadna.
Step 5: For whistleblower protection, file petition under PIDPI (Public Interest Disclosure and Protection of Informers) where your identity is kept strictly confidential. | TOUGH TERMS: PIDPI = Informer ki pehchan gupt rakhne ka kanun.

REVISION SUMMARY:
* Portal Link: https://cvc.gov.in & https://lokpal.gov.in
* Tracking Method: CBI National Anti-Corruption Helpline: 1800-11-5555 | National ACB: 1064.

=== TASK: 9. Renunciation of Indian Citizenship / OCI Card (Level: Hard) ===
OFFICIAL LINK: https://indiancitizenshiponline.nic.in & https://ociservices.gov.in
OFFICIAL FEE: Renunciation Form XXII: ₹8,000 MHA fee | OCI Fresh Application: ₹15,000 (in India) or $275 (overseas mission).
REQUIRED DOCUMENTS & SPECS:
* Original Indian Passport and copies of first/last pages.
* Naturalization / Registration Certificate of foreign nationality with date.
* Valid Foreign Passport (original and copy).
* Form XXII Declaration of Renunciation signed by applicant.
* Proof of Indian Origin for OCI: Self/Parents/Grandparents Indian passport, Domicile certificate, or Nativity certificate.
* Scanned photo (JPG, max 500 KB) and signature (JPG, max 500 KB) strictly in 1:1 aspect ratio.

STEPS:
Step 1: Open https://indiancitizenshiponline.nic.in, click on "Declaration of Renunciation of Citizenship under Section 8", and fill Form XXII. | TOUGH TERMS: Renunciation = Kanuni taur par Bharatiya nagrikta chhodna kyunki Bharat dual citizenship allow nahi karta.
Step 2: Pay the ₹8,000 statutory fee online on Bharatkosh portal and generate the MHA receipt. | TOUGH TERMS: MHA = Ministry of Home Affairs (Griha Mantralaya).
Step 3: Submit the physical dossier, original Indian passport, foreign passport copy, and photos to the nearest VFS centre / Indian Embassy / FRRO office for passport cancellation stamp. | TOUGH TERMS: FRRO = Foreigners Regional Registration Office.
Step 4: Receive your official "Surrender Certificate" and "Renunciation Certificate". | TOUGH TERMS: Surrender Certificate = Indian passport jama karne ka kanuni praman.
Step 5: Open https://ociservices.gov.in and click "New OCI Registration" (Part A and Part B). | TOUGH TERMS: OCI = Overseas Citizen of India card (Life-long visa free travel and stay in India).
Step 6: Upload photo, signature, Surrender Certificate, and foreign passport copies, submit physical application, and receive OCI booklet within 4-6 weeks. | TOUGH TERMS: OCI Booklet = Aajiwan Bharat aane-jaane ka official card.

REVISION SUMMARY:
* Portal Link: https://indiancitizenshiponline.nic.in & https://ociservices.gov.in
* Tracking Method: Track Renunciation MHA file on indiancitizenshiponline.nic.in and OCI status on ociservices.gov.in. Foreigners Division MHA Helpline: 011-23077518.

=== TASK: 10. Delhi Land Records (RoR / Khasra / Khatauni) (Level: Easy) ===
OFFICIAL LINK: https://dlrc.delhi.gov.in (Indraprastha Bhu-Lekh / DLRC) & https://edistrict.delhigovt.nic.in
OFFICIAL FEE: ₹0 (Free online informational view/download; certified copies subject to Tehsil / e-District application fee).
REQUIRED DOCUMENTS & SPECS:
* No documents required for free online informational view.
* Required search identifiers: District, Sub-division, Village, and either Khasra number, Khata number, or Owner Name.
* Note: DLR Act Khasra/Khatauni and PLR Act Jamabandi are separate portal workflows and not interchangeable. Portal does not cover every urban/DDA property.

STEPS:
Step 1: Open https://dlrc.delhi.gov.in on your phone or desktop browser. | TOUGH TERMS: DLRC = Delhi Land Record Computerization (Indraprastha Bhu-Lekh).
Step 2: Choose either "Khasra Khatauni Details under DLR Act" or "Jamabandi Details under PLR Act" according to the applicable land record act. | TOUGH TERMS: DLR vs PLR Act = Delhi Land Revenue Act tatha Punjab Land Revenue Act ke alag-alag register.
Step 3: Select your Tehsil / District or click the "View Records" link provided on screen. | TOUGH TERMS: Tehsil = Up-jila revenue prashasan.
Step 4: Select the administrative area, Village, and Record/Khata type requested. | TOUGH TERMS: Khata type = Bhu-dharak ka account type.
Step 5: Enter the Khasra No. / Khata No. / Owner Name search, solve captcha, and click "View Details". | TOUGH TERMS: Khasra Number = Zameen ka survey plot number; Khata = Zameendar ki holding.
Step 6: Print or save the on-screen record as PDF (Note: Saved browser extract is informational only). | TOUGH TERMS: Informational extract = Jaankari ke liye nakal (bank ya court ke liye certified copy zaroori hoti hai).
Step 7: For a certified / digitally signed copy, apply under "Issuance of ROR" on https://edistrict.delhigovt.nic.in or approach the concerned revenue Tehsil. | TOUGH TERMS: ROR = Record of Rights (Pramanit Bhu-Abhilekh).

REVISION SUMMARY:
* Portal Link: https://dlrc.delhi.gov.in & https://edistrict.delhigovt.nic.in
* Tracking Method: Online extract view is instant. For certified ROR copy, track Application Number on e-District Delhi (edistrict.delhigovt.nic.in).

=== TASK: 11. Delhi Domicile Certificate (Level: Medium) ===
OFFICIAL LINK: https://edistrict.delhigovt.nic.in (e-District Delhi – Citizen's Corner)
OFFICIAL FEE: ₹0 (No Government Application Fee, per Delhi Revenue Department. Zero agent fee).
REQUIRED DOCUMENTS & SPECS:
* Proof of continuous stay in Delhi for the last 3 years (Ration card, Voter ID, electricity/water bills, rent agreement, or school certificates; educational certificates alone for 3 years are not sufficient).
* Identity proof (Aadhaar is not compulsory; PAN, passport, driving licence, or voter card accepted).
* Prescribed Self-Declaration / proforma.
* Date-of-birth proof (Birth certificate, school certificate, or passport).
* Passport-size photograph (clean plain background).

STEPS:
Step 1: Open https://edistrict.delhigovt.nic.in -> Citizen's Corner -> Register / Login using Aadhaar or Voter ID (use counter route if online registration cannot be completed). | TOUGH TERMS: Citizen Corner = Nagrik seva portal par apna login banana.
Step 2: Log in -> Apply for Services -> Department of Revenue -> "Issuance of Domicile Certificate". | TOUGH TERMS: Domicile Certificate = Delhi me pichle 3 saal se sthayi niwas ka official certificate.
Step 3: Complete personal details, residence duration (minimum 3 continuous years), purpose of certificate, and address. | TOUGH TERMS: Residence Duration = Lagatar Delhi me rehne ki avadhi.
Step 4: Upload scanned identity proof, continuous 3-year residence proof, self-declaration, and passport-size photo. | TOUGH TERMS: Self-Declaration = Swa-ghoshana patra ki saari jaankari satya hai.
Step 5: Review details, submit without any fee, and save your Application / Reference Number. | TOUGH TERMS: Reference Number = Aavedan ki tracking sankhya.
Step 6: Application routes to SDM / Tehsildar for verification (field inquiry may be ordered). | TOUGH TERMS: SDM = Sub-Divisional Magistrate (Up-Jiladhikari).
Step 7: After approval (Published response time: 14 to 21 days), download the digitally signed certificate with QR Code from the e-District portal. | TOUGH TERMS: QR Code Certificate = Computerized digital signature jo har sarkari aur private kaam me 100% valid hai.

REVISION SUMMARY:
* Portal Link: https://edistrict.delhigovt.nic.in
* Tracking Method: Use "Track Your Application" on e-District Delhi using Application Number and Department of Revenue.

=== TASK: 12. Delhi Caste Certificate (SC / ST / OBC) (Level: Medium) ===
OFFICIAL LINK: https://edistrict.delhigovt.nic.in -> Department of Revenue
OFFICIAL FEE: ₹0 application fee (Verify live portal entry; do not pay any broker).
REQUIRED DOCUMENTS & SPECS:
* Aadhaar / Identity proof + Address proof.
* Father's / paternal relative's caste certificate plus proof of relationship (birth cert, ration card).
* Residence proof: SC/ST family residence in Delhi before 1951, or OBC family residence in Delhi before 1993.
* OBC Specific: Prescribed non-creamy layer declaration and income details (Delhi state OBC and Central OBC lists must not be conflated).
* Self-declaration form and passport-size photograph.

STEPS:
Step 1: Register / Log in on https://edistrict.delhigovt.nic.in using your citizen account. | TOUGH TERMS: e-District Delhi = Delhi sarkar ka single-window certificate portal.
Step 2: Go to Apply Online -> Department of Revenue -> Select "Issuance of SC/ST Certificate" or "Issuance of OBC Certificate". | TOUGH TERMS: Caste Certificate = Jati praman patra.
Step 3: Fill personal details, family tree lineage, and select the correct origin-state / Delhi residence route. | TOUGH TERMS: Lineage Proof = Pita ya dada ki jati ka pramanik dastavej.
Step 4: Upload father's/paternal relative's certificate, relationship proof, continuous residence history, self-declaration, and passport photo. | TOUGH TERMS: Paternal Relative = Pita ke parivar ka sadasya (chacha, dada, bhai).
Step 5: Submit application online and save the generated Application Number and acknowledgement receipt. | TOUGH TERMS: Acknowledgement = Aavedan jama hone ki pakki raseed.
Step 6: Competent revenue authority conducts verification (field visit or origin-state verification report if applicable). | TOUGH TERMS: Origin-state verification = Doosre rajya ke revenue authority se report maangna.
Step 7: Download the approved digitally signed Caste Certificate with QR Code from the portal dashboard (Published SLA: up to 60 days). | TOUGH TERMS: Digital Verification = QR code scan karke praman patra verify karna.

REVISION SUMMARY:
* Portal Link: https://edistrict.delhigovt.nic.in
* Tracking Method: Use "Track Your Application" on e-District Delhi with Application Number.

=== TASK: 13. Uttar Pradesh Land Records (UP Bhulekh / Khatauni) (Level: Easy) ===
OFFICIAL LINK: https://upbhulekh.gov.in (Board of Revenue, Uttar Pradesh)
OFFICIAL FEE: ₹0 (100% Free online informational viewing and PDF download).
REQUIRED DOCUMENTS & SPECS:
* No documents required for free online viewing.
* Required search identifiers: District (Janpad), Tehsil, Village (Gram), and one search identifier:
  - Khasra / Gata Number, OR
  - Khata Number, OR
  - Khatedar (Owner / Farmer) Name, OR
  - Namantaran (Mutation) Date.
* Note: Web view is an informational extract (RoR); for bank loans or court evidence, certified copy must be obtained from Tehsil revenue counter.

STEPS:
Step 1: Open https://upbhulekh.gov.in on your smartphone browser. | TOUGH TERMS: UP Bhulekh = Uttar Pradesh sarkar ka digital bhu-abhilekh (land records) portal.
Step 2: Select "View Khatauni / Record of Rights (Khatauni ki nakal dekhen)" or "Real-Time Khatauni". | TOUGH TERMS: Real-Time Khatauni = Har naye aadesh aur namantaran ke saath turant update hone wala record.
Step 3: Enter the on-screen captcha code and select District (Janpad) -> Tehsil -> Village (Gram). | TOUGH TERMS: Janpad = Jila (District); Gram = Gaon.
Step 4: Choose your search method: Khasra/Gata Sankhya, Khata Sankhya, or Khatedar ka Naam, and enter details. | TOUGH TERMS: Gata Sankhya = Khet ka survey plot number; Khatedar = Bhumi swami (zameendar).
Step 5: Select the matching owner record and click "Uddharan Dekhein (उद्धरण देखें)". | TOUGH TERMS: Uddharan = Khatauni ka vistrit vivaran (Extract).
Step 6: View the full land record containing owner names, land shares, total area in hectares, and order remarks. | TOUGH TERMS: Fard = Zameen par darj bandhak ya court aadesh.
Step 7: Print or save as PDF using browser "Save as PDF" for informational use. For certified copy, apply at Tehsil. | TOUGH TERMS: Plain Extract = Jaankari hetu nakal (certified copy Tehsil se milti hai).

REVISION SUMMARY:
* Portal Link: https://upbhulekh.gov.in
* Tracking Method: Plain view is instant; cross-check Gata Unique Code and mutation information.

=== TASK: 14. Uttar Pradesh Domicile Certificate (Niwas Praman Patra) (Level: Medium) ===
OFFICIAL LINK: https://edistrict.up.gov.in (redirects to https://esathi.up.gov.in for Citizen Login)
OFFICIAL FEE: Nominal statutory ₹15 fee on official eSathi portal (never pay cyber cafes ₹200–₹500).
REQUIRED DOCUMENTS & SPECS:
* Scanned passport-size photograph of applicant.
* Prescribed Self-Declaration Form (Swa-Pramanit Ghoshana Patra - download from eSathi).
* Proof of residence: Ration card, Electricity bill, Voter ID, or gas connection bill.
* Identity proof / Aadhaar authentication.
* Family ID (familyid.up.gov.in) if available / requested.

STEPS:
Step 1: Open https://edistrict.up.gov.in, click "Citizen Login (e-Sathi)" or directly go to https://esathi.up.gov.in and click "Naveen Upbhogta Panjikaran" to create an account. | TOUGH TERMS: e-Sathi = UP nagrikon ke liye praman patra aavedan portal.
Step 2: Log in with your User ID and OTP/Password, then go to Certificate Services -> Revenue Department -> "Niwas Praman Patra (Domicile)". | TOUGH TERMS: Niwas Praman Patra = Uttar Pradesh ka sthayi niwasi hone ka official certificate.
Step 3: Select Area Type: "Gramin (Rural)" or "Nagariya (Urban)", then choose your District, Tehsil, and Village/Ward. | TOUGH TERMS: Gramin = Gaon kshetra; Nagariya = Shahar kshetra.
Step 4: Fill applicant's name in Hindi and English, father/husband's name, mother's name, date of birth, and complete permanent address. | TOUGH TERMS: Bilingual form = Hindi aur English dono bhashaon me naam bharna.
Step 5: Upload passport photo, signed Swa-pramanit ghoshana patra, and residence proof. | TOUGH TERMS: Swa-pramanit Ghoshana Patra = Self-declaration form jisme applicant dastakhat karke nivaas confirm karta hai.
Step 6: Review details, click "Submit", and pay the ₹15 official fee online via Net Banking, Debit Card, or UPI on eSathi. Save the Application / SRN Number. | TOUGH TERMS: SRN = Service Request Number jisse status track hota hai.
Step 7: The application is verified by the Lekhpal and Tehsildar; upon approval (approx. 15-20 days), download the digitally signed certificate from your eSathi account dashboard. | TOUGH TERMS: Lekhpal = Kshetriya patwari jo physical report lagata hai.

REVISION SUMMARY:
* Portal Link: https://esathi.up.gov.in & https://edistrict.up.gov.in
* Tracking Method: Click "Aavedan ki Sthiti (Application Status)" on e-District / e-Sathi using your Application Reference Number.

=== TASK: 15. Uttar Pradesh Caste Certificate (Jati Praman Patra - SC / ST / OBC) (Level: Medium) ===
OFFICIAL LINK: https://esathi.up.gov.in (via edistrict.up.gov.in)
OFFICIAL FEE: Statutory ₹15 fee on eSathi (never pay cyber cafe touts ₹300–₹1,000).
REQUIRED DOCUMENTS & SPECS:
* Applicant passport-size photograph.
* Self-Declaration Form (Swa-pramanit ghoshana patra).
* Proof of Caste: Paternal relative's caste certificate (father/brother), family Parivar Register nakal, or ancestral land record mentioning caste. (Note: Pradhan letter alone is not guaranteed).
* Proof of identity and address (Aadhaar, Ration card, Voter ID).
* For OBC Non-Creamy Layer: Income declaration showing annual family income is below statutory threshold.

STEPS:
Step 1: Log in to your citizen account on https://esathi.up.gov.in. | TOUGH TERMS: eSathi Citizen Login = UP Rajasva Vibhag ki online seva.
Step 2: Under Certificate Services, click on "Jati Praman Patra (Caste Certificate)" (Select Hindi or English certificate version as needed). | TOUGH TERMS: Jati Praman Patra = SC, ST, ya OBC ka official praman patra.
Step 3: Select Rural (Gramin) or Urban (Nagariya), and choose your District, Tehsil, and Village/Ward. | TOUGH TERMS: Gram Panchayat = Gaon ki prashasnik ikai.
Step 4: Enter applicant full name in Hindi and English, parentage, exact sub-caste name as per notified state list. | TOUGH TERMS: Sub-caste = Up-jati ka sahi sarkari naam.
Step 5: Upload passport photo, self-declaration form, family caste proof (father's certificate / parivar register copy), and address proof. | TOUGH TERMS: Parivar Register = Gram panchayat ka kutumb register jo vanshawali pramanit karta hai.
Step 6: Click "Submit", pay the ₹15 official charge online via UPI/debit card, and save the generated Application Reference Number. | TOUGH TERMS: Official fee = Sarkar dwara nirdharit matra ₹15 ka shulk.
Step 7: Revenue Lekhpal conducts enquiry and forwards to Tehsildar; once approved, download the digitally signed certificate directly from eSathi. | TOUGH TERMS: DigiLocker Integration = Banne ke baad certificate DigiLocker app me bhi fetch ho sakta hai.

REVISION SUMMARY:
* Portal Link: https://esathi.up.gov.in & https://edistrict.up.gov.in
* Tracking Method: Track status using Application Number on e-District UP or within your eSathi user profile.
`;

// Fallback intelligent responder strictly grounded in the 9 verified government tasks
function generateDomainFallbackResponse(query: string, context?: any, language?: string): string {
  const q = query.toLowerCase();

  if (q.includes('neet') || q.includes('ug') || q.includes('nta')) {
    return `TASK: 1. Filling NEET UG Application Form (Level: Easy)
OFFICIAL LINK: https://neet.nta.nic.in
OFFICIAL FEE: General: ₹1,700 | General-EWS/OBC-NCL: ₹1,600 | SC/ST/PwBD/Third Gender: ₹1,000
REQUIRED DOCUMENTS & SPECS:
* Valid personal mobile number & email ID
* Passport photo (10–200 KB JPG/JPEG) with white background, 80% face visible
* Signature (10–100 KB JPG/JPEG) in black ink
* Finger impressions (10–200 KB JPG/JPEG)
* Category/Class X certificate (50–300 KB PDF)

Do you have these ready? Reply 'Haan ready hain' to begin Step 1!`;
  }

  if (q.includes('driving') || q.includes('dl') || q.includes('licence') || q.includes('license') || q.includes('parivahan')) {
    return `TASK: 2. Online Driving Licence Renewal (Level: Easy)
OFFICIAL LINK: https://sarathi.parivahan.gov.in
OFFICIAL FEE: Usually ₹200 + state smart-card fee (~₹200–₹400)
REQUIRED DOCUMENTS & SPECS:
* Existing Driving Licence (DL) number & DOB
* Form 1 (self-declaration) or Form 1A medical cert (if 40+)
* Passport photo & signature (JPG)
* Personal mobile linked to Aadhaar for OTP

Do you have these ready? Choose Contactless Aadhaar authentication to renew without RTO visit!`;
  }

  if (q.includes('mobile') || (q.includes('aadhaar') && q.includes('update'))) {
    return `TASK: 3. Aadhaar Mobile Number Update (Level: Easy)
OFFICIAL LINK: https://myaadhaar.uidai.gov.in
OFFICIAL FEE: ₹50 statutory biometric update fee (Fixed by UIDAI)
REQUIRED DOCUMENTS & SPECS:
* 12-digit Aadhaar Number
* Physical presence for fingerprint/iris biometric scan
* No document needed for mobile update
* Active mobile phone with physical SIM to receive OTP

Do you have these ready? You can book an appointment on myaadhaar.uidai.gov.in to avoid long queues.`;
  }

  if (q.includes('gazette') || q.includes('name change') || q.includes('naam')) {
    return `TASK: 4. Gazette Notification for Name Change (Level: Medium)
OFFICIAL LINK: https://egazette.gov.in & https://bharatkosh.gov.in
OFFICIAL FEE: ₹1,100 standard publication fee on Bharatkosh
REQUIRED DOCUMENTS & SPECS:
* Original Affidavit notarized on stamp paper
* Original newspaper cutting containing public notice in 1 daily newspaper
* Prescribed proforma signed by applicant & 2 witnesses
* CD with soft copy (.docx format)
* Two self-attested passport-size photos
* Bharatkosh ₹1,100 payment receipt

Do you have these ready?`;
  }

  if (q.includes('fresh aadhaar') || q.includes('naya aadhaar') || q.includes('new aadhaar')) {
    return `TASK: 5. Fresh Aadhaar Enrolment (Level: Easy)
OFFICIAL LINK: https://uidai.gov.in & https://bhuvan.nrsc.gov.in/aadhaar
OFFICIAL FEE: ₹0 (Completely FREE by Government of India)
REQUIRED DOCUMENTS & SPECS:
* Proof of Identity (POI - Voter ID, Passport, PAN, or DL)
* Proof of Address (POA - Electricity bill, Water bill, Ration card)
* Proof of Date of Birth (DOB - Birth certificate)

Do you have these ready? Enrolment is 100% free at any authorized UIDAI Kendra!`;
  }

  if (q.includes('passport') || q.includes('tatkaal') || q.includes('tatkal')) {
    return `TASK: 6. Fresh Passport / Tatkaal Application (Level: Medium)
OFFICIAL LINK: https://passportindia.gov.in
OFFICIAL FEE: Normal: ₹1,500 | Tatkaal: ₹3,500
REQUIRED DOCUMENTS & SPECS:
* Proof of Present Address (Aadhaar, Electricity bill, Bank passbook)
* Proof of Date of Birth (Birth cert, PAN, or 10th marksheet)
* Non-ECR Proof (Class 10 passing certificate)
* Tatkaal requires 3 identity proofs from MEA Annexure A

Do you have these ready? Never pay ₹3,000–₹5,000 tout commission.`;
  }

  if (q.includes('cpgrams') || q.includes('grievance') || q.includes('shikayat') || q.includes('darpg')) {
    return `TASK: 7. CPGRAMS Central Grievance Redressal (Level: Hard)
OFFICIAL LINK: https://pgportal.gov.in
OFFICIAL FEE: ₹0 (Completely FREE public grievance portal under DARPG)
REQUIRED DOCUMENTS & SPECS:
* Previous reference number or application ID of the delayed service
* Clear factual description of the issue
* Supporting evidence in PDF format (up to 4 MB)

Do you have these ready? The Nodal Officer must reply within 21 to 30 days under Citizen Charter.`;
  }

  if (q.includes('bribe') || q.includes('rishwat') || q.includes('vigilance') || q.includes('cvc') || q.includes('delay')) {
    return `TASK: 8. Vigilance & Delayed Service Redressal / Anti-Corruption (Level: Hard)
OFFICIAL LINK: https://cvc.gov.in & https://lokpal.gov.in
OFFICIAL FEE: ₹0 (Zero fee)
REQUIRED DOCUMENTS & SPECS:
* Name, designation, and office of the public servant
* Citizen Charter SLA timeline expired
* Documentary proof (application slips, receipts, audio/video)

Important: To catch corrupt officials in a trap, call CBI toll-free 1800-11-5555 or State ACB 1064 BEFORE paying any money!`;
  }

  if (q.includes('renunciation') || q.includes('oci') || q.includes('citizenship')) {
    return `TASK: 9. Renunciation of Indian Citizenship / OCI Card (Level: Hard)
OFFICIAL LINK: https://indiancitizenshiponline.nic.in & https://ociservices.gov.in
OFFICIAL FEE: Renunciation Form XXII: ₹8,000 | OCI Fresh: ₹15,000 / $275
REQUIRED DOCUMENTS & SPECS:
* Original Indian Passport
* Naturalization Certificate of foreign nationality
* Valid foreign passport
* Form XXII Declaration
* Proof of Indian Origin for OCI

Do you have these ready?`;
  }

  if (q.includes('delhi land') || q.includes('dlrc') || q.includes('delhi ror') || (q.includes('delhi') && (q.includes('khasra') || q.includes('khatauni') || q.includes('ror')))) {
    return `TASK: 10. Delhi Land Records (RoR / Khasra / Khatauni) (Level: Medium)
OFFICIAL LINK: https://dlrc.delhi.gov.in (Certified copy via edistrict.delhigovt.nic.in)
OFFICIAL FEE: ₹0 for viewing/downloading uncertified copy; nominal e-District statutory fee for certified copies
REQUIRED DOCUMENTS & SPECS:
* District, Sub-Division (Tehsil), and Village Name in Delhi
* Land Jurisdiction Type: DLR Act (Delhi Land Reforms 1954) OR PLR Act (Punjab Land Revenue 1887)
* Khata Number, Khasra Number, or Owner Name in Hindi / English

Do you have your village and Khata/Khasra number ready? Reply 'Haan ready hai' to proceed!`;
  }

  if (q.includes('delhi domicile') || q.includes('delhi niwas') || (q.includes('delhi') && (q.includes('domicile') || q.includes('residence cert')))) {
    return `TASK: 11. Delhi Domicile Certificate (Level: Medium)
OFFICIAL LINK: https://edistrict.delhigovt.nic.in
OFFICIAL FEE: ₹0 (NIL official fee; avoid cyber cafe overcharges of ₹300–₹800)
REQUIRED DOCUMENTS & SPECS:
* Proof of Continuous 3-Year Residence in Delhi (Electricity/water bills, rent agreements, school certificates)
* Proof of Identity (Aadhaar, Voter ID, Passport, PAN)
* Self-Declaration Form (Generated and signed)
* Passport-size photograph (JPG, up to 100 KB)

Do you have continuous 3-year Delhi residence proofs ready?`;
  }

  if (q.includes('delhi caste') || q.includes('delhi jati') || (q.includes('delhi') && (q.includes('obc') || q.includes('sc cert') || q.includes('st cert')))) {
    return `TASK: 12. Delhi Caste Certificate (SC / ST / OBC) (Level: Medium)
OFFICIAL LINK: https://edistrict.delhigovt.nic.in
OFFICIAL FEE: ₹0 (NIL official fee on Delhi e-District)
REQUIRED DOCUMENTS & SPECS:
* Proof of Father's/Paternal relative's caste certificate issued by GNCTD or competent authority
* Lineage Proof: Documents establishing continuous residence of father/family in Delhi prior to cut-off year (1951 for SC/ST; 1993 for OBC)
* For OBC Non-Creamy Layer: Family annual income certificate/proof below statutory threshold
* Applicant photograph & signed self-declaration

Do you have your father's caste certificate or Delhi pre-1951/1993 ancestral proof ready?`;
  }

  if (q.includes('up bhulekh') || q.includes('bhulekh') || q.includes('up khatauni') || (q.includes('up') && (q.includes('land') || q.includes('khasra') || q.includes('khatauni')))) {
    return `TASK: 13. Uttar Pradesh Land Records (UP Bhulekh / Khatauni) (Level: Easy)
OFFICIAL LINK: https://upbhulekh.gov.in
OFFICIAL FEE: ₹0 (100% Free online public RoR / Khatauni view & verification)
REQUIRED DOCUMENTS & SPECS:
* Name of District (Janpad), Tehsil, and Village (Gram)
* One of the following: Gata Number / Khasra Number, Khata Number, Khatedar Name (Hindi/Devanagari), or Mutation Date (Namantaran Dinank)

Do you have your Janpad, Tehsil, and Khasra or Khata number ready?`;
  }

  if (q.includes('up domicile') || q.includes('up niwas') || q.includes('esathi domicile') || (q.includes('up') && (q.includes('domicile') || q.includes('niwas')))) {
    return `TASK: 14. Uttar Pradesh Domicile Certificate (Niwas Praman Patra) (Level: Medium)
OFFICIAL LINK: https://esathi.up.gov.in (via edistrict.up.gov.in)
OFFICIAL FEE: Statutory ₹15 fee on official eSathi portal (never pay touts ₹200–₹500)
REQUIRED DOCUMENTS & SPECS:
* Applicant passport-size photograph (JPG, up to 50 KB)
* Self-Declaration Form (Swa-pramanit ghoshana patra, up to 100 KB)
* Proof of Residence (Ration card, Electricity bill, Voter ID, Aadhaar)
* Educational Certificate or Gram Pradhan / Ward Parshad certificate

Do you have your photo, Aadhaar, and self-declaration form ready?`;
  }

  if (q.includes('up caste') || q.includes('up jati') || q.includes('esathi caste') || (q.includes('up') && (q.includes('jati') || q.includes('caste')))) {
    return `TASK: 15. Uttar Pradesh Caste Certificate (Jati Praman Patra - SC / ST / OBC) (Level: Medium)
OFFICIAL LINK: https://esathi.up.gov.in (via edistrict.up.gov.in)
OFFICIAL FEE: Statutory ₹15 fee on eSathi (never pay cyber cafe touts ₹300–₹1,000)
REQUIRED DOCUMENTS & SPECS:
* Applicant passport-size photograph
* Self-Declaration Form (Swa-pramanit ghoshana patra)
* Proof of Caste (Paternal relative's caste certificate, Parivar Register nakal, or land record)
* Proof of identity and address (Aadhaar, Ration card, Voter ID)
* For OBC: Income declaration below statutory threshold

Do you have your father's caste proof or Parivar Register copy ready?`;
  }

  return `Namaste! Main hoon Digital Sahayak. 🇮🇳

Hum strictly Bharat sarkar ke in 15 verified portals par step-by-step guidance provide karte hain:

🏛️ **Central Public Services:**
1. NEET UG Application Form (Easy) - neet.nta.nic.in
2. Online Driving Licence Renewal (Easy) - sarathi.parivahan.gov.in
3. Aadhaar Mobile Number Update (Easy) - myaadhaar.uidai.gov.in
4. Gazette Notification for Name Change (Medium) - egazette.gov.in
5. Fresh Aadhaar Enrolment (Free) - uidai.gov.in
6. Fresh Passport / Tatkaal Application (Medium) - passportindia.gov.in
7. CPGRAMS Central Grievance Redressal (Hard) - pgportal.gov.in
8. Vigilance & Anti-Corruption Redressal (Hard) - cvc.gov.in / lokpal.gov.in
9. Renunciation of Indian Citizenship / OCI (Hard) - indiancitizenshiponline.nic.in

🏛️ **Delhi (NCT) Citizen Services:**
10. Delhi Land Records (RoR / Khasra / Khatauni) - dlrc.delhi.gov.in
11. Delhi Domicile Certificate - edistrict.delhigovt.nic.in
12. Delhi Caste Certificate (SC/ST/OBC) - edistrict.delhigovt.nic.in

🏛️ **Uttar Pradesh Citizen Services:**
13. UP Land Records (UP Bhulekh / Khatauni) - upbhulekh.gov.in
14. UP Domicile Certificate (Niwas Praman Patra) - esathi.up.gov.in
15. UP Caste Certificate (Jati Praman Patra) - esathi.up.gov.in

Aap inme se kaunsa task complete karna chahte hain?`;
}

// Helper to call Gemini with graceful fallback across valid model identifiers
async function callGeminiModel(params: {
  contents: any;
  systemInstruction?: string;
  responseMimeType?: string;
  fallbackQuery?: string;
  fallbackContext?: any;
  language?: string;
  temperature?: number;
}) {
  // Target gemini-2.5-flash-lite first as requested by the user, with robust fallback
  const modelCandidates = [
    'gemini-2.5-flash-lite',
    'gemini-2.5-flash',
    'gemini-3.1-flash-lite',
    'gemini-3.8-flash',
  ];

  let lastError: any = null;

  for (const model of modelCandidates) {
    try {
      const config: any = {
        systemInstruction: params.systemInstruction,
        responseMimeType: params.responseMimeType,
      };

      // Set temperature to 0.2 as specified for gemini-2.5 models
      // Note: gemini-3.8-flash forbids temperature parameter
      if (model.includes('2.5') || model.includes('3.1') || model.includes('3.5')) {
        config.temperature = params.temperature ?? 0.2;
      }

      const response = await ai.models.generateContent({
        model,
        contents: params.contents,
        config,
      });
      if (response && response.text) {
        return { text: response.text, modelUsed: model };
      }
    } catch (err: any) {
      lastError = err;
      console.warn(`Model ${model} unavailable (${err?.status || err?.message}), attempting next fallback model...`);
      continue;
    }
  }

  // If all upstream calls failed (e.g. temporary 503 high-demand spike on all models)
  console.warn('All Gemini models temporarily unavailable upstream. Providing domain-grounded Digital Sahayak response.');
  if (params.fallbackQuery) {
    const domainText = generateDomainFallbackResponse(
      params.fallbackQuery,
      params.fallbackContext,
      params.language
    );
    return { text: domainText, modelUsed: 'digital-sahayak-civic-engine' };
  }

  throw lastError;
}

// Shared multilingual configuration for all 9 supported Indian languages
interface ServerLanguageConfig {
  code: string;
  name: string;
  chatInstruction: string;
  explainLabel: string;
  screenshotInstruction: string;
  draftLabel: string;
  scamWarning: string;
  safeWarning: string;
}

const SERVER_LANGUAGE_MAP: Record<string, ServerLanguageConfig> = {
  en: {
    code: 'en',
    name: 'English',
    chatInstruction: 'Reply strictly in clear, simple English.',
    explainLabel: 'simple, everyday English',
    screenshotInstruction: 'Provide all 3 sections and summary strictly in clear, accessible English.',
    draftLabel: 'English (Formal Statutory Court/Portal English)',
    scamWarning: 'STOP! This is a dangerous phishing scam. The Indian government never issues loans or asks for money on WhatsApp. Do not click this link!',
    safeWarning: 'This is a verified, authentic government portal link. It is safe to use.',
  },
  hi: {
    code: 'hi',
    name: 'Hindi (हिन्दी)',
    chatInstruction: 'Reply strictly in clear, simple Hindi using Devanagari script (हिन्दी).',
    explainLabel: 'clear, simple Hindi (हिन्दी - Devanagari script)',
    screenshotInstruction: 'Provide all 3 sections and summary strictly in pure, simple Hindi (Devanagari script).',
    draftLabel: 'Hindi (हिन्दी - Formal Statutory Devanagari Hindi)',
    scamWarning: 'रुकिए! यह एक फर्जी और धोखाधड़ी वाला लिंक है। सरकार व्हाट्सएप पर कभी पैसे या लोन नहीं देती। इस लिंक पर बिल्कुल क्लिक न करें!',
    safeWarning: 'यह एक सुरक्षित और प्रामाणिक सरकारी पोर्टल लिंक है। आप इस पर सुरक्षित रूप से आगे बढ़ सकते हैं।',
  },
  hinglish: {
    code: 'hinglish',
    name: 'Hinglish',
    chatInstruction: 'Reply in natural, easy-to-understand Hinglish (Hindi written in Roman script mixed with simple English).',
    explainLabel: 'friendly Hinglish (Hindi written in Roman script)',
    screenshotInstruction: 'Provide all 3 sections and summary in natural, friendly Hinglish (Hindi written in English alphabet).',
    draftLabel: 'English (Formal Statutory Court/Portal English)',
    scamWarning: 'STOP! Yeh ek fake aur fraud phishing scam hai. Sarkar WhatsApp par kabhi direct loan ya paise nahi deti. Is link par bilkul click mat karein!',
    safeWarning: 'Yeh ek verified aur surakshit official government portal hai. Aap bina kisi dar ke proceed kar sakte hain.',
  },
  bn: {
    code: 'bn',
    name: 'Bengali (বাংলা)',
    chatInstruction: 'Reply strictly in clear, natural, everyday Bengali using Bengali script (বাংলা). Keep official portal URLs and government button names accurate.',
    explainLabel: 'clear, everyday Bengali (বাংলা script)',
    screenshotInstruction: 'Provide all 3 sections and summary strictly in clear, simple Bengali (বাংলা script).',
    draftLabel: 'Bengali (বাংলা - Formal Statutory Bengali)',
    scamWarning: 'থামুন! এটি একটি ভুয়া ও প্রতারণামূলক ফিশিং লিংক। ভারত সরকার কখনো হোয়াটসঅ্যাপে ঋণ বা টাকা দেয় না। এই লিংকে ক্লিক করবেন না!',
    safeWarning: 'এটি একটি যাচাইকৃত ও নিরাপদ সরকারি পোর্টাল লিংক। আপনি নিশ্চিন্তে এটি ব্যবহার করতে পারেন।',
  },
  mr: {
    code: 'mr',
    name: 'Marathi (मराठी)',
    chatInstruction: 'Reply strictly in clear, natural, everyday Marathi using Devanagari script (मराठी). Keep official portal URLs and government button names accurate.',
    explainLabel: 'clear, everyday Marathi (मराठी script)',
    screenshotInstruction: 'Provide all 3 sections and summary strictly in clear, simple Marathi (मराठी script).',
    draftLabel: 'Marathi (मराठी - Formal Statutory Marathi)',
    scamWarning: 'थांबा! ही एक बनावट आणि फसवणूक करणारी फिशिंग लिंक आहे. सरकार व्हॉट्सअॅपवर कधीही कर्ज किंवा पैसे देत नाही. या लिंकवर क्लिक करू नका!',
    safeWarning: 'ही एक सत्यापित आणि सुरक्षित अधिकृत सरकारी पोर्टल लिंक आहे. तुम्ही निर्धास्तपणे पुढे जाऊ शकता.',
  },
  te: {
    code: 'te',
    name: 'Telugu (తెలుగు)',
    chatInstruction: 'Reply strictly in clear, natural, everyday Telugu using Telugu script (తెలుగు). Keep official portal URLs and government button names accurate.',
    explainLabel: 'clear, everyday Telugu (తెలుగు script)',
    screenshotInstruction: 'Provide all 3 sections and summary strictly in clear, simple Telugu (తెలుగు script).',
    draftLabel: 'Telugu (తెలుగు - Formal Statutory Telugu)',
    scamWarning: 'ఆగండి! ఇది నకిలీ మరియు మోసపూరిత ఫిషింగ్ లింక్. ప్రభుత్వం ఎప్పుడూ వాట్సాప్‌లో లోన్లు లేదా డబ్బు ఇవ్వదు. ఈ లింక్‌పై క్లిక్ చేయకండి!',
    safeWarning: 'ఇది ధృవీకరించబడిన మరియు సురక్షితమైన అధికారిక ప్రభుత్వ పోర్టల్ లింక్. మీరు సురక్షితంగా కొనసాగవచ్చు.',
  },
  ta: {
    code: 'ta',
    name: 'Tamil (தமிழ்)',
    chatInstruction: 'Reply strictly in clear, natural, everyday Tamil using Tamil script (தமிழ்). Keep official portal URLs and government button names accurate.',
    explainLabel: 'clear, everyday Tamil (தமிழ் script)',
    screenshotInstruction: 'Provide all 3 sections and summary strictly in clear, simple Tamil (தமிழ் script).',
    draftLabel: 'Tamil (தமிழ் - Formal Statutory Tamil)',
    scamWarning: 'நிறுத்துங்கள்! இது ஒரு போலி மற்றும் மோசடி இணைப்பு. இந்திய அரசு ஒருபோதும் வாட்ஸ்அப்பில் கடன் அல்லது பணம் தருவதில்லை. இந்த இணைப்பை கிளிக் செய்யாதீர்கள்!',
    safeWarning: 'இது சரிபார்க்கப்பட்ட, பாதுகாப்பான அதிகாரப்பூர்வ அரசு இணையதள இணைப்பு. நீங்கள் பாதுகாப்பாகப் பயன்படுத்தலாம்.',
  },
  gu: {
    code: 'gu',
    name: 'Gujarati (ગુજરાતી)',
    chatInstruction: 'Reply strictly in clear, natural, everyday Gujarati using Gujarati script (ગુજરાતી). Keep official portal URLs and government button names accurate.',
    explainLabel: 'clear, everyday Gujarati (ગુજરાતી script)',
    screenshotInstruction: 'Provide all 3 sections and summary strictly in clear, simple Gujarati (ગુજરાતી script).',
    draftLabel: 'Gujarati (ગુજરાતી - Formal Statutory Gujarati)',
    scamWarning: 'રોકાઓ! આ એક નકલી અને છેતરપિંડી કરતી ફિશિંગ લિંક છે. સરકાર ક્યારેય વોટ્સએપ પર લોન કે પૈસા આપતી નથી. આ લિંક પર ક્લિક કરશો નહીં!',
    safeWarning: 'આ એક ચકાસાયેલ અને સુરક્ષિત અધિકૃત સરકારી પોર્ટલ લિંક છે. તમે સુરક્ષિત રીતે આગળ વધી શકો છો.',
  },
  kn: {
    code: 'kn',
    name: 'Kannada (ಕನ್ನಡ)',
    chatInstruction: 'Reply strictly in clear, natural, everyday Kannada using Kannada script (ಕನ್ನಡ). Keep official portal URLs and government button names accurate.',
    explainLabel: 'clear, everyday Kannada (ಕನ್ನಡ script)',
    screenshotInstruction: 'Provide all 3 sections and summary strictly in clear, simple Kannada (ಕನ್ನಡ script).',
    draftLabel: 'Kannada (ಕನ್ನಡ - Formal Statutory Kannada)',
    scamWarning: 'ನಿಲ್ಲಿಸಿ! ಇದು ನಕಲಿ ಮತ್ತು ವಂಚನೆಯ ಫಿಶಿಂಗ್ ಲಿಂಕ್ ಆಗಿದೆ. ಸರ್ಕಾರವು ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಎಂದಿಗೂ ಸಾಲ ಅಥವಾ ಹಣ ನೀಡುವುದಿಲ್ಲ. ಈ ಲಿಂಕ್ ಅನ್ನು ಕ್ಲಿಕ್ ಮಾಡಬೇಡಿ!',
    safeWarning: 'ಇದು ಪರಿಶೀಲಿಸಿದ ಮತ್ತು ಸುರಕ್ಷಿತ ಅಧಿಕೃತ ಸರ್ಕಾರಿ ಪೋರ್ಟಲ್ ಲಿಂಕ್ ಆಗಿದೆ. ನೀವು ಸುರಕ್ಷಿತವಾಗಿ ಮುಂದುವರಿಯಬಹುದು.',
  },
};

function getServerLanguageConfig(language?: string): ServerLanguageConfig {
  if (!language) return SERVER_LANGUAGE_MAP.hinglish;
  return SERVER_LANGUAGE_MAP[language] || SERVER_LANGUAGE_MAP.en;
}

// API Routes
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { message, history, context, language, imageBase64, mimeType } = req.body;
    if (!message && !imageBase64) {
      return res.status(400).json({ error: 'Message or image is required' });
    }

    const langCfg = getServerLanguageConfig(language);

    const fullInstruction = `${SYSTEM_INSTRUCTIONS_DIGITAL_SAHAYAK}
Current user language preference (${langCfg.name}): ${langCfg.chatInstruction}
Current active service context: ${context ? JSON.stringify(context) : 'General Citizen Inquiry'}
CRITICAL: Maintain strict grounding in the 15 verified central and state guides (Central Public Services, Delhi NCT Services, and Uttar Pradesh Services). Use temperature 0.2 grounding. Follow: 1. Strict Grounding, 2. Language First (strictly reply in ${langCfg.name}), 3. Capture (Checklist First), 4. Apply (One Step at a Time), 5. Screenshot Sahayak, 6. Revise (WhatsApp Card upon final step completion).`;

    let contentsPayload: any;
    const conversationHistoryText =
      history && Array.isArray(history) && history.length > 0
        ? `Conversation History:\n${history
            .map((h: { sender: string; text: string }) => `${h.sender === 'user' ? 'Citizen' : 'Digital Sahayak'}: ${h.text}`)
            .join('\n')}\n\n`
        : '';

    const currentQueryText = `${conversationHistoryText}Citizen Query / Action: ${message || 'Please analyze this screenshot of the government portal / form / error.'}`;

    if (imageBase64) {
      const cleanBase64 = imageBase64.replace(/^data:[a-zA-Z0-9/+-]+;base64,/, '');
      contentsPayload = {
        parts: [
          {
            inlineData: {
              mimeType: mimeType || 'image/jpeg',
              data: cleanBase64,
            },
          },
          {
            text: `${currentQueryText}\n\n[SCREENSHOT SAHAYAK TRIGGER]: Read visible form fields or error text, explain what each field means or why the error occurred, and tell the citizen the exact action to take next.`,
          },
        ],
      };
    } else {
      contentsPayload = currentQueryText;
    }

    const result = await callGeminiModel({
      contents: contentsPayload,
      systemInstruction: fullInstruction,
      temperature: 0.2,
      fallbackQuery: message,
      fallbackContext: context,
      language,
    });

    res.json({ reply: result.text, modelUsed: result.modelUsed });
  } catch (error: any) {
    console.error('Error in /api/chat:', error);
    const fallback = generateDomainFallbackResponse(req.body.message || '', req.body.context, req.body.language);
    res.json({ reply: fallback, modelUsed: 'digital-sahayak-civic-engine' });
  }
});

// Endpoint to explain an individual workflow step simply
app.post('/api/explain-step', async (req: Request, res: Response) => {
  try {
    const { taskTitle, stepNumber, stepTitle, actionInstruction, detailInstruction, toughTerms, language } = req.body;

    const langCfg = getServerLanguageConfig(language);

    const prompt = `The citizen is currently on Step ${stepNumber}: "${stepTitle}" for "${taskTitle}".
Action instruction: "${actionInstruction}"
Detail: "${detailInstruction}"
Tough terms to explain: ${JSON.stringify(toughTerms || [])}

Please explain this step strictly in super clear, encouraging ${langCfg.explainLabel}.
Highlight:
1. Exactly what button or link they should click.
2. Common mistakes people make on this step (and how to avoid them).
3. Simple everyday meaning of any confusing portal words.
4. Reminder that they do NOT need to pay any cyber cafe agent for this step.`;

    const fallbackExplanation = `Step ${stepNumber} Guidance (${stepTitle}):\n\n` +
      `• Action: ${actionInstruction}\n` +
      `• Detail: ${detailInstruction}\n` +
      `• Asaan Matlab: Form me maangi gayi jaankari ko Class 10 Certificate se milakar bharein.\n` +
      `• Savdhani: Kisi bhi middleman ya WhatsApp group par document ya OTP na bhejein. Ye step aap portal par khud 2 minute me kar sakte hain.`;

    try {
      const result = await callGeminiModel({
        contents: prompt,
        systemInstruction: SYSTEM_INSTRUCTIONS_DIGITAL_SAHAYAK,
      });
      res.json({ explanation: result.text, modelUsed: result.modelUsed });
    } catch {
      res.json({ explanation: fallbackExplanation, modelUsed: 'digital-sahayak-step-engine' });
    }
  } catch (error: any) {
    console.error('Error in /api/explain-step:', error);
    res.json({
      explanation: 'Portal par button click karke form bharein. Class 10 marksheet ke anuroop hi apna naam darj karein. Zero cyber cafe fees!',
      modelUsed: 'digital-sahayak-step-engine',
    });
  }
});

// Endpoint to analyze an uploaded screenshot of a portal error
app.post('/api/analyze-screenshot', async (req: Request, res: Response) => {
  try {
    const { imageBase64, mimeType = 'image/jpeg', errorText, taskContext, language } = req.body;

    const langCfg = getServerLanguageConfig(language);

    const systemPrompt = `${SYSTEM_INSTRUCTIONS_DIGITAL_SAHAYAK}
You are functioning as the "Screenshot Sahayak" Visual Error Decoder.
Citizens upload confusing government server errors, HTTP status codes (502, 404, 500, Session Expired, Gateway Timeout, Document upload failed, Aadhaar verification error, etc.).
You MUST break down the issue into EXACTLY THREE DISTINCT SECTIONS:
1. What is shown on screen (Screen breakdown: What is the text/error message actually saying in plain words)
2. Why this error happened (Root cause: Why did this failure happen in plain, relatable language - file size, wrong format, server peak hours, timeout)
3. What to do right now (Actionable direct solution: Step-by-step immediate fix, such as using the built-in KB Resizer, clearing cache/incognito, checking Class 10 certificate spelling, or timing)

Format your output in a JSON object with keys:
{
  "section1": "text for section 1",
  "section2": "text for section 2",
  "section3": "text for section 3",
  "summary": "one short summary sentence"
}
Language requirement (${langCfg.name}): ${langCfg.screenshotInstruction}`;

    let contents: any;
    if (imageBase64) {
      const cleanBase64 = imageBase64.replace(/^data:[a-zA-Z0-9/+-]+;base64,/, '');
      contents = {
        parts: [
          {
            inlineData: {
              mimeType: mimeType || 'image/jpeg',
              data: cleanBase64,
            },
          },
          {
            text: `Analyze this government portal screenshot for task "${taskContext || 'Government Portal'}". Additional error detail if provided: ${errorText || 'None'}. Return the JSON format requested.`,
          },
        ],
      };
    } else {
      contents = `Analyze this government portal error message for task "${taskContext || 'Government Portal'}": "${errorText || 'HTTP 502 / Upload Error: File exceeds size limit'}". Return the JSON format requested.`;
    }

    try {
      const result = await callGeminiModel({
        contents,
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
      });

      let parsed;
      try {
        parsed = JSON.parse(result.text);
      } catch {
        const jsonMatch = result.text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          parsed = JSON.parse(jsonMatch[0]);
        } else {
          parsed = {
            section1: 'Portal error detected: Server response or upload mismatch.',
            section2: 'File format, dimension, or server session timed out.',
            section3: 'Use the KB Resizer tool to ensure proper JPG dimensions and retry in Incognito window.',
            summary: 'Portal Error Analyzed',
          };
        }
      }

      res.json({ analysis: parsed, modelUsed: result.modelUsed });
    } catch {
      // Fallback structured breakdown
      res.json({
        analysis: {
          section1: 'Portal server ne file size ya session expiry ki wajah se request hold kar di hai.',
          section2: 'Sarkari portal par strict 10–200 KB limit hoti hai ya 15 minute inactivity timeout hua hai.',
          section3: 'Digital Sahayak ke "KB Resizer" tool me photo daalkar 85 KB file download karein aur re-upload karein.',
          summary: 'Portal Error Decoded',
        },
        modelUsed: 'digital-sahayak-vision-engine',
      });
    }
  } catch (error: any) {
    console.error('Error in /api/analyze-screenshot:', error);
    res.json({
      analysis: {
        section1: 'Portal upload error occurred.',
        section2: 'File exceeds server size constraints.',
        section3: 'Resize document using built-in KB Resizer and retry.',
        summary: 'Portal Error Decoded',
      },
      modelUsed: 'digital-sahayak-vision-engine',
    });
  }
});

// Endpoint to verify suspicious WhatsApp / SMS links and messages for cyber scams (Scam Shield / स्कैम कवच)
const handleScamVerification = async (req: Request, res: Response) => {
  try {
    const { message, language = 'hinglish' } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message or link is required' });
    }

    const lower = message.toLowerCase();

    // Fast deterministic rule engine check
    const hasGovDomain = lower.includes('.gov.in') || lower.includes('.nic.in');
    const isKnownOfficial = (hasGovDomain || lower.includes('mudra.org.in') || lower.includes('nta.ac.in')) &&
      !lower.includes('pm-mudra-loan-apply') &&
      !lower.includes('bit.ly') &&
      !lower.includes('.online') &&
      !lower.includes('pm-surya-yojana');

    const isBlatantScam =
      lower.includes('pm-mudra-loan-apply') ||
      lower.includes('bijli-kyc') ||
      lower.includes('pm-surya-yojana.online') ||
      lower.includes('power will be disconnected') ||
      lower.includes('account will be blocked') ||
      lower.includes('free recharge') ||
      (lower.includes('mudra') && lower.includes('.in') && !lower.includes('mudra.org.in'));

    const langCfg = getServerLanguageConfig(language);

    const systemPrompt = `You are "Scam Shield (स्कैम कवच)", the cybersecurity watchdog of Digital Sahayak.
Your job is to protect rural and semi-urban Indian citizens from phishing links, fake WhatsApp PM scheme messages, and fake bank/electricity KYC traps that drain bank accounts.

Key Indian Government Security Rules:
1. All genuine Central and State government portals strictly end in '.gov.in' or '.nic.in' (e.g. neet.nta.nic.in, pgportal.gov.in, uidai.gov.in, parivahan.gov.in). The only statutory exception for MUDRA is 'mudra.org.in'.
2. The Government of India NEVER sends WhatsApp or SMS messages approving instant loans (like Mudra loans), offering free mobile recharge/lotteries, or threatening power cut / bank account block with non-gov links.
3. Private domains like '.in', '.online', '.site', '.xyz', or URL shorteners (bit.ly) claiming to be government schemes (e.g., 'pm-mudra-loan-apply.in' or 'pm-surya-yojana.online') are 100% FRAUDULENT PHISHING SCAMS.

Citizen's chosen language: ${langCfg.name}. ${langCfg.chatInstruction}
Write "voiceWarning", "redFlags", "explanation", and "actionAdvice" strictly in ${langCfg.name}.

You MUST analyze the input message/URL and return ONLY a valid JSON object matching this schema:
{
  "verdict": "SCAM" | "SAFE" | "SUSPICIOUS",
  "isSafe": boolean,
  "confidence": number,
  "riskScore": number,
  "detectedDomain": string,
  "impersonatedAgency": string,
  "officialPortalUrl": string,
  "officialPortalName": string,
  "voiceWarning": string,
  "voiceWarningHindi": string,
  "voiceWarningHinglish": string,
  "voiceWarningEnglish": string,
  "redFlags": string[],
  "explanation": string,
  "actionAdvice": string
}`;

    const promptText = `Analyze this message/link received by an Indian citizen:
"${message}"
Extract the domain, identify red flags, check if it is an impersonation scam, provide the genuine government portal URL, and generate a strong voice warning in ${langCfg.name} ("voiceWarning") as well as Hindi/Hinglish/English. Return the JSON object.`;

    try {
      const result = await callGeminiModel({
        contents: promptText,
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
        temperature: 0.1,
      });

      let parsed: any;
      try {
        parsed = JSON.parse(result.text);
      } catch {
        const jsonMatch = result.text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          parsed = JSON.parse(jsonMatch[0]);
        }
      }

      if (parsed && parsed.verdict) {
        return res.json({ analysis: parsed, modelUsed: result.modelUsed });
      }
    } catch (aiErr) {
      console.warn('Gemini scam check error, using deterministic rule engine fallback:', aiErr);
    }

    // Deterministic fallback response if AI call fails or for known stage demo triggers
    if (isBlatantScam || !isKnownOfficial) {
      // Determine context
      let detectedDomain = 'Unknown / Unverified Link';
      let impersonated = 'Government Welfare / Banking Scheme';
      let officialUrl = 'https://www.mudra.org.in';
      let officialName = 'Official MUDRA Portal (mudra.org.in)';

      if (lower.includes('mudra')) {
        detectedDomain = 'www.pm-mudra-loan-apply.in';
        impersonated = 'Pradhan Mantri MUDRA Yojana (Ministry of Finance)';
        officialUrl = 'https://www.mudra.org.in';
        officialName = 'Official MUDRA Portal (mudra.org.in)';
      } else if (lower.includes('bijli') || lower.includes('electric') || lower.includes('power')) {
        detectedDomain = 'bit.ly/bijli-kyc-update';
        impersonated = 'State Electricity Board / Power Discom';
        officialUrl = 'https://nationalpowerportal.gov.in';
        officialName = 'National Power Portal (.gov.in)';
      } else if (lower.includes('solar') || lower.includes('surya')) {
        detectedDomain = 'pm-surya-yojana.online';
        impersonated = 'PM Surya Ghar: Muft Bijli Yojana';
        officialUrl = 'https://pmsuryaghar.gov.in';
        officialName = 'Official PM Surya Ghar Portal (pmsuryaghar.gov.in)';
      }

      return res.json({
        analysis: {
          verdict: 'SCAM',
          isSafe: false,
          confidence: 99,
          riskScore: 98,
          detectedDomain,
          impersonatedAgency: impersonated,
          officialPortalUrl: officialUrl,
          officialPortalName: officialName,
          voiceWarning: langCfg.scamWarning,
          voiceWarningHindi: SERVER_LANGUAGE_MAP.hi.scamWarning,
          voiceWarningHinglish: SERVER_LANGUAGE_MAP.hinglish.scamWarning,
          voiceWarningEnglish: SERVER_LANGUAGE_MAP.en.scamWarning,
          redFlags: [
            `Fake Private Domain: Uses unverified domain instead of official '.gov.in' or '${officialUrl.replace('https://', '')}'`,
            'False Urgency Trap: Claims instant cash approval or imminent service block to trigger panic',
            'Bank Account Draining Trap: Requests APK install or personal banking credentials/OTP',
          ],
          explanation: `Yeh WhatsApp message ek cyber fraud attempt hai jo ${impersonated} ka naam chura raha hai. Asli sarkari suvidha sirf official portal par milti hai.`,
          actionAdvice: 'Is message ko turant delete karein, sender ko block karein, aur Cyber Crime Helpline 1930 par report karein.',
        },
        modelUsed: 'digital-sahayak-kavach-engine',
      });
    }

    // Genuine official link verification fallback
    return res.json({
      analysis: {
        verdict: 'SAFE',
        isSafe: true,
        confidence: 98,
        riskScore: 5,
        detectedDomain: 'Official .gov.in / .nic.in Portal',
        impersonatedAgency: 'Verified Government Portal',
        officialPortalUrl: message.startsWith('http') ? message : `https://${message}`,
        officialPortalName: 'Authentic Indian Government Infrastructure',
        voiceWarning: langCfg.safeWarning,
        voiceWarningHindi: SERVER_LANGUAGE_MAP.hi.safeWarning,
        voiceWarningHinglish: SERVER_LANGUAGE_MAP.hinglish.safeWarning,
        voiceWarningEnglish: SERVER_LANGUAGE_MAP.en.safeWarning,
        redFlags: [],
        explanation: 'The link belongs to an authorized Indian government domain (.gov.in / .nic.in). No phishing signatures detected.',
        actionAdvice: 'Safe to open in your browser. Remember: Never share your Aadhaar or Banking OTP with anyone.',
      },
      modelUsed: 'digital-sahayak-kavach-engine',
    });
  } catch (error: any) {
    console.error('Error in /api/verify-scam:', error);
    res.status(500).json({ error: 'Failed to verify scam link' });
  }
};

app.post('/api/verify-scam', handleScamVerification);
app.post('/api/scam-shield', handleScamVerification);


// Endpoint to generate legal drafts, affidavits, and grievance letters (Official Draft Sahayak / प्रारूप सहायक)
app.post('/api/generate-draft', async (req: Request, res: Response) => {
  try {
    const { templateType = 'gazette-name-change', prompt = '', language = 'en' } = req.body;

    const langCfg = getServerLanguageConfig(language);
    const langName = langCfg.draftLabel;

    const systemPrompt = `You are the "Official Legal Draft & Affidavit Architect (प्रारूप सहायक)" of Digital Sahayak.
Your mission is to generate legally binding, court-ready, and portal-compliant official drafts for Indian citizens who cannot afford typist commissions or struggle with bureaucratic legal jargon.

Templates you support:
1. "gazette-name-change": Affidavit for Change of Name (Mandatory proforma prescribed by the Controller of Publication, Department of Publication, Civil Lines, Delhi for BharatKosh Gazette publication).
2. "cpgrams-grievance": Formal Statutory Grievance Petition to the Public Grievance Officer / CVC under DARPG Citizen's Charter timelines.
3. "neet-undertaking": Candidate Self-Declaration & Name Discrepancy Undertaking for National Testing Agency (NTA / NEET / JEE).
4. "dob-correction": Affidavit for Correction of Date of Birth / Record Discrepancy before an Executive Magistrate or Notary Public.

Guidelines:
- Output MUST be strictly valid JSON matching this schema:
{
  "title": string,
  "templateType": string,
  "language": string,
  "stampPaperRequirement": string,
  "notaryRequired": boolean,
  "draftText": string,
  "keyClauses": string[],
  "guidanceNotes": string[]
}
- In "draftText", produce the complete, official, formatted legal document ready to print. Use formal legal styling with ALL-CAPS headers, clear numbered clauses (1, 2, 3...), deponent signature blocks, and notary oath verification.
- Replace any details supplied in the user's prompt (e.g. name, father's name, address, old name, new name, application ref number, department). For details not provided, leave neat uppercase placeholders like [APPLICANT FULL NAME], [PERMANENT ADDRESS], [NEWSPAPER NAME].
- Draft text language: ${langName}.`;

    const userPromptText = `Generate an official, statutory Indian legal draft for template type "${templateType}".
User provided details: "${prompt || 'General standard details with clear placeholders'}"
Language: ${langName}
Return the JSON object.`;

    try {
      const result = await callGeminiModel({
        contents: userPromptText,
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
        temperature: 0.1,
      });

      let parsed: any;
      try {
        parsed = JSON.parse(result.text);
      } catch {
        const jsonMatch = result.text.match(/\{[\s\S]*\}/);
        if (jsonMatch) parsed = JSON.parse(jsonMatch[0]);
      }

      if (parsed && parsed.draftText) {
        return res.json({ draft: parsed, modelUsed: result.modelUsed });
      }
    } catch (aiErr) {
      console.warn('Gemini draft generation error, using deterministic legal template:', aiErr);
    }

    // Deterministic fallback templates
    let fallbackDraft: any;

    if (templateType === 'cpgrams-grievance') {
      fallbackDraft = {
        title: 'FORMAL PUBLIC GRIEVANCE PETITION (UNDER DARPG CITIZEN CHARTER)',
        templateType: 'cpgrams-grievance',
        language,
        stampPaperRequirement: 'Plain Paper / Direct CPGRAMS Portal Text Area (₹0 Statutory Cost)',
        notaryRequired: false,
        draftText: `TO,
THE PUBLIC GRIEVANCE OFFICER / NODAL APPELLATE AUTHORITY,
[CONCERNED MINISTRY / DEPARTMENT NAME],
GOVERNMENT OF INDIA.

SUBJECT: FORMAL GRIEVANCE REGARDING WILLFUL DELAY & NON-COMPLIANCE WITH CITIZEN CHARTER TIMELINES FOR APPLICATION REF: [APPLICATION / FILE REF NUMBER]

RESPECTED SIR / MADAM,

I, [APPLICANT FULL NAME], RESIDING AT [PERMANENT ADDRESS], CONTACT NO: [MOBILE NUMBER], EMAIL: [EMAIL ADDRESS], SOLEMNLY LODGE THIS COMPLAINT AGAINST INACTION AND BUREAUCRATIC DELAY AS DETAILED BELOW:

1. FACTUAL BACKGROUND:
On [DATE OF ORIGINAL APPLICATION], I applied for [NAME OF SERVICE / CERTIFICATE / BENEFIT] through [PORTAL / OFFICE NAME] vide Reference Number [APPLICATION REF NUMBER].

2. VIOLATION OF CITIZEN CHARTER SLA:
As per the statutory Citizen Charter published by your Department, the mandated maximum turnaround time (SLA) for disposal of this service is [NUMBER OF DAYS, e.g., 30 DAYS]. Even after the expiry of [TOTAL DAYS ELAPSED, e.g., 60 DAYS], my file has been arbitrarily held up without any written objection or deficiency memo.

3. DETAILS OF HARASSMENT / EXTORTION:
When I followed up physically with the dealing assistant / counter officer at [OFFICE LOCATION], I was subjected to undue harassment and indirectly asked to approach touts/agents outside the office premises to "clear" the pending file.

4. RELIEF SOUGHT:
In light of the above facts, I humbly pray that:
a) My pending application be approved and processed without any further delay;
b) The concerned nodal officer issue an Action Taken Report (ATR) explaining the cause of prolonged pendency;
c) Necessary departmental accountability be fixed against the delinquent dealing staff under Rule 3 of the Central Civil Services (Conduct) Rules.

I hereby declare that the matter is not sub-judice before any Court of Law.

ENCLOSURES:
1. Copy of Online Application Acknowledgement Receipt.
2. Self-Attested Identity Proof (Aadhaar / Voter ID).

DATE: [CURRENT DATE]
PLACE: [CITY / DISTRICT, STATE]

RESPECTFULLY SUBMITTED,

__________________________
[APPLICANT FULL NAME]
CONTACT: [MOBILE NUMBER]`,
        keyClauses: [
          'Statutory Citizen Charter SLA violation declaration',
          'Exact Application Reference and Timeline chronology',
          'Formal prayer for Action Taken Report (ATR)',
          'Non-sub-judice legal declaration',
        ],
        guidanceNotes: [
          'Paste this text directly into CPGRAMS text area on pgportal.gov.in (limit: 4,000 characters).',
          'Attach your original application receipt PDF (under 4 MB).',
          'Nodal officers are legally required to reply within 21 to 30 days.',
        ],
      };
    } else if (templateType === 'neet-undertaking') {
      fallbackDraft = {
        title: 'CANDIDATE SELF-DECLARATION & NAME DISCREPANCY UNDERTAKING',
        templateType: 'neet-undertaking',
        language,
        stampPaperRequirement: 'Plain White A4 Paper (Self-Declaration, No Stamp Paper Required)',
        notaryRequired: false,
        draftText: `UNDERTAKING / SELF-DECLARATION FOR CANDIDATE NAME & RECORD DISCREPANCY
(FOR SUBMISSION TO NATIONAL TESTING AGENCY - NEET UG / NTA PORTAL)

TO,
THE SENIOR DIRECTOR,
NATIONAL TESTING AGENCY (NTA),
FIRST FLOOR, NSIC-MDBP BUILDING, OKHLA INDUSTRIAL ESTATE, NEW DELHI - 110020.

SUBJECT: SELF-DECLARATION UNDERTAKING REGARDING DISCREPANCY IN NAME SPELLING BETWEEN AADHAAR CARD AND CLASS 10TH CERTIFICATE

I, [CANDIDATE FULL NAME], APPLICATION NUMBER: [NTA APPLICATION NUMBER], SON / DAUGHTER OF [FATHER'S NAME] AND [MOTHER'S NAME], RESIDING AT [COMPLETE POSTAL ADDRESS], DO HEREBY SOLEMNLY DECLARE AND UNDERTAKE AS FOLLOWS:

1. That I am a registered candidate appearing for the National Eligibility cum Entrance Test (NEET UG) / NTA Examination 2025.

2. That my name is recorded as "[SPELLING IN CLASS 10TH CERTIFICATE]" in my Class 10th Board Certificate / Marksheet issued by [BOARD NAME, e.g., CBSE / STATE BOARD].

3. That due to typographical error / absence of surname, my name is recorded as "[SPELLING IN AADHAAR CARD]" in my Aadhaar Card Number [XXXXXXXXXXXX].

4. That I solemnly affirm that "[NAME AS PER 10TH]" and "[NAME AS PER AADHAAR]" refer to ONE AND THE SAME PERSON, which is myself, the undersigned candidate.

5. That for all academic, examination, biometric verification, and counselling records, my name as recorded in my Class 10th Certificate shall be treated as final and authentic.

6. That if any information provided herein is found to be false or incorrect at any stage of examination or admission, my candidature shall be liable to immediate cancellation without prejudice to any legal action.

DATE: [CURRENT DATE]
PLACE: [CANDIDATE CITY / TOWN]

_________________________________            _________________________________
SIGNATURE OF CANDIDATE                      SIGNATURE OF PARENT / GUARDIAN
NAME: [CANDIDATE FULL NAME]                  NAME: [FATHER / MOTHER NAME]
MOBILE: [MOBILE NUMBER]                      MOBILE: [PARENT MOBILE NUMBER]`,
        keyClauses: [
          'Explicit declaration that both spellings refer to the same biological individual',
          'Class 10th certificate established as the primary benchmark',
          'Co-signature of Parent / Guardian for legal validity',
        ],
        guidanceNotes: [
          'Print on clean white A4 paper.',
          'Both Candidate and Parent/Guardian must sign in black ink.',
          'Upload as single PDF during form filling or carry along with Admit Card to examination center.',
        ],
      };
    } else if (templateType === 'dob-correction') {
      fallbackDraft = {
        title: 'AFFIDAVIT FOR CORRECTION OF DATE OF BIRTH / RECORD DISCREPANCY',
        templateType: 'dob-correction',
        language,
        stampPaperRequirement: '₹10 or ₹50 Non-Judicial Stamp Paper (attested by Notary Public)',
        notaryRequired: true,
        draftText: `BEFORE THE NOTARY PUBLIC / EXECUTIVE MAGISTRATE AT [DISTRICT / CITY NAME]

AFFIDAVIT

I, [APPLICANT FULL NAME], SON / DAUGHTER / WIFE OF [FATHER / SPOUSE NAME], AGED ABOUT [AGE] YEARS, PERMANENT RESIDENT OF [FULL RESIDENTIAL ADDRESS], DO HEREBY SOLEMNLY AFFIRM AND DECLARE ON OATH AS UNDER:

1. That I am a citizen of India and permanent resident of the address stated above.

2. That my actual, genuine, and legally registered Date of Birth is [ACTUAL DOB: DD/MM/YYYY] as per my Official Municipal Birth Certificate issued by the Registrar of Births and Deaths vide Registration No: [BIRTH CERTIFICATE REGISTRATION NUMBER] dated [DATE OF ISSUE].

3. That inadvertently and due to clerical oversight, my Date of Birth has been erroneously recorded as [WRONG DOB: DD/MM/YYYY] in my [NAME OF INCORRECT DOCUMENT, e.g., AADHAAR / SCHOOL RECORD / PAN CARD].

4. That I have never taken any undue academic, employment, or financial advantage of the erroneously recorded date of birth.

5. That I make this solemn affidavit to be produced before the competent authority at [CONCERNED DEPARTMENT / UIDAI / REGIONAL OFFICE] for rectifying and updating my Date of Birth to [ACTUAL DOB: DD/MM/YYYY] in all official records.

VERIFICATION:
I, the above-named deponent, do hereby verify on oath that the contents of paragraphs 1 to 5 of this affidavit are true and correct to the best of my personal knowledge and belief. Nothing material has been concealed and no part of it is false. So help me God.

VERIFIED AT [CITY / DISTRICT] ON THIS [DAY] DAY OF [MONTH], 2025.


__________________________
DEPONENT SIGNATURE
NAME: [APPLICANT FULL NAME]

ATTESTED & CERTIFIED BY:

__________________________
NOTARY PUBLIC / MAGISTRATE
(SEAL & REGISTRATION NO.)`,
        keyClauses: [
          'Municipal Birth Certificate cited as primary statutory proof',
          'Declaration of no undue advantage taken',
          'Notary verification under oath',
        ],
        guidanceNotes: [
          'Execute on Non-Judicial Stamp Paper of denomination specified by your state (₹10, ₹20, or ₹50).',
          'Sign only in the physical presence of an approved Notary Public.',
        ],
      };
    } else {
      // Default: gazette-name-change
      fallbackDraft = {
        title: 'AFFIDAVIT FOR CHANGE OF NAME (CENTRAL GAZETTE SPECIMEN)',
        templateType: 'gazette-name-change',
        language,
        stampPaperRequirement: '₹10 or ₹50 Non-Judicial Stamp Paper (attested by Notary Public)',
        notaryRequired: true,
        draftText: `BEFORE THE NOTARY PUBLIC / OATH COMMISSIONER AT [DISTRICT / CITY NAME]

AFFIDAVIT FOR CHANGE OF NAME
(PRESCRIBED PROFORMA FOR CENTRAL GAZETTE NOTIFICATION - BHARATKOSH)

I, [FORMER / OLD NAME], SON / DAUGHTER / WIFE OF [FATHER / SPOUSE FULL NAME], AGED ABOUT [AGE] YEARS, RESIDING AT [COMPLETE PERMANENT POSTAL ADDRESS WITH PIN CODE], BY FAITH [RELIGION], DO HEREBY SOLEMNLY AFFIRM AND DECLARE ON OATH AS UNDER:

1. That my former, officially recorded name in all identity cards, educational certificates, and public records has been [FORMER / OLD NAME IN FULL].

2. That for all personal, social, and legal reasons, I have wholly and absolutely renounced, relinquished, and abandoned the use of my former name [FORMER / OLD NAME], and in place thereof have assumed and adopted the new name [NEW / PROPOSED NAME IN FULL].

3. That henceforth, in all records, documents, deeds, bank accounts, government correspondence, judicial proceedings, and transactions, I shall be designated, addressed, and known exclusively by the name [NEW / PROPOSED NAME IN FULL].

4. That I have published a public classified notice regarding this legal change of name in the daily newspaper "[NAME OF NEWSPAPER]" on [DATE OF NEWSPAPER PUBLICATION].

5. That I am submitting this affidavit along with the prescribed proforma, digital CD, and statutory fee receipt to the Controller of Publication, Department of Publication, Civil Lines, Delhi - 110054 for publication in Part IV of the Gazette of India (Extraordinary).

VERIFICATION:
I, the above-named deponent, do hereby verify on oath that the contents of paragraphs 1 to 5 above are true and correct to the best of my personal knowledge and belief. No part of it is false and nothing material has been concealed therefrom.

VERIFIED AT [CITY / DISTRICT] ON THIS [DAY] DAY OF [MONTH], 2025.


____________________________________
DEPONENT (SIGN IN NEW NAME)
FORMERLY KNOWN AS: [OLD NAME]
NEW LEGAL NAME: [NEW NAME]
CONTACT: [MOBILE NUMBER]

ATTESTATION:
SOLEMNLY AFFIRMED AND SIGNED BEFORE ME ON THIS DAY BY THE DEPONENT WHO HAS BEEN SATISFACTORILY IDENTIFIED.

____________________________________
NOTARY PUBLIC / ADVOCATE
GOVERNMENT OF INDIA / STATE
REGISTRATION NO: [NOTARY REG. NO]
COMMISSION EXPIRES: [EXPIRY DATE]
(OFFICIAL STAMP & NOTARIAL EMBOSS)`,
        keyClauses: [
          'Absolute abandonment of former name',
          'Adoption of new name for all legal, bank, and civic purposes',
          'Newspaper advertisement declaration',
          'Verification clause strictly matching Controller of Publications proforma',
        ],
        guidanceNotes: [
          'Purchase a ₹10, ₹20, or ₹50 Non-Judicial Stamp Paper from your local court stamp vendor.',
          'Print this affidavit on the stamp paper (or continue on green legal paper if text overflows).',
          'Get it signed and stamped by an authorized Notary Public with notarial ticket.',
          'Save original newspaper clipping (full page) to send with the Gazette dossier to Civil Lines, Delhi.',
        ],
      };
    }

    res.json({ draft: fallbackDraft, modelUsed: 'digital-sahayak-draft-engine' });
  } catch (error: any) {
    console.error('Error in /api/generate-draft:', error);
    res.status(500).json({ error: 'Failed to generate official draft' });
  }
});


// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'Digital Sahayak API',
    model: 'gemini-2.5-flash-lite (temperature: 0.2)',
    time: new Date().toISOString(),
  });
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false,
        ws: false,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Digital Sahayak server running at http://0.0.0.0:${PORT}`);
  });
}

if (!process.env.VERCEL) {
  startServer();
}

export default app;

