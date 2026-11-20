import { Language, FALLBACK_LANGUAGE, LocalizedString, t } from './types';

export interface ProcedureTextEntry {
  title: string;
  subtitle: string;
  fraudWarning: string;
}

export const PROCEDURE_TAG_TRANSLATIONS: Record<'easy' | 'medium' | 'hard' | 'free', LocalizedString> = {
  easy: {
    en: 'Easy (Online)',
    hi: 'सरल (ऑनलाइन)',
    hinglish: 'Easy (Online)',
    bn: 'সহজ (অনলাইন)',
    mr: 'सोपे (ऑनलाइन)',
    te: 'సులభం (ఆన్‌లైన్)',
    ta: 'எளிது (ஆன்லைன்)',
    gu: 'સરળ (ઓનલાઇન)',
    kn: 'ಸುಲಭ (ಆನ್‌ಲೈನ್)',
  },
  medium: {
    en: 'Medium (Hybrid)',
    hi: 'मध्यम (बहु-चरणीय)',
    hinglish: 'Medium (Hybrid)',
    bn: 'মাঝারি (বহু-ধাপ)',
    mr: 'मध्यम (अनेक टप्पे)',
    te: 'మధ్యస్థం (బహుళ-దశలు)',
    ta: 'நடுத்தரம் (பல படிகள்)',
    gu: 'મધ્યમ (બહુ-તબક્કા)',
    kn: 'ಮಧ್ಯಮ (ಹಲವು ಹಂತಗಳು)',
  },
  hard: {
    en: 'Hard (Legal/Escalation)',
    hi: 'कठिन (विधिक/शिकायत)',
    hinglish: 'Hard (Legal/Escalation)',
    bn: 'কঠিন (অভিযোগ/আইনি)',
    mr: 'कठीण (कायदेशीर/तक्रार)',
    te: 'కష్టం (ఫిర్యాదు/చట్టపరమైన)',
    ta: 'கடினம் (புகார்/சட்டம்)',
    gu: 'મુશ્કેલ (ફરિયાદ/કાયદેસર)',
    kn: 'ಕಷ್ಟ (ದೂರು/ಕಾನೂನು)',
  },
  free: {
    en: '100% FREE',
    hi: '100% मुफ़्त',
    hinglish: '100% FREE',
    bn: '১০০% বিনামূল্যে',
    mr: '१००% मोफत',
    te: '100% ఉచితం',
    ta: '100% இலவசம்',
    gu: '100% મફત',
    kn: '100% ಉಚಿತ',
  },
};

export const PROCEDURE_TRANSLATIONS: Record<string, Record<Language, ProcedureTextEntry>> = {
  'neet-ug-2025': {
    en: {
      title: 'NEET UG 2025 Application Form',
      subtitle: 'National Eligibility cum Entrance Test (Undergraduate) • NTA Portal',
      fraudWarning: 'Coaching touts demanding ₹2,000 for "guaranteed form confirmation" are fraudulent. NTA does not authorize agents.',
    },
    hi: {
      title: 'NEET UG 2025 आवेदन फॉर्म',
      subtitle: 'राष्ट्रीय पात्रता सह प्रवेश परीक्षा (यूजी) • एनटीए (NTA) पोर्टल',
      fraudWarning: 'कोचिंग दलाल जो "पुष्टि की गारंटी" के लिए ₹2,000 मांगते हैं, वे धोखाधड़ी कर रहे हैं। NTA किसी एजेंट को अधिकृत नहीं करता।',
    },
    hinglish: {
      title: 'NEET UG 2025 Application Form',
      subtitle: 'National Eligibility cum Entrance Test (Undergraduate) • NTA Portal',
      fraudWarning: 'Coaching touts asking ₹2,000 for "guaranteed confirmation" is fraudulent. NTA does not authorize agents.',
    },
    bn: {
      title: 'NEET UG ২০২৫ আবেদন ফর্ম',
      subtitle: 'জাতীয় যোগ্যতা ও প্রবেশিকা পরীক্ষা (স্নাতক) • NTA পোর্টাল',
      fraudWarning: 'ফর্ম নিশ্চিত করার নামে ₹২,০০০ চাওয়া কোচিং দালালরা প্রতারক। NTA কোনো এজেন্ট নিয়োগ করে না।',
    },
    mr: {
      title: 'NEET UG २०२५ अर्ज फॉर्म',
      subtitle: 'राष्ट्रीय पात्रता व प्रवेश परीक्षा (पदवी) • NTA पोर्टल',
      fraudWarning: 'अर्ज निश्चितीसाठी ₹२,००० मागणारे कोचिंग दलाल फसवणूक करत आहेत. NTA कोणत्याही एजंटला मान्यता देत नाही.',
    },
    te: {
      title: 'NEET UG 2025 దరఖాస్తు ఫారమ్',
      subtitle: 'జాతీయ అర్హత మరియు ప్రవేశ పరీక్ష (అండర్ గ్రాడ్యుయేట్) • NTA పోర్టల్',
      fraudWarning: 'ఫారమ్ నిర్ధారణ కోసం ₹2,000 అడిగే కోచింగ్ దళారులు మోసగాళ్లు. NTA ఏ ఏజెంట్‌ను నియమించదు.',
    },
    ta: {
      title: 'NEET UG 2025 விண்ணப்பப் படிவம்',
      subtitle: 'தேசிய தகுதி மற்றும் நுழைவுத் தேர்வு (இளங்கலை) • NTA தளம்',
      fraudWarning: 'உறுதிப்படுத்தப்பட்ட படிவம் என்று ₹2,000 கேட்கும் தரகர்கள் மோசடியாளர்கள். NTA எந்த முகவரையும் அங்கீகரிக்கவில்லை.',
    },
    gu: {
      title: 'NEET UG 2025 અરજી ફોર્મ',
      subtitle: 'રાષ્ટ્રીય પાત્રતા અને પ્રવેશ પરીક્ષા (સ્નાતક) • NTA પોર્ટલ',
      fraudWarning: 'ફોર્મ કન્ફર્મેશન માટે ₹2,000 માંગતા કોચિંગ દલાલો છેતરપિંડી કરે છે. NTA કોઈ એજન્ટને અધિકૃત કરતું નથી.',
    },
    kn: {
      title: 'NEET UG 2025 ಅರ್ಜಿ ನಮೂನೆ',
      subtitle: 'ರಾಷ್ಟ್ರೀಯ ಅರ್ಹತಾ ಮತ್ತು ಪ್ರವೇಶ ಪರೀಕ್ಷೆ (ಪದವಿ) • NTA ಪೋರ್ಟಲ್',
      fraudWarning: 'ಅರ್ಜಿ ಖಾತರಿಗಾಗಿ ₹2,000 ಕೇಳುವ ಕೋಚಿಂಗ್ ದಲ್ಲಾಳಿಗಳು ವಂಚಕರು. NTA ಯಾವುದೇ ಏಜೆಂಟ್‌ಗೆ ಅನುಮತಿ ನೀಡುವುದಿಲ್ಲ.',
    },
  },

  'driving-licence-renewal': {
    en: {
      title: 'Online Driving Licence Renewal',
      subtitle: 'MoRTH Sarathi Parivahan Contactless Service',
      fraudWarning: 'RTO middlemen charging ₹800–₹1,500 extra are illegal. Contactless service delivers renewed DL directly via Speed Post.',
    },
    hi: {
      title: 'ऑनलाइन ड्राइविंग लाइसेंस नवीनीकरण',
      subtitle: 'सड़क परिवहन मंत्रालय सारथी पोर्टल संपर्क रहित (Contactless) सेवा',
      fraudWarning: 'आरटीओ दलाल जो ₹800–₹1,500 अतिरिक्त मांगते हैं, वे गैरकानूनी हैं। आधार सत्यापन से नया लाइसेंस सीधा स्पीड पोस्ट से घर आता है।',
    },
    hinglish: {
      title: 'Online Driving Licence Renewal',
      subtitle: 'MoRTH Sarathi Parivahan Contactless Service',
      fraudWarning: 'RTO middlemen charging ₹800–₹1,500 extra are illegal. Contactless service delivers DL straight via Speed Post.',
    },
    bn: {
      title: 'অনলাইন ড্রাইভিং লাইসেন্স নবায়ন',
      subtitle: 'সড়ক পরিবহন মন্ত্রকের সারথী পরিবহন অনলাইন সেবা',
      fraudWarning: 'RTO দালালদের অতিরিক্ত ₹৮০০–₹১,৫০০ চাওয়া বেআইনি। কনট্যাক্টলেস সেবায় নতুন লাইসেন্স স্পিড পোস্টে সরাসরি বাড়িতে আসে।',
    },
    mr: {
      title: 'ऑनलाइन ड्रायव्हिंग लायसन्स नूतनीकरण',
      subtitle: 'रस्ते वाहतूक मंत्रालय सारथी परिवहन कॉन्टॅक्टलेस सेवा',
      fraudWarning: 'RTO दलालांनी अतिरिक्त ₹८००–₹१,५०० मागणे बेकायदेशीर आहे. कॉन्टॅक्टलेस सेवेद्वारे लायसन्स थेट स्पीड पोस्टने घरी येते.',
    },
    te: {
      title: 'ఆన్‌లైన్ డ్రైవింగ్ లైసెన్స్ రెన్యువల్',
      subtitle: 'సారథి పరివాహన్ కాంటాక్ట్‌లెస్ సేవ',
      fraudWarning: 'అదనంగా ₹800–₹1,500 వసూలు చేసే RTO దళారులు చట్టవిరుద్ధం. కాంటాక్ట్‌లెస్ సేవ ద్వారా కొత్త లైసెన్స్ స్పీడ్ పోస్ట్‌లో ఇంటికే వస్తుంది.',
    },
    ta: {
      title: 'ஆன்லைன் ஓட்டுநர் உரிமம் புதுப்பித்தல்',
      subtitle: 'சாரதி பரிவாஹன் தொடர்பற்ற ஆன்லைன் சேவை',
      fraudWarning: 'கூடுதலாக ₹800–₹1,500 கேட்கும் RTO தரகர்கள் சட்டவிரோதமானவர்கள். புதுப்பிக்கப்பட்ட உரிமம் ஸ்பீட் போஸ்ட் மூலம் நேரடியாக வீட்டிற்கு வரும்.',
    },
    gu: {
      title: 'ઓનલાઇન ડ્રાઇવિંગ લાયસન્સ રિન્યુઅલ',
      subtitle: 'સારથી પરિવહન કોન્ટેક્ટલેસ સેવા',
      fraudWarning: 'વધારાના ₹800–₹1,500 માંગતા RTO દલાલો ગેરકાયદેસર છે. કોન્ટેક્ટલેસ સેવા દ્વારા નવું લાયસન્સ સીધું સ્પીડ પોસ્ટથી ઘરે આવે છે.',
    },
    kn: {
      title: 'ಆನ್‌ಲೈನ್ ಡ್ರೈವಿಂಗ್ ಲೈಸೆನ್ಸ್ ನವೀಕರಣ',
      subtitle: 'ಸಾರಥಿ ಪರಿವಾಹನ್ ಸಂಪರ್ಕರಹಿತ ಸೇವೆ',
      fraudWarning: 'ಹೆಚ್ಚುವರಿ ₹800–₹1,500 ಕೇಳುವ RTO ದಲ್ಲಾಳಿಗಳು ಕಾನೂನುಬಾಹಿರ. ಸಂಪರ್ಕರಹಿತ ಸೇವೆಯ ಮೂಲಕ ಲೈಸೆನ್ಸ್ ನೇರವಾಗಿ ಸ್ಪೀಡ್ ಪೋಸ್ಟ್‌ನಲ್ಲಿ ಬರುತ್ತದೆ.',
    },
  },

  'aadhaar-mobile-update': {
    en: {
      title: 'Aadhaar Mobile Number Update',
      subtitle: 'UIDAI myAadhaar Portal & Authorized Centre Appointment',
      fraudWarning: 'Kiosks asking ₹200–₹500 for mobile updates are breaking the law. UIDAI fixed statutory fee is strictly ₹50.',
    },
    hi: {
      title: 'आधार में मोबाइल नंबर अपडेट',
      subtitle: 'यूआईडीएआई (UIDAI) माय-आधार पोर्टल व अधिकृत केंद्र अपॉइंटमेंट',
      fraudWarning: 'जो कियोस्क मोबाइल अपडेट के लिए ₹200–₹500 मांगते हैं, वे कानून तोड़ रहे हैं। UIDAI का आधिकारिक शुल्क केवल ₹50 है।',
    },
    hinglish: {
      title: 'Aadhaar Mobile Number Update',
      subtitle: 'UIDAI myAadhaar Portal & Authorized Kendra Appointment',
      fraudWarning: 'Kiosks asking ₹200–₹500 for mobile update are breaking the law. UIDAI fixed statutory biometric fee is strictly ₹50.',
    },
    bn: {
      title: 'আধার মোবাইল নম্বর আপডেট',
      subtitle: 'UIDAI myAadhaar পোর্টাল ও অনুমোদিত কেন্দ্রের অ্যাপয়েন্টমেন্ট',
      fraudWarning: 'মোবাইল আপডেটের জন্য ₹২০০–₹৫০০ চাওয়া বেআইনি। UIDAI নির্ধারিত সরকারি ফি মাত্র ₹৫০।',
    },
    mr: {
      title: 'आधार मोबाईल नंबर अपडेट',
      subtitle: 'UIDAI myAadhaar पोर्टल व अधिकृत केंद्र अपॉइंटमेंट',
      fraudWarning: 'मोबाईल अपडेटसाठी ₹२००–₹५०० मागणारे केंद्रे कायद्याचे उल्लंघन करत आहेत. UIDAI चे अधिकृत शुल्क फक्त ₹५० आहे.',
    },
    te: {
      title: 'ఆధార్ మొబైల్ నంబర్ అప్‌డేట్',
      subtitle: 'UIDAI myAadhaar పోర్టల్ & అధీకృత కేంద్రం అపాయింట్‌మెంట్',
      fraudWarning: 'మొబైల్ అప్‌డేట్ కోసం ₹200–₹500 అడిగే కియోస్క్‌లు చట్టాన్ని ఉల్లంఘిస్తున్నాయి. UIDAI అధికారిక రుసుము కేవలం ₹50 మాత్రమే.',
    },
    ta: {
      title: 'ஆதார் மொபைல் எண் புதுப்பிப்பு',
      subtitle: 'UIDAI myAadhaar தளம் & அங்கீகரிக்கப்பட்ட மைய முன்பதிவு',
      fraudWarning: 'மொபைல் எண் மாற்ற ₹200–₹500 கேட்பது சட்டவிரோதம். UIDAI நிர்ணயித்த அரசு கட்டணம் ₹50 மட்டுமே.',
    },
    gu: {
      title: 'આધાર મોબાઇલ નંબર અપડેટ',
      subtitle: 'UIDAI myAadhaar પોર્ટલ અને અધિકૃત કેન્દ્ર એપોઇન્ટમેન્ટ',
      fraudWarning: 'મોબાઇલ અપડેટ માટે ₹200–₹500 માંગવું ગેરકાયદેસર છે. UIDAI ની નિર્ધારિત સરકારી ફી માત્ર ₹50 છે.',
    },
    kn: {
      title: 'ಆಧಾರ್ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ಅಪ್‌ಡೇಟ್',
      subtitle: 'UIDAI myAadhaar ಪೋರ್ಟಲ್ ಮತ್ತು ಅಧಿಕೃತ ಕೇಂದ್ರದ ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್',
      fraudWarning: 'ಮೊಬೈಲ್ ಅಪ್‌ಡೇಟ್‌ಗೆ ₹200–₹500 ಕೇಳುವುದು ಕಾನೂನುಬಾಹಿರ. UIDAI ನಿಗದಿತ ಶುಲ್ಕ ಕೇವಲ ₹50 ಮಾತ್ರ.',
    },
  },

  'gazette-notification': {
    en: {
      title: 'Gazette Notification for Name Change',
      subtitle: 'Department of Publication (Civil Lines Delhi) & Bharatkosh Portal',
      fraudWarning: 'Agents charging ₹5,000–₹15,000 exploit citizens. Direct non-tatkaal publication fee on Bharatkosh is strictly ₹1,100.',
    },
    hi: {
      title: 'नाम परिवर्तन हेतु भारत का राजपत्र (Gazette)',
      subtitle: 'प्रकाशन विभाग (सिविल लाइन्स दिल्ली) एवं भारतकोश पोर्टल',
      fraudWarning: 'एजेंट नाम बदलने के लिए ₹5,000–₹15,000 ठगते हैं। भारतकोश पोर्टल पर आधिकारिक सरकारी प्रकाशन शुल्क मात्र ₹1,100 है।',
    },
    hinglish: {
      title: 'Gazette Notification for Name Change',
      subtitle: 'Department of Publication (Civil Lines Delhi) & Bharatkosh Portal',
      fraudWarning: 'Agents charging ₹5,000–₹15,000 exploit citizens. Direct non-tatkaal publication fee on Bharatkosh is strictly ₹1,100.',
    },
    bn: {
      title: 'নাম পরিবর্তনের জন্য গেজেট বিজ্ঞপ্তি',
      subtitle: 'প্রকাশনা বিভাগ (দিল্লি) ও ভারতকোষ পোর্টাল',
      fraudWarning: 'এজেন্টরা ₹৫,০০০–₹১৫,০০০ চার্জ করে প্রতারণা করে। ভারতকোষ পোর্টালে সরকারি প্রকাশনা ফি মাত্র ₹১,১০০।',
    },
    mr: {
      title: 'नाव बदलासाठी राजपत्र (Gazette) अधिसूचना',
      subtitle: 'प्रकाशन विभाग (सिव्हिल लाईन्स दिल्ली) व भारतकोश पोर्टल',
      fraudWarning: 'एजंट ₹५,०००–₹१५,००० आकारून फसवणूक करतात. भारतकोशवर थेट सरकारी शुल्क फक्त ₹१,१०० आहे.',
    },
    te: {
      title: 'పేరు మార్పు కోసం గెజిట్ నోటిఫికేషన్',
      subtitle: 'ప్రచురణ విభాగం (ఢిల్లీ) & భారత్‌కోష్ పోర్టల్',
      fraudWarning: 'ఏజెంట్లు ₹5,000–₹15,000 వసూలు చేసి మోసం చేస్తారు. భారత్‌కోష్‌లో అధికారిక ప్రచురణ రుసుము కేవలం ₹1,100 మాత్రమే.',
    },
    ta: {
      title: 'பெயர் மாற்றத்திற்கான அரசிதழ் (Gazette) அறிவிப்பு',
      subtitle: 'வெளியீட்டுத் துறை (டெல்லி) & பாரத்கோஷ் தளம்',
      fraudWarning: 'முகவர்கள் ₹5,000–₹15,000 வசூலித்து ஏமாற்றுகிறார்கள். பாரத்கோஷில் நேரடி அரசு கட்டணம் ₹1,100 மட்டுமே.',
    },
    gu: {
      title: 'નામ બદલવા માટે ગેઝેટ નોટિફિકેશન',
      subtitle: 'પ્રકાશન વિભાગ (દિલ્હી) અને ભારતકોષ પોર્ટલ',
      fraudWarning: 'એજન્ટો ₹5,000–₹15,000 વસૂલીને છેતરપિંડી કરે છે. ભારતકોષ પર સીધી સરકારી ફી માત્ર ₹1,100 છે.',
    },
    kn: {
      title: 'ಹೆಸರು ಬದಲಾವಣೆಗಾಗಿ ಗೆಜೆಟ್ ಅಧಿಸೂಚನೆ',
      subtitle: 'ಪ್ರಕಟಣೆ ಇಲಾಖೆ (ದೆಹಲಿ) ಮತ್ತು ಭಾರತ್‌ಕೋಶ್ ಪೋರ್ಟಲ್',
      fraudWarning: 'ಏಜೆಂಟರು ₹5,000–₹15,000 ವಸೂಲಿ ಮಾಡಿ ವಂಚಿಸುತ್ತಾರೆ. ಭಾರತ್‌ಕೋಶ್‌ನಲ್ಲಿ ಅಧಿಕೃತ ಶುಲ್ಕ ಕೇವಲ ₹1,100 ಮಾತ್ರ.',
    },
  },

  'fresh-aadhaar-enrolment': {
    en: {
      title: 'Fresh Aadhaar Enrolment',
      subtitle: 'UIDAI & ISRO Bhuvan Aadhaar Kendra Directory',
      fraudWarning: 'Operators demanding money for fresh enrolment are committing a crime. Fresh enrolment is 100% FREE by Government of India.',
    },
    hi: {
      title: 'नया आधार कार्ड नामांकन (Enrolment)',
      subtitle: 'यूआईडीएआई और इसरो भुवन आधार केंद्र निर्देशिका',
      fraudWarning: 'नया आधार बनाने के लिए पैसे मांगने वाले ऑपरेटर अपराध कर रहे हैं। भारत सरकार द्वारा नया आधार नामांकन 100% मुफ़्त है।',
    },
    hinglish: {
      title: 'Fresh Aadhaar Enrolment',
      subtitle: 'UIDAI & ISRO Bhuvan Aadhaar Kendra Directory',
      fraudWarning: 'Operators demanding money for fresh enrolment are committing a crime. Fresh enrolment is 100% FREE by Government of India.',
    },
    bn: {
      title: 'নতুন আধার কার্ড নথিভুক্তিকরণ',
      subtitle: 'UIDAI ও ISRO ভুবন আধার কেন্দ্র নির্দেশিকা',
      fraudWarning: 'নতুন আধার তৈরির জন্য টাকা চাওয়া অপরাধ। ভারত সরকারের নিয়মে নতুন আধার সম্পূর্ণ বিনামূল্যে তৈরি হয়।',
    },
    mr: {
      title: 'नवीन आधार कार्ड नोंदणी',
      subtitle: 'UIDAI व ISRO भुवन आधार केंद्र निर्देशिका',
      fraudWarning: 'नवीन आधारसाठी पैसे मागणे हा गुन्हा आहे. भारत सरकारकडून नवीन आधार नोंदणी १००% मोफत आहे.',
    },
    te: {
      title: 'కొత్త ఆధార్ నమోదు (Enrolment)',
      subtitle: 'UIDAI & ISRO భువన్ ఆధార్ కేంద్రాల డైరెక్టరీ',
      fraudWarning: 'కొత్త ఆధార్ నమోదుకు డబ్బులు అడగడం నేరం. భారత ప్రభుత్వం ద్వారా కొత్త ఆధార్ నమోదు 100% ఉచితం.',
    },
    ta: {
      title: 'புதிய ஆதார் பதிவு',
      subtitle: 'UIDAI & ISRO புவன் ஆதார் மைய அடைவு',
      fraudWarning: 'புதிய ஆதாருக்கு பணம் கேட்பது குற்றம். இந்திய அரசின் புதிய ஆதார் பதிவு 100% இலவசம்.',
    },
    gu: {
      title: 'નવું આધાર કાર્ડ નોંધણી',
      subtitle: 'UIDAI અને ISRO ભુવન આધાર કેન્દ્ર ડિરેક્ટરી',
      fraudWarning: 'નવા આધાર માટે પૈસા માંગવા એ ગુનો છે. ભારત સરકાર દ્વારા નવી આધાર નોંધણી 100% મફત છે.',
    },
    kn: {
      title: 'ಹೊಸ ಆಧಾರ್ ನೋಂದಣಿ',
      subtitle: 'UIDAI ಮತ್ತು ISRO ಭುವನ್ ಆಧಾರ್ ಕೇಂದ್ರ ಡೈರೆಕ್ಟರಿ',
      fraudWarning: 'ಹೊಸ ಆಧಾರ್ ನೋಂದಣಿಗೆ ಹಣ ಕೇಳುವುದು ಅಪರಾಧ. ಭಾರತ ಸರ್ಕಾರದಿಂದ ಹೊಸ ಆಧಾರ್ ನೋಂದಣಿ 100% ಉಚಿತ.',
    },
  },

  'tatkaal-passport': {
    en: {
      title: 'Fresh Passport / Tatkaal Application',
      subtitle: 'Ministry of External Affairs (MEA) Passport Seva Portal',
      fraudWarning: 'Fake passport portals siphon money. Only apply on passportindia.gov.in. Never pay cash to touts outside PSK.',
    },
    hi: {
      title: 'नया पासपोर्ट / तत्काल आवेदन',
      subtitle: 'विदेश मंत्रालय (MEA) पासपोर्ट सेवा पोर्टल',
      fraudWarning: 'नकली पासपोर्ट एजेंट हजारों रुपये ठगते हैं। हमेशा आधिकारिक passportindia.gov.in पर ही आवेदन करें। कभी किसी को नकद न दें।',
    },
    hinglish: {
      title: 'Fresh Passport / Tatkaal Application',
      subtitle: 'Ministry of External Affairs (MEA) Passport Seva Portal',
      fraudWarning: 'Fake "passport assistance" portals siphon money. Only apply on passportindia.gov.in. Never pay cash to touts outside PSK.',
    },
    bn: {
      title: 'নতুন পাসপোর্ট / তৎকাল আবেদন',
      subtitle: 'বিদেশ মন্ত্রক (MEA) পাসপোর্ট সেবা পোর্টাল',
      fraudWarning: 'ভুয়া পাসপোর্ট পোর্টাল টাকা হাতিয়ে নেয়। শুধুমাত্র passportindia.gov.in-এ আবেদন করুন। দালালদের নগদ টাকা দেবেন না।',
    },
    mr: {
      title: 'नवीन पासपोर्ट / तत्काळ अर्ज',
      subtitle: 'परराष्ट्र मंत्रालय (MEA) पासपोर्ट सेवा पोर्टल',
      fraudWarning: 'बनावट पासपोर्ट वेबसाईट्सपासून सावध राहा. फक्त passportindia.gov.in वरच अर्ज करा व दलालांना रोख पैसे देऊ नका.',
    },
    te: {
      title: 'కొత్త పాస్‌పోర్ట్ / తత్కాల్ దరఖాస్తు',
      subtitle: 'విదేశాంగ మంత్రిత్వ శాఖ (MEA) పాస్‌పోర్ట్ సేవా పోర్టల్',
      fraudWarning: 'నకిలీ పాస్‌పోర్ట్ వెబ్‌సైట్లు డబ్బులు దోచుకుంటాయి. passportindia.gov.in లో మాత్రమే దరఖాస్తు చేయండి.',
    },
    ta: {
      title: 'புதிய பாஸ்போர்ட் / தட்கால் விண்ணப்பம்',
      subtitle: 'வெளியுறவு அமைச்சகம் (MEA) பாஸ்போர்ட் சேவா தளம்',
      fraudWarning: 'போலி பாஸ்போர்ட் தளங்களை நம்பாதீர்கள். passportindia.gov.in தளத்தில் மட்டுமே விண்ணப்பிக்கவும்.',
    },
    gu: {
      title: 'નવો પાસપોર્ટ / તત્કાળ અરજી',
      subtitle: 'વિદેશ મંત્રાલય (MEA) પાસપોર્ટ સેવા પોર્ટલ',
      fraudWarning: 'નકલી પાસપોર્ટ પોર્ટલથી સાવધ રહો. ફક્ત passportindia.gov.in પર જ અરજી કરો અને દલાલોને રોકડ ન આપો.',
    },
    kn: {
      title: 'ಹೊಸ ಪಾಸ್‌ಪೋರ್ಟ್ / ತತ್ಕಾಲ್ ಅರ್ಜಿ',
      subtitle: 'ವಿದೇಶಾಂಗ ಸಚಿವಾಲಯ (MEA) ಪಾಸ್‌ಪೋರ್ಟ್ ಸೇವಾ ಪೋರ್ಟಲ್',
      fraudWarning: 'ನಕಲಿ ಪಾಸ್‌ಪೋರ್ಟ್ ಪೋರ್ಟಲ್‌ಗಳಿಂದ ಎಚ್ಚರವಾಗಿರಿ. passportindia.gov.in ನಲ್ಲಿ ಮಾತ್ರ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ.',
    },
  },

  'cpgrams-grievance': {
    en: {
      title: 'CPGRAMS Central Citizen Grievance',
      subtitle: 'DARPG Public Grievances Portal (Government of India)',
      fraudWarning: 'Lodge grievances directly on pgportal.gov.in for free. Never pay touts or lawyers to lodge public grievances.',
    },
    hi: {
      title: 'सीपीजीआरएएमएस (CPGRAMS) केंद्रीय जन शिकायत',
      subtitle: 'प्रशासनिक सुधार और लोक शिकायत विभाग पोर्टल (भारत सरकार)',
      fraudWarning: 'pgportal.gov.in पर सीधे मुफ़्त में शिकायत दर्ज करें। कभी किसी दलाल या वकील को जन शिकायत दर्ज करने के पैसे न दें।',
    },
    hinglish: {
      title: 'CPGRAMS Central Citizen Grievance',
      subtitle: 'DARPG Public Grievances Portal (Government of India)',
      fraudWarning: 'Lodge grievances directly on pgportal.gov.in for free. Never pay lawyers or cyber cafe touts to lodge RTI or grievance.',
    },
    bn: {
      title: 'CPGRAMS কেন্দ্রীয় নাগরিক অভিযোগ',
      subtitle: 'ভারত সরকারের জনঅভিযোগ পোর্টাল (DARPG)',
      fraudWarning: 'pgportal.gov.in-এ সরাসরি বিনামূল্যে অভিযোগ জানান। এর জন্য কোনো দালাল বা উকিলকে টাকা দেবেন না।',
    },
    mr: {
      title: 'CPGRAMS केंद्रीय नागरी तक्रार निवारण',
      subtitle: 'प्रशासनिक सुधारणा व लोक तक्रार विभाग (भारत सरकार)',
      fraudWarning: 'pgportal.gov.in वर थेट मोफत तक्रार नोंदवा. यासाठी दलाल किंवा वकिलांना पैसे देऊ नका.',
    },
    te: {
      title: 'CPGRAMS కేంద్ర పౌర ఫిర్యాదుల పోర్టల్',
      subtitle: 'DARPG ప్రజా ఫిర్యాదుల పోర్టల్ (భారత ప్రభుత్వం)',
      fraudWarning: 'pgportal.gov.in లో నేరుగా ఉచితంగా ఫిర్యాదు నమోదు చేయండి. దళారులకు డబ్బులు చెల్లించవద్దు.',
    },
    ta: {
      title: 'CPGRAMS மத்திய பொதுமக்கள் புகார் தளம்',
      subtitle: 'DARPG பொதுமக்கள் குறைதீர்ப்பு தளம் (இந்திய அரசு)',
      fraudWarning: 'pgportal.gov.in தளத்தில் நேரடியாக இலவசமாகப் புகார் அளிக்கலாம். தரகர்களுக்குப் பணம் கொடுக்க வேண்டாம்.',
    },
    gu: {
      title: 'CPGRAMS કેન્દ્રીય નાગરિક ફરિયાદ',
      subtitle: 'DARPG જાહેર ફરિયાદ પોર્ટલ (ભારત સરકાર)',
      fraudWarning: 'pgportal.gov.in પર સીધી મફતમાં ફરિયાદ નોંધાવો. ફરિયાદ માટે કોઈ દલાલને પૈસા આપશો નહીં.',
    },
    kn: {
      title: 'CPGRAMS ಕೇಂದ್ರ ನಾಗರಿಕ ದೂರು ಪೋರ್ಟಲ್',
      subtitle: 'DARPG ಸಾರ್ವಜನಿಕ ದೂರುಗಳ ಪೋರ್ಟಲ್ (ಭಾರತ ಸರ್ಕಾರ)',
      fraudWarning: 'pgportal.gov.in ನಲ್ಲಿ ನೇರವಾಗಿ ಉಚಿತವಾಗಿ ದೂರು ದಾಖಲಿಸಿ. ದಲ್ಲಾಳಿಗಳಿಗೆ ಹಣ ಪಾವತಿಸಬೇಡಿ.',
    },
  },

  'anti-corruption-delayed-service': {
    en: {
      title: 'Reporting Bribe Demands & Service Delays',
      subtitle: 'Central Vigilance Commission (CVC) & State Anti-Corruption Bureau',
      fraudWarning: 'Never pay bribes under "speed money" threats. Citizen Charters guarantee statutory delivery timelines with strict penalties.',
    },
    hi: {
      title: 'रिश्वत मांग व कार्य में देरी की शिकायत',
      subtitle: 'केंद्रीय सतर्कता आयोग (CVC) एवं राज्य भ्रष्टाचार निरोधक ब्यूरो',
      fraudWarning: 'काम जल्दी कराने के नाम पर कभी रिश्वत न दें। सिटीजन चार्टर के तहत तय समय में काम न करने वाले अधिकारियों पर जुर्माना होता है।',
    },
    hinglish: {
      title: 'Reporting Bribe Demands & Service Delays',
      subtitle: 'Central Vigilance Commission (CVC) & State Anti-Corruption Bureau',
      fraudWarning: 'Never pay bribes under "speed money" threats. Citizen Charters guarantee statutory delivery timelines with strict penalties.',
    },
    bn: {
      title: 'ঘুষ দাবি ও কাজে বিলম্বের অভিযোগ',
      subtitle: 'কেন্দ্রীয় ভিজিল্যান্স কমিশন (CVC) ও দুর্নীতি দমন শাখা',
      fraudWarning: 'কাজ দ্রুত করানোর নামে কখনোই ঘুষ দেবেন না। সিটিজেন চার্টার অনুযায়ী নির্দিষ্ট সময়ে সেবা দেওয়া বাধ্যতামূলক।',
    },
    mr: {
      title: 'लाचखोरी व कामातील विलंबाविरोधात तक्रार',
      subtitle: 'केंद्रीय दक्षता आयोग (CVC) व लाचलुचपत प्रतिबंधक विभाग',
      fraudWarning: 'काम लवकर होण्यासाठी कधीही लाच देऊ नका. नागरिकांच्या सनदेनुसार वेळेत सेवा देणे बंधनकारक आहे.',
    },
    te: {
      title: 'లంచం డిమాండ్ & సేవల జాప్యంపై ఫిర్యాదు',
      subtitle: 'సెంట్రల్ విజిలెన్స్ కమిషన్ (CVC) & అవినీతి నిరోధక శాఖ',
      fraudWarning: 'పని త్వరగా జరగడానికి ఎప్పుడూ లంచం ఇవ్వవద్దు. సిటిజన్ చార్టర్ ప్రకారం నిర్ణీత గడువులో సేవలు అందాలి.',
    },
    ta: {
      title: 'லஞ்சம் மற்றும் சேவை தாமதப் புகார்',
      subtitle: 'மத்திய ஊழல் கண்காணிப்பு ஆணையம் (CVC) & ஊழல் தடுப்புப் பிரிவு',
      fraudWarning: 'வேலை விரைவாக முடிய ஒருபோதும் லஞ்சம் கொடுக்க வேண்டாம். குடிமக்கள் சாசனம் கால வரம்பை உறுதி செய்கிறது.',
    },
    gu: {
      title: 'લાંચની માંગણી અને કામમાં વિલંબની ફરિયાદ',
      subtitle: 'સેન્ટ્રલ વિજિલન્સ કમિશન (CVC) અને લાંચ રૂશ્વત વિરોધી બ્યુરો',
      fraudWarning: 'કામ જલ્દી કરાવવા ક્યારેય લાંચ આપશો નહીં. સિટીઝન ચાર્ટર મુજબ સમયસર સેવા મળવી એ તમારો અધિકાર છે.',
    },
    kn: {
      title: 'ಲಂಚದ ಬೇಡಿಕೆ ಮತ್ತು ಸೇವಾ ವಿಳಂಬದ ದೂರು',
      subtitle: 'ಕೇಂದ್ರ ವಿಜಿಲೆನ್ಸ್ ಆಯೋಗ (CVC) ಮತ್ತು ಭ್ರಷ್ಟಾಚಾರ ನಿಗ್ರಹ ದಳ',
      fraudWarning: 'ಕೆಲಸ ಬೇಗ ಆಗಲು ಎಂದಿಗೂ ಲಂಚ ನೀಡಬೇಡಿ. ನಾಗರಿಕ ಸನ್ನದು ನಿಗದಿತ ಕಾಲಮಿತಿಯನ್ನು ಖಾತರಿಪಡಿಸುತ್ತದೆ.',
    },
  },

  'oci-citizenship': {
    en: {
      title: 'Overseas Citizen of India (OCI) Card',
      subtitle: 'Ministry of Home Affairs (MHA) Foreigners Division Portal',
      fraudWarning: 'Visa agencies charge $300–$800 for basic form filling. Direct MHA fee is fixed at ₹15,000 / $275.',
    },
    hi: {
      title: 'प्रवासी भारतीय नागरिक (OCI) कार्ड आवेदन',
      subtitle: 'गृह मंत्रालय (MHA) विदेशी प्रभाग पोर्टल',
      fraudWarning: 'वीजा कंसल्टेंट सामान्य फॉर्म भरने के ₹25,000–₹60,000 ऐंठते हैं। गृह मंत्रालय का आधिकारिक शुल्क मात्र ₹15,000 ($275) है।',
    },
    hinglish: {
      title: 'Overseas Citizen of India (OCI) Card',
      subtitle: 'Ministry of Home Affairs (MHA) Foreigners Division Portal',
      fraudWarning: 'Immigration visa consultancies charge $300–$800 for basic form filling. Direct MHA fee is fixed at ₹15,000 / $275.',
    },
    bn: {
      title: 'প্রবাসী ভারতীয় নাগরিক (OCI) কার্ড আবেদন',
      subtitle: 'স্বরাষ্ট্র মন্ত্রক (MHA) ফরেনার্স ডিভিশন পোর্টাল',
      fraudWarning: 'ভিসা এজেন্সিগুলো ফর্ম পূরণের জন্য বিপুল টাকা নেয়। সরাসরি MHA সরকারি ফি নির্ধারিত ₹১৫,০০০ ($২৭৫)।',
    },
    mr: {
      title: 'परदेशी भारतीय नागरिक (OCI) कार्ड अर्ज',
      subtitle: 'गृह मंत्रालय (MHA) परदेशी विभाग पोर्टल',
      fraudWarning: 'व्हिसा एजन्सीज फॉर्म भरण्यासाठी मोठी रक्कम घेतात. MHA चे अधिकृत शुल्क ₹१५,००० ($२७५) निश्चित आहे.',
    },
    te: {
      title: 'ఓవర్సీస్ సిటిజన్ ఆఫ్ ఇండియా (OCI) కార్డ్',
      subtitle: 'హోం వ్యవహారాల మంత్రిత్వ శాఖ (MHA) పోర్టల్',
      fraudWarning: 'వీసా ఏజెన్సీలు ఫారమ్ నింపడానికి భారీగా వసూలు చేస్తాయి. MHA అధికారిక రుసుము ₹15,000 / $275 మాత్రమే.',
    },
    ta: {
      title: 'வெளிநாடு வாழ் இந்தியக் குடிமகன் (OCI) அட்டை',
      subtitle: 'உள்துறை அமைச்சகம் (MHA) வெளிநாட்டினர் பிரிவு தளம்',
      fraudWarning: 'விசா முகமைகள் அதிக கட்டணம் வசூலிக்கின்றன. நேரடி MHA அரசு கட்டணம் ₹15,000 / $275 மட்டுமே.',
    },
    gu: {
      title: 'ઓવરસીઝ સિટીઝન ઓફ ઇન્ડિયા (OCI) કાર્ડ',
      subtitle: 'ગૃહ મંત્રાલય (MHA) ફોરેનર્સ ડિવિઝન પોર્ટલ',
      fraudWarning: 'વિઝા એજન્સીઓ ફોર્મ ભરવા મોટી ફી લે છે. સીધી MHA સરકારી ફી ₹15,000 / $275 નક્કી છે.',
    },
    kn: {
      title: 'ಸಾಗರೋತ್ತರ ಭಾರತೀಯ ನಾಗರಿಕ (OCI) ಕಾರ್ಡ್',
      subtitle: 'ಗೃಹ ಸಚಿವಾಲಯ (MHA) ವಿದೇಶಿಯರ ವಿಭಾಗ ಪೋರ್ಟಲ್',
      fraudWarning: 'ವೀಸಾ ಏಜೆನ್ಸಿಗಳು ಅರ್ಜಿ ಭರ್ತಿಗೆ ಭಾರಿ ಶುಲ್ಕ ವಿಧಿಸುತ್ತವೆ. ನೇರ MHA ಶುಲ್ಕ ₹15,000 / $275 ಮಾತ್ರ.',
    },
  },

  'delhi-land-records': {
    en: {
      title: 'Delhi Land Records (Khasra & Khatauni)',
      subtitle: 'Revenue Department (DLRC) • Government of NCT of Delhi',
      fraudWarning: 'Tehsil touts charging ₹500–₹1,500 to pull ROR records are cheating you. Viewing DLRC land records is completely FREE.',
    },
    hi: {
      title: 'दिल्ली भूमि रिकॉर्ड (खसरा एवं खतौनी नकल)',
      subtitle: 'राजस्व विभाग (DLRC) • राष्ट्रीय राजधानी क्षेत्र दिल्ली सरकार',
      fraudWarning: 'तहसील दलाल रिकॉर्ड निकालने के ₹500–₹1,500 ऐंठते हैं। DLRC पोर्टल पर जमीन का रिकॉर्ड देखना 100% मुफ़्त है।',
    },
    hinglish: {
      title: 'Delhi Land Records (Khasra & Khatauni)',
      subtitle: 'Revenue Department (DLRC) • Government of NCT of Delhi',
      fraudWarning: 'Tehsil touts charging ₹500–₹1,500 to pull ROR records are cheating you. Viewing DLRC land records is completely FREE.',
    },
    bn: {
      title: 'দিল্লি জমির রেকর্ড (খসরা ও খতিয়ান)',
      subtitle: 'রাজস্ব বিভাগ (DLRC) • দিল্লি সরকার',
      fraudWarning: 'দালালরা জমির নথির জন্য ₹৫০০–₹১,৫০০ নেয়। DLRC পোর্টালে জমির রেকর্ড দেখা সম্পূর্ণ বিনামূল্যে।',
    },
    mr: {
      title: 'दिल्ली जमीन नोंद (खसरा व खतौनी)',
      subtitle: 'महसूल विभाग (DLRC) • दिल्ली सरकार',
      fraudWarning: 'तहसील दलाल नोंदी काढण्यासाठी ₹५००–₹१,५०० घेतात. DLRC पोर्टलवर जमीन नोंद पाहणे पूर्णपणे मोफत आहे.',
    },
    te: {
      title: 'ఢిల్లీ భూమి రికార్డులు (ఖస్రా & ఖతౌనీ)',
      subtitle: 'రెవెన్యూ విభాగం (DLRC) • ఢిల్లీ ప్రభుత్వం',
      fraudWarning: 'రికార్డుల కోసం ₹500–₹1,500 అడిగే దళారులు మోసం చేస్తున్నారు. DLRCలో భూమి రికార్డులు చూడటం పూర్తిగా ఉచితం.',
    },
    ta: {
      title: 'டெல்லி நில ஆவணங்கள் (கஸ்ரா & கதௌனி)',
      subtitle: 'வருவாய்த் துறை (DLRC) • டெல்லி அரசு',
      fraudWarning: 'நில ஆவணங்களுக்கு ₹500–₹1,500 கேட்கும் தரகர்களை நம்பாதீர்கள். DLRC தளத்தில் பார்ப்பது முற்றிலும் இலவசம்.',
    },
    gu: {
      title: 'દિલ્હી જમીન રેકોર્ડ (ખસરા અને ખતૌની)',
      subtitle: 'મહેસૂલ વિભાગ (DLRC) • દિલ્હી સરકાર',
      fraudWarning: 'રેકોર્ડ કાઢવા ₹500–₹1,500 લેતા દલાલો છેતરપિંડી કરે છે. DLRC પોર્ટલ પર જમીન રેકોર્ડ જોવા સંપૂર્ણ મફત છે.',
    },
    kn: {
      title: 'ದೆಹಲಿ ಭೂ ದಾಖಲೆಗಳು (ಖಸ್ರಾ ಮತ್ತು ಖತೌನಿ)',
      subtitle: 'ಕಂದಾಯ ಇಲಾಖೆ (DLRC) • ದೆಹಲಿ ಸರ್ಕಾರ',
      fraudWarning: 'ದಾಖಲೆ ತೆಗೆಯಲು ₹500–₹1,500 ಕೇಳುವ ದಲ್ಲಾಳಿಗಳು ವಂಚಕರು. DLRC ನಲ್ಲಿ ಭೂ ದಾಖಲೆ ನೋಡುವುದು ಸಂಪೂರ್ಣ ಉಚಿತ.',
    },
  },

  'delhi-domicile': {
    en: {
      title: 'Delhi Domicile Certificate',
      subtitle: 'e-District Delhi Portal (Revenue Department NCT of Delhi)',
      fraudWarning: 'Cyber cafes charging ₹500–₹1,500 are cheating citizens. e-District Delhi statutory fee is ₹0.',
    },
    hi: {
      title: 'दिल्ली मूल निवास प्रमाण पत्र (Domicile)',
      subtitle: 'ई-डिस्ट्रिक्ट दिल्ली पोर्टल (राजस्व विभाग, दिल्ली सरकार)',
      fraudWarning: 'साइबर कैफे मूल निवास के ₹500–₹1,500 वसूलते हैं। ई-डिस्ट्रिक्ट पोर्टल पर यह प्रमाण पत्र 100% मुफ़्त बनता है।',
    },
    hinglish: {
      title: 'Delhi Domicile Certificate',
      subtitle: 'e-District Delhi Portal (Revenue Department NCT of Delhi)',
      fraudWarning: 'Cyber cafes charging ₹500–₹1,500 are cheating citizens. e-District Delhi statutory fee is ₹0.',
    },
    bn: {
      title: 'দিল্লি স্থায়ী বাসিন্দা সনদ (Domicile)',
      subtitle: 'ই-ডিস্ট্রিক্ট দিল্লি পোর্টাল (রাজস্ব বিভাগ)',
      fraudWarning: 'সাইবার ক্যাফে ₹৫০০–₹১,৫০০ নিয়ে প্রতারণা করে। ই-ডিস্ট্রিক্ট দিল্লিতে সরকারি ফি ₹০।',
    },
    mr: {
      title: 'दिल्ली अधिवास प्रमाणपत्र (Domicile)',
      subtitle: 'ई-डिस्ट्रिक्ट दिल्ली पोर्टल (महसूल विभाग)',
      fraudWarning: 'सायबर कॅफे ₹५००–₹१,५०० आकारून फसवणूक करतात. ई-डिस्ट्रिक्ट दिल्लीचे अधिकृत शुल्क ₹० आहे.',
    },
    te: {
      title: 'ఢిల్లీ నివాస ధృవీకరణ పత్రం (Domicile)',
      subtitle: 'ఈ-డిస్ట్రిక్ట్ ఢిల్లీ పోర్టల్ (రెవెన్యూ విభాగం)',
      fraudWarning: '₹500–₹1,500 వసూలు చేసే సైబర్ కేఫ్‌లు మోసం చేస్తున్నాయి. ఈ-డిస్ట్రిక్ట్ ఢిల్లీ ప్రభుత్వ రుసుము ₹0.',
    },
    ta: {
      title: 'டெல்லி இருப்பிடச் சான்றிதழ் (Domicile)',
      subtitle: 'இ-டிஸ்ட்ரிக்ட் டெல்லி தளம் (வருவாய்த் துறை)',
      fraudWarning: '₹500–₹1,500 வசூலிக்கும் சைபர் கஃபேக்கள் ஏமாற்றுகின்றன. இ-டிஸ்ட்ரிக்ட் டெல்லி அரசு கட்டணம் ₹0.',
    },
    gu: {
      title: 'દિલ્હી ડોમિસાઇલ (રહેઠાણ) પ્રમાણપત્ર',
      subtitle: 'ઈ-ડિસ્ટ્રિક્ટ દિલ્હી પોર્ટલ (મહેસૂલ વિભાગ)',
      fraudWarning: '₹500–₹1,500 લેતા સાયબર કાફે છેતરપિંડી કરે છે. ઈ-ડિસ્ટ્રિક્ટ દિલ્હીમાં સરકારી ફી ₹0 છે.',
    },
    kn: {
      title: 'ದೆಹಲಿ ವಾಸಸ್ಥಳ ಪ್ರಮಾಣಪತ್ರ (Domicile)',
      subtitle: 'ಇ-ಡಿಸ್ಟ್ರಿಕ್ಟ್ ದೆಹಲಿ ಪೋರ್ಟಲ್ (ಕಂದಾಯ ಇಲಾಖೆ)',
      fraudWarning: '₹500–₹1,500 ವಸೂಲಿ ಮಾಡುವ ಸೈಬರ್ ಕೆಫೆಗಳು ವಂಚಿಸುತ್ತಿವೆ. ಇ-ಡಿಸ್ಟ್ರಿಕ್ಟ್ ದೆಹಲಿ ಸರ್ಕಾರಿ ಶುಲ್ಕ ₹0.',
    },
  },

  'delhi-caste': {
    en: {
      title: 'Delhi Caste Certificate (SC/ST/OBC)',
      subtitle: 'e-District Delhi Portal (Revenue Department NCT of Delhi)',
      fraudWarning: 'Touts claiming they can get certificates without 1993 Delhi proof for ₹3,000 are scammers issuing forged papers.',
    },
    hi: {
      title: 'दिल्ली जाति प्रमाण पत्र (SC / ST / OBC)',
      subtitle: 'ई-डिस्ट्रिक्ट दिल्ली पोर्टल (राजस्व विभाग, दिल्ली सरकार)',
      fraudWarning: 'दलाल दावा करते हैं कि बिना 1993 के सबूत के प्रमाण पत्र बनवा देंगे। यह जालसाजी है और इससे जाली प्रमाण पत्र मिलता है।',
    },
    hinglish: {
      title: 'Delhi Caste Certificate (SC/ST/OBC)',
      subtitle: 'e-District Delhi Portal (Revenue Department NCT of Delhi)',
      fraudWarning: 'Touts claim they can get certificates without 1993 Delhi proof for ₹3,000. This is a scam resulting in fake certificates.',
    },
    bn: {
      title: 'দিল্লি জাতিগত শংসাপত্র (SC/ST/OBC)',
      subtitle: 'ই-ডিস্ট্রিক্ট দিল্লি পোর্টাল (রাজস্ব বিভাগ)',
      fraudWarning: '১৯৯৩ সালের প্রমাণ ছাড়াই ₹৩,০০০-এ সার্টিফিকেট দেওয়ার দাবি করা দালালরা ভুয়া কাগজ তৈরি করে।',
    },
    mr: {
      title: 'दिल्ली जात प्रमाणपत्र (SC/ST/OBC)',
      subtitle: 'ई-डिस्ट्रिक्ट दिल्ली पोर्टल (महसूल विभाग)',
      fraudWarning: '१९९३ च्या पुराव्याशिवाय ₹३,००० मध्ये प्रमाणपत्र देण्याचा दावा करणारे दलाल बनावट कागदपत्रे देतात.',
    },
    te: {
      title: 'ఢిల్లీ కుల ధృవీకరణ పత్రం (SC/ST/OBC)',
      subtitle: 'ఈ-డిస్ట్రిక్ట్ ఢిల్లీ పోర్టల్ (రెవెన్యూ విభాగం)',
      fraudWarning: '1993 ఆధారం లేకుండా ₹3,000కు సర్టిఫికేట్ ఇప్పిస్తామనే దళారులు నకిలీ పత్రాలు ఇస్తారు.',
    },
    ta: {
      title: 'டெல்லி சாதிச் சான்றிதழ் (SC/ST/OBC)',
      subtitle: 'இ-டிஸ்ட்ரிக்ட் டெல்லி தளம் (வருவாய்த் துறை)',
      fraudWarning: '1993 ஆதாரம் இன்றி ₹3,000-க்கு சான்றிதழ் தருவதாகக் கூறும் தரகர்கள் போலி ஆவணங்களை வழங்குகிறார்கள்.',
    },
    gu: {
      title: 'દિલ્હી જાતિ પ્રમાણપત્ર (SC/ST/OBC)',
      subtitle: 'ઈ-ડિસ્ટ્રિક્ટ દિલ્હી પોર્ટલ (મહેસૂલ વિભાગ)',
      fraudWarning: '1993 ના પુરાવા વિના ₹3,000 માં પ્રમાણપત્ર અપાવવાનો દાવો કરતા દલાલો નકલી દસ્તાવેજો બનાવે છે.',
    },
    kn: {
      title: 'ದೆಹಲಿ ಜಾತಿ ಪ್ರಮಾಣಪತ್ರ (SC/ST/OBC)',
      subtitle: 'ಇ-ಡಿಸ್ಟ್ರಿಕ್ಟ್ ದೆಹಲಿ ಪೋರ್ಟಲ್ (ಕಂದಾಯ ಇಲಾಖೆ)',
      fraudWarning: '1993 ದಾಖಲೆ ಇಲ್ಲದೆ ₹3,000ಕ್ಕೆ ಪ್ರಮಾಣಪತ್ರ ಕೊಡಿಸುವುದಾಗಿ ಹೇಳುವ ದಲ್ಲಾಳಿಗಳು ನಕಲಿ ಪತ್ರ ನೀಡುತ್ತಾರೆ.',
    },
  },

  'up-bhulekh': {
    en: {
      title: 'UP Bhulekh Land Record (Khasra/Khatauni)',
      subtitle: 'Board of Revenue Uttar Pradesh • upbhulekh.gov.in',
      fraudWarning: 'Touts charging ₹200–₹500 for viewing Khatauni are cheating. Real-time Khatauni viewing is 100% FREE.',
    },
    hi: {
      title: 'यूपी भूलेख जमीन रिकॉर्ड (खसरा / खतौनी नकल)',
      subtitle: 'राजस्व परिषद उत्तर प्रदेश • upbhulekh.gov.in',
      fraudWarning: 'लेखपाल या कैफे वाले खतौनी देखने के ₹200–₹500 लेते हैं। आधिकारिक पोर्टल पर खतौनी देखना 100% मुफ़्त है।',
    },
    hinglish: {
      title: 'UP Bhulekh Land Record (Khasra/Khatauni)',
      subtitle: 'Board of Revenue Uttar Pradesh • upbhulekh.gov.in',
      fraudWarning: 'Lekhpal or touts charging ₹200–₹500 for viewing Khatauni are cheating. Real-time Khatauni viewing is 100% FREE.',
    },
    bn: {
      title: 'ইউপি ভুলেখ জমির রেকর্ড (খসরা/খতিয়ান)',
      subtitle: 'উত্তর প্রদেশ রাজস্ব পর্ষদ • upbhulekh.gov.in',
      fraudWarning: 'খতিয়ান দেখার জন্য ₹২০০–₹৫০০ চাওয়া প্রতারণা। সরকারি পোর্টালে খতিয়ান দেখা ১০০% বিনামূল্যে।',
    },
    mr: {
      title: 'यूपी भूलेख जमीन नोंद (खसरा/खतौनी)',
      subtitle: 'उत्तर प्रदेश महसूल मंडळ • upbhulekh.gov.in',
      fraudWarning: 'खतौनी पाहण्यासाठी ₹२००–₹५०० घेणारे दलाल फसवणूक करत आहेत. अधिकृत पोर्टलवर पाहणे १००% मोफत आहे.',
    },
    te: {
      title: 'యూపీ భూలేఖ్ భూమి రికార్డు (ఖస్రా/ఖతౌనీ)',
      subtitle: 'ఉత్తరప్రదేశ్ రెవెన్యూ బోర్డు • upbhulekh.gov.in',
      fraudWarning: 'ఖతౌనీ చూడటానికి ₹200–₹500 వసూలు చేయడం మోసం. అధికారిక పోర్టల్‌లో చూడటం 100% ఉచితం.',
    },
    ta: {
      title: 'உ.பி. பூலேக் நில ஆவணம் (கஸ்ரா/கதௌனி)',
      subtitle: 'உத்தரப்பிரதேச வருவாய் வாரியம் • upbhulekh.gov.in',
      fraudWarning: 'கதௌனி பார்க்க ₹200–₹500 கேட்பது ஏமாற்று வேலை. அதிகாரப்பூர்வ தளத்தில் பார்ப்பது 100% இலவசம்.',
    },
    gu: {
      title: 'યુપી ભૂલેખ જમીન રેકોર્ડ (ખસરા/ખતૌની)',
      subtitle: 'ઉત્તર પ્રદેશ મહેસૂલ બોર્ડ • upbhulekh.gov.in',
      fraudWarning: 'ખતૌની જોવા માટે ₹200–₹500 વસૂલવું છેતરપિંડી છે. અધિકૃત પોર્ટલ પર જોવું 100% મફત છે.',
    },
    kn: {
      title: 'ಯುಪಿ ಭೂಲೇಖ್ ಭೂ ದಾಖಲೆ (ಖಸ್ರಾ/ಖತೌನಿ)',
      subtitle: 'ಉತ್ತರ ಪ್ರದೇಶ ಕಂದಾಯ ಮಂಡಳಿ • upbhulekh.gov.in',
      fraudWarning: 'ಖತೌನಿ ನೋಡಲು ₹200–₹500 ಕೇಳುವುದು ವಂಚನೆ. ಅಧಿಕೃತ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ನೋಡುವುದು 100% ಉಚಿತ.',
    },
  },

  'up-domicile': {
    en: {
      title: 'UP Domicile Certificate (Niwas Praman Patra)',
      subtitle: 'edistrict.up.gov.in / eSathi UP Portal',
      fraudWarning: 'Kiosks demanding ₹300–₹800 are overcharging. Direct citizen fee on eSathi is strictly ₹15.',
    },
    hi: {
      title: 'यूपी मूल निवास प्रमाण पत्र (Niwas Praman Patra)',
      subtitle: 'edistrict.up.gov.in / ई-साथी उत्तर प्रदेश पोर्टल',
      fraudWarning: 'कियोस्क ₹300–₹800 मांगकर लूटते हैं। ई-साथी पोर्टल पर नागरिक का आधिकारिक शुल्क मात्र ₹15 है।',
    },
    hinglish: {
      title: 'UP Domicile Certificate (Niwas Praman Patra)',
      subtitle: 'edistrict.up.gov.in / eSathi UP Portal',
      fraudWarning: 'Kiosks demanding ₹300–₹800 are overcharging. Direct citizen fee on eSathi is only ₹15.',
    },
    bn: {
      title: 'ইউপি স্থায়ী বাসিন্দা সনদ (নিবাস প্রমাণপত্র)',
      subtitle: 'edistrict.up.gov.in / ই-সাথী ইউপি পোর্টাল',
      fraudWarning: 'কিয়স্কগুলো ₹৩০০–₹৮০০ অতিরিক্ত নিচ্ছে। ই-সাথী পোর্টালে সরকারি ফি মাত্র ₹১৫।',
    },
    mr: {
      title: 'यूपी अधिवास प्रमाणपत्र (निवास प्रमाणपत्र)',
      subtitle: 'edistrict.up.gov.in / ई-साथी यूपी पोर्टल',
      fraudWarning: 'केंद्रांवर ₹३००–₹८०० जादा आकारले जातात. ई-साथी पोर्टलवर थेट सरकारी शुल्क फक्त ₹१५ आहे.',
    },
    te: {
      title: 'యూపీ నివాస ధృవీకరణ పత్రం (Domicile)',
      subtitle: 'edistrict.up.gov.in / ఈ-సాథీ యూపీ పోర్టల్',
      fraudWarning: '₹300–₹800 అడిగే కియోస్క్‌లు అధికంగా వసూలు చేస్తున్నాయి. ఈ-సాథీలో అధికారిక రుసుము కేవలం ₹15.',
    },
    ta: {
      title: 'உ.பி. இருப்பிடச் சான்றிதழ் (Domicile)',
      subtitle: 'edistrict.up.gov.in / இ-சாத்தி உ.பி. தளம்',
      fraudWarning: '₹300–₹800 கேட்பது அதிக கட்டணம். இ-சாத்தி தளத்தில் நேரடி அரசு கட்டணம் ₹15 மட்டுமே.',
    },
    gu: {
      title: 'યુપી રહેઠાણ પ્રમાણપત્ર (નિવાસ પ્રમાણપત્ર)',
      subtitle: 'edistrict.up.gov.in / ઈ-સાથી યુપી પોર્ટલ',
      fraudWarning: '₹300–₹800 માંગતા કેન્દ્રો વધુ પૈસા લે છે. ઈ-સાથી પોર્ટલ પર સીધી સરકારી ફી માત્ર ₹15 છે.',
    },
    kn: {
      title: 'ಯುಪಿ ವಾಸಸ್ಥಳ ಪ್ರಮಾಣಪತ್ರ (ನಿವಾಸ ಪ್ರಮಾಣಪತ್ರ)',
      subtitle: 'edistrict.up.gov.in / ಇ-ಸಾಥಿ ಯುಪಿ ಪೋರ್ಟಲ್',
      fraudWarning: '₹300–₹800 ಕೇಳುವುದು ಅಧಿಕ ಶುಲ್ಕ. ಇ-ಸಾಥಿ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ನೇರ ಸರ್ಕಾರಿ ಶುಲ್ಕ ಕೇವಲ ₹15.',
    },
  },

  'up-caste': {
    en: {
      title: 'UP Caste Certificate (Jati Praman Patra)',
      subtitle: 'edistrict.up.gov.in / eSathi UP Portal',
      fraudWarning: 'Do not pay bribes. Citizen portal eSathi charges strictly ₹15. Track application status directly using your Application ID.',
    },
    hi: {
      title: 'यूपी जाति प्रमाण पत्र (Jati Praman Patra)',
      subtitle: 'edistrict.up.gov.in / ई-साथी उत्तर प्रदेश पोर्टल',
      fraudWarning: 'रिश्वत बिल्कुल न दें। ई-साथी पोर्टल पर शुल्क मात्र ₹15 है। अपने आवेदन नंबर से स्थिति सीधे ऑनलाइन ट्रैक करें।',
    },
    hinglish: {
      title: 'UP Caste Certificate (Jati Praman Patra)',
      subtitle: 'edistrict.up.gov.in / eSathi UP Portal',
      fraudWarning: 'Do not pay bribes. Citizen portal eSathi charges strictly ₹15. Track application status directly using your Application ID.',
    },
    bn: {
      title: 'ইউপি জাতিগত শংসাপত্র (জাতি প্রমাণপত্র)',
      subtitle: 'edistrict.up.gov.in / ই-সাথী ইউপি পোর্টাল',
      fraudWarning: 'ঘুষ দেবেন না। ই-সাথী পোর্টালে সরকারি ফি মাত্র ₹১৫। আপনার আবেদন নম্বর দিয়ে সরাসরি স্ট্যাটাস দেখুন।',
    },
    mr: {
      title: 'यूपी जात प्रमाणपत्र (जाती प्रमाणपत्र)',
      subtitle: 'edistrict.up.gov.in / ई-साथी यूपी पोर्टल',
      fraudWarning: 'लाच देऊ नका. ई-साथी पोर्टलवर शुल्क फक्त ₹१५ आहे. तुमच्या अर्ज क्रमांकाने थेट स्थिती तपासा.',
    },
    te: {
      title: 'యూపీ కుల ధృవీకరణ పత్రం (జాతి ప్రమాణపత్రం)',
      subtitle: 'edistrict.up.gov.in / ఈ-సాథీ యూపీ పోర్టల్',
      fraudWarning: 'లంచం ఇవ్వవద్దు. ఈ-సాథీ పోర్టల్‌లో రుసుము కేవలం ₹15 మాత్రమే. మీ అప్లికేషన్ IDతో స్థితిని ట్రాక్ చేయండి.',
    },
    ta: {
      title: 'உ.பி. சாதிச் சான்றிதழ் (Jati Praman Patra)',
      subtitle: 'edistrict.up.gov.in / இ-சாத்தி உ.பி. தளம்',
      fraudWarning: 'லஞ்சம் கொடுக்க வேண்டாம். இ-சாத்தி தளத்தில் கட்டணம் ₹15 மட்டுமே. உங்கள் விண்ணப்ப எண்ணைக் கொண்டு நிலையை அறியலாம்.',
    },
    gu: {
      title: 'યુપી જાતિ પ્રમાણપત્ર (જાતિ પ્રમાણપત્ર)',
      subtitle: 'edistrict.up.gov.in / ઈ-સાથી યુપી પોર્ટલ',
      fraudWarning: 'લાંચ આપશો નહીં. ઈ-સાથી પોર્ટલ પર ફી માત્ર ₹15 છે. તમારા અરજી નંબરથી સીધું સ્ટેટસ તપાસો.',
    },
    kn: {
      title: 'ಯುಪಿ ಜಾತಿ ಪ್ರಮಾಣಪತ್ರ (ಜಾತಿ ಪ್ರಮಾಣಪತ್ರ)',
      subtitle: 'edistrict.up.gov.in / ಇ-ಸಾಥಿ ಯುಪಿ ಪೋರ್ಟಲ್',
      fraudWarning: 'ಲಂಚ ನೀಡಬೇಡಿ. ಇ-ಸಾಥಿ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಶುಲ್ಕ ಕೇವಲ ₹15 ಮಾತ್ರ. ನಿಮ್ಮ ಅರ್ಜಿ ಸಂಖ್ಯೆಯೊಂದಿಗೆ ಸ್ಥಿತಿಯನ್ನು ಪರಿಶೀಲಿಸಿ.',
    },
  },
};

export function getLocalizedProcedure<T extends { id: string; title: string; subtitle: string; fraudWarning: string; tag?: string; tagType?: 'easy' | 'medium' | 'hard' | 'free' }>(
  procedure: T,
  lang: Language
): T {
  const procEntries = PROCEDURE_TRANSLATIONS[procedure.id];
  const trans = procEntries?.[lang] || procEntries?.[FALLBACK_LANGUAGE];
  const localizedTag =
    procedure.tagType && PROCEDURE_TAG_TRANSLATIONS[procedure.tagType]
      ? t(PROCEDURE_TAG_TRANSLATIONS[procedure.tagType], lang)
      : procedure.tag;

  if (!trans) {
    return {
      ...procedure,
      tag: localizedTag ?? procedure.tag,
    };
  }

  return {
    ...procedure,
    title: trans.title,
    subtitle: trans.subtitle,
    fraudWarning: trans.fraudWarning,
    tag: localizedTag ?? procedure.tag,
  };
}
