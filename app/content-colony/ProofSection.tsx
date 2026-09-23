"use client";

import { useState } from "react";
import styles from "./page.module.css";

interface ProofSectionProps {
  youtubeEmbedUrl?: string;
}

function formatEmbedUrl(url: string) {
  if (!url) return "";
  if (url.includes("drive.google.com")) {
    // If it has /view or similar, convert to /preview
    if (url.includes("/preview")) return url;
    return url.replace(/\/view.*$/, "/preview").replace(/\/edit.*$/, "/preview");
  }
  if (url.includes("watch?v=")) {
    const id = url.split("watch?v=")[1]?.split("&")[0];
    return `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`;
  }
  if (url.includes("youtu.be/")) {
    const id = url.split("youtu.be/")[1]?.split("?")[0];
    return `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`;
  }
  return url;
}

export function ProofSection({
  youtubeEmbedUrl = "https://drive.google.com/file/d/1m5KKEti6D-IK1tiYz8UQPHsERJMgVQP-/preview",
}: ProofSectionProps) {
  const [activeTab, setActiveTab] = useState<"vsl" | "gallery" | "stats">("vsl");
  const finalEmbedUrl = formatEmbedUrl(youtubeEmbedUrl);

  return (
    <section id="proof" className={styles.proofSection}>
      <div className={styles.container}>
        <div className={styles.centerHeading}>
          <span className={styles.eyebrow}>SEE IT BEFORE WE EXPLAIN IT</span>
          <h2>Watch the first batch.<br />Or explore the Colony.</h2>
          <p>
            Use the proof format that convinces you more: real people talking about the
            experience, or real activity from inside the house.
          </p>
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
            ▶ Resident Experience
          </button>
          <button
            type="button"
            className={`${styles.tabbtn} ${activeTab === "gallery" ? styles.tabbtnActive : ""}`}
            onClick={() => setActiveTab("gallery")}
            role="tab"
            aria-selected={activeTab === "gallery"}
          >
            📸 Colony Gallery
          </button>
          <button
            type="button"
            className={`${styles.tabbtn} ${activeTab === "stats" ? styles.tabbtnActive : ""}`}
            onClick={() => setActiveTab("stats")}
            role="tab"
            aria-selected={activeTab === "stats"}
          >
            📊 Proof / Stats
          </button>
        </div>

        {/* TAB 1: VSL (YouTube Embed) */}
        {activeTab === "vsl" && (
          <div className={styles.vslWrap}>
            <div className={styles.vslIframeBox}>
              <iframe
                src={finalEmbedUrl}
                title="Content Colony Batch 1 Experience"
                className={styles.vslIframe}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <div className={styles.vslCaption}>
              <strong>Batch 1 Experience Walkthrough:</strong> Arrival → First systems architecture → Late-night live sprinting → Channel reviews &amp; completed outputs.
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
                <h3>Paid Learners</h3>
                <p>Abrar Nadir&apos;s verified YouTube and AI training footprint across Pakistan and abroad.</p>
              </div>
              <div className={styles.statFeature}>
                <div className={styles.statFeatureNum}>200K+</div>
                <h3>Community Reach</h3>
                <p>Collective free &amp; paid creator community reach across YouTube, Telegram, and WhatsApp.</p>
              </div>
              <div className={styles.statFeature}>
                <div className={styles.statFeatureNum}>PKR 5Cr+</div>
                <h3>Ecosystem Impact</h3>
                <p>Collective revenue and monetized channel impact tracked across active cohort students.</p>
              </div>
              <div className={styles.statFeature}>
                <div className={styles.statFeatureNum}>3B+</div>
                <h3>Collective Content Views</h3>
                <p>Long-term collective content impressions across alumni network and partnered media assets.</p>
              </div>
            </div>
            <div className={styles.statsNoticeBar}>
              VERIFIED SYSTEMS · DATA-DRIVEN WORKFLOWS · DOCUMENTED BATCH 1 OUTPUTS IN JOHAR TOWN, LAHORE.
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
