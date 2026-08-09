export type PlanId = "monthly" | "lifetime" | "installments";

export const plans = [
  { id: "monthly" as const, name: "Monthly Explorer", price: "Rs 3,000", cadence: "every 30 days", cta: "Start Monthly Access", benefits: ["LMS access while subscribed", "30-day recorded roadmap", "Active resources and community", "Available updates", "Cancel before renewal"] },
  { id: "lifetime" as const, name: "Lifetime Builder", price: "Rs 30,000", cadence: "one time", cta: "Get Lifetime Access", badge: "Best value", benefits: ["All 12 modules", "Lifetime LMS access", "Execution systems and templates", "Community", "Available future updates", "No recurring Academy fee"] },
  { id: "installments" as const, name: "Three-Payment Plan", price: "3 × Rs 11,000", cadence: "Rs 33,000 total", cta: "Pay in Three Installments", benefits: ["Divided payment schedule", "Portal access under installment terms", "Lifetime access after all payments", "Checkout or support arrangement"] },
];

export const paths = [
  { id: "channel", label: "Build my channel", eyebrow: "Own the asset", text: "Create a long-term audience and a channel you control.", modules: "Start with Modules 1, 3, 4 and 6" },
  { id: "skills", label: "Sell YouTube skills", eyebrow: "Start with service", text: "Develop research, scripting, thumbnail, editing or management skills.", modules: "Start with Modules 1, 3, 6 and 9" },
  { id: "operation", label: "Build an operation", eyebrow: "Design the system", text: "Build repeatable production systems and learn to manage a team.", modules: "Start with Modules 1, 6, 8 and 11" },
];

export type Module = {
  id: string;
  days: string;
  title: string;
  items: string[];
  bonus?: string;
  result: string;
};

export const modules: Module[] = [
  {
    id: "01",
    days: "Days 1-3",
    title: "Quick Wins & Real Results",
    items: [
      "Myth-Busting: Why 99% Fail",
      "Case Study: $1,200/month in 1 hr/day",
      "Passive Income Timeline Creation",
      "10 Ready-made script prompts",
      "AI Agents setup for your workflow"
    ],
    bonus: "Copy & Paste Method for first $500",
    result: "Fast wins build your confidence and prove the system works from day one."
  },
  {
    id: "02",
    days: "Days 4-6",
    title: "🛑 Busting YouTube Myths",
    items: [
      "IP Safety & Multiple Channels",
      "AdSense Mastery & Payment Fixes",
      "Monetization Blueprint for Pakistan",
      "Copyright & Guidelines Shield",
      "Traditional vs Automation Strategy"
    ],
    result: "Shift your mindset from overwhelmed to laser-focused with a safe, legal plan."
  },
  {
    id: "03",
    days: "Days 7-10",
    title: "Finding the Best Niche",
    items: [
      "AI-Finalized Profitable Niches",
      "Research & Analyze any Niche",
      "Secret 'Niche Template' understanding",
      "2 Strategies for Unlimited Ideas",
      "Mastering CTR, AVD & RPM stats"
    ],
    bonus: "100+ Profitable Niche List",
    result: "Select a high-paying niche that is guaranteed to grow sustainably."
  },
  {
    id: "04",
    days: "Day 11-12",
    title: "Channel Setup & Launch",
    items: [
      "AI-powered Secret Optimization",
      "Secret 'Orgasm' Setup method",
      "Skip detection before channel creation",
      "100+ Insane AI Tools & Extensions",
      "50+ Creative Secret Sites"
    ],
    bonus: "Viral Success Checklist",
    result: "Your channel will be live and optimized for viral growth from the start."
  },
  {
    id: "05",
    days: "Days 12-14",
    title: "Algorithm Hijack Hacks",
    items: [
      "Fixing view drops instantly",
      "Reviving old channels method",
      "Packaging videos correctly",
      "Hacking the Recommendation engine",
      "First 24-hour success boost"
    ],
    result: "Ensure every video you upload has the highest chance to go viral."
  },
  {
    id: "06",
    days: "Days 15-17",
    title: "Hercules of Prompt Engineering",
    items: [
      "Viral Hooks discovery via AI",
      "AI Agent high-quality scripting",
      "Natural AI Narration (5 free tools)",
      "Long Script Writing (3hr formats)",
      "AI-Generated Thumbnail Artistry",
      "The Secret 60% AVD Rule"
    ],
    bonus: "Personal Custom Script Bot",
    result: "Save 100s of hours. Let AI do the hard work while you keep the profit."
  },
  {
    id: "07",
    days: "Days 17-20",
    title: "The Translation Method",
    items: [
      "100+ Language Translation for free",
      "AI Subtitles & Localized Voices",
      "Turn 1 video into 10 global assets",
      "Legal reuse of global content"
    ],
    result: "Reach a massive global audience and 10x your earnings instantly."
  },
  {
    id: "08",
    days: "Days 21-24",
    title: "Copy & Clipping Method",
    items: [
      "Copyright-Free content secrets",
      "Picking viral clips efficiently",
      "AI Editing using ChatGPT",
      "5 AI tools for 100% uniqueness"
    ],
    bonus: "$500 Video Graphics Pack",
    result: "Create high-quality videos without creating raw footage from scratch."
  },
  {
    id: "09",
    days: "Days 25-27",
    title: "Pro Video Editing & Tools",
    items: [
      "Capcut King: Mastery in 1 Hour",
      "Steal Viral Formats method",
      "Sourcing & Researching content",
      "Premiere Pro Template hacks",
      "Building your own Media Library"
    ],
    bonus: "10 Capcut Premade Templates",
    result: "Professional edits keep viewers hooked and watch time high."
  },
  {
    id: "10",
    days: "Days 28-29",
    title: "Monetization & Scaling",
    items: [
      "Ads, Sponsorships & Affiliates",
      "Maximize Revenue with Extensions",
      "Ninja Method to hijack views",
      "Low Views = High Earnings strategy"
    ],
    bonus: "1000+ Company Sponsorship List",
    result: "Build multiple income streams beyond just YouTube AdSense."
  },
  {
    id: "11",
    days: "Day 30",
    title: "Managing Your Empire",
    items: [
      "6-Figure business scaling",
      "Managing teams with free tools",
      "Multiple channel automation",
      "Content calendars & systems"
    ],
    result: "Step away from the work and run your channel like a true business owner."
  },
  {
    id: "12",
    days: "Special Access",
    title: "Hacker: Payment Hacks",
    items: [
      "Daily Payment Hack (No 40-day wait)",
      "Access 4 months future earnings",
      "Withdraw money not yet made secrets",
      "Boost cashflow instantly"
    ],
    result: "Unlock the financial potential of your channel with advanced money hacks."
  }
];

export const flowData = [
  { id: "viewers", label: "Viewers", claim: "2.7B+", desc: "monthly active users looking for solutions, entertainment, and education. This is where your potential audience lives.", link: "https://blog.youtube/news-and-events/made-on-youtube-2025/" },
  { id: "content", label: "Content", claim: "500+", desc: "hours of video uploaded every minute. To stand out, you need a system, not just random uploads.", link: "https://blog.youtube/news-and-events/made-on-youtube-2025/" },
  { id: "advertisers", label: "Advertisers + buyers", claim: "$30B+", desc: "in ad revenue generated annually. Brands are aggressively paying to get in front of your viewers.", link: "https://blog.youtube/news-and-events/made-on-youtube-2025/" },
  { id: "creators", label: "Creators", claim: "3M+", desc: "creators in the YouTube Partner Program making a living through their digital assets.", link: "https://blog.youtube/news-and-events/made-on-youtube-2025/" },
  { id: "revenue", label: "Revenue paths", claim: "$100B+", desc: "reported paid by YouTube to creators, artists and media companies over four years. Platform totals demonstrate market size.", link: "https://blog.youtube/news-and-events/made-on-youtube-2025/" },
];

export const faqs = [
  ["What happens immediately after payment?", "After payment is confirmed, you receive LMS access instructions by email. Pending payments remain on the pending screen until reviewed."],
  ["Is this practical or theoretical?", "Each recorded lesson connects to an assignment, template or decision. You still need to complete the work yourself."],
  ["Can I build a faceless channel?", "Yes. The roadmap teaches original, policy-aware production without requiring you to appear on camera."],
  ["How much time should I spend each day?", "Plan for roughly 45–90 focused minutes. Some production assignments may take longer."],
  ["Is income guaranteed?", "No. Education and support cannot guarantee views, monetization, clients, employment or income."],
  ["How do weekly sessions work?", "Members can bring questions, channels, scripts and thumbnails for implementation-focused feedback. The exact schedule appears inside the portal."],
  ["What is the refund policy?", "The final refund window and eligibility rules must be confirmed by YEB Academy before checkout launches. See the configurable Refund Policy page."],
  ["What equipment do I need?", "A phone or computer, a stable-enough connection for recorded lessons, and access to common creator tools. Start with what you have."],
];

export const outcomes = ["Selected business model", "Researched niche", "Positioned channel", "Content strategy", "Initial video pipeline", "Script and narration workflow", "Visual-production process", "Editing workflow", "Publishing calendar", "Monetization plan", "Analytics system", "Team and scaling roadmap"];

export const translations = {
  en: {
    heroKicker: "YTEMPIRE BUILDERs · by Abrar Nadir",
    heroTitle: "You are not looking for another course. ",
    heroTitleEm: "You are looking for a way forward.",
    heroLede: "A recorded-learning, implementation and support portal that helps ordinary people understand the YouTube business—and build a system around one honest path.",
    enterAcademy: "Enter YTEMPIRE BUILDERs",
    seePortal: "See the portal ↓",
    microInfo: "Education and systems—not guaranteed income.",
    routeYour: "Your route",
    routeRecognized: "Recognized",
    routeHere: "You are here",
    routeAhead: "Ahead",
    startKicker: "The starting point",
    startTitle: "You are tired of starting over.",
    startQuote: "“The problem is not that you cannot learn. The problem is that nobody connected the journey for you.”",
    marketKicker: "The market, explained",
    marketTitle: "YouTube is more than a video platform.",
    marketIntro: "Attention moves through an existing creator economy. Tap the route to understand where value is created.",
    pathKicker: "Choose your starting path",
    pathTitle: "You do not have to follow someone else’s path.",
    lmsKicker: "Inside the product",
    lmsTitle: "See exactly what happens after you join.",
    roadmapKicker: "30-day recorded roadmap",
    roadmapTitle: "From confusion to a working channel system.",
    roadmapIntro: "Open each stage to see the outcome and the resource attached to it.",
    supportKicker: "Structure + people",
    supportTitle: "Recorded lessons when you need structure. Human support when you get stuck.",
    outcomesKicker: "The intended outcome",
    outcomesTitle: "Not more information. A guided operating system.",
    priceKicker: "Transparent access",
    priceTitle: "Choose the access level that fits your situation.",
    faqKicker: "Clear answers",
    faqTitle: "Questions before you choose.",
    finalKicker: "Your next move",
    finalTitle: "Stop moving randomly.<br/>Start building with a roadmap.",
    finalText: "YTEMPIRE BUILDERs cannot perform the work for you. It can show you what work matters and what comes next.",
  },
  ur: {
    heroKicker: "YTEMPIRE BUILDERs · از ابرار نادر",
    heroTitle: "آپ کو ایک اور کورس کی ضرورت نہیں ہے۔ ",
    heroTitleEm: "آپ کو آگے بڑھنے کا راستہ چاہیے۔",
    heroLede: "ایک ریکارڈ شدہ لرننگ، امپلیمنٹیشن، اور سپورٹ پورٹل جو عام لوگوں کو یوٹیوب کا بزنس سمجھنے اور ایک ایماندار راستے پر سسٹم بنانے میں مدد کرتا ہے۔",
    enterAcademy: "YTEMPIRE BUILDERs میں شامل ہوں",
    seePortal: "پورٹل دیکھیں ↓",
    microInfo: "تعلیم اور سسٹمز — آمدنی کی کوئی ضمانت نہیں۔",
    routeYour: "آپ کا راستہ",
    routeRecognized: "تسلیم شدہ",
    routeHere: "آپ یہاں ہیں",
    routeAhead: "آگے",
    startKicker: "شروعات کا مقام",
    startTitle: "آپ بار بار شروع کرنے سے تھک چکے ہیں۔",
    startQuote: "”مسئلہ یہ نہیں ہے کہ آپ سیکھ نہیں سکتے۔ مسئلہ یہ ہے کہ کسی نے آپ کے لیے سفر کو جوڑا نہیں ہے۔“",
    marketKicker: "مارکیٹ کی وضاحت",
    marketTitle: "یوٹیوب صرف ایک ویڈیو پلیٹ فارم نہیں ہے۔",
    marketIntro: "توجہ ایک موجودہ کریئٹر اکانومی کے ذریعے سفر کرتی ہے۔ یہ سمجھنے کے لیے کہ قدر کہاں بنتی ہے، راستے پر کلک کریں۔",
    pathKicker: "اپنا ابتدائی راستہ منتخب کریں",
    pathTitle: "آپ کو کسی دوسرے کے راستے پر چلنے کی ضرورت نہیں ہے۔",
    lmsKicker: "پروڈکٹ کے اندر",
    lmsTitle: "دیکھیں کہ آپ کے شامل ہونے کے بعد بالکل کیا ہوتا ہے۔",
    roadmapKicker: "30 دن کا ریکارڈ شدہ روڈ میپ",
    roadmapTitle: "الجھن سے لے کر ایک کام کرنے والے چینل سسٹم تک۔",
    roadmapIntro: "ہر مرحلے کو کھول کر اس کا نتیجہ اور اس سے منسلک ریسورس دیکھیں۔",
    supportKicker: "ساخت + لوگ",
    supportTitle: "جب آپ کو ساخت کی ضرورت ہو تو ریکارڈ شدہ اسباق۔ جب آپ پھنس جائیں تو انسانی مدد۔",
    outcomesKicker: "مطلوبہ نتیجہ",
    outcomesTitle: "مزید معلومات نہیں۔ ایک گائیڈڈ آپریٹنگ سسٹم۔",
    priceKicker: "شفاف رسائی",
    priceTitle: "وہ رسائی کی سطح منتخب کریں جو آپ کی صورتحال کے مطابق ہو۔",
    faqKicker: "واضح جوابات",
    faqTitle: "انتخاب کرنے سے پہلے سوالات۔",
    finalKicker: "آپ کا اگلا قدم",
    finalTitle: "بے ترتیب حرکت کرنا بند کریں۔<br/>ایک روڈ میپ کے ساتھ تعمیر شروع کریں۔",
    finalText: "YTEMPIRE BUILDERs آپ کے لیے کام نہیں کر سکتا۔ یہ آپ کو دکھا سکتا ہے کہ کیا کام اہم ہے اور آگے کیا ہوتا ہے۔",
  }
};
