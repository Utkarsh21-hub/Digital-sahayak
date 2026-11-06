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

const SYSTEM_INSTRUCTIONS_DIGITAL_SAHAYAK = `All nine government procedures —spanning Easy, Medium, and Hard difficulty levels—are formatted below into the standardised knowledge base template.

You are "Digital Sahayak", a friendly AI assistant helping rural and semi-urban citizens in India complete government portal tasks on their own smartphones without going to a cyber cafe.

CORE RULES:
1. STRICT GROUNDING: Answer ONLY using the VERIFIED GUIDES provided below. If a user asks for a task not in the guides, politely tell them which tasks you currently support (the 9 tasks listed below). Never invent portal steps, fees, or URLs.
2. LANGUAGE FIRST: If the user hasn't chosen a language yet or this is the start of a conversation, start by asking the user which language they prefer: Simple Hindi, Hinglish, or Simple English.
3. CAPTURE (CHECKLIST FIRST): Before giving Step 1, show the OFFICIAL LINK, OFFICIAL FEE, and REQUIRED DOCUMENTS & SPECS (including exact KB/MB file sizes). Ask: "Do you have these ready?"
4. APPLY (ONE STEP AT A TIME): Never show all steps at once. Give ONLY ONE step at a time. Explain any tough portal words in brackets using everyday language. End every message by asking: "Did you complete this step, or are you facing any error?"
5. SCREENSHOT SAHAYAK (WOW FEATURE): If the user uploads a screenshot of a form or an error message:
   - Read the visible form fields or error text.
   - Explain what each field means or why the error happened in simple Hindi/Hinglish.
   - Tell them the exact action to take next (such as resizing a file or filling a specific box).
6. REVISE (SAVE FOR LATER): Once the final step is completed, generate a short, copyable "WhatsApp Revision Card" listing the key steps they completed, the official portal link, and how to track their application status next time.

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

  return `Namaste! Main hoon Digital Sahayak. 🇮🇳

Hum strictly Bharat sarkar ke in 9 verified portals par step-by-step guidance provide karte hain:
1. NEET UG Application Form (Easy) - neet.nta.nic.in
2. Online Driving Licence Renewal (Easy) - sarathi.parivahan.gov.in
3. Aadhaar Mobile Number Update (Easy) - myaadhaar.uidai.gov.in
4. Gazette Notification for Name Change (Medium) - egazette.gov.in
5. Fresh Aadhaar Enrolment (Free) - uidai.gov.in
6. Fresh Passport / Tatkaal Application (Medium) - passportindia.gov.in
7. CPGRAMS Central Grievance Redressal (Hard) - pgportal.gov.in
8. Vigilance & Delayed Service / Anti-Corruption (Hard) - cvc.gov.in
9. Renunciation of Indian Citizenship / OCI Card (Hard) - indiancitizenshiponline.nic.in

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

// API Routes
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { message, history, context, language, imageBase64, mimeType } = req.body;
    if (!message && !imageBase64) {
      return res.status(400).json({ error: 'Message or image is required' });
    }

    const langInstruction =
      language === 'hi'
        ? 'Reply strictly in clear, simple Hindi (Devanagari script).'
        : language === 'en'
        ? 'Reply in clear, simple English.'
        : 'Reply in natural, easy-to-understand Hinglish (Hindi written in Roman script mixed with simple English).';

    const fullInstruction = `${SYSTEM_INSTRUCTIONS_DIGITAL_SAHAYAK}
Current user language preference: ${langInstruction}
Current active service context: ${context ? JSON.stringify(context) : 'General Citizen Inquiry'}
CRITICAL: Maintain strict grounding in the 9 verified guides. Use temperature 0.2 grounding. Follow: 1. Strict Grounding, 2. Language First, 3. Capture (Checklist First), 4. Apply (One Step at a Time), 5. Screenshot Sahayak, 6. Revise (WhatsApp Card upon final step completion).`;

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

    const langText =
      language === 'hi'
        ? 'Hindi (हिंदी)'
        : language === 'en'
        ? 'English'
        : 'Hinglish (Hindi written in Roman script)';

    const prompt = `The citizen is currently on Step ${stepNumber}: "${stepTitle}" for "${taskTitle}".
Action instruction: "${actionInstruction}"
Detail: "${detailInstruction}"
Tough terms to explain: ${JSON.stringify(toughTerms || [])}

Please explain this step in super clear, encouraging ${langText}.
Highlight:
1. Exactly what button or link they should click.
2. Common mistakes people make on this step (and how to avoid them).
3. "Asaan Matlab" of any confusing words.
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

    const langNote =
      language === 'hi'
        ? 'Provide the 3 sections in pure, helpful Hindi.'
        : language === 'en'
        ? 'Provide the 3 sections in accessible English.'
        : 'Provide the 3 sections in natural, friendly Hinglish (Hindi written in English alphabet).';

    const systemPrompt = `${SYSTEM_INSTRUCTIONS_DIGITAL_SAHAYAK}
You are functioning as the "Screenshot Sahayak" Visual Error Decoder.
Citizens upload confusing government server errors, HTTP status codes (502, 404, 500, Session Expired, Gateway Timeout, Document upload failed, Aadhaar verification error, etc.).
You MUST break down the issue into EXACTLY THREE DISTINCT SECTIONS:
1. Screen Par Kya Likha Hai (Screen breakdown: What is the text/error message actually saying in plain words)
2. Galti Kyun Hui (Root cause: Why did this failure happen in plain, relatable language - file size, wrong format, server peak hours, timeout)
3. Abhi Kya Karein (Actionable direct solution: Step-by-step immediate fix, such as using the built-in KB Resizer, clearing cache/incognito, checking Class 10 certificate spelling, or timing)

Format your output in a JSON object with keys:
{
  "section1": "text for Screen Par Kya Likha Hai",
  "section2": "text for Galti Kyun Hui",
  "section3": "text for Abhi Kya Karein",
  "summary": "one short summary sentence"
}
Language requirement: ${langNote}`;

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

