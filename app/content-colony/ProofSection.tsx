"use client";

import { useState } from "react";
import styles from "./page.module.css";
import type { CCLanguage } from "./translations";

interface ProofSectionProps {
  youtubeEmbedUrl?: string;
  lang?: CCLanguage;
}

const proofContent = {
  en: {
    eyebrow: "SEE IT BEFORE WE EXPLAIN IT",
    headingLine1: "Watch the first batch.",
    headingLine2: "Or explore the Colony.",
    desc: "Use the proof format that convinces you more: real people talking about the experience, or real activity from inside the house.",
    tabResident: "▶ Resident Experience",
    tabGallery: "📸 Colony Gallery",
    tabStats: "📊 Proof / Stats",
    vslTitle: "Content Colony Batch 1 Experience",
    vslStrong: "Batch 1 Experience Walkthrough:",
    vslDesc: " Arrival → First systems architecture → Late-night live sprinting → Channel reviews & completed outputs.",
    stats1Label: "Paid Learners",
    stats1Desc: "Abrar Nadir's verified YouTube and AI training footprint across Pakistan and abroad.",
    stats2Label: "Community Reach",
    stats2Desc: "Collective free & paid creator community reach across YouTube, Telegram, and WhatsApp.",
    stats3Label: "Ecosystem Impact",
    stats3Desc: "Collective revenue and monetized channel impact tracked across active cohort students.",
    stats4Label: "Collective Content Views",
    stats4Desc: "Long-term collective content impressions across alumni network and partnered media assets.",
    statsNotice: "VERIFIED SYSTEMS · DATA-DRIVEN WORKFLOWS · DOCUMENTED BATCH 1 OUTPUTS IN JOHAR TOWN, LAHORE.",
  },
  roman: {
    eyebrow: "SAMJHANE SE PEHLE DEKHEIN",
    headingLine1: "Pehla Batch Dekhein.",
    headingLine2: "Ya Colony Explore Karein.",
    desc: "Jo format aapko mutma'in kare: asal logon ke live tajurbat ya house compound ke andar ki real activity.",
    tabResident: "▶ Residents Ka Tajurba",
    tabGallery: "📸 Colony Gallery",
    tabStats: "📊 Proofs / Stats",
    vslTitle: "Content Colony Batch 1 Experience",
    vslStrong: "Batch 1 Experience Walkthrough:",
    vslDesc: " Aamad → Systems architecture → Raat dair tak live sprinting → Channel reviews aur mukammal digital outputs.",
    stats1Label: "Paid Learners",
    stats1Desc: "Abrar Nadir ke verified YouTube aur AI training students Pakistan aur worldwide.",
    stats2Label: "Community Reach",
    stats2Desc: "YouTube, Telegram aur WhatsApp communities par combined creator network.",
    stats3Label: "Ecosystem Impact",
    stats3Desc: "Active cohort students ke monetized channels aur collective revenue impact.",
    stats4Label: "Collective Content Views",
    stats4Desc: "Students aur partner channels ke total long-term verified impressions.",
    statsNotice: "VERIFIED SYSTEMS · DATA-DRIVEN WORKFLOWS · BATCH 1 KE ASAL OUTPUTS · JOHAR TOWN, LAHORE.",
  },
  ur: {
    eyebrow: "تفصیل سے پہلے خود دیکھیں",
    headingLine1: "پہلا بیچ دیکھیں۔",
    headingLine2: "یا کالونی کا جائزہ لیں۔",
    desc: "وہ فارمیٹ دیکھیں جو آپ کو مطمئن کرے: اصل لوگوں کے لائیو تاثرات یا گھر کے اندر کی حقیقی سرگرمیاں۔",
    tabResident: "▶ رہائشیوں کے تاثرات",
    tabGallery: "📸 کالونی گیلری",
    tabStats: "📊 اعداد و شمار",
    vslTitle: "کنٹینٹ کالونی بیچ 1 کے تاثرات",
    vslStrong: "بیچ 1 کے تاثرات:",
    vslDesc: " آمد ← سسٹمز آرکیٹیکچر ← رات گئے تک لائیو کام ← چینل ریویوز اور مکمل ڈیجیٹل نتائج۔",
    stats1Label: "مستفید ہونے والے طلباء",
    stats1Desc: "ابرار نادر کے تصدیق شدہ یوٹیوب اور اے آئی سسٹمز سے تربیت یافتہ طلباء۔",
    stats2Label: "کمیونٹی کا دائرہ کار",
    stats2Desc: "یوٹیوب، ٹیلیگرام اور واٹس ایپ پر لائیو کریئیٹر نیٹ ورک۔",
    stats3Label: "مجموعی مالی اثرات",
    stats3Desc: "بیچ کے طلباء کے مونیٹائزڈ چینلز اور ان کے کاروباری نتائج۔",
    stats4Label: "مجموعی ویڈیو ویوز",
    stats4Desc: "طلباء اور پارٹنر چینلز کے ویڈیوز پر اب تک آنے والے مجموعی ویوز۔",
    statsNotice: "تصدیق شدہ سسٹمز · ڈیٹا ڈریون ورک فلوز · بیچ 1 کے دستاویزی نتائج · جوہر ٹاؤن، لاہور۔",
  },
};

function formatEmbedUrl(url: string, autoplay: boolean = true) {
  if (!url) return "";
  if (url.includes("drive.google.com")) {
    let base = url.replace(/\/view.*$/, "/preview").replace(/\/edit.*$/, "/preview");
    if (!base.includes("/preview")) base += "/preview";
    return autoplay ? `${base}?autoplay=1` : base;
  }
  if (url.includes("watch?v=")) {
    const id = url.split("watch?v=")[1]?.split("&")[0];
    return `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1${autoplay ? "&autoplay=1&mute=1&playsinline=1" : ""}`;
  }
  if (url.includes("youtu.be/")) {
    const id = url.split("youtu.be/")[1]?.split("?")[0];
    return `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1${autoplay ? "&autoplay=1&mute=1&playsinline=1" : ""}`;
  }
  return url;
}

export function ProofSection({
  youtubeEmbedUrl = "https://drive.google.com/file/d/1m5KKEti6D-IK1tiYz8UQPHsERJMgVQP-/preview",
  lang = "en",
}: ProofSectionProps) {
  const [activeTab, setActiveTab] = useState<"vsl" | "gallery" | "stats">("vsl");
  const finalEmbedUrl = formatEmbedUrl(youtubeEmbedUrl);
  const t = proofContent[lang] || proofContent.en;

  return (
    <section id="proof" className={styles.proofSection}>
      <div className={styles.container}>
        <div className={styles.centerHeading}>
          <span className={styles.eyebrow}>{t.eyebrow}</span>
          <h2>
            {t.headingLine1}
            <br />
            {t.headingLine2}
          </h2>
          <p>{t.desc}</p>
        </div>

        {/* Tab Switcher */}
        <div className={styles.tabbar} role="tablist" aria-label="Proof format switcher">
          <button
            type="button"
            className={`${styles.tabbtn} ${activeTab === "vsl" ? styles.tabbtnActive : ""}`}
            onClick={() => setActiveTab("vsl")}
            role="tab"
            aria-selected={activeTab === "vsl"}
          >
            {t.tabResident}
          </button>
          <button
            type="button"
            className={`${styles.tabbtn} ${activeTab === "gallery" ? styles.tabbtnActive : ""}`}
            onClick={() => setActiveTab("gallery")}
            role="tab"
            aria-selected={activeTab === "gallery"}
          >
            {t.tabGallery}
          </button>
          <button
            type="button"
            className={`${styles.tabbtn} ${activeTab === "stats" ? styles.tabbtnActive : ""}`}
            onClick={() => setActiveTab("stats")}
            role="tab"
            aria-selected={activeTab === "stats"}
          >
            {t.tabStats}
          </button>
        </div>

        {/* TAB 1: VSL (YouTube Embed) */}
        {activeTab === "vsl" && (
          <div className={styles.vslWrap}>
            <div className={styles.vslIframeBox}>
              <iframe
                src={finalEmbedUrl}
                title={t.vslTitle}
                className={styles.vslIframe}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <div className={styles.vslCaption}>
              <strong>{t.vslStrong}</strong>
              {t.vslDesc}
            </div>
          </div>
        )}

        {/* TAB 2: Colony Gallery */}
        {activeTab === "gallery" && (
          <div className={styles.galleryGrid}>
            <div className={styles.galleryTile}>
              <span className={styles.tileBadge}>LIVE COMPOUND</span>
              <div className={styles.tileTitle}>Late-Night Sprinting</div>
              <p className={styles.tileDesc}>Zero-friction sprint environment when inspiration strikes at 2 AM.</p>
            </div>
            <div className={styles.galleryTile}>
              <span className={styles.tileBadge}>LIVE COMPOUND</span>
              <div className={styles.tileTitle}>Systems Class &amp; SOPs</div>
              <p className={styles.tileDesc}>2 hours daily deconstructing algorithmic models and AI workflows.</p>
            </div>
            <div className={styles.galleryTile}>
              <span className={styles.tileBadge}>LIVE COMPOUND</span>
              <div className={styles.tileTitle}>War-Room Channel Reviews</div>
              <p className={styles.tileDesc}>Live teardowns of retention graphs, packaging, and hook physics.</p>
            </div>
            <div className={styles.galleryTile}>
              <span className={styles.tileBadge}>LIVE COMPOUND</span>
              <div className={styles.tileTitle}>Shared Execution Floor</div>
              <p className={styles.tileDesc}>Dedicated desk spaces with 300 Mbps fiber line and uninterrupted power.</p>
            </div>
            <div className={styles.galleryTile}>
              <span className={styles.tileBadge}>LIVE COMPOUND</span>
              <div className={styles.tileTitle}>Home Food &amp; Coffee Breaks</div>
              <p className={styles.tileDesc}>Chef-curated meals so you never lose flow state doing grocery runs.</p>
            </div>
            <div className={styles.galleryTile}>
              <span className={styles.tileBadge}>LIVE COMPOUND</span>
              <div className={styles.tileTitle}>Batch 1 Group Moment</div>
              <p className={styles.tileDesc}>Real founders, YouTube operators, and AI builders sharing lessons.</p>
            </div>
            <div className={styles.galleryTile}>
              <span className={styles.tileBadge}>LIVE COMPOUND</span>
              <div className={styles.tileTitle}>Studio / Content Production</div>
              <p className={styles.tileDesc}>Quiet workstation recording with zero street echo or background noise.</p>
            </div>
            <div className={styles.galleryTile}>
              <span className={styles.tileBadge}>LIVE COMPOUND</span>
              <div className={styles.tileTitle}>Agent &amp; Automation Work</div>
              <p className={styles.tileDesc}>Building custom AI researcher, scripter, and thumbnail bots on private data.</p>
            </div>
            <div className={styles.galleryTile}>
              <span className={styles.tileBadge}>LIVE COMPOUND</span>
              <div className={styles.tileTitle}>Performance Movie Nights</div>
              <p className={styles.tileDesc}>High-retention storytelling breakdown nights with the cohort.</p>
            </div>
          </div>
        )}

        {/* TAB 3: Proof / Stats */}
        {activeTab === "stats" && (
          <div className={styles.statsTabWrap}>
            <div className={styles.statsGrid}>
              <div className={styles.statFeature}>
                <div className={styles.statFeatureNum}>1K+</div>
                <h3>{t.stats1Label}</h3>
                <p>{t.stats1Desc}</p>
              </div>
              <div className={styles.statFeature}>
                <div className={styles.statFeatureNum}>200K+</div>
                <h3>{t.stats2Label}</h3>
                <p>{t.stats2Desc}</p>
              </div>
              <div className={styles.statFeature}>
                <div className={styles.statFeatureNum}>PKR 5Cr+</div>
                <h3>{t.stats3Label}</h3>
                <p>{t.stats3Desc}</p>
              </div>
              <div className={styles.statFeature}>
                <div className={styles.statFeatureNum}>3B+</div>
                <h3>{t.stats4Label}</h3>
                <p>{t.stats4Desc}</p>
              </div>
            </div>
            <div className={styles.statsNoticeBar}>
              {t.statsNotice}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
