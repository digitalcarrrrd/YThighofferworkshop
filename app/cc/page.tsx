import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";
import { BookingForm } from "./BookingForm";

export const metadata: Metadata = {
  title: "Content Colony V3 — Creator Residency | Abrar Nadir",
  description:
    "A residential creator compound in Johar Town, Lahore for serious YouTube operators and AI builders. 7-Day Sprint, 14-Day Build Sprint, and 30-Day Residency.",
  openGraph: {
    title: "Content Colony V3 — Creator Residency",
    description:
      "Arrive with a goal. Leave with completed work. Accommodation, meals, fast 300 Mbps internet, 24/7 power backup, 1:1 strategy access with Abrar Nadir.",
    url: "https://www.abrarnadir.com/cc",
  },
};

export default function ContentColonyPage() {
  return (
    <main className={styles.page}>
      {/* Top Bar Announcement */}
      <div className={styles.topBanner}>
        <span className={styles.topBannerBadge}>FOUNDING COHORT V3</span>
        <span>FIRST 10 RESIDENTS RECEIVE FOUNDING-COHORT PRICING &amp; PERMANENT ALUMNI STATUS</span>
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
            <a href="#value-pillars">5 Value Areas</a>
            <a href="#packages">Packages &amp; Pricing</a>
            <a href="#savings">Pricing Math</a>
            <a href="#outcomes">Deliverables</a>
            <a href="#location">Location</a>
          </div>

          <a href="#apply" className={styles.navCta}>
            Apply for Residency →
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <div className={styles.heroTag}>
              <span className={styles.heroTagDot} />
              <span>DOOR 02 — IRL COMPOUND · CO-LIVE · CO-WORK · JOHAR TOWN, LAHORE</span>
            </div>

            <h1>
              Arrive With a Goal. <br />
              <span>Leave With Completed Work.</span>
            </h1>

            <p className={styles.heroSub}>
              You are not buying a bed, a desk, food, or another video course.
              <br />
              Content Colony is a <strong>Creator Residency</strong>: a fixed period of
              accommodation, focused work, direct expert access, content review, and
              completed digital output.
            </p>

            <div className={styles.heroActions}>
              <a href="#apply" className={styles.btnPrimary}>
                Apply for Residency →
              </a>
              <a href="#packages" className={styles.btnSecondary}>
                Inspect Packages &amp; Pricing
              </a>
            </div>

            {/* 3 Quick Preview Doors */}
            <div className={styles.heroDoors}>
              <a href="#packages" className={styles.heroDoorItem}>
                <div>
                  <div className={styles.heroDoorTop}>
                    <span className={styles.heroDoorNum}>SPRINT 01</span>
                    <span className={styles.heroDoorBadge}>Breakthrough</span>
                  </div>
                  <div className={styles.heroDoorTitle}>7-Day Sprint</div>
                  <div className={styles.heroDoorPrice}>PKR 100,000</div>
                  <div className={styles.heroDoorRate}>PKR 14,286 / day</div>
                </div>
                <div className={styles.heroDoorDesc}>
                  One problem solved. One finished outcome. Up to 7 hrs Abrar 1:1 + 1 deep content audit.
                </div>
              </a>

              <a href="#packages" className={styles.heroDoorItem}>
                <div>
                  <div className={styles.heroDoorTop}>
                    <span className={styles.heroDoorNum}>SPRINT 02</span>
                    <span className={styles.heroDoorBadge}>MOST POPULAR</span>
                  </div>
                  <div className={styles.heroDoorTitle}>14-Day Build Sprint</div>
                  <div className={styles.heroDoorPrice}>PKR 180,000</div>
                  <div className={styles.heroDoorRate}>PKR 12,857 / day (Save 20K)</div>
                </div>
                <div className={styles.heroDoorDesc}>
                  Build it, test it, receive feedback, and improve it. 2 build cycles + 2 deep content audits.
                </div>
              </a>

              <a href="#packages" className={styles.heroDoorItem}>
                <div>
                  <div className={styles.heroDoorTop}>
                    <span className={styles.heroDoorNum}>SPRINT 03</span>
                    <span className={styles.heroDoorBadge}>BEST VALUE</span>
                  </div>
                  <div className={styles.heroDoorTitle}>30-Day Residency</div>
                  <div className={styles.heroDoorPrice}>PKR 300,000</div>
                  <div className={styles.heroDoorRate}>PKR 10,000 / day (Save 100K)</div>
                </div>
                <div className={styles.heroDoorDesc}>
                  Full operating transformation. Up to 10 hrs Abrar 1:1, 3 review checkpoints &amp; 90-day plan.
                </div>
              </a>
            </div>

            {/* Compound Stat Bar */}
            <div className={styles.statBar}>
              <div className={styles.statCell}>
                <div className={styles.statValue}>300 Mbps</div>
                <div className={styles.statLabel}>Fast Internet 300 Mbps</div>
              </div>
              <div className={styles.statCell}>
                <div className={styles.statValue}>100% 24/7</div>
                <div className={styles.statLabel}>Solar + Gen Backup</div>
              </div>
              <div className={styles.statCell}>
                <div className={styles.statValue}>Prime Location</div>
                <div className={styles.statLabel}>Johar Town, Lahore</div>
              </div>
              <div className={styles.statCell}>
                <div className={styles.statValue}>Direct Access</div>
                <div className={styles.statLabel}>Abrar 1:1 &amp; Content Audits</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The 5 Value Categories Section */}
      <section id="value-pillars" className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <span className={styles.eyebrow}>THE V3 VALUE EQUATION</span>
            <h2>Why Should You Invest in Content Colony?</h2>
            <p>
              &ldquo;Why should I pay PKR 100,000, 180,000, or 300,000—and exactly what will I receive?&rdquo;
              <br />
              Your investment is divided into five clear value categories designed to eliminate every
              friction point from creative work.
            </p>
          </div>

          <div className={styles.pillarsGrid}>
            <div className={styles.pillarCard}>
              <div className={styles.pillarNum}>01</div>
              <h3 className={styles.pillarTitle}>Living Value</h3>
              <p className={styles.pillarDesc}>
                Frictionless daily life so your mental energy goes 100% into building. No grocery runs, cooking, or household maintenance.
              </p>
              <ul className={styles.pillarList}>
                <li>Private or shared comfortable residency suites</li>
                <li>Chef-curated daily meals &amp; fresh refreshments</li>
                <li>Daily housekeeping &amp; secure 24/7 access</li>
                <li>Communal creator lounge &amp; quiet outdoor patio</li>
              </ul>
            </div>

            <div className={styles.pillarCard}>
              <div className={styles.pillarNum}>02</div>
              <h3 className={styles.pillarTitle}>Workspace Value</h3>
              <p className={styles.pillarDesc}>
                A dedicated, high-focus environment built for video editors, AI creators, and serious channel owners.
              </p>
              <ul className={styles.pillarList}>
                <li>Fast Internet 300 Mbps with high stability</li>
                <li>100% uninterrupted power (Solar + automated generator backup)</li>
                <li>Ergonomic creator workstations with ample desk space</li>
                <li>Quiet, distraction-free environment for deep focus</li>
              </ul>
            </div>

            <div className={styles.pillarCard}>
              <div className={styles.pillarNum}>03</div>
              <h3 className={styles.pillarTitle}>Expert Access</h3>
              <p className={styles.pillarDesc}>
                Direct, structured strategy access to operators who manage large digital properties and millions of monthly views.
              </p>
              <ul className={styles.pillarList}>
                <li>Up to 7 to 10 hours structured 1:1 strategy with Abrar Nadir</li>
                <li>Daily morning execution briefings &amp; bottleneck correction</li>
                <li>Mastermind war room sessions with peer builders</li>
                <li>No generic lectures—only live systems and problem solving</li>
              </ul>
            </div>

            <div className={styles.pillarCard}>
              <div className={styles.pillarNum}>04</div>
              <h3 className={styles.pillarTitle}>Content &amp; Channel Improvement</h3>
              <p className={styles.pillarDesc}>
                Data-backed teardowns of your concepts, scripts, visual packaging, and algorithmic retention curves.
              </p>
              <ul className={styles.pillarList}>
                <li>1 to 3 dedicated channel &amp; content review checkpoints</li>
                <li>CTR packaging audits: titles, hooks &amp; thumbnail wireframes</li>
                <li>Retention graph audits on your past and current uploads</li>
                <li>Scripting rhythm, voice-over direction, and pacing edits</li>
              </ul>
            </div>

            <div className={styles.pillarCard}>
              <div className={styles.pillarNum}>05</div>
              <h3 className={styles.pillarTitle}>Completed Execution Output</h3>
              <p className={styles.pillarDesc}>
                The ultimate metric: tangible digital assets built, recorded, tested, and ready to compound.
              </p>
              <ul className={styles.pillarList}>
                <li>Documented Content DNA &amp; repeatable production pipeline</li>
                <li>First batch of high-retention video assets produced on site</li>
                <li>Tested AI scripting &amp; automation tool stack deployed</li>
                <li>Documented 30- to 90-day post-residency growth roadmap</li>
              </ul>
            </div>

            <div className={styles.pillarCard}>
              <div className={styles.pillarNum}>06</div>
              <h3 className={styles.pillarTitle}>The High-Output Room</h3>
              <p className={styles.pillarDesc}>
                Environment dictates speed. When everyone around you is building, editing, and shipping daily, hesitation disappears.
              </p>
              <ul className={styles.pillarList}>
                <li>Strictly vetted peer creators and channel operators</li>
                <li>Shared network: top editors, voice artists, scriptwriters</li>
                <li>Permanent access to the Content Colony Alumni network</li>
                <li>Collaborative mastermind feedback loops</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Packages & Pricing Section */}
      <section id="packages" className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <span className={styles.eyebrow}>COMMITMENTS &amp; PACKAGES</span>
            <h2>Choose Your Execution Depth</h2>
            <p>
              Every package includes accommodation, meals, workspace, and expert review.
              Select the duration that matches your current business mission.
            </p>
          </div>

          <div className={styles.pricingDoors}>
            {/* 7-Day Sprint */}
            <article className={styles.pricingDoor}>
              <div>
                <div className={styles.pDoorNum}>DOOR 01 — 7 DAYS</div>
                <h3 className={styles.pDoorName}>7-Day Sprint</h3>
                <p className={styles.pDoorPromise}>
                  &ldquo;Arrive with one problem. Leave with one completed outcome.&rdquo;
                </p>

                <div className={styles.pDoorPriceBlock}>
                  <div className={styles.pDoorPrice}>PKR 100,000</div>
                  <div className={styles.pDoorRate}>Effective Daily Price: PKR 14,286 / day</div>
                  <div className={styles.pDoorRef}>Total Reference Value: ∞ (Priceless)</div>
                </div>

                <ul className={styles.pDoorList}>
                  <li><strong>7 nights</strong> shared accommodation &amp; housekeeping</li>
                  <li><strong>Shared meals</strong> &amp; chef-prepared refreshments</li>
                  <li><strong>7 days</strong> 24/7 coworking desk access</li>
                  <li><strong>Up to 7 hours</strong> structured 1:1 access with Abrar Nadir</li>
                  <li><strong>1 deep channel &amp; content review</strong></li>
                  <li><strong>1 defined execution mission</strong> &amp; daily accountability</li>
                  <li>Final review and <strong>30-day action plan</strong></li>
                </ul>

                <div className={styles.pDoorQuote}>
                  &ldquo;You are not paying PKR 100,000 to attend a class. You are investing PKR 100,000 in seven days of living, working, reviewing, and executing around one important outcome.&rdquo;
                </div>
              </div>

              <a href="#apply" className={styles.pDoorBtn}>
                Apply for 7-Day Sprint →
              </a>
            </article>

            {/* 14-Day Build Sprint (MOST POPULAR) */}
            <article className={`${styles.pricingDoor} ${styles.pricingDoorFeatured}`}>
              <span className={styles.pDoorBadge}>MOST POPULAR</span>
              <div>
                <div className={styles.pDoorNum}>DOOR 02 — 14 DAYS</div>
                <h3 className={styles.pDoorName}>14-Day Build Sprint</h3>
                <p className={styles.pDoorPromise}>
                  &ldquo;Build it, test it, receive feedback, and improve it.&rdquo;
                </p>

                <div className={styles.pDoorPriceBlock}>
                  <div className={styles.pDoorPrice}>PKR 180,000</div>
                  <div className={styles.pDoorRate}>Effective Daily Price: PKR 12,857 / day</div>
                  <div className={styles.pDoorSavings}>⚡ Saves PKR 20,000 vs two 7-day bookings</div>
                  <div className={styles.pDoorRef}>Total Reference Value: ∞ (Priceless)</div>
                </div>

                <ul className={styles.pDoorList}>
                  <li><strong>Everything in the 7-day sprint</strong>, plus:</li>
                  <li><strong>14 nights</strong> accommodation &amp; 14 days coworking</li>
                  <li><strong>Two full execution cycles</strong> (build → test → iterate)</li>
                  <li><strong>2 deep channel &amp; content reviews</strong></li>
                  <li><strong>Up to 7 hours</strong> structured 1:1 strategy with Abrar Nadir</li>
                  <li>Workflow testing &amp; publishing/production correction</li>
                  <li>Midpoint performance review &amp; revised roadmap</li>
                </ul>

                <div className={styles.pDoorQuote}>
                  &ldquo;The 14-day sprint is for people who do not only want to start. They want enough time to build, test, correct, and operate.&rdquo;
                </div>
              </div>

              <a href="#apply" className={styles.pDoorBtn}>
                Apply for 14-Day Build Sprint →
              </a>
            </article>

            {/* 30-Day Creator Residency */}
            <article className={styles.pricingDoor}>
              <span className={styles.pDoorBadge}>BEST VALUE</span>
              <div>
                <div className={styles.pDoorNum}>DOOR 03 — 30 DAYS</div>
                <h3 className={styles.pDoorName}>30-Day Residency</h3>
                <p className={styles.pDoorPromise}>
                  &ldquo;Replace scattered effort with a complete operating rhythm.&rdquo;
                </p>

                <div className={styles.pDoorPriceBlock}>
                  <div className={styles.pDoorPrice}>PKR 300,000</div>
                  <div className={styles.pDoorRate}>Effective Daily Price: PKR 10,000 / day</div>
                  <div className={styles.pDoorSavings}>⚡ Saves ~PKR 100,000 vs four 7-day bookings</div>
                  <div className={styles.pDoorRef}>Total Reference Value: ∞ (Priceless)</div>
                </div>

                <ul className={styles.pDoorList}>
                  <li><strong>Everything in the 14-day sprint</strong>, plus:</li>
                  <li><strong>30 nights</strong> accommodation &amp; 30 days coworking</li>
                  <li><strong>Full-month operating immersion</strong> &amp; systems building</li>
                  <li><strong>Up to 10 hours</strong> structured 1:1 strategy with Abrar Nadir</li>
                  <li><strong>3 channel/content review checkpoints</strong></li>
                  <li>Three progress reviews &amp; production repetition</li>
                  <li>Automation &amp; delegation system planning</li>
                  <li><strong>90-day post-residency growth operating plan</strong></li>
                </ul>

                <div className={styles.pDoorQuote}>
                  &ldquo;At PKR 10,000 per day, the 30-day residency gives you a place to live, a place to work, expert access, channel feedback, meals, and one month to build a real operating system.&rdquo;
                </div>
              </div>

              <a href="#apply" className={styles.pDoorBtn}>
                Apply for 30-Day Residency →
              </a>
            </article>
          </div>
        </div>
      </section>

      {/* Psychology & Pricing Math (INVERTED WHITE WALL SECTION) */}
      <section id="savings" className={styles.wallSection}>
        <div className={styles.container}>
          <div className={styles.wallHeading}>
            <span className={styles.wallEyebrow}>PRICING PSYCHOLOGY</span>
            <h2>The Longer You Stay, The Lower Your Daily Cost</h2>
            <p>
              Booking longer commitments gives you compounding execution depth with steep direct savings:
            </p>
          </div>

          <div className={styles.tableWrap}>
            <table className={styles.mathTable}>
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
                  <td className={styles.mathPriceBold}>PKR 100,000</td>
                  <td>—</td>
                </tr>
                <tr>
                  <td><strong>14-Day Build Sprint</strong></td>
                  <td>PKR 12,857 / day</td>
                  <td>PKR 200,000</td>
                  <td className={styles.mathPriceBold}>PKR 180,000</td>
                  <td className={styles.mathSavings}>Save PKR 20,000</td>
                </tr>
                <tr>
                  <td><strong>30-Day Creator Residency</strong></td>
                  <td>PKR 10,000 / day</td>
                  <td>Approximately PKR 400,000</td>
                  <td className={styles.mathPriceBold}>PKR 300,000</td>
                  <td className={styles.mathSavings}>Save ~PKR 100,000</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Reference Value Itemized Breakdown Cards */}
          <div className={styles.refBreakdownGrid}>
            <div className={styles.refCard}>
              <h4>7-Day Sprint Reference Value</h4>
              <ul className={styles.refList}>
                <li><span>Accommodation for 7 nights</span> <strong>PKR 35,000</strong></li>
                <li><span>Shared meals</span> <strong>PKR 14,000</strong></li>
                <li><span>Coworking compound &amp; Fast 300 Mbps internet</span> <strong>PKR 10,000</strong></li>
                <li><span>Execution workshop &amp; SOPs</span> <strong>PKR 15,000</strong></li>
                <li><span>Abrar 1:1 execution access (up to 7 hrs)</span> <strong>∞ (Priceless)</strong></li>
                <li><span>Channel and content deep review (1x)</span> <strong>PKR 15,000</strong></li>
                <li><span>Planning, reviews, and accountability</span> <strong>PKR 10,000</strong></li>
              </ul>
              <div className={styles.refTotalRow}>
                <span>Total Reference Value:</span>
                <span>∞ (Priceless) — You pay PKR 100,000</span>
              </div>
            </div>

            <div className={styles.refCard}>
              <h4>14-Day Build Sprint Reference Value</h4>
              <ul className={styles.refList}>
                <li><span>Accommodation for 14 nights</span> <strong>PKR 70,000</strong></li>
                <li><span>Shared meals</span> <strong>PKR 28,000</strong></li>
                <li><span>Coworking compound &amp; Fast 300 Mbps internet</span> <strong>PKR 20,000</strong></li>
                <li><span>Execution workshop &amp; SOPs</span> <strong>PKR 20,000</strong></li>
                <li><span>Abrar 1:1 execution access (up to 7 hrs)</span> <strong>∞ (Priceless)</strong></li>
                <li><span>Two channel &amp; content deep reviews (2x)</span> <strong>PKR 30,000</strong></li>
                <li><span>Testing, reviews, and accountability</span> <strong>PKR 25,000</strong></li>
              </ul>
              <div className={styles.refTotalRow}>
                <span>Total Reference Value:</span>
                <span>∞ (Priceless) — You pay PKR 180,000</span>
              </div>
            </div>
          </div>

          <div style={{ marginTop: "24px" }}>
            <div className={styles.refCard} style={{ background: "#f5f5f7" }}>
              <h4>30-Day Creator Residency Reference Value</h4>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
                <ul className={styles.refList}>
                  <li><span>Accommodation for 30 nights</span> <strong>PKR 120,000</strong></li>
                  <li><span>Shared meals</span> <strong>PKR 60,000</strong></li>
                  <li><span>Coworking compound &amp; Fast 300 Mbps internet</span> <strong>PKR 35,000</strong></li>
                  <li><span>Execution workshop &amp; complete SOPs</span> <strong>PKR 25,000</strong></li>
                </ul>
                <ul className={styles.refList}>
                  <li><span>Abrar strategic execution access (up to 10 hrs)</span> <strong>∞ (Priceless)</strong></li>
                  <li><span>Three channel &amp; content review checkpoints (3x)</span> <strong>PKR 45,000</strong></li>
                  <li><span>Reviews, accountability, and planning</span> <strong>PKR 40,000</strong></li>
                  <li><span>Workflow and team automation planning</span> <strong>PKR 30,000</strong></li>
                </ul>
              </div>
              <div className={styles.refTotalRow}>
                <span>Total Reference Value:</span>
                <span>∞ (Priceless) — You pay PKR 300,000</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deliverables Section ("What You Leave With") */}
      <section id="outcomes" className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <span className={styles.eyebrow}>TANGIBLE ASSETS</span>
            <h2>What You Leave With</h2>
            <p>
              People do not buy time. They buy an outcome. Depending on your goal, you may leave with:
            </p>
          </div>

          <div className={styles.deliverablesGrid}>
            <div className={styles.delivCard}>
              <div className={styles.delivNum}>01 — POSITIONING</div>
              <h4 className={styles.delivTitle}>Clear Channel Positioning</h4>
              <p className={styles.delivDesc}>
                A validated niche thesis, audience avatar, and unique angle that avoids competing in crowded red oceans.
              </p>
            </div>

            <div className={styles.delivCard}>
              <div className={styles.delivNum}>02 — SYSTEMS</div>
              <h4 className={styles.delivTitle}>Documented Content DNA</h4>
              <p className={styles.delivDesc}>
                Core storytelling frameworks, brand voice guidelines, and a repeatable topic ideation engine.
              </p>
            </div>

            <div className={styles.delivCard}>
              <div className={styles.delivNum}>03 — PIPELINE</div>
              <h4 className={styles.delivTitle}>First Production Workflow</h4>
              <p className={styles.delivDesc}>
                A step-by-step pipeline from research to scripting, voiceover, visual assembly, and thumbnail QA.
              </p>
            </div>

            <div className={styles.delivCard}>
              <div className={styles.delivNum}>04 — OUTPUT</div>
              <h4 className={styles.delivTitle}>Initial Video Batch Produced</h4>
              <p className={styles.delivDesc}>
                High-retention video assets recorded or assembled on-site with full script and packaging clearance.
              </p>
            </div>

            <div className={styles.delivCard}>
              <div className={styles.delivNum}>05 — AUTOMATION</div>
              <h4 className={styles.delivTitle}>Tested AI Tool Stack</h4>
              <p className={styles.delivDesc}>
                Fine-tuned AI prompt architectures, voice synthesis models, automation scripts, and team templates.
              </p>
            </div>

            <div className={styles.delivCard}>
              <div className={styles.delivNum}>06 — MONETIZATION</div>
              <h4 className={styles.delivTitle}>Offer or Landing Page</h4>
              <p className={styles.delivDesc}>
                If monetizing via backend services, digital products, or sponsorships, leave with your conversion funnel ready.
              </p>
            </div>

            <div className={styles.delivCard}>
              <div className={styles.delivNum}>07 — RETENTION</div>
              <h4 className={styles.delivTitle}>Reviewed Channel Strategy</h4>
              <p className={styles.delivDesc}>
                Direct audit identifying retention leaks, poor intro hooks, CTR flaws, and algorithmic disconnects.
              </p>
            </div>

            <div className={styles.delivCard}>
              <div className={styles.delivNum}>08 — PROBLEM SOLVING</div>
              <h4 className={styles.delivTitle}>Main Bottleneck Eliminated</h4>
              <p className={styles.delivDesc}>
                Whatever has held you back for months—scripting speed, editor delegation, or lack of focus—fixed with Abrar.
              </p>
            </div>

            <div className={styles.delivCard}>
              <div className={styles.delivNum}>09 — ROADMAP</div>
              <h4 className={styles.delivTitle}>30- to 90-Day Execution Plan</h4>
              <p className={styles.delivDesc}>
                A daily operating rhythm to ensure momentum compounds after you return home to your normal environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reality Check Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.realityGrid}>
            <div className={styles.realityLeft}>
              <span className={styles.eyebrow}>THE UNIFIED ADVANTAGE</span>
              <h3>You Are Not Paying for a Room.</h3>
              <p>
                You are investing in a concentrated period where all personal and technical friction is eliminated.
              </p>
              <p>
                If you tried to arrange accommodation, meals, fast 300 Mbps internet, 24/7 power backup,
                and private advisory sessions separately in Lahore, you would spend significantly more—and
                waste dozens of hours coordinating logistics instead of building.
              </p>
              <p className={styles.hand}>
                At Content Colony, everything is unified under one roof: Helping you complete the work.
              </p>
            </div>

            <div className={styles.realityRight}>
              <h4>If Arranged Separately (30 Days)</h4>
              <ul className={styles.separateList}>
                <li><span>Serviced Suite in Johar Town / DHA</span> <span>PKR 140,000</span></li>
                <li><span>Chef Meals &amp; Nutrition (3x/day)</span> <span>PKR 60,000</span></li>
                <li><span>Premium Coworking Desk + High-Speed Net</span> <span>PKR 35,000</span></li>
                <li><span>10 Hours Strategic Advisory with Abrar</span> <span>PKR 150,000</span></li>
              </ul>
              <div className={styles.separateTotal}>
                <span>Total Separate Cost:</span>
                <s>PKR 385,000+</s>
              </div>
              <div style={{ marginTop: "16px", fontWeight: 900, fontSize: "1.1rem" }}>
                Content Colony 30-Day Rate: PKR 300,000
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <span className={styles.eyebrow}>PHYSICAL LOCATION</span>
            <h2>Johar Town, Lahore</h2>
            <p>
              Positioned in a peaceful, secure residential enclave in Johar Town,
              giving you serene quiet for deep focus, with immediate 3-minute access to Lahore&apos;s
              finest dining and transportation arteries.
            </p>
          </div>

          <div className={styles.locGrid}>
            <div className={styles.locDetails}>
              <h3 className={styles.locTitle}>Central, Secure &amp; Accessible</h3>
              <p className={styles.locDesc}>
                Near Expo Centre, Emporium Mall, and Canal Road. Quick transit from anywhere in Lahore.
              </p>

              <ul className={styles.locList}>
                <li>
                  <span className={styles.locBadge}>3 Mins</span>
                  <span>Emporium Mall &amp; Expo Centre Lahore</span>
                </li>
                <li>
                  <span className={styles.locBadge}>5 Mins</span>
                  <span>Canal Road &amp; Abdul Sattar Edhi Road</span>
                </li>
                <li>
                  <span className={styles.locBadge}>25 Mins</span>
                  <span>Allama Iqbal International Airport (LHE)</span>
                </li>
              </ul>
            </div>

            <div className={styles.locPerks}>
              <div className={styles.locPerkCard}>
                <h5>⚡ Zero Power Cuts</h5>
                <p>Hybrid solar system with automatic industrial generator failsafe. Work never stops.</p>
              </div>

              <div className={styles.locPerkCard}>
                <h5>🌐 Fast Internet 300 Mbps</h5>
                <p>High-speed internet line with backup connection. Fast uploads and research.</p>
              </div>

              <div className={styles.locPerkCard}>
                <h5>🍳 Chef-Curated Meals</h5>
                <p>Nutritious meals prepared fresh daily on-site so you stay focused on building.</p>
              </div>

              <div className={styles.locPerkCard}>
                <h5>🤝 High-Synergy Peer Room</h5>
                <p>Surround yourself with serious operators who are actively building media assets.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section id="apply" className={styles.section}>
        <div className={styles.container}>
          <BookingForm initialPackage="14-Day Build Sprint — PKR 180,000" />
        </div>
      </section>

      {/* FAQ Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <span className={styles.eyebrow}>CLARIFICATIONS</span>
            <h2>Frequently Asked Questions</h2>
          </div>

          <div className={styles.faqGrid}>
            <div className={styles.faqCard}>
              <h4 className={styles.faqQuestion}>Is accommodation included in the price?</h4>
              <p className={styles.faqAnswer}>
                Yes. All packages (7-Day, 14-Day, 30-Day) include accommodation, chef-prepared shared meals,
                24/7 coworking desk access, power backup, and fast 300 Mbps internet.
              </p>
            </div>

            <div className={styles.faqCard}>
              <h4 className={styles.faqQuestion}>What happens after I submit my application?</h4>
              <p className={styles.faqAnswer}>
                Our team reviews your current build, bottleneck, and outcome within 24–48 hours.
                If shortlisted, you will be invited to a brief alignment discussion on WhatsApp to confirm dates.
              </p>
            </div>

            <div className={styles.faqCard}>
              <h4 className={styles.faqQuestion}>Do I need to pay immediately?</h4>
              <p className={styles.faqAnswer}>
                No. Submitting an application is free. Do not send any money until you have been formally accepted
                and verified by Abrar Nadir&apos;s team. To filter unserious applicants, an optional PKR 2,500 screening deposit
                may be requested upon shortlisting, which is 100% credited against your residency balance.
              </p>
            </div>

            <div className={styles.faqCard}>
              <h4 className={styles.faqQuestion}>Can I extend my stay while at the Colony?</h4>
              <p className={styles.faqAnswer}>
                Extensions (3, 7, or 14 days) are offered exclusively to residents showing exceptional execution discipline,
                subject to room and desk capacity.
              </p>
            </div>

            <div className={styles.faqCard}>
              <h4 className={styles.faqQuestion}>Do you guarantee YouTube views or monetisation?</h4>
              <p className={styles.faqAnswer}>
                No. We guarantee an elite environment, rigorous expert reviews, and completed output.
                YouTube algorithms and viewer behavior depend on market response and long-term execution consistency.
              </p>
            </div>

            <div className={styles.faqCard}>
              <h4 className={styles.faqQuestion}>What if I live in Lahore—can I do day access?</h4>
              <p className={styles.faqAnswer}>
                The Colony is designed as an immersive residency where living together accelerates breakthroughs.
                However, Lahore residents may commute if accepted, but the core pricing and expert access allocation remain the same.
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
                <span className={styles.brandLogo}>CONTENT COLONY</span>
              </div>
              <p style={{ fontSize: "0.85rem", color: "var(--mid)" }}>
                Co-Live · Co-Work · Johar Town, Lahore, Pakistan
              </p>
            </div>

            <div style={{ display: "flex", gap: "24px", fontSize: "0.85rem" }}>
              <Link href="/" style={{ color: "var(--soft)", textDecoration: "none" }}>
                Abrar Nadir Home
              </Link>
              <Link href="/academy/ytempirebuilder" style={{ color: "var(--soft)", textDecoration: "none" }}>
                YT Empire Builders
              </Link>
              <a href="#apply" style={{ color: "var(--white)", textDecoration: "none", fontWeight: 700 }}>
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
