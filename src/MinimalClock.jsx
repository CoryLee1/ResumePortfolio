import { useState, useEffect } from "react";

const BG = "#ebebeb";
const ACCENT = "#e31937";
const ff =
  "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

function pad2(n) {
  return String(n).padStart(2, "0");
}

export default function MinimalClock({ portfolioUrl, socialUrl }) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const hh = pad2(now.getHours());
  const mm = pad2(now.getMinutes());
  const label = `${hh}:${mm}`;

  const minutes = now.getMinutes() + now.getSeconds() / 60;
  const hours12 = (now.getHours() % 12) + minutes / 60;
  const minuteDeg = minutes * 6;
  const hourDeg = hours12 * 30;

  const link = {
    fontSize: 8,
    fontWeight: 600,
    letterSpacing: "0.16em",
    color: "#0a0a0a",
    textDecoration: "none",
    textTransform: "uppercase",
  };

  return (
    <div
      className="no-print"
      style={{
        fontFamily: ff,
        background: BG,
        border: "1px solid #cfcfcf",
        marginBottom: 14,
        overflow: "hidden",
        userSelect: "none",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 20px 6px",
          gap: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <span
            style={{
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: "0.28em",
              color: "#0a0a0a",
            }}
          >
            CV
          </span>
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.15 }}>
            <span
              style={{
                fontSize: 8,
                fontWeight: 600,
                letterSpacing: "0.2em",
                color: "#111",
                textTransform: "uppercase",
              }}
            >
              LIVE
            </span>
            <span style={{ fontSize: 7.5, fontWeight: 400, fontStyle: "italic", color: "#777" }}>
              LOCAL TIME
            </span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 9,
            fontWeight: 500,
            letterSpacing: "0.12em",
            color: "#0a0a0a",
            textTransform: "uppercase",
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: ACCENT,
              flexShrink: 0,
            }}
          />
          <span>Time</span>
          <span style={{ fontVariantNumeric: "tabular-nums", letterSpacing: "0.06em" }}>
            {label}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {portfolioUrl ? (
            <a href={portfolioUrl} target="_blank" rel="noopener noreferrer" style={link}>
              INFO
            </a>
          ) : (
            <span style={{ ...link, cursor: "default" }}>INFO</span>
          )}
          {socialUrl ? (
            <a href={socialUrl} target="_blank" rel="noopener noreferrer" style={link}>
              ABOUT
            </a>
          ) : (
            <span style={{ ...link, cursor: "default" }}>ABOUT</span>
          )}
        </div>
      </div>

      <div
        style={{
          position: "relative",
          height: 142,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 600,
            fontSize: "clamp(72px, 19vw, 132px)",
            letterSpacing: "-0.03em",
            lineHeight: 1,
            color: "rgba(255,255,255,0.55)",
            pointerEvents: "none",
          }}
        >
          {label}
        </div>

        <svg
          width="200"
          height="200"
          viewBox="-100 -100 200 200"
          style={{ position: "relative", zIndex: 1 }}
          aria-hidden
        >
          <g transform={`rotate(${hourDeg})`}>
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="-42"
              stroke="#0a0a0a"
              strokeWidth="2"
              strokeLinecap="square"
            />
          </g>
          <g transform={`rotate(${minuteDeg})`}>
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="-62"
              stroke="#0a0a0a"
              strokeWidth="1.35"
              strokeLinecap="square"
            />
          </g>
          <circle cx="0" cy="0" r="2.2" fill="#0a0a0a" />
        </svg>
      </div>

      <div style={{ padding: "0 12px 10px" }}>
        <div
          style={{
            height: 10,
            borderBottom: "1px solid #0a0a0a",
            backgroundImage:
              "repeating-linear-gradient(90deg, #0a0a0a 0, #0a0a0a 1px, transparent 1px, transparent 11px)",
            backgroundSize: "100% 7px",
            backgroundRepeat: "repeat-x",
            backgroundPosition: "top",
            opacity: 0.9,
          }}
        />
      </div>
    </div>
  );
}
