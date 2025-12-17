// --- 1. INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    
    // Initialize AOS Animations
    AOS.init({
        duration: 1000,
        offset: 100,
        once: true
    });

    // Load Theme & Language
    loadTheme();
    loadLanguage();
});

// --- 2. DARK MODE LOGIC ---
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

// --- 3. TRANSLATION DATABASE (FULLY POPULATED) ---
const translations = {
    en: {
        nav_about: "About",
        nav_journey: "Journey",
        nav_works: "Project Experience",
        nav_services: "Consultancy",
        nav_contact: "Contact",
        hero_statement: "Form is the silence between thoughts.",
        hero_sub: "Sculptor • Painter • Art Consultant",
        bio_title: "The Artist",
        bio_p1: "Mesfin Tesfaye does not merely occupy space; he interrogates it. With a practice rooted in the tactile intelligence of material and the conceptual rigor of form, Tesfaye has established himself as a distinct voice in contemporary sculpture and painting.",
        bio_p2: "His work operates at the intersection of Ethiopian cultural depth and modern abstraction. He navigates the delicate balance between the permanence of stone and the fluidity of paint, creating works that serve as dialogues between history and the present moment.",
        journey_title: "Evolution",
        timeline_1_title: "Material Exploration",
        timeline_1_desc: "Early investigations into indigenous stone and wood, establishing a vernacular of texture.",
        timeline_2_title: "The Abstract Turn",
        timeline_2_desc: "A shift toward minimalism. Reducing form to its essential truth. The removal of the unnecessary.",
        timeline_3_title: "Synthesis & Advising",
        timeline_3_desc: "Merging the practice of creation with the curation of excellence. Guiding global collections.",
        gallery_title: "Selected Sculptures",
        gallery_titl: "Painting",
        gallery_digital: "Digital Arts",
        art_1_title: "His Majesty E.Hailesilasie",
        art_1_titl:"Presented to P.M Abiy Ahimed(D.r)",
        art_1_meta: "Sculpture, 2022",
        art_2_title: "Addis Echoes",
        art_2_meta: "Oil on Canvas, 2023",
        art_3_title: "The Weight of Memory",
        art_3_meta: "Bronze Casting, 2021",
        service_title: "Art Advising",
        service_lead: "Curating legacy. Defining taste.",
        service_desc: "Mesfin Tesfaye offers private consultation for collectors and institutions seeking to build meaningful portfolios. With an approach grounded in academic rigor and market intuition, he bridges the gap between creator and custodian.",
        service_li_1: "Collection Strategy & Curation",
        service_li_2: "Acquisition Guidance",
        service_li_3: "Studio Visits & Artist Liaison",
        contact_title: "Inquiries",
        contact_sub: "For studio visits, acquisitions, or advisory consultation.",
        form_name: "Name",
        form_email: "Email",
        form_message: "Message",
        form_btn: "Send Request",
        footer_rights: "All Rights Reserved."
    },
    am: {
        nav_about: "ስለ እኔ",
        nav_journey: "ጉዞ",
        nav_works: "ሥራዎች",
        nav_services: "ምክር",
        nav_contact: "ግንኙነት",
        hero_statement: "ቅርፅ በሃሳቦች መካከል ያለ ዝምታ ነው።",
        hero_sub: "ቅርፃቅርፅ • ስዕል • የጥበብ ምክር",
        bio_title: "ሰዓሊው",
        bio_p1: "መስፍን ተስፋዬ ቦታን ዝም ብሎ አይይዝም፤ ይጠይቀዋል። በቁስ አካላዊ እውቀት እና በቅርፅ ጽንሰ-ሀሳብ ላይ የተመሰረተ ልምድ ያለው መስፍን፣ በዘመናዊ ቅርፃቅርፅ እና ስዕል ውስጥ የራሱን ድምጽ አግኝቷል።",
        bio_p2: "ሥራዎቹ በኢትዮጵያ ባህላዊ ጥልቀት እና በዘመናዊ ረቂቅነት መጋጠሚያ ላይ ይገኛሉ። በድንጋይ ቋሚነት እና በቀለም ፈሳሽነት መካከል ያለውን ሚዛን ይጠብቃል።",
        journey_title: "የጥበብ ጉዞ",
        timeline_1_title: "የቁስ ፍለጋ",
        timeline_1_desc: "በአገር በቀል ድንጋይ እና እንጨት ላይ የተደረጉ የመጀመሪያ ምርምሮች።",
        timeline_2_title: "ወደ ረቂቅነት",
        timeline_2_desc: "ወደ ንጽህና እና ቀላልነት የተደረገ ሽግግር። አላስፈላጊውን ማስወገድ።",
        timeline_3_title: "ውህደት እና ምክር",
        timeline_3_desc: "የፈጠራ ስራን ከጥበብ አስተዳደር ጋር ማዋሃድ። ዓለም አቀፍ ስብስቦችን መምራት።",
        gallery_title: "የተመረጡ ሥራዎች",
        art_1_title: "ዝምታ በግራናይት",
        art_1_meta: "ቅርፃቅርፅ, 2022",
        art_2_title: "የአዲስ አበባ ማሚቶ",
        art_2_meta: "ዘይት በሸራ, 2023",
        art_3_title: "የትውስታ ክብደት",
        art_3_meta: "ብረት, 2021",
        service_title: "የጥበብ ምክር",
        service_lead: "ቅርሶችን ማደራጀት። ጣዕምን መግለፅ።",
        service_desc: "መስፍን ተስፋዬ ትርጉም ያለው ስብስቦችን ለመገንባት ለሚፈልጉ ሰብሳቢዎች የግል ምክክር ይሰጣል።",
        service_li_1: "የስብስብ ስትራቴጂ",
        service_li_2: "የግዢ መመሪያ",
        service_li_3: "የስቱዲዮ ጉብኝቶች",
        contact_title: "ጥያቄዎች",
        contact_sub: "ለስቱዲዮ ጉብኝት ወይም ለምክር አገልግሎት።",
        form_name: "ስም",
        form_email: "ኢሜይል",
        form_message: "መልእክት",
        form_btn: "ላክ",
        footer_rights: "መብቱ በህግ የተጠበቀ ነው።"
    },
    fr: {
        nav_about: "À propos",
        nav_journey: "Parcours",
        nav_works: "Œuvres",
        nav_services: "Conseil",
        nav_contact: "Contact",
        hero_statement: "La forme est le silence entre les pensées.",
        hero_sub: "Sculpteur • Peintre • Conseiller",
        bio_title: "L'Artiste",
        bio_p1: "Mesfin Tesfaye n'occupe pas simplement l'espace ; il l'interroge. Avec une pratique enracinée dans l'intelligence tactile de la matière et la rigueur conceptuelle de la forme.",
        bio_p2: "Son travail opère à l'intersection de la profondeur culturelle éthiopienne et de l'abstraction moderne. Il navigue l'équilibre délicat entre la permanence de la pierre et la fluidité de la peinture.",
        journey_title: "Évolution",
        timeline_1_title: "Exploration Matérielle",
        timeline_1_desc: "Premières investigations sur la pierre et le bois indigènes, établissant un vernaculaire de texture.",
        timeline_2_title: "Le Tournant Abstrait",
        timeline_2_desc: "Un virage vers le minimalisme. Réduire la forme à sa vérité essentielle.",
        timeline_3_title: "Synthèse & Conseil",
        timeline_3_desc: "Fusionner la pratique de la création avec la curation de l'excellence.",
        gallery_title: "Œuvres Choisies",
        art_1_title: "Silence en Granit",
        art_1_meta: "Sculpture, 2022",
        art_2_title: "Échos d'Addis",
        art_2_meta: "Huile sur toile, 2023",
        art_3_title: "Le Poids de la Mémoire",
        art_3_meta: "Bronze, 2021",
        service_title: "Conseil Artistique",
        service_lead: "Organiser l'héritage. Définir le goût.",
        service_desc: "Mesfin Tesfaye offre des consultations privées pour les collectionneurs et les institutions cherchant à constituer des portefeuilles significatifs.",
        service_li_1: "Stratégie de Collection",
        service_li_2: "Conseils d'Acquisition",
        service_li_3: "Liaison avec les Artistes",
        contact_title: "Demandes",
        contact_sub: "Pour les visites d'atelier, les acquisitions ou les consultations.",
        form_name: "Nom",
        form_email: "Email",
        form_message: "Message",
        form_btn: "Envoyer",
        footer_rights: "Tous droits réservés."
    },
    de: {
        nav_about: "Über",
        nav_journey: "Reise",
        nav_works: "Werke",
        nav_services: "Beratung",
        nav_contact: "Kontakt",
        hero_statement: "Form ist die Stille zwischen den Gedanken.",
        hero_sub: "Skulptur • Malerei • Kuration",
        bio_title: "Der Künstler",
        bio_p1: "Mesfin Tesfaye besetzt den Raum nicht nur; er hinterfragt ihn. Mit einer Praxis, die in der taktilen Intelligenz des Materials und der konzeptionellen Strenge der Form verwurzelt ist.",
        bio_p2: "Sein Werk bewegt sich an der Schnittstelle zwischen äthiopischer kultureller Tiefe und moderner Abstraktion. Er navigiert das Gleichgewicht zwischen der Beständigkeit des Steins und der Fluidität der Farbe.",
        journey_title: "Entwicklung",
        timeline_1_title: "Materialforschung",
        timeline_1_desc: "Frühe Untersuchungen an einheimischem Stein und Holz.",
        timeline_2_title: "Die Abstrakte Wende",
        timeline_2_desc: "Eine Hinwendung zum Minimalismus. Reduktion der Form auf ihre essentielle Wahrheit.",
        timeline_3_title: "Synthese & Beratung",
        timeline_3_desc: "Verschmelzung von Schöpfung und Kuration von Exzellenz.",
        gallery_title: "Ausgewählte Werke",
        art_1_title: "Stille in Granit",
        art_1_meta: "Skulptur, 2022",
        art_2_title: "Addis Echos",
        art_2_meta: "Öl auf Leinwand, 2023",
        art_3_title: "Das Gewicht der Erinnerung",
        art_3_meta: "Bronze, 2021",
        service_title: "Kunstberatung",
        service_lead: "Erbe kuratieren. Geschmack definieren.",
        service_desc: "Mesfin Tesfaye bietet private Beratungen für Sammler an, die bedeutende Portfolios aufbauen möchten.",
        service_li_1: "Sammlungsstrategie",
        service_li_2: "Akquisitionsberatung",
        service_li_3: "Atelierbesuche",
        contact_title: "Anfragen",
        contact_sub: "Für Atelierbesuche oder Beratungen.",
        form_name: "Name",
        form_email: "E-Mail",
        form_message: "Nachricht",
        form_btn: "Senden",
        footer_rights: "Alle Rechte vorbehalten."
    },
    or: {
        nav_about: "Waa'ee",
        nav_journey: "Imala",
        nav_works: "Hojiiwwan",
        nav_services: "Gorsa",
        nav_contact: "Qunnamtii",
        hero_statement: "Bocni calliinsa yaada gidduu jiruudha.",
        hero_sub: "Bocaa • Fakkii • Gorsaa Aartii",
        bio_title: "Aartistiicha", 
        bio_p1: "Masfin Tasfaayee iddoo qabachuu qofa osoo hin taane, iddoo sana ni gaafata. Beekumsa qabatoo meeshaalee fi jabeenya yaada bocaarratti hundaa’uun, Masfin aartii bocaa fi fakkii ammayyaa keessatti sagalee addaa ta'e horateera.",
        bio_p2: "Hojiin isaa giddu-gala aadaa Itoophiyaa fi ammayyummaa gidduutti argama. Jabeenya dhagaa fi dhangala’aa halluu gidduu jiru madaaluun, seenaa fi yeroo ammaa gidduutti marii uuma.",
        bio_p3: "Istuudiyoo alatti, Tasfaayeen namoota dhuunfaa fi dhaabbileef Gorsaa Aartii amanamaa ta'uun, ija aartistiitiin sassaabbiiwwan (collections) gurguddoo ijaaruu irratti ni hirmaata.",
        journey_title: "Guddina", 
        timeline_1_title: "Qorannoo Meeshaalee",
        timeline_1_desc: "Dhagaa fi mukoota biyya keessaa irratti qorannoo jalqabaa taasisuun qooqa aartii ijaaruu.",
        timeline_2_title: "Gara Salphaatti",
        timeline_2_desc: "Gara aartii xiqqeessuutti (minimalism) ce’uu. Wantoota hin barbaachifne dhabamsiisuun gara dhugaa bu’uuraatti deebi’uu.",
        timeline_3_title: "Wal-makaa & Gorsa",
        timeline_3_desc: "Uumuu fi bulchiinsa aartii walitti makuun sassaabbiiwwan addunyaa qajeelchuu.",
        gallery_title: "Hojiiwwan Filataman", 
        art_1_title: "Calliinsa Dhagaa",
        art_1_meta: "Boca, 2022",
        art_2_title: "Sagalee Finfinnee",
        art_2_meta: "Halluu Zayitaa, 2023", 
        art_3_title: "Ulfaatina Yaadannoo",
        art_3_meta: "Boca Sibiilaa, 2021",
        service_title: "Gorsa Aartii",
        service_lead: "Seenaa Kuusuu. Miira Uumuu.",
        service_desc: "Masfin Tasfaayee namoota dhuunfaa fi dhaabbilee kuusaa aartii hiika qabu ijaarrachuu barbaadaniif gorsa dhuunfaa kenna. Beekumsa akadeemii fi hubannoo gabaa walitti makuun.",
        service_li_1: "Tooftaa Kuusaa fi Qophii",
        service_li_2: "Qajeelfama Bittaa",
        service_li_3: "Daawwannaa Istuudiyoo fi Quunnamtii Aartistootaa",
        contact_title: "Gaaffiiwwan",
        contact_sub: "Daawwannaa istuudiyoo, bittaa, ykn gorsaa aartiif.",
        form_name: "Maqaa",
        form_email: "Imeelii",
        form_message: "Ergaa",
        form_btn: "Ergi",
        footer_rights: "Mirgi Isaa Seeraan Eegamaadha."
    },
    zh: {
        nav_about: "关于",
        nav_journey: "历程",
        nav_works: "作品",
        nav_services: "顾问",
        nav_contact: "联系",
        hero_statement: "形式是思想之间的静默。",
        hero_sub: "雕塑家 • 画家 • 艺术顾问",
        bio_title: "艺术家", 
        bio_p1: "Mesfin Tesfaye 不仅占据空间，更是在审视空间。他的实践植根于材料的触觉智慧和形式的概念严谨性，在当代雕塑和绘画领域确立了独特的声音。",
        bio_p2: "他的作品融合了埃塞俄比亚的文化深度与现代抽象艺术。他在石头的永恒与油彩的流动之间寻找微妙的平衡，创作出连接历史与当下的对话作品。",
        bio_p3: "在工作室之外，Tesfaye 担任私人收藏家和机构的低调艺术顾问，以艺术家的眼光协助建立重要的艺术收藏。",
        journey_title: "演变", 
        timeline_1_title: "材料探索",
        timeline_1_desc: "早期对本土石材和木材的深入研究，建立独特的纹理语言。",
        timeline_2_title: "抽象转向",
        timeline_2_desc: "向极简主义的转变。将形式还原为本质真理。剔除不必要的元素。",
        timeline_3_title: "综合与咨询",
        timeline_3_desc: "将创作实践与卓越策展相结合。指导全球收藏。",
        gallery_title: "精选作品", 
        art_1_title: "花岗岩中的沉默",
        art_1_meta: "雕塑, 2022",
        art_2_title: "亚的斯亚贝巴的回声",
        art_2_meta: "布面油画, 2023", 
        art_3_title: "记忆的重量",
        art_3_meta: "青铜铸造, 2021",
        service_title: "艺术顾问",
        service_lead: "策划传承。定义品味。",
        service_desc: "Mesfin Tesfaye 为寻求建立有意义的收藏组合的私人收藏家和机构提供咨询服务。他以学术严谨和市场直觉为基础，架起创作者与保管者之间的桥梁。",
        service_li_1: "收藏策略与策展",
        service_li_2: "收购指导",
        service_li_3: "工作室访问与艺术家联络",
        contact_title: "咨询",
        contact_sub: "用于工作室访问、收购或顾问咨询。",
        form_name: "姓名",
        form_email: "邮箱",
        form_message: "留言",
        form_btn: "发送",
        footer_rights: "版权所有。"
    },
    it: {
        nav_about: "Profilo",
        nav_journey: "Viaggio",
        nav_works: "Opere",
        nav_services: "Consulenza",
        nav_contact: "Contatti",
        hero_statement: "La forma è il silenzio tra i pensieri.",
        hero_sub: "Scultura • Pittura • Curatela",
        bio_title: "L'Artista",
        bio_p1: "Mesfin Tesfaye non occupa semplicemente lo spazio; lo interroga. Con una pratica radicata nell'intelligenza tattile della materia e nel rigore concettuale della forma.",
        bio_p2: "Il suo lavoro opera all'intersezione tra la profondità culturale etiope e l'astrazione moderna. Naviga il delicato equilibrio tra la permanenza della pietra e la fluidità della pittura.",
        journey_title: "Evoluzione",
        timeline_1_title: "Esplorazione Materica",
        timeline_1_desc: "Prime indagini su pietra e legno indigeni, stabilendo un vernacolo materico.",
        timeline_2_title: "La Svolta Astratta",
        timeline_2_desc: "Uno spostamento verso il minimalismo. Ridurre la forma alla sua verità essenziale.",
        timeline_3_title: "Sintesi & Consulenza",
        timeline_3_desc: "Fondere la pratica della creazione con la cura dell'eccellenza.",
        gallery_title: "Opere Selezionate",
        art_1_title: "Silenzio nel Granito",
        art_1_meta: "Scultura, 2022",
        art_2_title: "Echi di Addis",
        art_2_meta: "Olio su tela, 2023",
        art_3_title: "Il Peso della Memoria",
        art_3_meta: "Bronzo, 2021",
        service_title: "Consulenza Artistica",
        service_lead: "Curare l'eredità. Definire il gusto.",
        service_desc: "Mesfin Tesfaye offre consulenze private per collezionisti e istituzioni che cercano di costruire portafogli significativi.",
        service_li_1: "Strategia di Collezione",
        service_li_2: "Guida all'Acquisizione",
        service_li_3: "Visite in Studio",
        contact_title: "Richieste",
        contact_sub: "Per visite in studio o consulenze.",
        form_name: "Nome",
        form_email: "Email",
        form_message: "Messaggio",
        form_btn: "Invia",
        footer_rights: "Tutti i diritti riservati."
    },
    es: {
        nav_about: "Sobre",
        nav_journey: "Viaje",
        nav_works: "Obras",
        nav_services: "Asesoría",
        nav_contact: "Contacto",
        hero_statement: "La forma es el silencio entre pensamientos.",
        hero_sub: "Escultura • Pintura • Curaduría",
        bio_title: "El Artista",
        bio_p1: "Mesfin Tesfaye no simplemente ocupa el espacio; lo interroga. Con una práctica arraigada en la inteligencia táctil del material y el rigor conceptual.",
        bio_p2: "Su obra opera en la intersección de la profundidad cultural etíope y la abstracción moderna. Navega el equilibrio entre la piedra y la pintura.",
        journey_title: "Evolución",
        timeline_1_title: "Exploración Material",
        timeline_1_desc: "Investigaciones tempranas en piedra y madera indígenas.",
        timeline_2_title: "El Giro Abstracto",
        timeline_2_desc: "Un cambio hacia el minimalismo. Reduciendo la forma a su verdad esencial.",
        timeline_3_title: "Síntesis y Asesoría",
        timeline_3_desc: "Fusionando la práctica de la creación con la curaduría de la excelencia.",
        gallery_title: "Obras Seleccionadas",
        art_1_title: "Silencio en Granito",
        art_1_meta: "Escultura, 2022",
        art_2_title: "Ecos de Addis",
        art_2_meta: "Óleo sobre lienzo, 2023",
        art_3_title: "El Peso de la Memoria",
        art_3_meta: "Bronce, 2021",
        service_title: "Asesoría de Arte",
        service_lead: "Curar el legado. Definir el gusto.",
        service_desc: "Mesfin Tesfaye ofrece consultas privadas para coleccionistas e instituciones que buscan construir portafolios significativos.",
        service_li_1: "Estrategia de Colección",
        service_li_2: "Guía de Adquisición",
        service_li_3: "Visitas de Estudio",
        contact_title: "Consultas",
        contact_sub: "Para visitas de estudio, adquisiciones o consultas.",
        form_name: "Nombre",
        form_email: "Correo",
        form_message: "Mensaje",
        form_btn: "Enviar",
        footer_rights: "Todos los derechos reservados."
    },
    jp: {
        nav_about: "私について",
        nav_journey: "経歴",
        nav_works: "作品",
        nav_services: "アドバイザリー",
        nav_contact: "お問い合わせ",
        hero_statement: "形とは、思考の間の静寂である。",
        hero_sub: "彫刻 • 絵画 • アートアドバイザー",
        bio_title: "アーティスト",
        bio_p1: "メスフィン・テスファエは単に空間を占めるのではなく、空間に問いかけます。素材の触覚的知性と形態の概念的厳密さに根ざした実践。",
        bio_p2: "彼の作品は、エチオピアの文化的深みと現代の抽象化の交差点で機能します。彼は石の永続性と絵具の流動性の間の繊細なバランスを操作します。",
        journey_title: "進化",
        timeline_1_title: "素材の探求",
        timeline_1_desc: "固有の石と木材への初期の調査、質感の表現を確立。",
        timeline_2_title: "抽象への転換",
        timeline_2_desc: "ミニマリズムへの移行。形態を本質的な真実に還元する。不要なものの排除。",
        timeline_3_title: "統合と助言",
        timeline_3_desc: "創造の実践と卓越性のキュレーションの融合。グローバルコレクションの指導。",
        gallery_title: "選抜作品",
        art_1_title: "花崗岩の沈黙",
        art_1_meta: "彫刻, 2022",
        art_2_title: "アディスの響き",
        art_2_meta: "油彩、キャンバス, 2023",
        art_3_title: "記憶の重み",
        art_3_meta: "ブロンズ鋳造, 2021",
        service_title: "アートアドバイザリー",
        service_lead: "遺産をキュレートする。好みを定義する。",
        service_desc: "メスフィン・テスファエは、有意義なポートフォリオを構築しようとするコレクターや機関に個人的なコンサルティングを提供します。学術的厳密さと市場の直感に基づいたアプローチで。",
        service_li_1: "コレクション戦略とキュレーション",
        service_li_2: "取得ガイダンス",
        service_li_3: "スタジオ訪問とアーティストリエゾン",
        contact_title: "お問い合わせ",
        contact_sub: "スタジオ訪問、作品の購入、またはアドバイザリー相談について。",
        form_name: "名前",
        form_email: "メール",
        form_message: "メッセージ",
        form_btn: "送信",
        footer_rights: "全著作権所有。"
    }
};

// --- 4. LANGUAGE LOGIC ---
const langSelector = document.getElementById('language-switch');

function loadLanguage() {
    const savedLang = localStorage.getItem('site_lang') || 'en';
    langSelector.value = savedLang;
    applyLanguage(savedLang);
}

langSelector.addEventListener('change', (e) => {
    const lang = e.target.value;
    localStorage.setItem('site_lang', lang);
    applyLanguage(lang);
});

function applyLanguage(lang) {
    // 1. Font Adjustment
    if (lang === 'am') document.body.style.fontFamily = "'Noto Sans Ethiopic', sans-serif";
    else if (lang === 'jp') document.body.style.fontFamily = "'Noto Sans JP', sans-serif";
    else document.body.style.fontFamily = "'Inter', sans-serif";

    // 2. Text Replacement
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        
        // Check if translation exists for selected language, else fallback to English
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        } else if (translations['en'][key]) {
            el.textContent = translations['en'][key];
        }
    });
}

// --- 5. NAVBAR SCROLL ---
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
});

// --- 6. MOBILE MENU ---
const hamburger = document.getElementById('mobile-menu-btn');
// UPDATED SELECTOR:
const navLinksWrapper = document.querySelector('.nav-links-wrapper'); 

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinksWrapper.classList.toggle('active');
    });
}

// Close menu when clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinksWrapper.classList.remove('active');
    });
});
// --- GALLERY SLIDER LOGIC ---
const track = document.getElementById('gallery-track') || document.querySelector('.gallery-track');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

if (track && prevBtn && nextBtn) {
    
    // Amount to scroll (Card Width + Gap)
    // We calculate this dynamically in case you change CSS
    const getScrollAmount = () => {
        const card = track.querySelector('.art-card');
        // Card width + 30px gap
        return card ? card.offsetWidth + 30 : 380; 
    };

    nextBtn.addEventListener('click', () => {
        track.scrollBy({
            left: getScrollAmount(),
            behavior: 'smooth'
        });
    });

    prevBtn.addEventListener('click', () => {
        track.scrollBy({
            left: -getScrollAmount(),
            behavior: 'smooth'
        });
    });
}
// --- PAINTING GALLERY SLIDER ---
const paintingTrack = document.getElementById('paintingTrack');
const paintingPrevBtn = document.getElementById('paintingPrevBtn');
const paintingNextBtn = document.getElementById('paintingNextBtn');

if (paintingTrack && paintingPrevBtn && paintingNextBtn) {
    
    paintingNextBtn.addEventListener('click', () => {
        const scrollAmount = paintingTrack.clientWidth * 0.70;
        paintingTrack.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    paintingPrevBtn.addEventListener('click', () => {
        const scrollAmount = paintingTrack.clientWidth * 0.70;
        paintingTrack.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
}

// --- PAINTING GALLERY SLIDER ---
const digitalartTrack = document.getElementById('digitalartTrack');
const digitalartPrevBtn = document.getElementById('digitalartPrevBtn');
const digitalartNextBtn = document.getElementById('digitalartNextBtn');

if (digitalartTrack && digitalartPrevBtn && digitalartNextBtn) {
    
    digitalartNextBtn.addEventListener('click', () => {
        const scrollAmount = digitalartTrack.clientWidth * 0.70;
        digitalartTrack.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    digitalartPrevBtn.addEventListener('click', () => {
        const scrollAmount = digitalartTrack.clientWidth * 0.70;
        digitalartTrack.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
}