function uid(prefix) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

/** Merge parsed sections/items into existing CV data */
export function mergeParseIntoCv(data, parsed) {
  const sections = [...data.sections];
  const incoming = parsed?.sections ?? [];

  for (const ps of incoming) {
    const idx = sections.findIndex((s) => s.id === ps.id);
    const newItems = (ps.items ?? []).map((it) => ({
      id: it.id || uid("imp"),
      visible: it.visible !== false,
      content: it.content,
    }));

    if (idx === -1 && newItems.length) {
      sections.push({
        id: ps.id,
        title: ps.title || ps.id.toUpperCase(),
        visible: true,
        items: newItems,
      });
    } else if (idx >= 0 && newItems.length) {
      sections[idx] = {
        ...sections[idx],
        items: [...sections[idx].items, ...newItems],
      };
    }
  }

  let meta = { ...data.meta };
  if (parsed?.meta) {
    meta = {
      ...meta,
      ...parsed.meta,
      contact: { ...meta.contact, ...(parsed.meta.contact || {}) },
    };
  }

  return { ...data, meta, sections };
}
