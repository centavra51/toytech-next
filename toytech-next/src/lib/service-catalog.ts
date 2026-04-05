import { locales, type Locale, type Translation } from "./i18n";

type ServiceKey =
  | "s1"
  | "s2"
  | "s3"
  | "s4"
  | "s5"
  | "s6"
  | "s7"
  | "s8"
  | "s9"
  | "s10"
  | "s11"
  | "s12";

type ServiceSeoEntry = {
  title: string;
  seoTitle: string;
  desc: string;
  long_desc: string;
  keywords: string[];
};

export const serviceCatalog: Record<Locale, Record<ServiceKey, ServiceSeoEntry>> = {
  ru: {
    s1: {
      title: "Диагностика гибридных систем",
      seoTitle:
        "Ремонт гибридов в Кишинёве — профессиональная диагностика высоковольтной батареи на Ботанике",
      desc: "Высоковольтная батарея, модули, инвертор и полная гибридная диагностика.",
      long_desc: `В условиях молдавских дорог, пыли, частых пробок и не всегда качественного топлива высоковольтные батареи гибридных автомобилей изнашиваются заметно быстрее, чем в Европе. Самые распространённые проблемы в 2025–2026 годах — деградация отдельных модулей, потеря ёмкости до 40 %, перегрев инвертора и характерные ошибки P0A80, P0A7F.

В сервисе toytech.md на Ботанике мы проводим полную диагностику гибридных систем за 40–60 минут. Используем профессиональное оборудование: оригинальные сканеры Techstream, GTS, HDS и специализированные тестеры. Измеряем напряжение каждого модуля, проверяем изоляцию, температуру под нагрузкой и работу инвертора.

Если батарея ещё не полностью вышла из строя, в toytech.md выполняем восстановление модулей — пересборку с заменой слабых ячеек. Это позволяет вернуть 85–95 % исходной ёмкости и сэкономить до 70 % по сравнению с покупкой новой батареи. Также успешно ремонтируем инверторы: замена IGBT-модулей, качественная пайка, перепрошивка.

В toytech.md работаем только с проверенными компонентами и даём гарантию на выполненные работы.

Запишитесь на диагностику гибридов в Кишинёве в сервисе toytech.md уже сегодня. Приезжайте на Ботанику в сервис ToyTech.md — вернём вашему гибриду вторую жизнь.`,
      keywords: [
        "ремонт гибридов Кишинев",
        "диагностика высоковольтной батареи",
        "ремонт гибридной батареи на Ботанике",
        "восстановление батареи Prius Кишинев",
        "ремонт инвертора RAV4 Hybrid Ботаника",
        "диагностика гибрида Toyota Chisinau",
        "замена модулей Lexus hybrid Botanica",
        "ремонт батареи Honda hybrid Кишинёв",
      ],
    },
    s2: {
      title: "Механика: ДВС и ходовая",
      seoTitle:
        "Ремонт ДВС и ходовой в Кишинёве — сложная механика авто на Ботанике",
      desc: "Ремонт ДВС, подвески, ГРМ, течей масла и сложной механики.",
      long_desc: `Молдавские дороги и качество топлива часто приводят к ускоренному износу цепей ГРМ, двухмассовых маховиков, сайлентблоков, рычагов подвески и турбин. В сервисе toytech.md на Ботанике мы выполняем полный спектр механических работ: ремонт и капитальный ремонт двигателя, восстановление ходовой части, замену цепей и ремней ГРМ, устранение течей масла и сложных механических неисправностей.

Особое внимание уделяем гибридным автомобилям с циклом Аткинсона, где важна точность фаз газораспределения. Работы проводятся в два этапа: точная компьютерная диагностика и тщательная дефектовка с фото- и видеофиксацией.

В toytech.md используем качественные запчасти: оригинал и проверенные аналоги. Даём гарантию на выполненные работы.

Запишитесь на ремонт ДВС и ходовой в Кишинёве уже сегодня. Приезжайте на Ботанику в сервис ToyTech.md — вернём вашему автомобилю надёжность и комфорт.`,
      keywords: [
        "ремонт двигателя Кишинев",
        "ремонт ходовой Кишинёв",
        "механика авто на Ботанике",
        "капитальный ремонт ДВС Toyota Кишинев",
        "замена цепи ГРМ RAV4 Ботаника",
        "ремонт подвески Camry hybrid Chisinau",
        "устранение течи масла Lexus Botanica",
      ],
    },
    s3: {
      title: "Электроника и тюнинг",
      seoTitle:
        "Диагностика электроники авто в Кишинёве — прошивки ECU и ремонт ABS на Ботанике",
      desc: "ABS, ECU, блоки управления, прошивки, кодирование и чип-тюнинг.",
      long_desc: `Современные автомобили напичканы электроникой, и даже небольшая неисправность блока управления может привести к потере мощности, ошибкам ABS/ESP или полному отказу систем. В сервисе toytech.md на Ботанике мы проводим глубокую диагностику и ремонт электроники: ABS, ECU, блоков управления, датчиков, а также выполняем прошивки, кодирование и чип-тюнинг.

Работаем со всеми популярными марками, включая европейские, японские и корейские авто. Устраняем сбои электроники, восстанавливаем работу иммобилайзера, климат-контроля и мультимедиа.

В toytech.md используем профессиональное диагностическое оборудование и даём гарантию на выполненные работы.

Запишитесь на диагностику электроники в Кишинёве уже сегодня. Приезжайте на Ботанику в сервис ToyTech.md — решим любую электронную проблему вашего автомобиля.`,
      keywords: [
        "диагностика ECU Кишинев",
        "ремонт ABS Кишинёв",
        "прошивки блока управления",
        "чип тюнинг ECU Toyota Кишинев",
        "ремонт ABS RAV4 Ботаника",
        "кодирование иммобилайзера Camry Chisinau",
        "прошивка блока управления Lexus Botanica",
      ],
    },
    s4: {
      title: "Выхлопная система",
      seoTitle:
        "Ремонт выхлопной системы в Кишинёве — катализатор, DPF, EGR на Ботанике",
      desc: "Катализатор, DPF, EGR, сварка, замена глушителей и выхлоп.",
      long_desc: `Забитый катализатор, забитый DPF-фильтр или проблемы с EGR — частые причины потери мощности, повышенного расхода топлива и ошибок Check Engine. В сервисе toytech.md на Ботанике мы выполняем полный ремонт выхлопной системы: диагностику, замену и удаление катализатора, чистку или удаление DPF и EGR, сварочные работы и замену глушителей.

Работаем с учётом экологических норм и особенностей эксплуатации в Молдове. После ремонта автомобиль получает лучшую динамику и проходит диагностику без ошибок.

В toytech.md используем качественные материалы и даём гарантию на выполненные работы.

Запишитесь на ремонт выхлопа в Кишинёве уже сегодня. Приезжайте на Ботанику в сервис ToyTech.md — устраним проблемы с выхлопной системой быстро и надёжно.`,
      keywords: [
        "ремонт выхлопной системы Кишинев",
        "замена катализатора Кишинёв",
        "удаление DPF Toyota Кишинев",
        "чистка EGR RAV4 Ботаника",
        "замена глушителя Camry Chisinau",
        "ремонт катализатора Lexus Botanica",
      ],
    },
    s5: {
      title: "Кузовные работы",
      seoTitle:
        "Кузовной ремонт и покраска авто в Кишинёве — восстановление кузова на Ботанике",
      desc: "Рихтовка, сварка, восстановление геометрии, покраска и антикор.",
      long_desc: `После ДТП или из-за коррозии кузов требует профессионального вмешательства. В сервисе toytech.md на Ботанике мы выполняем полный цикл кузовных работ: рихтовку, сварку, восстановление геометрии, локальную и полную покраску, косметический ремонт и антикоррозийную обработку.

Используем современное оборудование и качественные лакокрасочные материалы. Все работы ведутся с точным подбором цвета и соблюдением заводских технологий.

В toytech.md даём гарантию на выполненные кузовные работы.

Запишитесь на кузовной ремонт в Кишинёве уже сегодня. Приезжайте на Ботанику в сервис ToyTech.md — вернём вашему автомобилю заводской вид.`,
      keywords: [
        "кузовной ремонт Кишинев",
        "покраска авто Кишинёв",
        "рихтовка кузова после ДТП Ботаника",
        "антикоррозийная обработка Toyota Chisinau",
        "полная покраска RAV4 Botanica",
        "косметический ремонт Camry Кишинёв",
      ],
    },
    s6: {
      title: "Ремонт мотоциклов и скутеров",
      seoTitle:
        "Ремонт мотоциклов и скутеров в Кишинёве — обслуживание мототехники на Ботанике",
      desc: "Диагностика и ремонт мотоциклов, скутеров, карбюраторов и электрики.",
      long_desc: `Мотоциклы и скутеры требуют регулярного и квалифицированного обслуживания. В сервисе toytech.md на Ботанике мы предлагаем полный спектр услуг: диагностику, замену расходников, ремонт двигателя, ходовой части, электроники, карбюраторов и инжекторов.

Работаем со всеми популярными марками мотоциклов и скутеров. Устраняем проблемы с запуском, перегревом, потерей мощности и электрикой.

В toytech.md используем качественные запчасти и даём гарантию на выполненные работы.

Запишитесь на ремонт мотоцикла в Кишинёве уже сегодня. Приезжайте на Ботанику в сервис ToyTech.md — подготовим вашу мототехнику к сезону.`,
      keywords: [
        "ремонт мотоциклов Кишинев",
        "обслуживание скутеров Ботаника",
        "ремонт двигателя мотоцикла Toyota Chisinau",
        "замена карбюратора скутера Botanica",
        "диагностика электроники мото Кишинёв",
      ],
    },
    s7: {
      title: "Осмотр перед покупкой",
      seoTitle:
        "Проверка автомобиля перед покупкой в Кишинёве — комплексная диагностика на Ботанике",
      desc: "Полная проверка авто перед покупкой с фотоотчётом и рекомендациями.",
      long_desc: `Покупка подержанного авто — это всегда риск. В сервисе toytech.md на Ботанике мы проводим комплексный осмотр автомобиля перед покупкой: диагностику двигателя, ходовой, электроники, кузова, толщиномер лакокрасочного покрытия, проверку юридической чистоты и историю пробега.

Получите подробный отчёт с фото и рекомендациями — покупайте автомобиль уверенно, без скрытых дефектов.

В toytech.md работаем объективно и даём гарантию на качество диагностики.

Запишитесь на проверку авто перед покупкой в Кишинёве уже сегодня. Приезжайте на Ботанику в сервис ToyTech.md — защитим вас от неудачной покупки.`,
      keywords: [
        "осмотр авто перед покупкой Кишинев",
        "проверка автомобиля Ботаника",
        "диагностика перед покупкой Toyota Chisinau",
        "толщиномер кузова RAV4 Botanica",
        "проверка истории Camry hybrid Кишинёв",
      ],
    },
    s8: {
      title: "Сход-развал",
      seoTitle:
        "Развал-схождение в Кишинёве — компьютерная геометрия подвески на Ботанике",
      desc: "Компьютерный сход-развал и точная геометрия подвески.",
      long_desc: `Неправильные углы установки колёс приводят к быстрому износу резины, уводу автомобиля и ухудшению управляемости. В сервисе toytech.md на Ботанике мы выполняем точный компьютерный сход-развал на современном стенде, корректируем геометрию подвески и устраняем причины неравномерного износа шин.

Рекомендуем делать развал-схождение после ремонта ходовой, замены шин или попадания в глубокую яму.

В toytech.md даём гарантию на качество выполненных работ.

Запишитесь на сход-развал в Кишинёве уже сегодня. Приезжайте на Ботанику в сервис ToyTech.md — сохраните резину и улучшите управляемость автомобиля.`,
      keywords: [
        "сход-развал Кишинев",
        "развал-схождение Ботаника",
        "компьютерный сход-развал Toyota Chisinau",
        "геометрия подвески RAV4 Botanica",
        "коррекция углов Camry hybrid Кишинёв",
      ],
    },
    s9: {
      title: "Система охлаждения",
      seoTitle:
        "Ремонт системы охлаждения в Кишинёве — радиаторы, помпы, термостаты на Ботанике",
      desc: "Радиаторы, помпы, термостаты, утечки антифриза и перегрев.",
      long_desc: `Перегрев двигателя — одна из самых опасных неисправностей. В сервисе toytech.md на Ботанике мы ремонтируем систему охлаждения: замену радиаторов, водяных помп, термостатов, расширительных бачков, устранение утечек антифриза и чистку системы.

Предотвращаем дорогостоящий ремонт ГБЦ и двигателя благодаря своевременному обслуживанию.

В toytech.md используем качественные комплектующие и даём гарантию на работы.

Запишитесь на ремонт системы охлаждения в Кишинёве уже сегодня. Приезжайте на Ботанику в сервис ToyTech.md — защитим двигатель от перегрева.`,
      keywords: [
        "ремонт охлаждения Кишинев",
        "замена помпы Ботаника",
        "замена радиатора Toyota Chisinau",
        "ремонт термостата RAV4 Botanica",
        "устранение перегрева Camry hybrid Кишинёв",
      ],
    },
    s10: {
      title: "Трансмиссия и коробка передач",
      seoTitle:
        "Ремонт коробки передач в Кишинёве — диагностика и обслуживание трансмиссии на Ботанике",
      desc: "АКПП, вариатор, робот, механика, соленоиды и мехатроники.",
      long_desc: `Проблемы с АКПП, вариатором, роботом или механикой проявляются рывками, пробуксовкой, задержками переключения или ошибками. В сервисе toytech.md на Ботанике мы проводим диагностику, обслуживание и ремонт всех типов трансмиссий: замена масла, ремонт гидроблоков, соленоидов, сцеплений и мехатроников.

Работаем аккуратно и с учётом особенностей каждой коробки.

В toytech.md даём гарантию на выполненный ремонт трансмиссии.

Запишитесь на ремонт коробки передач в Кишинёве уже сегодня. Приезжайте на Ботанику в сервис ToyTech.md — восстановим плавность и надёжность трансмиссии.`,
      keywords: [
        "ремонт АКПП Кишинев",
        "диагностика коробки передач Ботаника",
        "ремонт вариатора Toyota Chisinau",
        "замена масла АКПП RAV4 Botanica",
        "ремонт мехатроника Camry hybrid Кишинёв",
      ],
    },
    s11: {
      title: "Замена масла и ТО",
      seoTitle:
        "Техническое обслуживание и замена масла в Кишинёве — регламентное ТО на Ботанике",
      desc: "Замена масла, фильтров, жидкостей и регламентное ТО.",
      long_desc: `Регулярное ТО — основа долгой и беспроблемной эксплуатации автомобиля. В сервисе toytech.md на Ботанике мы выполняем полное регламентное обслуживание: замену масла и фильтров, всех технических жидкостей, свечей, ремней и проводим компьютерную диагностику.

Работаем строго по заводским интервалам с учётом условий эксплуатации в Молдове.

В toytech.md используем качественные масла и запчасти и даём гарантию на работы.

Запишитесь на ТО и замену масла в Кишинёве уже сегодня. Приезжайте на Ботанику в сервис ToyTech.md — продлим жизнь вашего автомобиля.`,
      keywords: [
        "замена масла Кишинев",
        "ТО авто Ботаника",
        "регламентное ТО Toyota Chisinau",
        "замена фильтров RAV4 Botanica",
        "обслуживание по пробегу Camry hybrid Кишинёв",
      ],
    },
    s12: {
      title: "Сервис кондиционера",
      seoTitle:
        "Заправка и ремонт кондиционера авто в Кишинёве — AC сервис на Ботанике",
      desc: "Диагностика, заправка, утечки, компрессор и чистка AC.",
      long_desc: `Летом без исправного кондиционера ездить невозможно. В сервисе toytech.md на Ботанике мы предлагаем полный AC сервис: диагностику, заправку фреоном, поиск и устранение утечек, ремонт или замену компрессора, чистку системы и замену салонного фильтра.

Устраняем неприятные запахи и восстанавливаем холодопроизводительность.

В toytech.md работаем с современным оборудованием и даём гарантию на выполненные работы.

Запишитесь на ремонт кондиционера в Кишинёве уже сегодня. Приезжайте на Ботанику в сервис ToyTech.md — сделаем салон вашего авто прохладным и комфортным.`,
      keywords: [
        "заправка кондиционера Кишинев",
        "ремонт AC авто Ботаника",
        "диагностика компрессора Toyota Chisinau",
        "устранение утечек фреона RAV4 Botanica",
        "чистка системы кондиционирования Camry hybrid Кишинёв",
      ],
    },
  },
  ro: {
    s1: {
      title: "Diagnoza sistemelor hibride",
      seoTitle:
        "Reparații hibrizi în Chișinău — diagnostică profesională a bateriei de înaltă tensiune pe Botanica",
      desc: "Baterie de înaltă tensiune, module, invertor și diagnoză completă hybrid.",
      long_desc: `În condițiile drumurilor din Moldova, prafului, ambuteiajelor frecvente și calității nu întotdeauna bune a combustibilului, bateriile de înaltă tensiune ale automobilelor hibride se uzează vizibil mai rapid decât în Europa. Cele mai frecvente probleme în 2025–2026 sunt degradarea modulelor individuale, pierderea capacității până la 40 %, supraîncălzirea invertorului și erorile caracteristice P0A80, P0A7F.

La service-ul toytech.md pe Botanica efectuăm diagnosticarea completă a sistemelor hibride în 40–60 de minute. Utilizăm echipamente profesionale: scanere originale Techstream, GTS, HDS și testere specializate. Măsurăm tensiunea fiecărui modul, verificăm izolarea, temperatura sub sarcină și funcționarea invertorului.

Dacă bateria nu este complet defectă, în toytech.md realizăm restaurarea modulelor — reasamblarea cu înlocuirea celulelor slabe. Acest lucru permite recuperarea a 85–95 % din capacitatea inițială și economisirea până la 70 % față de achiziționarea unei baterii noi. Reparăm cu succes și invertorii: înlocuirea modulelor IGBT, lipire de calitate, reprogramare.

La toytech.md lucrăm doar cu componente verificate și oferim garanție pentru lucrările efectuate.

Programați-vă acum la diagnostică hibrizi în Chișinău la service-ul toytech.md. Veniți pe Botanica în service-ul ToyTech.md — redăm a doua viață hibridului dumneavoastră.`,
      keywords: [
        "reparatii hibrizi Chisinau",
        "diagnoza baterie inalta tensiune",
        "reparatie baterie hibrida Botanica",
        "restaurare baterie Prius Chisinau",
        "reparatie invertor RAV4 Hybrid Botanica",
        "diagnoza hibrid Toyota Chișinău",
        "inlocuire module Lexus hybrid Botanica",
      ],
    },
    s2: {
      title: "Motor și suspensie",
      seoTitle:
        "Reparații motor și suspensie în Chișinău — mecanică complexă auto pe Botanica",
      desc: "Motor, suspensie, distribuție, scurgeri de ulei și mecanică grea.",
      long_desc: `Drumurile moldovenești și calitatea combustibilului duc adesea la uzura accelerată a lanțurilor de distribuție, volantelor bimase, bucșelor, brațelor de suspensie și turbinelor. La service-ul toytech.md pe Botanica efectuăm întreg spectrul de lucrări mecanice: repararea și revizia capitală a motorului, restaurarea suspensiei, înlocuirea lanțurilor și curelelor de distribuție, eliminarea scurgerilor de ulei și a defecțiunilor mecanice complexe.

Acordăm atenție specială automobilelor hibride cu ciclu Atkinson, unde precizia fazelor de distribuție este crucială. Lucrările se desfășoară în două etape: diagnosticare computerizată precisă și defectare detaliată cu fixare foto și video.

La toytech.md folosim piese de calitate: originale și analoguri verificate. Oferim garanție pentru lucrările efectuate.

Programați-vă la repararea motorului și suspensiei în Chișinău chiar astăzi. Veniți pe Botanica în service-ul ToyTech.md — redăm fiabilitate și confort automobilului dumneavoastră.`,
      keywords: [
        "reparatii motor Chisinau",
        "reparatii suspensie Chișinău",
        "mecanica auto Botanica",
        "revizie capitala motor Toyota Chisinau",
        "inlocuire lant distributie RAV4 Botanica",
        "reparatie suspensie Camry hybrid Chișinău",
        "eliminare scurgeri ulei Lexus Botanica",
      ],
    },
    s3: {
      title: "Electronică și tuning",
      seoTitle:
        "Diagnoză electronică auto în Chișinău — programări ECU și reparare ABS pe Botanica",
      desc: "ABS, ECU, module, soft, codări și chip-tuning.",
      long_desc: `Automobilele moderne sunt pline de electronice, iar o defecțiune minoră a blocului de comandă poate duce la pierderea puterii, erori ABS/ESP sau refuz complet al sistemelor. La service-ul toytech.md pe Botanica efectuăm diagnosticare profundă și reparare a electronicii: ABS, ECU, blocuri de comandă, senzori, precum și programări, codări și chip-tuning.

Lucrăm cu toate mărcile populare, inclusiv auto europene, japoneze și coreene. Eliminăm bug-urile electronice, restaurăm funcționarea imobilizatorului, climatizării și multimedia.

La toytech.md folosim echipamente profesionale de diagnosticare și oferim garanție pentru lucrările efectuate.

Programați-vă la diagnoza electronică în Chișinău chiar astăzi. Veniți pe Botanica în service-ul ToyTech.md — rezolvăm orice problemă electronică a automobilului dumneavoastră.`,
      keywords: [
        "diagnoza ECU Chisinau",
        "reparatii ABS Chișinău",
        "programari ECU",
        "chip tuning ECU Toyota Chisinau",
        "reparatie ABS RAV4 Botanica",
        "codare imobilizator Camry Chișinău",
        "programare bloc Lexus Botanica",
      ],
    },
    s4: {
      title: "Sistem evacuare",
      seoTitle:
        "Reparații sistem evacuare în Chișinău — catalizator, DPF, EGR pe Botanica",
      desc: "Catalizator, DPF, EGR, sudură, tobe și soluții pentru evacuare.",
      long_desc: `Catalizatorul înfundat, filtrul DPF înfundat sau problemele cu EGR sunt cauze frecvente ale pierderii puterii, consumului crescut de combustibil și erorilor Check Engine. La service-ul toytech.md pe Botanica efectuăm repararea completă a sistemului de evacuare: diagnosticare, înlocuire și eliminare catalizator, curățare sau eliminare DPF și EGR, lucrări de sudură și înlocuire tobe.

Lucrăm ținând cont de normele ecologice și particularitățile exploatării în Moldova. După reparație, automobilul capătă o dinamică mai bună și trece diagnosticarea fără erori.

La toytech.md folosim materiale de calitate și oferim garanție pentru lucrările efectuate.

Programați-vă la repararea sistemului de evacuare în Chișinău chiar astăzi. Veniți pe Botanica în service-ul ToyTech.md — eliminăm problemele sistemului de evacuare rapid și sigur.`,
      keywords: [
        "reparatii sistem evacuare Chisinau",
        "inlocuire catalizator Chișinău",
        "eliminare DPF Toyota Chisinau",
        "curatare EGR RAV4 Botanica",
        "inlocuire toba Camry Chișinău",
        "reparatie catalizator Lexus Botanica",
      ],
    },
    s5: {
      title: "Reparații caroserie",
      seoTitle:
        "Reparații caroserie și vopsire auto în Chișinău — restaurare caroserie pe Botanica",
      desc: "Îndreptare, sudură, geometrie, vopsire și protecție anticorozivă.",
      long_desc: `După accidente sau din cauza coroziunii, caroseria necesită intervenție profesională. La service-ul toytech.md pe Botanica efectuăm întreg ciclul de lucrări de caroserie: îndreptare, sudură, restaurarea geometriei, vopsire locală și completă, reparații cosmetice și tratament anticoroziv.

Folosim echipamente moderne și materiale de vopsire de calitate. Toate lucrările se efectuează cu potrivire precisă a culorii și respectarea tehnologiilor de fabrică.

La toytech.md oferim garanție pentru lucrările de caroserie efectuate.

Programați-vă la repararea caroseriei în Chișinău chiar astăzi. Veniți pe Botanica în service-ul ToyTech.md — redăm automobilului dumneavoastră aspectul de fabrică.`,
      keywords: [
        "reparatii caroserie Chisinau",
        "vopsire auto Chișinău",
        "indreptare caroserie dupa accident Botanica",
        "tratament anticoroziv Toyota Chisinau",
        "vopsire completa RAV4 Botanica",
        "reparatii cosmetice Camry Chișinău",
      ],
    },
    s6: {
      title: "Reparații motociclete și scutere",
      seoTitle:
        "Reparații motociclete și scutere în Chișinău — service mototehnică pe Botanica",
      desc: "Diagnoză și reparații pentru moto, scutere, carburatoare și electrică.",
      long_desc: `Motocicletele și scuterele necesită întreținere regulată și calificată. La service-ul toytech.md pe Botanica oferim întreg spectrul de servicii: diagnosticare, înlocuire consumabile, reparare motor, șasiu, electronică, carburatoare și injectoare.

Lucrăm cu toate mărcile populare de motociclete și scutere. Eliminăm problemele de pornire, supraîncălzire, pierdere de putere și electricitate.

La toytech.md folosim piese de calitate și oferim garanție pentru lucrările efectuate.

Programați-vă la repararea motocicletei în Chișinău chiar astăzi. Veniți pe Botanica în service-ul ToyTech.md — pregătim mototehnica dumneavoastră pentru sezon.`,
      keywords: [
        "reparatii motociclete Chisinau",
        "service scutere Botanica",
        "reparare motor motocicleta Toyota Chisinau",
        "inlocuire carburator scuter Botanica",
        "diagnoza electronica moto Chișinău",
      ],
    },
    s7: {
      title: "Verificare înainte de cumpărare",
      seoTitle:
        "Verificare auto înainte de cumpărare în Chișinău — diagnostică complexă pe Botanica",
      desc: "Inspecție completă auto cu raport foto și recomandări clare.",
      long_desc: `Cumpărarea unui auto second-hand este întotdeauna un risc. La service-ul toytech.md pe Botanica efectuăm o inspecție complexă a automobilului înainte de cumpărare: diagnosticare motor, șasiu, electronică, caroserie, măsurare grosime vopsea, verificare istoric juridic și istoric parcurs.

Primiți un raport detaliat cu poze și recomandări — cumpărați automobilul cu încredere, fără defecte ascunse.

La toytech.md lucrăm obiectiv și oferim garanție pentru calitatea diagnosticării.

Programați-vă la verificarea auto înainte de cumpărare în Chișinău chiar astăzi. Veniți pe Botanica în service-ul ToyTech.md — vă protejăm de o achiziție nereușită.`,
      keywords: [
        "verificare auto inainte de cumparare Chisinau",
        "inspectie auto Botanica",
        "diagnosticare inainte de cumparare Toyota Chisinau",
        "masurare grosime vopsea RAV4 Botanica",
        "verificare istoric Camry hybrid Chișinău",
      ],
    },
    s8: {
      title: "Aliniere roți",
      seoTitle:
        "Aliniere roți în Chișinău — geometrie computerizată suspensie pe Botanica",
      desc: "Aliniere computerizată și geometrie corectă a suspensiei.",
      long_desc: `Unghiurile incorecte de aliniere a roților duc la uzura rapidă a cauciucurilor, devierea automobilului și deteriorarea manevrabilității. La service-ul toytech.md pe Botanica efectuăm o aliniere precisă computerizată pe stand modern, corectăm geometria suspensiei și eliminăm cauzele uzurii neuniforme a anvelopelor.

Recomandăm alinierea după repararea suspensiei, înlocuirea anvelopelor sau lovirea unei gropi adânci.

La toytech.md oferim garanție pentru calitatea lucrărilor efectuate.

Programați-vă la aliniere roți în Chișinău chiar astăzi. Veniți pe Botanica în service-ul ToyTech.md — economisiți cauciucurile și îmbunătățiți manevrabilitatea automobilului.`,
      keywords: [
        "aliniere roti Chisinau",
        "geometrie suspensie Botanica",
        "aliniere computerizata Toyota Chisinau",
        "geometrie suspensie RAV4 Botanica",
        "corectie unghiuri Camry hybrid Chișinău",
      ],
    },
    s9: {
      title: "Sistem de răcire",
      seoTitle:
        "Reparații sistem răcire în Chișinău — radiatoare, pompe, termostate pe Botanica",
      desc: "Radiatoare, pompe, termostate, antigel și eliminarea supraîncălzirii.",
      long_desc: `Supraîncălzirea motorului este una dintre cele mai periculoase defecțiuni. La service-ul toytech.md pe Botanica reparăm sistemul de răcire: înlocuire radiatoare, pompe de apă, termostate, vase de expansiune, eliminare scurgeri antigel și curățare sistem.

Prevenim reparațiile costisitoare ale chiulasei și motorului prin întreținere la timp.

La toytech.md folosim componente de calitate și oferim garanție pentru lucrări.

Programați-vă la repararea sistemului de răcire în Chișinău chiar astăzi. Veniți pe Botanica în service-ul ToyTech.md — protejăm motorul de supraîncălzire.`,
      keywords: [
        "reparatii sistem racire Chisinau",
        "inlocuire pompa Botanica",
        "inlocuire radiator Toyota Chisinau",
        "reparatie termostat RAV4 Botanica",
        "eliminare supraincalzire Camry hybrid Chișinău",
      ],
    },
    s10: {
      title: "Transmisie și cutie de viteze",
      seoTitle:
        "Reparații cutie de viteze în Chișinău — diagnosticare și întreținere transmisie pe Botanica",
      desc: "Cutie automată, CVT, robot, manuală, solenoizi și mecatronică.",
      long_desc: `Problemele cu cutia automată, variator, robot sau mecanică se manifestă prin smucituri, patinare, întârzieri la schimbare sau erori. La service-ul toytech.md pe Botanica efectuăm diagnosticare, întreținere și reparare a tuturor tipurilor de transmisii: înlocuire ulei, reparare bloc hidraulic, solenoizi, ambreiaje și mecatronice.

Lucrăm cu atenție și ținând cont de particularitățile fiecărei cutii.

La toytech.md oferim garanție pentru repararea transmisiei efectuate.

Programați-vă la repararea cutiei de viteze în Chișinău chiar astăzi. Veniți pe Botanica în service-ul ToyTech.md — restabilim fluiditatea și fiabilitatea transmisiei.`,
      keywords: [
        "reparatii cutie viteze Chisinau",
        "diagnosticare transmisie Botanica",
        "reparatie variator Toyota Chisinau",
        "inlocuire ulei cutie automata RAV4 Botanica",
        "reparatie mecatronica Camry hybrid Chișinău",
      ],
    },
    s11: {
      title: "Schimb ulei și întreținere",
      seoTitle:
        "Întreținere tehnică și schimb ulei în Chișinău — revizie tehnică pe Botanica",
      desc: "Schimb ulei, filtre, lichide și revizie periodică completă.",
      long_desc: `Întreținerea regulată este baza unei exploatări lungi și fără probleme a automobilului. La service-ul toytech.md pe Botanica efectuăm întreținere tehnică completă: schimb ulei și filtre, toate lichidele tehnice, bujii, curele și diagnosticare computerizată.

Lucrăm strict după intervalele de fabrică ținând cont de condițiile de exploatare în Moldova.

La toytech.md folosim uleiuri și piese de calitate și oferim garanție pentru lucrări.

Programați-vă la revizie tehnică și schimb ulei în Chișinău chiar astăzi. Veniți pe Botanica în service-ul ToyTech.md — prelungim viața automobilului dumneavoastră.`,
      keywords: [
        "schimb ulei Chisinau",
        "revizie tehnica Botanica",
        "revizie tehnica Toyota Chisinau",
        "inlocuire filtre RAV4 Botanica",
        "intretinere dupa km Camry hybrid Chișinău",
      ],
    },
    s12: {
      title: "Service AC",
      seoTitle:
        "Încărcare și reparare aer condiționat auto în Chișinău — service AC pe Botanica",
      desc: "Diagnoză, freon, scurgeri, compresor și curățare sistem AC.",
      long_desc: `Vara, fără un aer condiționat funcțional, condusul este imposibil. La service-ul toytech.md pe Botanica oferim service AC complet: diagnosticare, încărcare cu freon, căutare și eliminare scurgeri, reparare sau înlocuire compresor, curățare sistem și înlocuire filtru habitaclu.

Eliminăm mirosurile neplăcute și restabilim performanța de răcire.

La toytech.md lucrăm cu echipamente moderne și oferim garanție pentru lucrările efectuate.

Programați-vă la repararea aerului condiționat în Chișinău chiar astăzi. Veniți pe Botanica în service-ul ToyTech.md — facem habitaclul automobilului dumneavoastră răcoros și confortabil.`,
      keywords: [
        "incarcare aer conditionat Chisinau",
        "reparatii climatizare auto Botanica",
        "diagnosticare compresor Toyota Chisinau",
        "eliminare scurgeri freon RAV4 Botanica",
        "curatare sistem climatizare Camry hybrid Chișinău",
      ],
    },
  },
  en: {
    s1: {
      title: "Hybrid System Diagnostics",
      seoTitle:
        "Hybrid Repair in Chisinau — Professional High-Voltage Battery Diagnostics on Botanica",
      desc: "High-voltage battery, module restoration, inverter repair and full hybrid diagnostics.",
      long_desc: `In the conditions of Moldovan roads, dust, frequent traffic jams and not always high-quality fuel, high-voltage batteries of hybrid vehicles wear out noticeably faster than in Europe. The most common issues in 2025–2026 are degradation of individual modules, capacity loss up to 40%, inverter overheating and typical errors P0A80, P0A7F.

At the service toytech.md on Botanica we perform complete hybrid system diagnostics in 40–60 minutes. We use professional equipment: original Techstream, GTS, HDS scanners and specialized testers. We measure the voltage of each module, check insulation, temperature under load and inverter performance.

If the battery is not completely dead, at toytech.md we carry out module restoration — reassembly with replacement of weak cells. This allows returning 85–95% of the original capacity and saving up to 70% compared to buying a new battery. We also successfully repair inverters: IGBT module replacement, high-quality soldering, and reprogramming.

At toytech.md we work only with verified components and provide warranty on all performed work.

Book hybrid diagnostics in Chisinau at the service toytech.md today. Come to Botanica at ToyTech.md service — we will give your hybrid a second life.`,
      keywords: [
        "hybrid repair Chisinau",
        "high voltage battery diagnostics",
        "hybrid battery repair Botanica",
        "Prius battery restoration Chisinau",
        "RAV4 Hybrid inverter repair Botanica",
        "Toyota hybrid diagnostics Chișinău",
        "Lexus hybrid module replacement Botanica",
      ],
    },
    s2: {
      title: "Engine and Suspension Repair",
      seoTitle:
        "Engine and Suspension Repair in Chisinau — Complex Auto Mechanics on Botanica",
      desc: "Engine repair, suspension work, timing service, oil leaks and complex mechanics.",
      long_desc: `Moldovan roads and fuel quality often cause accelerated wear of timing chains, dual-mass flywheels, silent blocks, suspension arms and turbines. At the service toytech.md on Botanica we perform the full range of mechanical work: engine repair and overhaul, suspension restoration, timing chain and belt replacement, oil leak elimination and complex mechanical fault fixing.

Special attention is paid to hybrid vehicles with Atkinson cycle, where timing precision is critical. Work is carried out in two stages: precise computer diagnostics and detailed defecting with photo and video recording.

At toytech.md we use quality parts, both OEM and verified analogues, and provide warranty on all performed work.

Book engine and suspension repair in Chisinau today. Come to Botanica at ToyTech.md service — we will restore reliability and comfort to your car.`,
      keywords: [
        "engine repair Chisinau",
        "suspension repair Botanica",
        "auto mechanics Chisinau",
        "Toyota engine overhaul Chisinau",
        "RAV4 timing chain replacement Botanica",
        "Camry hybrid suspension repair Chișinău",
        "Lexus oil leak fix Botanica",
      ],
    },
    s3: {
      title: "Electronics and Tuning",
      seoTitle:
        "Electronics and Tuning Diagnostics in Chisinau — ECU Flashing and ABS Repair on Botanica",
      desc: "ABS, ECU, control units, coding, software flashing and chip tuning.",
      long_desc: `Modern cars are packed with electronics, and even a small control unit fault can cause power loss, ABS/ESP errors or complete system failure. At the service toytech.md on Botanica we perform deep electronics diagnostics and repair: ABS, ECU, control units, sensors, as well as flashing, coding and chip-tuning.

We work with all popular brands, including European, Japanese and Korean cars. We fix electronics glitches, restore immobilizer, climate control and multimedia operation.

At toytech.md we use professional diagnostic equipment and provide warranty on all performed work.

Book electronics diagnostics in Chisinau today. Come to Botanica at ToyTech.md service — we will solve any electronic problem of your car.`,
      keywords: [
        "ECU diagnostics Chisinau",
        "ABS repair Botanica",
        "ECU flashing",
        "Toyota ECU chip tuning Chisinau",
        "RAV4 ABS repair Botanica",
        "Camry immobilizer coding Chișinău",
        "Lexus control unit flashing Botanica",
      ],
    },
    s4: {
      title: "Exhaust System Repair",
      seoTitle:
        "Exhaust System Repair in Chisinau — Catalyst, DPF, EGR on Botanica",
      desc: "Catalyst, DPF, EGR, welding, mufflers and complete exhaust service.",
      long_desc: `Clogged catalyst, clogged DPF filter or EGR problems are common causes of power loss, increased fuel consumption and Check Engine errors. At the service toytech.md on Botanica we perform complete exhaust system repair: diagnostics, replacement and removal of catalyst, cleaning or removal of DPF and EGR, welding works and muffler replacement.

We work taking into account environmental standards and operating features in Moldova. After repair, the car gets better dynamics and passes diagnostics without errors.

At toytech.md we use quality materials and provide warranty on all performed work.

Book exhaust repair in Chisinau today. Come to Botanica at ToyTech.md service — we will fix exhaust system problems quickly and reliably.`,
      keywords: [
        "exhaust system repair Chisinau",
        "catalyst replacement Botanica",
        "Toyota DPF removal Chisinau",
        "RAV4 EGR cleaning Botanica",
        "Camry muffler replacement Chișinău",
        "Lexus catalyst repair Botanica",
      ],
    },
    s5: {
      title: "Body Repair and Painting",
      seoTitle:
        "Body Repair and Painting in Chisinau — Body Restoration on Botanica",
      desc: "Straightening, welding, geometry restoration, painting and anti-corrosion treatment.",
      long_desc: `After accidents or due to corrosion, the body requires professional intervention. At the service toytech.md on Botanica we perform a full cycle of bodywork: straightening, welding, geometry restoration, local and full painting, cosmetic repair and anti-corrosion treatment.

We use modern equipment and quality paints. All work is carried out with precise color matching and compliance with factory technologies.

At toytech.md we provide warranty on all bodywork performed.

Book body repair in Chisinau today. Come to Botanica at ToyTech.md service — we will restore the factory look to your car.`,
      keywords: [
        "body repair Chisinau",
        "car painting Botanica",
        "post-accident body straightening Botanica",
        "Toyota anti-corrosion treatment Chisinau",
        "RAV4 full paint Botanica",
        "Camry cosmetic repair Chișinău",
      ],
    },
    s6: {
      title: "Motorcycle and Scooter Repair",
      seoTitle:
        "Motorcycle and Scooter Repair in Chisinau — Mototech Service on Botanica",
      desc: "Diagnostics and repair for motorcycles, scooters, carburetors and electrical systems.",
      long_desc: `Motorcycles and scooters require regular and qualified maintenance. At the service toytech.md on Botanica we offer a full range of services: diagnostics, consumables replacement, engine repair, chassis, electronics, carburetors and injectors.

We work with all popular motorcycle and scooter brands. We fix starting problems, overheating, power loss and electrical issues.

At toytech.md we use quality parts and provide warranty on all performed work.

Book motorcycle repair in Chisinau today. Come to Botanica at ToyTech.md service — we will prepare your mototech for the season.`,
      keywords: [
        "motorcycle repair Chisinau",
        "scooter service Botanica",
        "motorcycle engine repair Toyota Chisinau",
        "scooter carburetor replacement Botanica",
        "moto electronics diagnostics Chișinău",
      ],
    },
    s7: {
      title: "Pre-Purchase Inspection",
      seoTitle:
        "Pre-Purchase Car Inspection in Chisinau — Comprehensive Diagnostics on Botanica",
      desc: "Full before-you-buy inspection with photo report and practical recommendations.",
      long_desc: `Buying a used car is always a risk. At the service toytech.md on Botanica we perform a comprehensive pre-purchase car inspection: engine, chassis, electronics, body diagnostics, paint thickness measurement, legal history check and mileage history.

Receive a detailed report with photos and recommendations — buy the car with confidence, without hidden defects.

At toytech.md we work objectively and provide warranty on diagnostic quality.

Book pre-purchase car check in Chisinau today. Come to Botanica at ToyTech.md service — we will protect you from an unsuccessful purchase.`,
      keywords: [
        "pre-purchase car inspection Chisinau",
        "vehicle check Botanica",
        "Toyota pre-purchase diagnostics Chisinau",
        "RAV4 body thickness gauge Botanica",
        "Camry hybrid history check Chișinău",
      ],
    },
    s8: {
      title: "Wheel Alignment",
      seoTitle:
        "Wheel Alignment in Chisinau — Computer Suspension Geometry on Botanica",
      desc: "Precise computer alignment and suspension geometry correction.",
      long_desc: `Incorrect wheel alignment angles cause rapid tire wear, car pulling and reduced handling. At the service toytech.md on Botanica we perform precise computer wheel alignment on a modern stand, correct suspension geometry and eliminate causes of uneven tire wear.

We recommend alignment after suspension repair, tire replacement or hitting a deep pothole.

At toytech.md we provide warranty on the quality of work performed.

Book wheel alignment in Chisinau today. Come to Botanica at ToyTech.md service — save your tires and improve car handling.`,
      keywords: [
        "wheel alignment Chisinau",
        "suspension geometry Botanica",
        "Toyota computer alignment Chisinau",
        "RAV4 suspension geometry Botanica",
        "Camry hybrid angle correction Chișinău",
      ],
    },
    s9: {
      title: "Cooling System Repair",
      seoTitle:
        "Cooling System Repair in Chisinau — Radiators, Pumps, Thermostats on Botanica",
      desc: "Radiators, water pumps, thermostats, coolant leaks and overheating protection.",
      long_desc: `Engine overheating is one of the most dangerous faults. At the service toytech.md on Botanica we repair the cooling system: radiator replacement, water pumps, thermostats, expansion tanks, antifreeze leak elimination and system cleaning.

We prevent expensive cylinder head and engine repair through timely maintenance.

At toytech.md we use quality components and provide warranty on work.

Book cooling system repair in Chisinau today. Come to Botanica at ToyTech.md service — we will protect the engine from overheating.`,
      keywords: [
        "cooling system repair Chisinau",
        "pump replacement Botanica",
        "Toyota radiator replacement Chisinau",
        "RAV4 thermostat repair Botanica",
        "Camry hybrid overheating fix Chișinău",
      ],
    },
    s10: {
      title: "Transmission and Gearbox Repair",
      seoTitle:
        "Transmission Repair in Chisinau — Gearbox Diagnostics and Service on Botanica",
      desc: "Automatic, CVT, robot and manual gearbox diagnostics, service and repair.",
      long_desc: `Problems with automatic transmission, CVT, robot or manual appear as jerks, slippage, shifting delays or errors. At the service toytech.md on Botanica we perform diagnostics, maintenance and repair of all types of transmissions: oil change, valve body repair, solenoids, clutches and mechatronics.

We work carefully and taking into account the features of each gearbox.

At toytech.md we provide warranty on the transmission repair performed.

Book gearbox repair in Chisinau today. Come to Botanica at ToyTech.md service — we will restore smoothness and reliability of the transmission.`,
      keywords: [
        "transmission repair Chisinau",
        "gearbox diagnostics Botanica",
        "Toyota CVT repair Chisinau",
        "RAV4 automatic oil change Botanica",
        "Camry hybrid mechatronics repair Chișinău",
      ],
    },
    s11: {
      title: "Technical Maintenance and Oil Change",
      seoTitle:
        "Technical Maintenance and Oil Change in Chisinau — Scheduled Service on Botanica",
      desc: "Oil change, filters, fluids and scheduled maintenance under one roof.",
      long_desc: `Regular maintenance is the basis of long and trouble-free car operation. At the service toytech.md on Botanica we perform full scheduled maintenance: oil and filter change, all technical fluids, spark plugs, belts and computer diagnostics.

We work strictly according to factory intervals taking into account operating conditions in Moldova.

At toytech.md we use quality oils and parts and provide warranty on work.

Book maintenance and oil change in Chisinau today. Come to Botanica at ToyTech.md service — we will extend the life of your car.`,
      keywords: [
        "oil change Chisinau",
        "car maintenance Botanica",
        "Toyota scheduled service Chisinau",
        "RAV4 filter replacement Botanica",
        "Camry hybrid mileage maintenance Chișinău",
      ],
    },
    s12: {
      title: "Car Air Conditioning Service",
      seoTitle:
        "Car Air Conditioning Service in Chisinau — AC Service on Botanica",
      desc: "AC diagnostics, recharge, leak detection, compressor repair and cabin comfort.",
      long_desc: `In summer, driving without a working air conditioner is impossible. At the service toytech.md on Botanica we offer full AC service: diagnostics, freon refilling, leak detection and elimination, compressor repair or replacement, system cleaning and cabin filter replacement.

We eliminate unpleasant odors and restore cooling performance.

At toytech.md we work with modern equipment and provide warranty on all performed work.

Book air conditioner repair in Chisinau today. Come to Botanica at ToyTech.md service — we will make your car interior cool and comfortable.`,
      keywords: [
        "AC recharge Chisinau",
        "car air conditioning repair Botanica",
        "Toyota compressor diagnostics Chisinau",
        "RAV4 freon leak fix Botanica",
        "Camry hybrid AC system cleaning Chișinău",
      ],
    },
  },
};

export const relatedServices: Record<ServiceKey, ServiceKey[]> = {
  s1: ["s3", "s9", "s10"],
  s2: ["s8", "s9", "s10"],
  s3: ["s1", "s4", "s12"],
  s4: ["s3", "s12", "s2"],
  s5: ["s7", "s2", "s8"],
  s6: ["s3", "s11", "s2"],
  s7: ["s1", "s2", "s5"],
  s8: ["s2", "s7", "s11"],
  s9: ["s2", "s10", "s12"],
  s10: ["s2", "s9", "s11"],
  s11: ["s2", "s9", "s12"],
  s12: ["s9", "s3", "s11"],
};

export function applyServiceCatalog(
  translations: Record<Locale, Translation>,
): Record<Locale, Translation> {
  return Object.fromEntries(
    locales.map((locale) => {
      const translation = structuredClone(translations[locale]);
      const localeCatalog = serviceCatalog[locale];

      for (const serviceId of Object.keys(localeCatalog) as ServiceKey[]) {
        translation.services[serviceId] = {
          ...translation.services[serviceId],
          ...localeCatalog[serviceId],
        };
      }

      return [locale, translation];
    }),
  ) as Record<Locale, Translation>;
}
