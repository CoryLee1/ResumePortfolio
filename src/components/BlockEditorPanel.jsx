import { useState } from "react";
import { useI18n } from "../i18n/I18nProvider.jsx";
import { postRewrite } from "../lib/api.js";
import {
  contentPreview,
  contentToEditText,
  editTextToContent,
} from "../lib/contentEdit.js";

export default function BlockEditorPanel({
  data,
  setData,
  setPreset,
  btn,
  btnA,
  labelStyle,
  inputStyle,
}) {
  const { t, locale } = useI18n();
  const [active, setActive] = useState(null);
  const [draft, setDraft] = useState("");
  const [instruction, setInstruction] = useState("");
  const [loading, setLoading] = useState(null);
  const [msg, setMsg] = useState("");

  const updateItem = (si, ii, content) => {
    setData((p) => {
      const sections = [...p.sections];
      const items = [...sections[si].items];
      items[ii] = { ...items[ii], content };
      sections[si] = { ...sections[si], items };
      return { ...p, sections };
    });
    setPreset(null);
  };

  const moveItem = (si, dir) => {
    setData((p) => {
      const sections = [...p.sections];
      const items = [...sections[si].items];
      const j = active?.ii;
      if (j == null) return p;
      const next = j + dir;
      if (next < 0 || next >= items.length) return p;
      [items[j], items[next]] = [items[next], items[j]];
      sections[si] = { ...sections[si], items };
      return { ...p, sections };
    });
    setActive((a) => (a ? { ...a, ii: a.ii + dir } : a));
    setPreset(null);
  };

  const startEdit = (si, ii) => {
    const content = data.sections[si].items[ii].content;
    setActive({ si, ii });
    setDraft(contentToEditText(content));
    setInstruction("");
    setMsg("");
  };

  const saveEdit = () => {
    if (!active) return;
    const orig = data.sections[active.si].items[active.ii].content;
    updateItem(active.si, active.ii, editTextToContent(draft, orig));
    setMsg(t("rewriteOk"));
    setActive(null);
  };

  const aiRewrite = async () => {
    if (!active) return;
    const content = data.sections[active.si].items[active.ii].content;
    setLoading("rewrite");
    setMsg("");
    try {
      const res = await postRewrite({ content, instruction, locale });
      updateItem(active.si, active.ii, res.content);
      setDraft(contentToEditText(res.content));
      setMsg(t("rewriteOk"));
    } catch (e) {
      setMsg(e.message);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div style={{ marginBottom: 14, paddingBottom: 12, borderBottom: "1px solid #d6d8dc" }}>
      <span style={labelStyle}>{t("blocks")}</span>
      <div style={{ maxHeight: 160, overflowY: "auto", marginBottom: 8 }}>
        {data.sections.map((sec, si) =>
          sec.items.map((item, ii) => (
            <div
              key={`${sec.id}-${item.id}`}
              style={{
                marginBottom: 4,
                padding: "4px 6px",
                background: active?.si === si && active?.ii === ii ? "#e0e2e6" : "#fff",
                border: "1px solid #ddd",
              }}
            >
              <div style={{ fontSize: 6, color: "#aaa", letterSpacing: "0.12em" }}>
                {sec.title}
              </div>
              <div style={{ fontSize: 7, color: "#444", marginBottom: 4, lineHeight: 1.35 }}>
                {contentPreview(item.content)}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                <button
                  type="button"
                  style={{ ...btn, padding: "3px 6px", fontSize: 6.5 }}
                  onClick={() => startEdit(si, ii)}
                >
                  {t("edit")}
                </button>
                {active?.si === si && active?.ii === ii && (
                  <>
                    <button
                      type="button"
                      style={{ ...btn, padding: "3px 6px", fontSize: 6.5 }}
                      onClick={() => moveItem(si, -1)}
                    >
                      {t("moveUp")}
                    </button>
                    <button
                      type="button"
                      style={{ ...btn, padding: "3px 6px", fontSize: 6.5 }}
                      onClick={() => moveItem(si, 1)}
                    >
                      {t("moveDown")}
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {active && (
        <div style={{ marginTop: 8 }}>
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            style={{ ...inputStyle, minHeight: 120, fontSize: 7, marginBottom: 6 }}
          />
          <input
            type="text"
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
            placeholder={t("rewriteHint")}
            style={{ ...inputStyle, minHeight: 28, marginBottom: 6 }}
          />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
            <button type="button" onClick={saveEdit} style={{ ...btnA, padding: "5px 8px", fontSize: 7 }}>
              {t("save")}
            </button>
            <button
              type="button"
              onClick={aiRewrite}
              disabled={loading === "rewrite"}
              style={{ ...btn, padding: "5px 8px", fontSize: 7 }}
            >
              {loading === "rewrite" ? "…" : t("aiRewrite")}
            </button>
            <button type="button" onClick={() => setActive(null)} style={{ ...btn, padding: "5px 8px", fontSize: 7 }}>
              {t("cancel")}
            </button>
          </div>
        </div>
      )}
      {msg && <p style={{ fontSize: 7, color: "#555", marginTop: 6 }}>{msg}</p>}
    </div>
  );
}
