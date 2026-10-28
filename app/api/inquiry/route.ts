import { FORMS, FORM_SUBJECTS, formatSubmission, type FormKind } from "@/lib/forms";
import { SITE } from "@/lib/site";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: { kind?: string; values?: Record<string, unknown> };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  const kind = body.kind as FormKind;
  if (!kind || !(kind in FORMS) || typeof body.values !== "object" || body.values === null) {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  // Honeypot: real visitors never fill this hidden field.
  if (body.values.company) return Response.json({ ok: true });

  const values: Record<string, string> = {};
  for (const field of FORMS[kind]) {
    const raw = body.values[field.name];
    const value = typeof raw === "string" ? raw.trim().slice(0, 4000) : "";
    if (field.required && !value) {
      return Response.json({ error: `${field.label} is required` }, { status: 422 });
    }
    values[field.name] = value;
  }
  if (!EMAIL_RE.test(values.email)) {
    return Response.json({ error: "Please enter a valid email" }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Email delivery isn't configured; the client falls back to a prefilled mailto link.
    return Response.json({ error: "not_configured" }, { status: 503 });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.INQUIRY_FROM_EMAIL ?? `${SITE.name} <website@concoursgarage.com>`,
      to: [process.env.INQUIRY_TO_EMAIL ?? SITE.email],
      reply_to: values.email,
      subject: `${FORM_SUBJECTS[kind]} — ${values.name}`,
      text: formatSubmission(kind, values),
    }),
  });

  if (!res.ok) {
    console.error("Resend error", res.status, await res.text());
    return Response.json({ error: "not_configured" }, { status: 503 });
  }
  return Response.json({ ok: true });
}
