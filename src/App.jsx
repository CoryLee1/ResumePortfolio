import { useState, useEffect } from "react";

function withHttps(url) {
  if (!url || typeof url !== "string") return "";
  const u = url.trim();
  if (/^https?:\/\//i.test(u)) return u;
  return `https://${u}`;
}

const linkStyle = {
  color: "#2a5cab",
  textDecoration: "none",
  borderBottom: "0.5px solid #aac",
};

const headerLinkStyle = {
  color: "#aab8d9",
  textDecoration: "none",
  borderBottom: "0.5px solid #555",
};

/* ───────────── DATA ───────────── */
const DATA = {
  meta: {
    name: "YIHUA LI",
    alias: "CORY",
    contact: {
      phone: "+1 301 979 5478",
      email: "cory958014884@gmail.com",
      emailAlt: "yl11194@nyu.edu",
      web: "https://coryleeart.com/",
      scholar: "https://scholar.google.com/citations?user=PIibA_wAAAAJ",
      twitter: "https://twitter.com/cory958014884",
      instagram: "https://www.instagram.com/cory_leeeee_/",
      loc: "Brooklyn, NY / Shanghai"
    }
  },
  sections: [
    {
      id: "profile", title: "PROFILE", visible: true,
      items: [{
        id: "s1", visible: true,
        content: {
          type: "text",
          text: "Cross-disciplinary creative technologist building at the intersection of AI, real-time 3D graphics, and human expression. Creator of award-winning AI systems exhibited at SIGGRAPH, NeurIPS, CVPR, and ARTECHOUSE NYC. SIGGRAPH 2025 Best Art Paper (11% acceptance). Currently shipping AI products at Xiaohongshu (500M+ MAU) while developing Echuu — the world's first real-time 3D AI VTuber creation platform."
        }
      }]
    },
    {
      id: "education", title: "EDUCATION", visible: true,
      items: [
        { id: "e1", visible: true, content: { type: "edu", school: "New York University", program: "MPS, Interactive Telecommunications Program (ITP)", date: "2023.09 – 2025.05", loc: "Brooklyn, NY", details: ["GPA 4.0/4.0 — Research: AI Application Systems, Real-time Generative Media", "Thesis: Echuu — AI VTuber Creation Platform", "NYU Tisch School of the Arts Graduate Scholarship"] } },
        { id: "e2", visible: true, content: { type: "edu", school: "Donghua University", program: "BFA, Product Design", date: "2019 – 2023", loc: "Shanghai", details: ["Rank 3/57 · GPA 4.03/5.0 · Outstanding Graduate", "National Scholarship (2020–2022)", "Advisor: Prof. Jihong Yu"] } }
      ]
    },
    {
      id: "work", title: "EXPERIENCE", visible: true,
      items: [
        { id: "w1", visible: true, content: { type: "work", co: "Xiaohongshu (REDnote)", role: "Product Manager", date: "2025.08 – Present", loc: "Shanghai", bullets: ["Led 0→1 development of Tabii, AI-powered visual bookmark Chrome extension with multimodal vision-language captioning (Qwen-VL) and vector similarity matching", "Full product lifecycle: concept → requirement → compliance → Chrome Web Store launch → Juguang promotion strategy", "Built frontend UI/interaction/animation + AI prototypes with Alibaba Cloud AnalyticDB vector search, tiered degradation", "Organic growth: 200+ community, 4,000+ likes, 40,000+ views — zero paid promotion"], links: [{ label: "Tabii · Chrome Web Store", url: "https://chromewebstore.google.com/detail/ldlifbcdlbonphobedkmignnjmfjdemk" }] } },
        { id: "w2", visible: true, content: { type: "work", co: "Duolingo", role: "Brand Design Consultant", date: "2024.04", loc: "Remote", bullets: ["VTuber IP character and livestreaming strategy for Brand Design Team"] } },
        { id: "w3", visible: true, content: { type: "work", co: "Xue Zhiqian — MV: INFINITE", role: "Motion Graphics Designer", date: "2023.01", loc: "Shanghai", bullets: ["CG animation + AI frame interpolation for major Chinese artist", "1,167,000+ views · 6,897 likes on YouTube"], links: [{ label: "Music video · INFINITE (YouTube)", url: "https://youtu.be/1FjXpFVZCZg" }] } },
        { id: "w4", visible: true, content: { type: "work", co: "Mirror World / rct.ai", role: "Design Intern → Director", date: "2022.05 – 08", loc: "Beijing", bullets: ["3D modeling, CG promo for NFT game Matrix", "Solo 30-sec promo video in 20 days — 2,000+ views on ENJINSTARTER", "\"Unstable Brain\" AI NPC API demo"], links: [{ label: "mirrorworld.fun", url: "https://mirrorworld.fun/" }, { label: "Promo clip (X)", url: "https://twitter.com/joinmirrorworld/status/1612285639604727809?s=20" }] } }
      ]
    },
    {
      id: "projects", title: "PROJECTS", visible: true,
      items: [
        { id: "p1", visible: true, content: { type: "proj", name: "Echuu", sub: "AI VTuber Creation Platform — Real-time 3D", date: "2025 –", url: "https://www.echuu.ai/", links: [{ label: "Official website · Anngel", url: "https://www.anngel.live/" }, { label: "Echuu · X (Twitter)", url: "https://x.com/Echuu_AIVTUBING" }], bullets: ["World's first platform: dream characters → AI VTubers → monetized live streams", "R3F + WebSocket + HLS/WebRTC · ACP framework (Agency, Embodiment, Temporality)", "CLS: 5 psycholinguistic cognitive modes for character performance", "Target: July 2026 demo · SIGGRAPH Asia 2026"] } },
        { id: "p2", visible: true, content: { type: "proj", name: "PoeSpin", sub: "Human-AI Dance→Poetry · ML Installation + CGI + Paper", date: "2024 – 2025", url: "https://coryleeart.com/Poespin-Wherever-your-body-reach-there-is-a-poetry", bullets: ["Pole dance → poetry via multimodal ML + NLP + CGI (C4D, Blender, UE5, TouchDesigner)", "★ SIGGRAPH 2025 Best Art Paper — 4.7/5.0, 1/16, 11% acceptance", "MUSE Gold · 10+ exhibitions: ARTECHOUSE NYC, Deji Museum (w/ Beeple), NeurIPS, CVPR, Chinese CHI"], links: [{ label: "SIGGRAPH 2025 · DOI", url: "https://doi.org/10.1145/3736781" }, { label: "Reviewer score supplement", url: "https://drive.google.com/file/d/1IfRNTqcIQ1hm9Zp_4yz-htIb4-XJUiEr/view?usp=sharing" }] } },
        { id: "p3", visible: true, content: { type: "proj", name: "IRL to URL", sub: "AI-Native Game — Real Subway Social Spaces", date: "2024", url: "https://coryleeart.com/IRL-URL", bullets: ["Solo full-stack: Node.js + Gemini API + WebRTC + Three.js", "LA A+D Museum AI Award · Future Tense Award · Athens Digital Art Festival"] } },
        { id: "p4", visible: true, content: { type: "proj", name: "Blibug", sub: "AI VTuber on Bilibili Danmaku · Unity + NLP", date: "2022 – 2023", url: "https://doi.org/10.1145/3591196.3596618", links: [{ label: "Video (YouTube)", url: "https://youtu.be/-6tBllXne40" }], bullets: ["First author — ACM CC'23 · 4 citations"] } }
      ]
    },
    {
      id: "publications", title: "PUBLICATIONS", visible: true,
      items: [
        { id: "pub1", visible: true, content: { type: "pub", title: "PoeSpin: A Human-AI Dance to Poetry System for Movement-Based Verse Generation", venue: "PACM-CGIT 8(3) · SIGGRAPH 2025 / Vancouver · doi:10.1145/3736781", note: "★ Best Art Paper · 4.7/5.0 · 11% acceptance · 1 citation", authors: "Yihua Li, H. Chen, Y. Li, Y. Xin — 1st author", href: "https://doi.org/10.1145/3736781", links: [{ label: "Supplementary PDF", url: "https://drive.google.com/file/d/1fdQRLEWMN054HsIXzhXU3l3uv263SVu_/view?usp=sharing" }] } },
        { id: "pub2", visible: true, content: { type: "pub", title: "Blibug: AI Vtuber Based on Bilibili Danmuku Interaction", venue: "ACM Creativity & Cognition (CC'23) / Online · pp.387–390", note: "13 citations", authors: "Yihua Li, Y. Sun, Y. Xu, J. Yu — 1st author", href: "https://doi.org/10.1145/3591196.3596618", links: [{ label: "Video", url: "https://youtu.be/-6tBllXne40" }] } },
        { id: "pub3", visible: true, content: { type: "pub", title: "Explore the Future Earth with Wander 2.0: AI Chatbot Driven By Knowledge-Base Story Generation", venue: "CHI 2023 Extended Abstracts / Hamburg", note: "27 citations", authors: "Y. Sun, Y. Xu, C. Cheng, Yihua Li, C. Lee, A. Asadipour — co-author" } },
        { id: "pub4", visible: true, content: { type: "pub", title: "Travel with Wander in the Metaverse: An AI Chatbot to Visit the Future Earth", venue: "IEEE MMSP 2022 / Online", note: "24 citations", authors: "Y. Sun, Y. Xu, C. Cheng, Yihua Li, CH Lee, A. Asadipour — co-author" } },
        { id: "pub5", visible: true, content: { type: "pub", title: "Wander [001]", venue: "SIGGRAPH Asia 2022 Art Gallery", note: "", authors: "Y. Sun, CH Lee, C. Cheng, A. Asadipour, Y. Xu, Yihua Li — co-author" } }
      ]
    },
    {
      id: "exhibitions", title: "EXHIBITIONS", visible: true,
      items: [
        { id: "ex1", visible: true, content: { type: "ln", l: "SIGGRAPH 2025 Art Gallery", r: "Vancouver 2025" } },
        { id: "ex2", visible: true, content: { type: "ln", l: "Digital Design Days × Prompt Magazine", r: "2025" } },
        { id: "ex3", visible: true, content: { type: "ln", l: "CVPR 2025 AI Art Gallery", r: "Nashville 2025" } },
        { id: "ex4", visible: true, content: { type: "ln", l: "Athens Digital Art Festival: Simulacra", r: "Athens 2024" } },
        { id: "ex5", visible: true, content: { type: "ln", l: "NYC ARTECHOUSE: Submerge", r: "New York 2024" } },
        { id: "ex6", visible: true, content: { type: "ln", l: "Nanjing Deji Museum: DIVERGE (group w/ Beeple)", r: "Nanjing 2024" } },
        { id: "ex7", visible: true, content: { type: "ln", l: "NeurIPS 2024 Creative AI Track", r: "Vancouver 2024" } },
        { id: "ex8", visible: true, content: { type: "ln", l: "Chinese CHI 2024 Art Gallery", r: "Shenzhen 2024" } },
        { id: "ex9", visible: true, content: { type: "ln", l: "Aspace Gallery NYC", r: "New York 2024" } },
        { id: "ex10", visible: true, content: { type: "ln", l: "LA A+D Museum", r: "Los Angeles 2024" } },
        { id: "ex11", visible: true, content: { type: "ln", l: "NYU ITP Spring Show", r: "New York 2024" } },
        { id: "ex12", visible: true, content: { type: "ln", l: "Asia Digital Art Award FUKUOKA", r: "Fukuoka 2022" } },
        { id: "ex13", visible: true, content: { type: "ln", l: "Tongji Design Week", r: "Shanghai 2021" } }
      ]
    },
    {
      id: "awards", title: "AWARDS", visible: true,
      items: [
        { id: "a1", visible: true, content: { type: "ln", l: "SIGGRAPH Best Art Paper — 1/16, 11%", r: "2025" } },
        { id: "a2", visible: true, content: { type: "ln", l: "DIA (Design Intelligence Award) Excellence", r: "2025" } },
        { id: "a3", visible: true, content: { type: "ln", l: "Art Laguna Prize — Finalist", r: "2025" } },
        { id: "a4", visible: true, content: { type: "ln", l: "FUTURE TENSE 3rd Edition — Shortlist", r: "2025" } },
        { id: "a5", visible: true, content: { type: "ln", l: "MUSE Design Award — Gold (AI Category)", r: "2024" } },
        { id: "a6", visible: true, content: { type: "ln", l: "LA A+D Museum — Generative AI Award", r: "2024" } },
        { id: "a7", visible: true, content: { type: "ln", l: "NYU TSOA Graduate Scholarship", r: "2023–25" } },
        { id: "a8", visible: true, content: { type: "ln", l: "Asia Digital Art FUKUOKA — Moving Image Finalist", r: "2022", url: "https://youtu.be/0B55EBBri_0" } },
        { id: "a9", visible: true, content: { type: "ln", l: "National Scholarship — China Ministry of Education", r: "2020–22" } }
      ]
    },
    {
      id: "talks", title: "INVITED TALKS", visible: true,
      items: [
        { id: "t1", visible: true, content: { type: "ln", l: "ZhenFund NY — AI Founder/Investor Closed-Door Event", r: "inv. Monica Xie" } },
        { id: "t2", visible: true, content: { type: "ln", l: "ASU Mix Center — Immersive Experience Design", r: "inv. Prof. Weidi Zhang" } }
      ]
    },
    {
      id: "press", title: "PRESS", visible: true,
      items: [
        { id: "pr1", visible: true, content: { type: "ln", l: "SIGGRAPH 2025 Interview: Dancing with Algorithm", r: "" } },
        { id: "pr2", visible: true, content: { type: "ln", l: "Prompt Magazine × Digital Design Days", r: "" } },
        { id: "pr3", visible: true, content: { type: "ln", l: "UAAD — On AI, Movement, Future of Digital Expression", r: "", url: "https://www.uaad.art/post/in-conversation-cory-yihua-li-on-ai-movement-and-the-future-of-digital-expression" } },
        { id: "pr4", visible: true, content: { type: "ln", l: "NYC ARTECHOUSE Interview", r: "" } },
        { id: "pr5", visible: true, content: { type: "ln", l: "MUSE Design Award — Official Interview", r: "", url: "https://muse.world/interview-with-yihua-li-from-vtubing-to-cgi-a-multi-faceted-media-artist/" } },
        { id: "pr6", visible: true, content: { type: "ln", l: "Globe — Interviews 60: Digital Artist", r: "", url: "https://www.youtube.com/watch?v=uj9Ak73--Pk" } },
        { id: "pr7", visible: true, content: { type: "ln", l: "CanvasRebel · VoyageLA · Boldjourney", r: "" } }
      ]
    },
    {
      id: "skills", title: "SKILLS", visible: true,
      items: [
        { id: "sk1", visible: true, content: { type: "kv", k: "ML / AI", v: "Python, multimodal ML, NLP, real-time AI, LLM integration" } },
        { id: "sk2", visible: true, content: { type: "kv", k: "FULL-STACK", v: "Next.js, React, R3F, Node.js, WebRTC, WebSocket, HLS" } },
        { id: "sk3", visible: true, content: { type: "kv", k: "3D / CREATIVE", v: "Blender, C4D (Octane), UE5, Unity, TouchDesigner, p5.js" } },
        { id: "sk4", visible: true, content: { type: "kv", k: "DESIGN", v: "Figma, Lottie, Rive, Adobe Suite, Product Prototyping" } },
        { id: "sk5", visible: true, content: { type: "kv", k: "LANGUAGE", v: "Native Chinese · Fluent English (IELTS 7.0)" } }
      ]
    },
    {
      id: "references", title: "REFERENCES", visible: true,
      items: [
        { id: "r1", visible: true, content: { type: "kv", k: "Daniel Shiffman", v: "YouTube 1.75M, The Coding Train" } },
        { id: "r2", visible: true, content: { type: "kv", k: "Shawn Van Every", v: "Chair, NYU ITP" } },
        { id: "r3", visible: true, content: { type: "kv", k: "Luba Elliot", v: "Curator, CVPR AI Art" } },
        { id: "r4", visible: true, content: { type: "kv", k: "Allison Parrish", v: "Electronic Poetry Artist, Mentor" } },
        { id: "r5", visible: true, content: { type: "kv", k: "John Henry Thompson", v: "Inventor of Lingo, Advisor" } },
        { id: "r6", visible: true, content: { type: "kv", k: "Heather Dewey-Hagborg", v: "DNA Digital Artist, Professor" } },
        { id: "r7", visible: true, content: { type: "kv", k: "Weidi Zhang", v: "Asst. Prof., ASU" } },
        { id: "r8", visible: true, content: { type: "kv", k: "Alan Yingtao Tian", v: "SAKANA AI (ex-Google DeepMind)" } },
        { id: "r9", visible: true, content: { type: "kv", k: "James Kuczinscky", v: "Brand Director, Duolingo" } },
        { id: "r10", visible: true, content: { type: "kv", k: "Yuqian Sun (CheeseTalk)", v: "PhD, Royal College of Art · Research Artist, Midjourney Storytelling Lab · fakecheese.me" } },
        { id: "r11", visible: true, content: { type: "kv", k: "00 Zhang (Aio0o0o0)", v: "Artist · MArch Bartlett UCL · Zabludowicz Collection · 00zhang.com" } }
      ]
    }
  ]
};

const PRESETS = {
  full:      { label: "ALL",      secs: null },
  investor:  { label: "EB-1A",    secs: ["profile","projects","awards","publications","exhibitions","press","education","talks","work","references"] },
  curator:   { label: "CURATOR",  secs: ["profile","exhibitions","projects","publications","awards","press","education","talks","references"] },
  recruiter: { label: "RECRUITER",secs: ["profile","work","projects","skills","education","awards","publications","references"] },
};

function useCountdowns() {
  const [now, setNow] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(t); }, []);
  const born       = new Date("2001-01-31");
  const ageYears   = Math.floor((now - born) / 31557600000);
  const echuuDays  = Math.max(0, Math.ceil((new Date("2026-08-01") - now) / 86400000));
  const retireDays = Math.max(0, Math.ceil((new Date("2031-01-31") - now) / 86400000));
  return { age: ageYears, echuuDays, retireDays };
}

/* ─────────────────────────────────────────
   LOGO MAP  (grayscale via CSS filter on render)
   ───────────────────────────────────────── */
const LOGOS = {
  "New York University":      "https://logo.clearbit.com/nyu.edu",
  "Donghua University":       "https://www.dhu.edu.cn/images/logo-bak.png",
  "Xiaohongshu (REDnote)":    "https://logo.clearbit.com/xiaohongshu.com",
  "Duolingo":                 "https://logo.clearbit.com/duolingo.com",
  "Mirror World / rct.ai":    "https://logo.clearbit.com/rct.ai",
};

/* ─────────────────────────────────────────
   RENDER ITEMS
   ───────────────────────────────────────── */
function RenderContent({ c, visible, editing }) {
  if (!visible && !editing) return null;
  const f = "'IBM Plex Mono', monospace";
  const o = visible ? 1 : 0.22;

  /* typography atoms */
  const T  = ({ children, s }) => (
    <span style={{ fontFamily:f, fontSize:9.5, fontWeight:600, color:"#0a0a0a", letterSpacing:"0.01em", ...s }}>{children}</span>
  );
  const Sub = ({ children, s }) => (
    <span style={{ fontFamily:f, fontSize:8.5, fontWeight:400, color:"#666", letterSpacing:"0.01em", ...s }}>{children}</span>
  );
  const Meta = ({ children, s }) => (
    <span style={{ fontFamily:f, fontSize:7.5, color:"#999", letterSpacing:"0.04em", whiteSpace:"nowrap", ...s }}>{children}</span>
  );
  /* bullet row: › flush-left, text indented */
  const Bullet = ({ children }) => (
    <div style={{ display:"flex", gap:6, marginTop:2 }}>
      <span style={{ fontFamily:f, fontSize:9, color:"#bbb", lineHeight:1.55, flexShrink:0, marginTop:"0.5px" }}>›</span>
      <span style={{ fontFamily:f, fontSize:8.5, color:"#444", lineHeight:1.58 }}>{children}</span>
    </div>
  );
  /* divider row below name+date */
  const EntryHead = ({ left, right, logo }) => (
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
                  borderBottom:"1px solid #e8e5df", paddingBottom:3, marginBottom:3 }}>
      <div style={{ display:"flex", alignItems:"center", gap:7, flexWrap:"wrap", flex:1 }}>
        {logo && (
          <img src={logo} alt="" height="13"
               style={{ filter:"grayscale(1) contrast(0.7) opacity(0.6)",
                        objectFit:"contain", flexShrink:0, maxWidth:36 }}
               onError={e=>{ e.target.style.display="none"; }}/>
        )}
        <div style={{ display:"flex", alignItems:"baseline", flexWrap:"wrap", gap:5 }}>{left}</div>
      </div>
      {right && <Meta s={{ marginLeft:8 }}>{right}</Meta>}
    </div>
  );

  switch (c.type) {

    case "text":
      return (
        <div style={{ opacity:o, fontFamily:f, fontSize:8.5, color:"#444", lineHeight:1.65,
                      marginBottom:6, textAlign:"justify" }}>
          {c.text}
        </div>
      );

    case "edu":
      return (
        <div style={{ opacity:o, marginBottom:9 }}>
          <EntryHead
            logo={LOGOS[c.school]}
            left={<><T>{c.school}</T><Sub s={{ color:"#777" }}> · {c.program}</Sub></>}
            right={`${c.date} · ${c.loc}`}
          />
          {c.details.map((d,i) => <Bullet key={i}>{d}</Bullet>)}
        </div>
      );

    case "work":
      return (
        <div style={{ opacity:o, marginBottom:9 }}>
          <EntryHead
            logo={LOGOS[c.co]}
            left={<><T>{c.co}</T><Sub s={{ color:"#666" }}> [{c.role}]</Sub></>}
            right={`${c.date} · ${c.loc}`}
          />
          {Array.isArray(c.links) && c.links.length > 0 && (
            <div style={{ fontFamily:f, fontSize:7.5, marginBottom:4, display:"flex", flexWrap:"wrap", gap:"6px 12px" }}>
              {c.links.map((L, i) => (
                <a key={i} href={L.url} target="_blank" rel="noopener noreferrer" style={{ ...linkStyle }}>
                  {L.label}
                </a>
              ))}
            </div>
          )}
          {c.bullets.map((b,i) => <Bullet key={i}>{b}</Bullet>)}
        </div>
      );

    case "proj":
      return (
        <div style={{ opacity:o, marginBottom:9 }}>
          <EntryHead
            left={<><T>{c.name}</T><Sub s={{ fontSize:8, color:"#888" }}> ({c.sub})</Sub></>}
            right={c.date}
          />
          {(c.url || (Array.isArray(c.links) && c.links.length > 0)) && (
            <div style={{ fontFamily:f, fontSize:7.5, marginBottom:4, letterSpacing:"0.03em", display:"flex", flexWrap:"wrap", gap:"6px 12px", alignItems:"baseline" }}>
              {c.url ? (
                <a href={withHttps(c.url)} target="_blank" rel="noopener noreferrer" style={{ ...linkStyle }}>
                  {withHttps(c.url).replace(/^https?:\/\//i, "")}
                </a>
              ) : null}
              {Array.isArray(c.links) && c.links.map((L, i) => (
                <a key={i} href={L.url} target="_blank" rel="noopener noreferrer" style={{ ...linkStyle }}>
                  {L.label}
                </a>
              ))}
            </div>
          )}
          {c.bullets.map((b,i) => <Bullet key={i}>{b}</Bullet>)}
        </div>
      );

    case "pub":
      return (
        <div style={{ opacity:o, marginBottom:8, display:"flex", gap:9 }}>
          <div style={{ width:2, background:"#1a1a1a", flexShrink:0, borderRadius:1 }}/>
          <div>
            <div style={{ fontFamily:f, fontSize:9, fontWeight:600, color:"#0a0a0a",
                          letterSpacing:"0.005em", lineHeight:1.45 }}>
              {c.href ? (
                <a href={c.href} target="_blank" rel="noopener noreferrer"
                   style={{ color:"#0a0a0a", textDecoration:"none", borderBottom:"0.5px solid #888" }}>
                  {c.title}
                </a>
              ) : c.title}
            </div>
            <div style={{ fontFamily:f, fontSize:7.5, color:"#777", marginTop:2, lineHeight:1.5 }}>
              {c.venue} <span style={{ color:"#ccc" }}>·</span> {c.authors}
            </div>
            {Array.isArray(c.links) && c.links.length > 0 && (
              <div style={{ fontFamily:f, fontSize:7.5, marginTop:4, display:"flex", flexWrap:"wrap", gap:"6px 12px" }}>
                {c.links.map((L, i) => (
                  <a key={i} href={L.url} target="_blank" rel="noopener noreferrer" style={{ ...linkStyle }}>
                    {L.label}
                  </a>
                ))}
              </div>
            )}
            {c.note && (
              <div style={{ fontFamily:f, fontSize:7.5, fontWeight:600, color:"#1a1a1a",
                            background:"#e8eaed", display:"inline-block", padding:"1px 5px",
                            marginTop:3, letterSpacing:"0.02em" }}>
                {c.note}
              </div>
            )}
          </div>
        </div>
      );

    case "ln":
      return (
        <div style={{ opacity:o, display:"flex", justifyContent:"space-between",
                      alignItems:"baseline", marginBottom:3, gap:8 }}>
          <span style={{ fontFamily:f, fontSize:8.5, color:"#333" }}>
            {c.url ? (
              <a href={c.url} target="_blank" rel="noopener noreferrer"
                 style={{ color:"#333", textDecoration:"none", borderBottom:"0.5px solid #aaa" }}>
                {c.l}
              </a>
            ) : c.l}
          </span>
          {c.r && <Meta s={{ color:"#888" }}>{c.r}</Meta>}
        </div>
      );

    case "kv":
      return (
        <div style={{ opacity:o, display:"flex", gap:12, alignItems:"baseline", marginBottom:3 }}>
          <span style={{ fontFamily:f, fontSize:7.5, fontWeight:600, color:"#0a0a0a",
                         letterSpacing:"0.07em", minWidth:98, flexShrink:0 }}>
            {c.url ? (
              <a href={c.url} target="_blank" rel="noopener noreferrer"
                 style={{ color:"#0a0a0a", textDecoration:"none",
                          borderBottom:"0.5px solid #aaa", paddingBottom:1 }}>
                {c.k}
              </a>
            ) : c.k}
          </span>
          <span style={{ fontFamily:f, fontSize:8.5, color:"#555" }}>{c.v}</span>
        </div>
      );

    default: return null;
  }
}

function Grip() {
  return (
    <svg width="7" height="12" viewBox="0 0 7 12"
         style={{ opacity:0.25, cursor:"grab", flexShrink:0 }}>
      {[1,4.5,8,11.5].map((y,i) =>
        <g key={i}>
          <circle cx="2"   cy={y} r=".85" fill="currentColor"/>
          <circle cx="5.5" cy={y} r=".85" fill="currentColor"/>
        </g>
      )}
    </svg>
  );
}

/* ─────────────────────────────────────────
   APP
   ───────────────────────────────────────── */
export default function App() {
  const [data,    setData]    = useState(DATA);
  const [editing, setEditing] = useState(true);
  const [preset,  setPreset]  = useState("full");
  const [dragS,   setDragS]   = useState(null);
  const [overS,   setOverS]   = useState(null);
  const [dragI,   setDragI]   = useState(null);
  const [overI,   setOverI]   = useState(null);
  const { age, echuuDays, retireDays } = useCountdowns();
  const f = "'IBM Plex Mono', monospace";

  /* preset */
  const applyPreset = (k) => {
    setPreset(k);
    if (k === "full") {
      setData(p => ({ ...p, sections: p.sections.map(s => ({
        ...s, visible:true, items:s.items.map(i=>({...i,visible:true}))
      }))}));
    } else {
      const order = PRESETS[k].secs;
      setData(p => {
        const sorted = [...p.sections].sort((a,b) => {
          const ia=order.indexOf(a.id), ib=order.indexOf(b.id);
          return (ia===-1?999:ia)-(ib===-1?999:ib);
        });
        return { ...p, sections: sorted.map(s=>({
          ...s, visible:order.includes(s.id),
          items:s.items.map(i=>({...i,visible:order.includes(s.id)}))
        }))};
      });
    }
  };

  const tog  = (i)     => { setData(p=>({...p,sections:p.sections.map((s,j)=>j===i?{...s,visible:!s.visible}:s)})); setPreset(null); };
  const togI = (si,ii) => { setData(p=>({...p,sections:p.sections.map((s,j)=>j===si?{...s,items:s.items.map((t,k)=>k===ii?{...t,visible:!t.visible}:t)}:s)})); setPreset(null); };
  const mv   = (i,d)   => { setData(p=>{ const a=[...p.sections],t=i+d; if(t<0||t>=a.length)return p; [a[i],a[t]]=[a[t],a[i]]; return{...p,sections:a}; }); setPreset(null); };

  const onSD  = (e,i)     => { setDragS(i); e.dataTransfer.effectAllowed="move"; };
  const onSO  = (e,i)     => { e.preventDefault(); if(dragS!==null)setOverS(i); };
  const onSP  = (e,i)     => { e.preventDefault(); if(dragS!==null&&dragS!==i){ setData(p=>{const a=[...p.sections];const[m]=a.splice(dragS,1);a.splice(i,0,m);return{...p,sections:a};}); setPreset(null); } setDragS(null); setOverS(null); };
  const onID  = (e,si,ii) => { e.stopPropagation(); setDragI({si,ii}); e.dataTransfer.effectAllowed="move"; };
  const onIO  = (e,si,ii) => { e.preventDefault(); e.stopPropagation(); if(dragI?.si===si)setOverI({si,ii}); };
  const onIPr = (e,si,ii) => { e.preventDefault(); e.stopPropagation(); if(dragI?.si===si&&dragI.ii!==ii){ setData(p=>{const ss=[...p.sections];const its=[...ss[si].items];const[m]=its.splice(dragI.ii,1);its.splice(ii,0,m);ss[si]={...ss[si],items:its};return{...p,sections:ss};}); setPreset(null); } setDragI(null); setOverI(null); };

  const handlePrint = () => { setEditing(false); setTimeout(()=>{ window.print(); setTimeout(()=>setEditing(true),400); },250); };

  /* button styles */
  const btn  = { border:"1px solid #bbb", background:"transparent", padding:"4px 9px", fontSize:7.5, fontWeight:500, letterSpacing:"0.1em", textTransform:"uppercase", cursor:"pointer", borderRadius:0, fontFamily:f, color:"#555", transition:"all 0.12s" };
  const btnA = { ...btn, background:"#0a0a0a", color:"#f4f5f7", borderColor:"#0a0a0a" };

  /* counters data */
  const counters = [
    { label:"AGE",              val:age,                        unit:"years old"     },
    { label:"ECHUU ↗ 2026.08", val:echuuDays.toLocaleString(), unit:"days remaining" },
    { label:"RETIREMENT",       val:retireDays.toLocaleString(),unit:"days remaining" },
  ];

  return (
    <>
      {/* ── GLOBAL STYLES ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        html, body { background:#c6c8cc; font-family:'IBM Plex Mono',monospace; -webkit-font-smoothing:antialiased; }

        @page { size:A4; margin:10mm 12mm; }
        @media print {
          html, body { background:#fff !important; }
          .no-print  { display:none !important; }
          .cv-page   { margin:0 !important; box-shadow:none !important; background:#fff !important;
                       width:100% !important; max-width:100% !important; min-height:auto !important;
                       border:none !important; }
          .cv-body   { padding:0 !important; }
        }

        ::-webkit-scrollbar { width:3px; }
        ::-webkit-scrollbar-thumb { background:#b8b5af; }
        .drop-target { border-top:2px solid #0a0a0a !important; }
        .sidebar-btn:hover { background:#0a0a0a !important; color:#f4f5f7 !important; }
      `}</style>

      {/* ── SIDEBAR EDITOR ── */}
      {editing && (
        <aside className="no-print" style={{
          position:"fixed", top:0, left:0, width:210, height:"100vh",
          background:"#f0f2f4", borderRight:"1px solid #d6d8dc",
          padding:"16px 12px", overflowY:"auto", zIndex:100, fontFamily:f
        }}>
          {/* title */}
          <div style={{ fontSize:7, fontWeight:600, letterSpacing:"0.28em", color:"#aaa", marginBottom:14 }}>
            CV ── CONTROL PANEL
          </div>

          {/* audience filter */}
          <div style={{ fontSize:6.5, fontWeight:600, letterSpacing:"0.18em", color:"#bbb", marginBottom:6 }}>
            AUDIENCE
          </div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:3, marginBottom:16 }}>
            {Object.entries(PRESETS).map(([k,v]) => (
              <button key={k} className="sidebar-btn" onClick={()=>applyPreset(k)}
                      style={preset===k ? btnA : btn}>
                {v.label}
              </button>
            ))}
          </div>

          {/* sections list */}
          <div style={{ fontSize:6.5, fontWeight:600, letterSpacing:"0.18em", color:"#bbb", marginBottom:6 }}>
            SECTIONS
          </div>
          {data.sections.map((s,si) => (
            <div key={s.id}
              draggable
              onDragStart={e=>onSD(e,si)} onDragOver={e=>onSO(e,si)}
              onDrop={e=>onSP(e,si)} onDragEnd={()=>{ setDragS(null); setOverS(null); }}
              className={overS===si&&dragS!==null?"drop-target":""}
              style={{ display:"flex", alignItems:"center", gap:4, padding:"3px 2px",
                       opacity:dragS===si?0.2:1, borderTop:"1px solid transparent" }}>
              <Grip/>
              <input type="checkbox" checked={s.visible} onChange={()=>tog(si)}
                     style={{ accentColor:"#0a0a0a", width:9, height:9 }}/>
              <span style={{ fontSize:7.5, color:s.visible?"#333":"#bbb", flex:1, letterSpacing:"0.04em" }}>
                {s.title}
              </span>
              <span onClick={()=>mv(si,-1)} style={{ cursor:"pointer", fontSize:9, color:"#bbb", padding:"0 2px", lineHeight:1 }}>↑</span>
              <span onClick={()=>mv(si, 1)} style={{ cursor:"pointer", fontSize:9, color:"#bbb", padding:"0 2px", lineHeight:1 }}>↓</span>
            </div>
          ))}

          {/* actions */}
          <div style={{ borderTop:"1px solid #d6d8dc", marginTop:14, paddingTop:12, display:"flex", flexDirection:"column", gap:4 }}>
            <button onClick={handlePrint}         style={{ ...btnA, width:"100%", padding:"7px", fontSize:7.5 }}>↓ EXPORT A4 PDF</button>
            <button onClick={()=>setEditing(false)} style={{ ...btn,  width:"100%", padding:"7px", fontSize:7.5 }}>PREVIEW MODE</button>
          </div>
        </aside>
      )}

      {/* re-enter editor button */}
      {!editing && (
        <button className="no-print" onClick={()=>setEditing(true)}
                style={{ ...btnA, position:"fixed", bottom:16, right:16, zIndex:200,
                          padding:"6px 14px", fontSize:7.5, boxShadow:"0 2px 10px rgba(0,0,0,0.18)" }}>
          ENTER EDITOR
        </button>
      )}

      {/* ── CV PAGE ── */}
      <div className="cv-page" style={{
        width:794, maxWidth:"100%",
        margin: editing ? "0 auto 0 228px" : "0 auto",
        background:"#f7f8fa",
        minHeight:"100vh",
        boxShadow:"0 0 60px rgba(0,0,0,0.08)",
        transition:"margin 0.2s",
        border:"1px solid #1a1a1a"
      }}>
        <div className="cv-body" style={{ padding:"32px 38px 38px" }}>

          {/* ── HEADER: BLACK BLOCK ── */}
          <div style={{
            background:"#0a0a0a",
            padding:"20px 24px",
            display:"flex",
            justifyContent:"space-between",
            alignItems:"stretch",
            marginBottom:0,
            /* subtle top accent stripe */
            borderTop:"3px solid #2a2a2a"
          }}>
            {/* left: name + ID */}
            <div style={{ display:"flex", flexDirection:"column", justifyContent:"center" }}>
              <div style={{ fontFamily:f, fontSize:27, fontWeight:300, letterSpacing:"0.32em",
                            color:"#f4f5f7", lineHeight:1 }}>
                {data.meta.name}
              </div>
              <div style={{ fontFamily:f, fontSize:7.5, fontWeight:500, color:"#555",
                            letterSpacing:"0.22em", marginTop:9 }}>
                ID · {data.meta.alias} · SPEC-01
              </div>
            </div>

            {/* right: contact — clean label grid */}
            <div style={{
              borderLeft:"1px solid #252525",
              paddingLeft:20,
              display:"flex",
              flexDirection:"column",
              justifyContent:"center",
              gap:3
            }}>
              {[
                ["TEL", data.meta.contact.phone, null],
                ["EML", data.meta.contact.email, `mailto:${data.meta.contact.email}`],
                ["ALT", data.meta.contact.emailAlt, `mailto:${data.meta.contact.emailAlt}`],
                ["WEB", withHttps(data.meta.contact.web).replace(/^https?:\/\//i, "").replace(/\/$/, ""), withHttps(data.meta.contact.web)],
                ["SCH", "Google Scholar", withHttps(data.meta.contact.scholar)],
                ["X", "Twitter / X", data.meta.contact.twitter],
                ["IG", "Instagram", data.meta.contact.instagram],
                ["LOC", data.meta.contact.loc, null],
              ].map(([lbl, val, href]) => (
                <div key={lbl} style={{ display:"flex", gap:8, alignItems:"baseline" }}>
                  <span style={{ fontFamily:f, fontSize:6.5, fontWeight:600,
                                 color:"#444", letterSpacing:"0.12em", minWidth:24 }}>
                    {lbl}
                  </span>
                  {href ? (
                    <a
                      href={href}
                      {...(href.startsWith("mailto") ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                      style={{ fontFamily:f, fontSize:7.5, letterSpacing:"0.03em", ...headerLinkStyle }}
                    >
                      {val}
                    </a>
                  ) : (
                    <span style={{ fontFamily:f, fontSize:7.5, color:"#999", letterSpacing:"0.03em" }}>
                      {val}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ── SPEC BAR ── */}
          <div style={{
            background:"#161616",
            padding:"5px 24px",
            display:"flex",
            justifyContent:"space-between",
            alignItems:"center",
            marginBottom:8
          }}>
            <div style={{ fontFamily:f, fontSize:7, letterSpacing:"0.16em", color:"#555",
                          display:"flex", gap:0, alignItems:"center" }}>
              {["AI CREATIVE TECHNOLOGIST","PRODUCT DESIGNER","MEDIA ARTIST"].map((t,i,arr) => (
                <span key={t}>
                  {t}
                  {i < arr.length-1 &&
                    <span style={{ margin:"0 10px", color:"#333" }}>·</span>}
                </span>
              ))}
            </div>
            <div style={{ fontFamily:f, fontSize:6.5, color:"#3a3a3a", letterSpacing:"0.06em",
                           display:"flex", gap:12, alignItems:"center" }}>
              <span>GS: <b style={{ color:"#666" }}>65</b> cited</span>
              <span>h-index <b style={{ color:"#666" }}>3</b></span>
              <span style={{ color:"#2a2a2a" }}>{new Date().getFullYear()}.{String(new Date().getMonth()+1).padStart(2,"0")} · ARCHIVE</span>
            </div>
          </div>

          {/* ── METRICS PANEL ── */}
          <div style={{
            border:"1px solid #1a1a1a",
            background:"#eff0f2",
            display:"grid",
            gridTemplateColumns:"1fr 1fr 1fr 1.2fr",
            marginBottom:14,
            overflow:"hidden"
          }}>
            {/* header row */}
            {["AGE", "ECHUU ↗ 2026.08", "RETIREMENT", "ENDGAME"].map((h,i,arr) => (
              <div key={h} style={{
                fontFamily:f, fontSize:6.5, fontWeight:600, letterSpacing:"0.14em", color:"#888",
                padding:"5px 12px 4px",
                borderRight: i<arr.length-1 ? "1px solid #d4d6d9" : "none",
                borderBottom:"1px solid #d4d6d9",
                background:"#e6e8eb"
              }}>
                {h}
              </div>
            ))}
            {/* value row */}
            {counters.map((c,i) => (
              <div key={i} style={{
                padding:"6px 12px 8px",
                borderRight:"1px solid #d4d6d9"
              }}>
                <div style={{ fontFamily:f, fontSize:19, fontWeight:300, color:"#0a0a0a",
                              lineHeight:1.15, letterSpacing:"-0.01em" }}>
                  {c.val}
                </div>
                <div style={{ fontFamily:f, fontSize:6.5, color:"#aaa", marginTop:1, letterSpacing:"0.03em" }}>
                  {c.unit}
                </div>
              </div>
            ))}
            <div style={{ padding:"6px 12px 8px", display:"flex", flexDirection:"column", justifyContent:"center" }}>
              <div style={{ fontFamily:f, fontSize:10.5, color:"#0a0a0a", lineHeight:1.3 }}>
                隐居深山老林
              </div>
              <div style={{ fontFamily:f, fontSize:7, color:"#aaa", marginTop:2, letterSpacing:"0.02em" }}>
                hermit_in_the_mountains.exe
              </div>
            </div>
          </div>

          {/* ── SECTIONS ── */}
          {data.sections.filter(s => s.visible || editing).map(section => {
            const si = data.sections.indexOf(section);
            if (!section.visible && !editing) return null;
            const vis = section.items.filter(it => it.visible || editing);
            if (!vis.length && !editing) return null;
            return (
              <div key={section.id} style={{ marginBottom:12, opacity:section.visible?1:0.2, transition:"opacity 0.15s" }}>
                {/* section header */}
                <div style={{
                  display:"flex", alignItems:"center", justifyContent:"space-between",
                  borderBottom:"1px solid #0a0a0a", paddingBottom:3, marginBottom:6
                }}>
                  <span style={{ fontFamily:f, fontSize:7.5, fontWeight:600,
                                 letterSpacing:"0.38em", color:"#0a0a0a" }}>
                    {section.title}
                  </span>
                  <span style={{ fontFamily:f, fontSize:6.5, color:"#bbb",
                                 fontWeight:500, letterSpacing:"0.06em" }}>
                    _{String(si+1).padStart(2,"0")}
                  </span>
                </div>

                {/* items */}
                {vis.map(item => {
                  const ii = section.items.indexOf(item);
                  return (
                    <div key={item.id}
                      draggable={editing && section.items.length > 1}
                      onDragStart={e=>editing&&onID(e,si,ii)}
                      onDragOver ={e=>editing&&onIO(e,si,ii)}
                      onDrop     ={e=>editing&&onIPr(e,si,ii)}
                      onDragEnd  ={()=>{ setDragI(null); setOverI(null); }}
                      className  ={overI?.si===si&&overI?.ii===ii?"drop-target":""}
                      style={{ display:"flex", alignItems:"flex-start", gap:3,
                               borderTop:"1px solid transparent" }}>
                      {editing && section.items.length > 1 && (
                        <div className="no-print"
                             style={{ display:"flex", alignItems:"center", gap:2,
                                      paddingTop:2, flexShrink:0 }}>
                          <Grip/>
                          <input type="checkbox" checked={item.visible}
                                 onChange={()=>togI(si,ii)}
                                 style={{ accentColor:"#0a0a0a", width:8, height:8 }}/>
                        </div>
                      )}
                      <div style={{ flex:1 }}>
                        <RenderContent c={item.content} visible={item.visible} editing={editing}/>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}

          {/* ── FOOTER ── */}
          <div style={{
            borderTop:"1.5px solid #0a0a0a", paddingTop:6, marginTop:18,
            display:"flex", justifyContent:"space-between", alignItems:"center"
          }}>
            <span style={{ fontFamily:f, fontSize:6.5, color:"#0a0a0a",
                           fontWeight:600, letterSpacing:"0.1em" }}>
              YIHUA LI (CORY) ── SPECIFICATION MATRIX · {new Date().getFullYear()}
            </span>
            <a
              href={withHttps(data.meta.contact.web)}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily:f, fontSize:6.5, color:"#0a0a0a",
                     letterSpacing:"0.06em", textDecoration:"underline" }}
            >
              {withHttps(data.meta.contact.web).replace(/^https?:\/\//i, "").replace(/\/$/, "")}
            </a>
          </div>

        </div>
      </div>
    </>
  );
}
