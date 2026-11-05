export interface ToughTerm {
  term: string;
  meaning: string;
}

export interface StepInfo {
  stepNumber: number;
  totalSteps: number;
  title: string;
  actionInstruction: string;
  detailInstruction: string;
  toughTerms: ToughTerm[];
}

export interface ChecklistItem {
  id: string;
  label: string;
  note: string;
  tag?: string;
  canResize?: boolean;
  defaultChecked?: boolean;
}

export interface Procedure {
  id: string;
  title: string;
  tag: string;
  tagType: 'easy' | 'medium' | 'hard' | 'free';
  category: 'easy' | 'medium' | 'hard';
  portal: string;
  portalUrl: string;
  officialFee: number;
  officialFeeLabel: string;
  officialFeeSubtext: string;
  cyberCafeCharge: number;
  cyberCafeLabel: string;
  savingsLabel: string;
  subtitle: string;
  badge: string;
  saveSummary: string;
  helpline: string;
  tempRefPrefix: string;
  checklist: ChecklistItem[];
  fraudWarning: string;
  steps: StepInfo[];
}

export const PROCEDURES_DATA: Procedure[] = [
  {
    id: 'neet-ug-2025',
    title: 'NEET UG 2025 Application Form',
    tag: 'Easy (Online)',
    tagType: 'easy',
    category: 'easy',
    portal: 'exams.nta.ac.in',
    portalUrl: 'https://exams.nta.ac.in',
    officialFee: 1700,
    officialFeeLabel: '₹1,700',
    officialFeeSubtext: 'Standard Gen/OBC',
    cyberCafeCharge: 2100,
    cyberCafeLabel: '₹2,100',
    savingsLabel: '₹400',
    subtitle: 'National Eligibility cum Entrance Test (Undergraduate) • NTA Portal',
    badge: 'Save ₹350 cyber cafe fee',
    saveSummary: 'Fee: ₹1,700',
    helpline: '011-40759000',
    tempRefPrefix: 'NTA-NEET-2025-APP-',
    checklist: [
      {
        id: 'photo',
        label: 'Recent Passport Photo (JPG, 10–200 KB)',
        note: 'White background, 80% face visible',
        canResize: true,
        defaultChecked: true,
      },
      {
        id: 'signature',
        label: 'Scanned Signature (JPG, 10–100 KB)',
        note: 'Black ink on white plain paper',
        canResize: true,
        defaultChecked: true,
      },
      {
        id: 'marksheet',
        label: 'Class 10th Marks Sheet / Certificate (PDF, 50–300 KB)',
        note: 'Required for date of birth verification',
        tag: 'Needs PDF',
        defaultChecked: false,
      },
      {
        id: 'mobile',
        label: 'Active Mobile for Aadhaar OTP',
        note: 'Must receive SMS OTP within 10 minutes',
        tag: 'Active SIM',
        defaultChecked: false,
      },
    ],
    fraudWarning:
      'Never share OTP or sign-in credentials with any unauthorized kiosk or WhatsApp group. NTA and government bodies never ask for additional verification payments over phone call, UPI QR codes, or Telegram.',
    steps: [
      {
        stepNumber: 1,
        totalSteps: 6,
        title: 'Generate Application Number & Password',
        actionInstruction: 'Portal par "New Candidate Register Here" button par click karein aur apna Valid Email & Mobile number daalein.',
        detailInstruction: 'Aapke phone aur email par verification link ya OTP aayega. OTP daal kar password banayein (Password me 1 Capital, 1 Number aur 1 Special character zaroor ho).',
        toughTerms: [
          { term: 'Applicant No.', meaning: 'Aapka unique roll-call ID jo admit card aur result tak kaam aayega' },
          { term: 'Case Sensitive', meaning: 'Capital aur small letters ka dhyan rakhna zaroori hai' },
        ],
      },
      {
        stepNumber: 2,
        totalSteps: 6,
        title: 'Fill Personal & Aadhaar Details',
        actionInstruction: 'Portal par "New Registration" pe tap karein aur apna 12-digit Aadhaar number daalein. OTP aane par verify karein.',
        detailInstruction: 'Make sure that your Candidate Name matches your Class 10 Certificate spelling exactly. Do not use prefixes like Shri, Mr., or Dr.',
        toughTerms: [
          { term: 'Deponent', meaning: 'Voh vyakti jo form bhar raha hai (Aap khud)' },
          { term: 'Auto-fetch', meaning: 'Aadhaar se aapka naam aur photo apne aap jud jaana' },
        ],
      },
      {
        stepNumber: 3,
        totalSteps: 6,
        title: 'Enter Academic Qualification & Class 12 Roll Number',
        actionInstruction: 'Class 10th and 12th board, school name, roll number aur marks percentage verify karein.',
        detailInstruction: 'Agar aap Class 12 appearing candidate hain, to code select karein aur qualifying examination state chunen.',
        toughTerms: [
          { term: 'Qualifying Examination Code', meaning: 'Code 01 (appearing) ya Code 02 (passed 12th)' },
          { term: 'Aggregate Marks', meaning: 'PCB (Physics, Chemistry, Biology) ka kul jod' },
        ],
      },
      {
        stepNumber: 4,
        totalSteps: 6,
        title: 'Upload Scanned Photo, Signature & Thumb Impression',
        actionInstruction: 'Passport photo (10–200 KB) aur signature (10–100 KB) upload karein.',
        detailInstruction: 'Agar file size bada hai, to right panel me "KB Resizer" use karke instant resize karein.',
        toughTerms: [
          { term: 'Aspect Ratio', meaning: 'Photo ki lambai aur chaudai ka sahi anupaat' },
          { term: 'DPI Resolution', meaning: 'Photo ki safaai aur clarity' },
        ],
      },
      {
        stepNumber: 5,
        totalSteps: 6,
        title: 'Review Complete Application & Final Declaration',
        actionInstruction: 'Review page par har ek detail (Naam, DOB, Category, Exam Center choice) dhyan se check karein.',
        detailInstruction: 'Checkboxes tick karein: "I have verified my name, father\'s name, mother\'s name, DOB, gender and category".',
        toughTerms: [
          { term: 'Declaration', meaning: 'Aapka shapath-patra ki di gayi saari jaankari sahi hai' },
          { term: 'Final Freeze', meaning: 'Iske baad form me bina correction window ke badlav nahi ho sakta' },
        ],
      },
      {
        stepNumber: 6,
        totalSteps: 6,
        title: 'Pay Official Fee via Netbanking / UPI & Download Confirmation Page',
        actionInstruction: 'Official payment gateway (SBI / Canara / HDFC / ICICI) se sirf official fee ₹1,700 pay karein.',
        detailInstruction: 'Payment successful hone ke baad "Confirmation Page" PDF zaroor download aur email par save karein.',
        toughTerms: [
          { term: 'Confirmation Page', meaning: 'Aapke successful submission ka sabse bada saboot' },
          { term: 'Transaction Ref', meaning: 'Bank transaction ka number jisse payment verify hoti hai' },
        ],
      },
    ],
  },
  {
    id: 'driving-licence-renewal',
    title: 'Driving Licence (DL) Renewal',
    tag: 'Medium (Multi-Step)',
    tagType: 'medium',
    category: 'medium',
    portal: 'parivahan.gov.in',
    portalUrl: 'https://parivahan.gov.in',
    officialFee: 200,
    officialFeeLabel: '₹200 + test',
    officialFeeSubtext: 'Statutory RTO Fee',
    cyberCafeCharge: 1000,
    cyberCafeLabel: '₹1,000',
    savingsLabel: '₹800',
    subtitle: 'Ministry of Road Transport and Highways • Sarathi Parivahan',
    badge: 'Save ₹800 tout fee',
    saveSummary: 'Fee: ₹200 + test',
    helpline: '0120-4925505',
    tempRefPrefix: 'MORTH-SARATHI-DL-',
    checklist: [
      {
        id: 'dl-copy',
        label: 'Existing Driving Licence copy / DL Number',
        note: 'Expired within 1 year or upcoming renewal',
        defaultChecked: true,
      },
      {
        id: 'form-1a',
        label: 'Medical Certificate Form 1-A (if age > 40)',
        note: 'Signed by registered MBBS doctor',
        tag: 'Form 1A',
        defaultChecked: false,
      },
      {
        id: 'address-proof',
        label: 'Present Address Proof (Aadhaar / Voter ID)',
        note: 'Address must match state RTO jurisdiction',
        tag: 'PDF/JPG',
        defaultChecked: true,
      },
      {
        id: 'aadhaar-phone',
        label: 'Aadhaar-Linked Mobile for Contactless Service',
        note: 'Enables renewal without visiting physical RTO',
        tag: 'No RTO Visit',
        defaultChecked: false,
      },
    ],
    fraudWarning:
      'Beware of roadside RTO agents asking ₹1,000 to ₹1,500. Sarathi Parivahan offers contactless Aadhaar authentication where the renewed DL is posted directly to your home for just statutory fees.',
    steps: [
      {
        stepNumber: 1,
        totalSteps: 4,
        title: 'Open Sarathi Parivahan & Select Your State',
        actionInstruction: 'parivahan.gov.in par "Online Services" > "Driving Licence Related Services" par click karein aur apna State select karein.',
        detailInstruction: 'Dashboard open hone par "Apply for DL Renewal" option chunen.',
        toughTerms: [
          { term: 'Sarathi', meaning: 'Bharat sarkar ka central driving licence database portal' },
          { term: 'RTO Jurisdiction', meaning: 'Aapke zile ka official transport office' },
        ],
      },
      {
        stepNumber: 2,
        totalSteps: 4,
        title: 'Enter DL Number & Date of Birth',
        actionInstruction: 'Apna DL number aur Date of Birth enter karke "Get DL Details" par click karein.',
        detailInstruction: 'Aapki screen par aapka photo, puraane licence ki details aur validity show ho jayegi.',
        toughTerms: [
          { term: 'Non-Transport', meaning: 'Private gaadi (Bike/Car) ka licence' },
          { term: 'Transport', meaning: 'Commercial taxi ya heavy vehicle ka licence' },
        ],
      },
      {
        stepNumber: 3,
        totalSteps: 4,
        title: 'Choose Contactless (Aadhaar Based) Authentication',
        actionInstruction: 'Aadhaar authentication option select karein aur OTP enter karein.',
        detailInstruction: 'Aadhaar select karne par aapko physical RTO jaane ki zaroorat nahi padegi.',
        toughTerms: [
          { term: 'Faceless Service', meaning: 'Ghar baithe bina RTO jaaye licence renew hona' },
          { term: 'Form 1 Self Declaration', meaning: 'Physical fitness ka online tickbox form' },
        ],
      },
      {
        stepNumber: 4,
        totalSteps: 4,
        title: 'Pay Statutory Fee & Download Acknowledgement',
        actionInstruction: 'Statutory fee ₹200 (aur agar late ho to late fee) online UPI/Netbanking se pay karein.',
        detailInstruction: 'Payment receipt aur Application form slip download karke print ya PDF rakh lein.',
        toughTerms: [
          { term: 'Application Slip', meaning: 'DL dispatch track karne ke liye reference number' },
          { term: 'Speed Post Tracking', meaning: 'Ghar par physical smart card aane ka post tracking' },
        ],
      },
    ],
  },
  {
    id: 'aadhaar-mobile-update',
    title: 'Aadhaar Mobile Number Update',
    tag: 'Medium (Biometric)',
    tagType: 'medium',
    category: 'medium',
    portal: 'uidai.gov.in / myaadhaar',
    portalUrl: 'https://myaadhaar.uidai.gov.in',
    officialFee: 50,
    officialFeeLabel: '₹50',
    officialFeeSubtext: 'Government Fixed Biometric Fee',
    cyberCafeCharge: 250,
    cyberCafeLabel: '₹250',
    savingsLabel: '₹200',
    subtitle: 'Unique Identification Authority of India • myAadhaar Portal',
    badge: 'Save ₹200 middleman',
    saveSummary: 'Mandatory Fee: ₹50',
    helpline: '1947',
    tempRefPrefix: 'UIDAI-SRN-',
    checklist: [
      {
        id: 'aadhaar-card',
        label: '12-Digit Aadhaar Card / Number',
        note: 'No documents needed for mobile update!',
        defaultChecked: true,
      },
      {
        id: 'new-mobile',
        label: 'New Active Mobile Number (Physical SIM with you)',
        note: 'Will receive verification code on spot',
        tag: 'Active Phone',
        defaultChecked: true,
      },
      {
        id: 'appointment-slip',
        label: 'Online Booked UIDAI Appointment Slip (Optional)',
        note: 'Saves 2 hours waiting in queue',
        tag: 'Zero Wait',
        defaultChecked: false,
      },
    ],
    fraudWarning:
      'Warning: No website or agent can update your Aadhaar mobile number 100% online without biometrics. Government rule mandates fingerprint/iris verification at an official Aadhaar Seva Kendra or Post Office for strictly ₹50. Beware of fake ₹250 online scams.',
    steps: [
      {
        stepNumber: 1,
        totalSteps: 3,
        title: 'Book Official Slot at UIDAI ASK or Post Office',
        actionInstruction: 'myaadhaar.uidai.gov.in par "Book an Appointment" par click karein aur apna city chunein.',
        detailInstruction: 'Mobile Number Update select karein. Isme kisi document ki zaroorat nahi hoti.',
        toughTerms: [
          { term: 'ASK', meaning: 'Aadhaar Seva Kendra (Official UIDAI operated center)' },
          { term: 'India Post IPPB', meaning: 'Postman dwara ghar par bhi mobile update karne ki suvidha' },
        ],
      },
      {
        stepNumber: 2,
        totalSteps: 3,
        title: 'Visit Kendra for Fingerprint / Iris Verification',
        actionInstruction: 'Scheduled time par jaayein aur operator ko sirf ₹50 government receipt ke saath dein.',
        detailInstruction: 'Operator aapka fingerprint authenticate karega aur new mobile par OTP bhejkar link karega.',
        toughTerms: [
          { term: 'Biometric Capture', meaning: 'Angoothe ya aankh ka scan lena' },
          { term: 'Overcharging Redressal', meaning: 'Agar ₹50 se zyada maange to 1947 par turant complaint karein' },
        ],
      },
      {
        stepNumber: 3,
        totalSteps: 3,
        title: 'Receive Update Acknowledgment (URN) & Track',
        actionInstruction: 'Operator se 14-digit URN (Update Request Number) slip lein.',
        detailInstruction: '24 se 72 ghante ke andar mobile update ho jaata hai. myAadhaar par status check karein.',
        toughTerms: [
          { term: 'URN', meaning: 'Update Request Number (tracking code)' },
          { term: 'e-Aadhaar', meaning: 'Mobile update hone ke baad OTP se download hone wala digital card' },
        ],
      },
    ],
  },
  {
    id: 'gazette-notification',
    title: 'Gazette Notification (Name Change)',
    tag: 'Hard (Complex)',
    tagType: 'hard',
    category: 'hard',
    portal: 'egazette.gov.in',
    portalUrl: 'https://egazette.gov.in',
    officialFee: 1100,
    officialFeeLabel: '₹1,100',
    officialFeeSubtext: 'Statutory Controller of Publications',
    cyberCafeCharge: 4600,
    cyberCafeLabel: '₹4,600',
    savingsLabel: '₹3,500',
    subtitle: 'Department of Publication • Ministry of Housing and Urban Affairs',
    badge: 'Save ₹3,500 legal tout',
    saveSummary: 'Statutory: ₹1,100',
    helpline: '011-23810150',
    tempRefPrefix: 'EGAZ-NAME-CHG-',
    checklist: [
      {
        id: 'affidavit',
        label: 'Original Affidavit on Non-Judicial Stamp Paper (₹10–₹100)',
        note: 'Notarized with current and new name',
        tag: 'Notarized',
        defaultChecked: false,
      },
      {
        id: 'newspaper',
        label: 'Original Newspaper Clippings (1 Daily Newspaper)',
        note: 'Ad published announcing legal name change',
        tag: 'Paper Cut',
        defaultChecked: false,
      },
      {
        id: 'specimen-form',
        label: 'Duly filled Name Change Proforma (Soft copy in CD / Word)',
        note: 'Controller of Publications prescribed format',
        tag: 'Proforma',
        defaultChecked: false,
      },
      {
        id: 'id-proofs',
        label: 'Self-attested copies of ID Proofs (Aadhaar / Voter / PAN)',
        note: 'With two independent witnesses signature',
        tag: 'Self-Attested',
        defaultChecked: true,
      },
    ],
    fraudWarning:
      'Lawyers and cyber cafes routinely charge ₹4,000 to ₹7,000 for a simple Gazette notification. The statutory central government publication fee is only ₹1,100 (for major) and ₹1,400 (for public notice). You can submit directly without any broker.',
    steps: [
      {
        stepNumber: 1,
        totalSteps: 4,
        title: 'Draft & Notarize Affidavit for Name Change',
        actionInstruction: 'Non-judicial stamp paper par standard format me affidavit banwayein aur Notary Public se attest karwayein.',
        detailInstruction: 'Affidavit me puraana naam, naya naam, pitaji/pati ka naam aur sthayi pata likha hona chahiye.',
        toughTerms: [
          { term: 'Affidavit', meaning: 'Kanooni shapath patra jisme aap name change declare karte hain' },
          { term: 'Notarized', meaning: 'Government-approved Notary vakil ki official seal aur sign' },
        ],
      },
      {
        stepNumber: 2,
        totalSteps: 4,
        title: 'Publish Advertisement in One Daily Newspaper',
        actionInstruction: 'Apne area ke kisi bhi daily newspaper ke classified section me name change notice publish karwayein.',
        detailInstruction: 'Newspaper ki poori copy sambhal kar rakhein, cutting ke saath date aur page number dikhna chahiye.',
        toughTerms: [
          { term: 'Classified Notice', meaning: 'Aam janta ke liye public soochana' },
          { term: 'Clipping', meaning: 'Newspaper ka woh hissa jisme ad chhapa ho' },
        ],
      },
      {
        stepNumber: 3,
        totalSteps: 4,
        title: 'Prepare Digital CD & Prescribed Proforma',
        actionInstruction: 'Controller of Publication ki prescribed CD aur Word proforma me details fill karein.',
        detailInstruction: 'Compact Disc (CD) me text matter (.docx format) aur applicant ka passport size photo hona chahiye.',
        toughTerms: [
          { term: 'Proforma', meaning: 'Gazette office ka nirdharit format' },
          { term: 'Witness Signature', meaning: 'Do gawahon ke signature aur ID proof' },
        ],
      },
      {
        stepNumber: 4,
        totalSteps: 4,
        title: 'Pay ₹1,100 on Bharatkosh & Dispatch to Civil Lines Delhi',
        actionInstruction: 'bharatkosh.gov.in par statutory fee pay karein aur dossier Department of Publication, Civil Lines, Delhi bhein.',
        detailInstruction: 'Gazette issue hone par egazette.gov.in se official notification PDF free me download karein.',
        toughTerms: [
          { term: 'Bharatkosh (NTRP)', meaning: 'Bharat sarkar ka official non-tax payment portal' },
          { term: 'Extraordinary Gazette', meaning: 'Bharat ka official Rajpatra jo court aur bank me 100% valid hai' },
        ],
      },
    ],
  },
  {
    id: 'fresh-aadhaar-enrolment',
    title: 'Fresh Aadhaar Enrolment (All Ages)',
    tag: 'Zero Fee • Easy',
    tagType: 'free',
    category: 'easy',
    portal: 'appointments.uidai.gov.in',
    portalUrl: 'https://appointments.uidai.gov.in',
    officialFee: 0,
    officialFeeLabel: '100% Free Service',
    officialFeeSubtext: 'Statutory Citizen Right',
    cyberCafeCharge: 150,
    cyberCafeLabel: '₹150',
    savingsLabel: '₹150',
    subtitle: 'Ministry of Electronics & IT • UIDAI Enrolment Portal',
    badge: 'Beware fake charges',
    saveSummary: '100% Free Service',
    helpline: '1947',
    tempRefPrefix: 'UIDAI-ENROL-',
    checklist: [
      {
        id: 'poi',
        label: 'Proof of Identity (POI) (Passport / PAN / Ration Card)',
        note: 'Original document must be carried to center',
        defaultChecked: true,
      },
      {
        id: 'poa',
        label: 'Proof of Address (POA) (Electricity bill / Bank passbook)',
        note: 'Issued within last 3 months',
        defaultChecked: true,
      },
      {
        id: 'pob',
        label: 'Proof of Birth (Birth Certificate / Class 10 Certificate)',
        note: 'Mandatory for child or date of birth proof',
        tag: 'DOB Proof',
        defaultChecked: false,
      },
    ],
    fraudWarning:
      'Fresh Aadhaar enrolment is 100% FREE OF COST by law. Nobody (no operator, no cyber cafe, no shopkeeper) can charge even ₹1. Report any fee demand directly to 1947.',
    steps: [
      {
        stepNumber: 1,
        totalSteps: 3,
        title: 'Find Nearest Authorized Aadhaar Enrolment Center',
        actionInstruction: 'appointments.uidai.gov.in par apna pincode daalkar bank, post office ya ASK search karein.',
        detailInstruction: 'Center chunne ke baad online appointment lein taaki line me na lagna pade.',
        toughTerms: [
          { term: 'Registrar', meaning: 'Bank ya Post office jo UIDAI ke authorized partner hain' },
          { term: 'Zero Fee', meaning: 'Kisi bhi tarah ki rishwat ya fee dena gair-kanooni hai' },
        ],
      },
      {
        stepNumber: 2,
        totalSteps: 3,
        title: 'Original Document Verification & Biometric Capture',
        actionInstruction: 'Original documents le kar center jaayein. Photo, 10 ungliyon ke nishaan aur dono aankhon ka scan hoga.',
        detailInstruction: 'Operator form bharne ke baad aapse screen par saare details verify karwayega.',
        toughTerms: [
          { term: 'Iris Scan', meaning: 'Aankh ki putli ka high-security photo' },
          { term: 'Demographic Data', meaning: 'Naam, pata, janmtithi aur gender' },
        ],
      },
      {
        stepNumber: 3,
        totalSteps: 3,
        title: 'Collect 28-digit Enrolment Slip (EID) with Timestamp',
        actionInstruction: 'Enrolment complete hone par operator se free acknowledgement slip lein.',
        detailInstruction: 'Slip par 14-digit enrolment number aur date/time stamp hota hai jisse status track hota hai.',
        toughTerms: [
          { term: 'EID', meaning: 'Enrolment ID number' },
          { term: 'e-Aadhaar Download', meaning: 'Card banne par online UIDAI se print nikalna' },
        ],
      },
    ],
  },
  {
    id: 'tatkaal-passport',
    title: 'Tatkaal Passport Online Filing',
    tag: 'Medium (Multi-Step)',
    tagType: 'medium',
    category: 'medium',
    portal: 'passportindia.gov.in',
    portalUrl: 'https://passportindia.gov.in',
    officialFee: 3500,
    officialFeeLabel: '₹3,500',
    officialFeeSubtext: 'Standard (₹1,500) + Tatkaal (₹2,000)',
    cyberCafeCharge: 5000,
    cyberCafeLabel: '₹5,000',
    savingsLabel: '₹1,500',
    subtitle: 'Consular, Passport & Visa Division • Ministry of External Affairs',
    badge: 'Save ₹1,500 agent fee',
    saveSummary: 'Fee: ₹3,500',
    helpline: '1800-258-1800',
    tempRefPrefix: 'MEA-PSK-TATKAAL-',
    checklist: [
      {
        id: 'aadhaar',
        label: 'Aadhaar Card (with updated name and address)',
        note: 'Crucial for immediate verification',
        defaultChecked: true,
      },
      {
        id: 'pan',
        label: 'PAN Card / Voter ID Card',
        note: 'Tatkaal requires at least 3 documents out of 13 prescribed list',
        tag: '3 Docs List',
        defaultChecked: true,
      },
      {
        id: 'bank-passbook',
        label: 'Scheduled Public/Private Bank Passbook with Photo',
        note: 'With minimum 1 year running transactions',
        tag: 'Passbook',
        defaultChecked: false,
      },
      {
        id: 'annexure-e',
        label: 'Self-declaration Annexure E for Tatkaal',
        note: 'Plain paper self declaration',
        tag: 'Annexure E',
        defaultChecked: false,
      },
    ],
    fraudWarning:
      'Never pay agents who promise to "guarantee" passport clearance without police verification. Tatkaal passports are dispatched within 1 to 3 working days by MEA directly to your address.',
    steps: [
      {
        stepNumber: 1,
        totalSteps: 5,
        title: 'Register on Official Passport Seva Portal',
        actionInstruction: 'passportindia.gov.in par register karein aur apna Passport Office (RPO) select karein.',
        detailInstruction: 'Login karke "Apply for Fresh Passport / Re-issue" par click karein.',
        toughTerms: [
          { term: 'RPO', meaning: 'Regional Passport Office' },
          { term: 'PSK', meaning: 'Passport Seva Kendra jahan appointment hota hai' },
        ],
      },
      {
        stepNumber: 2,
        totalSteps: 5,
        title: 'Select Scheme "Tatkaal" & 36-Pages Booklet',
        actionInstruction: 'Application type me "Tatkaal" select karein aur form online fill karein.',
        detailInstruction: 'Saare family members ke names aur address details exactly document se match karein.',
        toughTerms: [
          { term: 'ECNR', meaning: 'Emigration Check Not Required (10th pass candidates)' },
          { term: 'Annexure E', meaning: 'Tatkaal ke liye criminal record na hone ka self-declaration' },
        ],
      },
      {
        stepNumber: 3,
        totalSteps: 5,
        title: 'Pay ₹1,500 Base Fee & Book PSK Slot',
        actionInstruction: 'Online SBI e-Pay se ₹1,500 base fee pay karke PSK slot book karein.',
        detailInstruction: 'Note: Baki ₹2,000 Tatkaal fee verification approve hone ke baad PSK center par collect hoti hai.',
        toughTerms: [
          { term: 'ARN Receipt', meaning: 'Application Reference Number slip' },
          { term: 'Post Police Verification', meaning: 'Tatkaal me police inquiry passport dispatch ke baad hoti hai' },
        ],
      },
      {
        stepNumber: 4,
        totalSteps: 5,
        title: 'Visit PSK with 3 Original Documents',
        actionInstruction: 'Appointment date par original Aadhaar, PAN aur Passbook le kar PSK jaayein.',
        detailInstruction: 'Counters A (biometrics/photo), B (document scrutiny), C (Granting officer) clear karein.',
        toughTerms: [
          { term: 'Counter A', meaning: 'Biometric fingerprint aur live high-res camera photo' },
          { term: 'Granting Officer', meaning: 'GO official jo passport approve karte hain' },
        ],
      },
      {
        stepNumber: 5,
        totalSteps: 5,
        title: 'Track Dispatch & Speed Post Delivery',
        actionInstruction: 'mPassport Seva app ya website se ARN daalkar printing aur dispatch track karein.',
        detailInstruction: 'Speed post se 48 se 72 hours me passport aapke ghar deliver ho jata hai.',
        toughTerms: [
          { term: 'Speed Post Consignment No.', meaning: 'India Post tracking code' },
          { term: 'Undelivered Return', meaning: 'Ghar par kisi ke na hone par post office se collect karna' },
        ],
      },
    ],
  },
  {
    id: 'cpgrams-grievance',
    title: 'CPGRAMS Central Grievance Redressal',
    tag: 'Hard (Escalation)',
    tagType: 'hard',
    category: 'hard',
    portal: 'pgportal.gov.in',
    portalUrl: 'https://pgportal.gov.in',
    officialFee: 0,
    officialFeeLabel: 'Citizen Right: ₹0',
    officialFeeSubtext: 'Direct Central Redressal',
    cyberCafeCharge: 300,
    cyberCafeLabel: '₹300',
    savingsLabel: '₹300',
    subtitle: 'Department of Administrative Reforms & Public Grievances (DARPG)',
    badge: 'Direct Officer Redressal',
    saveSummary: 'Citizen Right: ₹0',
    helpline: '1800-11-4000',
    tempRefPrefix: 'CPGRAMS-DARPG-GRV-',
    checklist: [
      {
        id: 'prev-ref',
        label: 'Previous Complaint / Reference Numbers (if delayed > 30 days)',
        note: 'Helps track bureaucratic delays',
        defaultChecked: true,
      },
      {
        id: 'ministry-name',
        label: 'Concerned Ministry or Department Name (Railways, Telecom, Banking, etc.)',
        note: 'Target the exact nodal officer',
        defaultChecked: true,
      },
      {
        id: 'proof-docs',
        label: 'Supporting PDF Documents (Receipts, bills, rejection letters) (< 4 MB)',
        note: 'Solid evidence ensures resolution',
        tag: 'PDF Evidence',
        defaultChecked: false,
      },
    ],
    fraudWarning:
      'CPGRAMS is an empowered statutory portal directly monitored by the Prime Minister’s Office (PMO) and central ministries. Nodal officers are legally bound to answer within 21 to 30 days. No fee or tout can speed this up.',
    steps: [
      {
        stepNumber: 1,
        totalSteps: 4,
        title: 'Register Citizen Account on pgportal.gov.in',
        actionInstruction: 'pgportal.gov.in par apna mobile aur email daalkar citizen profile create karein.',
        detailInstruction: 'Login karke "Lodge Public Grievance" par click karein.',
        toughTerms: [
          { term: 'CPGRAMS', meaning: 'Centralised Public Grievance Redress and Monitoring System' },
          { term: 'DARPG', meaning: 'Bharat sarkar ka grievance redressal vibhag' },
        ],
      },
      {
        stepNumber: 2,
        totalSteps: 4,
        title: 'Select Appropriate Ministry / Department / State Govt',
        actionInstruction: 'Department chunen (jaise Banking, Railways, Income Tax, EPFO, Telecommunications, ya State Govt).',
        detailInstruction: 'Agar department samajh na aaye, to "Grievance AI categorization" par search karein.',
        toughTerms: [
          { term: 'Nodal Officer', meaning: 'Department ka senior officer jo complaint solve karne ke liye zimmedar hai' },
          { term: 'Sub-ordinate Organization', meaning: 'Jaise Ministry of Finance ke andar SBI ya LIC' },
        ],
      },
      {
        stepNumber: 3,
        totalSteps: 4,
        title: 'Write Clear, Factual Grievance Description & Attach Proof',
        actionInstruction: 'Point-wise likhein: Kya samasya hui, kab se pending hai, aur kis officer ne delay kiya.',
        detailInstruction: 'Koi bhi receipt, photo ya complaint copy PDF format me upload karein.',
        toughTerms: [
          { term: 'Chronology', meaning: 'Ghatnaon ka date-wise sequence' },
          { term: 'Sub-judice Exclusion', meaning: 'Jo mamla court me chal raha hai woh CPGRAMS me nahi liya ja sakta' },
        ],
      },
      {
        stepNumber: 4,
        totalSteps: 4,
        title: 'Submit, Get Registration Number & Monitor Action History',
        actionInstruction: 'Submit button dabate hi aapko central registration number milega (e.g. MORLY/E/2025/...).',
        detailInstruction: 'Har movement SMS aur email par update hoti hai. Agar resolution galat ho to Appeal file karne ka option milta hai.',
        toughTerms: [
          { term: 'ATR (Action Taken Report)', meaning: 'Officer dwara diya gaya official jawab aur karwayi ka record' },
          { term: 'Appellate Authority', meaning: 'Agar jawab pasand na aaye to higher officer ke paas appeal' },
        ],
      },
    ],
  },
  {
    id: 'anti-corruption-delayed-service',
    title: 'Vigilance & Delayed Service Redressal',
    tag: 'Anti-Corruption',
    tagType: 'hard',
    category: 'hard',
    portal: 'cvc.gov.in / lokpal.gov.in',
    portalUrl: 'https://cvc.gov.in',
    officialFee: 0,
    officialFeeLabel: 'Zero Fee',
    officialFeeSubtext: 'Whistleblower Protection',
    cyberCafeCharge: 500,
    cyberCafeLabel: '₹500',
    savingsLabel: '₹500',
    subtitle: 'Central Vigilance Commission (CVC) • Lokpal of India',
    badge: 'Identity Protected',
    saveSummary: 'Zero Fee',
    helpline: '1964',
    tempRefPrefix: 'CVC-VIG-COMP-',
    checklist: [
      {
        id: 'officer-details',
        label: 'Name, Designation & Office Location of Public Servant',
        note: 'Exact department, branch, or counter number',
        defaultChecked: true,
      },
      {
        id: 'audio-receipt',
        label: 'Date, Time & Nature of Unlawful Demand or Delay',
        note: 'Written refusal, voice memo, or prolonged inaction beyond Citizen Charter',
        tag: 'Evidence',
        defaultChecked: false,
      },
      {
        id: 'citizen-charter',
        label: 'Citizen Charter Time Limit Violation Reference',
        note: 'Standard SLA days exceeded',
        tag: 'SLA Limit',
        defaultChecked: false,
      },
    ],
    fraudWarning:
      'Demanding or accepting a bribe is a non-bailable criminal offense under the Prevention of Corruption Act. You can file confidential complaints under Public Interest Disclosure and Protection of Informers (PIDPI) with zero reveal of identity.',
    steps: [
      {
        stepNumber: 1,
        totalSteps: 3,
        title: 'Check Citizen Charter SLA for That Specific Service',
        actionInstruction: 'Har vibhag ka fixed time limit (Citizen Charter) hota hai (jaise Ration card: 30 din, Mutation: 45 din).',
        detailInstruction: 'Agar bina reason ke file pending rakhi gayi hai, to service delivery act ke tehat appeal karein.',
        toughTerms: [
          { term: 'Citizen Charter', meaning: 'Sarkar dwara tay samay-seemha jisme kaam hona compulsory hai' },
          { term: 'SLA', meaning: 'Service Level Agreement' },
        ],
      },
      {
        stepNumber: 2,
        totalSteps: 3,
        title: 'Lodge Online Vigilance Complaint or PIDPI Petition',
        actionInstruction: 'CVC portal (cvc.gov.in) ya State Anti-Corruption Bureau (ACB) helpline 1064 par complaint karein.',
        detailInstruction: 'Aap PIDPI (Public Interest Disclosure) envelope me confidential shikayat bhej sakte hain.',
        toughTerms: [
          { term: 'PIDPI', meaning: 'Aapka naam aur pehchan secret rakhne ka kanoon' },
          { term: 'Trap Action', meaning: 'ACB dwara bribe lene wale ko ronge haatho pakadna' },
        ],
      },
      {
        stepNumber: 3,
        totalSteps: 3,
        title: 'Track Vigilance Inquiry & Enforcement Action',
        actionInstruction: 'Complaint reference number se inquiry status monitor karein.',
        detailInstruction: 'Supervisory officer file call karega aur delay karne wale babu/officer par departmental penalty lagti hai.',
        toughTerms: [
          { term: 'Show Cause Notice', meaning: 'Officer se safai maangna ki delay kyun kiya' },
          { term: 'Disciplinary Action', meaning: 'Vibhagiya karwayi aur file ka turant clearance' },
        ],
      },
    ],
  },
  {
    id: 'oci-citizenship',
    title: 'Renunciation / OCI Card Application',
    tag: 'Hard (Complex)',
    tagType: 'hard',
    category: 'hard',
    portal: 'indiancitizenshiponline.nic.in',
    portalUrl: 'https://indiancitizenshiponline.nic.in',
    officialFee: 15000,
    officialFeeLabel: 'Statutory Fee',
    officialFeeSubtext: 'MHA Fixed Foreign/Domestic Tariff',
    cyberCafeCharge: 22000,
    cyberCafeLabel: '₹22,000',
    savingsLabel: '₹7,000',
    subtitle: 'Ministry of Home Affairs (Foreigners Division) • OCI Services Portal',
    badge: 'Direct MHA Portal',
    saveSummary: 'Statutory Fee',
    helpline: '011-20830150',
    tempRefPrefix: 'MHA-OCI-APP-',
    checklist: [
      {
        id: 'foreign-passport',
        label: 'Current Foreign Passport with minimum 6 months validity',
        note: 'Color scan of information pages',
        defaultChecked: true,
      },
      {
        id: 'surrender-cert',
        label: 'Indian Passport Surrender / Renunciation Certificate',
        note: 'Issued by Indian Embassy / MHA',
        tag: 'Surrender Cert',
        defaultChecked: false,
      },
      {
        id: 'indian-origin',
        label: 'Proof of Indian Origin (Self / Parents / Grandparents)',
        note: 'Old Indian passport copy, domicile or birth certificate',
        tag: 'Roots Proof',
        defaultChecked: true,
      },
      {
        id: 'photo-spec',
        label: '2x2 inch Square Photograph (JPG, 200–500 KB)',
        note: 'Strict light background, no shadow',
        canResize: true,
        defaultChecked: false,
      },
    ],
    fraudWarning:
      'Immigration agents often charge $300 to $800 extra for filling OCI and Renunciation applications. All MHA portals accept direct online submission and track status transparently.',
    steps: [
      {
        stepNumber: 1,
        totalSteps: 4,
        title: 'Complete Online Part A & Part B Form on official MHA Portal',
        actionInstruction: 'ociservices.gov.in ya indiancitizenshiponline.nic.in par "New OCI Registration" chunen.',
        detailInstruction: 'Part A me personal details aur Part B me relatives/citizenship background bharein.',
        toughTerms: [
          { term: 'OCI', meaning: 'Overseas Citizen of India (Lifelong visa-free entry)' },
          { term: 'Part A & B', meaning: 'Applicant info aur family roots ka mandatory verification' },
        ],
      },
      {
        stepNumber: 2,
        totalSteps: 4,
        title: 'Upload Mandatory Documents with Specific File Constraints',
        actionInstruction: 'Foreign passport, Surrender certificate aur Indian origin proof PDF format me upload karein.',
        detailInstruction: 'Document file size 500 KB ke andar honi chahiye. Digital Sahayak ka KB Resizer use karein.',
        toughTerms: [
          { term: 'Nativity Certificate', meaning: 'Tehsildar dwara jaari mool-niwasi pramaan patra' },
          { term: 'Legalized Apostille', meaning: 'Videshi documents ka international verification stamp' },
        ],
      },
      {
        stepNumber: 3,
        totalSteps: 4,
        title: 'Submit Physical Dossier to VFS / FRRO / Embassy',
        actionInstruction: 'Application print nikal kar apne jurisdiction ke VFS center ya FRRO me submit karein.',
        detailInstruction: 'Original documents verification ke liye zaroori hain, jo usi din wapas mil jate hain.',
        toughTerms: [
          { term: 'FRRO', meaning: 'Foreigners Regional Registration Office' },
          { term: 'VFS Global', meaning: 'Embassy ka authorized document collection center' },
        ],
      },
      {
        stepNumber: 4,
        totalSteps: 4,
        title: 'Track Security Vetting by MHA & Collect OCI Booklet',
        actionInstruction: 'Online status me "Under Process", "Granted", "Printed" aur "Dispatched" track karein.',
        detailInstruction: '45 se 60 days me OCI booklet dispatch ho jati hai.',
        toughTerms: [
          { term: 'Prior Approval Category', meaning: 'Special clearance requirements for certain nations' },
          { term: 'Lifelong Multiple Entry', meaning: 'Bina visa Bharat aane-jaane aur rehne ka permanent adhikar' },
        ],
      },
    ],
  },
];

/**
 * Pure helper functions for calculations and filtering
 */
export function calculateSavings(officialFee: number, cyberCafeCharge: number): number {
  return Math.max(0, cyberCafeCharge - officialFee);
}

export function filterProcedures(
  list: Procedure[],
  searchQuery: string,
  categoryFilter: 'all' | 'easy' | 'medium' | 'hard'
): Procedure[] {
  const query = searchQuery.trim().toLowerCase();

  return list.filter((item) => {
    // Category check
    if (categoryFilter !== 'all' && item.category !== categoryFilter) {
      return false;
    }

    if (!query) return true;

    // Search matching in title, portal, tag, subtitle, or steps
    return (
      item.title.toLowerCase().includes(query) ||
      item.portal.toLowerCase().includes(query) ||
      item.tag.toLowerCase().includes(query) ||
      item.subtitle.toLowerCase().includes(query)
    );
  });
}

export function getChecklistReadyCount(checklist: { checked?: boolean; defaultChecked?: boolean }[]): {
  ready: number;
  total: number;
  percent: number;
} {
  const total = checklist.length;
  if (total === 0) return { ready: 0, total: 0, percent: 100 };
  const ready = checklist.filter((item) => item.checked || item.defaultChecked).length;
  const percent = Math.round((ready / total) * 100);
  return { ready, total, percent };
}

export function generateWhatsAppSummary(
  procedure: Procedure,
  currentStepIndex: number,
  tempRef: string
): string {
  const currentStep = procedure.steps[currentStepIndex] || procedure.steps[0];
  const remaining = procedure.steps.length - (currentStepIndex + 1);

  return (
    `*Digital Sahayak (डिजिटल सहायक) — Citizen Record*\n` +
    `----------------------------------------\n` +
    `📌 *Task:* ${procedure.title}\n` +
    `🌐 *Portal:* ${procedure.portal} (${procedure.portalUrl})\n` +
    `🆔 *Ref ID:* ${tempRef}\n` +
    `💰 *Official Fee:* ${procedure.officialFeeLabel} (Cyber Cafe Tout Savings: ${procedure.savingsLabel})\n` +
    `📍 *Current Progress:* Step ${currentStep.stepNumber} of ${currentStep.totalSteps} (${currentStep.title})\n` +
    `⏳ *Remaining:* ${remaining} steps to final submit\n` +
    `🚨 *Security Notice:* Never share OTP or password with anyone!\n` +
    `----------------------------------------\n` +
    `_Navigated 100% Free with Digital Sahayak (Zero Commission)_`
  );
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}
