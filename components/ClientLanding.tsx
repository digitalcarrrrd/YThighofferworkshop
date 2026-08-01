"use client";

import { useEffect, useMemo, useState } from "react";
import { useWorkshopSchedule } from "@/hooks/useWorkshopSchedule";
import { useCountdown } from "@/hooks/useCountdown";
import { useAnalytics } from "@/hooks/useAnalytics";
import type { AnalyticsEvent } from "@/lib/analytics";
import type { OfferConfig } from "@/lib/offers/types";
import { PurchaseModal } from "./modal/PurchaseModal";

type Lang = "en" | "ur";
type Copy = {
  navOffer: string; navAgenda: string; navBonuses: string; language: string;
  live: string; heroKicker: string; hero1: string; heroAccent: string; hero2: string;
  heroBody: string; heroProof: string; cta: string; safe: string;
  date: string; hours: string; minutes: string; seconds: string;
  tonight: string; tomorrow: string; format: string; liveOnline: string; capacity: string;
  price: string; value: string; included: string; scroll: string;
  painKicker: string; painTitle: string; painBody: string;
  bridgeKicker: string; bridgeTitle: string; before: string; after: string;
  agendaKicker: string; agendaTitle: string; hour1: string; hour1Title: string; hour1Body: string;
  hour2: string; hour2Title: string; hour2Body: string;
  kitKicker: string; kitTitle: string; kitBody: string;
  bonusKicker: string; bonusTitle: string; bonusBody: string; bonusCta: string;
  fitKicker: string; fitTitle: string; forYou: string; notForYou: string;
  faqKicker: string; faqTitle: string; finalTitle: string; finalBody: string; finalCta: string;
  footer: string; focus: string;
};

const copy: Record<Lang, Copy> = {
  en: {
    navOffer:"The offer",navAgenda:"What you learn",navBonuses:"Bonuses",language:"اردو",
    live:"DAILY LIVE • 8–10 PM PKT",heroKicker:"Stop collecting tutorials. Start building.",
    hero1:"Your faceless YouTube channel needs a ",heroAccent:"clear blueprint",hero2:" — not another saved video.",
    heroBody:"In one focused, 2-hour live workshop, build your niche direction, content system and AI production workflow with Abrar Nadir.",
    heroProof:"Live screen share • practical templates • zero income promises",cta:"Lock my seat — PKR 1,999",
    safe:"Payment proof is reviewed manually. Confirmation arrives on WhatsApp.",date:"Next live batch",
    hours:"Hours",minutes:"Minutes",seconds:"Seconds",tonight:"Tonight",tomorrow:"Tomorrow",format:"Format",
    liveOnline:"Live online",capacity:"Batch limit",price:"Your ticket",value:"Full stack value",included:"5 founding bonuses included",
    scroll:"Scroll to see the system",painKicker:"THE REAL PROBLEM",painTitle:"You don’t need more information. You need decisions.",
    painBody:"Most channels never start because every next step opens ten new questions.",
    bridgeKicker:"THE SHIFT",bridgeTitle:"From scattered tabs to one clear operating system.",
    before:"Before the workshop",after:"After the workshop",agendaKicker:"THE 2-HOUR BUILD",
    agendaTitle:"Two hours. Two decisions that unlock everything else.",hour1:"HOUR 01",hour1Title:"Choose the channel",
    hour1Body:"Validate demand, study competitors, select a faceless-friendly format and leave with a 90-day direction.",
    hour2:"HOUR 02",hour2Title:"Build the content engine",hour2Body:"Turn research into titles, hooks, scripts, visuals, voiceover and a repeatable AI-assisted workflow.",
    kitKicker:"YOUR TAKEAWAY",kitTitle:"Not notes. A working starter kit.",kitBody:"Every piece is designed to remove one point of friction between idea and upload.",
    bonusKicker:"FOUNDING STACK",bonusTitle:"The workshop gets you moving. These keep you moving.",
    bonusBody:"Included for the first 500 verified registrations.",bonusCta:"Get the workshop + all 5 bonuses",
    fitKicker:"HONEST FIT",fitTitle:"Built for action-takers, not shortcut hunters.",forYou:"This is for you if…",notForYou:"Skip this if…",
    faqKicker:"CLEAR ANSWERS",faqTitle:"Before you lock your seat",finalTitle:"Close the tabs. Build the blueprint.",
    finalBody:"Your next channel decision can be clear by tonight.",finalCta:"Yes — lock my seat for PKR 1,999",
    footer:"Educational workshop. No income or channel-performance guarantee. Results depend on execution and market conditions.",
    focus:"Reading",
  },
  ur: {
    navOffer:"آفر",navAgenda:"آپ کیا سیکھیں گے",navBonuses:"بونس",language:"English",
    live:"روزانہ لائیو • رات 8 سے 10 بجے",heroKicker:"ٹیوٹوریلز جمع کرنا چھوڑیں۔ بنانا شروع کریں۔",
    hero1:"آپ کے فیس لیس یوٹیوب چینل کو ایک ",heroAccent:"واضح بلیو پرنٹ",hero2:" چاہیے — ایک اور سیو کی ہوئی ویڈیو نہیں۔",
    heroBody:"ابرار نادر کے ساتھ صرف 2 گھنٹے کی لائیو ورکشاپ میں اپنی نِش، کانٹینٹ سسٹم اور اے آئی پروڈکشن ورک فلو بنائیں۔",
    heroProof:"لائیو اسکرین شیئر • عملی ٹیمپلیٹس • آمدنی کا کوئی جھوٹا وعدہ نہیں",cta:"اپنی سیٹ لاک کریں — 1,999 روپے",
    safe:"ادائیگی کا ثبوت دستی طور پر چیک ہوگا۔ تصدیق واٹس ایپ پر آئے گی۔",date:"اگلی لائیو کلاس",
    hours:"گھنٹے",minutes:"منٹ",seconds:"سیکنڈ",tonight:"آج رات",tomorrow:"کل رات",format:"فارمیٹ",
    liveOnline:"لائیو آن لائن",capacity:"کلاس کی حد",price:"آپ کا ٹکٹ",value:"مکمل ویلیو",included:"5 فاؤنڈنگ بونس شامل",
    scroll:"سسٹم دیکھنے کے لیے نیچے جائیں",painKicker:"اصل مسئلہ",painTitle:"آپ کو مزید معلومات نہیں، واضح فیصلوں کی ضرورت ہے۔",
    painBody:"زیادہ تر چینلز اس لیے شروع نہیں ہوتے کیونکہ ہر اگلا قدم دس نئے سوال کھول دیتا ہے۔",
    bridgeKicker:"تبدیلی",bridgeTitle:"بکھرے ہوئے ٹیبز سے ایک واضح آپریٹنگ سسٹم تک۔",
    before:"ورکشاپ سے پہلے",after:"ورکشاپ کے بعد",agendaKicker:"2 گھنٹے کی تعمیر",
    agendaTitle:"دو گھنٹے۔ دو فیصلے جو باقی سب آسان کر دیں۔",hour1:"پہلا گھنٹہ",hour1Title:"صحیح چینل منتخب کریں",
    hour1Body:"ڈیمانڈ ویلیڈیٹ کریں، مقابلہ دیکھیں، فیس لیس فارمیٹ چنیں اور 90 دن کی واضح سمت حاصل کریں۔",
    hour2:"دوسرا گھنٹہ",hour2Title:"کانٹینٹ انجن بنائیں",hour2Body:"ریسرچ کو ٹائٹلز، ہُکس، اسکرپٹس، ویژولز، وائس اوور اور بار بار استعمال ہونے والے اے آئی ورک فلو میں بدلیں۔",
    kitKicker:"آپ کا نتیجہ",kitTitle:"صرف نوٹس نہیں۔ ایک کام کرنے والی اسٹارٹر کِٹ۔",kitBody:"ہر حصہ آئیڈیا اور اپلوڈ کے درمیان ایک رکاوٹ ختم کرتا ہے۔",
    bonusKicker:"فاؤنڈنگ اسٹیک",bonusTitle:"ورکشاپ آپ کو شروع کرواتی ہے۔ یہ بونس آپ کو جاری رکھتے ہیں۔",
    bonusBody:"پہلی 500 تصدیق شدہ رجسٹریشنز کے لیے شامل۔",bonusCta:"ورکشاپ اور تمام 5 بونس حاصل کریں",
    fitKicker:"صاف فیصلہ",fitTitle:"یہ عمل کرنے والوں کے لیے ہے، شارٹ کٹ ڈھونڈنے والوں کے لیے نہیں۔",forYou:"یہ آپ کے لیے ہے اگر…",notForYou:"یہ چھوڑ دیں اگر…",
    faqKicker:"واضح جوابات",faqTitle:"سیٹ لاک کرنے سے پہلے",finalTitle:"ٹیبز بند کریں۔ اپنا بلیو پرنٹ بنائیں۔",
    finalBody:"آپ کے اگلے چینل کا فیصلہ آج رات واضح ہو سکتا ہے۔",finalCta:"جی ہاں — 1,999 روپے میں سیٹ لاک کریں",
    footer:"یہ ایک تعلیمی ورکشاپ ہے۔ آمدنی یا چینل کی کارکردگی کی کوئی ضمانت نہیں۔ نتائج عمل اور مارکیٹ پر منحصر ہیں۔",
    focus:"مطالعہ",
  },
};

const data = {
  pain: {
    en:[["01","Niche overload","Every option looks promising. None feels certain."],["02","Tutorial spiral","You learn for hours but still cannot name the next action."],["03","Generic AI output","The script is fast. The content still sounds like everyone else."],["04","Tool chaos","Fifty subscriptions. No connected production workflow."]],
    ur:[["01","نِش کی الجھن","ہر آپشن اچھا لگتا ہے، مگر کوئی فیصلہ پکا نہیں ہوتا۔"],["02","ٹیوٹوریل کا چکر","گھنٹوں سیکھتے ہیں، پھر بھی اگلا عملی قدم واضح نہیں۔"],["03","عام اے آئی کانٹینٹ","اسکرپٹ تیز بنتا ہے، مگر آواز سب جیسی لگتی ہے۔"],["04","ٹولز کی بھرمار","پچاس ٹولز، مگر کوئی جڑا ہوا پروڈکشن ورک فلو نہیں۔"]],
  },
  before: {
    en:["Random niche ideas","Saved videos everywhere","No publishing rhythm","Tools without a system"],
    ur:["بے ترتیب نِش آئیڈیاز","ہر جگہ سیو ویڈیوز","پبلشنگ کا کوئی تسلسل نہیں","سسٹم کے بغیر ٹولز"],
  },
  after: {
    en:["One validated direction","90-day topic map","Repeatable AI workflow","30-day action plan"],
    ur:["ایک ویلیڈیٹڈ سمت","90 دن کا ٹاپک میپ","دہرایا جانے والا اے آئی ورک فلو","30 دن کا ایکشن پلان"],
  },
  kit: {
    en:["Channel blueprint","Niche scorecard","Competitor research map","90-day calendar","Hook + title system","AI story workflow","Automation stack","30-day launch plan"],
    ur:["چینل بلیو پرنٹ","نِش اسکور کارڈ","کمپیٹیٹر ریسرچ میپ","90 دن کا کیلنڈر","ہُک اور ٹائٹل سسٹم","اے آئی اسٹوری ورک فلو","آٹومیشن اسٹیک","30 دن کا لانچ پلان"],
  },
  bonuses: {
    en:[["01","50+ AI Prompts","PKR 3,000"],["02","Niche Research Template","PKR 2,000"],["03","90-Day Content Calendar","PKR 2,500"],["04","7-Day WhatsApp Group","PKR 5,000"],["05","24-Hour Recording","PKR 2,999"]],
    ur:[["01","50+ اے آئی پرامپٹس","3,000 روپے"],["02","نِش ریسرچ ٹیمپلیٹ","2,000 روپے"],["03","90 دن کا کانٹینٹ کیلنڈر","2,500 روپے"],["04","7 دن کا واٹس ایپ گروپ","5,000 روپے"],["05","24 گھنٹے کی ریکارڈنگ","2,999 روپے"]],
  },
  faq: {
    en:[["Is this beginner-friendly?","Yes. The workshop starts with selection and builds the workflow step by step."],["Is it really live?","Yes. The workshop runs live every day from 8:00 PM to 10:00 PM PKT."],["Will I get a recording?","Verified participants receive 24-hour replay access."],["Is income guaranteed?","No. This is an educational implementation workshop. Results depend on your execution and market."],["How is payment confirmed?","Submit your transaction ID and screenshot. After manual verification, confirmation arrives on WhatsApp."]],
    ur:[["کیا یہ نئے لوگوں کے لیے ہے؟","جی ہاں۔ ورکشاپ انتخاب سے شروع ہو کر پورا ورک فلو مرحلہ وار بناتی ہے۔"],["کیا ورکشاپ واقعی لائیو ہے؟","جی ہاں۔ ورکشاپ روزانہ رات 8 سے 10 بجے پاکستان ٹائم کے مطابق لائیو ہوتی ہے۔"],["کیا ریکارڈنگ ملے گی؟","تصدیق شدہ شرکاء کو 24 گھنٹے کی ریکارڈنگ ملے گی۔"],["کیا آمدنی کی ضمانت ہے؟","نہیں۔ یہ ایک تعلیمی اور عملی ورکشاپ ہے۔ نتیجہ آپ کے عمل اور مارکیٹ پر منحصر ہے۔"],["ادائیگی کیسے کنفرم ہوگی؟","ٹرانزیکشن آئی ڈی اور اسکرین شاٹ جمع کریں۔ دستی تصدیق کے بعد واٹس ایپ پر کنفرمیشن آئے گی۔"]],
  },
};

function getInitialLanguage(): Lang {
  if (typeof document === "undefined") return "en";
  const saved = document.cookie.match(/(?:^|; )yeb_lang=(en|ur)/)?.[1] as Lang | undefined;
  if (saved) return saved;
  return (navigator.languages || [navigator.language]).some(x => /^ur\b/i.test(x)) ? "ur" : "en";
}

type CtaAnalyticsEvent = Extract<
  AnalyticsEvent,
  "hero_cta_click" | "sticky_cta_click" | "bonus_cta_click" | "final_cta_click"
>;

export function ClientLanding({ offer }: { offer: OfferConfig }) {
  const { schedule } = useWorkshopSchedule();
  const cd = useCountdown(schedule?.registrationCutoff || null);
  const { track } = useAnalytics(offer);
  const [lang, setLang] = useState<Lang>("en");
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState("hero");
  const t = copy[lang];

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setLang(getInitialLanguage());
      setReady(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);
  useEffect(() => {
    document.documentElement.dir = lang === "ur" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    document.cookie = `yeb_lang=${lang}; path=/; max-age=31536000; SameSite=Lax`;
  }, [lang]);
  useEffect(() => {
    const onScroll = () => setProgress(Math.min(100, scrollY / (document.documentElement.scrollHeight - innerHeight) * 100));
    const io = new IntersectionObserver(entries => entries.forEach(e => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-38% 0px -42%" });
    document.querySelectorAll<HTMLElement>("[data-focus]").forEach(el => io.observe(el));
    addEventListener("scroll", onScroll, { passive: true }); onScroll();
    return () => { io.disconnect(); removeEventListener("scroll", onScroll); };
  }, []);

  const launch = (source: CtaAnalyticsEvent) => { track(source); track("payment_modal_open"); setOpen(true); };
  const batchLabel = schedule?.label === "tomorrow" ? t.tomorrow : t.tonight;
  const sectionNames = useMemo(() => lang === "ur"
    ? {hero:"آفر",problem:"مسئلہ",shift:"تبدیلی",agenda:"نظام",kit:"کِٹ",bonuses:"بونس",fit:"آپ کے لیے؟",faq:"سوالات",final:"سیٹ"}
    : {hero:"Offer",problem:"Problem",shift:"Shift",agenda:"System",kit:"Toolkit",bonuses:"Bonuses",fit:"Fit",faq:"Answers",final:"Seat"}, [lang]);

  if (!ready) return <div className="site-loader" aria-label="Loading"><span /></div>;
  return <main className={`experience ${lang === "ur" ? "urdu" : ""}`}>
    <div className="reading-progress" style={{ width: `${progress}%` }} />
    <header className="topnav">
      <a className="brand" href="#hero" aria-label="YouTube Empire Builders home"><i>Y</i><span>YouTube<br/>Empire Builders</span></a>
      <nav><a href="#shift">{t.navOffer}</a><a href="#agenda">{t.navAgenda}</a><a href="#bonuses">{t.navBonuses}</a></nav>
      <button className="lang-switch" onClick={() => setLang(lang === "en" ? "ur" : "en")} aria-label="Change language"><span>文</span>{t.language}</button>
    </header>
    <aside className="story-rail" aria-hidden="true"><span>{t.focus}</span><b>{sectionNames[active as keyof typeof sectionNames] || sectionNames.hero}</b><i><em style={{ height: `${progress}%` }}/></i></aside>

    <section id="hero" data-focus className="scene hero-new">
      <div className="orb orb-one"/><div className="orb orb-two"/>
      <div className="hero-copy reveal">
        <div className="live-pill"><span/> {t.live}</div>
        <p className="micro-head">{t.heroKicker}</p>
        <h1>{t.hero1}<mark>{t.heroAccent}</mark>{t.hero2}</h1>
        <p className="hero-body">{t.heroBody}</p>
        <div className="hero-actions">
          <button className="sales-btn" onClick={() => launch("hero_cta_click")}>{t.cta}<span>↗</span></button>
          <p>{t.safe}</p>
        </div>
        <div className="proof-line">{t.heroProof.split("•").map(x => <span key={x}>✓ {x.trim()}</span>)}</div>
      </div>
      <div className="offer-console reveal delay-one">
        <div className="console-top"><span>{batchLabel}</span><b>LIVE</b></div>
        <div className="console-date"><small>{t.date}</small><strong>{schedule?.batchDateDisplay || "—"}</strong></div>
        <div className="count-new">{[[t.hours,cd.hours],[t.minutes,cd.minutes],[t.seconds,cd.seconds]].map(([label,value])=><div key={label}><b>{value}</b><span>{label}</span></div>)}</div>
        <div className="console-grid"><div><span>{t.format}</span><b>{t.liveOnline}</b></div><div><span>{t.capacity}</span><b>100</b></div></div>
        <div className="ticket-line"><div><span>{t.value}</span><s>PKR 15,499</s></div><div><span>{t.price}</span><b>PKR 1,999</b></div></div>
        <div className="bonus-ribbon">✦ {t.included}</div>
      </div>
      <a href="#problem" className="scroll-cue"><i>↓</i>{t.scroll}</a>
    </section>

    <section id="problem" data-focus className="scene scene-dark focus-scene">
      <div className="focus-intro">
        <p className="section-code">01 / {t.painKicker}</p><h2>{t.painTitle}</h2><p>{t.painBody}</p>
      </div>
      <div className="problem-stack">{data.pain[lang].map(([n,title,body])=><article key={n}><span>{n}</span><div><h3>{title}</h3><p>{body}</p></div></article>)}</div>
    </section>

    <section id="shift" data-focus className="scene scene-paper focus-scene">
      <div className="focus-intro"><p className="section-code">02 / {t.bridgeKicker}</p><h2>{t.bridgeTitle}</h2></div>
      <div className="transformation">
        <article className="before-card"><small>{t.before}</small>{data.before[lang].map(x=><p key={x}><span>×</span>{x}</p>)}</article>
        <div className="transform-arrow"><span>2H</span><i>→</i></div>
        <article className="after-card"><small>{t.after}</small>{data.after[lang].map(x=><p key={x}><span>✓</span>{x}</p>)}</article>
      </div>
    </section>

    <section id="agenda" data-focus className="scene agenda-scene focus-scene">
      <div className="focus-intro"><p className="section-code">03 / {t.agendaKicker}</p><h2>{t.agendaTitle}</h2></div>
      <div className="agenda-track">
        <article><div className="hour-number">01</div><div><small>{t.hour1}</small><h3>{t.hour1Title}</h3><p>{t.hour1Body}</p><div className="chips"><span>Demand</span><span>Niche</span><span>Positioning</span></div></div></article>
        <article><div className="hour-number">02</div><div><small>{t.hour2}</small><h3>{t.hour2Title}</h3><p>{t.hour2Body}</p><div className="chips"><span>Hooks</span><span>AI</span><span>Automation</span></div></div></article>
      </div>
    </section>

    <section id="kit" data-focus className="scene kit-scene focus-scene">
      <div className="focus-intro"><p className="section-code">04 / {t.kitKicker}</p><h2>{t.kitTitle}</h2><p>{t.kitBody}</p></div>
      <div className="kit-grid">{data.kit[lang].map((x,i)=><article key={x} style={{"--i":i} as React.CSSProperties}><span>{String(i+1).padStart(2,"0")}</span><h3>{x}</h3><i>↗</i></article>)}</div>
    </section>

    <section id="bonuses" data-focus className="scene bonus-scene focus-scene">
      <div className="focus-intro"><p className="section-code">05 / {t.bonusKicker}</p><h2>{t.bonusTitle}</h2><p>{t.bonusBody}</p></div>
      <div className="bonus-list">{data.bonuses[lang].map(([n,title,value])=><article key={n}><span>{n}</span><h3>{title}</h3><b>{value}</b></article>)}</div>
      <div className="value-bar"><div><small>Total stated value</small><s>PKR 15,499</s></div><div><small>Your ticket</small><strong>PKR 1,999</strong></div><button className="sales-btn coral" onClick={()=>launch("bonus_cta_click")}>{t.bonusCta}<span>↗</span></button></div>
    </section>

    <section id="fit" data-focus className="scene fit-scene focus-scene">
      <div className="focus-intro"><p className="section-code">06 / {t.fitKicker}</p><h2>{t.fitTitle}</h2></div>
      <div className="fit-grid"><article><h3>{t.forYou}</h3>{(lang==="ur"?["آپ نِش منتخب نہیں کر پا رہے","آپ عملی ورک فلو چاہتے ہیں","آپ اگلے 30 دن عمل کے لیے تیار ہیں"]:["You cannot commit to a niche","You want a practical workflow","You are ready to execute for 30 days"]).map(x=><p key={x}>✓ {x}</p>)}</article><article><h3>{t.notForYou}</h3>{(lang==="ur"?["آپ فوری آمدنی کی ضمانت چاہتے ہیں","آپ بغیر عمل کے نتیجہ چاہتے ہیں","آپ صرف مزید معلومات جمع کرنا چاہتے ہیں"]:["You want guaranteed quick income","You expect results without execution","You only want more information"]).map(x=><p key={x}>× {x}</p>)}</article></div>
    </section>

    <section id="faq" data-focus className="scene faq-new focus-scene">
      <div className="focus-intro"><p className="section-code">07 / {t.faqKicker}</p><h2>{t.faqTitle}</h2></div>
      <div className="faq-list">{data.faq[lang].map(([q,a],i)=><details key={q}><summary><span>{String(i+1).padStart(2,"0")}</span>{q}<i>+</i></summary><p>{a}</p></details>)}</div>
    </section>

    <section id="final" data-focus className="scene final-new focus-scene">
      <p className="section-code">08 / READY?</p><h2>{t.finalTitle}</h2><p>{t.finalBody}</p>
      <button className="sales-btn huge" onClick={()=>launch("final_cta_click")}>{t.finalCta}<span>↗</span></button>
      <div className="final-meta"><span>8–10 PM PKT</span><span>100 max</span><span>Live online</span></div>
    </section>
    <footer className="footer-new"><div className="brand"><i>Y</i><span>YouTube Empire Builders</span></div><p>{t.footer}</p><button className="lang-switch" onClick={()=>setLang(lang==="en"?"ur":"en")}>{t.language}</button></footer>
    {progress>9&&!open&&<div className="floating-buy"><span><small>{batchLabel}</small><b>PKR 1,999</b></span><button onClick={()=>launch("sticky_cta_click")}>{t.cta} <i>↗</i></button></div>}
    {open&&schedule&&<PurchaseModal offer={offer} schedule={schedule} onClose={()=>setOpen(false)} lang={lang}/>}
  </main>;
}
