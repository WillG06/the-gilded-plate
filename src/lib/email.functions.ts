/**
 * Client-safe enquiry submission helper.
 * The site currently uses a front-end-only flow, so this logs the submission
 * and returns a success response instead of relying on server-only TanStack
 * middleware that breaks in the browser bundle.
 */
export async function sendEnquiry(data: { subject: string; fields: Record<string, string> }) {
  const html = `<h2>${data.subject}</h2><ul>${Object.entries(data.fields)
    .map(([k, v]) => `<li><strong>${k}:</strong> ${v}</li>`)
    .join("")}</ul>`;

  console.info("[enquiry] received:", data);
  console.info("[enquiry] html preview:", html);

  return { ok: true as const, delivered: false as const };
}
