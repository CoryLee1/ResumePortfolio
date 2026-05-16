/**
 * Apply structured tailor plan onto CV state (pure, mirrors frontend).
 * @param {object} data
 * @param {object} plan
 */
export function applyTailorPlan(data, plan) {
  const sectionOrder = plan.sectionOrder ?? [];
  const hiddenSections = new Set(plan.hiddenSections ?? []);
  const hiddenItems = new Set(
    (plan.hiddenItems ?? []).map((h) => `${h.sectionId}:${h.itemId}`)
  );

  let sections = [...(data.sections ?? [])];

  if (sectionOrder.length) {
    sections.sort((a, b) => {
      const ia = sectionOrder.indexOf(a.id);
      const ib = sectionOrder.indexOf(b.id);
      return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
    });
  }

  sections = sections.map((s) => ({
    ...s,
    visible: !hiddenSections.has(s.id),
    items: (s.items ?? []).map((item) => {
      const key = `${s.id}:${item.id}`;
      let content = item.content;
      const rw = (plan.profileRewrites ?? []).find(
        (r) => r.sectionId === s.id && r.itemId === item.id && r.text
      );
      if (rw && content?.type === "text") {
        content = { ...content, text: rw.text };
      }
      return {
        ...item,
        visible: !hiddenItems.has(key),
        content,
      };
    }),
  }));

  return { ...data, sections };
}
