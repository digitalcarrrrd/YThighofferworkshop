import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";
import { BookingForm } from "./BookingForm";
import { TourSection } from "./TourSection";

export const metadata: Metadata = {
  title: "Content Colony V3 — Creator Execution Residency | Abrar Nadir",
  description:
    "A residential execution environment in Johar Town, Lahore for serious YouTube operators and AI builders. 7-Day Sprint, 14-Day Build Sprint, and 30-Day Residency.",
  openGraph: {
    title: "Content Colony V3 — Creator Execution Residency",
    description:
      "Arrive with a goal. Leave with completed work. Accommodation, meals, 1 Gbps redundant fiber, 4K studio bays, 1:1 expert access with Abrar Nadir and Zahid.",
    url: "https://www.abrarnadir.com/cc",
  },
};

export default function ContentColonyPage() {
  return (
    <main className={styles.page}>
      {/* Top Bar Announcement */}
      <div className={styles.cohortBanner}>
        <span className={styles.cohortPill}>FOUNDING COHORT V3</span>
        <span>FIRST 10 RESIDENTS RECEIVE FOUNDING-COHORT PRICING &amp; PERMANENT ALUMNI STATUS</span>
      </div>

      {/* Navigation */}
      <nav className={styles.navbar}>
        <div className={styles.navInner}>
          <Link href="/" className={styles.brandLink}>
            <span className={styles.brandSymbol}>CC</span>
            <div className={styles.brandText}>
              <span className={styles.brandName}>CONTENT COLONY</span>
              <span className={styles.brandTagline}>Execution Residency</span>
            </div>
          </Link>

          <div className={styles.navLinks}>
            <a href="#philosophy" className={styles.navLink}>
              Residency Model
            </a>
            <a href="#value-pillars" className={styles.navLink}>
              5 Value Areas
            </a>
            <a href="#tour" className={styles.navLink}>
              Compound Tour
            </a>
            <a href="#packages" className={styles.navLink}>
              Packages &amp; Pricing
            </a>
            <a href="#savings" className={styles.navLink}>
              Pricing Math
            </a>
            <a href="#outcomes" className={styles.navLink}>
              Deliverables
            </a>
            <a href="#location" className={styles.navLink}>
              Location
            </a>
          </div>

          <a href="#apply" className={styles.navCta}>
            Apply for Residency →
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <div className={styles.locationEyebrow}>
              <span className={styles.locationDot} />
              <span>CONTENT COLONY • JOHAR TOWN, LAHORE • NEAR EXPO &amp; EMPORIUM</span>
            </div>

            <h1 className={styles.heroTitle}>
              Arrive With a Goal. <br />
              <span className={styles.heroTitleHighlight}>Leave With Completed Work.</span>
            </h1>

            <p className={styles.heroSubtitle}>
              You are not buying a bed, a desk, food, or another passive video course.
              <br />
              Content Colony is a <strong>Creator Execution Residency</strong>: a fixed period of
              accommodation, focused work, direct expert access, rigorous content review, and
              completed digital output.
            </p>

            <div className={styles.heroActions}>
              <a href="#apply" className={styles.btnPrimary}>
                <span>Apply for Residency</span>
                <span>→</span>
              </a>
              <a href="#packages" className={styles.btnSecondary}>
                Inspect Packages &amp; Pricing
              </a>
            </div>

            {/* Quick 3-Tier Overview */}
            <div className={styles.heroQuickTiers}>
              <div className={styles.quickTierItem}>
                <div className={styles.quickTierTop}>
                  <span className={styles.quickTierName}>7-Day Sprint</span>
                  <span className={styles.quickTierBadge}>Breakthrough</span>
                </div>
                <div className={styles.quickTierPrice}>PKR 100,000</div>
                <div className={styles.quickTierRate}>PKR 14,286/day</div>
                <div className={styles.quickTierFocus}>
                  Arrive with one problem. Leave with one completed outcome. Up to 7 hrs Abrar 1:1 + 1 Zahid review.
                </div>
              </div>

              <div className={`${styles.quickTierItem} ${styles.tierFeatured}`}>
                <div className={styles.quickTierTop}>
                  <span className={styles.quickTierName}>14-Day Build Sprint</span>
                  <span className={styles.quickTierBadge}>MOST POPULAR</span>
                </div>
                <div className={styles.quickTierPrice}>PKR 180,000</div>
                <div className={styles.quickTierRate}>PKR 12,857/day (Save 20K)</div>
                <div className={styles.quickTierFocus}>
                  Build it, test it, receive feedback, and improve it. 2 full execution cycles + 2 Zahid reviews.
                </div>
              </div>

              <div className={styles.quickTierItem}>
                <div className={styles.quickTierTop}>
                  <span className={styles.quickTierName}>30-Day Residency</span>
                  <span className={styles.quickTierBadge}>BEST VALUE</span>
                </div>
                <div className={styles.quickTierPrice}>PKR 300,000</div>
                <div className={styles.quickTierRate}>PKR 10,000/day (Save 100K)</div>
                <div className={styles.quickTierFocus}>
                  Full operating transformation. Up to 10 hrs Abrar 1:1, 3 Zahid reviews &amp; 90-day growth plan.
                </div>
              </div>
            </div>

            {/* Hardware & Infrastructure Proof Bar */}
            <div className={styles.statProofBar}>
              <div className={styles.statItem}>
                <div className={styles.statValue}>1,000 Mbps</div>
                <div className={styles.statLabel}>Dual-Redundant Fiber</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statValue}>100% 24/7</div>
                <div className={styles.statLabel}>Solar + Gen Backup</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statValue}>Studio Alpha</div>
                <div className={styles.statLabel}>Sony 4K &amp; Shure SM7B</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statValue}>Direct Access</div>
                <div className={styles.statLabel}>Abrar 1:1 &amp; Zahid Reviews</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The 5 Value Categories Section */}
      <section id="value-pillars" className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionEyebrow}>THE V3 VALUE EQUATION</span>
            <h2 className={styles.sectionTitle}>
              Why Should You Invest in Content Colony?
            </h2>
            <p className={styles.sectionLead}>
              &ldquo;Why should I pay PKR 100,000, 180,000, or 300,000—and exactly what will I receive?&rdquo;
              <br />
              The answer is simple: your investment is distributed across five measurable value categories
              designed to remove all friction from high-output creative execution.
            </p>
          </div>

          <div className={styles.pillarsGrid}>
            <div className={styles.pillarCard}>
              <div className={styles.pillarNumber}>VALUE CATEGORY 01</div>
              <h3 className={styles.pillarTitle}>Living Value</h3>
              <p className={styles.pillarDesc}>
                Frictionless daily life so your mental energy goes 100% into execution. No grocery runs, no cooking, no maintenance headaches.
              </p>
              <ul className={styles.pillarList}>
                <li>Hotel-grade private or shared residency suites</li>
                <li>Chef-curated healthy daily meals &amp; unlimited refreshments</li>
                <li>Daily housekeeping &amp; biometric 24/7 secure access</li>
                <li>Community creator lounge &amp; outdoor terrace</li>
              </ul>
            </div>

            <div className={styles.pillarCard}>
              <div className={styles.pillarNumber}>VALUE CATEGORY 02</div>
              <h3 className={styles.pillarTitle}>Workspace Value</h3>
              <p className={styles.pillarDesc}>
                A military-grade creative production compound built specifically for video editors, AI operators, and YouTube builders.
              </p>
              <ul className={styles.pillarList}>
                <li>1 Gbps dual-redundant fiber optic connection</li>
                <li>100% uninterrupted power (Solar + automated generator)</li>
                <li>Studio Bay Alpha &amp; Beta (4K Sony cinema, Shure SM7B, prompters)</li>
                <li>Shared RTX 4090 batch rendering compute node</li>
              </ul>
            </div>

            <div className={styles.pillarCard}>
              <div className={styles.pillarNumber}>VALUE CATEGORY 03</div>
              <h3 className={styles.pillarTitle}>Expert Access</h3>
              <p className={styles.pillarDesc}>
                Direct, structured access to operators who have generated hundreds of millions of views and 7-figure media businesses.
              </p>
              <ul className={styles.pillarList}>
                <li>Up to 7 to 10 hours structured 1:1 strategy with Abrar Nadir</li>
                <li>Daily morning execution briefings &amp; bottleneck elimination</li>
                <li>Mastermind war room sessions with peer builders</li>
                <li>No generic classroom lectures—only live problem solving</li>
              </ul>
            </div>

            <div className={styles.pillarCard}>
              <div className={styles.pillarNumber}>VALUE CATEGORY 04</div>
              <h3 className={styles.pillarTitle}>Content &amp; Channel Improvement</h3>
              <p className={styles.pillarDesc}>
                Rigorous, data-backed teardowns of your concepts, scripts, visual packaging, and algorithm retention curves.
              </p>
              <ul className={styles.pillarList}>
                <li>1 to 3 dedicated channel &amp; content review checkpoints with Zahid</li>
                <li>CTR packaging teardowns: titles, hooks &amp; thumbnail wireframes</li>
                <li>Retention graph audits on your past and current uploads</li>
                <li>Scripting rhythm, voice-over direction, and pacing edits</li>
              </ul>
            </div>

            <div className={styles.pillarCard}>
              <div className={styles.pillarNumber}>VALUE CATEGORY 05</div>
              <h3 className={styles.pillarTitle}>Completed Execution Output</h3>
              <p className={styles.pillarDesc}>
                The ultimate reason you are here: tangible digital assets built, recorded, tested, and ready to generate compounding returns.
              </p>
              <ul className={styles.pillarList}>
                <li>Documented Content DNA &amp; repeatable production pipeline</li>
                <li>First batch of high-retention video assets produced on site</li>
                <li>Tested AI scripting &amp; automation tool stack deployed</li>
                <li>Documented 30- to 90-day post-residency growth roadmap</li>
              </ul>
            </div>

            <div className={styles.pillarCard}>
              <div className={styles.pillarNumber}>PEER ADVANTAGE</div>
              <h3 className={styles.pillarTitle}>The High-Output Room</h3>
              <p className={styles.pillarDesc}>
                Environment dictates performance. When everyone around you is building, editing, testing prompts, and shipping at elite speed, procrastination becomes impossible.
              </p>
              <ul className={styles.pillarList}>
                <li>Strictly vetted peer creators and channel owners</li>
                <li>Shared contacts: editors, voice artists, scriptwriters</li>
                <li>Permanent access to the Content Colony Alumni network</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Tour Section */}
      <section id="tour" className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionEyebrow}>INTERACTIVE COMPOUND INSPECTION</span>
            <h2 className={styles.sectionTitle}>Take a Look Inside Content Colony</h2>
            <p className={styles.sectionLead}>
              Inspect the production studio bays, creator co-working floor, co-living suites,
              and mastermind war room located in Johar Town, Lahore.
            </p>
          </div>

          <TourSection />
        </div>
      </section>

      {/* Packages & Pricing Section */}
      <section id="packages" className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionEyebrow}>RESIDENCY COMMITMENTS</span>
            <h2 className={styles.sectionTitle}>Choose Your Execution Depth</h2>
            <p className={styles.sectionLead}>
              Every package provides full accommodation, meals, workspace, and expert review.
              Choose the time frame that matches your current business mission.
            </p>
          </div>

          <div className={styles.pricingGrid}>
            {/* 7-Day Sprint */}
            <article className={styles.pricingCard}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardPackageName}>7-Day Sprint</h3>
                <p className={styles.cardPromise}>
                  &ldquo;Arrive with one problem. Leave with one completed outcome.&rdquo;
                </p>
              </div>

              <div className={styles.cardPriceBlock}>
                <div className={styles.cardPrice}>PKR 100,000</div>
                <div className={styles.cardDailyRate}>Effective Daily Price: PKR 14,286/day</div>
                <div className={styles.cardRefValue}>Total Reference Value: PKR 134,000</div>
              </div>

              <ul className={styles.cardIncludesList}>
                <li>
                  <span className={styles.checkIcon}>✔</span>
                  <span><strong>7 nights</strong> shared accommodation &amp; housekeeping</span>
                </li>
                <li>
                  <span className={styles.checkIcon}>✔</span>
                  <span><strong>Shared meals</strong> &amp; chef-prepared refreshments</span>
                </li>
                <li>
                  <span className={styles.checkIcon}>✔</span>
                  <span><strong>7 days</strong> 24/7 coworking &amp; studio bay access</span>
                </li>
                <li>
                  <span className={styles.checkIcon}>✔</span>
                  <span><strong>Up to 7 hours</strong> structured 1:1 access with Abrar Nadir</span>
                </li>
                <li>
                  <span className={styles.checkIcon}>✔</span>
                  <span><strong>1 deep channel &amp; content review</strong> with Zahid</span>
                </li>
                <li>
                  <span className={styles.checkIcon}>✔</span>
                  <span><strong>1 defined execution mission</strong> &amp; daily accountability</span>
                </li>
                <li>
                  <span className={styles.checkIcon}>✔</span>
                  <span>Final review and <strong>30-day action plan</strong></span>
                </li>
              </ul>

              <div className={styles.cardQuote}>
                &ldquo;You are not paying PKR 100,000 to attend a class. You are investing PKR 100,000 in seven days of living, working, reviewing, and executing around one important outcome.&rdquo;
              </div>

              <a href="#apply" className={styles.cardCtaBtn}>
                Apply for 7-Day Sprint
              </a>
            </article>

            {/* 14-Day Build Sprint (MOST POPULAR) */}
            <article className={`${styles.pricingCard} ${styles.pricingCardFeatured}`}>
              <div className={styles.cardFloatingBadge}>
                MOST POPULAR — BUILD, TEST, IMPROVE
              </div>

              <div className={styles.cardHeader}>
                <h3 className={styles.cardPackageName}>14-Day Build Sprint</h3>
                <p className={styles.cardPromise}>
                  &ldquo;Build it, test it, receive feedback, and improve it.&rdquo;
                </p>
              </div>

              <div className={styles.cardPriceBlock}>
                <div className={styles.cardPrice}>PKR 180,000</div>
                <div className={styles.cardDailyRate}>Effective Daily Price: PKR 12,857/day</div>
                <div className={styles.cardSavings}>⚡ Saves PKR 20,000 vs two 7-day bookings</div>
                <div className={styles.cardRefValue}>Total Reference Value: PKR 238,000</div>
              </div>

              <ul className={styles.cardIncludesList}>
                <li>
                  <span className={styles.checkIcon}>✔</span>
                  <span><strong>Everything in the 7-day sprint</strong>, plus:</span>
                </li>
                <li>
                  <span className={styles.checkIcon}>✔</span>
                  <span><strong>14 nights</strong> accommodation &amp; 14 days coworking</span>
                </li>
                <li>
                  <span className={styles.checkIcon}>✔</span>
                  <span><strong>Two full execution cycles</strong> (build → feedback → re-build)</span>
                </li>
                <li>
                  <span className={styles.checkIcon}>✔</span>
                  <span><strong>2 Zahid content &amp; channel reviews</strong> (concept + post-edit)</span>
                </li>
                <li>
                  <span className={styles.checkIcon}>✔</span>
                  <span><strong>Up to 7 hours</strong> structured 1:1 strategy with Abrar Nadir</span>
                </li>
                <li>
                  <span className={styles.checkIcon}>✔</span>
                  <span>Workflow testing &amp; publishing/production correction</span>
                </li>
                <li>
                  <span className={styles.checkIcon}>✔</span>
                  <span>Midpoint performance audit &amp; revised roadmap</span>
                </li>
              </ul>

              <div className={styles.cardQuote}>
                &ldquo;The 14-day sprint is for people who do not only want to start. They want enough time to build, test, correct, and operate.&rdquo;
              </div>

              <a href="#apply" className={`${styles.cardCtaBtn} ${styles.cardCtaBtnFeatured}`}>
                Apply for 14-Day Build Sprint
              </a>
            </article>

            {/* 30-Day Creator Residency */}
            <article className={`${styles.pricingCard} ${styles.pricingCardBestValue}`}>
              <div className={`${styles.cardFloatingBadge} ${styles.badgeGold}`}>
                BEST VALUE — FULL TRANSFORMATION
              </div>

              <div className={styles.cardHeader}>
                <h3 className={styles.cardPackageName}>30-Day Residency</h3>
                <p className={styles.cardPromise}>
                  &ldquo;Replace scattered effort with a complete operating rhythm.&rdquo;
                </p>
              </div>

              <div className={styles.cardPriceBlock}>
                <div className={styles.cardPrice}>PKR 300,000</div>
                <div className={styles.cardDailyRate}>Effective Daily Price: PKR 10,000/day</div>
                <div className={styles.cardSavings}>⚡ Saves ~PKR 100,000 vs four 7-day bookings</div>
                <div className={styles.cardRefValue}>Total Reference Value: PKR 415,000</div>
              </div>

              <ul className={styles.cardIncludesList}>
                <li>
                  <span className={styles.checkIcon}>✔</span>
                  <span><strong>Everything in the 14-day sprint</strong>, plus:</span>
                </li>
                <li>
                  <span className={styles.checkIcon}>✔</span>
                  <span><strong>30 nights</strong> accommodation &amp; 30 days coworking</span>
                </li>
                <li>
                  <span className={styles.checkIcon}>✔</span>
                  <span><strong>Full-month operating immersion</strong> &amp; team workflows</span>
                </li>
                <li>
                  <span className={styles.checkIcon}>✔</span>
                  <span><strong>Up to 10 hours</strong> structured 1:1 strategy with Abrar Nadir</span>
                </li>
                <li>
                  <span className={styles.checkIcon}>✔</span>
                  <span><strong>3 Zahid channel/content review checkpoints</strong></span>
                </li>
                <li>
                  <span className={styles.checkIcon}>✔</span>
                  <span>Three progress reviews &amp; production repetition</span>
                </li>
                <li>
                  <span className={styles.checkIcon}>✔</span>
                  <span>Automation &amp; delegation system planning</span>
                </li>
                <li>
                  <span className={styles.checkIcon}>✔</span>
                  <span><strong>90-day post-residency growth operating plan</strong></span>
                </li>
              </ul>

              <div className={styles.cardQuote}>
                &ldquo;At PKR 10,000 per day, the 30-day residency gives you a place to live, a place to work, expert access, channel feedback, meals, and one month to build a real operating system.&rdquo;
              </div>

              <a href="#apply" className={styles.cardCtaBtn}>
                Apply for 30-Day Residency
              </a>
            </article>
          </div>
        </div>
      </section>

      {/* Pricing Psychology & Savings Comparison Table */}
      <section id="savings" className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionEyebrow}>PRICING TRANSPARENCY</span>
            <h2 className={styles.sectionTitle}>The Longer You Stay, The More You Save</h2>
            <p className={styles.sectionLead}>
              The longer package becomes psychologically and financially attractive because your effective
              daily cost drops from PKR 14,286/day to just PKR 10,000/day.
            </p>
          </div>

          <div className={styles.comparisonWrap}>
            <h3 className={styles.comparisonTitle}>If You Booked at the 7-Day Sprint Rate</h3>
            <p className={styles.comparisonLead}>
              Booking longer sprints gives you compounding execution depth with steep direct savings:
            </p>

            <div className={styles.tableContainer}>
              <table className={styles.compareTable}>
                <thead>
                  <tr>
                    <th>Duration</th>
                    <th>Effective Daily Rate</th>
                    <th>At 7-Day Rate Equivalent</th>
                    <th>Residency Investment</th>
                    <th>You Save</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>7-Day Sprint</strong></td>
                    <td>PKR 14,286 / day</td>
                    <td>PKR 100,000</td>
                    <td className={styles.tableHighlight}>PKR 100,000</td>
                    <td>—</td>
                  </tr>
                  <tr>
                    <td><strong>14-Day Build Sprint</strong></td>
                    <td>PKR 12,857 / day</td>
                    <td>PKR 200,000</td>
                    <td className={styles.tableHighlight}>PKR 180,000</td>
                    <td className={styles.tableSavings}>Save PKR 20,000</td>
                  </tr>
                  <tr>
                    <td><strong>30-Day Creator Residency</strong></td>
                    <td>PKR 10,000 / day</td>
                    <td>Approximately PKR 400,000</td>
                    <td className={styles.tableHighlight}>PKR 300,000</td>
                    <td className={styles.tableSavings}>Save ~PKR 100,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Reference Value Itemized Breakdown */}
          <div className={styles.refBreakdownGrid}>
            <div className={styles.refBreakdownCard}>
              <h4>7-Day Sprint Itemized Reference Value</h4>
              <ul className={styles.refList}>
                <li><span>Accommodation for 7 nights</span> <strong>PKR 35,000</strong></li>
                <li><span>Shared chef-prepared meals</span> <strong>PKR 14,000</strong></li>
                <li><span>Coworking compound &amp; 1 Gbps fiber</span> <strong>PKR 10,000</strong></li>
                <li><span>Execution workshop &amp; SOPs</span> <strong>PKR 15,000</strong></li>
                <li><span>Abrar 1:1 execution access (up to 7 hrs)</span> <strong>PKR 35,000</strong></li>
                <li><span>Zahid content and channel review (1x)</span> <strong>PKR 15,000</strong></li>
                <li><span>Planning, reviews, and accountability</span> <strong>PKR 10,000</strong></li>
              </ul>
              <div className={styles.refTotalLine}>
                <span>Total Reference Value:</span>
                <b>PKR 134,000 (You pay PKR 100,000)</b>
              </div>
            </div>

            <div className={styles.refBreakdownCard}>
              <h4>14-Day Build Sprint Itemized Reference Value</h4>
              <ul className={styles.refList}>
                <li><span>Accommodation for 14 nights</span> <strong>PKR 70,000</strong></li>
                <li><span>Shared chef-prepared meals</span> <strong>PKR 28,000</strong></li>
                <li><span>Coworking compound &amp; 1 Gbps fiber</span> <strong>PKR 20,000</strong></li>
                <li><span>Execution workshop &amp; SOPs</span> <strong>PKR 20,000</strong></li>
                <li><span>Abrar 1:1 execution access (up to 7 hrs)</span> <strong>PKR 45,000</strong></li>
                <li><span>Two Zahid content &amp; channel reviews (2x)</span> <strong>PKR 30,000</strong></li>
                <li><span>Testing, reviews, and accountability</span> <strong>PKR 25,000</strong></li>
              </ul>
              <div className={styles.refTotalLine}>
                <span>Total Reference Value:</span>
                <b>PKR 238,000 (You pay PKR 180,000)</b>
              </div>
            </div>
          </div>

          <div className={styles.refBreakdownGrid} style={{ marginTop: "24px" }}>
            <div className={styles.refBreakdownCard} style={{ gridColumn: "1 / -1", background: "rgba(245, 158, 11, 0.03)", borderColor: "rgba(245, 158, 11, 0.3)" }}>
              <h4>30-Day Creator Residency Itemized Reference Value</h4>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
                <ul className={styles.refList}>
                  <li><span>Accommodation for 30 nights</span> <strong>PKR 120,000</strong></li>
                  <li><span>Shared chef-prepared meals</span> <strong>PKR 60,000</strong></li>
                  <li><span>Coworking compound &amp; 1 Gbps fiber</span> <strong>PKR 35,000</strong></li>
                  <li><span>Execution workshop &amp; complete SOP library</span> <strong>PKR 25,000</strong></li>
                </ul>
                <ul className={styles.refList}>
                  <li><span>Abrar strategic execution access (up to 10 hrs)</span> <strong>PKR 60,000</strong></li>
                  <li><span>Three Zahid content &amp; channel reviews (3x)</span> <strong>PKR 45,000</strong></li>
                  <li><span>Reviews, accountability, and planning</span> <strong>PKR 40,000</strong></li>
                  <li><span>Workflow and team automation planning</span> <strong>PKR 30,000</strong></li>
                </ul>
              </div>
              <div className={styles.refTotalLine}>
                <span>Total Reference Value:</span>
                <b style={{ color: "var(--gold)" }}>PKR 415,000 (You pay PKR 300,000 — Save PKR 115,000)</b>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* "What You Leave With" Section */}
      <section id="outcomes" className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionEyebrow}>CONCRETE DELIVERABLES</span>
            <h2 className={styles.sectionTitle}>What You Leave With</h2>
            <p className={styles.sectionLead}>
              People do not buy time. They buy an outcome. You are coming here to complete work that would
              ordinarily take months of scattered, isolated effort.
            </p>
          </div>

          <div style={{ marginBottom: "24px", textAlign: "center", color: "var(--text-dim)", fontSize: "14px" }}>
            <em>Depending on your specific goals and chosen sprint duration, you may leave with:</em>
          </div>

          <div className={styles.outcomesGrid}>
            <div className={styles.outcomeCard}>
              <div className={styles.outcomeNumber}>DELIVERABLE 01</div>
              <h4 className={styles.outcomeTitle}>Clear Channel Positioning</h4>
              <p className={styles.outcomeDesc}>
                A validated niche thesis, audience avatar, and unique angle that prevents you from competing in commoditized red oceans.
              </p>
            </div>

            <div className={styles.outcomeCard}>
              <div className={styles.outcomeNumber}>DELIVERABLE 02</div>
              <h4 className={styles.outcomeTitle}>Documented Content DNA</h4>
              <p className={styles.outcomeDesc}>
                Your core content rules, storytelling frameworks, tone guidelines, and repeatable topic ideation engine.
              </p>
            </div>

            <div className={styles.outcomeCard}>
              <div className={styles.outcomeNumber}>DELIVERABLE 03</div>
              <h4 className={styles.outcomeTitle}>First Production Workflow</h4>
              <p className={styles.outcomeDesc}>
                A battle-tested step-by-step pipeline from research to scripting, voiceover, visual assembly, and thumbnail QA.
              </p>
            </div>

            <div className={styles.outcomeCard}>
              <div className={styles.outcomeNumber}>DELIVERABLE 04</div>
              <h4 className={styles.outcomeTitle}>Initial Video Batch Produced</h4>
              <p className={styles.outcomeDesc}>
                Fully shot or animated high-retention video assets produced directly using the Colony&apos;s 4K rigs and RTX rendering setups.
              </p>
            </div>

            <div className={styles.outcomeCard}>
              <div className={styles.outcomeNumber}>DELIVERABLE 05</div>
              <h4 className={styles.outcomeTitle}>Tested AI Tool Stack</h4>
              <p className={styles.outcomeDesc}>
                Fine-tuned AI prompt architectures, voice synthesis models, automation scripts, and workflow templates ready for your team.
              </p>
            </div>

            <div className={styles.outcomeCard}>
              <div className={styles.outcomeNumber}>DELIVERABLE 06</div>
              <h4 className={styles.outcomeTitle}>Offer or Landing Page</h4>
              <p className={styles.outcomeDesc}>
                If monetizing via backend services, digital products, or sponsorships, leave with your conversion funnel ready to collect revenue.
              </p>
            </div>

            <div className={styles.outcomeCard}>
              <div className={styles.outcomeNumber}>DELIVERABLE 07</div>
              <h4 className={styles.outcomeTitle}>Reviewed Channel Strategy</h4>
              <p className={styles.outcomeDesc}>
                Zahid&apos;s direct audit identifying retention leaks, poor intro hooks, thumbnail CTR flaws, and algorithmic disconnects.
              </p>
            </div>

            <div className={styles.outcomeCard}>
              <div className={styles.outcomeNumber}>DELIVERABLE 08</div>
              <h4 className={styles.outcomeTitle}>Main Bottleneck Eliminated</h4>
              <p className={styles.outcomeDesc}>
                Whatever has held you back for the last 6 months—whether scripting speed, editor delegation, or self-doubt—fixed with Abrar.
              </p>
            </div>

            <div className={styles.outcomeCard}>
              <div className={styles.outcomeNumber}>DELIVERABLE 09</div>
              <h4 className={styles.outcomeTitle}>30- to 90-Day Execution Roadmap</h4>
              <p className={styles.outcomeDesc}>
                A day-by-day operating rhythm to ensure momentum compounds after you return home to your normal environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Reality Math / Separate Cost Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.realityBox}>
            <div className={styles.realityGrid}>
              <div className={styles.realityLeft}>
                <span className={styles.sectionEyebrow}>THE UNIFIED ADVANTAGE</span>
                <h3>You Are Not Paying for a Room.</h3>
                <p>
                  You are investing in a concentrated execution period where all personal and technical friction is eliminated.
                </p>
                <p>
                  If you tried to arrange high-end accommodation, private meals, 1 Gbps dual-fiber, 24/7 solar power,
                  4K cinema studio bays, and private advisory sessions separately in Lahore, you would spend significantly more—and
                  waste dozens of hours coordinating logistics instead of building.
                </p>
                <p style={{ color: "#fff", fontWeight: 700 }}>
                  At Content Colony, everything is unified under one roof around one objective:
                  <br />
                  <span style={{ color: "var(--lime)", fontSize: "20px" }}>Helping you complete the work.</span>
                </p>
              </div>

              <div className={styles.realityRight}>
                <h4>If Arranged Separately (30 Days)</h4>
                <ul className={styles.separateCostsList}>
                  <li><span>Serviced Suite in Johar Town / DHA</span> <span>PKR 140,000</span></li>
                  <li><span>Chef Meals &amp; Nutrition (3x/day)</span> <span>PKR 60,000</span></li>
                  <li><span>Premium Coworking Desk + Fiber</span> <span>PKR 35,000</span></li>
                  <li><span>4K Studio Hourly Rentals (15 hrs)</span> <span>PKR 75,000</span></li>
                  <li><span>10 Hours Strategic Consulting</span> <span>PKR 150,000</span></li>
                  <li><span>Logistics, rides &amp; wasted transition time</span> <span>Priceless</span></li>
                </ul>
                <div className={styles.separateTotal}>
                  <span>Total Separate Cost:</span>
                  <s>PKR 460,000+</s>
                </div>
                <div style={{ marginTop: "14px", color: "var(--lime)", fontWeight: 900, fontSize: "16px" }}>
                  Content Colony 30-Day Rate: PKR 300,000
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionEyebrow}>PHYSICAL COMPOUND</span>
            <h2 className={styles.sectionTitle}>Johar Town, Lahore</h2>
            <p className={styles.sectionLead}>
              Located in the heart of Lahore&apos;s commercial and tech hub, minutes away from
              Emporium Mall, Expo Centre, and Canal Road.
            </p>
          </div>

          <div className={styles.locationGrid}>
            <div className={styles.locationDetails}>
              <h3 className={styles.locationTitle}>Central, Secure &amp; Accessible</h3>
              <p className={styles.locationDesc}>
                Content Colony is positioned in a peaceful, secure residential enclave in Johar Town,
                giving you serene quiet for deep focus, with immediate 3-minute access to Lahore&apos;s
                finest dining, shopping, and transportation arteries.
              </p>

              <ul className={styles.locationHighlights}>
                <li>
                  <span className={styles.locationBadge}>3 Mins</span>
                  <span>Emporium Mall &amp; Expo Centre Lahore</span>
                </li>
                <li>
                  <span className={styles.locationBadge}>5 Mins</span>
                  <span>Canal Road &amp; Abdul Sattar Edhi Road arterial access</span>
                </li>
                <li>
                  <span className={styles.locationBadge}>25 Mins</span>
                  <span>Allama Iqbal International Airport (LHE)</span>
                </li>
                <li>
                  <span className={styles.locationBadge}>24/7 Security</span>
                  <span>Biometric perimeter, CCTV surveillance, gated compound</span>
                </li>
              </ul>
            </div>

            <div className={styles.compoundPerks}>
              <div className={styles.perkCard}>
                <div className={styles.perkIcon}>⚡</div>
                <h4>Zero Power Cuts</h4>
                <p>Hybrid solar system with automatic industrial generator failsafe. Your renders never fail.</p>
              </div>

              <div className={styles.perkCard}>
                <div className={styles.perkIcon}>🌐</div>
                <h4>Dual 1 Gbps Fiber</h4>
                <p>Two distinct fiber backbones with automated load-balancing. Instant 4K video uploads.</p>
              </div>

              <div className={styles.perkCard}>
                <div className={styles.perkIcon}>🍳</div>
                <h4>Chef-Curated Meals</h4>
                <p>Nutritious, energizing meals prepared fresh on-site to keep your brain firing at peak clarity.</p>
              </div>

              <div className={styles.perkCard}>
                <div className={styles.perkIcon}>🎙️</div>
                <h4>Dedicated Studios</h4>
                <p>Acoustic treatment, teleprompter, Aputure lighting, and cinema bodies ready to record.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section id="apply" className={styles.bookingSection}>
        <div className={styles.container}>
          <BookingForm initialPackage="14-Day Build Sprint — PKR 180,000" />
        </div>
      </section>

      {/* FAQ Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionEyebrow}>CLARIFICATIONS</span>
            <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
          </div>

          <div className={styles.faqGrid}>
            <div className={styles.faqItem}>
              <h4 className={styles.faqQuestion}>Is accommodation included in the price?</h4>
              <p className={styles.faqAnswer}>
                Yes. All packages (7-Day, 14-Day, 30-Day) include accommodation, chef-prepared shared meals,
                24/7 coworking, studio bay access, and all utilities (power backup &amp; 1 Gbps fiber).
              </p>
            </div>

            <div className={styles.faqItem}>
              <h4 className={styles.faqQuestion}>What happens after I submit my application?</h4>
              <p className={styles.faqAnswer}>
                Our admissions team reviews your current build, bottleneck, and outcome within 24–48 hours.
                If shortlisted, you will be invited to a brief alignment discussion on WhatsApp to confirm dates.
              </p>
            </div>

            <div className={styles.faqItem}>
              <h4 className={styles.faqQuestion}>Do I need to pay immediately?</h4>
              <p className={styles.faqAnswer}>
                No. Submitting this application is free. Do not send any money until you have been formally accepted
                and verified by Abrar Nadir&apos;s team. To filter unserious applicants, an optional PKR 2,500 screening deposit
                may be requested upon shortlisting, which is 100% credited against your residency balance.
              </p>
            </div>

            <div className={styles.faqItem}>
              <h4 className={styles.faqQuestion}>Can I extend my stay while at the Colony?</h4>
              <p className={styles.faqAnswer}>
                Extensions (e.g. 7 or 14 days) are offered exclusively to residents showing exceptional execution discipline,
                subject to compound room and desk capacity.
              </p>
            </div>

            <div className={styles.faqItem}>
              <h4 className={styles.faqQuestion}>Do you guarantee YouTube views or monetisation?</h4>
              <p className={styles.faqAnswer}>
                No. We guarantee an elite environment, rigorous expert reviews, cutting-edge tools, and completed output.
                YouTube algorithms and viewer behavior depend on market response and long-term execution consistency.
              </p>
            </div>

            <div className={styles.faqItem}>
              <h4 className={styles.faqQuestion}>What if I live in Lahore—can I do day access?</h4>
              <p className={styles.faqAnswer}>
                The Colony is designed as an immersive residency where living together accelerates breakthroughs.
                However, Lahore residents may choose to commute if accepted, but the core pricing and expert access allocation remain the same.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerInner}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                <span className={styles.brandSymbol} style={{ width: "30px", height: "30px", fontSize: "13px" }}>CC</span>
                <span style={{ fontWeight: 900, letterSpacing: "0.08em" }}>CONTENT COLONY V3</span>
              </div>
              <p style={{ fontSize: "13px", color: "var(--text-dim)" }}>
                Co-Live · Co-Work · Execute · Johar Town, Lahore, Pakistan
              </p>
            </div>

            <div style={{ display: "flex", gap: "24px", fontSize: "13px" }}>
              <Link href="/" style={{ color: "var(--text-soft)", textDecoration: "none" }}>
                Abrar Nadir Home
              </Link>
              <Link href="/academy/ytempirebuilder" style={{ color: "var(--text-soft)", textDecoration: "none" }}>
                YT Empire Builders
              </Link>
              <a href="#apply" style={{ color: "var(--lime)", textDecoration: "none", fontWeight: 700 }}>
                Apply for Residency
              </a>
            </div>
          </div>

          <div className={styles.footerNote}>
            CONTENT COLONY is an execution residency operated by Abrar Nadir. Results shown are real creator outcomes and vary by individual effort, niche dynamics, and market conditions. Nothing on this page is a guarantee of income, subscriber counts, or financial returns.
          </div>
        </div>
      </footer>
    </main>
  );
}
