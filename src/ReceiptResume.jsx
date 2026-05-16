import { useState, useEffect } from "react";

const mono = "'Courier New', Courier, 'Lucida Console', monospace";

function useReceiptClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(t);
  }, []);
  return now;
}

function pad2(n) {
  return String(n).padStart(2, "0");
}

function Dash({ margin = "14px 0" }) {
  return (
    <div
      aria-hidden
      style={{
        fontFamily: mono,
        fontSize: 9,
        color: "#1a1a1a",
        letterSpacing: 0,
        lineHeight: 1,
        overflow: "hidden",
        whiteSpace: "nowrap",
        opacity: 0.55,
        margin,
      }}
    >
      {"-".repeat(42)}
    </div>
  );
}

function Stars({ margin = "14px 0 10px" }) {
  return (
    <div
      aria-hidden
      style={{
        fontFamily: mono,
        fontSize: 8,
        textAlign: "center",
        letterSpacing: "0.18em",
        margin,
        opacity: 0.45,
      }}
    >
      {"*".repeat(26)}
    </div>
  );
}

function Barcode() {
  const w = [2, 1, 3, 1, 2, 4, 1, 3, 2, 2, 1, 4, 2, 1, 3, 2, 1, 2, 3, 1, 4, 1, 2];
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: 1,
        height: 32,
        alignItems: "flex-end",
        marginTop: 14,
        opacity: 0.88,
      }}
    >
      {w.map((width, i) => (
        <div key={i} style={{ width, height: "100%", background: "#0a0a0a", flexShrink: 0 }} />
      ))}
    </div>
  );
}

function Grain() {
  const src =
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.45'/%3E%3C/svg%3E\")";
  return (
    <div
      aria-hidden
      style={{
        pointerEvents: "none",
        position: "absolute",
        inset: 0,
        opacity: 0.055,
        mixBlendMode: "multiply",
        backgroundImage: src,
        backgroundSize: "140px 140px",
      }}
    />
  );
}

function SecTitle({ children }) {
  return (
    <p
      style={{
        fontFamily: mono,
        fontSize: 8,
        fontWeight: 700,
        letterSpacing: "0.32em",
        marginTop: 20,
        marginBottom: 12,
        opacity: 0.48,
        textTransform: "uppercase",
      }}
    >
      {children}
    </p>
  );
}

function NumLine({ n, children }) {
  return (
    <p
      style={{
        fontFamily: mono,
        fontSize: 10,
        lineHeight: 1.52,
        color: "#141414",
        marginBottom: 9,
        paddingRight: 2,
      }}
    >
      <span style={{ opacity: 0.38, display: "inline-block", width: 26 }}>
        {String(n).padStart(2, "0")}
      </span>
      <span>{children}</span>
    </p>
  );
}

function MetaRow({ left, right }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        gap: 12,
        fontFamily: mono,
        fontSize: 10,
        color: "#111",
        letterSpacing: "0.04em",
        marginTop: 12,
        opacity: 0.82,
      }}
    >
      <span>{left}</span>
      <span style={{ fontVariantNumeric: "tabular-nums" }}>{right}</span>
    </div>
  );
}

function Row({ label, value, href }) {
  const valStyle = {
    fontFamily: mono,
    fontSize: 10,
    color: "#111",
    textAlign: "right",
    flex: 1,
    wordBreak: "break-word",
    lineHeight: 1.42,
  };
  const linkProps =
    href && /^https?:\/\//i.test(href)
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: 12,
        marginBottom: 7,
      }}
    >
      <span
        style={{
          fontFamily: mono,
          fontSize: 9,
          fontWeight: 700,
          letterSpacing: "0.14em",
          color: "#222",
          flexShrink: 0,
          paddingTop: 1,
          opacity: 0.55,
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
      {href ? (
        <a href={href} {...linkProps} style={{ ...valStyle, color: "#0a0a0a", textDecoration: "underline", textUnderlineOffset: 2 }}>
          {value}
        </a>
      ) : (
        <span style={valStyle}>{value}</span>
      )}
    </div>
  );
}

function Callout({ children }) {
  return (
    <div style={{ margin: "16px 0" }}>
      <Dash margin="0 0 10px" />
      <p
        style={{
          fontFamily: mono,
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.22em",
          textAlign: "center",
          lineHeight: 1.65,
          color: "#0a0a0a",
          padding: "0 4px",
        }}
      >
        {children}
      </p>
      <Dash margin="10px 0 0" />
    </div>
  );
}

export default function ReceiptResume({ data, withHttps }) {
  const now = useReceiptClock();
  const m = data.meta;
  const profileItem = data.sections.find((s) => s.id === "profile")?.items?.[0]?.content;
  const profile = profileItem?.type === "text" ? profileItem.text : "";

  const eduTop = data.sections.find((s) => s.id === "education")?.items?.[0]?.content;
  const eduLine =
    eduTop?.type === "edu" ? `${eduTop.school} · ${eduTop.program}` : "";

  const webShort = withHttps(m.contact.web).replace(/^https?:\/\//i, "").replace(/\/$/, "");

  const dateStr = `${pad2(now.getMonth() + 1)}/${pad2(now.getDate())}/${now.getFullYear()}`;
  const timeStr = now.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const projItems = data.sections.find((s) => s.id === "projects")?.items ?? [];
  const practiceLines = projItems.slice(0, 6).map((it, idx) => {
    const c = it.content;
    if (c?.type !== "proj") return null;
    const line = `${c.name} — ${c.sub}`.replace(/\s+/g, " ").trim().slice(0, 72);
    return { idx: idx + 1, line };
  }).filter(Boolean);

  const skillRows =
    data.sections.find((s) => s.id === "skills")?.items?.map((it) => it.content).filter((c) => c?.type === "kv") ??
    [];
  const stackLines = skillRows.slice(0, 5).map((c, i) => ({
    idx: i + 1,
    line: `${c.k}: ${c.v}`.replace(/\s+/g, " ").trim().slice(0, 76),
  }));

  const signals = projItems
    .map((it) => {
      const c = it.content;
      if (c?.type !== "proj") return null;
      const hit =
        c.bullets?.find((b) => /★|SIGGRAPH|Best|MUSE|award|NeurIPS|CVPR/i.test(b)) ??
        c.bullets?.[0] ??
        c.sub;
      return `${c.name}: ${hit}`.replace(/\s+/g, " ").trim().slice(0, 78);
    })
    .filter(Boolean)
    .slice(0, 5);

  const receiptAscii = [
    " ┌────────────────────────────┐ ",
    " │  YIHUA LI · CREATIVE LAB   │ ",
    " │ AI × REAL-TIME × INTERFACE │ ",
    " └────────────────────────────┘ ",
  ].join("\n");

  return (
    <div
      className="mobile-receipt-root"
      style={{
        minHeight: "100vh",
        background: "#070707",
        padding: "28px 14px calc(28px + env(safe-area-inset-bottom, 0px))",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      <article
        style={{
          position: "relative",
          maxWidth: 336,
          margin: "0 auto",
          background: "#fafaf8",
          color: "#0a0a0a",
          padding: "26px 18px 30px",
          boxShadow: "0 12px 40px rgba(0,0,0,0.55), 0 1px 0 rgba(255,255,255,0.06) inset",
          clipPath: `polygon(
            0% 10px, 4% 2px, 8% 9px, 12% 1px, 16% 8px, 20% 2px, 24% 10px, 28% 1px, 32% 9px, 36% 3px,
            40% 10px, 44% 0%, 48% 8px, 52% 2px, 56% 10px, 60% 1px, 64% 9px, 68% 3px, 72% 10px, 76% 0%,
            80% 8px, 84% 2px, 88% 9px, 92% 3px, 96% 10px, 100% 4px,
            100% 100%, 0% 100%
          )`,
        }}
      >
        <Grain />

        <header style={{ textAlign: "center", position: "relative", zIndex: 1, paddingTop: 4 }}>
          <div style={{ fontSize: 13, opacity: 0.22, marginBottom: 4 }} aria-hidden>
            ◈
          </div>
          <h1
            style={{
              fontFamily: mono,
              fontSize: 14,
              fontWeight: 700,
              fontStyle: "italic",
              letterSpacing: "0.2em",
              lineHeight: 1.35,
              textTransform: "uppercase",
            }}
          >
            {m.name}
          </h1>
          <p
            style={{
              fontFamily: mono,
              fontSize: 8,
              fontWeight: 600,
              letterSpacing: "0.26em",
              marginTop: 10,
              lineHeight: 1.75,
              opacity: 0.52,
              textTransform: "uppercase",
            }}
          >
            EXPLORATORY SYSTEMS / INTERFACE / VISUAL
            <br />
            {m.alias.toUpperCase()} · BROOKLYN · SHANGHAI
          </p>
          <Barcode />
          <p style={{ fontFamily: mono, fontSize: 8, opacity: 0.38, marginTop: 10, letterSpacing: "0.14em" }}>
            REF · {m.alias.toUpperCase().replace(/\s/g, "")}-CV-01
          </p>
        </header>

        <div style={{ position: "relative", zIndex: 1 }}>
          <MetaRow left={dateStr} right={timeStr} />
        </div>

        <Dash />

        <div style={{ position: "relative", zIndex: 1 }}>
          <Callout>
            OPEN TO
            <br />
            COLLABS / ROLES / R+D
          </Callout>
        </div>

        <SecTitle>01 · WHO</SecTitle>
        <div style={{ position: "relative", zIndex: 1 }}>
          <p style={{ fontFamily: mono, fontSize: 10, lineHeight: 1.58, color: "#161616" }}>
            {profile.slice(0, 240)}
            {profile.length > 240 ? "…" : ""}
          </p>
          <div style={{ marginTop: 14 }}>
            <Row label="ROLE" value="AI creative PM · artist-engineer" />
            <Row label="EDU" value={(eduLine || "NYU ITP · Donghua BFA").slice(0, 64)} />
            <Row label="NOW" value="REDnote PM · Echuu platform" />
            <Row label="SIGNAL" value="SIGGRAPH '25 Best Art Paper" />
          </div>
        </div>

        <Dash margin="18px 0" />

        <SecTitle>02 · PRACTICE</SecTitle>
        <div style={{ position: "relative", zIndex: 1 }}>
          <p style={{ fontFamily: mono, fontSize: 8, opacity: 0.42, letterSpacing: "0.2em", marginBottom: 10 }}>
            PRODUCT / INSTALLATION / RESEARCH
          </p>
          {practiceLines.length > 0 ? (
            practiceLines.map(({ idx, line }) => (
              <NumLine key={idx} n={idx}>
                {line}
              </NumLine>
            ))
          ) : (
            <NumLine n={1}>Creative AI systems & real-time graphics</NumLine>
          )}
        </div>

        <Dash margin="18px 0" />

        <SecTitle>03 · STACK</SecTitle>
        <div style={{ position: "relative", zIndex: 1 }}>
          {stackLines.map(({ idx, line }) => (
            <NumLine key={idx} n={idx}>
              {line}
            </NumLine>
          ))}
        </div>

        <Dash margin="18px 0" />

        <SecTitle>04 · PROOF</SecTitle>
        <div style={{ position: "relative", zIndex: 1 }}>
          <p style={{ fontFamily: mono, fontSize: 8, opacity: 0.42, letterSpacing: "0.2em", marginBottom: 10 }}>
            AWARDS · EXHIBITION · PAPER
          </p>
          {signals.map((s, i) => (
            <NumLine key={i} n={i + 1}>
              {s}
            </NumLine>
          ))}
        </div>

        <Dash margin="18px 0" />

        <SecTitle>05 · REACH</SecTitle>
        <div style={{ position: "relative", zIndex: 1 }}>
          <NumLine n={1}>
            Email ·{" "}
            <a href={`mailto:${m.contact.email}`} style={{ color: "#0a0a0a" }}>
              {m.contact.email}
            </a>
          </NumLine>
          <NumLine n={2}>
            Site ·{" "}
            <a href={withHttps(m.contact.web)} target="_blank" rel="noopener noreferrer" style={{ color: "#0a0a0a" }}>
              {webShort}
            </a>
          </NumLine>
          <NumLine n={3}>
            X ·{" "}
            <a href={m.contact.twitter} target="_blank" rel="noopener noreferrer" style={{ color: "#0a0a0a" }}>
              @cory958014884
            </a>
          </NumLine>
          <NumLine n={4}>
            IG ·{" "}
            <a href={m.contact.instagram} target="_blank" rel="noopener noreferrer" style={{ color: "#0a0a0a" }}>
              @cory_leeeee_
            </a>
          </NumLine>
        </div>

        <Stars margin="22px 0 12px" />

        <pre
          style={{
            fontFamily: mono,
            fontSize: 9,
            lineHeight: 1.35,
            textAlign: "center",
            margin: "0 auto",
            color: "#111",
            opacity: 0.72,
            position: "relative",
            zIndex: 1,
            letterSpacing: "0.02em",
          }}
        >
          {receiptAscii}
        </pre>

        <Stars margin="12px 0 18px" />

        <footer
          style={{
            position: "relative",
            zIndex: 1,
            textAlign: "center",
            fontFamily: mono,
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: "0.18em",
            lineHeight: 1.75,
            color: "#111",
          }}
        >
          THANK YOU FOR VIEWING
          <br />
          <span style={{ fontWeight: 500, letterSpacing: "0.12em", opacity: 0.55 }}>
            完整简历（桌面布局）：
            <a href="./index.html" style={{ color: "inherit", textDecoration: "underline", marginLeft: 6 }}>
              /index.html
            </a>
          </span>
        </footer>
      </article>
    </div>
  );
}
