"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import styles from "./page.module.css";
import { BookingForm } from "./BookingForm";
import { ProofSection } from "./ProofSection";
import { ccTranslations, type CCLanguage } from "./translations";

export function ContentColonyClient() {
  const searchParams = useSearchParams();
  const urlLang = searchParams?.get("lang") as CCLanguage | null;

  const [lang, setLang] = useState<CCLanguage>(() => {
    if (urlLang === "roman" || urlLang === "en") {
      return urlLang;
    }
    return "en";
  });

  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    if (urlLang === "roman" || urlLang === "en") {
      setLang(urlLang);
    } else {
      const stored = localStorage.getItem("cc_lang") as CCLanguage | null;
      if (stored === "roman" || stored === "en") {
        setLang(stored);
      }
    }

    const storedTheme = localStorage.getItem("cc_theme") as "dark" | "light" | null;
    if (storedTheme === "light" || storedTheme === "dark") {
      setTheme(storedTheme);
    }
  }, [urlLang]);

  function handleLanguageChange(newLang: CCLanguage) {
    setLang(newLang);
    try {
      localStorage.setItem("cc_lang", newLang);
      const url = new URL(window.location.href);
      if (newLang === "en") {
        url.searchParams.delete("lang");
      } else {
        url.searchParams.set("lang", newLang);
      }
      window.history.replaceState(null, "", url.toString());
    } catch {
      // Ignore if localStorage / history unavailable
    }
  }

  function toggleLanguage() {
    handleLanguageChange(lang === "roman" ? "en" : "roman");
  }

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    try {
      localStorage.setItem("cc_theme", nextTheme);
    } catch {
      // Ignore if localStorage unavailable
    }
  }

  const t = ccTranslations[lang] || ccTranslations.en;

  return (
    <main
      className={`${styles.page} ${theme === "light" ? styles.lightTheme : ""}`}
      dir={t.dir}
    >
      {/* Top Bar Announcement */}
      <div className={styles.topBanner}>
        <span className={styles.topBannerBadge}>{t.topBadge}</span>
        <span>{t.topBanner}</span>
      </div>

      {/* Navigation */}
      <nav className={styles.nav}>
        <div className={styles.navInner}>
          <Link href="/" className={styles.brand}>
            <div className={styles.brandLogo}>
              CONTENT COLONY
              <span>CO-LIVE · CO-WORK</span>
            </div>
          </Link>

          <div className={styles.navLinks}>
            <a href="#proof">{t.nav.proof}</a>
            <a href="#compare">{t.nav.compare}</a>
            <a href="#value">{t.nav.value}</a>
            <a href="#packages">{t.nav.packages}</a>
            <a href="#environment">{t.nav.environment}</a>
            <a href="#apply">{t.nav.apply}</a>
          </div>

          <div className={styles.navActions}>
            {/* Single-Press Language Toggle: EN / Roman */}
            <button
              type="button"
              className={styles.langTogglePill}
              onClick={toggleLanguage}
              title={lang === "roman" ? "Click to switch to English" : "Click to switch to Roman Urdu"}
              aria-label="Toggle language"
            >
              <span className={`${styles.pillItem} ${lang === "en" ? styles.pillItemActive : ""}`}>
                EN
              </span>
              <span className={styles.pillDivider}>/</span>
              <span className={`${styles.pillItem} ${lang === "roman" ? styles.pillItemActive : ""}`}>
                Roman
              </span>
            </button>

            {/* Night & Day Mode Theme Toggle */}
            <button
              type="button"
              className={styles.themeToggleBtn}
              onClick={toggleTheme}
              title={theme === "dark" ? "Switch to Day Mode" : "Switch to Night Mode"}
              aria-label="Toggle Day and Night mode"
            >
              <span className={styles.themeIcon}>{theme === "dark" ? "☀️" : "🌙"}</span>
              <span className={styles.themeText}>{theme === "dark" ? "Day" : "Night"}</span>
            </button>

            <a href="#apply" className={styles.navCta}>
              {t.nav.applyCta}
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <div className={styles.heroTag}>
              <span className={styles.heroTagDot} />
              <span>{t.hero.tag}</span>
            </div>

            <h1>
              {t.hero.h1Line1} <br />
              <span>{t.hero.h1Line2}</span>
            </h1>

            <p className={styles.heroSub}>{t.hero.sub}</p>

            <div className={styles.alertNotice} style={{ margin: "24px 0", maxWidth: "780px" }}>
              <strong>{t.hero.noticeStrong}</strong>
              <small>{t.hero.noticeSmall}</small>
            </div>

            <div className={styles.heroActions}>
              <a href="#proof" className={styles.btnPrimary}>
                {t.hero.btnInside}
              </a>
              <a href="#packages" className={styles.btnSecondary}>
                {t.hero.btnPricing}
              </a>
            </div>

            {/* Quick Operator Stats Bar */}
            <div className={styles.statBar}>
              <div className={styles.statCell}>
                <div className={styles.statValue}>{t.hero.stats.stat1Val}</div>
                <div className={styles.statLabel}>{t.hero.stats.stat1Label}</div>
              </div>
              <div className={styles.statCell}>
                <div className={styles.statValue}>{t.hero.stats.stat2Val}</div>
                <div className={styles.statLabel}>{t.hero.stats.stat2Label}</div>
              </div>
              <div className={styles.statCell}>
                <div className={styles.statValue}>{t.hero.stats.stat3Val}</div>
                <div className={styles.statLabel}>{t.hero.stats.stat3Label}</div>
              </div>
              <div className={styles.statCell}>
                <div className={styles.statValue}>{t.hero.stats.stat4Val}</div>
                <div className={styles.statLabel}>{t.hero.stats.stat4Label}</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* PROOF SECTION WITH VIDEO EMBED & TABS */}
      <ProofSection
        youtubeEmbedUrl="https://drive.google.com/file/d/1m5KKEti6D-IK1tiYz8UQPHsERJMgVQP-/preview"
        lang={lang}
      />

      {/* COMPARISON SECTION */}
      <section id="compare" className={styles.section}>
        <div className={styles.container}>
          <div className={styles.centerHeading}>
            <span className={styles.eyebrow}>{t.compare.eyebrow}</span>
            <h2>{t.compare.heading}</h2>
            <p>{t.compare.desc}</p>
          </div>

          <div className={styles.compareGrid}>
            <div className={styles.compareCol}>
              <div className={styles.compareHead}>
                <span className={styles.eyebrow}>{t.compare.col1Eyebrow}</span>
                <h3>{t.compare.col1Title}</h3>
              </div>
              <div className={styles.compareRow}>
                <span>{t.compare.row1}</span>
                <span className={styles.statusMaybe}>{t.compare.maybe}</span>
              </div>
              <div className={styles.compareRow}>
                <span>{t.compare.row2}</span>
                <span className={styles.statusNo}>{t.compare.low}</span>
              </div>
              <div className={styles.compareRow}>
                <span>{t.compare.row3}</span>
                <span className={styles.statusNo}>{t.compare.self}</span>
              </div>
              <div className={styles.compareRow}>
                <span>{t.compare.row4}</span>
                <span className={styles.statusNo}>{t.compare.self}</span>
              </div>
              <div className={styles.compareRow}>
                <span>{t.compare.row5}</span>
                <span className={styles.statusNo}>{t.compare.self}</span>
              </div>
              <div className={styles.compareRow}>
                <span>{t.compare.row6}</span>
                <span className={styles.statusNo}>{t.compare.no}</span>
              </div>
            </div>

            <div className={styles.compareCol}>
              <div className={styles.compareHead}>
                <span className={styles.eyebrow}>{t.compare.col2Eyebrow}</span>
                <h3>{t.compare.col2Title}</h3>
              </div>
              <div className={styles.compareRow}>
                <span>{t.compare.row1}</span>
                <span className={styles.statusYes}>{t.compare.yes}</span>
              </div>
              <div className={styles.compareRow}>
                <span>{t.compare.row2}</span>
                <span className={styles.statusMaybe}>{t.compare.mixed}</span>
              </div>
              <div className={styles.compareRow}>
                <span>{t.compare.row3}</span>
                <span className={styles.statusNo}>{t.compare.no}</span>
              </div>
              <div className={styles.compareRow}>
                <span>{t.compare.row4}</span>
                <span className={styles.statusNo}>{t.compare.no}</span>
              </div>
              <div className={styles.compareRow}>
                <span>{t.compare.row5}</span>
                <span className={styles.statusNo}>{t.compare.no}</span>
              </div>
              <div className={styles.compareRow}>
                <span>{t.compare.row6}</span>
                <span className={styles.statusNo}>{t.compare.no}</span>
              </div>
            </div>

            <div className={`${styles.compareCol} ${styles.compareColColony}`}>
              <div className={styles.compareHead}>
                <span className={styles.eyebrow}>{t.compare.col3Eyebrow}</span>
                <h3>{t.compare.col3Title}</h3>
              </div>
              <div className={styles.compareRow}>
                <span>{t.compare.row1}</span>
                <span className={styles.statusYes}>{t.compare.yes}</span>
              </div>
              <div className={styles.compareRow}>
                <span>{t.compare.row2}</span>
                <span className={styles.statusYes}>{t.compare.builtin}</span>
              </div>
              <div className={styles.compareRow}>
                <span>{t.compare.row3}</span>
                <span className={styles.statusYes}>{t.compare.yes}</span>
              </div>
              <div className={styles.compareRow}>
                <span>{t.compare.row4}</span>
                <span className={styles.statusYes}>{t.compare.yes}</span>
              </div>
              <div className={styles.compareRow}>
                <span>{t.compare.row5}</span>
                <span className={styles.statusYes}>{t.compare.yes}</span>
              </div>
              <div className={styles.compareRow}>
                <span>{t.compare.row6}</span>
                <span className={styles.statusYes}>{t.compare.yes}</span>
              </div>
            </div>
          </div>

          <div className={styles.alertNotice}>
            {t.compare.noticeStrong}
            <small>{t.compare.noticeSmall}</small>
          </div>
        </div>
      </section>

      {/* VALUE ARCHITECTURE (THE 8 PILLARS) */}
      <section id="value" className={styles.section} style={{ borderTop: "1px solid var(--line)" }}>
        <div className={styles.container}>
          <div className={styles.centerHeading}>
            <span className={styles.eyebrow}>{t.value.eyebrow}</span>
            <h2>{t.value.heading}</h2>
            <p>{t.value.desc}</p>
          </div>

          <div className={styles.grid4}>
            {t.value.pillars.map((pillar, idx) => (
              <div key={idx} className={styles.featureCard}>
                <div className={styles.featureCardTitle}>{pillar.title}</div>
                <p className={styles.featureCardDesc}>{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SYSTEM ARCHITECT & EXPERT ACCESS */}
      <section className={styles.section} style={{ borderTop: "1px solid var(--line)", background: "var(--section-alt)" }}>
        <div className={styles.container}>
          <div className={styles.centerHeading}>
            <span className={styles.eyebrow}>{t.mentors.eyebrow}</span>
            <h2>{t.mentors.heading}</h2>
            <p>{t.mentors.desc}</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px" }}>
            <div style={{ border: "1px solid var(--line)", background: "var(--panel)", padding: "32px" }}>
              <span className={styles.eyebrow}>{t.mentors.abrarEyebrow}</span>
              <h3 style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: "1.8rem", margin: "10px 0 16px" }}>
                {t.mentors.abrarName}
              </h3>
              <p style={{ color: "var(--soft)", lineHeight: "1.6", marginBottom: "14px" }}>
                {t.mentors.abrarP1}
              </p>
              <p style={{ color: "var(--mid)", fontSize: "0.88rem", lineHeight: "1.5" }}>
                {t.mentors.abrarP2}
              </p>
            </div>

            <div style={{ border: "1px solid var(--line)", background: "var(--panel)", padding: "32px" }}>
              <span className={styles.eyebrow}>{t.mentors.zahidEyebrow}</span>
              <h3 style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: "1.8rem", margin: "10px 0 16px" }}>
                {t.mentors.zahidName}
              </h3>
              <p style={{ color: "var(--soft)", lineHeight: "1.6", marginBottom: "14px" }}>
                {t.mentors.zahidP1}
              </p>
              <p style={{ color: "var(--mid)", fontSize: "0.88rem", lineHeight: "1.5", marginBottom: "16px" }}>
                {t.mentors.zahidP2}
              </p>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "rgba(212, 255, 58, 0.1)",
                  border: "1px solid var(--line2)",
                  borderRadius: "8px",
                  padding: "7px 14px",
                  fontSize: "0.78rem",
                  fontWeight: 800,
                  color: "var(--white)",
                }}
              >
                {t.mentors.zahidBadge}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHO THIS IS FOR / NOT FOR */}
      <section className={styles.section} style={{ borderTop: "1px solid var(--line)" }}>
        <div className={styles.container}>
          <div className={styles.centerHeading}>
            <span className={styles.eyebrow}>{t.criteria.eyebrow}</span>
            <h2>{t.criteria.heading}</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px" }}>
            <div style={{ border: "1px solid var(--line)", background: "var(--panel)", padding: "30px" }}>
              <h3 style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: "1.3rem", marginBottom: "20px" }}>
                {t.criteria.needTitle}
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "16px" }}>
                {t.criteria.needItems.map((item, idx) => (
                  <li key={idx} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <span style={{ background: "var(--white)", color: "var(--black)", fontWeight: 900, fontSize: "0.75rem", padding: "2px 8px" }}>
                      {item.num}
                    </span>
                    <span style={{ color: "var(--soft)", fontSize: "0.9rem" }}>
                      <strong>{item.strong}</strong> {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ border: "1px solid var(--line)", background: "var(--panel)", padding: "30px", display: "flex", flexDirection: "column" }}>
              <h3 style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: "1.3rem", marginBottom: "20px" }}>
                {t.criteria.notTitle}
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px 0", display: "flex", flexDirection: "column", gap: "14px", color: "var(--soft)", fontSize: "0.9rem" }}>
                {t.criteria.notItems.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
              <div style={{ marginTop: "auto", background: "var(--banner-callout)", border: "1px solid var(--line2)", padding: "16px", textAlign: "center", fontWeight: 800, fontSize: "0.82rem", letterSpacing: "0.08em" }}>
                {t.criteria.banner}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PHYSICAL ENVIRONMENT */}
      <section id="environment" className={styles.section} style={{ borderTop: "1px solid var(--line)" }}>
        <div className={styles.container}>
          <div className={styles.centerHeading}>
            <span className={styles.eyebrow}>{t.environment.eyebrow}</span>
            <h2>{t.environment.heading}</h2>
            <p>{t.environment.desc}</p>
          </div>

          <div className={styles.houseGrid}>
            {t.environment.items.map((item, idx) => (
              <div key={idx} className={styles.houseItem}>
                <div className={styles.houseItemTitle}>{item.title}</div>
                <p className={styles.houseItemDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PACKAGES & PRICING SECTION */}
      <section id="packages" className={styles.section} style={{ borderTop: "1px solid var(--line)" }}>
        <div className={styles.container}>
          <div className={styles.centerHeading}>
            <span className={styles.eyebrow}>{t.pricing.eyebrow}</span>
            <h2>{t.pricing.heading}</h2>
            <p>{t.pricing.desc}</p>
          </div>

          <div className={styles.pricingDoors}>
            {/* Package 1: 10 Days */}
            <article className={styles.pricingDoor}>
              <div className={styles.pricingDoorInner}>
                <div className={styles.pDoorHeader}>
                  <div className={styles.pDoorTop}>
                    <span className={styles.pDoorNum}>DURATION 01</span>
                    <span className={styles.pDoorBadge}>{t.pricing.pkg1Badge}</span>
                  </div>
                  <h3 className={styles.pDoorTitle}>{t.pricing.pkg1Title}</h3>
                  <p className={styles.pDoorFocus}>{t.pricing.pkg1Focus}</p>
                </div>

                <div className={styles.pDoorPriceBlock}>
                  <div style={{ border: "1px solid var(--line)", padding: "14px", background: "var(--card-sub)", marginBottom: "8px" }}>
                    <span style={{ fontSize: "0.76rem", color: "var(--mid)", display: "block" }}>{t.pricing.pkg1LocalLabel}</span>
                    <strong style={{ fontSize: "1.35rem", color: "var(--white)" }}>{t.pricing.pkg1LocalPrice}</strong>
                    <span style={{ fontSize: "0.72rem", color: "var(--dim)", display: "block" }}>{t.pricing.pkg1LocalNote}</span>
                  </div>
                  <div style={{ border: "1px solid var(--line)", padding: "14px", background: "var(--card-sub)" }}>
                    <span style={{ fontSize: "0.76rem", color: "var(--mid)", display: "block" }}>{t.pricing.pkg1ResLabel}</span>
                    <strong style={{ fontSize: "1.35rem", color: "var(--white)" }}>{t.pricing.pkg1ResPrice}</strong>
                    <span style={{ fontSize: "0.72rem", color: "var(--dim)", display: "block" }}>{t.pricing.pkg1ResNote}</span>
                  </div>
                </div>

                <div style={{ background: "var(--call-note-bg)", padding: "10px 14px", fontSize: "0.82rem", color: "var(--white)", fontWeight: 700, margin: "14px 0" }}>
                  {t.pricing.pkg1CallNote}
                </div>

                <ul className={styles.pDoorList}>
                  {t.pricing.pkg1List.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              <a href="#apply" className={styles.pDoorBtn}>
                {t.pricing.pkg1Btn}
              </a>
            </article>

            {/* Package 2: 15 Days (Featured) */}
            <article className={`${styles.pricingDoor} ${styles.pricingDoorFeatured}`}>
              <div className={styles.popularBadge}>{t.pricing.pkg2Popular}</div>
              <div className={styles.pricingDoorInner}>
                <div className={styles.pDoorHeader}>
                  <div className={styles.pDoorTop}>
                    <span className={styles.pDoorNum}>DURATION 02</span>
                    <span className={styles.pDoorBadge} style={{ background: "var(--white)", color: "var(--black)" }}>
                      {t.pricing.pkg2Badge}
                    </span>
                  </div>
                  <h3 className={styles.pDoorTitle}>{t.pricing.pkg2Title}</h3>
                  <p className={styles.pDoorFocus}>{t.pricing.pkg2Focus}</p>
                </div>

                <div className={styles.pDoorPriceBlock}>
                  <div style={{ border: "1px solid var(--line)", padding: "14px", background: "var(--card-sub)", marginBottom: "8px" }}>
                    <span style={{ fontSize: "0.76rem", color: "var(--mid)", display: "block" }}>{t.pricing.pkg2LocalLabel}</span>
                    <strong style={{ fontSize: "1.35rem", color: "var(--white)" }}>{t.pricing.pkg2LocalPrice}</strong>
                    <span style={{ fontSize: "0.72rem", color: "var(--dim)", display: "block" }}>{t.pricing.pkg2LocalNote}</span>
                  </div>
                  <div style={{ border: "1px solid var(--line)", padding: "14px", background: "var(--card-sub)" }}>
                    <span style={{ fontSize: "0.76rem", color: "var(--mid)", display: "block" }}>{t.pricing.pkg2ResLabel}</span>
                    <strong style={{ fontSize: "1.35rem", color: "var(--white)" }}>{t.pricing.pkg2ResPrice}</strong>
                    <span style={{ fontSize: "0.72rem", color: "var(--dim)", display: "block" }}>{t.pricing.pkg2ResNote}</span>
                  </div>
                </div>

                <div style={{ background: "var(--call-note-bg)", padding: "10px 14px", fontSize: "0.82rem", color: "var(--white)", fontWeight: 700, margin: "14px 0" }}>
                  {t.pricing.pkg2CallNote}
                </div>

                <ul className={styles.pDoorList}>
                  {t.pricing.pkg2List.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              <a href="#apply" className={styles.pDoorBtn} style={{ background: "var(--white)", color: "var(--black)" }}>
                {t.pricing.pkg2Btn}
              </a>
            </article>

            {/* Package 3: 30 Days */}
            <article className={styles.pricingDoor}>
              <div className={styles.pricingDoorInner}>
                <div className={styles.pDoorHeader}>
                  <div className={styles.pDoorTop}>
                    <span className={styles.pDoorNum}>DURATION 03</span>
                    <span className={styles.pDoorBadge}>{t.pricing.pkg3Badge}</span>
                  </div>
                  <h3 className={styles.pDoorTitle}>{t.pricing.pkg3Title}</h3>
                  <p className={styles.pDoorFocus}>{t.pricing.pkg3Focus}</p>
                </div>

                <div className={styles.pDoorPriceBlock}>
                  <div style={{ border: "1px solid var(--waitlist-border)", background: "var(--waitlist-box)", padding: "16px", textAlign: "center" }}>
                    <strong style={{ color: "var(--waitlist-text)", fontSize: "0.95rem", letterSpacing: "0.08em" }}>
                      {t.pricing.pkg3FullTitle}
                    </strong>
                    <p style={{ margin: "6px 0 0", fontSize: "0.76rem", color: "var(--waitlist-desc)" }}>
                      {t.pricing.pkg3FullDesc}
                    </p>
                  </div>
                </div>

                <div style={{ background: "var(--call-note-bg)", padding: "10px 14px", fontSize: "0.82rem", color: "var(--white)", fontWeight: 700, margin: "14px 0" }}>
                  {t.pricing.pkg3CallNote}
                </div>

                <ul className={styles.pDoorList}>
                  {t.pricing.pkg3List.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              <a href="#apply" className={styles.pDoorBtn}>
                {t.pricing.pkg3Btn}
              </a>
            </article>
          </div>

          <div style={{ marginTop: "24px", background: "var(--banner-callout)", border: "1px solid var(--line)", padding: "18px 24px", textAlign: "center", fontSize: "0.84rem", letterSpacing: "0.06em", color: "var(--soft)", fontWeight: 800 }}>
            {t.pricing.bottomBanner}
          </div>
        </div>
      </section>

      {/* AFTER YOU LEAVE (POST-SPRINT ACCOUNTABILITY) */}
      <section className={styles.section} style={{ borderTop: "1px solid var(--line)", background: "var(--section-floor)" }}>
        <div className={styles.container}>
          <div className={styles.centerHeading}>
            <span className={styles.eyebrow}>{t.accountability.eyebrow}</span>
            <h2>{t.accountability.heading}</h2>
            <p>{t.accountability.desc}</p>
          </div>

          <div className={styles.followupGrid}>
            {t.accountability.items.map((item, idx) => (
              <div key={idx} className={styles.followupItem}>
                <span className={styles.eyebrow}>{item.eyebrow}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>

          <div className={styles.alertNotice}>
            {t.accountability.noticeStrong}
            <small>{t.accountability.noticeSmall}</small>
          </div>
        </div>
      </section>

      {/* APPLICATION WHITELIST FORM */}
      <section id="apply" className={styles.section} style={{ borderTop: "1px solid var(--line)" }}>
        <div className={styles.container}>
          <BookingForm lang={lang} />
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className={styles.section} style={{ borderTop: "1px solid var(--line)" }}>
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <span className={styles.eyebrow}>{t.faq.eyebrow}</span>
            <h2>{t.faq.heading}</h2>
          </div>

          <div className={styles.faqGrid}>
            {t.faq.items.map((item, idx) => (
              <div key={idx} className={styles.faqItem}>
                <h4 className={styles.faqQuestion}>{item.q}</h4>
                <p className={styles.faqAnswer}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerInner}>
            <div className={styles.brandLogo}>
              CONTENT COLONY
              <span>CO-LIVE · CO-WORK</span>
            </div>
            <div style={{ display: "flex", gap: "20px", fontSize: "0.82rem", color: "var(--mid)" }}>
              <a href="#proof">{t.nav.proof}</a>
              <a href="#compare">{t.nav.compare}</a>
              <a href="#value">{t.nav.value}</a>
              <a href="#packages">{t.nav.packages}</a>
              <a href="#apply">{t.nav.apply}</a>
            </div>
          </div>
          <div className={styles.footerNote}>
            CONTENT COLONY · JOHAR TOWN, LAHORE · DATA TRAINING · REAL AUTOMATION · AGENT SYSTEMS · BATCH PROCESSING · LIVE EXECUTION.
          </div>
        </div>
      </footer>

      {/* Floating Bottom Quick Controls (Always accessible while scrolling) */}
      <aside className={styles.floatingControls} aria-label="Quick controls">
        <button
          type="button"
          className={styles.langTogglePill}
          onClick={toggleLanguage}
          title={lang === "roman" ? "Click to switch to English" : "Click to switch to Roman Urdu"}
          aria-label="Toggle language"
        >
          <span className={`${styles.pillItem} ${lang === "en" ? styles.pillItemActive : ""}`}>
            EN
          </span>
          <span className={styles.pillDivider}>/</span>
          <span className={`${styles.pillItem} ${lang === "roman" ? styles.pillItemActive : ""}`}>
            Roman
          </span>
        </button>

        <button
          type="button"
          className={styles.themeToggleBtn}
          onClick={toggleTheme}
          title={theme === "dark" ? "Switch to Day Mode" : "Switch to Night Mode"}
          aria-label="Toggle Day and Night mode"
        >
          <span className={styles.themeIcon}>{theme === "dark" ? "☀️" : "🌙"}</span>
          <span className={styles.themeText}>{theme === "dark" ? "Day" : "Night"}</span>
        </button>
      </aside>
    </main>
  );
}
