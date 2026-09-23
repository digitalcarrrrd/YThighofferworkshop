export type CCLanguage = "en" | "roman" | "ur";

export interface CCTranslation {
  dir: "ltr" | "rtl";
  topBadge: string;
  topBanner: string;
  nav: {
    proof: string;
    compare: string;
    value: string;
    packages: string;
    environment: string;
    apply: string;
    applyCta: string;
  };
  hero: {
    tag: string;
    h1Line1: string;
    h1Line2: string;
    sub: string;
    noticeStrong: string;
    noticeSmall: string;
    btnInside: string;
    btnPricing: string;
    stats: {
      stat1Val: string;
      stat1Label: string;
      stat2Val: string;
      stat2Label: string;
      stat3Val: string;
      stat3Label: string;
      stat4Val: string;
      stat4Label: string;
    };
  };
  compare: {
    eyebrow: string;
    heading: string;
    desc: string;
    col1Eyebrow: string;
    col1Title: string;
    col2Eyebrow: string;
    col2Title: string;
    col3Eyebrow: string;
    col3Title: string;
    row1: string;
    row2: string;
    row3: string;
    row4: string;
    row5: string;
    row6: string;
    maybe: string;
    low: string;
    self: string;
    no: string;
    yes: string;
    mixed: string;
    builtin: string;
    noticeStrong: string;
    noticeSmall: string;
  };
  value: {
    eyebrow: string;
    heading: string;
    desc: string;
    pillars: Array<{ title: string; desc: string }>;
  };
  mentors: {
    eyebrow: string;
    heading: string;
    desc: string;
    abrarEyebrow: string;
    abrarName: string;
    abrarP1: string;
    abrarP2: string;
    zahidEyebrow: string;
    zahidName: string;
    zahidP1: string;
    zahidP2: string;
    zahidBadge: string;
  };
  criteria: {
    eyebrow: string;
    heading: string;
    needTitle: string;
    needItems: Array<{ num: string; strong: string; text: string }>;
    notTitle: string;
    notItems: string[];
    banner: string;
  };
  environment: {
    eyebrow: string;
    heading: string;
    desc: string;
    items: Array<{ title: string; desc: string }>;
  };
  pricing: {
    eyebrow: string;
    heading: string;
    desc: string;
    pkg1Badge: string;
    pkg1Title: string;
    pkg1Focus: string;
    pkg1LocalLabel: string;
    pkg1LocalPrice: string;
    pkg1LocalNote: string;
    pkg1ResLabel: string;
    pkg1ResPrice: string;
    pkg1ResNote: string;
    pkg1CallNote: string;
    pkg1List: string[];
    pkg1Btn: string;

    pkg2Popular: string;
    pkg2Badge: string;
    pkg2Title: string;
    pkg2Focus: string;
    pkg2LocalLabel: string;
    pkg2LocalPrice: string;
    pkg2LocalNote: string;
    pkg2ResLabel: string;
    pkg2ResPrice: string;
    pkg2ResNote: string;
    pkg2CallNote: string;
    pkg2List: string[];
    pkg2Btn: string;

    pkg3Badge: string;
    pkg3Title: string;
    pkg3Focus: string;
    pkg3FullTitle: string;
    pkg3FullDesc: string;
    pkg3CallNote: string;
    pkg3List: string[];
    pkg3Btn: string;
    bottomBanner: string;
  };
  accountability: {
    eyebrow: string;
    heading: string;
    desc: string;
    items: Array<{ eyebrow: string; title: string; desc: string }>;
    noticeStrong: string;
    noticeSmall: string;
  };
  faq: {
    eyebrow: string;
    heading: string;
    items: Array<{ q: string; a: string }>;
  };
}

export const ccTranslations: Record<CCLanguage, CCTranslation> = {
  en: {
    dir: "ltr",
    topBadge: "COHORT OPEN",
    topBanner: "15 ACTIVE OPERATORS MAX · 10 RESIDENTIAL + 5 LOCAL · JOHAR TOWN, LAHORE",
    nav: {
      proof: "Proof & First Batch",
      compare: "Compare",
      value: "Value Architecture",
      packages: "Packages & Pricing",
      environment: "Environment",
      apply: "Apply",
      applyCta: "Apply for Whitelist →",
    },
    hero: {
      tag: "DOOR 02 — IRL EXECUTION COMPOUND · JOHAR TOWN, LAHORE",
      h1Line1: "Arrive With a Goal.",
      h1Line2: "Leave With Completed Work.",
      sub: "You are not buying a bed, a desk, food, or another video course. Content Colony is a Creator Execution Residency: a fixed period of accommodation, focused work, direct expert access, content review, and completed digital output.",
      noticeStrong: "Content Colony is built for that gap.",
      noticeSmall: "You learn the operating logic, then spend the rest of the day building your own system around your own market, format, and production model.",
      btnInside: "See What Happens Inside →",
      btnPricing: "Inspect Packages & Pricing",
      stats: {
        stat1Val: "15",
        stat1Label: "Active Operators Max",
        stat2Val: "2 Hours",
        stat2Label: "Daily Class & Reviews",
        stat3Val: "Rest of Day",
        stat3Label: "Live Execution Sprinting",
        stat4Val: "Johar Town",
        stat4Label: "Prime Lahore Location",
      },
    },
    compare: {
      eyebrow: "COMPARE THE ACTUAL PROBLEM BEING SOLVED",
      heading: "Your Current Setup vs Coworking vs Content Colony",
      desc: "A normal coworking space gives you a place to sit. Content Colony is engineered to give your work an operating system.",
      col1Eyebrow: "CURRENT SETUP",
      col1Title: "Working Alone",
      col2Eyebrow: "TRADITIONAL OPTION",
      col2Title: "Normal Coworking",
      col3Eyebrow: "EXECUTION ECOSYSTEM",
      col3Title: "Content Colony",
      row1: "Desk / Freedom",
      row2: "Execution Energy",
      row3: "System Diagnosis",
      row4: "Data Training",
      row5: "Agent Architecture",
      row6: "Post-Sprint Accountability",
      maybe: "MAYBE",
      low: "LOW",
      self: "SELF",
      no: "NO",
      yes: "YES",
      mixed: "MIXED",
      builtin: "BUILT-IN",
      noticeStrong: "A COWORKING SPACE GIVES YOU A PLACE TO WORK. CONTENT COLONY IS DESIGNED TO GIVE YOUR WORK AN OPERATING SYSTEM.",
      noticeSmall: "Your effort is still yours. The difference is the structure, peer momentum, and systematic feedback around it.",
    },
    value: {
      eyebrow: "WHAT YOU ACTUALLY LEARN AND BUILD",
      heading: "The Things Between “AI Tools” and a Real Business",
      desc: "Moving beyond single prompts into durable, repeatable media production infrastructure.",
      pillars: [
        {
          title: "01 · Data Training",
          desc: "Train AI on your own research, top-performing reference channels, niche scripts, and tone rules.",
        },
        {
          title: "02 · Real Automation",
          desc: "Understand what should be automated (research, transcripts, tagging) and what needs human judgment (hooks, pacing).",
        },
        {
          title: "03 · Business Models",
          desc: "Traffic, audience, packaging, economics, repeatability, and scale—not just one-off video production.",
        },
        {
          title: "04 · Batch Processing",
          desc: "Move beyond one prompt and one video toward controlled multi-asset pipelines that yield weekly batches.",
        },
        {
          title: "05 · Market Understanding",
          desc: "Read demand, underserved format angles, adjacent monetization opportunities, and viewer retention cues.",
        },
        {
          title: "06 · Agent Architecture",
          desc: "Build specialized bots for research, scripting, visual sourcing, edit logic, and quality assurance.",
        },
        {
          title: "07 · Algorithmic Physics",
          desc: "Understand how CTR packaging, initial audience response, and YouTube distribution curves actually connect.",
        },
        {
          title: "08 · Production Systems",
          desc: "Documentary, animation, commentary, and AI-native formats can all be systemized with documented SOPs.",
        },
      ],
    },
    mentors: {
      eyebrow: "DIRECT EXPERT ACCESS",
      heading: "System Architecture & Production Reality",
      desc: "Direct, unfiltered access to operators managing high-scale digital properties and algorithmic distribution.",
      abrarEyebrow: "SYSTEM ARCHITECT",
      abrarName: "Abrar Nadir",
      abrarP1: "Abrar's role is to make the invisible logic visible: market dynamics, algorithmic distribution, business models, custom data training, automation economics, and scalable system architecture.",
      abrarP2: "The goal is not to hand everyone the same cookie-cutter template. The goal is to make operators capable of diagnosing bottlenecks and building their own repeatable systems.",
      zahidEyebrow: "PRODUCTION REALITY · 1M+ VIEWS",
      zahidName: "Zahid Iqbal · Creative AI Systems",
      zahidP1: "Zahid represents what happens when systematic thinking is pushed into real creative output: AI drama, animation, movie-style storytelling, and high-volume media delivery.",
      zahidP2: "His session focuses on the production reality behind high-performing viral content—including a recent release that crossed 1M+ views in roughly 23 hours.",
      zahidBadge: "⚡ 1M+ Views in Under 24 Hours · Production Proof",
    },
    criteria: {
      eyebrow: "SELECTION CRITERIA",
      heading: "Beginners Are Welcome. Operators Will Extract the Most.",
      needTitle: "This is what you need if...",
      needItems: [
        { num: "01", strong: "You want the real business model:", text: "Not just another niche list or prompt pack." },
        { num: "02", strong: "You want AI trained on your system:", text: "Your data, research, tone rules, and examples." },
        { num: "03", strong: "You want multiple agents working together:", text: "Instead of one giant general-purpose prompt." },
        { num: "04", strong: "You want to batch-produce:", text: "More completed output without sacrificing quality or voice." },
        { num: "05", strong: "You want live peer momentum:", text: "Because knowing more is never the same as executing more." },
      ],
      notTitle: "What this is not:",
      notItems: [
        "✕ It is not a done-for-you channel agency.",
        "✕ It is not a “guaranteed viral views” get-rich-quick scheme.",
        "✕ It is not “come sit in a classroom all day taking notes.”",
        "✕ It is not one single niche that everybody copies.",
      ],
      banner: "2 HOURS DAILY CLASS / AUDIT. THE REST OF THE DAY = LIVE EXECUTION.",
    },
    environment: {
      eyebrow: "THE PHYSICAL ENVIRONMENT",
      heading: "Enough Friction Removed That You Can Focus on the Work",
      desc: "Located in premium residential surroundings in Johar Town, Lahore.",
      items: [
        { title: "Fast 300 Mbps Fiber", desc: "High-speed internet line with backup connection for rapid cloud rendering and uploads." },
        { title: "Zero Power Cuts", desc: "Hybrid solar system + automated industrial generator failsafe. Work never stops." },
        { title: "Home-Cooked Food", desc: "Fresh, nutritious meals included for residents so you stay energized and in flow state." },
        { title: "Daily Housekeeping", desc: "Fresh linens, towels, and cleaned workstations. Zero domestic chores." },
        { title: "Unlimited Coffee", desc: "Freshly brewed coffee and refreshments built for long, productive sprint days." },
        { title: "Johar Town Location", desc: "Prime Lahore sector near Emporium Mall, Canal Road, and quiet residential surroundings." },
        { title: "Operator Spaces", desc: "Dedicated ergonomic desk setups, quiet booths for recording, and shared review lounges." },
        { title: "Cohort Synergy", desc: "Live surrounded by serious builders solving the exact same retention and growth hurdles." },
      ],
    },
    pricing: {
      eyebrow: "SIMPLE ONE-TIME PRICING",
      heading: "Pay for Execution Depth. Not for “More Information.”",
      desc: "Core knowledge stays consistent. Longer stays buy more time to build, break, correct, and re-run your systems with direct feedback.",
      pkg1Badge: "FAST ENTRY",
      pkg1Title: "10-Day Sprint",
      pkg1Focus: "Ideal for rapid breakthrough and single-system installation.",
      pkg1LocalLabel: "Lahore Local Operator (Day Pass)",
      pkg1LocalPrice: "PKR 60,000",
      pkg1LocalNote: "No stay / meals",
      pkg1ResLabel: "Creator Residency (Stay Included)",
      pkg1ResPrice: "PKR 100,000",
      pkg1ResNote: "Stay + food + housekeeping + coffee",
      pkg1CallNote: "⚡ Residency: 5 one-to-one execution calls within 90 days",
      pkg1List: [
        "2-hour structured daily class & audit",
        "Rest of the day live sprinting on compound floor",
        "All 8 core systems & value modules included",
        "1:1 strategy alignment & bottleneck diagnosis",
        "Local pass includes 1 execution call / month",
      ],
      pkg1Btn: "Apply for 10-Day Sprint →",

      pkg2Popular: "MOST POPULAR · BEST VALUE",
      pkg2Badge: "BEST VALUE",
      pkg2Title: "15-Day Build Sprint",
      pkg2Focus: "Build it, test it, get feedback, and re-run your production pipeline.",
      pkg2LocalLabel: "Lahore Local Operator (Day Pass)",
      pkg2LocalPrice: "PKR 80,000",
      pkg2LocalNote: "≈ PKR 5,333 / day · No stay/meals",
      pkg2ResLabel: "Creator Residency (Stay Included)",
      pkg2ResPrice: "PKR 140,000",
      pkg2ResNote: "≈ PKR 9,333 / day · Stay + meals + coffee",
      pkg2CallNote: "⚡ Residency: 7 one-to-one execution calls within 90 days",
      pkg2List: [
        "Same core systems knowledge, double the execution cycles",
        "Multiple build/review/re-run iterations with Abrar",
        "Multi-agent workflow and prompt dataset corrections",
        "Completed digital deliverables before departing",
        "Local pass includes 1 execution call / month",
      ],
      pkg2Btn: "Apply for 15-Day Sprint →",

      pkg3Badge: "WAITLIST",
      pkg3Title: "30-Day Residency",
      pkg3Focus: "Maximum operating immersion and complete systemization.",
      pkg3FullTitle: "CURRENTLY FULL · WAITLIST ONLY",
      pkg3FullDesc: "Accepting whitelist registrations for the next month cohort.",
      pkg3CallNote: "⚡ Residency: 10 execution calls within 90 days",
      pkg3List: [
        "Same core systems with maximum live repetition",
        "Longer data-training and fine-tuning cycles",
        "Full operating transformation & delegation frameworks",
        "90-day post-residency roadmap with weekly check-ins",
      ],
      pkg3Btn: "Join 30-Day Waitlist →",
      bottomBanner: "15 ACTIVE OPERATORS MAX · 10 RESIDENTIAL + 5 LOCAL · 10-DAY & 15-DAY SEATS CURRENTLY OPEN",
    },
    accountability: {
      eyebrow: "POST-RESIDENCY ACCOUNTABILITY",
      heading: "The System Still Has to Survive Without the House",
      desc: "We do not abandon you once your stay completes. Every package includes direct accountability calls to ensure your system keeps running.",
      items: [
        { eyebrow: "LOCAL PASS", title: "Local Operator", desc: "1 execution and accountability review call per month following your sprint completion." },
        { eyebrow: "10-DAY RESIDENT", title: "10-Day Residency", desc: "5 one-to-one execution-cycle calls within 90 days to diagnose bottlenecks and tune outputs." },
        { eyebrow: "15-DAY RESIDENT", title: "15-Day Residency", desc: "7 one-to-one execution-cycle calls within 90 days to review live retention and team delegation." },
        { eyebrow: "30-DAY RESIDENT", title: "30-Day Residency", desc: "10 structured calls within 90 days to oversee full system scaling and multi-channel expansion." },
      ],
      noticeStrong: "THE FOLLOW-UP QUESTION IS NOT “DID YOU ENJOY THE COLONY?”",
      noticeSmall: "It is: how many videos did your system actually produce, what became operational, where did it break, and what do we fix next?",
    },
    faq: {
      eyebrow: "FREQUENTLY ASKED QUESTIONS",
      heading: "Clear Answers for Serious Operators",
      items: [
        {
          q: "How does the screening process work?",
          a: "Submitting the form puts you in the applicant queue with zero financial charge. If your build and goals match what Content Colony delivers, our team schedules a brief WhatsApp screening call to confirm dates, logistics, and accommodations. Payment is only collected once formally accepted.",
        },
        {
          q: "What is the difference between Local Operator and Creator Residency?",
          a: "Creator Residency includes full on-site accommodation in our Johar Town compound, chef-prepared meals, daily housekeeping, and 24/7 access. Local Operator is a day-pass for Lahore residents who commute from home and do not require overnight lodging or meals.",
        },
        {
          q: "What equipment should I bring?",
          a: "Bring your laptop or primary workstation, mouse, headphones, and your storage drives. We provide high-speed 300 Mbps fiber line, uninterrupted solar+generator backup, ergonomic desks, and private recording spaces.",
        },
        {
          q: "Can I bring a team member or video editor?",
          a: "Yes. If you wish to bring an editor or co-founder, indicate this during your screening call so we can arrange adjacent workstation seating and appropriate accommodation suites.",
        },
      ],
    },
  },

  roman: {
    dir: "ltr",
    topBadge: "BATCH ADMISSIONS OPEN",
    topBanner: "SIRF 15 OPERATORS MAX · 10 RESIDENTIAL + 5 LOCAL · JOHAR TOWN, LAHORE",
    nav: {
      proof: "Proofs & First Batch",
      compare: "Comparison",
      value: "Systems & Value",
      packages: "Packages & Fees",
      environment: "House Environment",
      apply: "Apply Karein",
      applyCta: "Whitelist Application Bhein →",
    },
    hero: {
      tag: "DOOR 02 — IRL LIVE CREATOR COMPOUND · JOHAR TOWN, LAHORE",
      h1Line1: "Aik Clear Goal Le Kar Aayein.",
      h1Line2: "Mukammal Kaam Aur Systems Ke Sath Wapas Jayein.",
      sub: "Aap yahan koi bed, table, khana ya aam video course nahi khareed rahe. Content Colony ek Creator Execution Residency hai: jahan aap reh kar, expert access aur direct reviews ke sath apna actual YouTube & AI media pipeline mukammal karte hain.",
      noticeStrong: "Content Colony isi farq ko khatam karne ke liye banayi gayi hai.",
      noticeSmall: "Aap pehle operating logic samajhte hain, aur phir baqi poora din apne market, format aur production model par live execute karte hain.",
      btnInside: "Andar Ka Mahol Dekhein →",
      btnPricing: "Packages & Fees Check Karein",
      stats: {
        stat1Val: "15",
        stat1Label: "Operators Maximum Limit",
        stat2Val: "2 Ghante",
        stat2Label: "Daily Class & Direct Reviews",
        stat3Val: "Baqi Din",
        stat3Label: "Live Sprinting & Execution",
        stat4Val: "Johar Town",
        stat4Label: "Prime Lahore Location",
      },
    },
    compare: {
      eyebrow: "ASAL MASLE KA MUWAZNA KAREIN",
      heading: "Aapka Current Setup vs Coworking vs Content Colony",
      desc: "Aam coworking space aapko sirf baithne ki jagah deta hai. Content Colony aapke kaam ko aik proven operating system deta hai.",
      col1Eyebrow: "CURRENT SETUP",
      col1Title: "Akele Ghar Par Kaam",
      col2Eyebrow: "AAM OPTION",
      col2Title: "Normal Coworking Space",
      col3Eyebrow: "EXECUTION COMPOUND",
      col3Title: "Content Colony",
      row1: "Desk / Freedom",
      row2: "Execution Energy",
      row3: "System Diagnosis",
      row4: "Data Training",
      row5: "Multi-Agent Systems",
      row6: "Post-Sprint Accountability",
      maybe: "SHAYAD",
      low: "BOHOT KAM",
      self: "KHUD HI",
      no: "NAHI",
      yes: "HAAN",
      mixed: "NORMAL",
      builtin: "BUILT-IN (LAZMI)",
      noticeStrong: "COWORKING SPACE SIRF BAITHNE KI JAGAH DETA HAI. CONTENT COLONY AAPKE SYSTEM KO ENGINE DETA HAI.",
      noticeSmall: "Mehnat aapki apni hogi, lekin peer momentum, live structure aur systematic feedback ke sath output 10x fast hoga.",
    },
    value: {
      eyebrow: "AAP ASAL MEIN KYA SEEKHEIN AUR BANAENGE",
      heading: "“Aam AI Tools” Aur Real Business Ka Farq",
      desc: "Single ChatGPT prompts se nikal kar aik stable, repeatable media production system build karein.",
      pillars: [
        {
          title: "01 · Custom Data Training",
          desc: "AI ko apni research, top performing channels, viral formats aur tone rules par train karein.",
        },
        {
          title: "02 · Real Automation",
          desc: "Samjhein ke kya cheez automate karni hai (research, transcripts, tags) aur kahan human dimagh chahiye (hooks, pacing).",
        },
        {
          title: "03 · Sustainable Business Model",
          desc: "Sirf aik video nahi balki traffic, retention, packaging aur Dollar economics ka complete scale plan.",
        },
        {
          title: "04 · Batch Production Pipeline",
          desc: "Aik aik video ke dhakkey se nikal kar multi-asset pipelines banayein jo har hafte videos ka batch deliver karein.",
        },
        {
          title: "05 · Market & Audience Psychology",
          desc: "US/UK viewers ki demand, high-RPM angles, retention graph dips aur monetization opportunities ko read karein.",
        },
        {
          title: "06 · Multi-Agent Architecture",
          desc: "Research, scripting, b-roll selection aur editing logic ke liye specialized bots ka autonomous network banayein.",
        },
        {
          title: "07 · Algorithmic Physics",
          desc: "Samjhein ke CTR packaging, pehle 30 seconds ki response aur YouTube distribution curve aapas mein kaise link hoti hain.",
        },
        {
          title: "08 · Repeatable Production SOPs",
          desc: "Documentary, animation ya commentary format—har cheez ke documented SOPs banayein taake team ko delegate kar sakein.",
        },
      ],
    },
    mentors: {
      eyebrow: "DIRECT EXPERT GUIDANCE",
      heading: "System Architecture Aur Ground Reality",
      desc: "Un logon se direct live interaction jo high-scale digital properties aur millions of views handle kar rahe hain.",
      abrarEyebrow: "SYSTEM ARCHITECT",
      abrarName: "Abrar Nadir",
      abrarP1: "Abrar ka kaam algorithm ke invisible logic ko samjhana hai: market dynamics, custom data training, automation economics aur scalable system architecture.",
      abrarP2: "Maqsad sab ko aik hi copy-paste template dena nahi hai. Maqsad operators ko is qabil banana hai ke wo apne bottlenecks khud pakar sakein aur apna system chala sakein.",
      zahidEyebrow: "PRODUCTION REALITY · 1M+ VIEWS",
      zahidName: "Zahid Iqbal · Creative AI Systems",
      zahidP1: "Zahid is baat ka saboot hain ke jab AI systems ko high-volume creative output mein lagaya jaye: AI drama, animation aur movie-level storytelling.",
      zahidP2: "Unka session ground reality par focused hai—jisme unka recent video project sirf 23 ghanton mein 1 Million se ziada views cross kar gaya.",
      zahidBadge: "⚡ 24 Ghanton Mein 1M+ Views · Live Production Proof",
    },
    criteria: {
      eyebrow: "SELECTION CRITERIA",
      heading: "Beginners Welcome Hain. Operators Sab Se Ziada Value Nikalenge.",
      needTitle: "Aapko iski zaroorat hai agar...",
      needItems: [
        { num: "01", strong: "Aapko real business model chahiye:", text: "Sirf prompts ki list ya niches ke naam nahi." },
        { num: "02", strong: "Aapko trained AI chahiye:", text: "Aapke data, research aur format par kaam karne wala system." },
        { num: "03", strong: "Aapko specialized agents chahiye:", text: "Aik hi baray generic prompt par waqt barbad karne ke bajaye." },
        { num: "04", strong: "Aapko batch output banana hai:", text: "Bina quality aur retention kharab kiye ziada videos banana." },
        { num: "05", strong: "Aapko live peer pressure chahiye:", text: "Kyunke sirf seekhne aur asoolan execute karne mein zameen aasman ka farq hai." },
      ],
      notTitle: "Yeh program kya nahi hai:",
      notItems: [
        "✕ Yeh koi Done-For-You agency nahi hai.",
        "✕ Yeh raaton raat ameer banne ka koi jadoo nahi hai.",
        "✕ Yeh sara din class me baith kar sirf notes lene ka course nahi hai.",
        "✕ Yeh aik hi niche nahi hai jo sab copy karein.",
      ],
      banner: "DAILY 2 GHANTE CLASS / DIRECT AUDIT. BAQI POORA DIN = LIVE SPRINTING.",
    },
    environment: {
      eyebrow: "PHYSICAL RESIDENCE ENVIRONMENT",
      heading: "Har Qisam Ki Tension Khatam Taake Aap Kaam Par Focus Karein",
      desc: "Johar Town, Lahore ke shant aur secure residential area mein waqia.",
      items: [
        { title: "Fast 300 Mbps Fiber Internet", desc: "Dual backup connection ke sath cloud rendering aur heavy uploads ke liye uninterrupted speed." },
        { title: "Zero Load Shedding (24/7 Power)", desc: "Hybrid solar system + industrial generator failsafe. Kaam aik second ke liye bhi nahi rukta." },
        { title: "Ghar Ka Taza Khana", desc: "Residents ke liye 3 time taza, sehat-mand aur nutritious khana included taake flow break na ho." },
        { title: "Daily Housekeeping", desc: "Rozana safai, clean bedsheets aur workstations. Domestic kamo ki zero fikar." },
        { title: "Unlimited Coffee & Chai", desc: "Freshly brewed coffee aur refreshments jo lambe productive sprints ke liye fuel ka kaam karein." },
        { title: "Prime Johar Town Location", desc: "Emporium Mall aur Canal Road ke qareeb, prime aur safe residential compound." },
        { title: "Dedicated Operator Desks", desc: "Ergonomic chairs, private recording booths aur group review lounges." },
        { title: "Serious Cohort Synergy", desc: "Aise logon ke darmiyan rehna jo aapki tarah din raat execution aur growth par focus kar rahe hain." },
      ],
    },
    pricing: {
      eyebrow: "TRANSPARENT ONE-TIME PACKAGES",
      heading: "Execution Ki Depth Ke Paise Hain, Na Ke “Information” Ke.",
      desc: "Core systems same hain. Ziada dinon ka matlab hai apna system banane, test karne aur live feedback ke sath theek karne ka ziada waqt.",
      pkg1Badge: "FAST ENTRY",
      pkg1Title: "10-Day Sprint",
      pkg1Focus: "Single core system install karne aur rapid breakthrough ke liye best.",
      pkg1LocalLabel: "Lahore Local Operator (Day Pass)",
      pkg1LocalPrice: "PKR 60,000",
      pkg1LocalNote: "Rehaish / khana shamil nahi",
      pkg1ResLabel: "Creator Residency (Rehaish Shamil)",
      pkg1ResPrice: "PKR 100,000",
      pkg1ResNote: "Rehaish + khana + safai + coffee shamil",
      pkg1CallNote: "⚡ Residency: 90 dinon mein 5 direct 1-on-1 execution calls",
      pkg1List: [
        "Daily 2-hour structured class aur direct audit",
        "Baqi poora din compound floor par live sprinting",
        "Tamam 8 core systems aur modules shamil",
        "1:1 strategy alignment aur bottleneck diagnosis",
        "Local pass mein 1 review call / month shamil",
      ],
      pkg1Btn: "10-Day Sprint Ke Liye Apply Karein →",

      pkg2Popular: "SAB SE POPULAR · BEST VALUE",
      pkg2Badge: "BEST VALUE",
      pkg2Title: "15-Day Build Sprint",
      pkg2Focus: "System banayein, test karein, feedback lein aur pipeline live run karein.",
      pkg2LocalLabel: "Lahore Local Operator (Day Pass)",
      pkg2LocalPrice: "PKR 80,000",
      pkg2LocalNote: "≈ PKR 5,333 / din · Rehaish/khana nahi",
      pkg2ResLabel: "Creator Residency (Rehaish Shamil)",
      pkg2ResPrice: "PKR 140,000",
      pkg2ResNote: "≈ PKR 9,333 / din · Rehaish + khana + coffee",
      pkg2CallNote: "⚡ Residency: 90 dinon mein 7 direct 1-on-1 execution calls",
      pkg2List: [
        "Wohi core knowledge, lekin double execution cycles",
        "Abrar ke sath multiple reviews aur corrections",
        "Multi-agent workflow aur prompt dataset testing",
        "Wapas jane se pehle mukammal ready digital deliverables",
        "Local pass mein 1 review call / month shamil",
      ],
      pkg2Btn: "15-Day Sprint Ke Liye Apply Karein →",

      pkg3Badge: "WAITLIST",
      pkg3Title: "30-Day Residency",
      pkg3Focus: "Complete immersion aur mukammal system delegation.",
      pkg3FullTitle: "CURRENTLY FULL · SIRF WAITLIST",
      pkg3FullDesc: "Agli batch ke liye applications open hain.",
      pkg3CallNote: "⚡ Residency: 90 dinon mein 10 execution calls",
      pkg3List: [
        "Core systems ke sath maximum live repetition",
        "Longer data-training aur channel fine-tuning",
        "Complete operating transformation aur team delegation",
        "90-day post-residency roadmap weekly check-ins ke sath",
      ],
      pkg3Btn: "30-Day Waitlist Join Karein →",
      bottomBanner: "15 ACTIVE OPERATORS MAX · 10 RESIDENTIAL + 5 LOCAL · 10-DAY & 15-DAY SEATS CURRENTLY OPEN",
    },
    accountability: {
      eyebrow: "POST-RESIDENCY SUPPORT",
      heading: "System Ko Ghar Jane Ke Baad Bhi Kamyabi Se Chalna Hai",
      desc: "Residency khatam hone ke baad hum aapko chhortay nahi hain. Har package mein direct accountability calls shamil hain.",
      items: [
        { eyebrow: "LOCAL PASS", title: "Local Operator", desc: "Sprint ke baad 1 execution review call har mahine." },
        { eyebrow: "10-DAY RESIDENT", title: "10-Day Residency", desc: "90 dinon mein 5 direct 1-on-1 calls taake bottlenecks diagnose kiye ja sakein." },
        { eyebrow: "15-DAY RESIDENT", title: "15-Day Residency", desc: "90 dinon mein 7 direct calls live retention aur delegation review karne ke liye." },
        { eyebrow: "30-DAY RESIDENT", title: "30-Day Residency", desc: "90 dinon mein 10 structured calls multi-channel scale ko monitor karne ke liye." },
      ],
      noticeStrong: "HAMARA SAWAAL YEH NAHI HOGA KE “AAP KO MAZA AAYA YA NAHI?”",
      noticeSmall: "Sawaal yeh hoga: aapke system ne kitni videos nikalein, kya cheez chal rahi hai aur agla bottleneck kya hai?",
    },
    faq: {
      eyebrow: "AKSARYAT KE SAWALAT (FAQ)",
      heading: "Serious Creators Ke Liye Wazeh Jawabat",
      items: [
        {
          q: "Screening ka tareeqa kya hai?",
          a: "Form submit karne par aap applicant queue me shamil ho jate hain, iski koi fees nahi hai. Agar aapka profile Content Colony ke goals se match karta hai, toh team WhatsApp par brief screening call karke dates aur accommodation confirm karti hai. Fees sirf accept hone ke baad li jati hai.",
        },
        {
          q: "Local Operator aur Creator Residency mein kya farq hai?",
          a: "Creator Residency mein Johar Town compound mein rehaish, khana, housekeeping aur 24/7 access shamil hai. Local Operator Lahore ke residents ke liye day-pass hai jo sham ko apne ghar chale jate hain.",
        },
        {
          q: "Mujhe sath kya saman lana hoga?",
          a: "Apna laptop ya PC setup, mouse, headphones aur hard drives le kar aayein. High-speed 300 Mbps fiber line, solar power backup aur ergonomic desks hum provide karte hain.",
        },
        {
          q: "Kya main apne team member ya video editor ko sath la sakta hoon?",
          a: "Jee haan! Agar aap apne editor ya co-founder ko sath lana chahte hain toh screening call par bata dein taake unke sath adjacent seating aur room arrange kiya ja sake.",
        },
      ],
    },
  },

  ur: {
    dir: "rtl",
    topBadge: "داخلے جاری ہیں",
    topBanner: "زیادہ سے زیادہ 15 آپریٹرز · 10 رہائشی + 5 لوکل · جوہر ٹاؤن، لاہور",
    nav: {
      proof: "ثبوت اور پہلا بیچ",
      compare: "موازنہ",
      value: "سسٹمز اور ویلیو",
      packages: "پیکجز اور فیس",
      environment: "رہائشی ماحول",
      apply: "درخواست دیں",
      applyCta: "وائٹ لسٹ درخواست جمع کروائیں ←",
    },
    hero: {
      tag: "DOOR 02 — لائیو کریئیٹر کمپاؤنڈ · جوہر ٹاؤن، لاہور",
      h1Line1: "ایک واضح مقصد کے ساتھ آئیں۔",
      h1Line2: "مکمل کام اور ورکنگ سسٹم کے ساتھ واپس جائیں۔",
      sub: "آپ یہاں کوئی بستر، میز، کھانا یا محض ایک ویڈیو کورس نہیں خرید رہے۔ کنٹینٹ کالونی ایک کریئیٹر ایگزیکیوشن ریزیڈنسی ہے: جہاں آپ رہ کر، ایکسپرٹ رہنمائی اور روزانہ لائیو فیڈ بیک کے ساتھ اپنا یوٹیوب اور اے آئی سسٹم تیار کرتے ہیں۔",
      noticeStrong: "کنٹینٹ کالونی اسی خلیج کو ختم کرنے کے لیے بنائی گئی ہے۔",
      noticeSmall: "آپ پہلے آپریٹنگ لاجک سمجھتے ہیں، اور پھر باقی پورا دن اپنے فارمیٹ، مارکیٹ اور پروڈکشن ماڈل پر لائیو کام کرتے ہیں۔",
      btnInside: "اندر کا ماحول دیکھیں ←",
      btnPricing: "پیکجز اور فیس کی تفصیلات",
      stats: {
        stat1Val: "15",
        stat1Label: "زیادہ سے زیادہ آپریٹرز",
        stat2Val: "2 گھنٹے",
        stat2Label: "روزانہ کلاس اور آڈٹ",
        stat3Val: "باقی دن",
        stat3Label: "لائیو کام اور پریکٹس",
        stat4Val: "جوہر ٹاؤن",
        stat4Label: "لاہور کا بہترین علاقہ",
      },
    },
    compare: {
      eyebrow: "اصل مسئلے کا موازنہ کریں",
      heading: "آپ کا موجودہ سیٹ اپ بمقابلہ کوورکنگ بمقابلہ کنٹینٹ کالونی",
      desc: "ایک عام کوورکنگ سپیس آپ کو صرف بیٹھنے کی جگہ دیتی ہے۔ کنٹینٹ کالونی آپ کے کام کو ایک مکمل آپریٹنگ سسٹم فراہم کرتی ہے۔",
      col1Eyebrow: "موجودہ سیٹ اپ",
      col1Title: "گھر پر اکیلے کام",
      col2Eyebrow: "روایتی آپشن",
      col2Title: "عام کوورکنگ سپیس",
      col3Eyebrow: "ایگزیکیوشن کمپاؤنڈ",
      col3Title: "کنٹینٹ کالونی",
      row1: "ڈیسک اور آزادی",
      row2: "کام کی رفتار اور انرجی",
      row3: "مسائل کی تشخیص",
      row4: "کسٹم ڈیٹا ٹریننگ",
      row5: "ملٹی ایجنٹ سسٹمز",
      row6: "کیمپ کے بعد احتساب",
      maybe: "شاید",
      low: "بہت کم",
      self: "خود ہی",
      no: "نہیں",
      yes: "ہاں",
      mixed: "معمولی",
      builtin: "بلٹ اِن (لازمی)",
      noticeStrong: "کوورکنگ سپیس صرف بیٹھنے کی جگہ دیتی ہے۔ کنٹینٹ کالونی آپ کے سسٹم کو انجن فراہم کرتی ہے۔",
      noticeSmall: "محنت آپ کی اپنی ہوگی، لیکن لائیو ماحول اور تجربہ کار لوگوں کی رہنمائی میں آپ کی رفتار دس گنا بڑھ جاتی ہے۔",
    },
    value: {
      eyebrow: "آپ اصل میں کیا سیکھیں اور بنائیں گے",
      heading: "عام اے آئی ٹولز اور ایک پائیدار بزنس کا فرق",
      desc: "صرف ایک پرامپٹ سے آگے بڑھ کر ایک پائیدار اور خودکار میڈیا پروڈکشن کا سسٹم قائم کریں۔",
      pillars: [
        {
          title: "01 · کسٹم ڈیٹا ٹریننگ",
          desc: "اے آئی کو اپنی تحقیق، کامیاب چینلز اور مخصوص لہجے پر ٹرین کرنا سیکھیں۔",
        },
        {
          title: "02 · حقیقی آٹومیشن",
          desc: "سمجھیں کہ کس چیز کو خودکار بنانا ہے اور کہاں انسانی سوچ اور مہارت درکار ہے۔",
        },
        {
          title: "03 · پائیدار بزنس ماڈل",
          desc: "صرف ایک ویڈیو نہیں بلکہ ٹریفک، کسٹم پیکجنگ اور ڈالرز کمانے کا مکمل ماڈل۔",
        },
        {
          title: "04 · بیچ پروڈکشن سسٹم",
          desc: "ہر روز ایک ویڈیو کی فکر سے نکل کر ایسی پائپ لائن بنائیں جو ہفتہ وار ویڈیوز کا بیچ تیار کرے۔",
        },
        {
          title: "05 · مارکیٹ اور ناظرین کی نفسیات",
          desc: "امریکہ اور یورپ کے ناظرین کی مانگ، ہائی آر پی ایم اور ریٹینشن کو سمجھیں۔",
        },
        {
          title: "06 · ملٹی ایجنٹ آرکیٹیکچر",
          desc: "ریسرچ، اسکرپٹنگ اور ویڈیو ایڈیٹنگ کے لیے مخصوص باٹس کا نیٹ ورک بنائیں۔",
        },
        {
          title: "07 · الگورتھم کی سائنس",
          desc: "سمجھیں کہ سی ٹی آر، ابتدائی 30 سیکنڈز اور یوٹیوب ڈسٹری بیوشن کا آپس میں کیا تعلق ہے۔",
        },
        {
          title: "08 · پروڈکشن ایس او پیز",
          desc: "ڈاکیومینٹری ہو یا اینیمیشن—ہر فارمیٹ کے تحریری اصول بنائیں تاکہ ٹیم کو کام سونپ سکیں۔",
        },
      ],
    },
    mentors: {
      eyebrow: "براہِ راست رہنمائی",
      heading: "سسٹم آرکیٹیکچر اور زمینی حقیقت",
      desc: "ان لوگوں سے براہ راست سیکھیں جو بڑے پیمانے پر ڈیجیٹل چینلز اور لاکھوں ویوز سنبھال رہے ہیں۔",
      abrarEyebrow: "سسٹم آرکیٹیکٹ",
      abrarName: "ابرار نادر",
      abrarP1: "ابرار کا کام الگورتھم کے چھپے ہوئے پہلوؤں کو واضح کرنا ہے: مارکیٹ کے تقاضے، کسٹم ڈیٹا ٹریننگ اور اسکیل ایبل سسٹم ڈیزائن۔",
      abrarP2: "مقصد سب کو ایک ہی نقل شدہ ٹیمپلیٹ دینا نہیں، بلکہ آپریٹرز کو اس قابل بنانا ہے کہ وہ اپنے مسائل خود حل کر سکیں۔",
      zahidEyebrow: "پروڈکشن کا عملی تجربہ · 10 لاکھ+ ویوز",
      zahidName: "زاہد اقبال · کریئیٹو اے آئی سسٹمز",
      zahidP1: "زاہد اس بات کا عملی ثبوت ہیں کہ جب اے آئی سسٹمز کو تخلیقی صلاحیت کے ساتھ جوڑا جائے تو کیا نتائج آتے ہیں۔",
      zahidP2: "ان کا سیشن وائرل مواد کی پروڈکشن پر مبنی ہے—جس میں ان کی ایک حالیہ ویڈیو نے صرف 23 گھنٹوں میں 10 لاکھ سے زیادہ ویوز حاصل کیے۔",
      zahidBadge: "⚡ 24 گھنٹوں میں 10 لاکھ سے زائد ویوز · عملی ثبوت",
    },
    criteria: {
      eyebrow: "انتخاب کا معیار",
      heading: "نئے سیکھنے والے بھی خوش آمدید ہیں، لیکن آپریٹرز سب سے زیادہ فائدہ اٹھائیں گے۔",
      needTitle: "آپ کو اس کی ضرورت ہے اگر...",
      needItems: [
        { num: "01", strong: "آپ کو حقیقی بزنس ماڈل چاہیے:", text: "صرف پرامپٹس یا ٹاپکس کی لسٹ نہیں۔" },
        { num: "02", strong: "آپ کو اپنے مطابق ٹرین شدہ اے آئی چاہیے:", text: "جو آپ کے انداز اور ریسرچ پر کام کرے۔" },
        { num: "03", strong: "آپ کو خودکار ایجنٹس کا نیٹ ورک چاہیے:", text: "ایک ہی عام پرامپٹ پر وقت ضائع کرنے کے بجائے۔" },
        { num: "04", strong: "آپ کو زیادہ اور معیاری مواد تیار کرنا ہے:", text: "بغیر معیار گرائے پروڈکشن کی رفتار بڑھانا۔" },
        { num: "05", strong: "آپ کو سنجیدہ ماحول اور ساتھی چاہئیں:", text: "کیونکہ صرف جاننے اور عملی طور پر کرنے میں بہت بڑا فرق ہے۔" },
      ],
      notTitle: "یہ پروگرام کیا نہیں ہے:",
      notItems: [
        "✕ یہ کوئی ڈن فار یو ایجنسی سروس نہیں ہے۔",
        "✕ یہ راتوں رات امیر بننے کی کوئی اسکیم نہیں ہے۔",
        "✕ یہ پورا دن کلاس میں بیٹھ کر صرف نوٹس لینے کا کورس نہیں ہے۔",
        "✕ یہ کوئی ایک فکسڈ فارمیٹ نہیں جسے سب کاپی کریں۔",
      ],
      banner: "روزانہ 2 گھنٹے کلاس اور جائزہ۔ باقی پورا دن = لائیو کام اور پریکٹس۔",
    },
    environment: {
      eyebrow: "رہائشی سہولیات",
      heading: "ہر قسم کی رکاوٹیں ختم تاکہ آپ صرف کام پر توجہ دے سکیں",
      desc: "جوہر ٹاؤن، لاہور کے محفوظ اور پرسکون علاقے میں واقع۔",
      items: [
        { title: "تیز ترین 300 ایم بی پی ایس انٹرنیٹ", desc: "کلاؤڈ رینڈرنگ اور اپ لوڈنگ کے لیے بیک اپ کنکشن کے ساتھ تیز رفتار فائبر لائن۔" },
        { title: "بلا تعطل بجلی (24/7 پاور)", desc: "سولر سسٹم اور صنعتی جنریٹر بیک اپ۔ کام ایک سیکنڈ کے لیے بھی نہیں رکتا۔" },
        { title: "گھر کا تازہ کھانا", desc: "رہائشیوں کے لیے تازہ، معیاری اور صحت بخش کھانا شامل ہے تاکہ آپ کی توانائی برقرار رہے۔" },
        { title: "روزانہ صفائی", desc: "روزانہ صفائی، دھلی ہوئی چادریں اور صاف ستھرے ڈیسک۔ گھریلو کاموں کی فکر ختم۔" },
        { title: "لامحدود کافی اور چائے", desc: "دن رات محنت کرنے والوں کے لیے تازہ تیار شدہ کافی اور چائے کی بلا تعطل فراہمی۔" },
        { title: "جوہر ٹاؤن کا بہترین مقام", desc: "ایمپوریم مال اور کینال روڈ کے قریب، پرسکون اور محفوظ رہائشی کمپاؤنڈ۔" },
        { title: "مخصوص ورک اسپیس", desc: "آرام دہ کرسیاں، پرائیویٹ ریکارڈنگ بوتھ اور اجتماعی میٹنگ رومز۔" },
        { title: "سنجیدہ ساتھیوں کا ساتھ", desc: "ان لوگوں کے درمیان رہیں جو آپ ہی کی طرح سنجیدگی سے ترقی پر توجہ مرکوز کیے ہوئے ہیں۔" },
      ],
    },
    pricing: {
      eyebrow: "شفاف اور یکمشت فیس",
      heading: "فیس عملی کام کی ہے، محض معلومات کی نہیں۔",
      desc: "بنیادی سسٹمز سب کے لیے یکساں ہیں۔ زیادہ دن رہنے کا مطلب اپنے سسٹم کو آزمانے اور فیڈ بیک کے ساتھ درست کرنے کا زیادہ وقت ہے۔",
      pkg1Badge: "تیز ترین انٹری",
      pkg1Title: "10 روزہ اسپرنٹ",
      pkg1Focus: "ایک بنیادی سسٹم کو فوری انسٹال اور رن کرنے کے لیے بہترین۔",
      pkg1LocalLabel: "لاہور لوکل آپریٹر (ڈے پاس)",
      pkg1LocalPrice: "60,000 روپے",
      pkg1LocalNote: "رہائش اور کھانا شامل نہیں",
      pkg1ResLabel: "کریئیٹر ریزیڈنسی (رہائش شامل)",
      pkg1ResPrice: "100,000 روپے",
      pkg1ResNote: "رہائش + کھانا + صفائی + کافی شامل ہے",
      pkg1CallNote: "⚡ ریزیڈنسی: 90 دنوں میں 5 براہ راست ون آن ون فالو اپ کالز",
      pkg1List: [
        "روزانہ 2 گھنٹے کلاس اور ون آن ون رہنمائی",
        "باقی پورا دن لائیو کام اور پریکٹس",
        "تمام 8 بنیادی ماڈیولز اور سسٹمز شامل",
        "انفرادی حکمتِ عملی اور رکاوٹوں کی تشخیص",
        "لوکل پاس میں ماہانہ 1 کال شامل ہے",
      ],
      pkg1Btn: "10 روزہ اسپرنٹ کے لیے اپلائی کریں ←",

      pkg2Popular: "سب سے زیادہ مقبول · بہترین ویلیو",
      pkg2Badge: "بہترین ویلیو",
      pkg2Title: "15 روزہ بلڈ اسپرنٹ",
      pkg2Focus: "سسٹم بنائیں، ٹیسٹ کریں، فیڈ بیک لیں اور لائیو چلائیں۔",
      pkg2LocalLabel: "لاہور لوکل آپریٹر (ڈے پاس)",
      pkg2LocalPrice: "80,000 روپے",
      pkg2LocalNote: "تقریباً 5,333 روپے یومیہ · رہائش شامل نہیں",
      pkg2ResLabel: "کریئیٹر ریزیڈنسی (رہائش شامل)",
      pkg2ResPrice: "140,000 روپے",
      pkg2ResNote: "تقریباً 9,333 روپے یومیہ · رہائش + کھانا شامل",
      pkg2CallNote: "⚡ ریزیڈنسی: 90 دنوں میں 7 براہ راست ون آن ون کالز",
      pkg2List: [
        "وہی بنیادی نالج، لیکن دگنی پریکٹس اور وقت",
        "ابرار کے ساتھ بار بار جائزہ اور بہتری کے مواقع",
        "ملٹی ایجنٹ سسٹمز اور پرامپٹس کی تفصیلی جانچ",
        "واپس جانے سے پہلے مکمل طور پر تیار کام",
        "لوکل پاس میں ماہانہ 1 کال شامل ہے",
      ],
      pkg2Btn: "15 روزہ اسپرنٹ کے لیے اپلائی کریں ←",

      pkg3Badge: "ویٹ لسٹ",
      pkg3Title: "30 روزہ ریزیڈنسی",
      pkg3Focus: "مکمل فوکس اور کاروبار کی مکمل خودکاری۔",
      pkg3FullTitle: "فی الحال نشستیں مکمل ہیں · صرف ویٹ لسٹ",
      pkg3FullDesc: "اگلے ماہ کے بیچ کے لیے رجسٹریشن کھلی ہے۔",
      pkg3CallNote: "⚡ ریزیڈنسی: 90 دنوں میں 10 ون آن ون کالز",
      pkg3List: [
        "بنیادی سسٹمز کی بھرپور مشق اور تکرار",
        "طویل ڈیٹا ٹریننگ اور چینل کی مکمل فائن ٹیوننگ",
        "کاروبار کی مکمل تنظیم اور ٹیم کو کام سونپنے کے اصول",
        "90 روزہ لائحہ عمل اور ہفتہ وار فالو اپ",
      ],
      pkg3Btn: "30 روزہ ویٹ لسٹ میں شامل ہوں ←",
      bottomBanner: "زیادہ سے زیادہ 15 آپریٹرز · 10 رہائشی + 5 لوکل · 10 اور 15 روزہ سیٹیں کھلی ہیں",
    },
    accountability: {
      eyebrow: "کیمپ کے بعد تعاون اور رابطہ",
      heading: "سسٹم کو گھر واپسی کے بعد بھی کامیابی سے چلنا ہے",
      desc: "ریزیڈنسی مکمل ہونے کے بعد بھی رابطہ برقرار رہتا ہے۔ ہر پیکج میں مسلسل رہنمائی کی کالز شامل ہیں۔",
      items: [
        { eyebrow: "لوکل پاس", title: "لوکل آپریٹر", desc: "کیمپ کے بعد ہر ماہ ایک بار براہ راست رابطہ اور جائزہ۔" },
        { eyebrow: "10 روزہ ریزیڈنٹ", title: "10 روزہ ریزیڈنسی", desc: "90 دنوں میں 5 تفصیلی کالز تاکہ کام میں آنے والی رکاوٹیں دور کی جا سکیں۔" },
        { eyebrow: "15 روزہ ریزیڈنٹ", title: "15 روزہ ریزیڈنسی", desc: "90 دنوں میں 7 کالز تاکہ لائیو نتائج اور ٹیم کی کارکردگی کا جائزہ لیا جا سکے۔" },
        { eyebrow: "30 روزہ ریزیڈنٹ", title: "30 روزہ ریزیڈنسی", desc: "90 دنوں میں 10 کالز تاکہ ملٹی چینل اسکیلنگ کی مکمل نگرانی کی جا سکے۔" },
      ],
      noticeStrong: "ہمارا سوال یہ نہیں ہوگا کہ “آپ کو کالونی کیسی لگی؟”",
      noticeSmall: "بلکہ یہ ہوگا: آپ کے سسٹم نے کتنی ویڈیوز بنائیں، کیا کام کر رہا ہے اور اگلی رکاوٹ کیا ہے؟",
    },
    faq: {
      eyebrow: "اکثر پوچھے جانے والے سوالات",
      heading: "سنجیدہ کریئیٹرز کے لیے واضح جوابات",
      items: [
        {
          q: "درخواست کی جانچ کا طریقہ کیا ہے؟",
          a: "فارم جمع کروانے سے آپ کا نام لسٹ میں آ جاتا ہے، اس کی کوئی فیس نہیں۔ اگر آپ کا مقصد کنٹینٹ کالونی سے مطابقت رکھتا ہے تو ٹیم واٹس ایپ پر مختصر کال کے ذریعے تاریخوں اور رہائش کی تصدیق کرتی ہے۔ فیس صرف باضابطہ منظوری کے بعد لی جاتی ہے۔",
        },
        {
          q: "لوکل آپریٹر اور ریزیڈنسی میں کیا فرق ہے؟",
          a: "کریئیٹر ریزیڈنسی میں جوہر ٹاؤن کمپاؤنڈ میں رہائش، کھانا، صفائی اور 24 گھنٹے رسائی شامل ہے۔ لوکل آپریٹر لاہور کے رہائشیوں کے لیے ڈے پاس ہے جو رات کو اپنے گھر واپس چلے جاتے ہیں۔",
        },
        {
          q: "مجھے اپنے ساتھ کیا سامان لانا ہوگا؟",
          a: "اپنا لیپ ٹاپ یا کمپیوٹر، ماؤس، ہیڈ فونز اور ہارڈ ڈرائیوز ساتھ لائیں۔ تیز رفتار انٹرنیٹ، سولر بیک اپ اور آرام دہ ورک اسپیس ہم فراہم کرتے ہیں۔",
        },
        {
          q: "کیا میں اپنے ساتھ ایڈیٹر یا ٹیم ممبر لا سکتا ہوں؟",
          a: "جی ہاں! اگر آپ اپنے ایڈیٹر یا پارٹنر کو ساتھ لانا چاہتے ہیں تو اسکریننگ کال کے دوران بتا دیں تاکہ ان کی سیٹ اور رہائش کا بندوبست کیا جا سکے۔",
        },
      ],
    },
  },
};
