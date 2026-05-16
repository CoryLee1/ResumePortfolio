import { useEffect, useMemo, useState } from "react";
import {
  Linking,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { buildReceiptViewModel } from "./data";
import { styles } from "./styles";

const BAR_WIDTHS = [2, 1, 3, 1, 2, 4, 1, 3, 2, 2, 1, 4, 2, 1, 3, 2, 1, 2, 3, 1, 4, 1, 2];
const DASH = "-".repeat(42);
const STARS = "*".repeat(26);

function Dash() {
  return <Text style={styles.dash}>{DASH}</Text>;
}

function Stars() {
  return <Text style={styles.stars}>{STARS}</Text>;
}

function Barcode() {
  return (
    <View style={styles.barcode}>
      {BAR_WIDTHS.map((w, i) => (
        <View key={i} style={[styles.bar, { width: w, height: "100%" }]} />
      ))}
    </View>
  );
}

function SecTitle({ children }) {
  return <Text style={styles.secTitle}>{children}</Text>;
}

function MetaRow({ left, right }) {
  return (
    <View style={styles.metaRow}>
      <Text style={styles.metaText}>{left}</Text>
      <Text style={styles.metaText}>{right}</Text>
    </View>
  );
}

function Row({ label, value }) {
  return (
    <View style={styles.kvRow}>
      <Text style={styles.kvLabel}>{label}</Text>
      <Text style={styles.kvValue}>{value}</Text>
    </View>
  );
}

function NumLine({ n, children, onPress, href }) {
  const content =
    typeof children === "string" ? (
      <Text style={styles.numText}>{children}</Text>
    ) : (
      <View style={{ flex: 1 }}>{children}</View>
    );

  const inner = (
    <View style={styles.numLine}>
      <Text style={styles.numIdx}>{String(n).padStart(2, "0")}</Text>
      {content}
    </View>
  );

  if (href && onPress) {
    return (
      <Pressable onPress={onPress} accessibilityRole="link">
        {inner}
      </Pressable>
    );
  }
  return inner;
}

function Callout({ children }) {
  return (
    <View style={styles.calloutWrap}>
      <Dash />
      <Text style={styles.callout}>{children}</Text>
      <Dash />
    </View>
  );
}

function openUrl(url) {
  if (!url) return;
  Linking.openURL(url).catch(() => {});
}

export default function ReceiptScreen() {
  const insets = useSafeAreaInsets();
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(t);
  }, []);

  const vm = useMemo(() => buildReceiptViewModel(undefined, now), [now]);
  const m = vm.meta;

  return (
    <View style={[styles.root, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.paper}>
          <Text style={styles.headerMark}>◈</Text>
          <Text style={styles.title}>{m.name}</Text>
          <Text style={styles.subtitle}>
            EXPLORATORY SYSTEMS / INTERFACE / VISUAL{"\n"}
            {m.alias.toUpperCase()} · BROOKLYN · SHANGHAI
          </Text>
          <Barcode />
          <Text style={styles.ref}>REF · {vm.refId}</Text>

          <MetaRow left={vm.dateStr} right={vm.timeStr} />

          <Callout>OPEN TO{"\n"}COLLABS / ROLES / R+D</Callout>

          <SecTitle>01 · WHO</SecTitle>
          <Text style={styles.body}>{vm.profile}</Text>
          <View style={{ marginTop: 14 }}>
            <Row label="ROLE" value="AI creative PM · artist-engineer" />
            <Row label="EDU" value={vm.eduLine} />
            <Row label="NOW" value="REDnote PM · Echuu platform" />
            <Row label="SIGNAL" value="SIGGRAPH '25 Best Art Paper" />
          </View>

          <Dash />

          <SecTitle>02 · PRACTICE</SecTitle>
          <Text style={styles.secHint}>PRODUCT / INSTALLATION / RESEARCH</Text>
          {vm.practiceLines.length > 0 ? (
            vm.practiceLines.map(({ idx, line }) => (
              <NumLine key={idx} n={idx}>
                {line}
              </NumLine>
            ))
          ) : (
            <NumLine n={1}>Creative AI systems & real-time graphics</NumLine>
          )}

          <Dash />

          <SecTitle>03 · STACK</SecTitle>
          {vm.stackLines.map(({ idx, line }) => (
            <NumLine key={idx} n={idx}>
              {line}
            </NumLine>
          ))}

          <Dash />

          <SecTitle>04 · PROOF</SecTitle>
          <Text style={styles.secHint}>AWARDS · EXHIBITION · PAPER</Text>
          {vm.signals.map((s, i) => (
            <NumLine key={i} n={i + 1}>
              {s}
            </NumLine>
          ))}

          <Dash />

          <SecTitle>05 · REACH</SecTitle>
          {vm.contacts.map((c, i) => (
            <NumLine
              key={c.label}
              n={i + 1}
              href={c.url}
              onPress={() => openUrl(c.url)}
            >
              <Text style={styles.numText}>
                {c.label} ·{" "}
                <Text style={styles.link}>{c.value}</Text>
              </Text>
            </NumLine>
          ))}

          <Stars />

          {vm.asciiBlock.map((line, i) => (
            <Text key={i} style={styles.ascii}>
              {line}
            </Text>
          ))}

          <Stars />

          <Text style={styles.footer}>
            THANK YOU FOR VIEWING
            {"\n"}
            <Text style={styles.footerSub}>
              完整版 Web 简历：coryleeart.com
            </Text>
          </Text>
          <Pressable onPress={() => openUrl(m.contact.web)} style={{ marginTop: 8 }}>
            <Text style={[styles.footer, styles.link]}>{m.contact.web.replace(/^https?:\/\//i, "")}</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
