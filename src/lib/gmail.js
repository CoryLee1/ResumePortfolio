export function buildGmailComposeUrl({ to, subject, body }) {
  const params = new URLSearchParams();
  if (to) params.set("to", to);
  if (subject) params.set("su", subject);
  if (body) params.set("body", body);
  return `https://mail.google.com/mail/?view=cm&fs=1&${params.toString()}`;
}
