"use client";
import { useState } from "react";
import Link from "next/link";
import { faqs, modules, outcomes, paths, plans, type PlanId } from "./content/site";
import { track } from "./Analytics";

const Arrow = () => <span aria-hidden="true">↗</span>;

export default function HomeExperience() {
  const [path, setPath] = useState(paths[0]);
  const [view, setView] = useState<"learning" | "execution">("learning");
  const [plan, setPlan] = useState<PlanId>("lifetime");
  return <main>
    <header className="nav shell"><Link href="/" className="brand"><span>YEB</span> Empire Builder</Link><nav aria-label="Main navigation"><a href="#roadmap">Roadmap</a><a href="#pricing">Pricing</a><Link className="button small" href="/checkout?plan=lifetime">Enter academy <Arrow/></Link></nav></header>

    <section className="hero shell">
      <div className="hero-copy">
        <p className="kicker">YT Empire Builder Academy · by Abrar Nadir</p>
        <h1>You are not looking for another course. <em>You are looking for a way forward.</em></h1>
        <p className="lede">A recorded-learning, implementation and support portal that helps ordinary people understand the YouTube business—and build a system around one honest path.</p>
        <div className="actions"><Link className="button" href="/checkout?plan=lifetime" onClick={()=>track("hero_cta_clicked")}>Enter YEB Academy <Arrow/></Link><a className="text-link" href="#lms">See the portal ↓</a></div>
        <p className="micro">Education and systems—not guaranteed income.</p>
      </div>
      <div className="route-map" aria-label="Academy journey">
        <div className="route-head"><span>Your route</span><b>01 / 07</b></div>
        {["Pressure","Choose a path","Learn the system","Launch","Monetize","Build a team","Operate"].map((item,i)=><div className={`route-node ${i===1?"active":""}`} key={item}><span>{String(i+1).padStart(2,"0")}</span><b>{item}</b><i>{i===1?"You are here":i===0?"Recognized":"Ahead"}</i></div>)}
      </div>
    </section>

    <section className="recognition shell section">
      <p className="kicker">The starting point</p><h2>You are tired of starting over.</h2>
      <div className="recognition-grid"><div className="statement"><p>Watching hours of free videos.</p><p>Collecting tools without a workflow.</p><p>Changing ideas every month.</p></div><blockquote>“The problem is not that you cannot learn. The problem is that nobody connected the journey for you.”</blockquote></div>
    </section>

    <section className="economy section"><div className="shell"><p className="kicker">The market, explained</p><h2>YouTube is more than a video platform.</h2><p className="section-intro">Attention moves through an existing creator economy. Tap the route to understand where value is created.</p>
      <div className="flow">{["Viewers","Content","Advertisers + buyers","Creators","Revenue paths"].map((x,i)=><button key={x} onClick={(e)=>{document.querySelectorAll(".flow button").forEach(n=>n.classList.remove("active"));e.currentTarget.classList.add("active")}} className={i===0?"active":""}><span>{i+1}</span>{x}</button>)}</div>
      <div className="claim"><strong>$100B+</strong><p>reported paid by YouTube to creators, artists and media companies over four years. Platform totals demonstrate market size—not individual results.</p><a href="https://blog.youtube/news-and-events/made-on-youtube-2025/" target="_blank" rel="noreferrer">YouTube, Sep 2025 <Arrow/></a></div>
    </div></section>

    <section className="section shell"><p className="kicker">Choose your starting path</p><h2>You do not have to follow someone else’s path.</h2>
      <div className="path-tabs" role="tablist">{paths.map(p=><button role="tab" aria-selected={path.id===p.id} key={p.id} onClick={()=>{setPath(p);track("path_selected",p.id)}}>{p.label}</button>)}</div>
      <div className="path-panel"><div><span>{path.eyebrow}</span><h3>{path.label}</h3><p>{path.text}</p></div><div><small>Recommended route</small><strong>{path.modules}</strong></div></div>
    </section>

    <section id="lms" className="section portal-wrap"><div className="shell"><p className="kicker">Inside the product</p><h2>See exactly what happens after you join.</h2>
      <div className="portal"><aside><div className="portal-logo">YEB<span>Academy</span></div>{["Today","Roadmap","Resources","Live sessions","Community"].map((x,i)=><button className={i===0?"active":""} key={x}>{x}</button>)}</aside><div className="dashboard">
        <div className="dash-top"><div><small>Welcome back</small><h3>Your next move is clear.</h3></div><div className="toggle"><button className={view==="learning"?"active":""} onClick={()=>setView("learning")}>Learning</button><button className={view==="execution"?"active":""} onClick={()=>setView("execution")}>Execution</button></div></div>
        <div className="course-card"><span>DAY 07 · MODULE 03</span><h4>{view==="learning"?"Find a Market Worth Entering":"Complete your niche evidence sheet"}</h4><p>{view==="learning"?"Lesson 2 of 6 · 18 minutes":"Today’s action · estimated 35 minutes"}</p><div className="progress"><i/></div><button className="button" onClick={()=>track("lms_preview_opened")}>{view==="learning"?"Continue learning":"Open assignment"} <Arrow/></button></div>
        <div className="dash-grid"><article><small>Required download</small><b>Niche Evidence Sheet</b><a href="#resources">View resource →</a></article><article><small>Next live session</small><b>Schedule shown in portal</b><span>Implementation Q&A</span></article><article><small>Milestones</small><b>2 of 12 complete</b><span>17% route progress</span></article></div>
      </div></div>
    </div></section>

    <section id="roadmap" className="section shell"><p className="kicker">30-day recorded roadmap</p><h2>From confusion to a working channel system.</h2><p className="section-intro">Open each stage to see the outcome and the resource attached to it.</p>
      <div className="modules">{modules.map((m,i)=><details key={m[0]} open={i===0} onToggle={(e)=>{if(e.currentTarget.open)track("module_expanded",m[0])}}><summary><span>{m[0]}</span><div><small>{m[1]}</small><b>{m[2]}</b></div><i>+</i></summary><div className="module-body"><p>{m[3]}</p><dl><div><dt>Included resource</dt><dd>{m[4]}</dd></div><div><dt>Estimated lesson time</dt><dd>{m[5]}</dd></div><div><dt>Practical assignment</dt><dd>Complete the stage worksheet and record your decision.</dd></div></dl></div></details>)}</div>
    </section>

    <section id="resources" className="section support"><div className="shell support-grid"><div><p className="kicker">Structure + people</p><h2>Recorded lessons when you need structure. Human support when you get stuck.</h2></div><div className="support-cards"><article><span>Weekly</span><h3>Live implementation sessions</h3><p>Questions, channel reviews, niche feedback, scripts, thumbnails, YouTube updates and AI workflow demonstrations.</p></article><article><span>90 days</span><h3>Implementation support</h3><p>Ask questions, share progress and learn from solved problems. Response times and support boundaries are published inside the portal.</p></article></div></div></section>

    <section className="section shell outcomes"><p className="kicker">The intended outcome</p><h2>Not more information. A guided operating system.</h2><div>{outcomes.map((o,i)=><p key={o}><span>{String(i+1).padStart(2,"0")}</span>{o}</p>)}</div></section>

    <section id="pricing" className="section pricing"><div className="shell"><p className="kicker">Transparent access</p><h2>Choose the access level that fits your situation.</h2><div className="price-tabs">{plans.map(p=><button key={p.id} aria-pressed={plan===p.id} onClick={()=>{setPlan(p.id);track("pricing_plan_selected",p.id)}}>{p.id==="installments"?"3 payments":p.id}</button>)}</div>
      <div className="price-card">{plans.filter(p=>p.id===plan).map(p=><div key={p.id}><div><span>{p.badge||"Flexible access"}</span><h3>{p.name}</h3><p className="price">{p.price}</p><small>{p.cadence}</small>{p.id==="lifetime"&&<p className="breakdown">≈ Rs 2,500/month · Rs 577/week · Rs 82/day across the first year only.</p>}</div><ul>{p.benefits.map(b=><li key={b}>✓ {b}</li>)}</ul><Link className="button" href={`/checkout?plan=${p.id}`}>{p.cta} <Arrow/></Link></div>)}</div>
      <p className="responsible"><strong>Choose responsibly.</strong> Do not use rent, food, medical, emergency or unaffordable borrowed money to enroll.</p>
    </div></section>

    <section className="section shell faq"><p className="kicker">Clear answers</p><h2>Questions before you choose.</h2>{faqs.map(([q,a])=><details key={q} onToggle={(e)=>{if(e.currentTarget.open)track("faq_opened",q)}}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</section>

    <section className="final"><div className="shell"><p className="kicker">Your next move</p><h2>Stop moving randomly.<br/>Start building with a roadmap.</h2><p>YEB Academy cannot perform the work for you. It can show you what work matters and what comes next.</p><div className="actions"><Link className="button dark" href="/checkout?plan=lifetime">Enter YEB Academy <Arrow/></Link><Link className="text-link dark-link" href="/support">Ask a question</Link></div></div></section>
    <footer className="shell"><div className="brand"><span>YEB</span> Empire Builder</div><p>Independent education for the YouTube business.</p><div><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/refund-policy">Refunds</Link><Link href="/disclaimer">Disclaimer</Link><Link href="/support">Support</Link></div><small>YEB Academy is not owned, sponsored or endorsed by YouTube or Google. Education, tools and support do not guarantee views, monetization, employment, clients or income.</small></footer>
    <Link className="mobile-cta" href="/checkout?plan=lifetime">Enter Academy <Arrow/></Link>
  </main>
}
