"use client";

import { useState, type FormEvent } from "react";
import { FORMS, FORM_SUBJECTS, formatSubmission, type FormKind } from "@/lib/forms";
import { SITE } from "@/lib/site";

type Status = { state: "idle" | "sending" | "sent" | "error"; message?: string };

type Props = {
  kind: FormKind;
  submitLabel: string;
  successMessage: string;
  defaults?: Record<string, string>;
};

export function InquiryForm({ kind, submitLabel, successMessage, defaults }: Props) {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const fields = FORMS[kind];

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const values = Object.fromEntries(
      Array.from(new FormData(form).entries()).map(([k, v]) => [k, String(v)]),
    );
    setStatus({ state: "sending" });

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, values }),
      });
      if (res.ok) {
        form.reset();
        setStatus({ state: "sent", message: successMessage });
        return;
      }
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (res.status !== 503) {
        setStatus({ state: "error", message: data.error ?? "Something went wrong. Please try again." });
        return;
      }
    } catch {
      // Network failure or static hosting without the API route: fall through to email.
    }

    const subject = `${FORM_SUBJECTS[kind]} — ${values.name ?? ""}`;
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      formatSubmission(kind, values),
    )}`;
    setStatus({
      state: "sent",
      message: `Your email app should open with your details filled in — just press send. If it doesn't, email us at ${SITE.email}.`,
    });
  }

  if (status.state === "sent") {
    return (
      <div className="form-success" role="status">
        <p>{status.message}</p>
        <button type="button" className="btn btn--ghost" onClick={() => setStatus({ state: "idle" })}>
          Send another
        </button>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate={false}>
      {fields.map((f) => {
        const id = `${kind}-${f.name}`;
        const common = {
          id,
          name: f.name,
          required: f.required,
          placeholder: f.placeholder,
          autoComplete: f.autoComplete,
          defaultValue: defaults?.[f.name],
        };
        return (
          <div key={f.name} className={`form__field${f.half ? " form__field--half" : ""}`}>
            <label htmlFor={id}>
              {f.label}
              {f.required ? <span aria-hidden="true"> *</span> : null}
            </label>
            {f.type === "textarea" ? (
              <textarea rows={4} {...common} />
            ) : f.type === "select" ? (
              <select {...common}>
                {f.options?.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            ) : (
              <input type={f.type ?? "text"} {...common} />
            )}
          </div>
        );
      })}
      <div className="form__hp" aria-hidden="true">
        <label htmlFor={`${kind}-company`}>Company</label>
        <input id={`${kind}-company`} name="company" tabIndex={-1} autoComplete="off" />
      </div>
      {status.state === "error" ? (
        <p className="form__error" role="alert">
          {status.message}
        </p>
      ) : null}
      <button type="submit" className="btn" disabled={status.state === "sending"}>
        {status.state === "sending" ? "Sending…" : submitLabel}
      </button>
    </form>
  );
}
