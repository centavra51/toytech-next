export const locales = ["ru", "ro", "en"] as const;
export const defaultLocale = "ro";

export type Locale = (typeof locales)[number];

type ServiceTranslation = {
  title: string;
  desc: string;
  price: string;
  long_desc: string;
  seoTitle?: string;
  keywords?: string[];
};

export type Translation = {
  common: {
    title: string;
    phone: string;
    address: string;
    email: string;
    hoursWeekdays: string;
    hoursSaturday: string;
    instagram: string;
    facebook: string;
    tiktok: string;
  };
  nav: {
    services: string;
    about: string;
    reviews: string;
    faq: string;
    book: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta_book: string;
    cta_call: string;
    stat_experience: string;
    stat_repairs: string;
    stat_diagnosis: string;
    badge: string;
    price: string;
    price_text: string;
  };
  services: {
    label: string;
    title: string;
    subtitle: string;
    btn_more: string;
    s1: ServiceTranslation;
    s2: ServiceTranslation;
    s3: ServiceTranslation;
    s4: ServiceTranslation;
    s5: ServiceTranslation;
    s6: ServiceTranslation;
    s7: ServiceTranslation;
    s8: ServiceTranslation;
    s9: ServiceTranslation;
    s10: ServiceTranslation;
    s11: ServiceTranslation;
    s12: ServiceTranslation;
  };
  about: {
    label: string;
    title: string;
    desc: string;
    f1: string;
    f2: string;
    f3: string;
    f4: string;
    f5: string;
    f6: string;
    call_btn: string;
    since: string;
  };
  reviews: {
    label: string;
    title: string;
    subtitle: string;
    r1: {
      text: string;
      author: string;
      car: string;
    };
    r2: {
      text: string;
      author: string;
      car: string;
    };
  };
  faq: {
    label: string;
    title: string;
    subtitle: string;
    q1: string;
    a1: string;
    q2: string;
    a2: string;
    q3: string;
    a3: string;
  };
  cta: {
    title: string;
    subtitle: string;
    btn_call: string;
    btn_book: string;
  };
  footer: {
    brand_text: string;
    services: string;
    company: string;
    contacts: string;
    copyright: string;
  };
  form: {
    title: string;
    subtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    carLabel: string;
    carPlaceholder: string;
    dateLabel: string;
    serviceLabel: string;
    servicePlaceholder: string;
    submit: string;
    submitting: string;
    privacy: string;
    successTitle: string;
    successText: string;
    reset: string;
  };
  servicePage: {
    back: string;
    why: string;
    notFound: string;
  };
  admin: {
    title: string;
    subtitle: string;
    note: string;
    ctaSite: string;
  };
};

const sharedServices = {
  s1: {
    title: "Hybrid systems",
    desc: "Battery diagnostics, module restoration, inverter repair.",
    price: "Diagnostics",
    long_desc:
      "Comprehensive diagnostics and repair of hybrid batteries, balancing, module replacement, and inverter restoration for Toyota and Lexus hybrid systems.",
  },
  s2: {
    title: "Engine and mechanics",
    desc: "Engine repair, suspension work, difficult mechanical faults.",
    price: "Mechanics",
    long_desc:
      "From scheduled maintenance to major engine work, suspension repair, and elimination of complex mechanical issues with clear diagnostics first.",
  },
  s3: {
    title: "Electronics and tuning",
    desc: "ABS blocks, ECU diagnostics, chip tuning, coding.",
    price: "Electronics",
    long_desc:
      "Advanced diagnostics of control modules, ABS and ECU repair, firmware work, and careful electronic tuning where appropriate.",
  },
  s4: {
    title: "Exhaust system",
    desc: "Catalyst replacement, DPF/EGR solutions, welding work.",
    price: "Exhaust",
    long_desc:
      "Exhaust repair and optimization, catalyst replacement, welding, and emission-related troubleshooting with practical service advice.",
  },
  s5: {
    title: "Body work",
    desc: "Paint and body restoration after damage or wear.",
    price: "Body",
    long_desc:
      "Body repair, paint restoration, and cosmetic fixes that return the vehicle to a clean, factory-like appearance.",
  },
  s6: {
    title: "Motorcycles",
    desc: "Maintenance and repair for motorcycles and scooters.",
    price: "Moto",
    long_desc:
      "Mechanical maintenance, diagnostics, and repair for motorcycles and scooters with the same careful approach as our auto work.",
  },
  s7: {
    title: "Pre-purchase inspection",
    desc: "Before-you-buy diagnostics for hybrid and standard cars.",
    price: "Inspection",
    long_desc:
      "A detailed pre-purchase inspection to spot hidden hybrid, mechanical, and electronic issues before you commit to the car.",
  },
  s8: {
    title: "Wheel alignment",
    desc: "Steering geometry and tire wear correction.",
    price: "Alignment",
    long_desc:
      "Wheel alignment and chassis checks that improve handling, reduce tire wear, and help avoid repeat suspension issues.",
  },
  s9: {
    title: "Cooling system",
    desc: "Radiators, pumps, thermostats, cooling leaks.",
    price: "Cooling",
    long_desc:
      "Cooling system diagnostics and repair, including pumps, thermostats, radiators, and leak elimination for engine and hybrid cooling loops.",
  },
  s10: {
    title: "Transmission and gearbox",
    desc: "Diagnostics, service, and gearbox repair.",
    price: "Transmission",
    long_desc:
      "Transmission diagnostics, maintenance, and repair with a focus on smooth operation and prevention of expensive failures.",
  },
  s11: {
    title: "Oil change and maintenance",
    desc: "Scheduled service, fluids, filters, preventive care.",
    price: "Maintenance",
    long_desc:
      "Routine maintenance, oil and filter changes, and preventive checks that keep the car reliable between bigger repairs.",
  },
  s12: {
    title: "Air conditioning",
    desc: "AC refill, diagnostics, compressor and leak repair.",
    price: "AC Service",
    long_desc:
      "Air conditioning diagnostics and repair, including recharge, compressor work, leak detection, and cabin comfort restoration.",
  },
} as const;

const translations: Record<Locale, Translation> = {
  ru: {
    common: {
      title: "ToyTech Hybrid Specialist",
      phone: "+373 68 771 547",
      address: "Кишинев, ул. Grenoble 7",
      email: "toytechmd@gmail.com",
      hoursWeekdays: "Пн-Пт: 09:00 - 18:00",
      hoursSaturday: "Сб: 09:00 - 14:00",
      instagram: "https://www.instagram.com/toytech.md/",
      facebook: "https://www.facebook.com/ToyTech.md",
      tiktok: "https://tiktok.com/@toytech.md",
    },
    nav: {
      services: "Услуги",
      about: "О нас",
      reviews: "Отзывы",
      faq: "FAQ",
      book: "Записаться",
    },
    hero: {
      title: 'Ремонт гибридных автомобилей <span class="text-red-600">в Кишиневе</span>',
      subtitle:
        "Диагностика и ремонт батарей, инверторов и высоковольтных систем. Беремся за сложные случаи, где другие сервисы не справились.",
      cta_book: "Записаться на диагностику",
      cta_call: "Позвонить",
      stat_experience: "Лет опыта",
      stat_repairs: "Авто отремонтировано",
      stat_diagnosis: "Точная диагностика",
      badge: "ToyTech Hybrid Specialist",
      price: "10+ лет",
      price_text: "Гарантия на все работы",
    },
    services: {
      label: "Наши услуги",
      title: "Что мы ремонтируем",
      subtitle:
        "Полный спектр работ: от гибридных батарей и электроники до механики, кузова и регулярного обслуживания.",
      btn_more: "Подробнее",
      s1: {
        title: "Гибридные системы",
        desc: "Диагностика батареи, восстановление модулей, ремонт инвертора.",
        price: "Диагностика",
        long_desc:
          "Профессиональная диагностика и ремонт высоковольтных батарей, балансировка элементов, замена неисправных модулей и восстановление инверторов для гибридов Toyota и Lexus.",
      },
      s2: {
        title: "Двигатель и механика",
        desc: "Ремонт ДВС, ходовой части и сложных механических неисправностей.",
        price: "Механика",
        long_desc:
          "От планового ТО до капитального ремонта двигателя, работ по ходовой части и устранения сложных механических проблем с понятной диагностикой.",
      },
      s3: {
        title: "Электроника и тюнинг",
        desc: "ABS, ECU, диагностика блоков, прошивки и кодирование.",
        price: "Электроника",
        long_desc:
          "Глубокая диагностика электронных блоков управления, ремонт ABS и ECU, программные решения и аккуратный тюнинг там, где это действительно нужно.",
      },
      s4: {
        title: "Выхлопная система",
        desc: "Катализатор, DPF/EGR, сварочные работы и устранение проблем.",
        price: "Выхлоп",
        long_desc:
          "Ремонт и обслуживание выхлопной системы, замена катализаторов, сварка, диагностика ошибок и решение проблем с экологическими системами.",
      },
      s5: {
        title: "Кузовные работы",
        desc: "Покраска, восстановление кузова и косметический ремонт.",
        price: "Кузов",
        long_desc:
          "Кузовной ремонт, восстановление лакокрасочного покрытия и исправление внешних повреждений, чтобы вернуть автомобилю аккуратный вид.",
      },
      s6: {
        title: "Мотоциклы",
        desc: "Обслуживание и ремонт мотоциклов и скутеров.",
        price: "Мото",
        long_desc:
          "Диагностика, обслуживание и ремонт мотоциклов и скутеров с тем же вниманием к деталям, что и при работе с автомобилями.",
      },
      s7: {
        title: "Проверка перед покупкой",
        desc: "Комплексная проверка автомобиля перед сделкой.",
        price: "Осмотр",
        long_desc:
          "Полная пред покупочная диагностика, которая помогает выявить скрытые проблемы по гибриду, механике и электронике до покупки автомобиля.",
      },
      s8: {
        title: "Развал-схождение",
        desc: "Геометрия подвески и коррекция износа шин.",
        price: "Сход-развал",
        long_desc:
          "Проверка и настройка углов установки колес для стабильного управления, равномерного износа шин и продления ресурса подвески.",
      },
      s9: {
        title: "Система охлаждения",
        desc: "Радиаторы, помпы, термостаты, утечки и перегрев.",
        price: "Охлаждение",
        long_desc:
          "Диагностика и ремонт системы охлаждения двигателя и гибридных контуров: радиаторы, помпы, термостаты и устранение утечек.",
      },
      s10: {
        title: "Коробка передач",
        desc: "Диагностика, обслуживание и ремонт трансмиссии.",
        price: "Трансмиссия",
        long_desc:
          "Проверка состояния трансмиссии, профилактическое обслуживание и ремонт коробки передач для стабильной и мягкой работы автомобиля.",
      },
      s11: {
        title: "Замена масла и ТО",
        desc: "Регламентное обслуживание, фильтры, жидкости и профилактика.",
        price: "Обслуживание",
        long_desc:
          "Плановое техническое обслуживание, замена масла, фильтров и жидкостей, а также профилактические проверки для надежной эксплуатации авто.",
      },
      s12: {
        title: "Кондиционер",
        desc: "Заправка, диагностика, компрессор и устранение утечек.",
        price: "AC сервис",
        long_desc:
          "Диагностика и ремонт кондиционера, заправка, обслуживание компрессора, поиск утечек и восстановление нормального охлаждения салона.",
      },
    },
    about: {
      label: "О нас",
      title: 'ToyTech - это <span>команда специалистов</span>',
      desc:
        "Мы работаем с гибридными автомобилями более 10 лет и беремся за те случаи, где нужна не замена узлов вслепую, а точная диагностика и опыт.",
      f1: "10+ лет опыта",
      f2: "Специализация на гибридах",
      f3: "Сложные случаи",
      f4: "Проверенные запчасти",
      f5: "Честный ремонт",
      f6: "Полный цикл работ",
      call_btn: "+373 68 771 547",
      since: "Более 10 лет",
    },
    reviews: {
      label: "Отзывы",
      title: "Что говорят клиенты ToyTech",
      subtitle: "Сотни отремонтированных гибридов и довольных владельцев.",
      r1: {
        text: "Проблему с батареей на Prius решили быстро и без навязывания лишних замен. Все объяснили по-человечески.",
        author: "Алексей С.",
        car: "Toyota Prius 30",
      },
      r2: {
        text: "Сделали то, за что другие не брались: нашли реальную причину ошибки и восстановили машину без лишних расходов.",
        author: "Максим В.",
        car: "Lexus RX450h",
      },
    },
    faq: {
      label: "FAQ",
      title: "Вопросы и ответы",
      subtitle: "Коротко о том, что чаще всего спрашивают перед записью.",
      q1: "Сколько стоит диагностика?",
      a1: "Цена зависит от задачи и автомобиля. Точную стоимость озвучиваем после короткого первичного общения и понимания симптомов.",
      q2: "Сколько длится ремонт?",
      a2: "От нескольких часов до нескольких дней. Все зависит от сложности проблемы и наличия нужных деталей.",
      q3: "Есть ли гарантия?",
      a3: "Да, мы даем гарантию на выполненные работы и заранее объясняем условия по конкретному ремонту.",
    },
    cta: {
      title: "Запишитесь на диагностику",
      subtitle: "Оставьте заявку, и мы свяжемся с вами, чтобы подобрать удобное время визита.",
      btn_call: "Позвонить",
      btn_book: "Открыть форму",
    },
    footer: {
      brand_text:
        "Специализированный сервис по ремонту гибридных автомобилей в Кишиневе. Точная диагностика, сложные случаи и понятный сервис.",
      services: "Услуги",
      company: "ToyTech",
      contacts: "Контакты",
      copyright: "Все права защищены.",
    },
    form: {
      title: "Записаться на сервис",
      subtitle: "Оставьте свои данные, и мы подберем удобное время и формат консультации.",
      nameLabel: "Имя",
      namePlaceholder: "Алексей",
      phoneLabel: "Телефон",
      phonePlaceholder: "+373 68 000 000",
      carLabel: "Автомобиль",
      carPlaceholder: "Toyota Prius",
      dateLabel: "Желаемая дата",
      serviceLabel: "Услуга",
      servicePlaceholder: "Выберите услугу",
      submit: "Отправить заявку",
      submitting: "Отправка...",
      privacy: "Нажимая кнопку, вы соглашаетесь на обработку персональных данных для связи по заявке.",
      successTitle: "Заявка принята",
      successText: "Мы скоро свяжемся с вами, чтобы уточнить детали и подтвердить запись.",
      reset: "Отправить еще раз",
    },
    servicePage: {
      back: "Назад к услугам",
      why: "Почему ToyTech?",
      notFound: "Услуга не найдена.",
    },
    admin: {
      title: "Admin",
      subtitle: "Панель управления сейчас переводится на Next.js.",
      note: "Для продакшна мы оставили безопасный служебный экран вместо старой HTML-панели. Если нужна полноценная CMS-панель, ее лучше делать отдельным этапом.",
      ctaSite: "Открыть сайт",
    },
  },
  ro: {
    common: {
      title: "ToyTech Hybrid Specialist",
      phone: "+373 68 771 547",
      address: "Chisinau, str. Grenoble 7",
      email: "toytechmd@gmail.com",
      hoursWeekdays: "Lun-Vin: 09:00 - 18:00",
      hoursSaturday: "Sam: 09:00 - 14:00",
      instagram: "https://www.instagram.com/toytech.md/",
      facebook: "https://www.facebook.com/ToyTech.md",
      tiktok: "https://tiktok.com/@toytech.md",
    },
    nav: {
      services: "Servicii",
      about: "Despre noi",
      reviews: "Recenzii",
      faq: "FAQ",
      book: "Programare",
    },
    hero: {
      title: 'Reparatia masinilor hibride <span class="text-red-600">in Chisinau</span>',
      subtitle:
        "Diagnosticam si reparam baterii, invertoare si sisteme de inalta tensiune. Preluam inclusiv cazuri dificile.",
      cta_book: "Programeaza diagnosticul",
      cta_call: "Sunati",
      stat_experience: "Ani experienta",
      stat_repairs: "Masini reparate",
      stat_diagnosis: "Diagnostic precis",
      badge: "ToyTech Hybrid Specialist",
      price: "10+ ani",
      price_text: "Garantie pentru toate lucrarile",
    },
    services: {
      label: "Serviciile noastre",
      title: "Ce reparam",
      subtitle:
        "De la baterii hibride si electronica pana la mecanica, caroserie si mentenanta periodica.",
      btn_more: "Detalii",
      s1: {
        title: "Sisteme hibride",
        desc: "Diagnostic baterie, reconditionare module, reparatie invertor.",
        price: "Diagnostic",
        long_desc:
          "Diagnostic complet si reparatie pentru baterii hibride, balansare module, inlocuire elemente defecte si restaurare invertor.",
      },
      s2: {
        title: "Motor si mecanica",
        desc: "Reparatii motor, suspensie si defecte mecanice complexe.",
        price: "Mecanica",
        long_desc:
          "De la mentenanta de rutina pana la reparatii capitale ale motorului si suspensiei, cu diagnostic clar inainte de interventie.",
      },
      s3: {
        title: "Electronica si tuning",
        desc: "ABS, ECU, diagnoza module, soft si codari.",
        price: "Electronica",
        long_desc:
          "Diagnostic avansat pentru module electronice, reparatii ABS si ECU, lucrari software si optimizari realizate cu grija.",
      },
      s4: {
        title: "Sistem evacuare",
        desc: "Catalizator, DPF/EGR, sudura si rezolvare probleme.",
        price: "Evacuare",
        long_desc:
          "Reparatie si optimizare evacuare, inlocuire catalizator, sudura si solutionarea problemelor legate de emisii.",
      },
      s5: {
        title: "Lucrari de caroserie",
        desc: "Vopsire, restaurare si reparatii exterioare.",
        price: "Caroserie",
        long_desc:
          "Reparatii de caroserie si finisaj pentru a readuce masina la un aspect curat si ingrijit.",
      },
      s6: {
        title: "Motociclete",
        desc: "Service si reparatii pentru motociclete si scutere.",
        price: "Moto",
        long_desc:
          "Diagnostic, mentenanta si reparatii pentru motociclete si scutere, cu aceeasi atentie la detalii.",
      },
      s7: {
        title: "Inspectie inainte de cumparare",
        desc: "Verificare completa a masinii inainte de tranzactie.",
        price: "Inspectie",
        long_desc:
          "Inspectie tehnica amanuntita pentru a descoperi probleme ascunse la sistemele hibride, mecanice si electronice.",
      },
      s8: {
        title: "Geometrie roti",
        desc: "Corectie unghiuri, directie si uzura pneuri.",
        price: "Geometrie",
        long_desc:
          "Reglaj geometrie pentru stabilitate mai buna, uzura uniforma a anvelopelor si protectia suspensiei.",
      },
      s9: {
        title: "Sistem de racire",
        desc: "Radiatoare, pompe, termostate si eliminare scurgeri.",
        price: "Racire",
        long_desc:
          "Diagnostic si reparatie pentru sistemul de racire al motorului si al componentelor hibride.",
      },
      s10: {
        title: "Cutie de viteze",
        desc: "Diagnostic, intretinere si reparatie transmisie.",
        price: "Transmisie",
        long_desc:
          "Verificare si reparatie transmisie pentru functionare lina si prevenirea defectiunilor costisitoare.",
      },
      s11: {
        title: "Schimb ulei si mentenanta",
        desc: "Service periodic, filtre, lichide si verificari.",
        price: "Mentenanta",
        long_desc:
          "Service regulat cu schimb de ulei, filtre si verificari preventive pentru functionare sigura.",
      },
      s12: {
        title: "Aer conditionat",
        desc: "Incarcare freon, diagnostic, compresor si scurgeri.",
        price: "AC Service",
        long_desc:
          "Diagnostic si reparatie pentru sistemul de climatizare, inclusiv reincarcare, compresor si detectare scurgeri.",
      },
    },
    about: {
      label: "Despre noi",
      title: 'ToyTech este o <span>echipa de specialisti</span>',
      desc:
        "Lucram cu masini hibride de peste 10 ani si preferam diagnosticul corect in locul inlocuirilor facute la intamplare.",
      f1: "10+ ani experienta",
      f2: "Specializare pe hibride",
      f3: "Cazuri dificile",
      f4: "Piese verificate",
      f5: "Service corect",
      f6: "Ciclu complet de lucrari",
      call_btn: "+373 68 771 547",
      since: "Peste 10 ani",
    },
    reviews: {
      label: "Recenzii",
      title: "Ce spun clientii ToyTech",
      subtitle: "Rezultate reale pentru proprietari de hibride din Chisinau.",
      r1: {
        text: "Au gasit rapid problema bateriei si au explicat clar fiecare pas. Fara costuri ascunse.",
        author: "Alexei S.",
        car: "Toyota Prius 30",
      },
      r2: {
        text: "Singurul service care a mers pana la cauza reala a erorii. Masina merge perfect dupa reparatie.",
        author: "Maxim V.",
        car: "Lexus RX450h",
      },
    },
    faq: {
      label: "FAQ",
      title: "Intrebari frecvente",
      subtitle: "Raspunsuri scurte inainte de programare.",
      q1: "Cat costa diagnosticul?",
      a1: "Pretul depinde de simptom si de model. Confirmam costul dupa o discutie initiala scurta.",
      q2: "Cat dureaza reparatia?",
      a2: "De la cateva ore la cateva zile, in functie de complexitate si de piesele necesare.",
      q3: "Oferiti garantie?",
      a3: "Da, explicam conditiile de garantie inainte de lucrare si le confirmam dupa reparatie.",
    },
    cta: {
      title: "Programeaza un diagnostic",
      subtitle: "Trimite cererea si revenim rapid ca sa stabilim un timp convenabil.",
      btn_call: "Sunati",
      btn_book: "Deschide formularul",
    },
    footer: {
      brand_text:
        "Service specializat pentru masini hibride in Chisinau. Diagnostic precis, cazuri dificile si comunicare clara.",
      services: "Servicii",
      company: "ToyTech",
      contacts: "Contacte",
      copyright: "Toate drepturile rezervate.",
    },
    form: {
      title: "Programare service",
      subtitle: "Lasati datele si revenim cu o confirmare si o ora convenabila.",
      nameLabel: "Nume",
      namePlaceholder: "Alex",
      phoneLabel: "Telefon",
      phonePlaceholder: "+373 68 000 000",
      carLabel: "Masina",
      carPlaceholder: "Toyota Prius",
      dateLabel: "Data dorita",
      serviceLabel: "Serviciu",
      servicePlaceholder: "Selectati serviciul",
      submit: "Trimite cererea",
      submitting: "Se trimite...",
      privacy: "Prin trimitere sunteti de acord cu prelucrarea datelor pentru a fi contactat.",
      successTitle: "Cererea a fost primita",
      successText: "Va contactam in curand pentru confirmare si detalii.",
      reset: "Trimite din nou",
    },
    servicePage: {
      back: "Inapoi la servicii",
      why: "De ce ToyTech?",
      notFound: "Serviciul nu a fost gasit.",
    },
    admin: {
      title: "Admin",
      subtitle: "Panoul vechi HTML a fost scos din fluxul public.",
      note: "Pentru publicare pe Vercel am lasat o pagina sigura de service in locul panoului legacy. O versiune completa de administrare merita implementata separat.",
      ctaSite: "Deschide site-ul",
    },
  },
  en: {
    common: {
      title: "ToyTech Hybrid Specialist",
      phone: "+373 68 771 547",
      address: "Chisinau, Grenoble 7",
      email: "toytechmd@gmail.com",
      hoursWeekdays: "Mon-Fri: 09:00 - 18:00",
      hoursSaturday: "Sat: 09:00 - 14:00",
      instagram: "https://www.instagram.com/toytech.md/",
      facebook: "https://www.facebook.com/ToyTech.md",
      tiktok: "https://tiktok.com/@toytech.md",
    },
    nav: {
      services: "Services",
      about: "About",
      reviews: "Reviews",
      faq: "FAQ",
      book: "Book Now",
    },
    hero: {
      title: 'Hybrid car repair <span class="text-red-600">in Chisinau</span>',
      subtitle:
        "We diagnose and repair batteries, inverters, and high-voltage systems. We also take on difficult cases other shops could not solve.",
      cta_book: "Book diagnostics",
      cta_call: "Call now",
      stat_experience: "Years of experience",
      stat_repairs: "Cars repaired",
      stat_diagnosis: "Accurate diagnostics",
      badge: "ToyTech Hybrid Specialist",
      price: "10+ years",
      price_text: "Warranty on all work",
    },
    services: {
      label: "Our services",
      title: "What we repair",
      subtitle:
        "From hybrid batteries and electronics to mechanics, body work, and routine maintenance.",
      btn_more: "Learn more",
      s1: sharedServices.s1,
      s2: sharedServices.s2,
      s3: sharedServices.s3,
      s4: sharedServices.s4,
      s5: sharedServices.s5,
      s6: sharedServices.s6,
      s7: sharedServices.s7,
      s8: sharedServices.s8,
      s9: sharedServices.s9,
      s10: sharedServices.s10,
      s11: sharedServices.s11,
      s12: sharedServices.s12,
    },
    about: {
      label: "About us",
      title: 'ToyTech is a <span>team of specialists</span>',
      desc:
        "We have worked with hybrid vehicles for more than 10 years and focus on real diagnostics instead of blind part replacement.",
      f1: "10+ years of experience",
      f2: "Hybrid specialization",
      f3: "Complex cases",
      f4: "Trusted parts",
      f5: "Honest repair",
      f6: "Full service cycle",
      call_btn: "+373 68 771 547",
      since: "More than 10 years",
    },
    reviews: {
      label: "Reviews",
      title: "What ToyTech clients say",
      subtitle: "Real results for hybrid owners across Chisinau.",
      r1: {
        text: "They solved the battery issue quickly and explained every step clearly. No unnecessary replacements.",
        author: "Alex S.",
        car: "Toyota Prius 30",
      },
      r2: {
        text: "The only shop that found the real source of the fault. The car has been running perfectly since the repair.",
        author: "Max V.",
        car: "Lexus RX450h",
      },
    },
    faq: {
      label: "FAQ",
      title: "Questions and answers",
      subtitle: "A few things clients usually ask before booking.",
      q1: "How much does diagnostics cost?",
      a1: "The final price depends on the car and the symptom. We confirm the cost after a short initial discussion.",
      q2: "How long does repair take?",
      a2: "Anywhere from a few hours to a few days depending on the issue and parts availability.",
      q3: "Do you provide a warranty?",
      a3: "Yes, we provide a warranty for completed work and explain the terms before the repair starts.",
    },
    cta: {
      title: "Book a diagnostic visit",
      subtitle: "Leave a request and we will contact you to arrange a convenient time.",
      btn_call: "Call now",
      btn_book: "Open the form",
    },
    footer: {
      brand_text:
        "A specialized hybrid car service in Chisinau focused on accurate diagnostics, difficult repairs, and clear communication.",
      services: "Services",
      company: "ToyTech",
      contacts: "Contacts",
      copyright: "All rights reserved.",
    },
    form: {
      title: "Book a service visit",
      subtitle: "Leave your details and we will get back to you with timing and confirmation.",
      nameLabel: "Name",
      namePlaceholder: "Alex",
      phoneLabel: "Phone",
      phonePlaceholder: "+373 68 000 000",
      carLabel: "Car",
      carPlaceholder: "Toyota Prius",
      dateLabel: "Preferred date",
      serviceLabel: "Service",
      servicePlaceholder: "Select a service",
      submit: "Send request",
      submitting: "Sending...",
      privacy: "By submitting the form, you agree to be contacted regarding your request.",
      successTitle: "Request received",
      successText: "We will contact you shortly to confirm the details.",
      reset: "Send another request",
    },
    servicePage: {
      back: "Back to services",
      why: "Why ToyTech?",
      notFound: "Service not found.",
    },
    admin: {
      title: "Admin",
      subtitle: "The old HTML panel has been removed from the public flow.",
      note: "For Vercel readiness we replaced the legacy admin page with a safe service screen. A full admin interface should be implemented as a separate feature.",
      ctaSite: "Open website",
    },
  },
};

export const getTranslations = (locale: string): Translation => {
  if (locale in translations) {
    return translations[locale as Locale];
  }

  return translations[defaultLocale];
};
