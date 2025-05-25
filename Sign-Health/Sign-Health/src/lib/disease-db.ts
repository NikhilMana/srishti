import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './firebase';

export interface Disease {
  id: string;
  name: string;
  symptoms: {
    english: string[];
    kannada: string[];
    hindi: string[];
  };
  description: {
    english: string;
    kannada: string;
    hindi: string;
  };
  severity: 'low' | 'medium' | 'high';
  category: string;
}

// Sample disease data
const sampleDiseases: Disease[] = [
  {
    id: '1',
    name: 'Common Cold',
    symptoms: {
      english: ['Runny nose', 'Sore throat', 'Cough', 'Mild fever', 'Sneezing', 'Congestion'],
      kannada: ['ಹೊಳೆಯುವ ಮೂಗು', 'ಬಾಯಿ ನೋವು', 'ಕೆಮ್ಮು', 'ಸೌಮ್ಯ ಜ್ವರ', 'ಸೀನುವಿಕೆ', 'ಮೂಗು ತುಂಬಿರುವಿಕೆ'],
      hindi: ['बहती नाक', 'गला खराब', 'खांसी', 'हल्का बुखार', 'छींक आना', 'नाक बंद होना']
    },
    description: {
      english: 'A viral infection of the upper respiratory tract.',
      kannada: 'ಮೇಲಿನ ಉಸಿರಾಟದ ವ್ಯವಸ್ಥೆಯ ವೈರಲ್ ಸೋಂಕು.',
      hindi: 'ऊपरी श्वसन पथ का वायरल संक्रमण।'
    },
    severity: 'low',
    category: 'Respiratory'
  },
  {
    id: '2',
    name: 'Dengue Fever',
    symptoms: {
      english: ['High fever', 'Severe headache', 'Joint pain', 'Rash', 'Nausea', 'Vomiting'],
      kannada: ['ಅಧಿಕ ಜ್ವರ', 'ತೀವ್ರ ತಲೆನೋವು', 'ಜಂಟಿ ನೋವು', 'ಚರ್ಮದ ಊತ', 'ಓಕರಿಕೆ', 'ವಾಂತಿ'],
      hindi: ['तेज बुखार', 'गंभीर सिरदर्द', 'जोड़ों में दर्द', 'दाने', 'मतली', 'उल्टी']
    },
    description: {
      english: 'A mosquito-borne viral infection causing severe flu-like symptoms.',
      kannada: 'ಸೊಳ್ಳೆ-ವಾಹಿತ ವೈರಲ್ ಸೋಂಕು ತೀವ್ರ ಫ್ಲೂ-ಸದೃಶ ಲಕ್ಷಣಗಳನ್ನು ಉಂಟುಮಾಡುತ್ತದೆ.',
      hindi: 'मच्छर से फैलने वाला वायरल संक्रमण जो गंभीर फ्लू जैसे लक्षण पैदा करता है।'
    },
    severity: 'high',
    category: 'Viral'
  },
  {
    id: '3',
    name: 'Hypertension',
    symptoms: {
      english: ['Headache', 'Dizziness', 'Chest pain', 'Shortness of breath', 'Nosebleeds', 'Vision problems'],
      kannada: ['ತಲೆನೋವು', 'ತಲೆತಿರುಗುವಿಕೆ', 'ಎದೆ ನೋವು', 'ಉಸಿರಾಟದ ತೊಂದರೆ', 'ಮೂಗಿನಿಂದ ರಕ್ತಸ್ರಾವ', 'ದೃಷ್ಟಿ ಸಮಸ್ಯೆಗಳು'],
      hindi: ['सिरदर्द', 'चक्कर आना', 'सीने में दर्द', 'सांस की तकलीफ', 'नाक से खून आना', 'दृष्टि संबंधी समस्याएं']
    },
    description: {
      english: 'A condition where the force of blood against artery walls is too high.',
      kannada: 'ಧಮನಿ ಗೋಡೆಗಳ ವಿರುದ್ಧ ರಕ್ತದ ಒತ್ತಡವು ಹೆಚ್ಚಾಗಿರುವ ಸ್ಥಿತಿ.',
      hindi: 'एक ऐसी स्थिति जहां धमनियों की दीवारों के खिलाफ रक्त का दबाव बहुत अधिक होता है।'
    },
    severity: 'high',
    category: 'Cardiovascular'
  },
  {
    id: '4',
    name: 'Diabetes',
    symptoms: {
      english: ['Increased thirst', 'Frequent urination', 'Extreme hunger', 'Unexplained weight loss', 'Fatigue', 'Blurred vision'],
      kannada: ['ಹೆಚ್ಚಿನ ಬಾಯಾರಿಕೆ', 'ಆಗಾಗ್ಗೆ ಮೂತ್ರ ವಿಸರ್ಜನೆ', 'ತೀವ್ರ ಹಸಿವು', 'ಅನಿರೀಕ್ಷಿತ ತೂಕ ಕಡಿಮೆಯಾಗುವಿಕೆ', 'ಅಧಿಕ ದಣಿವು', 'ಅಸ್ಪಷ್ಟ ದೃಷ್ಟಿ'],
      hindi: ['बढ़ी हुई प्यास', 'बार-बार पेशाब आना', 'अत्यधिक भूख', 'अस्पष्टीकृत वजन घटना', 'थकान', 'धुंधली दृष्टि']
    },
    description: {
      english: 'A chronic condition that affects how your body metabolizes sugar.',
      kannada: 'ನಿಮ್ಮ ದೇಹವು ಸಕ್ಕರೆಯನ್ನು ಹೇಗೆ ಚಯಾಪಚಯ ಮಾಡುತ್ತದೆ ಎಂಬುದರ ಮೇಲೆ ಪರಿಣಾಮ ಬೀರುವ ದೀರ್ಘಕಾಲಿಕ ಸ್ಥಿತಿ.',
      hindi: 'एक पुरानी स्थिति जो आपके शरीर में चीनी के चयापचय को प्रभावित करती है।'
    },
    severity: 'high',
    category: 'Metabolic'
  },
  {
    id: '5',
    name: 'Asthma',
    symptoms: {
      english: ['Wheezing', 'Shortness of breath', 'Chest tightness', 'Coughing', 'Difficulty breathing', 'Rapid breathing'],
      kannada: ['ಉಸಿರಾಟದ ಸೀನು', 'ಉಸಿರಾಟದ ತೊಂದರೆ', 'ಎದೆ ಬಿಗಿತ', 'ಕೆಮ್ಮು', 'ಉಸಿರಾಡುವ ತೊಂದರೆ', 'ವೇಗದ ಉಸಿರಾಟ'],
      hindi: ['घरघराहट', 'सांस की तकलीफ', 'छाती में जकड़न', 'खांसी', 'सांस लेने में कठिनाई', 'तेज सांस लेना']
    },
    description: {
      english: 'A condition that affects airways in the lungs, causing breathing difficulties.',
      kannada: 'ಉಸಿರಾಟದ ತೊಂದರೆಗಳನ್ನು ಉಂಟುಮಾಡುವ ಶ್ವಾಸಕೋಶದ ವಾಯುಮಾರ್ಗಗಳ ಮೇಲೆ ಪರಿಣಾಮ ಬೀರುವ ಸ್ಥಿತಿ.',
      hindi: 'एक ऐसी स्थिति जो फेफड़ों में वायुमार्गों को प्रभावित करती है, जिससे सांस लेने में कठिनाई होती है।'
    },
    severity: 'medium',
    category: 'Respiratory'
  },
  {
    id: '6',
    name: 'Migraine',
    symptoms: {
      english: ['Severe headache', 'Nausea', 'Vomiting', 'Sensitivity to light', 'Sensitivity to sound', 'Visual disturbances'],
      kannada: ['ತೀವ್ರ ತಲೆನೋವು', 'ಓಕರಿಕೆ', 'ವಾಂತಿ', 'ಬೆಳಗಿನ ಸೂಕ್ಷ್ಮತೆ', 'ಧ್ವನಿಯ ಸೂಕ್ಷ್ಮತೆ', 'ದೃಷ್ಟಿ ತೊಂದರೆಗಳು'],
      hindi: ['गंभीर सिरदर्द', 'मतली', 'उल्टी', 'प्रकाश के प्रति संवेदनशीलता', 'ध्वनि के प्रति संवेदनशीलता', 'दृष्टि संबंधी गड़बड़ी']
    },
    description: {
      english: 'A neurological condition characterized by intense, debilitating headaches.',
      kannada: 'ತೀವ್ರ, ದುರ್ಬಲಗೊಳಿಸುವ ತಲೆನೋವಿನಿಂದ ನಿರೂಪಿತ ನರವೈಜ್ಞಾನಿಕ ಸ್ಥಿತಿ.',
      hindi: 'एक न्यूरोलॉजिकल स्थिति जो तीव्र, दुर्बल करने वाले सिरदर्द की विशेषता है।'
    },
    severity: 'medium',
    category: 'Neurological'
  },
  {
    id: '7',
    name: 'Malaria',
    symptoms: {
      english: ['High fever', 'Chills', 'Sweating', 'Headache', 'Nausea', 'Vomiting', 'Muscle pain'],
      kannada: ['ಅಧಿಕ ಜ್ವರ', 'ಜ್ವರದ ಚಳಿ', 'ಘಾಸಿ', 'ತಲೆನೋವು', 'ಓಕರಿಕೆ', 'ವಾಂತಿ', 'ಸ್ನಾಯು ನೋವು'],
      hindi: ['तेज बुखार', 'ठंड लगना', 'पसीना आना', 'सिरदर्द', 'मतली', 'उल्टी', 'मांसपेशियों में दर्द']
    },
    description: {
      english: 'A mosquito-borne disease caused by a parasite that affects red blood cells.',
      kannada: 'ಕೆಂಪು ರಕ್ತ ಕಣಗಳ ಮೇಲೆ ಪರಿಣಾಮ ಬೀರುವ ಪರಾವಲಂಬಿಯಿಂದ ಉಂಟಾಗುವ ಸೊಳ್ಳೆ-ವಾಹಿತ ರೋಗ.',
      hindi: 'एक मच्छर जनित बीमारी जो लाल रक्त कोशिकाओं को प्रभावित करने वाले परजीवी के कारण होती है।'
    },
    severity: 'high',
    category: 'Infectious'
  },
  {
    id: '8',
    name: 'Tuberculosis',
    symptoms: {
      english: ['Cough lasting more than 3 weeks', 'Chest pain', 'Coughing up blood', 'Fatigue', 'Fever', 'Night sweats', 'Weight loss'],
      kannada: ['3 ವಾರಗಳಿಗಿಂತ ಹೆಚ್ಚು ಕಾಲ ಕೆಮ್ಮು', 'ಎದೆ ನೋವು', 'ರಕ್ತದೊಂದಿಗೆ ಕೆಮ್ಮು', 'ಅಧಿಕ ದಣಿವು', 'ಜ್ವರ', 'ರಾತ್ರಿ ಘಾಸಿ', 'ತೂಕ ಕಡಿಮೆಯಾಗುವಿಕೆ'],
      hindi: ['3 सप्ताह से अधिक समय तक खांसी', 'छाती में दर्द', 'खांसी में खून आना', 'थकान', 'बुखार', 'रात को पसीना आना', 'वजन कम होना']
    },
    description: {
      english: 'A serious infectious disease that mainly affects the lungs.',
      kannada: 'ಮುಖ್ಯವಾಗಿ ಫುಪ್ಫುಸಗಳ ಮೇಲೆ ಪರಿಣಾಮ ಬೀರುವ ಗಂಭೀರ ಸಾಂಕ್ರಾಮಿಕ ರೋಗ.',
      hindi: 'एक गंभीर संक्रामक बीमारी जो मुख्य रूप से फेफड़ों को प्रभावित करती है।'
    },
    severity: 'high',
    category: 'Infectious'
  },
  {
    id: '9',
    name: 'Arthritis',
    symptoms: {
      english: ['Joint pain', 'Stiffness', 'Swelling', 'Reduced range of motion', 'Joint redness', 'Warmth around joints'],
      kannada: ['ಜಂಟಿ ನೋವು', 'ಬಿಗಿತ', 'ಊತ', 'ಚಲನೆಯ ವ್ಯಾಪ್ತಿ ಕಡಿಮೆಯಾಗುವಿಕೆ', 'ಜಂಟಿಗಳ ಕೆಂಪು ಬಣ್ಣ', 'ಜಂಟಿಗಳ ಸುತ್ತಲಿನ ಶಾಖ'],
      hindi: ['जोड़ों में दर्द', 'अकड़न', 'सूजन', 'गति की सीमा कम होना', 'जोड़ों का लाल होना', 'जोड़ों के आसपास गर्मी']
    },
    description: {
      english: 'Inflammation of one or more joints, causing pain and stiffness.',
      kannada: 'ಒಂದು ಅಥವಾ ಹೆಚ್ಚಿನ ಜಂಟಿಗಳ ಉರಿಯೂತ, ನೋವು ಮತ್ತು ಬಿಗಿತವನ್ನು ಉಂಟುಮಾಡುತ್ತದೆ.',
      hindi: 'एक या अधिक जोड़ों की सूजन, जिससे दर्द और अकड़न होती है।'
    },
    severity: 'medium',
    category: 'Musculoskeletal'
  },
  {
    id: '10',
    name: 'Pneumonia',
    symptoms: {
      english: ['Chest pain when breathing', 'Cough with phlegm', 'Fever', 'Difficulty breathing', 'Fatigue', 'Loss of appetite'],
      kannada: ['ಉಸಿರಾಡುವಾಗ ಎದೆ ನೋವು', 'ಫ್ಲೆಗ್ಮ್‌ನೊಂದಿಗೆ ಕೆಮ್ಮು', 'ಜ್ವರ', 'ಉಸಿರಾಟದ ತೊಂದರೆ', 'ಅಧಿಕ ದಣಿವು', 'ಹಸಿವು ಕಡಿಮೆಯಾಗುವಿಕೆ'],
      hindi: ['सांस लेते समय छाती में दर्द', 'बलगम के साथ खांसी', 'बुखार', 'सांस लेने में कठिनाई', 'थकान', 'भूख कम लगना']
    },
    description: {
      english: 'An infection that inflames the air sacs in one or both lungs.',
      kannada: 'ಒಂದು ಅಥವಾ ಎರಡೂ ಫುಪ್ಫುಸಗಳಲ್ಲಿನ ಗಾಳಿ ಚೀಲಗಳ ಉರಿಯೂತವನ್ನು ಉಂಟುಮಾಡುವ ಸೋಂಕು.',
      hindi: 'एक संक्रमण जो एक या दोनों फेफड़ों में हवा की थैलियों में सूजन पैदा करता है।'
    },
    severity: 'high',
    category: 'Respiratory'
  },
  {
    id: '11',
    name: 'Thyroid Disorder',
    symptoms: {
      english: ['Fatigue', 'Weight changes', 'Mood swings', 'Hair loss', 'Muscle weakness', 'Irregular heartbeat'],
      kannada: ['ಅಧಿಕ ದಣಿವು', 'ತೂಕದ ಬದಲಾವಣೆಗಳು', 'ಮನಸ್ಥಿತಿ ಬದಲಾವಣೆಗಳು', 'ಕೂದಲು ಉದುರುವಿಕೆ', 'ಸ್ನಾಯು ದೌರ್ಬಲ್ಯ', 'ಅನಿಯಮಿತ ಹೃದಯ ಬಡಿತ'],
      hindi: ['थकान', 'वजन में परिवर्तन', 'मूड में बदलाव', 'बालों का झड़ना', 'मांसपेशियों में कमजोरी', 'अनियमित दिल की धड़कन']
    },
    description: {
      english: 'A condition that affects the thyroid gland, which controls metabolism.',
      kannada: 'ಚಯಾಪಚಯವನ್ನು ನಿಯಂತ್ರಿಸುವ ಥೈರಾಯ್ಡ್ ಗ್ರಂಥಿಯ ಮೇಲೆ ಪರಿಣಾಮ ಬೀರುವ ಸ್ಥಿತಿ.',
      hindi: 'एक ऐसी स्थिति जो चयापचय को नियंत्रित करने वाली थायरॉयड ग्रंथि को प्रभावित करती है।'
    },
    severity: 'medium',
    category: 'Endocrine'
  },
  {
    id: '12',
    name: 'Cardiac Arrest',
    symptoms: {
      english: ['Sudden loss of consciousness', 'No pulse', 'No breathing', 'Chest pain', 'Shortness of breath', 'Dizziness', 'Nausea'],
      kannada: ['ಅಕಸ್ಮಾತ್ ಜ್ಞಾನ ತಪ್ಪುವಿಕೆ', 'ನಾಡಿ ಇಲ್ಲ', 'ಉಸಿರಾಟ ಇಲ್ಲ', 'ಎದೆ ನೋವು', 'ಉಸಿರಾಟದ ತೊಂದರೆ', 'ತಲೆತಿರುಗುವಿಕೆ', 'ಓಕರಿಕೆ'],
      hindi: ['अचानक चेतना खोना', 'नाड़ी नहीं चलना', 'सांस नहीं आना', 'छाती में दर्द', 'सांस की तकलीफ', 'चक्कर आना', 'मतली']
    },
    description: {
      english: 'A sudden, unexpected loss of heart function, breathing, and consciousness.',
      kannada: 'ಹೃದಯ ಕಾರ್ಯ, ಉಸಿರಾಟ ಮತ್ತು ಜ್ಞಾನದ ಹಠಾತ್, ಅನಿರೀಕ್ಷಿತ ನಷ್ಟ.',
      hindi: 'दिल की कार्यप्रणाली, सांस लेने और चेतना का अचानक, अप्रत्याशित नुकसान।'
    },
    severity: 'high',
    category: 'Cardiac'
  },
  {
    id: '13',
    name: 'Brain Stroke',
    symptoms: {
      english: ['Sudden numbness or weakness in face, arm, or leg', 'Confusion', 'Trouble speaking', 'Vision problems', 'Difficulty walking', 'Severe headache', 'Dizziness'],
      kannada: ['ಮುಖ, ತೋಳು, ಅಥವಾ ಕಾಲಿನಲ್ಲಿ ಹಠಾತ್ ಸ್ಥಬ್ಧತೆ ಅಥವಾ ದೌರ್ಬಲ್ಯ', 'ಗೊಂದಲ', 'ಮಾತನಾಡುವ ತೊಂದರೆ', 'ದೃಷ್ಟಿ ತೊಂದರೆಗಳು', 'ನಡೆಯುವ ತೊಂದರೆ', 'ತೀವ್ರ ತಲೆನೋವು', 'ತಲೆತಿರುಗುವಿಕೆ'],
      hindi: ['चेहरे, हाथ या पैर में अचानक सुन्नता या कमजोरी', 'भ्रम', 'बोलने में कठिनाई', 'दृष्टि संबंधी समस्याएं', 'चलने में कठिनाई', 'गंभीर सिरदर्द', 'चक्कर आना']
    },
    description: {
      english: 'A medical emergency that occurs when blood supply to part of the brain is interrupted or reduced.',
      kannada: 'ಮೆದುಳಿನ ಒಂದು ಭಾಗಕ್ಕೆ ರಕ್ತ ಪೂರೈಕೆ ತಡೆಹಿಡಿಯಲ್ಪಟ್ಟಾಗ ಅಥವಾ ಕಡಿಮೆಯಾದಾಗ ಸಂಭವಿಸುವ ವೈದ್ಯಕೀಯ ತುರ್ತು ಪರಿಸ್ಥಿತಿ.',
      hindi: 'एक चिकित्सा आपातकालीन स्थिति जो मस्तिष्क के किसी हिस्से में रक्त की आपूर्ति बाधित या कम होने पर होती है।'
    },
    severity: 'high',
    category: 'Neurological'
  },
  {
    id: '14',
    name: 'Heart Attack',
    symptoms: {
      english: ['Chest pain or discomfort', 'Pain in arm, neck, jaw, or back', 'Shortness of breath', 'Nausea', 'Lightheadedness', 'Cold sweat', 'Fatigue'],
      kannada: ['ಎದೆ ನೋವು ಅಥವಾ ಅಸ್ವಸ್ಥತೆ', 'ತೋಳು, ಕುತ್ತಿಗೆ, ದವಡೆ, ಅಥವಾ ಬೆನ್ನಿನಲ್ಲಿ ನೋವು', 'ಉಸಿರಾಟದ ತೊಂದರೆ', 'ಓಕರಿಕೆ', 'ತಲೆತಿರುಗುವಿಕೆ', 'ಚಳಿ ಬೆವರುವಿಕೆ', 'ಅಧಿಕ ದಣಿವು'],
      hindi: ['छाती में दर्द या बेचैनी', 'हाथ, गर्दन, जबड़े या पीठ में दर्द', 'सांस की तकलीफ', 'मतली', 'चक्कर आना', 'ठंडा पसीना', 'थकान']
    },
    description: {
      english: 'Occurs when blood flow to the heart is blocked, causing damage to the heart muscle.',
      kannada: 'ಹೃದಯಕ್ಕೆ ರಕ್ತ ಹರಿವು ತಡೆಹಿಡಿಯಲ್ಪಟ್ಟಾಗ ಸಂಭವಿಸುತ್ತದೆ, ಹೃದಯ ಸ್ನಾಯುವಿಗೆ ಹಾನಿ ಉಂಟುಮಾಡುತ್ತದೆ.',
      hindi: 'तब होता है जब हृदय में रक्त प्रवाह अवरुद्ध हो जाता है, जिससे हृदय की मांसपेशी को नुकसान पहुंचता है।'
    },
    severity: 'high',
    category: 'Cardiac'
  },
  {
    id: '15',
    name: 'Kidney Failure',
    symptoms: {
      english: ['Decreased urine output', 'Swelling in legs and ankles', 'Shortness of breath', 'Fatigue', 'Confusion', 'Nausea', 'Chest pain'],
      kannada: ['ಮೂತ್ರ ವಿಸರ್ಜನೆ ಕಡಿಮೆಯಾಗುವಿಕೆ', 'ಕಾಲುಗಳು ಮತ್ತು ಕಣಕಗಳಲ್ಲಿ ಊತ', 'ಉಸಿರಾಟದ ತೊಂದರೆ', 'ಅಧಿಕ ದಣಿವು', 'ಗೊಂದಲ', 'ಓಕರಿಕೆ', 'ಎದೆ ನೋವು'],
      hindi: ['पेशाब की मात्रा कम होना', 'पैरों और टखनों में सूजन', 'सांस की तकलीफ', 'थकान', 'भ्रम', 'मतली', 'छाती में दर्द']
    },
    description: {
      english: 'A condition where the kidneys lose their ability to filter waste and excess fluids from the blood.',
      kannada: 'ಮೂತ್ರಪಿಂಡಗಳು ರಕ್ತದಿಂದ ತ್ಯಾಜ್ಯ ಮತ್ತು ಹೆಚ್ಚುವರಿ ದ್ರವಗಳನ್ನು ಫಿಲ್ಟರ್ ಮಾಡುವ ಸಾಮರ್ಥ್ಯವನ್ನು ಕಳೆದುಕೊಳ್ಳುವ ಸ್ಥಿತಿ.',
      hindi: 'एक ऐसी स्थिति जहां गुर्दे रक्त से अपशिष्ट और अतिरिक्त तरल पदार्थों को छानने की अपनी क्षमता खो देते हैं।'
    },
    severity: 'high',
    category: 'Renal'
  },
  {
    id: '16',
    name: 'Liver Cirrhosis',
    symptoms: {
      english: ['Jaundice', 'Abdominal swelling', 'Easy bruising', 'Loss of appetite', 'Nausea', 'Weight loss', 'Confusion'],
      kannada: ['ಕಾಮಾಲೆ', 'ಉದರ ಊತ', 'ಸುಲಭ ಗಾಯಗಳು', 'ಹಸಿವು ಕಡಿಮೆಯಾಗುವಿಕೆ', 'ಓಕರಿಕೆ', 'ತೂಕ ಕಡಿಮೆಯಾಗುವಿಕೆ', 'ಗೊಂದಲ'],
      hindi: ['पीलिया', 'पेट में सूजन', 'आसानी से चोट लगना', 'भूख कम लगना', 'मतली', 'वजन कम होना', 'भ्रम']
    },
    description: {
      english: 'Scarring of the liver caused by long-term damage, leading to loss of liver function.',
      kannada: 'ದೀರ್ಘಕಾಲಿಕ ಹಾನಿಯಿಂದ ಉಂಟಾಗುವ ಯಕೃತ್ತಿನ ಗಾಯ, ಯಕೃತ್ತಿನ ಕಾರ್ಯ ನಷ್ಟಕ್ಕೆ ಕಾರಣವಾಗುತ್ತದೆ.',
      hindi: 'यकृत का निशान पड़ना जो दीर्घकालिक क्षति के कारण होता है, जिससे यकृत की कार्यप्रणाली खराब हो जाती है।'
    },
    severity: 'high',
    category: 'Hepatic'
  },
  {
    id: '17',
    name: 'Gastritis',
    symptoms: {
      english: ['Burning stomach pain', 'Nausea', 'Vomiting', 'Loss of appetite', 'Bloating', 'Indigestion', 'Hiccups'],
      kannada: ['ಜಠರದ ಉರಿಯೂತ ನೋವು', 'ಓಕರಿಕೆ', 'ವಾಂತಿ', 'ಹಸಿವು ಕಡಿಮೆಯಾಗುವಿಕೆ', 'ಉಬ್ಬರ', 'ಜೀರ್ಣಕ್ರಿಯೆ ತೊಂದರೆ', 'ಬಿಕ್ಕಳಿಕೆ'],
      hindi: ['पेट में जलन', 'मतली', 'उल्टी', 'भूख कम लगना', 'पेट फूलना', 'अपच', 'हिचकी']
    },
    description: {
      english: 'Inflammation of the stomach lining causing digestive discomfort.',
      kannada: 'ಜಠರದ ಪೊರೆಯ ಉರಿಯೂತ ಜೀರ್ಣಕ್ರಿಯೆ ತೊಂದರೆಗಳನ್ನು ಉಂಟುಮಾಡುತ್ತದೆ.',
      hindi: 'पेट की परत में सूजन जो पाचन संबंधी परेशानी पैदा करती है।'
    },
    severity: 'medium',
    category: 'Digestive'
  },
  {
    id: '18',
    name: 'Sinusitis',
    symptoms: {
      english: ['Facial pain', 'Nasal congestion', 'Headache', 'Thick nasal discharge', 'Reduced sense of smell', 'Cough', 'Fever'],
      kannada: ['ಮುಖದ ನೋವು', 'ಮೂಗು ತುಂಬಿರುವಿಕೆ', 'ತಲೆನೋವು', 'ದಪ್ಪ ಮೂಗಿನ ಸ್ರಾವ', 'ವಾಸನೆ ಗ್ರಹಿಸುವ ಶಕ್ತಿ ಕಡಿಮೆ', 'ಕೆಮ್ಮು', 'ಜ್ವರ'],
      hindi: ['चेहरे में दर्द', 'नाक बंद होना', 'सिरदर्द', 'गाढ़ा नाक का स्राव', 'सूंघने की क्षमता कम होना', 'खांसी', 'बुखार']
    },
    description: {
      english: 'Inflammation of the sinuses causing facial pain and nasal symptoms.',
      kannada: 'ಸೈನಸ್‌ಗಳ ಉರಿಯೂತ ಮುಖದ ನೋವು ಮತ್ತು ಮೂಗಿನ ಲಕ್ಷಣಗಳನ್ನು ಉಂಟುಮಾಡುತ್ತದೆ.',
      hindi: 'साइनस की सूजन जो चेहरे में दर्द और नाक के लक्षण पैदा करती है।'
    },
    severity: 'medium',
    category: 'Respiratory'
  },
  {
    id: '19',
    name: 'Conjunctivitis',
    symptoms: {
      english: ['Red eyes', 'Eye irritation', 'Watery eyes', 'Eye discharge', 'Sensitivity to light', 'Blurred vision', 'Eye pain'],
      kannada: ['ಕೆಂಪು ಕಣ್ಣುಗಳು', 'ಕಣ್ಣಿನ ಕಿರಿಕಿರಿ', 'ನೀರು ಸುರಿಯುವ ಕಣ್ಣುಗಳು', 'ಕಣ್ಣಿನ ಸ್ರಾವ', 'ಬೆಳಗಿನ ಸೂಕ್ಷ್ಮತೆ', 'ಅಸ್ಪಷ್ಟ ದೃಷ್ಟಿ', 'ಕಣ್ಣಿನ ನೋವು'],
      hindi: ['लाल आंखें', 'आंखों में जलन', 'पानी आना', 'आंखों से स्राव', 'प्रकाश के प्रति संवेदनशीलता', 'धुंधली दृष्टि', 'आंखों में दर्द']
    },
    description: {
      english: 'Inflammation of the conjunctiva causing eye redness and irritation.',
      kannada: 'ಕಂಜಂಕ್ಟಿವಾದ ಉರಿಯೂತ ಕಣ್ಣಿನ ಕೆಂಪು ಬಣ್ಣ ಮತ್ತು ಕಿರಿಕಿರಿಯನ್ನು ಉಂಟುಮಾಡುತ್ತದೆ.',
      hindi: 'कंजंक्टिवा की सूजन जो आंखों में लालिमा और जलन पैदा करती है।'
    },
    severity: 'low',
    category: 'Ocular'
  },
  {
    id: '20',
    name: 'Urinary Tract Infection',
    symptoms: {
      english: ['Frequent urination', 'Burning sensation while urinating', 'Cloudy urine', 'Strong-smelling urine', 'Pelvic pain', 'Fever', 'Nausea'],
      kannada: ['ಆಗಾಗ್ಗೆ ಮೂತ್ರ ವಿಸರ್ಜನೆ', 'ಮೂತ್ರ ವಿಸರ್ಜನೆ ಸಮಯದಲ್ಲಿ ಉರಿಯೂತ', 'ಮಂಜುಗಡ್ಡೆ ಮೂತ್ರ', 'ಬಲವಾದ ವಾಸನೆಯ ಮೂತ್ರ', 'ಶ್ರೋಣಿ ನೋವು', 'ಜ್ವರ', 'ಓಕರಿಕೆ'],
      hindi: ['बार-बार पेशाब आना', 'पेशाब करते समय जलन', 'बादल जैसा पेशाब', 'तेज गंध वाला पेशाब', 'पेल्विक दर्द', 'बुखार', 'मतली']
    },
    description: {
      english: 'Infection in any part of the urinary system causing discomfort and pain.',
      kannada: 'ಮೂತ್ರ ವ್ಯವಸ್ಥೆಯ ಯಾವುದೇ ಭಾಗದಲ್ಲಿ ಸೋಂಕು ಅಸ್ವಸ್ಥತೆ ಮತ್ತು ನೋವನ್ನು ಉಂಟುಮಾಡುತ್ತದೆ.',
      hindi: 'मूत्र प्रणाली के किसी भी हिस्से में संक्रमण जो असुविधा और दर्द पैदा करता है।'
    },
    severity: 'medium',
    category: 'Urinary'
  },
  {
    id: '21',
    name: 'Ear Infection',
    symptoms: {
      english: ['Ear pain', 'Difficulty hearing', 'Ear drainage', 'Fever', 'Headache', 'Loss of balance', 'Nausea'],
      kannada: ['ಕಿವಿ ನೋವು', 'ಕೇಳುವ ತೊಂದರೆ', 'ಕಿವಿಯಿಂದ ಸ್ರಾವ', 'ಜ್ವರ', 'ತಲೆನೋವು', 'ಸಮತೋಲನ ಕಳೆದುಕೊಳ್ಳುವಿಕೆ', 'ಓಕರಿಕೆ'],
      hindi: ['कान में दर्द', 'सुनने में कठिनाई', 'कान से स्राव', 'बुखार', 'सिरदर्द', 'संतुलन खोना', 'मतली']
    },
    description: {
      english: 'Infection in the middle ear causing pain and hearing problems.',
      kannada: 'ಮಧ್ಯ ಕಿವಿಯ ಸೋಂಕು ನೋವು ಮತ್ತು ಕೇಳುವ ತೊಂದರೆಗಳನ್ನು ಉಂಟುಮಾಡುತ್ತದೆ.',
      hindi: 'मध्य कान का संक्रमण जो दर्द और सुनने की समस्या पैदा करता है।'
    },
    severity: 'medium',
    category: 'Ear'
  },
  {
    id: '22',
    name: 'Food Poisoning',
    symptoms: {
      english: ['Nausea', 'Vomiting', 'Diarrhea', 'Abdominal pain', 'Fever', 'Dehydration', 'Weakness'],
      kannada: ['ಓಕರಿಕೆ', 'ವಾಂತಿ', 'ಅತಿಸಾರ', 'ಉದರ ನೋವು', 'ಜ್ವರ', 'ನಿರ್ಜಲೀಕರಣ', 'ದೌರ್ಬಲ್ಯ'],
      hindi: ['मतली', 'उल्टी', 'दस्त', 'पेट दर्द', 'बुखार', 'निर्जलीकरण', 'कमजोरी']
    },
    description: {
      english: 'Illness caused by eating contaminated food.',
      kannada: 'ಮಲಿನ ಆಹಾರ ಸೇವನೆಯಿಂದ ಉಂಟಾಗುವ ಅನಾರೋಗ್ಯ.',
      hindi: 'दूषित भोजन खाने से होने वाली बीमारी।'
    },
    severity: 'medium',
    category: 'Digestive'
  },
  {
    id: '23',
    name: 'Anemia',
    symptoms: {
      english: ['Fatigue', 'Weakness', 'Pale skin', 'Shortness of breath', 'Dizziness', 'Chest pain', 'Cold hands and feet'],
      kannada: ['ಅಧಿಕ ದಣಿವು', 'ದೌರ್ಬಲ್ಯ', 'ಬಿಳಿ ಚರ್ಮ', 'ಉಸಿರಾಟದ ತೊಂದರೆ', 'ತಲೆತಿರುಗುವಿಕೆ', 'ಎದೆ ನೋವು', 'ಚಳಿ ಕೈಗಳು ಮತ್ತು ಕಾಲುಗಳು'],
      hindi: ['थकान', 'कमजोरी', 'पीली त्वचा', 'सांस की तकलीफ', 'चक्कर आना', 'छाती में दर्द', 'ठंडे हाथ और पैर']
    },
    description: {
      english: 'Condition where blood lacks enough healthy red blood cells.',
      kannada: 'ರಕ್ತದಲ್ಲಿ ಸಾಕಷ್ಟು ಆರೋಗ್ಯಕರ ಕೆಂಪು ರಕ್ತ ಕಣಗಳ ಕೊರತೆ ಇರುವ ಸ್ಥಿತಿ.',
      hindi: 'एक ऐसी स्थिति जहां रक्त में पर्याप्त स्वस्थ लाल रक्त कोशिकाओं की कमी होती है।'
    },
    severity: 'medium',
    category: 'Blood'
  },
  {
    id: '24',
    name: 'Osteoporosis',
    symptoms: {
      english: ['Back pain', 'Loss of height', 'Stooped posture', 'Bone fractures', 'Weak bones', 'Joint pain', 'Reduced mobility'],
      kannada: ['ಬೆನ್ನಿನ ನೋವು', 'ಎತ್ತರ ಕಡಿಮೆಯಾಗುವಿಕೆ', 'ಬಾಗಿದ ಭಂಗಿ', 'ಮೂಳೆ ಮುರಿತಗಳು', 'ದುರ್ಬಲ ಮೂಳೆಗಳು', 'ಜಂಟಿ ನೋವು', 'ಚಲನೆ ಕಡಿಮೆಯಾಗುವಿಕೆ'],
      hindi: ['पीठ दर्द', 'कद छोटा होना', 'झुकी हुई मुद्रा', 'हड्डी टूटना', 'कमजोर हड्डियां', 'जोड़ों में दर्द', 'गतिशीलता कम होना']
    },
    description: {
      english: 'Condition where bones become weak and brittle.',
      kannada: 'ಮೂಳೆಗಳು ದುರ್ಬಲ ಮತ್ತು ಸುಲಭವಾಗಿ ಮುರಿಯುವ ಸ್ಥಿತಿ.',
      hindi: 'एक ऐसी स्थिति जहां हड्डियां कमजोर और भंगुर हो जाती हैं।'
    },
    severity: 'high',
    category: 'Bone'
  },
  {
    id: '25',
    name: 'Gout',
    symptoms: {
      english: ['Joint pain', 'Swelling', 'Redness', 'Limited range of motion', 'Tenderness', 'Warmth in joints', 'Fever'],
      kannada: ['ಜಂಟಿ ನೋವು', 'ಊತ', 'ಕೆಂಪು ಬಣ್ಣ', 'ಚಲನೆಯ ಸೀಮಿತ ವ್ಯಾಪ್ತಿ', 'ಸೂಕ್ಷ್ಮತೆ', 'ಜಂಟಿಗಳಲ್ಲಿ ಶಾಖ', 'ಜ್ವರ'],
      hindi: ['जोड़ों में दर्द', 'सूजन', 'लालिमा', 'गति की सीमित सीमा', 'कोमलता', 'जोड़ों में गर्मी', 'बुखार']
    },
    description: {
      english: 'Form of arthritis characterized by severe pain and inflammation in joints.',
      kannada: 'ಜಂಟಿಗಳಲ್ಲಿ ತೀವ್ರ ನೋವು ಮತ್ತು ಉರಿಯೂತದಿಂದ ನಿರೂಪಿತ ಆರ್ಥ್ರೈಟಿಸ್ ರೂಪ.',
      hindi: 'गठिया का एक रूप जो जोड़ों में गंभीर दर्द और सूजन की विशेषता है।'
    },
    severity: 'medium',
    category: 'Joint'
  },
  {
    id: '26',
    name: 'Cataracts',
    symptoms: {
      english: ['Cloudy vision', 'Difficulty seeing at night', 'Sensitivity to light', 'Frequent prescription changes', 'Double vision', 'Fading colors', 'Halos around lights'],
      kannada: ['ಮಂಜುಗಡ್ಡೆ ದೃಷ್ಟಿ', 'ರಾತ್ರಿ ನೋಡುವ ತೊಂದರೆ', 'ಬೆಳಗಿನ ಸೂಕ್ಷ್ಮತೆ', 'ಆಗಾಗ್ಗೆ ಚಶ್ಮೆ ಬದಲಾವಣೆಗಳು', 'ದ್ವಿಗುಣ ದೃಷ್ಟಿ', 'ಬಣ್ಣಗಳ ಮಾಸುವಿಕೆ', 'ದೀಪಗಳ ಸುತ್ತ ಹಾಲೋ'],
      hindi: ['धुंधली दृष्टि', 'रात में देखने में कठिनाई', 'प्रकाश के प्रति संवेदनशीलता', 'बार-बार चश्मे का नंबर बदलना', 'दोहरी दृष्टि', 'रंग फीके पड़ना', 'लाइट के आसपास हलो']
    },
    description: {
      english: 'Clouding of the eye\'s natural lens affecting vision.',
      kannada: 'ದೃಷ್ಟಿಯ ಮೇಲೆ ಪರಿಣಾಮ ಬೀರುವ ಕಣ್ಣಿನ ನೈಸರ್ಗಿಕ ಲೆನ್ಸ್‌ನ ಮಂಜುಗಡ್ಡೆ.',
      hindi: 'आंख के प्राकृतिक लेंस का धुंधलापन जो दृष्टि को प्रभावित करता है।'
    },
    severity: 'medium',
    category: 'Ocular'
  },
  {
    id: '27',
    name: 'Glaucoma',
    symptoms: {
      english: ['Gradual vision loss', 'Tunnel vision', 'Severe eye pain', 'Nausea', 'Vomiting', 'Red eyes', 'Halos around lights'],
      kannada: ['ಕ್ರಮೇಣ ದೃಷ್ಟಿ ನಷ್ಟ', 'ಸುರಂಗ ದೃಷ್ಟಿ', 'ತೀವ್ರ ಕಣ್ಣಿನ ನೋವು', 'ಓಕರಿಕೆ', 'ವಾಂತಿ', 'ಕೆಂಪು ಕಣ್ಣುಗಳು', 'ದೀಪಗಳ ಸುತ್ತ ಹಾಲೋ'],
      hindi: ['धीरे-धीरे दृष्टि कम होना', 'सुरंग जैसी दृष्टि', 'गंभीर आंखों में दर्द', 'मतली', 'उल्टी', 'लाल आंखें', 'लाइट के आसपास हलो']
    },
    description: {
      english: 'Group of eye conditions that damage the optic nerve.',
      kannada: 'ಆಪ್ಟಿಕ್ ನರವನ್ನು ಹಾನಿಗೊಳಿಸುವ ಕಣ್ಣಿನ ಸ್ಥಿತಿಗಳ ಗುಂಪು.',
      hindi: 'आंखों की स्थितियों का समूह जो ऑप्टिक नर्व को नुकसान पहुंचाता है।'
    },
    severity: 'high',
    category: 'Ocular'
  },
  {
    id: '28',
    name: 'Psoriasis',
    symptoms: {
      english: ['Red patches of skin', 'Silvery scales', 'Dry, cracked skin', 'Itching', 'Burning sensation', 'Thickened nails', 'Joint pain'],
      kannada: ['ಚರ್ಮದ ಕೆಂಪು ಪಟ್ಟಿಗಳು', 'ಬೆಳ್ಳಿ ಕರ್ಪೂರ', 'ಒಣ, ಬಿರುಕು ಚರ್ಮ', 'ಅರಿವಳಿಕೆ', 'ಉರಿಯೂತ', 'ದಪ್ಪಗಾದ ಉಗುರುಗಳು', 'ಜಂಟಿ ನೋವು'],
      hindi: ['त्वचा पर लाल धब्बे', 'चांदी जैसी परतें', 'सूखी, फटी त्वचा', 'खुजली', 'जलन', 'मोटे नाखून', 'जोड़ों में दर्द']
    },
    description: {
      english: 'Skin disorder that causes skin cells to multiply rapidly.',
      kannada: 'ಚರ್ಮದ ಕೋಶಗಳು ವೇಗವಾಗಿ ಗುಣಿಸಲು ಕಾರಣವಾಗುವ ಚರ್ಮ ರೋಗ.',
      hindi: 'त्वचा विकार जो त्वचा कोशिकाओं को तेजी से बढ़ने का कारण बनता है।'
    },
    severity: 'medium',
    category: 'Skin'
  },
  {
    id: '29',
    name: 'Eczema',
    symptoms: {
      english: ['Itchy skin', 'Red patches', 'Dry skin', 'Cracked skin', 'Blisters', 'Swelling', 'Oozing or crusting'],
      kannada: ['ಅರಿವಳಿಕೆ ಚರ್ಮ', 'ಕೆಂಪು ಪಟ್ಟಿಗಳು', 'ಒಣ ಚರ್ಮ', 'ಬಿರುಕು ಚರ್ಮ', 'ಬೊಬ್ಬೆಗಳು', 'ಊತ', 'ಸ್ರಾವ ಅಥವಾ ಕ್ರಸ್ಟಿಂಗ್'],
      hindi: ['खुजली वाली त्वचा', 'लाल धब्बे', 'सूखी त्वचा', 'फटी त्वचा', 'छाले', 'सूजन', 'पस या पपड़ी']
    },
    description: {
      english: 'Condition that makes skin red and itchy.',
      kannada: 'ಚರ್ಮವನ್ನು ಕೆಂಪು ಮತ್ತು ಅರಿವಳಿಕೆ ಮಾಡುವ ಸ್ಥಿತಿ.',
      hindi: 'एक ऐसी स्थिति जो त्वचा को लाल और खुजली वाली बनाती है।'
    },
    severity: 'medium',
    category: 'Skin'
  },
  {
    id: '30',
    name: 'Vertigo',
    symptoms: {
      english: ['Spinning sensation', 'Loss of balance', 'Nausea', 'Vomiting', 'Sweating', 'Headache', 'Ringing in ears'],
      kannada: ['ತಿರುಗುವ ಸಂವೇದನೆ', 'ಸಮತೋಲನ ಕಳೆದುಕೊಳ್ಳುವಿಕೆ', 'ಓಕರಿಕೆ', 'ವಾಂತಿ', 'ಘಾಸಿ', 'ತಲೆನೋವು', 'ಕಿವಿಯಲ್ಲಿ ಶಬ್ದ'],
      hindi: ['घूमने का एहसास', 'संतुलन खोना', 'मतली', 'उल्टी', 'पसीना आना', 'सिरदर्द', 'कानों में बजना']
    },
    description: {
      english: 'Sensation of spinning or dizziness, often related to inner ear problems.',
      kannada: 'ತಿರುಗುವ ಅಥವಾ ತಲೆತಿರುಗುವಿಕೆಯ ಸಂವೇದನೆ, ಸಾಮಾನ್ಯವಾಗಿ ಆಂತರಿಕ ಕಿವಿಯ ಸಮಸ್ಯೆಗಳಿಗೆ ಸಂಬಂಧಿಸಿದೆ.',
      hindi: 'घूमने या चक्कर आने की अनुभूति, अक्सर आंतरिक कान की समस्याओं से संबंधित।'
    },
    severity: 'medium',
    category: 'Neurological'
  },
  {
    id: '31',
    name: 'Fibromyalgia',
    symptoms: {
      english: ['Widespread pain', 'Fatigue', 'Sleep problems', 'Memory issues', 'Mood swings', 'Headaches', 'Irritable bowel syndrome'],
      kannada: ['ವ್ಯಾಪಕ ನೋವು', 'ಅಧಿಕ ದಣಿವು', 'ನಿದ್ರೆ ಸಮಸ್ಯೆಗಳು', 'ನೆನಪಿನ ಸಮಸ್ಯೆಗಳು', 'ಮನಸ್ಥಿತಿ ಬದಲಾವಣೆಗಳು', 'ತಲೆನೋವು', 'ಚೀಡಿ ಕರುಳು ಸಿಂಡ್ರೋಮ್'],
      hindi: ['व्यापक दर्द', 'थकान', 'नींद की समस्याएं', 'याददाश्त की समस्याएं', 'मूड में बदलाव', 'सिरदर्द', 'चिड़चिड़ा आंत्र सिंड्रोम']
    },
    description: {
      english: 'Disorder characterized by widespread musculoskeletal pain.',
      kannada: 'ವ್ಯಾಪಕ ಕಂಕಾಲ-ಸ್ನಾಯು ನೋವಿನಿಂದ ನಿರೂಪಿತ ವ್ಯಾಧಿ.',
      hindi: 'एक विकार जो व्यापक मस्कुलोस्केलेटल दर्द की विशेषता है।'
    },
    severity: 'medium',
    category: 'Musculoskeletal'
  },
  {
    id: '32',
    name: 'Lupus',
    symptoms: {
      english: ['Fatigue', 'Joint pain', 'Rash', 'Fever', 'Hair loss', 'Sensitivity to light', 'Chest pain'],
      kannada: ['ಅಧಿಕ ದಣಿವು', 'ಜಂಟಿ ನೋವು', 'ಚರ್ಮದ ಊತ', 'ಜ್ವರ', 'ಕೂದಲು ಉದುರುವಿಕೆ', 'ಬೆಳಗಿನ ಸೂಕ್ಷ್ಮತೆ', 'ಎದೆ ನೋವು'],
      hindi: ['थकान', 'जोड़ों में दर्द', 'दाने', 'बुखार', 'बाल झड़ना', 'प्रकाश के प्रति संवेदनशीलता', 'छाती में दर्द']
    },
    description: {
      english: 'Autoimmune disease that can affect many body systems.',
      kannada: 'ಅನೇಕ ದೇಹ ವ್ಯವಸ್ಥೆಗಳ ಮೇಲೆ ಪರಿಣಾಮ ಬೀರ೬ಹುದಾದ ಆಟೋಇಮ್ಯೂನ್ ರೋಗ.',
      hindi: 'ऑटोइम्यून बीमारी जो शरीर की कई प्रणालियों को प्रभावित कर सकती है।'
    },
    severity: 'high',
    category: 'Autoimmune'
  },
  {
    id: '33',
    name: 'Multiple Sclerosis',
    symptoms: {
      english: ['Vision problems', 'Muscle weakness', 'Coordination problems', 'Fatigue', 'Numbness', 'Tingling', 'Balance issues'],
      kannada: ['ದೃಷ್ಟಿ ಸಮಸ್ಯೆಗಳು', 'ಸ್ನಾಯು ದೌರ್ಬಲ್ಯ', 'ಸಂಯೋಜನೆ ಸಮಸ್ಯೆಗಳು', 'ಅಧಿಕ ದಣಿವು', 'ಸ್ಥಬ್ಧತೆ', 'ಝುಂಝುಂ', 'ಸಮತೋಲನ ಸಮಸ್ಯೆಗಳು'],
      hindi: ['दृष्टि संबंधी समस्याएं', 'मांसपेशियों में कमजोरी', 'समन्वय की समस्याएं', 'थकान', 'सुन्नता', 'झुनझुनी', 'संतुलन की समस्याएं']
    },
    description: {
      english: 'Disease that affects the central nervous system.',
      kannada: 'ಕೇಂದ್ರ ನರಮಂಡಲವನ್ನು ಪರಿಣಾಮ ಬೀರುವ ರೋಗ.',
      hindi: 'केंद्रीय तंत्रिका तंत्र को प्रभावित करने वाली बीमारी।'
    },
    severity: 'high',
    category: 'Neurological'
  },
  {
    id: '34',
    name: 'Parkinson\'s Disease',
    symptoms: {
      english: ['Tremors', 'Slow movement', 'Stiff muscles', 'Balance problems', 'Speech changes', 'Writing changes', 'Loss of automatic movements'],
      kannada: ['ಕಂಪನ', 'ನಿಧಾನ ಚಲನೆ', 'ಬಿಗಿತ ಸ್ನಾಯುಗಳು', 'ಸಮತೋಲನ ಸಮಸ್ಯೆಗಳು', 'ಮಾತಿನ ಬದಲಾವಣೆಗಳು', 'ಬರವಣಿಗೆ ಬದಲಾವಣೆಗಳು', 'ಸ್ವಯಂಚಾಲಿತ ಚಲನೆಗಳ ನಷ್ಟ'],
      hindi: ['कंपन', 'धीमी गति', 'कड़ी मांसपेशियां', 'संतुलन की समस्याएं', 'बोलने में बदलाव', 'लिखने में बदलाव', 'स्वचालित गतियों का नुकसान']
    },
    description: {
      english: 'Progressive nervous system disorder affecting movement.',
      kannada: 'ಚಲನೆಯ ಮೇಲೆ ಪರಿಣಾಮ ಬೀರುವ ಪ್ರಗತಿಶೀಲ ನರಮಂಡಲ ವ್ಯಾಧಿ.',
      hindi: 'गतिविधि को प्रभावित करने वाला प्रगतिशील तंत्रिका तंत्र विकार।'
    },
    severity: 'high',
    category: 'Neurological'
  },
  {
    id: '35',
    name: 'Rheumatoid Arthritis',
    symptoms: {
      english: ['Joint pain', 'Swelling', 'Redness', 'Limited range of motion', 'Tenderness', 'Warmth in joints', 'Fever'],
      kannada: ['ಜಂಟಿ ನೋವು', 'ಊತ', 'ಕೆಂಪು ಬಣ್ಣ', 'ಚಲನೆಯ ಸೀಮಿತ ವ್ಯಾಪ್ತಿ', 'ಸೂಕ್ಷ್ಮತೆ', 'ಜಂಟಿಗಳಲ್ಲಿ ಶಾಖ', 'ಜ್ವರ'],
      hindi: ['जोड़ों में दर्द', 'सूजन', 'लालिमा', 'गति की सीमित सीमा', 'कोमलता', 'जोड़ों में गर्मी', 'बुखार']
    },
    description: {
      english: 'Chronic inflammatory disorder affecting joints.',
      kannada: 'ಜಂಟಿಗಳ ಮೇಲೆ ಪರಿಣಾಮ ಬೀರುವ ದೀರ್ಘಕಾಲಿಕ ಉರಿಯೂತ ವ್ಯಾಧಿ.',
      hindi: 'जोड़ों को प्रभावित करने वाला पुराना सूजन संबंधी विकार।'
    },
    severity: 'medium',
    category: 'Musculoskeletal'
  },
  {
    id: '36',
    name: 'Celiac Disease',
    symptoms: {
      english: ['Diarrhea', 'Abdominal pain', 'Bloating', 'Weight loss', 'Fatigue', 'Nausea', 'Vomiting'],
      kannada: ['ಅತಿಸಾರ', 'ಉದರ ನೋವು', 'ಉಬ್ಬರ', 'ತೂಕ ಕಡಿಮೆಯಾಗುವಿಕೆ', 'ಅಧಿಕ ದಣಿವು', 'ಓಕರಿಕೆ', 'ವಾಂತಿ'],
      hindi: ['दस्त', 'पेट दर्द', 'पेट फूलना', 'वजन कम होना', 'थकान', 'मतली', 'उल्टी']
    },
    description: {
      english: 'Immune reaction to eating gluten, damaging the small intestine.',
      kannada: 'ಗ್ಲುಟೆನ್ ಸೇವನೆಗೆ ಪ್ರತಿರಕ್ಷಾ ಪ್ರತಿಕ್ರಿಯೆ, ಸಣ್ಣ ಕರುಳಿನ ಹಾನಿ.',
      hindi: 'ग्लूटेन खाने पर प्रतिरक्षा प्रतिक्रिया, छोटी आंत को नुकसान पहुंचाती है।'
    },
    severity: 'medium',
    category: 'Digestive'
  },
  {
    id: '37',
    name: 'Endometriosis',
    symptoms: {
      english: ['Painful periods', 'Pelvic pain', 'Pain during intercourse', 'Heavy menstrual bleeding', 'Infertility', 'Fatigue', 'Bloating'],
      kannada: ['ನೋವಿನ ಮುಟ್ಟು', 'ಶ್ರೋಣಿ ನೋವು', 'ಸಂಭೋಗ ಸಮಯದಲ್ಲಿ ನೋವು', 'ಭಾರೀ ಮುಟ್ಟಿನ ರಕ್ತಸ್ರಾವ', 'ಫಲವತ್ತತೆ ಕೊರತೆ', 'ಅಧಿಕ ದಣಿವು', 'ಉಬ್ಬರ'],
      hindi: ['दर्दनाक पीरियड्स', 'पेल्विक दर्द', 'खांसी में दर्द', 'भारी मासिक धर्म रक्तस्राव', 'बांझपन', 'थकान', 'पेट फूलना']
    },
    description: {
      english: 'Condition where tissue similar to uterine lining grows outside the uterus.',
      kannada: 'ಗರ್ಭಕೋಶದ ಪೊರೆಯಂತಹ ಅಂಗಾಂಶ ಗರ್ಭಕೋಶದ ಹೊರಗೆ ಬೆಳೆಯುವ ಸ್ಥಿತಿ.',
      hindi: 'एक ऐसी स्थिति जहां गर्भाशय की परत जैसा ऊतक गर्भाशय के बाहर बढ़ता है।'
    },
    severity: 'high',
    category: 'Gynecological'
  },
  {
    id: '38',
    name: 'Osteoarthritis',
    symptoms: {
      english: ['Joint pain', 'Stiffness', 'Swelling', 'Reduced range of motion', 'Grating sensation', 'Bone spurs', 'Tenderness'],
      kannada: ['ಜಂಟಿ ನೋವು', 'ಬಿಗಿತ', 'ಊತ', 'ಚಲನೆಯ ವ್ಯಾಪ್ತಿ ಕಡಿಮೆಯಾಗುವಿಕೆ', 'ಘರ್ಷಣೆ ಸಂವೇದನೆ', 'ಮೂಳೆ ಸ್ಪರ್ಸ್', 'ಸೂಕ್ಷ್ಮತೆ'],
      hindi: ['जोड़ों में दर्द', 'अकड़न', 'सूजन', 'गति की सीमा कम होना', 'घिसने का एहसास', 'हड्डी के स्पर्स', 'कोमलता']
    },
    description: {
      english: 'Inflammation of one or more joints, causing pain and stiffness.',
      kannada: 'ಒಂದು ಅಥವಾ ಹೆಚ್ಚಿನ ಜಂಟಿಗಳ ಉರಿಯೂತ, ನೋವು ಮತ್ತು ಬಿಗಿತವನ್ನು ಉಂಟುಮಾಡುತ್ತದೆ.',
      hindi: 'एक या अधिक जोड़ों की सूजन, जिससे दर्द और अकड़न होती है।'
    },
    severity: 'medium',
    category: 'Musculoskeletal'
  },
  {
    id: '39',
    name: 'Chronic Fatigue Syndrome',
    symptoms: {
      english: ['Severe fatigue', 'Memory problems', 'Concentration issues', 'Muscle pain', 'Joint pain', 'Headaches', 'Unrefreshing sleep'],
      kannada: ['ತೀವ್ರ ದಣಿವು', 'ನೆನಪಿನ ಸಮಸ್ಯೆಗಳು', 'ಏಕಾಗ್ರತೆ ಸಮಸ್ಯೆಗಳು', 'ಸ್ನಾಯು ನೋವು', 'ಜಂಟಿ ನೋವು', 'ತಲೆನೋವು', 'ತೃಪ್ತಿಕರ ನಿದ್ರೆ ಇಲ್ಲ'],
      hindi: ['गंभीर थकान', 'याददाश्त की समस्याएं', 'एकाग्रता की समस्याएं', 'मांसपेशियों में दर्द', 'जोड़ों में दर्द', 'सिरदर्द', 'असंतोषजनक नींद']
    },
    description: {
      english: 'Complex disorder characterized by extreme fatigue.',
      kannada: 'ತೀವ್ರ ದಣಿವಿನಿಂದ ನಿರೂಪಿತ ಸಂಕೀರ್ಣ ವ್ಯಾಧಿ.',
      hindi: 'अत्यधिक थकान की विशेषता वाला जटिल विकार।'
    },
    severity: 'high',
    category: 'Systemic'
  },
  {
    id: '40',
    name: 'Irritable Bowel Syndrome',
    symptoms: {
      english: ['Abdominal pain', 'Bloating', 'Diarrhea', 'Constipation', 'Gas', 'Mucus in stool', 'Cramping'],
      kannada: ['ಉದರ ನೋವು', 'ಉಬ್ಬರ', 'ಅತಿಸಾರ', 'ಮಲಬದ್ಧತೆ', 'ಅನಿಲ', 'ಮಲದಲ್ಲಿ ಲೋಳೆ', 'ಆಕ್ರಮಣ'],
      hindi: ['पेट दर्द', 'पेट फूलना', 'दस्त', 'कब्ज', 'गैस', 'मल में बलगम', 'ऐंठन']
    },
    description: {
      english: 'Common disorder affecting the large intestine.',
      kannada: 'ದೊಡ್ಡ ಕರುಳಿನ ಮೇಲೆ ಪರಿಣಾಮ ಬೀರುವ ಸಾಮಾನ್ಯ ವ್ಯಾಧಿ.',
      hindi: 'बड़ी आंत को प्रभावित करने वाला आम विकार।'
    },
    severity: 'medium',
    category: 'Digestive'
  },
  {
    id: '41',
    name: 'Sleep Apnea',
    symptoms: {
      english: ['Loud snoring', 'Gasping for air', 'Morning headache', 'Insomnia', 'Excessive daytime sleepiness', 'Difficulty concentrating', 'Irritability'],
      kannada: ['ಜೋರಾಗಿ ಗೊರಕೆ', 'ಗಾಳಿಗಾಗಿ ಉಸಿರಾಡುವಿಕೆ', 'ಬೆಳಗಿನ ತಲೆನೋವು', 'ಅನಿದ್ರೆ', 'ಹಗಲು ಅಧಿಕ ನಿದ್ರೆ', 'ಏಕಾಗ್ರತೆ ತೊಂದರೆ', 'ಚೀಡಿ'],
      hindi: ['जोर से खर्राटे', 'हवा के लिए हांफना', 'सुबह सिरदर्द', 'अनिद्रा', 'दिन में अत्यधिक नींद', 'एकाग्रता में कठिनाई', 'चिड़चिड़ापन']
    },
    description: {
      english: 'Serious sleep disorder where breathing repeatedly stops and starts.',
      kannada: 'ಗಂಭೀರ ನಿದ್ರೆ ವ್ಯಾಧಿ, ಉಸಿರಾಟ ಪದೇ ಪದೇ ನಿಲ್ಲುತ್ತದೆ ಮತ್ತು ಪ್ರಾರಂಭವಾಗುತ್ತದೆ.',
      hindi: 'दिल की कार्यप्रणाली, सांस लेने और चेतना का अचानक, अप्रत्याशित नुकसान।'
    },
    severity: 'high',
    category: 'Sleep'
  },
  {
    id: '42',
    name: 'Tinnitus',
    symptoms: {
      english: ['Ringing in ears', 'Buzzing', 'Clicking', 'Hissing', 'Roaring', 'Humming', 'Whistling'],
      kannada: ['ಕಿವಿಯಲ್ಲಿ ಶಬ್ದ', 'ಗುನುಗುವಿಕೆ', 'ಕ್ಲಿಕ್ ಮಾಡುವಿಕೆ', 'ಸೀಟು', 'ಗರ್ಜನೆ', 'ಗುನುಗುವಿಕೆ', 'ಸೀಟಿ'],
      hindi: ['कानों में बजना', 'गुंजन', 'क्लिक करना', 'सीटी', 'गरजना', 'गुनगुनाहट', 'सीटी बजना']
    },
    description: {
      english: 'Ringing or buzzing noise in one or both ears.',
      kannada: 'ಒಂದು ಅಥವಾ ಎರಡೂ ಕಿವಿಗಳಲ್ಲಿ ಶಬ್ದ ಅಥವಾ ಗುನುಗುವಿಕೆ.',
      hindi: 'एक या दोनों कानों में बजने या गुंजने की आवाज।'
    },
    severity: 'medium',
    category: 'Ear'
  },
  {
    id: '43',
    name: 'Shingles',
    symptoms: {
      english: ['Painful rash', 'Burning sensation', 'Tingling', 'Sensitivity to touch', 'Fluid-filled blisters', 'Itching', 'Fever'],
      kannada: ['ನೋವಿನ ಚರ್ಮದ ಊತ', 'ಉರಿಯೂತ', 'ಝುಂಝುಂ', 'ಸ್ಪರ್ಶಕ್ಕೆ ಸೂಕ್ಷ್ಮತೆ', 'ದ್ರವ ತುಂಬಿದ ಬೊಬ್ಬೆಗಳು', 'ಅರಿವಳಿಕೆ', 'ಜ್ವರ'],
      hindi: ['दर्दनाक दाने', 'जलन', 'झुनझुनी', 'छूने पर संवेदनशीलता', 'द्रव से भरे छाले', 'खुजली', 'बुखार']
    },
    description: {
      english: 'Viral infection causing a painful rash.',
      kannada: 'ನೋವಿನ ಚರ್ಮದ ಊತವನ್ನು ಉಂಟುಮಾಡುತ್ತದೆ.',
      hindi: 'वायरल संक्रमण जो दर्दनाक दाने पैदा करता है।'
    },
    severity: 'medium',
    category: 'Viral'
  },
  {
    id: '44',
    name: 'Diverticulitis',
    symptoms: {
      english: ['Abdominal pain', 'Fever', 'Nausea', 'Vomiting', 'Constipation', 'Diarrhea', 'Bloating'],
      kannada: ['ಉದರ ನೋವು', 'ಉಬ್ಬರ', 'ಅತಿಸಾರ', 'ಮಲಬದ್ಧತೆ', 'ಅನಿಲ', 'ಮಲದಲ್ಲಿ ಲೋಳೆ', 'ಆಕ್ರಮಣ'],
      hindi: ['पेट दर्द', 'पेट फूलना', 'दस्त', 'कब्ज', 'गैस', 'मल में बलगम', 'ऐंठन']
    },
    description: {
      english: 'Inflammation of small pouches in the digestive tract.',
      kannada: 'ಜೀರ್ಣಕ್ರಿಯೆ ಮಾರ್ಗದಲ್ಲಿ ಸಣ್ಣ ಚೀಲಗಳ ಉರಿಯೂತ.',
      hindi: 'पाचन तंत्र में छोटी थैलियों में सूजन।'
    },
    severity: 'medium',
    category: 'Digestive'
  },
  {
    id: '45',
    name: 'Gout',
    symptoms: {
      english: ['Joint pain', 'Swelling', 'Redness', 'Limited range of motion', 'Tenderness', 'Warmth in joints', 'Fever'],
      kannada: ['ಜಂಟಿ ನೋವು', 'ಊತ', 'ಕೆಂಪು ಬಣ್ಣ', 'ಚಲನೆಯ ಸೀಮಿತ ವ್ಯಾಪ್ತಿ', 'ಸೂಕ್ಷ್ಮತೆ', 'ಜಂಟಿಗಳಲ್ಲಿ ಶಾಖ', 'ಜ್ವರ'],
      hindi: ['जोड़ों में दर्द', 'जोड़ों में सूजन', 'अकड़न', 'गति की सीमित सीमा', 'कोमलता', 'जोड़ों में गर्मी', 'बुखार']
    },
    description: {
      english: 'Form of arthritis characterized by severe pain and inflammation in joints.',
      kannada: 'ಜಂಟಿಗಳ ಮೇಲೆ ಪರಿಣಾಮ ಬೀರುವ ದೀರ್ಘಕಾಲಿಕ ಉರಿಯೂತ ವ್ಯಾಧಿ.',
      hindi: 'गठिया का एक रूप जो जोड़ों में गंभीर दर्द और सूजन की विशेषता है।'
    },
    severity: 'medium',
    category: 'Joint'
  },
  {
    id: '46',
    name: 'Hemorrhoids',
    symptoms: {
      english: ['Rectal pain', 'Itching', 'Bleeding', 'Swelling', 'Lump near anus', 'Discomfort', 'Mucus discharge'],
      kannada: ['ಮಲಾಶಯ ನೋವು', 'ಅರಿವಳಿಕೆ', 'ರಕ್ತಸ್ರಾವ', 'ಊತ', 'ಗುದದ್ವಾರದ ಬಳಿ ಗಂಟು', 'ಅಸ್ವಸ್ಥತೆ', 'ಲೋಳೆ ಸ್ರಾವ'],
      hindi: ['मलाशय में दर्द', 'खुजली', 'रक्तस्राव', 'सूजन', 'गुदा के पास गांठ', 'बेचैनी', 'बलगम स्राव']
    },
    description: {
      english: 'Swollen veins in the rectum and anus causing discomfort.',
      kannada: 'ಮಲಾಶಯ ಮತ್ತು ಗುದದ್ವಾರದಲ್ಲಿ ಊತಗೊಂಡ ಸಿರೆಗಳು ಅಸ್ವಸ್ಥತೆಯನ್ನು ಉಂಟುಮಾಡುತ್ತವೆ.',
      hindi: 'मलाशय और गुदा में सूजन जो असुविधा पैदा करती हैं।'
    },
    severity: 'medium',
    category: 'Digestive'
  }
];

// Function to search diseases
export const searchDiseases = async (searchTerm: string): Promise<Disease[]> => {
  if (!searchTerm.trim()) {
    return sampleDiseases; // Return all diseases if search term is empty
  }

  const searchTermLower = searchTerm.toLowerCase().trim();
  const searchTerms = searchTermLower.split(' ').filter(term => term.length > 0);

  try {
    // Use local data for faster search
    return sampleDiseases.filter(disease => {
      // Search in disease name
      if (disease.name.toLowerCase().includes(searchTermLower)) {
        return true;
      }

      // Search in category
      if (disease.category.toLowerCase().includes(searchTermLower)) {
        return true;
      }

      // Search in symptoms (all languages)
      const hasMatchingSymptom = 
        disease.symptoms.english.some(symptom => 
          symptom.toLowerCase().includes(searchTermLower)
        ) ||
        disease.symptoms.kannada.some(symptom => 
          symptom.toLowerCase().includes(searchTermLower)
        ) ||
        disease.symptoms.hindi.some(symptom => 
          symptom.toLowerCase().includes(searchTermLower)
        );

      if (hasMatchingSymptom) {
        return true;
      }

      // Search for multiple words
      if (searchTerms.length > 1) {
        return searchTerms.every(term => 
          disease.name.toLowerCase().includes(term) ||
          disease.symptoms.english.some(symptom => 
            symptom.toLowerCase().includes(term)
          ) ||
          disease.symptoms.kannada.some(symptom => 
            symptom.toLowerCase().includes(term)
          ) ||
          disease.symptoms.hindi.some(symptom => 
            symptom.toLowerCase().includes(term)
          ) ||
          disease.category.toLowerCase().includes(term)
        );
      }

      return false;
    });
  } catch (error) {
    console.error('Error searching diseases:', error);
    return []; // Return empty array on error
  }
};

// Function to get all diseases
export const getAllDiseases = async (): Promise<Disease[]> => {
  return sampleDiseases; // Return local data directly
};