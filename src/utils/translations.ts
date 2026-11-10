export type Language = 'hinglish' | 'hi' | 'en';

export interface ProcedureTranslation {
  title: string;
  subtitle?: string;
  tag?: string;
  fraudWarning?: string;
  checklist?: { [id: string]: { label: string; note: string; tag?: string } };
  steps?: { [stepNumber: number]: { title: string; actionInstruction: string; detailInstruction: string } };
}

export const UI_TRANSLATIONS = {
  // HEADER
  header: {
    title: {
      hinglish: 'Digital Sahayak',
      hi: 'डिजिटल सहायक',
      en: 'Digital Sahayak',
    },
    subtitle: {
      hinglish: '100% Free Public Portal Guide • Zero Middleman',
      hi: '100% निःशुल्क सरकारी पोर्टल गाइड • दलाल-मुक्त भारत',
      en: '100% Free Public Portal Guide • Zero Middleman',
    },
    chatTab: {
      hinglish: 'Gemini Chat',
      hi: 'जेमिनी चैट',
      en: 'Gemini Chat',
    },
    proceduresTab: {
      hinglish: 'Procedures & Tools',
      hi: 'प्रक्रियाएं और टूल्स',
      en: 'Procedures & Tools',
    },
    scamShieldTab: {
      hinglish: 'Scam Shield',
      hi: 'स्कैम कवच',
      en: 'Scam Shield',
    },
    draftsBtn: {
      hinglish: 'Drafts',
      hi: 'ड्राफ्ट्स',
      en: 'Drafts',
    },
    helpBtn: {
      hinglish: 'Help',
      hi: 'सहायता',
      en: 'Help',
    },
  },

  // HERO TRUST BANNER
  hero: {
    headline: {
      hinglish: 'Bina kisi cyber cafe tout ko ₹300 se ₹3,000 diye, apne phone se .gov.in portals par kaam sahi aur safely karein.',
      hi: 'बिना किसी साइबर कैफे दलाल को ₹300 से ₹3,000 दिए, अपने फोन से सरकारी पोर्टल्स (.gov.in) पर काम सही और सुरक्षित करें।',
      en: 'Complete government portal tasks safely and 100% free from your phone — without paying ₹300–₹3,000 to cyber cafe touts.',
    },
    toutFree: {
      hinglish: 'Zero Cyber Cafe Tout Commission',
      hi: 'ज़ीरो साइबर कैफे दलाल कमीशन',
      en: 'Zero Cyber Cafe Tout Commission',
    },
    tasksVerified: {
      hinglish: '15 Verified Central & State Tasks',
      hi: '15 सत्यापित केंद्र व राज्य सेवाएं',
      en: '15 Verified Central & State Services',
    },
    saveNotice: {
      hinglish: 'Save ₹300–₹3,000 per application',
      hi: 'प्रति आवेदन ₹300–₹3,000 की सीधी बचत',
      en: 'Save ₹300–₹3,000 per application',
    },
    openDirectory: {
      hinglish: 'Official Directory',
      hi: 'आधिकारिक डायरेक्टरी',
      en: 'Official Directory',
    },
  },

  // SEARCH & FILTER
  search: {
    placeholder: {
      hinglish: 'Search by procedure, form name, portal or error code...',
      hi: 'प्रक्रिया, फॉर्म का नाम, पोर्टल या एरर कोड से खोजें...',
      en: 'Search by procedure, form name, portal or error code...',
    },
    all: {
      hinglish: 'All Procedures',
      hi: 'सभी प्रक्रियाएं',
      en: 'All Procedures',
    },
    easy: {
      hinglish: 'Easy (Online)',
      hi: 'सरल (ऑनलाइन)',
      en: 'Easy (Online)',
    },
    medium: {
      hinglish: 'Medium (Hybrid)',
      hi: 'मध्यम (हाइब्रिड)',
      en: 'Medium (Hybrid)',
    },
    hard: {
      hinglish: 'Hard (Legal/Escalation)',
      hi: 'कठिन (विधिक/शिकायत)',
      en: 'Hard (Legal/Escalation)',
    },
    chatCalloutTitle: {
      hinglish: 'Digital Sahayak Gemini Chat',
      hi: 'डिजिटल सहायक जेमिनी चैट',
      en: 'Digital Sahayak Gemini Chat',
    },
    chatCalloutDesc: {
      hinglish: 'Ask questions, verify file sizes, or decode error screenshots in conversational Hinglish, Hindi, or English.',
      hi: 'सवाल पूछें, फ़ाइल साइज़ चेक करें, या एरर स्क्रीनशॉट को सरल हिंदी, हिंग्लिश या अंग्रेजी में समझें।',
      en: 'Ask questions, verify file sizes, or decode error screenshots in simple Hindi, Hinglish, or English.',
    },
    openChatBtn: {
      hinglish: 'Open Gemini Chat',
      hi: 'जेमिनी चैट खोलें',
      en: 'Open Gemini Chat',
    },
    scamKavachBtn: {
      hinglish: 'Scam Shield (कवच)',
      hi: 'स्कैम कवच',
      en: 'Scam Shield',
    },
  },

  // PROCEDURE LIST
  procedureList: {
    heading: {
      hinglish: 'Verified Procedures',
      hi: 'सत्यापित प्रक्रियाएं',
      en: 'Verified Procedures',
    },
    officialFee: {
      hinglish: 'Official portal fee',
      hi: 'सरकारी पोर्टल शुल्क',
      en: 'Official portal fee',
    },
    cyberCafe: {
      hinglish: 'Cyber cafe charge',
      hi: 'साइबर कैफे शुल्क',
      en: 'Cyber cafe charge',
    },
    saving: {
      hinglish: 'Your saving',
      hi: 'आपकी बचत',
      en: 'Your saving',
    },
    free: {
      hinglish: 'FREE',
      hi: 'मुफ़्त',
      en: 'FREE',
    },
    noMatch: {
      hinglish: 'No procedures found matching your search. Try adjusting the keywords or filter.',
      hi: 'आपकी खोज से मेल खाती कोई प्रक्रिया नहीं मिली। कृपया कीवर्ड या फ़िल्टर बदलकर देखें।',
      en: 'No procedures found matching your search. Try adjusting the keywords or filter.',
    },
  },

  // PRE-FLIGHT CHECKLIST
  checklist: {
    feeTransparency: {
      hinglish: 'Fee transparency',
      hi: 'शुल्क पारदर्शिता',
      en: 'Fee transparency',
    },
    noExtraCharges: {
      hinglish: 'no extra kiosk charges',
      hi: 'कोई अतिरिक्त शुल्क नहीं',
      en: 'no extra kiosk charges',
    },
    officialPortalFee: {
      hinglish: 'Official portal fee',
      hi: 'आधिकारिक पोर्टल शुल्क',
      en: 'Official portal fee',
    },
    cyberCafeCharge: {
      hinglish: 'Cyber cafe charge',
      hi: 'साइबर कैफे शुल्क',
      en: 'Cyber cafe charge',
    },
    extraKioskMargin: {
      hinglish: 'Extra kiosk margin',
      hi: 'अतिरिक्त कैफे मार्जिन',
      en: 'Extra kiosk margin',
    },
    directSaving: {
      hinglish: 'Your direct saving',
      hi: 'आपकी सीधी बचत',
      en: 'Your direct saving',
    },
    freeSelfService: {
      hinglish: '100% free self-service',
      hi: '100% मुफ्त स्व-सेवा',
      en: '100% free self-service',
    },
    preflightTitle: {
      hinglish: 'Pre-flight document checklist',
      hi: 'आवेदन-पूर्व दस्तावेज़ चेकलिस्ट',
      en: 'Pre-flight document checklist',
    },
    ready: {
      hinglish: 'ready',
      hi: 'तैयार',
      en: 'ready',
    },
    of: {
      hinglish: 'of',
      hi: 'में से',
      en: 'of',
    },
    resizeNow: {
      hinglish: 'Resize now',
      hi: 'साइज़ बदलें',
      en: 'Resize now',
    },
    middlemanAlert: {
      hinglish: 'Middleman & Cyber Fraud Alert',
      hi: 'दलाल एवं साइबर धोखाधड़ी चेतावनी',
      en: 'Middleman & Cyber Fraud Alert',
    },
    startGuidance: {
      hinglish: 'Ready? Start Step-by-Step Guidance →',
      hi: 'तैयार हैं? चरण-दर-चरण मार्गदर्शन शुरू करें →',
      en: 'Ready? Start Step-by-Step Guidance →',
    },
  },

  // GUIDED COACH
  coach: {
    step: {
      hinglish: 'Step',
      hi: 'चरण',
      en: 'Step',
    },
    actionToTake: {
      hinglish: 'Action to Take',
      hi: 'क्या करना है (मुख्य निर्देश)',
      en: 'Action to Take',
    },
    detailedInstructions: {
      hinglish: 'Detailed Instructions',
      hi: 'विस्तृत निर्देश',
      en: 'Detailed Instructions',
    },
    toughTerms: {
      hinglish: '💡 Tough Terms (Aasaan Matlab)',
      hi: '💡 कठिन शब्दों का सरल अर्थ (आसान मतलब)',
      en: '💡 Tough Terms (Simple Meanings)',
    },
    openDraftSahayak: {
      hinglish: 'Open Draft Sahayak',
      hi: 'ड्राफ्ट सहायक खोलें',
      en: 'Open Draft Sahayak',
    },
    askAi: {
      hinglish: 'Confused by this step? Ask Gemini AI',
      hi: 'इस चरण में कोई संदेह है? जेमिनी एआई से पूछें',
      en: 'Confused by this step? Ask Gemini AI',
    },
    previousStep: {
      hinglish: 'Previous Step',
      hi: 'पिछला चरण',
      en: 'Previous Step',
    },
    nextStep: {
      hinglish: 'Mark Complete & Next Step →',
      hi: 'चरण पूरा हुआ! अगला चरण →',
      en: 'Mark Complete & Next Step →',
    },
    finalStep: {
      hinglish: 'Final Step Completed! 🎉',
      hi: 'सभी चरण सफलतापूर्वक पूरे हुए! 🎉',
      en: 'Final Step Completed! 🎉',
    },
    portalScreenshot: {
      hinglish: 'Error on Portal? Upload Screenshot',
      hi: 'पोर्टल पर एरर आया? स्क्रीनशॉट अपलोड करें',
      en: 'Error on Portal? Upload Screenshot',
    },
    close: {
      hinglish: 'Close',
      hi: 'बंद करें',
      en: 'Close',
    },
  },

  // KB RESIZER
  resizer: {
    title: {
      hinglish: 'KB Resizer',
      hi: 'केबी (KB) रीसाइज़र',
      en: 'KB Resizer',
    },
    privacy: {
      hinglish: 'Files never leave your browser',
      hi: 'फ़ाइलें कभी आपके फ़ोन/ब्राउज़र से बाहर नहीं जातीं',
      en: 'Files never leave your browser',
    },
    presetSpecs: {
      hinglish: 'PRESET SPECIFICATIONS',
      hi: 'प्रीसेट साइज़ निर्देश',
      en: 'PRESET SPECIFICATIONS',
    },
    ready: {
      hinglish: 'ready',
      hi: 'तैयार',
      en: 'ready',
    },
    uploadAnother: {
      hinglish: 'Upload another image',
      hi: 'दूसरी फ़ोटो अपलोड करें',
      en: 'Upload another image',
    },
    downloadResized: {
      hinglish: 'Download resized file',
      hi: 'रीसाइज़ की गई फ़ाइल डाउनलोड करें',
      en: 'Download resized file',
    },
  },

  // ESCALATION CARD
  escalation: {
    troubleHeading: {
      hinglish: 'Having Trouble or Faced Delay?',
      hi: 'कोई समस्या या अनावश्यक देरी हो रही है?',
      en: 'Having Trouble or Faced Delay?',
    },
    directoryTitle: {
      hinglish: 'Statutory Escalation & Grievance Directory',
      hi: 'संवैधानिक शिकायत व निवारण निर्देशिका',
      en: 'Statutory Escalation & Grievance Directory',
    },
    appCardTitle: {
      hinglish: 'Your application card',
      hi: 'आपका आवेदन कार्ड',
      en: 'Your application card',
    },
    inProgress: {
      hinglish: 'In progress',
      hi: 'प्रगति पर',
      en: 'In progress',
    },
    task: {
      hinglish: 'Task',
      hi: 'कार्य',
      en: 'Task',
    },
    tempRef: {
      hinglish: 'Temp ref',
      hi: 'अस्थायी संदर्भ',
      en: 'Temp ref',
    },
    current: {
      hinglish: 'Current',
      hi: 'वर्तमान स्थिति',
      en: 'Current',
    },
    screenshotHelp: {
      hinglish: 'Got stuck? Upload a screenshot of the portal screen for instant step-by-step guidance.',
      hi: 'कहीं अटक गए? स्क्रीनशॉट अपलोड करें, हम तुरंत सही कदम समझाएंगे।',
      en: 'Got stuck? Upload a screenshot of the portal screen for instant step-by-step guidance.',
    },
    uploadBtn: {
      hinglish: 'Screenshot Sahayak',
      hi: 'स्क्रीनशॉट सहायक',
      en: 'Screenshot Sahayak',
    },
  },

  // GEMINI CHAT
  chat: {
    groundedNotice: {
      hinglish: 'Grounded in 15 verified government guides',
      hi: '15 सत्यापित सरकारी गाइड्स पर आधारित',
      en: 'Grounded in 15 verified government guides',
    },
    newChat: {
      hinglish: 'New chat',
      hi: 'नई बातचीत',
      en: 'New chat',
    },
    scamNotice: {
      hinglish: 'Scam Shield active. WhatsApp par "Free PM Solar Yojana" ya "Electricity KYC block" jaisa message aaya? Pehle link check karein.',
      hi: 'स्कैम कवच सक्रिय। व्हाट्सएप पर "मुफ्त सोलर योजना" या "बिजली केवाईसी ब्लॉक" जैसा मैसेज आया? पहले लिंक जांचें।',
      en: 'Scam Shield active. Received a message on WhatsApp like "Free PM Solar" or "Electricity KYC block"? Check link first.',
    },
    checkLink: {
      hinglish: 'Check a link',
      hi: 'लिंक जांचें',
      en: 'Check a link',
    },
    verifiedTasks: {
      hinglish: 'VERIFIED TASKS',
      hi: 'सत्यापित कार्य',
      en: 'VERIFIED TASKS',
    },
    showMore: {
      hinglish: 'Show more',
      hi: 'और देखें',
      en: 'Show more',
    },
    showLess: {
      hinglish: 'Show less',
      hi: 'कम देखें',
      en: 'Show less',
    },
    inputPlaceholder: {
      hinglish: 'Sawal poochhein, e.g. NEET, DL renewal, Aadhaar...',
      hi: 'संदेह या सवाल पूछें, जैसे NEET, DL नवीनीकरण, आधार...',
      en: 'Ask your question, e.g. NEET, DL renewal, Aadhaar...',
    },
    zeroCommission: {
      hinglish: 'Zero commission guarantee',
      hi: 'ज़ीरो कमीशन गारंटी',
      en: 'Zero commission guarantee',
    },
    pressEnter: {
      hinglish: 'Press Enter to send',
      hi: 'भेजने के लिए Enter दबाएं',
      en: 'Press Enter to send',
    },
    btnDocumentsReady: {
      hinglish: '✅ Haan, Documents Ready! Step 1 batayein',
      hi: '✅ हाँ, दस्तावेज़ तैयार हैं! स्टेप 1 बताएं',
      en: '✅ Yes, Documents Ready! Show Step 1',
    },
    btnStepComplete: {
      hinglish: '➡️ Step Complete! Agla Step',
      hi: '➡️ स्टेप पूरा हुआ! अगला स्टेप बताएं',
      en: '➡️ Step Complete! Next Step',
    },
    pills: {
      resizer: {
        hinglish: 'KB Resizer',
        hi: 'KB रीसाइज़र',
        en: 'KB Resizer',
      },
      screenshot: {
        hinglish: 'Error screenshot',
        hi: 'एरर स्क्रीनशॉट',
        en: 'Error screenshot',
      },
      draft: {
        hinglish: 'Draft Sahayak',
        hi: 'ड्राफ्ट सहायक',
        en: 'Draft Sahayak',
      },
      shield: {
        hinglish: 'Scam Shield',
        hi: 'स्कैम कवच',
        en: 'Scam Shield',
      },
    },
    welcomeText: {
      hinglish: `Namaste! Main **Digital Sahayak** hoon — aapka government portal AI assistant powered by **Gemini 2.5 Flash Light**. 🇮🇳✨

Mera maksad hai ki aap bina kisi cyber cafe tout ko ₹300–₹3,000 diye, apne phone se sarkari portals (.gov.in / .nic.in) par saare kaam 100% sahi aur safely complete karein.

Aap kis bhasha me baat karna chahte hain? (Select your preferred language):
• **Hinglish** (Roman Hindi + English)
• **Simple Hindi (सरल हिंदी)**
• **Simple English**

Neeche diye gaye 15 verified central aur state tasks (Delhi, UP) me se koi bhi select karein, ya apna sawal poochhein!`,
      hi: `नमस्ते! मैं **डिजिटल सहायक** हूँ — आपका सरकारी पोर्टल एआई असिस्टेंट जो **Gemini 2.5 Flash Light** द्वारा संचालित है। 🇮🇳✨

मेरा उद्देश्य है कि आप बिना किसी साइबर कैफे दलाल को ₹300–₹3,000 दिए, अपने मोबाइल फोन से सरकारी पोर्टल्स (.gov.in / .nic.in) पर सभी काम 100% सही और सुरक्षित तरीके से पूरे करें।

आप किस भाषा में बात करना चाहते हैं?
• **सरल हिंदी (Simple Hindi)**
• **Hinglish (हिंग्लिश)**
• **Simple English (अंग्रेजी)**

नीचे दिए गए 15 सत्यापित केंद्र व राज्य सेवाओं (दिल्ली, यूपी) में से कोई भी चुनें, या अपना सवाल पूछें!`,
      en: `Namaste! I am **Digital Sahayak** — your government portal AI assistant powered by **Gemini 2.5 Flash Light**. 🇮🇳✨

My mission is to help you complete public portal services (.gov.in / .nic.in) directly from your smartphone 100% accurately and safely — without paying ₹300–₹3,000 to cyber cafe touts.

Which language do you prefer?
• **Simple English**
• **Simple Hindi (सरल हिंदी)**
• **Hinglish (Roman Hindi + English)**

Select any of the 15 verified central and state services (Delhi, UP) below, or ask your question directly!`,
    },
  },

  // FOOTER
  footer: {
    statutory: {
      hinglish: 'Statutory Clean Digital India Portal Guide • Zero Middleman • Zero Commission',
      hi: 'संवैधानिक स्वच्छ डिजिटल इंडिया पोर्टल गाइड • ज़ीरो दलाल • ज़ीरो कमीशन',
      en: 'Statutory Clean Digital India Portal Guide • Zero Middleman • Zero Commission',
    },
    disclaimer: {
      hinglish: 'Digital Sahayak is an independent public-interest digital assistant. All government trademarks and logos belong to their respective authorities.',
      hi: 'डिजिटल सहायक एक स्वतंत्र जनहित डिजिटल सहायक है। सभी सरकारी ट्रेडमार्क और लोगो उनके संबंधित विभागों के हैं।',
      en: 'Digital Sahayak is an independent public-interest digital assistant. All government trademarks and logos belong to their respective authorities.',
    },
  },
};

// PROCEDURE TRANSLATIONS FOR ALL 15 TASKS
export const PROCEDURE_TRANSLATIONS: Record<string, Record<Language, { title: string; subtitle: string; fraudWarning: string }>> = {
  'neet-ug-2025': {
    hinglish: {
      title: 'NEET UG 2025 Application Form',
      subtitle: 'National Eligibility cum Entrance Test (Undergraduate) • NTA Portal',
      fraudWarning: 'Coaching touts asking ₹2,000 for "guaranteed confirmation" is fraudulent. NTA does not authorize agents.',
    },
    hi: {
      title: 'NEET UG 2025 आवेदन फॉर्म',
      subtitle: 'राष्ट्रीय पात्रता सह प्रवेश परीक्षा (यूजी) • एनटीए (NTA) पोर्टल',
      fraudWarning: 'कोचिंग दलाल जो "पुष्टि की गारंटी" के लिए ₹2,000 मांगते हैं, वे धोखाधड़ी कर रहे हैं। NTA किसी एजेंट को अधिकृत नहीं करता।',
    },
    en: {
      title: 'NEET UG 2025 Application Form',
      subtitle: 'National Eligibility cum Entrance Test (Undergraduate) • NTA Portal',
      fraudWarning: 'Coaching touts demanding ₹2,000 for "guaranteed form confirmation" are fraudulent. NTA does not authorize agents.',
    },
  },
  'driving-licence-renewal': {
    hinglish: {
      title: 'Online Driving Licence Renewal',
      subtitle: 'MoRTH Sarathi Parivahan Contactless Service',
      fraudWarning: 'RTO middlemen charging ₹800–₹1,500 extra are illegal. Contactless service delivers DL straight via Speed Post.',
    },
    hi: {
      title: 'ऑनलाइन ड्राइविंग लाइसेंस नवीनीकरण',
      subtitle: 'सड़क परिवहन मंत्रालय सारथी पोर्टल संपर्क रहित (Contactless) सेवा',
      fraudWarning: 'आरटीओ दलाल जो ₹800–₹1,500 अतिरिक्त मांगते हैं, वे गैरकानूनी हैं। आधार सत्यापन से नया लाइसेंस सीधा स्पीड पोस्ट से घर आता है।',
    },
    en: {
      title: 'Online Driving Licence Renewal',
      subtitle: 'MoRTH Sarathi Parivahan Contactless Service',
      fraudWarning: 'RTO middlemen charging ₹800–₹1,500 extra are illegal. Contactless service delivers renewed DL directly via Speed Post.',
    },
  },
  'aadhaar-mobile-update': {
    hinglish: {
      title: 'Aadhaar Mobile Number Update',
      subtitle: 'UIDAI myAadhaar Portal & Authorized Kendra Appointment',
      fraudWarning: 'Kiosks asking ₹200–₹500 for mobile update are breaking the law. UIDAI fixed statutory biometric fee is strictly ₹50.',
    },
    hi: {
      title: 'आधार में मोबाइल नंबर अपडेट',
      subtitle: 'यूआईडीएआई (UIDAI) माय-आधार पोर्टल व अधिकृत केंद्र अपॉइंटमेंट',
      fraudWarning: 'जो कियोस्क मोबाइल अपडेट के लिए ₹200–₹500 मांगते हैं, वे कानून तोड़ रहे हैं। UIDAI का आधिकारिक शुल्क केवल ₹50 है।',
    },
    en: {
      title: 'Aadhaar Mobile Number Update',
      subtitle: 'UIDAI myAadhaar Portal & Authorized Centre Appointment',
      fraudWarning: 'Kiosks asking ₹200–₹500 for mobile updates are breaking the law. UIDAI fixed statutory fee is strictly ₹50.',
    },
  },
  'gazette-notification': {
    hinglish: {
      title: 'Gazette Notification for Name Change',
      subtitle: 'Department of Publication (Civil Lines Delhi) & Bharatkosh Portal',
      fraudWarning: 'Agents charging ₹5,000–₹15,000 exploit citizens. Direct non-tatkaal publication fee on Bharatkosh is strictly ₹1,100.',
    },
    hi: {
      title: 'नाम परिवर्तन हेतु भारत का राजपत्र (Gazette)',
      subtitle: 'प्रकाशन विभाग (सिविल लाइन्स दिल्ली) एवं भारतकोश पोर्टल',
      fraudWarning: 'एजेंट नाम बदलने के लिए ₹5,000–₹15,000 ठगते हैं। भारतकोश पोर्टल पर आधिकारिक सरकारी प्रकाशन शुल्क मात्र ₹1,100 है।',
    },
    en: {
      title: 'Gazette Notification for Name Change',
      subtitle: 'Department of Publication (Civil Lines Delhi) & Bharatkosh Portal',
      fraudWarning: 'Agents charging ₹5,000–₹15,000 exploit citizens. Direct non-tatkaal publication fee on Bharatkosh is strictly ₹1,100.',
    },
  },
  'fresh-aadhaar-enrolment': {
    hinglish: {
      title: 'Fresh Aadhaar Enrolment',
      subtitle: 'UIDAI & ISRO Bhuvan Aadhaar Kendra Directory',
      fraudWarning: 'Operators demanding money for fresh enrolment are committing a crime. Fresh enrolment is 100% FREE by Government of India.',
    },
    hi: {
      title: 'नया आधार कार्ड नामांकन (Enrolment)',
      subtitle: 'यूआईडीएआई और इसरो भुवन आधार केंद्र निर्देशिका',
      fraudWarning: 'नया आधार बनाने के लिए पैसे मांगने वाले ऑपरेटर अपराध कर रहे हैं। भारत सरकार द्वारा नया आधार नामांकन 100% मुफ़्त है।',
    },
    en: {
      title: 'Fresh Aadhaar Enrolment',
      subtitle: 'UIDAI & ISRO Bhuvan Aadhaar Kendra Directory',
      fraudWarning: 'Operators demanding money for fresh enrolment are committing a crime. Fresh enrolment is 100% FREE by Government of India.',
    },
  },
  'tatkaal-passport': {
    hinglish: {
      title: 'Fresh Passport / Tatkaal Application',
      subtitle: 'Ministry of External Affairs (MEA) Passport Seva Portal',
      fraudWarning: 'Fake "passport assistance" portals siphon money. Only apply on passportindia.gov.in. Never pay cash to touts outside PSK.',
    },
    hi: {
      title: 'नया पासपोर्ट / तत्काल आवेदन',
      subtitle: 'विदेश मंत्रालय (MEA) पासपोर्ट सेवा पोर्टल',
      fraudWarning: 'नकली पासपोर्ट एजेंट हजारों रुपये ठगते हैं। हमेशा आधिकारिक passportindia.gov.in पर ही आवेदन करें। कभी किसी को नकद न दें।',
    },
    en: {
      title: 'Fresh Passport / Tatkaal Application',
      subtitle: 'Ministry of External Affairs (MEA) Passport Seva Portal',
      fraudWarning: 'Fake passport portals siphon money. Only apply on passportindia.gov.in. Never pay cash to touts outside PSK.',
    },
  },
  'cpgrams-grievance': {
    hinglish: {
      title: 'CPGRAMS Central Citizen Grievance',
      subtitle: 'DARPG Public Grievances Portal (Government of India)',
      fraudWarning: 'Lodge grievances directly on pgportal.gov.in for free. Never pay lawyers or cyber cafe touts to lodge RTI or grievance.',
    },
    hi: {
      title: 'सीपीजीआरएएमएस (CPGRAMS) केंद्रीय जन शिकायत',
      subtitle: 'प्रशासनिक सुधार और लोक शिकायत विभाग पोर्टल (भारत सरकार)',
      fraudWarning: 'pgportal.gov.in पर सीधे मुफ़्त में शिकायत दर्ज करें। कभी किसी दलाल या वकील को जन शिकायत दर्ज करने के पैसे न दें।',
    },
    en: {
      title: 'CPGRAMS Central Citizen Grievance',
      subtitle: 'DARPG Public Grievances Portal (Government of India)',
      fraudWarning: 'Lodge grievances directly on pgportal.gov.in for free. Never pay touts or lawyers to lodge public grievances.',
    },
  },
  'anti-corruption-delayed-service': {
    hinglish: {
      title: 'Reporting Bribe Demands & Service Delays',
      subtitle: 'Central Vigilance Commission (CVC) & State Anti-Corruption Bureau',
      fraudWarning: 'Never pay bribes under "speed money" threats. Citizen Charters guarantee statutory delivery timelines with strict penalties.',
    },
    hi: {
      title: 'रिश्वत मांग व कार्य में देरी की शिकायत',
      subtitle: 'केंद्रीय सतर्कता आयोग (CVC) एवं राज्य भ्रष्टाचार निरोधक ब्यूरो',
      fraudWarning: 'काम जल्दी कराने के नाम पर कभी रिश्वत न दें। सिटीजन चार्टर के तहत तय समय में काम न करने वाले अधिकारियों पर जुर्माना होता है।',
    },
    en: {
      title: 'Reporting Bribe Demands & Service Delays',
      subtitle: 'Central Vigilance Commission (CVC) & State Anti-Corruption Bureau',
      fraudWarning: 'Never pay bribes under "speed money" threats. Citizen Charters guarantee statutory delivery timelines with strict penalties.',
    },
  },
  'oci-citizenship': {
    hinglish: {
      title: 'Overseas Citizen of India (OCI) Card',
      subtitle: 'Ministry of Home Affairs (MHA) Foreigners Division Portal',
      fraudWarning: 'Immigration visa consultancies charge $300–$800 for basic form filling. Direct MHA fee is fixed at ₹15,000 / $275.',
    },
    hi: {
      title: 'प्रवासी भारतीय नागरिक (OCI) कार्ड आवेदन',
      subtitle: 'गृह मंत्रालय (MHA) विदेशी प्रभाग पोर्टल',
      fraudWarning: 'वीजा कंसल्टेंट सामान्य फॉर्म भरने के ₹25,000–₹60,000 ऐंठते हैं। गृह मंत्रालय का आधिकारिक शुल्क मात्र ₹15,000 ($275) है।',
    },
    en: {
      title: 'Overseas Citizen of India (OCI) Card',
      subtitle: 'Ministry of Home Affairs (MHA) Foreigners Division Portal',
      fraudWarning: 'Visa agencies charge $300–$800 for basic form filling. Direct MHA fee is fixed at ₹15,000 / $275.',
    },
  },
  'delhi-land-records': {
    hinglish: {
      title: 'Delhi Land Records (Khasra & Khatauni)',
      subtitle: 'Revenue Department (DLRC) • Government of NCT of Delhi',
      fraudWarning: 'Tehsil touts charging ₹500–₹1,500 to pull ROR records are cheating you. Viewing DLRC land records is completely FREE.',
    },
    hi: {
      title: 'दिल्ली भूमि रिकॉर्ड (खसरा एवं खतौनी नकल)',
      subtitle: 'राजस्व विभाग (DLRC) • राष्ट्रीय राजधानी क्षेत्र दिल्ली सरकार',
      fraudWarning: 'तहसील दलाल रिकॉर्ड निकालने के ₹500–₹1,500 ऐंठते हैं। DLRC पोर्टल पर जमीन का रिकॉर्ड देखना 100% मुफ़्त है।',
    },
    en: {
      title: 'Delhi Land Records (Khasra & Khatauni)',
      subtitle: 'Revenue Department (DLRC) • Government of NCT of Delhi',
      fraudWarning: 'Tehsil touts charging ₹500–₹1,500 to pull ROR records are cheating you. Viewing DLRC land records is completely FREE.',
    },
  },
  'delhi-domicile': {
    hinglish: {
      title: 'Delhi Domicile Certificate',
      subtitle: 'e-District Delhi Portal (Revenue Department NCT of Delhi)',
      fraudWarning: 'Cyber cafes charging ₹500–₹1,500 are cheating citizens. e-District Delhi statutory fee is ₹0.',
    },
    hi: {
      title: 'दिल्ली मूल निवास प्रमाण पत्र (Domicile)',
      subtitle: 'ई-डिस्ट्रिक्ट दिल्ली पोर्टल (राजस्व विभाग, दिल्ली सरकार)',
      fraudWarning: 'साइबर कैफे मूल निवास के ₹500–₹1,500 वसूलते हैं। ई-डिस्ट्रिक्ट पोर्टल पर यह प्रमाण पत्र 100% मुफ़्त बनता है।',
    },
    en: {
      title: 'Delhi Domicile Certificate',
      subtitle: 'e-District Delhi Portal (Revenue Department NCT of Delhi)',
      fraudWarning: 'Cyber cafes charging ₹500–₹1,500 are cheating citizens. e-District Delhi statutory fee is ₹0.',
    },
  },
  'delhi-caste': {
    hinglish: {
      title: 'Delhi Caste Certificate (SC/ST/OBC)',
      subtitle: 'e-District Delhi Portal (Revenue Department NCT of Delhi)',
      fraudWarning: 'Touts claim they can get certificates without 1993 Delhi proof for ₹3,000. This is a scam resulting in fake certificates.',
    },
    hi: {
      title: 'दिल्ली जाति प्रमाण पत्र (SC / ST / OBC)',
      subtitle: 'ई-डिस्ट्रिक्ट दिल्ली पोर्टल (राजस्व विभाग, दिल्ली सरकार)',
      fraudWarning: 'दलाल दावा करते हैं कि बिना 1993 के सबूत के प्रमाण पत्र बनवा देंगे। यह जालसाजी है और इससे जाली प्रमाण पत्र मिलता है।',
    },
    en: {
      title: 'Delhi Caste Certificate (SC/ST/OBC)',
      subtitle: 'e-District Delhi Portal (Revenue Department NCT of Delhi)',
      fraudWarning: 'Touts claiming they can get certificates without 1993 Delhi proof for ₹3,000 are scammers issuing forged papers.',
    },
  },
  'up-bhulekh': {
    hinglish: {
      title: 'UP Bhulekh Land Record (Khasra/Khatauni)',
      subtitle: 'Board of Revenue Uttar Pradesh • upbhulekh.gov.in',
      fraudWarning: 'Lekhpal or touts charging ₹200–₹500 for viewing Khatauni are cheating. Real-time Khatauni viewing is 100% FREE.',
    },
    hi: {
      title: 'यूपी भूलेख जमीन रिकॉर्ड (खसरा / खतौनी नकल)',
      subtitle: 'राजस्व परिषद उत्तर प्रदेश • upbhulekh.gov.in',
      fraudWarning: 'लेखपाल या कैफे वाले खतौनी देखने के ₹200–₹500 लेते हैं। आधिकारिक पोर्टल पर खतौनी देखना 100% मुफ़्त है।',
    },
    en: {
      title: 'UP Bhulekh Land Record (Khasra/Khatauni)',
      subtitle: 'Board of Revenue Uttar Pradesh • upbhulekh.gov.in',
      fraudWarning: 'Touts charging ₹200–₹500 for viewing Khatauni are cheating. Real-time Khatauni viewing is 100% FREE.',
    },
  },
  'up-domicile': {
    hinglish: {
      title: 'UP Domicile Certificate (Niwas Praman Patra)',
      subtitle: 'edistrict.up.gov.in / eSathi UP Portal',
      fraudWarning: 'Kiosks demanding ₹300–₹800 are overcharging. Direct citizen fee on eSathi is only ₹15.',
    },
    hi: {
      title: 'यूपी मूल निवास प्रमाण पत्र (Niwas Praman Patra)',
      subtitle: 'edistrict.up.gov.in / ई-साथी उत्तर प्रदेश पोर्टल',
      fraudWarning: 'कियोस्क ₹300–₹800 मांगकर लूटते हैं। ई-साथी पोर्टल पर नागरिक का आधिकारिक शुल्क मात्र ₹15 है।',
    },
    en: {
      title: 'UP Domicile Certificate (Niwas Praman Patra)',
      subtitle: 'edistrict.up.gov.in / eSathi UP Portal',
      fraudWarning: 'Kiosks demanding ₹300–₹800 are overcharging. Direct citizen fee on eSathi is strictly ₹15.',
    },
  },
  'up-caste': {
    hinglish: {
      title: 'UP Caste Certificate (Jati Praman Patra)',
      subtitle: 'edistrict.up.gov.in / eSathi UP Portal',
      fraudWarning: 'Do not pay bribes. Citizen portal eSathi charges strictly ₹15. Track application status directly using your Application ID.',
    },
    hi: {
      title: 'यूपी जाति प्रमाण पत्र (Jati Praman Patra)',
      subtitle: 'edistrict.up.gov.in / ई-साथी उत्तर प्रदेश पोर्टल',
      fraudWarning: 'रिश्वत बिल्कुल न दें। ई-साथी पोर्टल पर शुल्क मात्र ₹15 है। अपने आवेदन नंबर से स्थिति सीधे ऑनलाइन ट्रैक करें।',
    },
    en: {
      title: 'UP Caste Certificate (Jati Praman Patra)',
      subtitle: 'edistrict.up.gov.in / eSathi UP Portal',
      fraudWarning: 'Do not pay bribes. Citizen portal eSathi charges strictly ₹15. Track application status directly using your Application ID.',
    },
  },
};

export const getLocalizedProcedure = (procedure: any, lang: Language) => {
  const trans = PROCEDURE_TRANSLATIONS[procedure.id]?.[lang];
  if (!trans) return procedure;
  return {
    ...procedure,
    title: trans.title,
    subtitle: trans.subtitle,
    fraudWarning: trans.fraudWarning,
  };
};
