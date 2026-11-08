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
  draftTemplateId?: 'gazette-name-change' | 'cpgrams-grievance' | 'neet-undertaking' | 'dob-correction';
  draftButtonLabel?: string;
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
        draftTemplateId: 'neet-undertaking',
        draftButtonLabel: '📝 Generate Name/Spelling Undertaking Draft',
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
        draftTemplateId: 'gazette-name-change',
        draftButtonLabel: '📝 Generate Gazette Name Change Affidavit',
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
        draftTemplateId: 'cpgrams-grievance',
        draftButtonLabel: '📝 Generate CPGRAMS Grievance Letter',
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
        draftTemplateId: 'cpgrams-grievance',
        draftButtonLabel: '📝 Generate Vigilance Complaint Draft',
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
  {
    id: 'delhi-land-records',
    title: 'Delhi Land Records (RoR / Khasra / Khatauni)',
    tag: 'Medium (State)',
    tagType: 'medium',
    category: 'medium',
    portal: 'dlrc.delhi.gov.in',
    portalUrl: 'https://dlrc.delhi.gov.in',
    officialFee: 0,
    officialFeeLabel: '₹0 (Free view)',
    officialFeeSubtext: 'Certified copy via e-District',
    cyberCafeCharge: 300,
    cyberCafeLabel: '₹300',
    savingsLabel: '₹300',
    subtitle: 'Revenue Department • GNCTD Delhi Land Records Information System',
    badge: 'Save ₹300 cyber cafe tout fee',
    saveSummary: 'Fee: ₹0 online view',
    helpline: '1076 / 011-23935249',
    tempRefPrefix: 'DL-ROR-',
    checklist: [
      {
        id: 'dl-jurisdiction',
        label: 'Identify Jurisdiction: DLR Act 1954 vs PLR Act 1887',
        note: 'Check if land falls under Delhi Land Reforms Act or Punjab Land Revenue Act',
        tag: 'Legal Status',
        defaultChecked: true,
      },
      {
        id: 'dl-village',
        label: 'District, Sub-Division (Tehsil), & Revenue Village Name',
        note: 'Exact revenue village as recorded in Delhi Revenue Department',
        defaultChecked: true,
      },
      {
        id: 'dl-khata-khasra',
        label: 'Khata Number or Khasra Number (or Owner Name in Hindi/English)',
        note: 'Unique parcel identifier for land query',
        defaultChecked: false,
      },
    ],
    fraudWarning: 'Never pay private agents to view your Delhi RoR. Viewing is 100% free on dlrc.delhi.gov.in.',
    steps: [
      {
        stepNumber: 1,
        totalSteps: 4,
        title: 'Determine Land Jurisdiction & Visit DLRC Portal',
        actionInstruction: 'Go to https://dlrc.delhi.gov.in and select either DLR Act or PLR Act.',
        detailInstruction: 'Different villages in Delhi follow either the Delhi Land Reforms Act 1954 or Punjab Land Revenue Act 1887.',
        toughTerms: [
          { term: 'DLR Act 1954', meaning: 'Delhi Land Reforms Act applicable to rural and urbanized agricultural villages' },
          { term: 'PLR Act 1887', meaning: 'Punjab Land Revenue Act applicable to specific urban belt settlements' },
        ],
      },
      {
        stepNumber: 2,
        totalSteps: 4,
        title: 'Select District, Sub-Division, and Revenue Village',
        actionInstruction: 'Choose your District, Sub-Division, and Village from the dropdowns.',
        detailInstruction: 'Enter Khata Number, Khasra Number, or Owner Name in Hindi or English.',
        toughTerms: [
          { term: 'Khata Number', meaning: 'Account number assigned to a landholding family or joint owners' },
          { term: 'Khasra Number', meaning: 'Specific survey plot/parcel number of agricultural or residential land' },
        ],
      },
      {
        stepNumber: 3,
        totalSteps: 4,
        title: 'View Digitized RoR (Record of Rights / Khatauni)',
        actionInstruction: 'Inspect ownership entries, co-sharer shares, and mutation entries.',
        detailInstruction: 'Check for mortgage or bank lien encumbrances directly on the digitized Khatauni.',
        toughTerms: [
          { term: 'RoR (Record of Rights)', meaning: 'Official register of land tenure, ownership rights, and encumbrances' },
          { term: 'Mutation (Dakhil Kharij)', meaning: 'Formal transfer or updating of land ownership in revenue records' },
        ],
      },
      {
        stepNumber: 4,
        totalSteps: 4,
        title: 'Download Uncertified Copy or Order Certified RoR on e-District',
        actionInstruction: 'Save PDF for informational use; if needed for legal/court proceedings, log in to edistrict.delhigovt.nic.in.',
        detailInstruction: 'Search for "Issuance of RoR" on e-District Delhi to receive an official digitally signed certified copy.',
        toughTerms: [
          { term: 'Certified Copy', meaning: 'Digitally signed official document with government seal valid in court' },
        ],
      },
    ],
  },
  {
    id: 'delhi-domicile',
    title: 'Delhi Domicile Certificate (Niwas Praman Patra)',
    tag: 'Medium (State)',
    tagType: 'medium',
    category: 'medium',
    portal: 'edistrict.delhigovt.nic.in',
    portalUrl: 'https://edistrict.delhigovt.nic.in',
    officialFee: 0,
    officialFeeLabel: '₹0 (NIL Official Fee)',
    officialFeeSubtext: 'Completely free service by GNCTD',
    cyberCafeCharge: 500,
    cyberCafeLabel: '₹500',
    savingsLabel: '₹500',
    subtitle: 'Revenue Department • Government of NCT of Delhi',
    badge: 'Save ₹500 cyber cafe tout fee',
    saveSummary: 'Fee: ₹0 official',
    helpline: '1076 (Doorstep Service) / 011-23935249',
    tempRefPrefix: 'DL-DOM-',
    checklist: [
      {
        id: 'dl-res-proof',
        label: 'Proof of Continuous 3-Year Residence in Delhi',
        note: 'Electricity bills, water bills, registered rent agreement, or school study certificates',
        tag: 'Mandatory',
        defaultChecked: true,
      },
      {
        id: 'dl-poi',
        label: 'Proof of Identity (Aadhaar / Voter ID / Passport / PAN)',
        note: 'Valid government identity card of applicant',
        defaultChecked: true,
      },
      {
        id: 'dl-self-dec',
        label: 'Self-Declaration Form (Generated on e-District)',
        note: 'Must be printed, signed by applicant, and uploaded',
        tag: 'PDF/JPG',
        defaultChecked: false,
      },
      {
        id: 'dl-photo',
        label: 'Passport Photo (JPG, up to 100 KB)',
        note: 'Recent color photograph with plain background',
        canResize: true,
        defaultChecked: false,
      },
    ],
    fraudWarning: 'Government fee for Domicile Certificate in Delhi is ₹0. Never pay touts ₹300–₹800.',
    steps: [
      {
        stepNumber: 1,
        totalSteps: 5,
        title: 'Register or Log in on Delhi e-District Portal',
        actionInstruction: 'Go to https://edistrict.delhigovt.nic.in and log in with your Citizen ID or register using Aadhaar/Voter ID.',
        detailInstruction: 'If not registered, click "New User" and verify your mobile with OTP.',
        toughTerms: [
          { term: 'Citizen Login', meaning: 'Personal account for accessing Delhi government revenue services' },
        ],
      },
      {
        stepNumber: 2,
        totalSteps: 5,
        title: 'Select "Issuance of Domicile Certificate" under Revenue Department',
        actionInstruction: 'Click Apply for Services > Revenue Department > Issuance of Domicile Certificate.',
        detailInstruction: 'Review the eligibility: applicant must have resided continuously in Delhi for the past 3 years.',
        toughTerms: [
          { term: 'Domicile Certificate', meaning: 'Legal proof of permanent or continuous residence in the National Capital Territory of Delhi' },
        ],
      },
      {
        stepNumber: 3,
        totalSteps: 5,
        title: 'Fill Personal Details & Address History',
        actionInstruction: 'Enter full name, parentage, current address, and duration of stay in Delhi.',
        detailInstruction: 'Ensure details match exactly with your Aadhaar and uploaded residence proofs.',
        toughTerms: [
          { term: 'Tehsil / Sub-Division', meaning: 'Administrative zone under which your locality falls in Delhi' },
        ],
      },
      {
        stepNumber: 4,
        totalSteps: 5,
        title: 'Upload Documents & Self-Declaration',
        actionInstruction: 'Upload 3-year continuous stay proof, photo, identity proof, and signed self-declaration.',
        detailInstruction: 'File sizes must adhere to portal limits (under 100 KB JPG or under 1 MB PDF).',
        toughTerms: [
          { term: 'Self-Declaration', meaning: 'Sworn statement confirming authenticity of details subject to IPC penalty' },
        ],
      },
      {
        stepNumber: 5,
        totalSteps: 5,
        title: 'Submit Application & Track Approval by Tehsildar',
        actionInstruction: 'Submit application, record the Application Number, and track status online.',
        detailInstruction: 'Local field verification may be conducted; upon approval (approx. 14 days), download certificate with QR code.',
        toughTerms: [
          { term: 'Digitally Signed Certificate', meaning: 'Official PDF with digital signature valid without physical stamp' },
        ],
      },
    ],
  },
  {
    id: 'delhi-caste',
    title: 'Delhi Caste Certificate (SC / ST / OBC)',
    tag: 'Medium (State)',
    tagType: 'medium',
    category: 'medium',
    portal: 'edistrict.delhigovt.nic.in',
    portalUrl: 'https://edistrict.delhigovt.nic.in',
    officialFee: 0,
    officialFeeLabel: '₹0 (NIL Official Fee)',
    officialFeeSubtext: 'Completely free on Delhi e-District',
    cyberCafeCharge: 800,
    cyberCafeLabel: '₹800',
    savingsLabel: '₹800',
    subtitle: 'Revenue Department • Government of NCT of Delhi',
    badge: 'Save ₹800 cyber cafe tout fee',
    saveSummary: 'Fee: ₹0 official',
    helpline: '1076 / 011-23935249',
    tempRefPrefix: 'DL-CAST-',
    checklist: [
      {
        id: 'dl-father-caste',
        label: "Proof of Father's / Paternal Relative's Caste Certificate",
        note: 'Certificate issued by GNCTD or competent state authority in father/paternal lineage',
        tag: 'Crucial',
        defaultChecked: true,
      },
      {
        id: 'dl-cut-off',
        label: 'Lineage Proof Before Cut-Off Year (1951 for SC/ST; 1993 for OBC)',
        note: 'Ancestral residence proofs establishing presence in Delhi before statutory cut-off',
        tag: 'Statutory',
        defaultChecked: true,
      },
      {
        id: 'dl-obc-income',
        label: 'Income Proof for OBC Non-Creamy Layer (NCL)',
        note: 'Salary certificate, ITR, or Revenue SDM income certificate below ₹8 Lakhs threshold',
        defaultChecked: false,
      },
      {
        id: 'dl-caste-photo',
        label: 'Applicant Photograph & Identity Proof',
        note: 'Recent photo and Aadhaar/Voter ID',
        defaultChecked: false,
      },
    ],
    fraudWarning: 'Delhi Caste Certificate application fee is ₹0. Touts charging ₹500–₹1,500 often forge fake certificates.',
    steps: [
      {
        stepNumber: 1,
        totalSteps: 5,
        title: 'Log in to Delhi e-District Portal',
        actionInstruction: 'Go to https://edistrict.delhigovt.nic.in and log in with your registered credentials.',
        detailInstruction: 'Select "Apply for Services" and navigate to Revenue Department.',
        toughTerms: [
          { term: 'e-District Delhi', meaning: 'Single-window government portal for citizen certificates' },
        ],
      },
      {
        stepNumber: 2,
        totalSteps: 5,
        title: 'Select Appropriate Caste Category (SC / ST / OBC)',
        actionInstruction: 'Choose Issuance of SC Certificate, ST Certificate, or OBC Certificate as applicable.',
        detailInstruction: 'Note that OBC certificates in Delhi require state list verification and non-creamy layer criteria.',
        toughTerms: [
          { term: 'Non-Creamy Layer (NCL)', meaning: 'Income category entitled to OBC reservation benefits' },
        ],
      },
      {
        stepNumber: 3,
        totalSteps: 5,
        title: 'Provide Paternal Lineage & Sub-Caste Details',
        actionInstruction: 'Enter father details, exact sub-caste name, and lineage certificate details.',
        detailInstruction: 'Caste in India is derived strictly through paternal lineage (father), not maternal.',
        toughTerms: [
          { term: 'Paternal Lineage', meaning: 'Father/grandfather family branch legally validating caste identity' },
        ],
      },
      {
        stepNumber: 4,
        totalSteps: 5,
        title: 'Upload Pre-1951 (SC/ST) or Pre-1993 (OBC) Proofs & Self-Declaration',
        actionInstruction: 'Upload documents proving family residence in Delhi prior to statutory cut-off date.',
        detailInstruction: 'Upload father caste certificate, residence records, and signed self-declaration form.',
        toughTerms: [
          { term: 'Cut-Off Date', meaning: 'Statutory baseline year fixed by presidential order (1951 for SC/ST; 1993 for OBC)' },
        ],
      },
      {
        stepNumber: 5,
        totalSteps: 5,
        title: 'Submit Application & Revenue SDM Verification',
        actionInstruction: 'Submit form, note Application Reference Number, and track progress.',
        detailInstruction: 'Revenue Tehsildar/SDM verifies lineage; download approved digital certificate with barcode.',
        toughTerms: [
          { term: 'SDM Approval', meaning: 'Sub-Divisional Magistrate sign-off authorizing certificate release' },
        ],
      },
    ],
  },
  {
    id: 'up-bhulekh',
    title: 'Uttar Pradesh Land Records (UP Bhulekh / Khatauni)',
    tag: 'Easy (100% Free)',
    tagType: 'easy',
    category: 'easy',
    portal: 'upbhulekh.gov.in',
    portalUrl: 'https://upbhulekh.gov.in',
    officialFee: 0,
    officialFeeLabel: '₹0 (100% Free)',
    officialFeeSubtext: 'Completely free public land records portal',
    cyberCafeCharge: 200,
    cyberCafeLabel: '₹200',
    savingsLabel: '₹200',
    subtitle: 'Board of Revenue • Government of Uttar Pradesh',
    badge: 'Save ₹200 cyber cafe tout fee',
    saveSummary: 'Fee: ₹0 online view',
    helpline: '0522-2217145 / bhulekh-up@gov.in',
    tempRefPrefix: 'UP-BHU-',
    checklist: [
      {
        id: 'up-janpad',
        label: 'District (Janpad), Tehsil, and Village (Gram)',
        note: 'Official revenue administrative hierarchy',
        tag: 'Required',
        defaultChecked: true,
      },
      {
        id: 'up-gata',
        label: 'Gata / Khasra Number OR Khata Number OR Khatedar Name',
        note: 'Any one of these identifiers to query land record',
        tag: 'Parcel ID',
        defaultChecked: true,
      },
    ],
    fraudWarning: 'UP Bhulekh public Khatauni view is 100% free on upbhulekh.gov.in. Never pay cyber cafes ₹100–₹200.',
    steps: [
      {
        stepNumber: 1,
        totalSteps: 4,
        title: 'Open UP Bhulekh Official Portal',
        actionInstruction: 'Go to https://upbhulekh.gov.in and click on "Real Time Khatauni ki Nakal Dekhein".',
        detailInstruction: 'Enter the displayed security captcha to enter the land records database.',
        toughTerms: [
          { term: 'Real Time Khatauni', meaning: 'Continuously updated digital land title registry reflecting latest mutations' },
        ],
      },
      {
        stepNumber: 2,
        totalSteps: 4,
        title: 'Select Janpad (District), Tehsil, and Gram (Village)',
        actionInstruction: 'Choose your district, tehsil, and village from the three alphabetical columns.',
        detailInstruction: 'Use the Hindi on-screen alphabet keyboard if searching village by first letter.',
        toughTerms: [
          { term: 'Janpad', meaning: 'District in Uttar Pradesh' },
          { term: 'Tehsil', meaning: 'Sub-district revenue administrative center headed by SDM/Tehsildar' },
        ],
      },
      {
        stepNumber: 3,
        totalSteps: 4,
        title: 'Search by Khasra/Gata, Khata, or Khatedar Name',
        actionInstruction: 'Select search tab: Khasra number, Khata number, or Khatedar (owner) name in Hindi.',
        detailInstruction: 'Click on the matching record and press "Uddharan Dekhein (View Extract)".',
        toughTerms: [
          { term: 'Gata Number', meaning: 'Plot or survey land parcel number in Uttar Pradesh' },
          { term: 'Khatedar', meaning: 'Registered landholder / farmer whose name is recorded in revenue books' },
        ],
      },
      {
        stepNumber: 4,
        totalSteps: 4,
        title: 'Inspect Legal Ownership, Area, & Encumbrance Remarks',
        actionInstruction: 'Verify owner names, land area in hectares, and column 7-12 remarks.',
        detailInstruction: 'Check column 7-12 for court stay orders, bank loan hypothecation, or pending dispute caveats.',
        toughTerms: [
          { term: 'Column 7-12 (Tippani)', meaning: 'Remarks column noting bank mortgage, loans, litigations, or orders' },
        ],
      },
    ],
  },
  {
    id: 'up-domicile',
    title: 'Uttar Pradesh Domicile (Niwas Praman Patra)',
    tag: 'Medium (eSathi)',
    tagType: 'medium',
    category: 'medium',
    portal: 'esathi.up.gov.in',
    portalUrl: 'https://esathi.up.gov.in',
    officialFee: 15,
    officialFeeLabel: '₹15 (Official fee)',
    officialFeeSubtext: 'Statutory fee on eSathi portal',
    cyberCafeCharge: 300,
    cyberCafeLabel: '₹300',
    savingsLabel: '₹285',
    subtitle: 'eSathi Citizen Services • e-District Uttar Pradesh',
    badge: 'Save ₹285 cyber cafe tout fee',
    saveSummary: 'Fee: ₹15 official',
    helpline: '0522-2304706 / edistrict-up@gov.in',
    tempRefPrefix: 'UP-DOM-',
    checklist: [
      {
        id: 'up-photo',
        label: 'Applicant Passport Photo (JPG, up to 50 KB)',
        note: 'Clear face photograph',
        canResize: true,
        defaultChecked: true,
      },
      {
        id: 'up-swa-pramanit',
        label: 'Self-Declaration Form (Swa-Pramanit Ghoshana Patra, up to 100 KB)',
        note: 'Download standard template from eSathi portal, sign and upload',
        tag: 'Mandatory',
        defaultChecked: true,
      },
      {
        id: 'up-res-proof',
        label: 'Proof of Residence (Ration Card / Voter ID / Electricity Bill / Aadhaar)',
        note: 'Valid proof establishing residence in Uttar Pradesh',
        defaultChecked: false,
      },
      {
        id: 'up-pradhan-cert',
        label: 'Gram Pradhan / Ward Parshad Certificate or Educational Marksheet',
        note: 'Local certificate confirming native residence',
        defaultChecked: false,
      },
    ],
    fraudWarning: 'Official statutory fee on eSathi is only ₹15. Do not pay middlemen ₹300–₹500.',
    steps: [
      {
        stepNumber: 1,
        totalSteps: 5,
        title: 'Log in to UP eSathi Portal',
        actionInstruction: 'Go to https://esathi.up.gov.in and log in with citizen credentials (or create account via New Registration).',
        detailInstruction: 'If coming from edistrict.up.gov.in, click Citizen Login (eSathi) to reach the citizen portal.',
        toughTerms: [
          { term: 'eSathi', meaning: 'Official direct-to-citizen portal of Uttar Pradesh Government' },
        ],
      },
      {
        stepNumber: 2,
        totalSteps: 5,
        title: 'Select "Niwas Praman Patra (Domicile Certificate)"',
        actionInstruction: 'Under Certificate Services, click on "Niwas Praman Patra".',
        detailInstruction: 'Choose Rural (Gramin) or Urban (Nagariya) depending on your home location.',
        toughTerms: [
          { term: 'Niwas Praman Patra', meaning: 'Official certificate of domicile/residence in Uttar Pradesh' },
        ],
      },
      {
        stepNumber: 3,
        totalSteps: 5,
        title: 'Fill Personal Details, District, Tehsil, & Address',
        actionInstruction: 'Fill applicant name in Hindi and English, father/husband name, and full address.',
        detailInstruction: 'Specify number of years residing at the current address or select "Janam se" (since birth).',
        toughTerms: [
          { term: 'Janam Se', meaning: 'Resident of the state since birth' },
        ],
      },
      {
        stepNumber: 4,
        totalSteps: 5,
        title: 'Upload Photo, Swa-Pramanit Form, & Residence Proof',
        actionInstruction: 'Upload photo (under 50 KB JPG), self-declaration form, and ration card/Aadhaar (under 100 KB).',
        detailInstruction: 'Ensure all scanned documents are clearly legible to avoid Lekhpal rejection.',
        toughTerms: [
          { term: 'Swa-Pramanit Ghoshana Patra', meaning: 'Self-declaration affidavit format prescribed by UP Revenue Board' },
        ],
      },
      {
        stepNumber: 5,
        totalSteps: 5,
        title: 'Pay ₹15 Official Fee Online & Download Issued Certificate',
        actionInstruction: 'Pay statutory ₹15 via UPI/NetBanking and save Application Reference Number.',
        detailInstruction: 'Lekhpal and Tehsildar conduct enquiry; upon approval (approx. 15-20 days), download certificate from eSathi dashboard.',
        toughTerms: [
          { term: 'Lekhpal', meaning: 'Local revenue village official who verifies physical stay and issues report' },
        ],
      },
    ],
  },
  {
    id: 'up-caste',
    title: 'Uttar Pradesh Caste Certificate (Jati Praman Patra - SC/ST/OBC)',
    tag: 'Medium (eSathi)',
    tagType: 'medium',
    category: 'medium',
    portal: 'esathi.up.gov.in',
    portalUrl: 'https://esathi.up.gov.in',
    officialFee: 15,
    officialFeeLabel: '₹15 (Official fee)',
    officialFeeSubtext: 'Statutory fee on eSathi',
    cyberCafeCharge: 400,
    cyberCafeLabel: '₹400',
    savingsLabel: '₹385',
    subtitle: 'eSathi Citizen Services • e-District Uttar Pradesh',
    badge: 'Save ₹385 cyber cafe tout fee',
    saveSummary: 'Fee: ₹15 official',
    helpline: '0522-2304706 / edistrict-up@gov.in',
    tempRefPrefix: 'UP-JATI-',
    checklist: [
      {
        id: 'up-caste-photo',
        label: 'Applicant Passport Photo (JPG, up to 50 KB)',
        note: 'Recent color photograph',
        canResize: true,
        defaultChecked: true,
      },
      {
        id: 'up-caste-dec',
        label: 'Self-Declaration Form (Swa-Pramanit Ghoshana Patra, up to 100 KB)',
        note: 'Signed statutory self-declaration form',
        tag: 'Mandatory',
        defaultChecked: true,
      },
      {
        id: 'up-caste-proof',
        label: "Proof of Caste: Father's Caste Cert, Parivar Register Nakal, or Land Record",
        note: 'Documentary proof evidencing paternal caste lineage in UP',
        tag: 'Crucial',
        defaultChecked: true,
      },
      {
        id: 'up-caste-ncl',
        label: 'Income Declaration for OBC Non-Creamy Layer',
        note: 'Certificate/declaration showing family income below statutory limit',
        defaultChecked: false,
      },
    ],
    fraudWarning: 'Official charge for UP Caste Certificate is strictly ₹15. Do not pay agents ₹400–₹1,000.',
    steps: [
      {
        stepNumber: 1,
        totalSteps: 5,
        title: 'Log in to UP eSathi Portal',
        actionInstruction: 'Go to https://esathi.up.gov.in and log in with citizen ID.',
        detailInstruction: 'Select Certificate Services > Jati Praman Patra (Hindi or English version as needed).',
        toughTerms: [
          { term: 'Jati Praman Patra', meaning: 'Statutory caste certificate for SC, ST, or OBC citizens' },
        ],
      },
      {
        stepNumber: 2,
        totalSteps: 5,
        title: 'Select Rural (Gramin) or Urban (Nagariya) Area',
        actionInstruction: 'Choose your District, Tehsil, and Gram Panchayat / Ward.',
        detailInstruction: 'Select the exact sub-caste name matching the notified state OBC/SC/ST list.',
        toughTerms: [
          { term: 'Sub-Caste (Up-Jati)', meaning: 'Specific caste community classification notified in government schedule' },
        ],
      },
      {
        stepNumber: 3,
        totalSteps: 5,
        title: 'Enter Applicant & Father Details in Hindi & English',
        actionInstruction: 'Input applicant name, parentage, mobile number, and residential address.',
        detailInstruction: 'Make sure the spelling matches your Aadhaar and school records.',
        toughTerms: [
          { term: 'Devanagari Entry', meaning: 'Entering Hindi spelling correctly using Hindi keyboard or transliteration' },
        ],
      },
      {
        stepNumber: 4,
        totalSteps: 5,
        title: 'Upload Photo, Self-Declaration, & Family Caste Evidence',
        actionInstruction: "Upload photo, signed declaration, and father's caste certificate or Parivar Register copy.",
        detailInstruction: 'Parivar Register copy from Gram Panchayat is the strongest evidence of lineage.',
        toughTerms: [
          { term: 'Parivar Register Nakal', meaning: 'Official copy of family register maintained by Gram Panchayat / Block' },
        ],
      },
      {
        stepNumber: 5,
        totalSteps: 5,
        title: 'Pay ₹15 Fee & Download Approved Certificate',
        actionInstruction: 'Submit, pay ₹15 official charge online, and track via Application Reference Number.',
        detailInstruction: 'Lekhpal conducts field inquiry and forwards to Tehsildar; download digitally signed certificate directly from eSathi dashboard.',
        toughTerms: [
          { term: 'DigiLocker Integration', meaning: 'Certificate can also be fetched into DigiLocker app once issued' },
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
