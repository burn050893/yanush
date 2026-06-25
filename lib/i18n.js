// Lightweight i18n dictionary for YANUSH Cars
export const LANGS = [
  { code: 'nl', label: 'NL', name: 'Nederlands' },
  { code: 'fr', label: 'FR', name: 'Français' },
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'tr', label: 'TR', name: 'Türkçe' },
  { code: 'bg', label: 'BG', name: 'Български' },
];

export const dict = {
  nl: {
    nav: { home: 'Home', fleet: 'Wagenpark', sell: 'Auto Verkopen', services: 'Services', about: 'Over Ons', contact: 'Contact' },
    hero: { title: 'YANUSH Cars', subtitle: 'Premium uitstraling zonder exclusief te zijn', tagline: 'Uw betrouwbare partner in tweedehands voertuigen.', cta1: 'Wagenpark', cta2: 'Over Ons', cta3: 'Contact' },
    home: { latest: 'Nieuwste Auto\'s', latestSub: 'Onze recent toegevoegde voertuigen', viewAll: 'Bekijk alle auto\'s', services: 'Onze Diensten', servicesSub: 'Professionele ondersteuning voor al uw mobiliteitsbehoeften' },
    fleet: { title: 'Ons Wagenpark', subtitle: 'Ontdek onze premium selectie', search: 'Zoeken...', brand: 'Merk', price: 'Prijs', fuel: 'Brandstof', gearbox: 'Versnellingsbak', all: 'Alle', noResults: 'Geen auto\'s gevonden', interested: 'Interesse via WhatsApp', viewDetails: 'Details' },
    car: { year: 'Jaar', km: 'KM', fuel: 'Brandstof', gearbox: 'Versnellingsbak', price: 'Prijs', back: 'Terug naar wagenpark' },
    sell: { title: 'Verkoop Uw Auto', subtitle: 'Vul het formulier in en wij contacteren u snel', name: 'Naam', phone: 'Telefoon', email: 'Email', brand: 'Merk', model: 'Model', year: 'Jaar', mileage: 'Kilometerstand', message: 'Beschrijving / Staat', photos: 'Foto\'s uploaden', submit: 'Verstuur', success: 'Bedankt! We nemen snel contact op.', uploading: 'Versturen...' },
    services: {
      title: 'Onze Diensten',
      subtitle: 'Professionele ondersteuning voor al uw mobiliteitsbehoeften',
      s1: 'Belgische Keuring',
      s1d: 'Begeleiding en voorbereiding van voertuigen voor wettelijke keuring en verkoopkeuring in België.',
      s1l: 'Wij nemen het volledige keuringsproces uit handen — van technische voorbereiding tot administratieve afhandeling. Elke wagen wordt zorgvuldig nagekeken zodat hij in één keer slaagt. Of het nu gaat om een periodieke controle of een verkoopkeuring, u krijgt een duidelijk en eerlijk resultaat. Geen verrassingen, geen omwegen.',
      s2: '24/7 Takeldienst',
      s2d: 'Dag en nacht beschikbaar voor het veilig takelen en verplaatsen van voertuigen bij pech of ongeval.',
      s2l: 'Een pech of ongeval houdt zich niet aan kantooruren — wij ook niet. Onze takelwagens zijn uitgerust om elk type voertuig vakkundig en zonder schade te bergen. Korte reactietijden in heel België, met directe communicatie via telefoon of WhatsApp. Eén oproep volstaat om u verder te helpen.',
      s3: 'Pechhulp',
      s3d: 'Snelle interventie bij technische problemen zodat u snel weer onderweg bent.',
      s3l: 'Een lekke band, een lege accu of een motor die het laat afweten? Onze technieker komt ter plaatse om het probleem op te lossen of een veilige doorverwijzing te organiseren. Vakkundig, betrouwbaar en altijd met respect voor uw tijd. Zo bent u onderweg in goede handen.',
      s4: 'Voertuigtransport',
      s4d: 'Betrouwbaar en veilig transport van voertuigen doorheen België.',
      s4l: 'Of het nu gaat om een aankoop, een verkoop of een wagen die naar de garage moet — wij verzorgen het transport van A naar B. Open of gesloten transport, telkens met de juiste verzekeringen en met respect voor uw voertuig. Discreet, op tijd en zonder zorgen. Een service van topniveau, zonder topprijs.'
    },
    about: { title: 'Over YANUSH Cars', p1: 'Met meer dan 5 jaar ervaring is YANUSH Cars uitgegroeid tot een gerenommeerde premium autohandel.', p2: 'Wij focussen op kwaliteit, betrouwbaarheid en transparantie. Honderden tevreden klanten en verkochte voertuigen spreken voor zich.', p3: 'Elke wagen wordt zorgvuldig geselecteerd en gecontroleerd voor verkoop.', exp: 'Jaar ervaring', sold: 'Verkochte voertuigen', trust: 'Tevreden klanten' },
    contact: { title: 'Contact', address: 'Adres', phone: 'Telefoon', whatsapp: 'WhatsApp', vat: 'BTW', name: 'Naam', email: 'Email', message: 'Bericht', send: 'Versturen', sent: 'Bedankt voor uw bericht!' },
    usp: {
      t1: 'Ervaren Specialist', t1d: 'Meer dan 5 jaar actief in de automobielsector.',
      t2: 'Keuringsklaar', t2d: 'Voertuigen conform de Belgische normen.',
      t3: 'Kwaliteit Gegarandeerd', t3d: 'Een selectie waarop u kunt vertrouwen.',
      t4: '100+ Leveringen', t4d: 'Klanten tevreden de weg op geholpen.'
    },
    footer: { rights: 'Alle rechten voorbehouden', made: 'Premium autohandel sinds 2020' }
  },
  fr: {
    nav: { home: 'Accueil', fleet: 'Parc Auto', sell: 'Vendre', services: 'Services', about: 'À propos', contact: 'Contact' },
    hero: { title: 'YANUSH Cars', subtitle: 'Une allure premium, accessible à tous', tagline: 'Votre partenaire de confiance en véhicules d\'occasion.', cta1: 'Parc Auto', cta2: 'À propos', cta3: 'Contact' },
    home: { latest: 'Nouveautés', latestSub: 'Nos véhicules récemment ajoutés', viewAll: 'Voir toutes les voitures', services: 'Nos Services', servicesSub: 'Un accompagnement professionnel pour tous vos besoins de mobilité' },
    fleet: { title: 'Notre Parc', subtitle: 'Découvrez notre sélection premium', search: 'Rechercher...', brand: 'Marque', price: 'Prix', fuel: 'Carburant', gearbox: 'Boîte', all: 'Tous', noResults: 'Aucune voiture trouvée', interested: 'Intéressé via WhatsApp', viewDetails: 'Détails' },
    car: { year: 'Année', km: 'KM', fuel: 'Carburant', gearbox: 'Boîte', price: 'Prix', back: 'Retour au parc' },
    sell: { title: 'Vendez Votre Voiture', subtitle: 'Remplissez le formulaire, nous vous contactons rapidement', name: 'Nom', phone: 'Téléphone', email: 'Email', brand: 'Marque', model: 'Modèle', year: 'Année', mileage: 'Kilométrage', message: 'Description / État', photos: 'Télécharger photos', submit: 'Envoyer', success: 'Merci! Nous vous contactons bientôt.', uploading: 'Envoi...' },
    services: {
      title: 'Nos Services',
      subtitle: 'Un accompagnement professionnel pour tous vos besoins de mobilité',
      s1: 'Contrôle Technique Belge',
      s1d: 'Préparation et accompagnement complets pour le contrôle technique périodique et de revente.',
      s1l: 'Nous prenons en charge l\'ensemble du processus — préparation mécanique, vérifications et formalités administratives. Chaque véhicule est minutieusement préparé afin de passer le contrôle du premier coup. Que ce soit un contrôle périodique ou un contrôle de revente, vous obtenez un résultat clair et honnête. Sans détour, sans imprévu.',
      s2: 'Dépannage 24/7',
      s2d: 'Disponibles jour et nuit pour le remorquage et le déplacement sécurisé de votre véhicule.',
      s2l: 'Une panne ou un accident n\'attend pas les heures de bureau — nous non plus. Nos dépanneuses sont équipées pour prendre en charge tout type de véhicule sans dommage. Temps d\'intervention réduit partout en Belgique, communication directe par téléphone ou WhatsApp. Un seul appel suffit.',
      s3: 'Assistance Routière',
      s3d: 'Intervention rapide en cas de panne pour vous remettre vite sur la route.',
      s3l: 'Pneu crevé, batterie à plat ou moteur capricieux ? Notre technicien se déplace pour résoudre le problème sur place ou organiser un transfert sécurisé. Compétent, fiable et toujours respectueux de votre temps. Sur la route, vous êtes entre de bonnes mains.',
      s4: 'Transport de Véhicules',
      s4d: 'Transport fiable et sécurisé de véhicules à travers toute la Belgique.',
      s4l: 'Achat, revente ou simple transfert vers le garage — nous nous chargeons du trajet de A à B. Transport ouvert ou fermé, toujours avec les assurances adéquates et le plus grand soin. Discret, ponctuel, sans tracas. Un service haut de gamme, accessible à tous.'
    },
    about: { title: 'À propos de YANUSH Cars', p1: 'Avec plus de 5 ans d\'expérience, YANUSH Cars est devenu un concessionnaire premium reconnu.', p2: 'Nous mettons l\'accent sur la qualité, la fiabilité et la transparence.', p3: 'Chaque véhicule est soigneusement sélectionné et contrôlé.', exp: 'Années d\'expérience', sold: 'Véhicules vendus', trust: 'Clients satisfaits' },
    contact: { title: 'Contact', address: 'Adresse', phone: 'Téléphone', whatsapp: 'WhatsApp', vat: 'TVA', name: 'Nom', email: 'Email', message: 'Message', send: 'Envoyer', sent: 'Merci pour votre message!' },
    usp: {
      t1: 'Spécialiste Expérimenté', t1d: 'Plus de 5 ans d\'activité dans le secteur automobile.',
      t2: 'Prêt au Contrôle', t2d: 'Véhicules conformes aux normes belges.',
      t3: 'Qualité Garantie', t3d: 'Une sélection digne de votre confiance.',
      t4: '100+ Livraisons', t4d: 'Des clients satisfaits sur la route.'
    },
    footer: { rights: 'Tous droits réservés', made: 'Concessionnaire premium depuis 2020' }
  },
  en: {
    nav: { home: 'Home', fleet: 'Fleet', sell: 'Sell Your Car', services: 'Services', about: 'About', contact: 'Contact' },
    hero: { title: 'YANUSH Cars', subtitle: 'A premium feel, within everyone\'s reach', tagline: 'Your trusted partner in quality pre-owned vehicles.', cta1: 'Our Fleet', cta2: 'About Us', cta3: 'Contact' },
    home: { latest: 'Latest Arrivals', latestSub: 'Our recently added vehicles', viewAll: 'View all cars', services: 'Our Services', servicesSub: 'Professional support for every step of your driving journey' },
    fleet: { title: 'Our Fleet', subtitle: 'Discover our premium selection', search: 'Search...', brand: 'Brand', price: 'Price', fuel: 'Fuel', gearbox: 'Gearbox', all: 'All', noResults: 'No cars found', interested: 'WhatsApp Inquiry', viewDetails: 'Details' },
    car: { year: 'Year', km: 'KM', fuel: 'Fuel', gearbox: 'Gearbox', price: 'Price', back: 'Back to fleet' },
    sell: { title: 'Sell Your Car', subtitle: 'Fill in the form and we will contact you soon', name: 'Name', phone: 'Phone', email: 'Email', brand: 'Brand', model: 'Model', year: 'Year', mileage: 'Mileage', message: 'Description / Condition', photos: 'Upload photos', submit: 'Send', success: 'Thanks! We will contact you soon.', uploading: 'Sending...' },
    services: {
      title: 'Our Services',
      subtitle: 'Professional support for every step of your driving journey',
      s1: 'Belgian Vehicle Inspection',
      s1d: 'Full preparation and guidance for periodic and pre-sale inspections in Belgium.',
      s1l: 'We take care of the entire inspection process — from technical preparation to paperwork. Every car is thoroughly checked to pass the first time, every time. Whether it\'s a routine inspection or a sale-ready certification, you get straightforward results without delays. No surprises, no detours.',
      s2: '24/7 Towing Service',
      s2d: 'Available day and night for the safe recovery and relocation of any vehicle.',
      s2l: 'Breakdowns and accidents don\'t wait for office hours — and neither do we. Our equipped tow trucks handle every type of vehicle without damage. Fast response across Belgium, with direct communication via phone or WhatsApp. One call is all it takes to get the right help.',
      s3: 'Roadside Assistance',
      s3d: 'Quick response to technical issues so you get back on the road fast.',
      s3l: 'Flat tyre, dead battery or engine trouble? Our technician comes to you to solve the problem on the spot or arrange a safe transfer. Skilled, dependable and always respectful of your time. In good hands, wherever the road takes you.',
      s4: 'Vehicle Transport',
      s4d: 'Reliable and secure vehicle transport throughout Belgium.',
      s4l: 'Buying, selling or moving a car to the workshop — we deliver it from point A to point B. Open or enclosed transport, always with proper insurance and full care for your vehicle. Discreet, on time and worry-free. Top-level service without the top-level price.'
    },
    about: { title: 'About YANUSH Cars', p1: 'With more than 5 years of experience, YANUSH Cars has grown into a renowned premium dealership.', p2: 'We focus on quality, reliability and transparency.', p3: 'Every car is carefully selected and inspected before sale.', exp: 'Years experience', sold: 'Vehicles sold', trust: 'Happy clients' },
    contact: { title: 'Contact', address: 'Address', phone: 'Phone', whatsapp: 'WhatsApp', vat: 'VAT', name: 'Name', email: 'Email', message: 'Message', send: 'Send', sent: 'Thanks for your message!' },
    usp: {
      t1: 'Experienced Specialist', t1d: 'Over 5 years active in the automotive industry.',
      t2: 'Inspection Ready', t2d: 'Vehicles compliant with Belgian standards.',
      t3: 'Quality Guaranteed', t3d: 'A selection you can truly rely on.',
      t4: '100+ Deliveries', t4d: 'Happy customers on the road.'
    },
    footer: { rights: 'All rights reserved', made: 'Premium dealership since 2020' }
  },
  tr: {
    nav: { home: 'Anasayfa', fleet: 'Filo', sell: 'Araç Sat', services: 'Hizmetler', about: 'Hakkımızda', contact: 'İletişim' },
    hero: { title: 'YANUSH Cars', subtitle: 'Herkes için ulaşılabilir lüks duruş', tagline: 'İkinci el araçlarda güvenilir ortağınız.', cta1: 'Filomuz', cta2: 'Hakkımızda', cta3: 'İletişim' },
    home: { latest: 'Yeni Gelenler', latestSub: 'En son eklenen araçlarımız', viewAll: 'Tüm araçlar', services: 'Hizmetlerimiz', servicesSub: 'Yolculuğunuzun her aşamasında profesyonel destek' },
    fleet: { title: 'Filomuz', subtitle: 'Premium seçkimizi keşfedin', search: 'Ara...', brand: 'Marka', price: 'Fiyat', fuel: 'Yakıt', gearbox: 'Vites', all: 'Tümü', noResults: 'Araç bulunamadı', interested: 'WhatsApp ile Sor', viewDetails: 'Detaylar' },
    car: { year: 'Yıl', km: 'KM', fuel: 'Yakıt', gearbox: 'Vites', price: 'Fiyat', back: 'Filoya dön' },
    sell: { title: 'Aracınızı Satın', subtitle: 'Formu doldurun, sizinle iletişime geçelim', name: 'İsim', phone: 'Telefon', email: 'Email', brand: 'Marka', model: 'Model', year: 'Yıl', mileage: 'Kilometre', message: 'Açıklama / Durum', photos: 'Fotoğraf yükle', submit: 'Gönder', success: 'Teşekkürler! En kısa sürede arayacağız.', uploading: 'Gönderiliyor...' },
    services: {
      title: 'Hizmetlerimiz',
      subtitle: 'Yolculuğunuzun her aşamasında profesyonel destek',
      s1: 'Belçika Muayene Hizmeti',
      s1d: 'Periyodik ve satış muayeneleri için eksiksiz hazırlık ve rehberlik.',
      s1l: 'Tüm muayene sürecini sizin yerinize biz yönetiriz — teknik kontrollerden evrak işlerine kadar. Aracınız ilk seferde geçecek şekilde özenle hazırlanır. İster periyodik muayene, ister satış için muayene olsun, sonuç net ve şeffaftır. Sürprize ya da gecikmeye yer yok.',
      s2: '7/24 Çekici Hizmeti',
      s2d: 'Aracınızın güvenli şekilde çekilmesi ve taşınması için gece gündüz hizmetinizdeyiz.',
      s2l: 'Arıza ya da kaza mesai saatine göre olmaz — biz de öyleyiz. Donanımlı çekicilerimiz her tip aracı hasarsız bir şekilde taşır. Belçika genelinde hızlı müdahale, telefon ya da WhatsApp üzerinden doğrudan iletişim. Tek bir arama yeterlidir.',
      s3: 'Yol Yardım',
      s3d: 'Teknik sorunlarda hızlı müdahaleyle bir an önce yola dönmeniz için.',
      s3l: 'Patlak lastik, bitmiş akü ya da motor sorunu mu? Teknisyenimiz size gelir, problemi yerinde çözer veya güvenli bir transfer organize eder. Uzman, güvenilir ve zamanınıza saygılı. Yolda her zaman emin ellerdesiniz.',
      s4: 'Araç Transferi',
      s4d: 'Belçika genelinde güvenli ve güvenilir araç transferi.',
      s4l: 'Alım, satım ya da servise götürme — aracınızı A noktasından B noktasına biz taşırız. Açık ya da kapalı transfer, her zaman uygun sigortayla ve aracınıza saygıyla. Diskret, zamanında ve sorunsuz. Premium fiyat ödemeden premium hizmet.'
    },
    about: { title: 'YANUSH Cars Hakkında', p1: '5 yılı aşkın deneyimimizle YANUSH Cars önde gelen premium bayilerden biri.', p2: 'Kalite, güvenilirlik ve şeffaflığa odaklanıyoruz.', p3: 'Her araç satıştan önce dikkatle seçilir ve kontrol edilir.', exp: 'Yıl deneyim', sold: 'Satılan araç', trust: 'Memnun müşteri' },
    contact: { title: 'İletişim', address: 'Adres', phone: 'Telefon', whatsapp: 'WhatsApp', vat: 'KDV No', name: 'İsim', email: 'Email', message: 'Mesaj', send: 'Gönder', sent: 'Mesajınız için teşekkürler!' },
    usp: {
      t1: 'Deneyimli Uzman', t1d: 'Otomotiv sektöründe 5 yılı aşkın aktif tecrübe.',
      t2: 'Muayeneye Hazır', t2d: 'Belçika standartlarına tam uyumlu araçlar.',
      t3: 'Kalite Garantili', t3d: 'Güvenle tercih edebileceğiniz bir seçki.',
      t4: '100+ Teslimat', t4d: 'Yola çıkmış mutlu müşteriler.'
    },
    footer: { rights: 'Tüm hakları saklıdır', made: '2020\'den beri premium bayi' }
  },
  bg: {
    nav: { home: 'Начало', fleet: 'Автопарк', sell: 'Продай Кола', services: 'Услуги', about: 'За нас', contact: 'Контакт' },
    hero: { title: 'YANUSH Cars', subtitle: 'Премиум излъчване, достъпно за всеки', tagline: 'Вашият надежден партньор за употребявани автомобили.', cta1: 'Автопарк', cta2: 'За нас', cta3: 'Контакт' },
    home: { latest: 'Най-нови', latestSub: 'Нашите наскоро добавени автомобили', viewAll: 'Виж всички', services: 'Нашите услуги', servicesSub: 'Професионална подкрепа за всяка ваша нужда на пътя' },
    fleet: { title: 'Нашият Автопарк', subtitle: 'Открийте нашата премиум селекция', search: 'Търсене...', brand: 'Марка', price: 'Цена', fuel: 'Гориво', gearbox: 'Скорости', all: 'Всички', noResults: 'Няма намерени автомобили', interested: 'Запитване в WhatsApp', viewDetails: 'Детайли' },
    car: { year: 'Година', km: 'КМ', fuel: 'Гориво', gearbox: 'Скорости', price: 'Цена', back: 'Назад към автопарка' },
    sell: { title: 'Продайте Вашата Кола', subtitle: 'Попълнете формата и ще се свържем с вас', name: 'Име', phone: 'Телефон', email: 'Email', brand: 'Марка', model: 'Модел', year: 'Година', mileage: 'Километри', message: 'Описание / Състояние', photos: 'Качи снимки', submit: 'Изпрати', success: 'Благодарим! Ще се свържем с вас скоро.', uploading: 'Изпращане...' },
    services: {
      title: 'Нашите Услуги',
      subtitle: 'Професионална подкрепа за всяка ваша нужда на пътя',
      s1: 'Белгийски Технически Преглед',
      s1d: 'Пълна подготовка и съдействие за периодичен преглед и преглед при продажба.',
      s1l: 'Поемаме целия процес на технически преглед — от техническата подготовка до административните формалности. Всеки автомобил се проверява внимателно, за да премине прегледа още от първия път. Независимо дали става дума за периодичен преглед или такъв при продажба, получавате ясен и честен резултат. Без изненади, без излишни забавяния.',
      s2: 'Пътна Помощ 24/7',
      s2d: 'На разположение денонощно за безопасно изтегляне и преместване на автомобили.',
      s2l: 'Аварията или произшествието не зачитат работното време — и ние също. Нашите пътни помощници са оборудвани да обслужват всеки тип автомобил без щети. Бърза реакция в цяла Белгия, директна комуникация по телефон или WhatsApp. Едно обаждане е напълно достатъчно.',
      s3: 'Аварийна Помощ',
      s3d: 'Бърза намеса при технически проблеми, за да продължите пътя си спокойно.',
      s3l: 'Спукана гума, изтощен акумулатор или повреден двигател? Нашият техник идва на място, за да реши проблема или да организира безопасно прехвърляне. Експертно, надеждно и винаги с уважение към вашето време. На пътя — в добри ръце.',
      s4: 'Транспорт на Автомобили',
      s4d: 'Надежден и безопасен транспорт на автомобили в цяла Белгия.',
      s4l: 'Покупка, продажба или превоз до сервиз — ние се грижим за маршрута от точка А до точка Б. Открит или закрит транспорт, винаги с подходящи застраховки и с пълно внимание към автомобила ви. Дискретно, навреме, без притеснения. Първокласно обслужване без първокласна цена.'
    },
    about: { title: 'За YANUSH Cars', p1: 'С над 5 години опит, YANUSH Cars е утвърден премиум дилър.', p2: 'Фокусираме се върху качество, надеждност и прозрачност.', p3: 'Всяка кола е внимателно подбрана и проверена.', exp: 'Години опит', sold: 'Продадени автомобили', trust: 'Доволни клиенти' },
    contact: { title: 'Контакт', address: 'Адрес', phone: 'Телефон', whatsapp: 'WhatsApp', vat: 'ДДС №', name: 'Име', email: 'Email', message: 'Съобщение', send: 'Изпрати', sent: 'Благодарим за съобщението!' },
    usp: {
      t1: 'Опитен Специалист', t1d: 'Над 5 години активна работа в автомобилния сектор.',
      t2: 'Готов за Преглед', t2d: 'Автомобили в съответствие с белгийските норми.',
      t3: 'Гарантирано Качество', t3d: 'Селекция, на която наистина можете да разчитате.',
      t4: '100+ Доставки', t4d: 'Доволни клиенти, поели по пътя.'
    },
    footer: { rights: 'Всички права запазени', made: 'Премиум дилър от 2020' }
  }
};

export const t = (lang, path) => {
  const parts = path.split('.');
  let cur = dict[lang] || dict.nl;
  for (const p of parts) {
    if (cur && typeof cur === 'object' && p in cur) cur = cur[p];
    else return path;
  }
  return cur;
};
