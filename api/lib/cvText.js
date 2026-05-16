export function cvDataToText(data) {
  const lines = [];
  lines.push(`NAME: ${data.meta?.name ?? ""} (${data.meta?.alias ?? ""})`);
  lines.push(`CONTACT: ${JSON.stringify(data.meta?.contact ?? {})}`);
  lines.push("");

  for (const sec of data.sections ?? []) {
    lines.push(`## SECTION: ${sec.id} | ${sec.title} | visible=${sec.visible}`);
    for (const item of sec.items ?? []) {
      lines.push(`  - item ${item.id} | visible=${item.visible}`);
      lines.push(`    ${JSON.stringify(item.content)}`);
    }
    lines.push("");
  }
  return lines.join("\n").slice(0, 28000);
}
