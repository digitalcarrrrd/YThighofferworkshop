import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";
import { BookingForm } from "./BookingForm";
import { ProofSection } from "./ProofSection";

export const metadata: Metadata = {
  title: "Content Colony — Creator Execution Residency | Johar Town, Lahore",
  description:
    "A residential creator execution compound in Johar Town, Lahore. Arrive with a goal. Leave with completed work. 10-Day Fast Entry, 15-Day Best Value, and 30-Day Residency.",
  openGraph: {
    title: "Content Colony — Creator Execution Residency",
    description:
      "Arrive with a goal. Leave with completed work. Real business models, data-trained AI workflows, 300 Mbps internet, and 1:1 execution reviews with Abrar Nadir.",
    url: "https://www.abrarnadir.com/content-colony",
  },
};

export default function ContentColonyPage() {
  return (
    <main className={styles.page}>
      {/* Top Bar Announcement */}
      <div className={styles.topBanner}>
        <span className={styles.topBannerBadge}>COHORT OPEN</span>
        <span>15 ACTIVE OPERATORS MAX · 10 RESIDENTIAL + 5 LOCAL · JOHAR TOWN, LAHORE</span>
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
            <a href="#proof">Proof &amp; First Batch</a>
            <a href="#compare">Compare</a>
            <a href="#value">Value Architecture</a>
            <a href="#packages">Packages &amp; Pricing</a>
            <a href="#environment">Environment</a>
            <a href="#apply">Apply</a>
          </div>

          <a href="#apply" className={styles.navCta}>
            Apply for Whitelist →
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <div className={styles.heroTag}>
              <span className={styles.heroTagDot} />
              <span>DOOR 02 — IRL EXECUTION COMPOUND · JOHAR TOWN, LAHORE</span>
            </div>

            <h1>
              Arrive With a Goal. <br />
              <span>Leave With Completed Work.</span>
            </h1>

            <p className={styles.heroSub}>
              You are not buying a bed, a desk, food, or another video course.
              <br />
              Content Colony is a <strong>Creator Execution Residency</strong>: a fixed period of
              accommodation, focused work, direct expert access, content review, and
              completed digital output.
            </p>

            <div className={styles.alertNotice} style={{ margin: "24px 0", maxWidth: "780px" }}>
              <strong>Content Colony is built for that gap.</strong>
              <small>
                You learn the operating logic, then spend the rest of the day building your own system
                around your own market, format, and production model.
              </small>
            </div>

            <div className={styles.heroActions}>
              <a href="#proof" className={styles.btnPrimary}>
                See What Happens Inside →
              </a>
              <a href="#packages" className={styles.btnSecondary}>
                Inspect Packages &amp; Pricing
              </a>
            </div>

            {/* Quick Operator Stats Bar */}
            <div className={styles.statBar}>
              <div className={styles.statCell}>
                <div className={styles.statValue}>15</div>
                <div className={styles.statLabel}>Active Operators Max</div>
              </div>
              <div className={styles.statCell}>
                <div className={styles.statValue}>2 Hours</div>
                <div className={styles.statLabel}>Daily Class &amp; Reviews</div>
              </div>
              <div className={styles.statCell}>
                <div className={styles.statValue}>Rest of Day</div>
                <div className={styles.statLabel}>Live Execution Sprinting</div>
              </div>
              <div className={styles.statCell}>
                <div className={styles.statValue}>Johar Town</div>
                <div className={styles.statLabel}>Prime Lahore Location</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* PROOF SECTION WITH VIDEO EMBED & TABS */}
      <ProofSection youtubeEmbedUrl="https://drive.google.com/file/d/1m5KKEti6D-IK1tiYz8UQPHsERJMgVQP-/preview" />

      {/* COMPARISON SECTION */}
      <section id="compare" className={styles.section}>
        <div className={styles.container}>
          <div className={styles.centerHeading}>
            <span className={styles.eyebrow}>COMPARE THE ACTUAL PROBLEM BEING SOLVED</span>
            <h2>Your Current Setup vs Coworking vs Content Colony</h2>
            <p>
              A normal coworking space gives you a place to sit. Content Colony is engineered to give your work an operating system.
            </p>
          </div>

          <div className={styles.compareGrid}>
            <div className={styles.compareCol}>
              <div className={styles.compareHead}>
                <span className={styles.eyebrow}>CURRENT SETUP</span>
                <h3>Working Alone</h3>
              </div>
              <div className={styles.compareRow}>
                <span>Desk / Freedom</span>
                <span className={styles.statusMaybe}>MAYBE</span>
              </div>
              <div className={styles.compareRow}>
                <span>Execution Energy</span>
                <span className={styles.statusNo}>LOW</span>
              </div>
              <div className={styles.compareRow}>
                <span>System Diagnosis</span>
                <span className={styles.statusNo}>SELF</span>
              </div>
              <div className={styles.compareRow}>
                <span>Data Training</span>
                <span className={styles.statusNo}>SELF</span>
              </div>
              <div className={styles.compareRow}>
                <span>Agent Architecture</span>
                <span className={styles.statusNo}>SELF</span>
              </div>
              <div className={styles.compareRow}>
                <span>Post-Sprint Accountability</span>
                <span className={styles.statusNo}>NO</span>
              </div>
            </div>

            <div className={styles.compareCol}>
              <div className={styles.compareHead}>
                <span className={styles.eyebrow}>TRADITIONAL OPTION</span>
                <h3>Normal Coworking</h3>
              </div>
              <div className={styles.compareRow}>
                <span>Desk / Internet</span>
                <span className={styles.statusYes}>YES</span>
              </div>
              <div className={styles.compareRow}>
                <span>Execution Energy</span>
                <span className={styles.statusMaybe}>MIXED</span>
              </div>
              <div className={styles.compareRow}>
                <span>System Diagnosis</span>
                <span className={styles.statusNo}>NO</span>
              </div>
              <div className={styles.compareRow}>
                <span>Data Training</span>
                <span className={styles.statusNo}>NO</span>
              </div>
              <div className={styles.compareRow}>
                <span>Agent Architecture</span>
                <span className={styles.statusNo}>NO</span>
              </div>
              <div className={styles.compareRow}>
                <span>Post-Sprint Accountability</span>
                <span className={styles.statusNo}>NO</span>
              </div>
            </div>

            <div className={`${styles.compareCol} ${styles.compareColColony}`}>
              <div className={styles.compareHead}>
                <span className={styles.eyebrow}>EXECUTION ECOSYSTEM</span>
                <h3>Content Colony</h3>
              </div>
              <div className={styles.compareRow}>
                <span>300 Mbps Line + Work Environment</span>
                <span className={styles.statusYes}>YES</span>
              </div>
              <div className={styles.compareRow}>
                <span>Execution Energy</span>
                <span className={styles.statusYes}>BUILT-IN</span>
              </div>
              <div className={styles.compareRow}>
                <span>System Diagnosis</span>
                <span className={styles.statusYes}>YES</span>
              </div>
              <div className={styles.compareRow}>
                <span>Data Training on Custom Data</span>
                <span className={styles.statusYes}>YES</span>
              </div>
              <div className={styles.compareRow}>
                <span>Multi-Agent Architecture</span>
                <span className={styles.statusYes}>YES</span>
              </div>
              <div className={styles.compareRow}>
                <span>Post-Sprint Accountability (90 Days)</span>
                <span className={styles.statusYes}>YES</span>
              </div>
            </div>
          </div>

          <div className={styles.alertNotice}>
            A COWORKING SPACE GIVES YOU A PLACE TO WORK. CONTENT COLONY IS DESIGNED TO GIVE YOUR WORK AN OPERATING SYSTEM.
            <small>Your effort is still yours. The difference is the structure, peer momentum, and systematic feedback around it.</small>
          </div>
        </div>
      </section>

      {/* VALUE ARCHITECTURE (THE 8 PILLARS) */}
      <section id="value" className={styles.section} style={{ borderTop: "1px solid var(--line)" }}>
        <div className={styles.container}>
          <div className={styles.centerHeading}>
            <span className={styles.eyebrow}>WHAT YOU ACTUALLY LEARN AND BUILD</span>
            <h2>The Things Between &ldquo;AI Tools&rdquo; and a Real Business</h2>
            <p>
              Moving beyond single prompts into durable, repeatable media production infrastructure.
            </p>
          </div>

          <div className={styles.grid4}>
            <div className={styles.featureCard}>
              <div className={styles.featureCardTitle}>01 · Data Training</div>
              <p className={styles.featureCardDesc}>
                Train AI on your own research, top-performing reference channels, niche scripts, and tone rules.
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureCardTitle}>02 · Real Automation</div>
              <p className={styles.featureCardDesc}>
                Understand what should be automated (research, transcripts, tagging) and what needs human judgment (hooks, pacing).
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureCardTitle}>03 · Business Models</div>
              <p className={styles.featureCardDesc}>
                Traffic, audience, packaging, economics, repeatability, and scale—not just one-off video production.
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureCardTitle}>04 · Batch Processing</div>
              <p className={styles.featureCardDesc}>
                Move beyond one prompt and one video toward controlled multi-asset pipelines that yield weekly batches.
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureCardTitle}>05 · Market Understanding</div>
              <p className={styles.featureCardDesc}>
                Read demand, underserved format angles, adjacent monetization opportunities, and viewer retention cues.
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureCardTitle}>06 · Agent Architecture</div>
              <p className={styles.featureCardDesc}>
                Build specialized bots for research, scripting, visual sourcing, edit logic, and quality assurance.
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureCardTitle}>07 · Algorithmic Physics</div>
              <p className={styles.featureCardDesc}>
                Understand how CTR packaging, initial audience response, and YouTube distribution curves actually connect.
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureCardTitle}>08 · Production Systems</div>
              <p className={styles.featureCardDesc}>
                Documentary, animation, commentary, and AI-native formats can all be systemized with documented SOPs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SYSTEM ARCHITECT & EXPERT ACCESS */}
      <section className={styles.section} style={{ borderTop: "1px solid var(--line)", background: "#0a0a0c" }}>
        <div className={styles.container}>
          <div className={styles.centerHeading}>
            <span className={styles.eyebrow}>DIRECT EXPERT ACCESS</span>
            <h2>System Architecture &amp; Production Reality</h2>
            <p>
              Direct, unfiltered access to operators managing high-scale digital properties and algorithmic distribution.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px" }}>
            <div style={{ border: "1px solid var(--line)", background: "var(--panel)", padding: "32px" }}>
              <span className={styles.eyebrow}>SYSTEM ARCHITECT</span>
              <h3 style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: "1.8rem", margin: "10px 0 16px" }}>
                Abrar Nadir
              </h3>
              <p style={{ color: "var(--soft)", lineHeight: "1.6", marginBottom: "14px" }}>
                Abrar&apos;s role is to make the invisible logic visible: market dynamics, algorithmic distribution, business models, custom data training, automation economics, and scalable system architecture.
              </p>
              <p style={{ color: "var(--mid)", fontSize: "0.88rem", lineHeight: "1.5" }}>
                The goal is not to hand everyone the same cookie-cutter template. The goal is to make operators capable of diagnosing bottlenecks and building their own repeatable systems.
              </p>
            </div>

            <div style={{ border: "1px solid var(--line)", background: "var(--panel)", padding: "32px" }}>
              <span className={styles.eyebrow}>PRODUCTION REALITY · 1M+ VIEWS</span>
              <h3 style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: "1.8rem", margin: "10px 0 16px" }}>
                Zahid Iqbal · Creative AI Systems
              </h3>
              <p style={{ color: "var(--soft)", lineHeight: "1.6", marginBottom: "14px" }}>
                Zahid represents what happens when systematic thinking is pushed into real creative output: AI drama, animation, movie-style storytelling, and high-volume media delivery.
              </p>
              <p style={{ color: "var(--mid)", fontSize: "0.88rem", lineHeight: "1.5", marginBottom: "16px" }}>
                His session focuses on the production reality behind high-performing viral content—including a recent release that crossed <strong>1M+ views in roughly 23 hours</strong>.
              </p>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(212, 255, 58, 0.1)", border: "1px solid var(--warm)", borderRadius: "8px", padding: "7px 14px", fontSize: "0.78rem", fontWeight: 800, color: "var(--warm)" }}>
                ⚡ 1M+ Views in Under 24 Hours · Production Proof
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHO THIS IS FOR / NOT FOR */}
      <section className={styles.section} style={{ borderTop: "1px solid var(--line)" }}>
        <div className={styles.container}>
          <div className={styles.centerHeading}>
            <span className={styles.eyebrow}>SELECTION CRITERIA</span>
            <h2>Beginners Are Welcome. Operators Will Extract the Most.</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px" }}>
            <div style={{ border: "1px solid var(--line)", background: "var(--panel)", padding: "30px" }}>
              <h3 style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: "1.3rem", marginBottom: "20px" }}>
                This is what you need if...
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "16px" }}>
                <li style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <span style={{ background: "var(--white)", color: "var(--black)", fontWeight: 900, fontSize: "0.75rem", padding: "2px 8px" }}>01</span>
                  <span style={{ color: "var(--soft)", fontSize: "0.9rem" }}><strong>You want the real business model:</strong> Not just another niche list or prompt pack.</span>
                </li>
                <li style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <span style={{ background: "var(--white)", color: "var(--black)", fontWeight: 900, fontSize: "0.75rem", padding: "2px 8px" }}>02</span>
                  <span style={{ color: "var(--soft)", fontSize: "0.9rem" }}><strong>You want AI trained on your system:</strong> Your data, research, tone rules, and examples.</span>
                </li>
                <li style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <span style={{ background: "var(--white)", color: "var(--black)", fontWeight: 900, fontSize: "0.75rem", padding: "2px 8px" }}>03</span>
                  <span style={{ color: "var(--soft)", fontSize: "0.9rem" }}><strong>You want multiple agents working together:</strong> Instead of one giant general-purpose prompt.</span>
                </li>
                <li style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <span style={{ background: "var(--white)", color: "var(--black)", fontWeight: 900, fontSize: "0.75rem", padding: "2px 8px" }}>04</span>
                  <span style={{ color: "var(--soft)", fontSize: "0.9rem" }}><strong>You want to batch-produce:</strong> More completed output without sacrificing quality or voice.</span>
                </li>
                <li style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <span style={{ background: "var(--white)", color: "var(--black)", fontWeight: 900, fontSize: "0.75rem", padding: "2px 8px" }}>05</span>
                  <span style={{ color: "var(--soft)", fontSize: "0.9rem" }}><strong>You want live peer momentum:</strong> Because knowing more is never the same as executing more.</span>
                </li>
              </ul>
            </div>

            <div style={{ border: "1px solid var(--line)", background: "var(--panel)", padding: "30px", display: "flex", flexDirection: "column" }}>
              <h3 style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: "1.3rem", marginBottom: "20px" }}>
                What this is not:
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px 0", display: "flex", flexDirection: "column", gap: "14px", color: "var(--soft)", fontSize: "0.9rem" }}>
                <li>✕ It is not a done-for-you channel agency.</li>
                <li>✕ It is not a &ldquo;guaranteed viral views&rdquo; get-rich-quick scheme.</li>
                <li>✕ It is not &ldquo;come sit in a classroom all day taking notes.&rdquo;</li>
                <li>✕ It is not one single niche that everybody copies.</li>
              </ul>
              <div style={{ marginTop: "auto", background: "var(--black)", border: "1px solid var(--line2)", padding: "16px", textAlign: "center", fontWeight: 800, fontSize: "0.82rem", letterSpacing: "0.08em" }}>
                2 HOURS DAILY CLASS / AUDIT. THE REST OF THE DAY = LIVE EXECUTION.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PHYSICAL ENVIRONMENT */}
      <section id="environment" className={styles.section} style={{ borderTop: "1px solid var(--line)" }}>
        <div className={styles.container}>
          <div className={styles.centerHeading}>
            <span className={styles.eyebrow}>THE PHYSICAL ENVIRONMENT</span>
            <h2>Enough Friction Removed That You Can Focus on the Work</h2>
            <p>
              Located in premium residential surroundings in Johar Town, Lahore.
            </p>
          </div>

          <div className={styles.houseGrid}>
            <div className={styles.houseItem}>
              <div className={styles.houseItemTitle}>Fast 300 Mbps Fiber</div>
              <p className={styles.houseItemDesc}>High-speed internet line with backup connection for rapid cloud rendering and uploads.</p>
            </div>
            <div className={styles.houseItem}>
              <div className={styles.houseItemTitle}>Zero Power Cuts</div>
              <p className={styles.houseItemDesc}>Hybrid solar system + automated industrial generator failsafe. Work never stops.</p>
            </div>
            <div className={styles.houseItem}>
              <div className={styles.houseItemTitle}>Home-Cooked Food</div>
              <p className={styles.houseItemDesc}>Fresh, nutritious meals included for residents so you stay energized and in flow state.</p>
            </div>
            <div className={styles.houseItem}>
              <div className={styles.houseItemTitle}>Daily Housekeeping</div>
              <p className={styles.houseItemDesc}>Fresh linens, towels, and cleaned workstations. Zero domestic chores.</p>
            </div>
            <div className={styles.houseItem}>
              <div className={styles.houseItemTitle}>Unlimited Coffee</div>
              <p className={styles.houseItemDesc}>Freshly brewed coffee and refreshments built for long, productive sprint days.</p>
            </div>
            <div className={styles.houseItem}>
              <div className={styles.houseItemTitle}>Johar Town Location</div>
              <p className={styles.houseItemDesc}>Prime Lahore sector near Emporium Mall, Canal Road, and quiet residential surroundings.</p>
            </div>
            <div className={styles.houseItem}>
              <div className={styles.houseItemTitle}>Operator Spaces</div>
              <p className={styles.houseItemDesc}>Dedicated ergonomic desk setups, quiet booths for recording, and shared review lounges.</p>
            </div>
            <div className={styles.houseItem}>
              <div className={styles.houseItemTitle}>Cohort Synergy</div>
              <p className={styles.houseItemDesc}>Live surrounded by serious builders solving the exact same retention and growth hurdles.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PACKAGES & PRICING SECTION */}
      <section id="packages" className={styles.section} style={{ borderTop: "1px solid var(--line)" }}>
        <div className={styles.container}>
          <div className={styles.centerHeading}>
            <span className={styles.eyebrow}>SIMPLE ONE-TIME PRICING</span>
            <h2>Pay for Execution Depth. Not for &ldquo;More Information.&rdquo;</h2>
            <p>
              Core knowledge stays consistent. Longer stays buy more time to build, break, correct,
              and re-run your systems with direct feedback.
            </p>
          </div>

          <div className={styles.pricingDoors}>
            {/* Package 1: 10 Days */}
            <article className={styles.pricingDoor}>
              <div className={styles.pricingDoorInner}>
                <div className={styles.pDoorHeader}>
                  <div className={styles.pDoorTop}>
                    <span className={styles.pDoorNum}>DURATION 01</span>
                    <span className={styles.pDoorBadge}>FAST ENTRY</span>
                  </div>
                  <h3 className={styles.pDoorTitle}>10-Day Sprint</h3>
                  <p className={styles.pDoorFocus}>Ideal for rapid breakthrough and single-system installation.</p>
                </div>

                <div className={styles.pDoorPriceBlock}>
                  <div style={{ border: "1px solid var(--line)", padding: "14px", background: "#080808", marginBottom: "8px" }}>
                    <span style={{ fontSize: "0.76rem", color: "var(--mid)", display: "block" }}>Lahore Local Operator (Day Pass)</span>
                    <strong style={{ fontSize: "1.35rem", color: "var(--white)" }}>PKR 60,000</strong>
                    <span style={{ fontSize: "0.72rem", color: "var(--dim)", display: "block" }}>No stay / meals</span>
                  </div>
                  <div style={{ border: "1px solid var(--line)", padding: "14px", background: "#080808" }}>
                    <span style={{ fontSize: "0.76rem", color: "var(--mid)", display: "block" }}>Creator Residency (Stay Included)</span>
                    <strong style={{ fontSize: "1.35rem", color: "var(--white)" }}>PKR 100,000</strong>
                    <span style={{ fontSize: "0.72rem", color: "var(--dim)", display: "block" }}>Stay + food + housekeeping + coffee</span>
                  </div>
                </div>

                <div style={{ background: "rgba(255,255,255,0.06)", padding: "10px 14px", fontSize: "0.82rem", color: "var(--white)", fontWeight: 700, margin: "14px 0" }}>
                  ⚡ Residency: 5 one-to-one execution calls within 90 days
                </div>

                <ul className={styles.pDoorList}>
                  <li><strong>2-hour structured daily class &amp; audit</strong></li>
                  <li><strong>Rest of the day live sprinting</strong> on compound floor</li>
                  <li>All 8 core systems &amp; value modules included</li>
                  <li>1:1 strategy alignment &amp; bottleneck diagnosis</li>
                  <li>Local pass includes 1 execution call / month</li>
                </ul>
              </div>

              <a href="#apply" className={styles.pDoorBtn}>
                Apply for 10-Day Sprint →
              </a>
            </article>

            {/* Package 2: 15 Days (Featured) */}
            <article className={`${styles.pricingDoor} ${styles.pricingDoorFeatured}`}>
              <div className={styles.popularBadge}>MOST POPULAR · BEST VALUE</div>
              <div className={styles.pricingDoorInner}>
                <div className={styles.pDoorHeader}>
                  <div className={styles.pDoorTop}>
                    <span className={styles.pDoorNum}>DURATION 02</span>
                    <span className={styles.pDoorBadge} style={{ background: "var(--white)", color: "var(--black)" }}>BEST VALUE</span>
                  </div>
                  <h3 className={styles.pDoorTitle}>15-Day Build Sprint</h3>
                  <p className={styles.pDoorFocus}>Build it, test it, get feedback, and re-run your production pipeline.</p>
                </div>

                <div className={styles.pDoorPriceBlock}>
                  <div style={{ border: "1px solid var(--line)", padding: "14px", background: "#080808", marginBottom: "8px" }}>
                    <span style={{ fontSize: "0.76rem", color: "var(--mid)", display: "block" }}>Lahore Local Operator (Day Pass)</span>
                    <strong style={{ fontSize: "1.35rem", color: "var(--white)" }}>PKR 80,000</strong>
                    <span style={{ fontSize: "0.72rem", color: "var(--dim)", display: "block" }}>≈ PKR 5,333 / day · No stay/meals</span>
                  </div>
                  <div style={{ border: "1px solid var(--line)", padding: "14px", background: "#080808" }}>
                    <span style={{ fontSize: "0.76rem", color: "var(--mid)", display: "block" }}>Creator Residency (Stay Included)</span>
                    <strong style={{ fontSize: "1.35rem", color: "var(--white)" }}>PKR 140,000</strong>
                    <span style={{ fontSize: "0.72rem", color: "var(--dim)", display: "block" }}>≈ PKR 9,333 / day · Stay + meals + coffee</span>
                  </div>
                </div>

                <div style={{ background: "rgba(255,255,255,0.06)", padding: "10px 14px", fontSize: "0.82rem", color: "var(--white)", fontWeight: 700, margin: "14px 0" }}>
                  ⚡ Residency: 7 one-to-one execution calls within 90 days
                </div>

                <ul className={styles.pDoorList}>
                  <li><strong>Same core systems knowledge</strong>, double the execution cycles</li>
                  <li><strong>Multiple build/review/re-run iterations</strong> with Abrar</li>
                  <li>Multi-agent workflow and prompt dataset corrections</li>
                  <li>Completed digital deliverables before departing</li>
                  <li>Local pass includes 1 execution call / month</li>
                </ul>
              </div>

              <a href="#apply" className={styles.pDoorBtn} style={{ background: "var(--white)", color: "var(--black)" }}>
                Apply for 15-Day Sprint →
              </a>
            </article>

            {/* Package 3: 30 Days */}
            <article className={styles.pricingDoor}>
              <div className={styles.pricingDoorInner}>
                <div className={styles.pDoorHeader}>
                  <div className={styles.pDoorTop}>
                    <span className={styles.pDoorNum}>DURATION 03</span>
                    <span className={styles.pDoorBadge}>WAITLIST</span>
                  </div>
                  <h3 className={styles.pDoorTitle}>30-Day Residency</h3>
                  <p className={styles.pDoorFocus}>Maximum operating immersion and complete systemization.</p>
                </div>

                <div className={styles.pDoorPriceBlock}>
                  <div style={{ border: "1px solid #3a1515", background: "#1c0a0a", padding: "16px", textAlign: "center" }}>
                    <strong style={{ color: "#ff8c8c", fontSize: "0.95rem", letterSpacing: "0.08em" }}>
                      CURRENTLY FULL · WAITLIST ONLY
                    </strong>
                    <p style={{ margin: "6px 0 0", fontSize: "0.76rem", color: "#d69999" }}>
                      Accepting whitelist registrations for the next month cohort.
                    </p>
                  </div>
                </div>

                <div style={{ background: "rgba(255,255,255,0.06)", padding: "10px 14px", fontSize: "0.82rem", color: "var(--white)", fontWeight: 700, margin: "14px 0" }}>
                  ⚡ Residency: 10 execution calls within 90 days
                </div>

                <ul className={styles.pDoorList}>
                  <li><strong>Same core systems</strong> with maximum live repetition</li>
                  <li>Longer data-training and fine-tuning cycles</li>
                  <li>Full operating transformation &amp; delegation frameworks</li>
                  <li>90-day post-residency roadmap with weekly check-ins</li>
                </ul>
              </div>

              <a href="#apply" className={styles.pDoorBtn}>
                Join 30-Day Waitlist →
              </a>
            </article>
          </div>

          <div style={{ marginTop: "24px", background: "#0c0c0e", border: "1px solid var(--line)", padding: "18px 24px", textAlign: "center", fontSize: "0.84rem", letterSpacing: "0.06em", color: "var(--soft)", fontWeight: 800 }}>
            15 ACTIVE OPERATORS MAX · 10 RESIDENTIAL + 5 LOCAL · 10-DAY &amp; 15-DAY SEATS CURRENTLY OPEN
          </div>
        </div>
      </section>

      {/* AFTER YOU LEAVE (POST-SPRINT ACCOUNTABILITY) */}
      <section className={styles.section} style={{ borderTop: "1px solid var(--line)", background: "#050507" }}>
        <div className={styles.container}>
          <div className={styles.centerHeading}>
            <span className={styles.eyebrow}>POST-RESIDENCY ACCOUNTABILITY</span>
            <h2>The System Still Has to Survive Without the House</h2>
            <p>
              We do not abandon you once your stay completes. Every package includes direct accountability calls to ensure your system keeps running.
            </p>
          </div>

          <div className={styles.followupGrid}>
            <div className={styles.followupItem}>
              <span className={styles.eyebrow}>LOCAL PASS</span>
              <h3>Local Operator</h3>
              <p>1 execution and accountability review call per month following your sprint completion.</p>
            </div>
            <div className={styles.followupItem}>
              <span className={styles.eyebrow}>10-DAY RESIDENT</span>
              <h3>10-Day Residency</h3>
              <p>5 one-to-one execution-cycle calls within 90 days to diagnose bottlenecks and tune outputs.</p>
            </div>
            <div className={styles.followupItem}>
              <span className={styles.eyebrow}>15-DAY RESIDENT</span>
              <h3>15-Day Residency</h3>
              <p>7 one-to-one execution-cycle calls within 90 days to review live retention and team delegation.</p>
            </div>
            <div className={styles.followupItem}>
              <span className={styles.eyebrow}>30-DAY RESIDENT</span>
              <h3>30-Day Residency</h3>
              <p>10 structured calls within 90 days to oversee full system scaling and multi-channel expansion.</p>
            </div>
          </div>

          <div className={styles.alertNotice}>
            THE FOLLOW-UP QUESTION IS NOT &ldquo;DID YOU ENJOY THE COLONY?&rdquo;
            <small>It is: how many videos did your system actually produce, what became operational, where did it break, and what do we fix next?</small>
          </div>
        </div>
      </section>

      {/* APPLICATION WHITELIST FORM */}
      <section id="apply" className={styles.section} style={{ borderTop: "1px solid var(--line)" }}>
        <div className={styles.container}>
          <BookingForm />
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className={styles.section} style={{ borderTop: "1px solid var(--line)" }}>
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <span className={styles.eyebrow}>FREQUENTLY ASKED QUESTIONS</span>
            <h2>Clear Answers for Serious Operators</h2>
          </div>

          <div className={styles.faqGrid}>
            <div className={styles.faqItem}>
              <h4 className={styles.faqQuestion}>How does the screening process work?</h4>
              <p className={styles.faqAnswer}>
                Submitting the form puts you in the applicant queue with zero financial charge. If your build and goals match what Content Colony delivers, our team schedules a brief WhatsApp screening call to confirm dates, logistics, and accommodations. Payment is only collected once formally accepted.
              </p>
            </div>

            <div className={styles.faqItem}>
              <h4 className={styles.faqQuestion}>What is the difference between Local Operator and Creator Residency?</h4>
              <p className={styles.faqAnswer}>
                <strong>Creator Residency</strong> includes full on-site accommodation in our Johar Town compound, chef-prepared meals, daily housekeeping, and 24/7 access. <strong>Local Operator</strong> is a day-pass for Lahore residents who commute from home and do not require overnight lodging or meals.
              </p>
            </div>

            <div className={styles.faqItem}>
              <h4 className={styles.faqQuestion}>What equipment should I bring?</h4>
              <p className={styles.faqAnswer}>
                Bring your laptop or primary workstation, mouse, headphones, and your storage drives. We provide high-speed 300 Mbps fiber line, uninterrupted solar+generator backup, ergonomic desks, and private recording spaces.
              </p>
            </div>

            <div className={styles.faqItem}>
              <h4 className={styles.faqQuestion}>Can I bring a team member or video editor?</h4>
              <p className={styles.faqAnswer}>
                Yes. If you wish to bring an editor or co-founder, indicate this during your screening call so we can arrange adjacent workstation seating and appropriate accommodation suites.
              </p>
            </div>
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
              <a href="#proof">Proof</a>
              <a href="#compare">Compare</a>
              <a href="#value">Value</a>
              <a href="#packages">Pricing</a>
              <a href="#apply">Apply</a>
            </div>
          </div>
          <div className={styles.footerNote}>
            CONTENT COLONY · JOHAR TOWN, LAHORE · DATA TRAINING · REAL AUTOMATION · AGENT SYSTEMS · BATCH PROCESSING · LIVE EXECUTION.
          </div>
        </div>
      </footer>
    </main>
  );
}
