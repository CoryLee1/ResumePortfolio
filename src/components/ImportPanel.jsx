import { useRef, useState } from "react";
import { useI18n } from "../i18n/I18nProvider.jsx";
import { fileToBase64, postParse } from "../lib/api.js";
import { mergeParseIntoCv } from "../lib/mergeParseResult.js";

const ACCEPT = ".pdf,.docx,.png,.jpg,.jpeg,.webp";

export default function ImportPanel({ data, setData, setPreset, btn, btnA, labelStyle, inputStyle }) {
  const { t, locale } = useI18n();
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState("");
  const [err, setErr] = useState("");

  const onFile = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setErr("");
    setNote("");
    setLoading(true);
    try {
      const base64 = await fileToBase64(file);
      const res = await postParse({
        base64,
        fileName: file.name,
        mimeType: file.type,
        cvData: data,
        locale,
      });
      const merged = mergeParseIntoCv(data, res.parsed);
      setData(merged);
      setPreset(null);
      setNote((res.summary || t("parseOk")) + (res.provider ? ` · ${res.provider}` : ""));
    } catch (ex) {
      setErr(ex.message || t("parseErr"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginBottom: 14, paddingBottom: 12, borderBottom: "1px solid #d6d8dc" }}>
      <span style={labelStyle}>{t("import")}</span>
      <p style={{ fontSize: 6.5, color: "#999", marginBottom: 8, lineHeight: 1.45 }}>
        {t("importHint")}
        <br />
        {t("importFormats")}
      </p>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT}
        style={{ display: "none" }}
        onChange={onFile}
      />
      <button
        type="button"
        disabled={loading}
        onClick={() => inputRef.current?.click()}
        style={{ ...btnA, width: "100%", padding: "7px", fontSize: 7.5, marginBottom: 6 }}
      >
        {loading ? t("parsing") : t("upload")}
      </button>
      {note && (
        <p style={{ fontSize: 7, color: "#555", lineHeight: 1.45, whiteSpace: "pre-wrap" }}>{note}</p>
      )}
      {err && <p style={{ fontSize: 7, color: "#c42", marginTop: 4 }}>{err}</p>}
    </div>
  );
}
