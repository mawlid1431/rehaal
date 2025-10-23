import React, { createContext, useContext, useState, useEffect } from 'react';

// Dark Mode Context
interface DarkModeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

export const DarkModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) {
      setIsDarkMode(savedMode === 'true');
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', String(isDarkMode));
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return context;
};

// Language Context
export type Language = 'en' | 'da' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations = {
  en: {
    home: 'Home',
    about: 'About',
    services: 'Services',
    trips: 'Trips',
    gallery: 'Gallery',
    testimonials: 'Testimonials',
    contact: 'Get in Touch',
    heroTitle: 'Your Spiritual Journey Starts Here',
    heroSubtitle: 'Experience Umrah with Rehaal Travels - A trusted Muslim-owned travel agency dedicated to spiritually enriching journeys',
    bookJourney: 'Book Your Journey',
    viewMore: 'View More',
    aboutPreviewTitle: 'Welcome to Rehaal Rejser',
    tripsPreviewTitle: 'Upcoming Umrah Packages',
    testimonialsPreviewTitle: 'What Our Pilgrims Say',
    faq: 'FAQ',
    terms: 'Terms & Conditions',
    privacy: 'Privacy Policy',
    companyInfo: 'Company Info',
    quickLinks: 'Quick Links',
    legal: 'Legal',
    followUs: 'Follow Us',
    allRightsReserved: '© 2025 Rehaal Travels. All rights reserved.',
    name: 'Name',
    email: 'Email',
    phone: 'Phone',
    message: 'Message',
    submit: 'Submit',
    destination: 'Destination',
    price: 'Price',
    viewDetails: 'View Details',
    backToTrips: 'Back to Trips',
    welcomeTitle: 'Welcome to Rehaal Travels',
    welcomeDesc: 'A trusted Muslim-owned travel agency dedicated to organizing spiritually enriching Umrah and Hajj journeys. Founded with sincerity and guided by Islamic values, we provide a seamless experience that combines faith, comfort, and community.',
    completePackageTitle: 'Complete Umrah Travel Package',
    completePackageDesc: 'From your first inquiry until your return home, we ensure that every step of your pilgrimage is smooth, authentic, and spiritually fulfilling',
    flights: 'Flight Booking',
    flightsDesc: 'Complete flight arrangements from Denmark to Saudi Arabia',
    luxuryHotels: '4-5 Star Hotels',
    luxuryHotelsDesc: 'Luxury accommodation close to Haram in Makkah and Madinah',
    visaProcessing: 'Visa Issuance',
    visaProcessingDesc: 'Seamless visa processing and arrangements',
    transport: 'Ground Transport',
    transportDesc: 'Comfortable local transportation throughout your journey',
    guidedTours: 'Seerah Tours',
    guidedToursDesc: 'Guided visits to historical and religious sites',
    seerahTours: 'Spiritual Guidance',
    seerahToursDesc: 'Exclusive Umrah preparation seminars and learning sessions',
    umrahSeminar: 'Educational Sessions',
    umrahSeminarDesc: 'Pre-departure seminars to prepare you spiritually',
    fullSupport: '24/7 Support',
    fullSupportDesc: 'On-ground assistance from Danish and Arabic-speaking leaders',
    whyChooseTitle: 'Why Choose Rehaal Travels?',
    ourMission: 'Our Mission',
    ourMissionDesc: 'To make Umrah and Hajj accessible, organized, and spiritually fulfilling. We provide professional travel services rooted in Islamic values, educate and prepare every traveler through pre-departure seminars, and build a strong community of believers who travel with sincerity, reflection, and gratitude.',
    ourPromise: 'Our Vision',
    ourPromiseDesc: 'To be the leading Islamic travel agency in Scandinavia and Europe that redefines the Umrah experience through sincerity, comfort, and unity — helping Muslims strengthen their connection with Allah and their faith through meaningful journeys.',
    satisfiedPilgrims: 'Pilgrims Guided',
    yearsExperience: 'Decades of Experience',
    halalGuarantee: 'Halal Guarantee',
    supportDuringTrip: 'Support During Trip',
    spiritualJourneyWaits: 'Your Spiritual Journey Awaits',
    quranVerse: '"And proclaim to the people the Hajj [pilgrimage]; they will come to you on foot and on every lean camel; they will come from every distant pass."',
    quranReference: '- Quran 22:27',
    umrahAllYear: 'Umrah All Year',
    umrahAllYearDesc: 'Fulfill your dream of visiting the Kaaba anytime',
    ramadanSpecials: 'Ramadan Specials',
    ramadanSpecialsDesc: 'Experience the holy month in Makkah and Madinah',
    familyPackages: 'Family Packages',
    familyPackagesDesc: 'Take the whole family on the spiritual journey',
    dontPostpone: 'Don\'t postpone your journey!',
    motivationText: 'Every day is an opportunity to get closer to Allah. Book your Umrah today and experience the transformation that hundreds of pilgrims have experienced with Rehaal Travels.',
    seeAllTrips: 'See All Trips →',
    contactUsNow: 'Contact Us Now',
    flexiblePayment: 'Flexible payment plans available',
    earlyBooking: 'Early booking discounts',
    groupDiscounts: 'Group discounts',
    callUs: 'Call Us',
    callUsDesc: 'Have questions? We are here to help',
    seeContactInfo: 'See Contact Info →',
    faqTitle: 'Frequently Asked Questions',
    faqDesc: 'Find answers to common questions',
    readFaq: 'Read FAQ →',
    galleryTitle: 'See Our Gallery',
    galleryDesc: 'Photos from previous trips',
    visitGallery: 'Visit Gallery →',
  },
  da: {
    home: 'Hjem',
    about: 'Om Os',
    services: 'Tjenester',
    trips: 'Rejser',
    gallery: 'Galleri',
    testimonials: 'Anmeldelser',
    contact: 'Kontakt Os',
    heroTitle: 'Din Åndelige Rejse Begynder Her',
    heroSubtitle: 'Oplev Umrah med Rehaal Travels - Et betroet muslimsk-ejet rejsebureau dedikeret til åndeligt berigede rejser',
    bookJourney: 'Book Din Rejse',
    viewMore: 'Se Mere',
    aboutPreviewTitle: 'Velkommen til Rehaal Rejser',
    tripsPreviewTitle: 'Kommende Umrah Pakker',
    testimonialsPreviewTitle: 'Hvad Vores Pilgrimme Siger',
    faq: 'FAQ',
    terms: 'Vilkår & Betingelser',
    privacy: 'Privatlivspolitik',
    companyInfo: 'Virksomhedsinfo',
    quickLinks: 'Hurtige Links',
    legal: 'Juridisk',
    followUs: 'Følg Os',
    allRightsReserved: '© 2025 Rehaal Travels. Alle rettigheder forbeholdes.',
    name: 'Navn',
    email: 'E-mail',
    phone: 'Telefon',
    message: 'Besked',
    submit: 'Send',
    destination: 'Destination',
    price: 'Pris',
    viewDetails: 'Se Detaljer',
    backToTrips: 'Tilbage til Rejser',
    welcomeTitle: 'Velkommen til Rehaal Travels',
    welcomeDesc: 'Et betroet muslimsk-ejet rejsebureau dedikeret til at organisere åndeligt berigede Umrah og Hajj rejser. Grundlagt med oprigtighed og styret af islamiske værdier, tilbyder vi en problemfri oplevelse, der kombinerer tro, komfort og fællesskab.',
    completePackageTitle: 'Komplet Umrah Rejsepakke',
    completePackageDesc: 'Fra din første henvendelse til din hjemkomst sikrer vi, at hvert trin af din pilgrimsrejse er glat, autentisk og åndeligt opfyldende',
    flights: 'Flybooking',
    flightsDesc: 'Komplet flyarrangementer fra Danmark til Saudi-Arabien',
    luxuryHotels: '4-5 Stjernede Hoteller',
    luxuryHotelsDesc: 'Luksusindkvartering tæt på Haram i Makkah og Madinah',
    visaProcessing: 'Visumudstedelse',
    visaProcessingDesc: 'Problemfri visumbehandling og arrangementer',
    transport: 'Jordtransport',
    transportDesc: 'Komfortabel lokal transport gennem hele din rejse',
    guidedTours: 'Seerah Ture',
    guidedToursDesc: 'Guidede besøg til historiske og religiøse steder',
    seerahTours: 'Åndelig Vejledning',
    seerahToursDesc: 'Eksklusive Umrah-forberedelsesseminarer og læringssessioner',
    umrahSeminar: 'Uddannelsessessioner',
    umrahSeminarDesc: 'Seminarer før afrejse for at forberede dig åndeligt',
    fullSupport: '24/7 Support',
    fullSupportDesc: 'Assistance på stedet fra dansk- og arabisktalende ledere',
    whyChooseTitle: 'Hvorfor Vælge Rehaal Travels?',
    ourMission: 'Vores Mission',
    ourMissionDesc: 'At gøre Umrah og Hajj tilgængelig, organiseret og åndeligt opfyldende. Vi leverer professionelle rejsetjenester forankret i islamiske værdier, uddanner og forbereder hver rejsende gennem seminarer før afrejse, og bygger et stærkt fællesskab af troende, der rejser med oprigtighed, refleksion og taknemmelighed.',
    ourPromise: 'Vores Vision',
    ourPromiseDesc: 'At være det førende islamiske rejsebureau i Skandinavien og Europa, der omdefinerer Umrah-oplevelsen gennem oprigtighed, komfort og enhed — og hjælper muslimer med at styrke deres forbindelse med Allah og deres tro gennem meningsfulde rejser.',
    satisfiedPilgrims: 'Vejledte Pilgrimme',
    yearsExperience: 'Årtiers Erfaring',
    halalGuarantee: 'Halal Garanti',
    supportDuringTrip: 'Support Under Rejsen',
    spiritualJourneyWaits: 'Din Åndelige Rejse Venter',
    quranVerse: '"Og forkynde for menneskene om pilgrimsfærden, så de kommer til dig til fods og på alle slags magre kameler, kommende fra alle fjerne egne."',
    quranReference: '- Koranen 22:27',
    umrahAllYear: 'Umrah Hele Året',
    umrahAllYearDesc: 'Opfyld din drøm om at besøge Kaaba når som helst',
    ramadanSpecials: 'Ramadan Specials',
    ramadanSpecialsDesc: 'Oplev den hellige måned i Makkah og Madinah',
    familyPackages: 'Familie Pakker',
    familyPackagesDesc: 'Tag hele familien med på den åndelige rejse',
    dontPostpone: 'Gør ikke udsæt din rejse!',
    motivationText: 'Hver dag er en mulighed for at komme tættere på Allah. Book din Umrah i dag og oplev den transformation, som hundredvis af pilgrimme har oplevet med Rehaal Travels.',
    seeAllTrips: 'Se Alle Rejser →',
    contactUsNow: 'Kontakt Os Nu',
    flexiblePayment: 'Fleksible betalingsplaner tilgængelige',
    earlyBooking: 'Tidlig booking rabatter',
    groupDiscounts: 'Gruppe rabatter',
    callUs: 'Ring til Os',
    callUsDesc: 'Har du spørgsmål? Vi er her for at hjælpe',
    seeContactInfo: 'Se Kontaktinfo →',
    faqTitle: 'Ofte Stillede Spørgsmål',
    faqDesc: 'Find svar på almindelige spørgsmål',
    readFaq: 'Læs FAQ →',
    galleryTitle: 'Se Vores Galleri',
    galleryDesc: 'Billeder fra tidligere rejser',
    visitGallery: 'Besøg Galleri →',
  },
  ar: {
    home: 'الرئيسية',
    about: 'من نحن',
    services: 'الخدمات',
    trips: 'الرحلات',
    gallery: 'المعرض',
    testimonials: 'الشهادات',
    contact: 'اتصل بنا',
    heroTitle: 'رحلتك الروحية تبدأ هنا',
    heroSubtitle: 'اختبر العمرة مع رحال ريسر - وكالة السفر الإسلامية الموثوقة في الدنمارك مع أكثر من 500 حاج راضٍ',
    bookJourney: 'احجز رحلتك',
    viewMore: 'عرض المزيد',
    aboutPreviewTitle: 'مرحبا بكم في رحال ريسر',
    tripsPreviewTitle: 'باقات العمرة القادمة',
    testimonialsPreviewTitle: 'ماذا يقول حجاجنا',
    faq: 'الأسئلة الشائعة',
    terms: 'الشروط والأحكام',
    privacy: 'سياسة الخصوصية',
    companyInfo: 'معلومات الشركة',
    quickLinks: 'روابط سريعة',
    legal: 'قانوني',
    followUs: 'تابعنا',
    allRightsReserved: '© 2025 رحال ريسر. جميع الحقوق محفوظة.',
    name: 'الاسم',
    email: 'البريد الإلكتروني',
    phone: 'الهاتف',
    message: 'الرسالة',
    submit: 'إرسال',
    destination: 'الوجهة',
    price: 'السعر',
    viewDetails: 'عرض التفاصيل',
    backToTrips: 'العودة إلى الرحلات',
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang && ['en', 'da', 'ar'].includes(savedLang)) {
      setLanguage(savedLang);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('language', language);
    if (language === 'ar') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
