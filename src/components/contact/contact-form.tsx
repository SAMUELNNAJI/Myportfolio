"use client";

import { useId, useState, type FormEvent } from "react";
import { Icon } from "@/components/ui/icon";
import { contact, siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";

type Values = {
  name: string;
  email: string;
  subject: string;
  message: string;
  company: string;
};

type FieldName = "name" | "email" | "subject" | "message";
type Errors = Partial<Record<FieldName, string>>;

type FormState =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success"; message: string }
  | { kind: "unconfigured"; message: string }
  | { kind: "error"; message: string };

const initialValues: Values = {
  name: "",
  email: "",
  subject: "",
  message: "",
  company: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validateField(field: FieldName, values: Values): string | undefined {
  const value = values[field].trim();

  switch (field) {
    case "name":
      if (!value) return "Please add your name.";
      if (value.length < 2) return "That looks a little short — at least 2 characters.";
      if (value.length > 80) return "Please keep your name under 80 characters.";
      return;
    case "email":
      if (!value) return "Please add an email address so I can reply.";
      if (!emailPattern.test(value)) return "Please enter a valid email address.";
      if (value.length > 160) return "That email address is too long.";
      return;
    case "subject":
      if (!value) return "Please add a short subject.";
      if (value.length < 3) return "A few more characters would help.";
      if (value.length > 120) return "Please keep the subject under 120 characters.";
      return;
    case "message":
      if (!value) return "Please tell me a little about the project.";
      if (value.length < 20) return "A sentence or two, just so I can reply usefully.";
      if (value.length > 2000) return "Please keep the message under 2,000 characters.";
      return;
    default:
      return;
  }
}

function validateAll(values: Values): Errors {
  return (["name", "email", "subject", "message"] as const).reduce<Errors>(
    (acc, field) => {
      const error = validateField(field, values);
      if (error) acc[field] = error;
      return acc;
    },
    {},
  );
}

export function ContactForm() {
  const formId = useId();
  const [values, setValues] = useState<Values>(initialValues);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<FormState>({ kind: "idle" });
  const [attempted, setAttempted] = useState(false);

  const fieldId = (field: FieldName) => `${formId}-${field}`;
  const errorId = (field: FieldName) => `${formId}-${field}-error`;

  const isSubmitting = status.kind === "submitting";

  function updateField(field: keyof Values, value: string) {
    setValues((previous) => ({ ...previous, [field]: value }));
    if (status.kind !== "idle" && status.kind !== "submitting") {
      setStatus({ kind: "idle" });
    }
    if (field !== "company") {
      setErrors((previous) => {
        if (!attempted && !previous[field as FieldName]) return previous;
        const next = { ...previous };
        const error = validateField(field as FieldName, { ...values, [field]: value });
        if (error) next[field as FieldName] = error;
        else delete next[field as FieldName];
        return next;
      });
    }
  }

  function blurField(field: FieldName) {
    const error = validateField(field, values);
    setErrors((previous) => {
      const next = { ...previous };
      if (error) next[field] = error;
      else delete next[field];
      return next;
    });
  }

  const mailtoHref = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
    values.subject.trim() || "Project enquiry",
  )}&body=${encodeURIComponent(
    `${values.message.trim()}\n\n— ${values.name.trim()}${
      values.email.trim() ? ` (${values.email.trim()})` : ""
    }`,
  )}`;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAttempted(true);

    if (values.company) {
      // Honeypot: quietly stop bots without indicating why.
      setStatus({ kind: "success", message: "Thanks — your message was sent." });
      return;
    }

    const nextErrors = validateAll(values);
    setErrors(nextErrors);

    const firstInvalid = (["name", "email", "subject", "message"] as const).find(
      (field) => nextErrors[field],
    );

    if (firstInvalid) {
      setStatus({ kind: "idle" });
      document.getElementById(fieldId(firstInvalid))?.focus();
      return;
    }

    setStatus({ kind: "submitting" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = (await response.json().catch(() => null)) as
        | { ok?: boolean; message?: string }
        | null;

      if (response.ok && data?.ok) {
        setStatus({
          kind: "success",
          message:
            data.message ??
            "Thanks for getting in touch — I'll reply as soon as I can.",
        });
        setValues(initialValues);
        setErrors({});
        setAttempted(false);
        return;
      }

      if (response.status === 503) {
        setStatus({
          kind: "unconfigured",
          message:
            data?.message ??
            "This form isn't connected to a mail service yet, so nothing was sent.",
        });
        return;
      }

      setStatus({
        kind: "error",
        message:
          data?.message ??
          "Something went wrong and your message wasn't sent. Please try again.",
      });
    } catch {
      setStatus({
        kind: "error",
        message:
          "I couldn't reach the server. Check your connection and try again.",
      });
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="card relative overflow-hidden p-5 sm:p-7"
      aria-labelledby={`${formId}-title`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,59,59,0.6),rgba(255,138,61,0.35),transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full bg-accent/[0.09] blur-3xl"
      />

      <div className="relative flex items-start justify-between gap-4">
        <div>
          <h3
            id={`${formId}-title`}
            className="font-display text-[17px] font-semibold tracking-[-0.02em] text-ink"
          >
            Tell me about the project
          </h3>
          <p className="mt-1.5 text-[12.5px] text-muted">
            A few sentences is plenty to start.
          </p>
        </div>
        <span className="hidden rounded-full border border-white/[0.09] bg-white/[0.03] px-2.5 py-1 font-mono text-[8.5px] uppercase tracking-[0.14em] text-faint sm:inline">
          ~2 min
        </span>
      </div>

      <div className="relative mt-6 space-y-4">
        {status.kind === "success" && (
          <div
            role="status"
            className="flex items-start gap-3 rounded-xl border border-emerald-400/25 bg-emerald-400/[0.07] px-4 py-3.5"
          >
            <Icon name="check-circle" size={17} className="mt-px shrink-0 text-emerald-300" />
            <div>
              <p className="text-[12.5px] font-medium text-emerald-100">
                Message sent
              </p>
              <p className="mt-0.5 text-[11.5px] leading-relaxed text-emerald-100/70">
                {status.message}
              </p>
            </div>
          </div>
        )}

        {status.kind === "unconfigured" && (
          <div
            role="status"
            className="rounded-xl border border-amber-300/25 bg-amber-300/[0.06] px-4 py-3.5"
          >
            <div className="flex items-start gap-3">
              <Icon name="info" size={17} className="mt-px shrink-0 text-amber-200" />
              <div>
                <p className="text-[12.5px] font-medium text-amber-100">
                  Form delivery isn&apos;t connected yet
                </p>
                <p className="mt-0.5 text-[11.5px] leading-relaxed text-amber-100/70">
                  Nothing was sent. You can email me directly instead.
                </p>
                <a
                  href={mailtoHref}
                  className="mt-2 inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-amber-100 underline decoration-amber-200/40 underline-offset-4 transition-colors hover:text-white"
                >
                  Email {siteConfig.email}
                  <Icon name="arrow-up-right" size={12} />
                </a>
                <p className="mt-2 font-mono text-[9px] leading-relaxed text-amber-100/40">
                  Site owner: set RESEND_API_KEY + CONTACT_TO_EMAIL, or
                  CONTACT_FORM_ENDPOINT. See README.
                </p>
              </div>
            </div>
          </div>
        )}

        {status.kind === "error" && (
          <div
            role="alert"
            className="flex items-start gap-3 rounded-xl border border-red-400/25 bg-red-400/[0.06] px-4 py-3.5"
          >
            <Icon name="alert" size={17} className="mt-px shrink-0 text-red-300" />
            <div>
              <p className="text-[12.5px] font-medium text-red-100">
                Message not sent
              </p>
              <p className="mt-0.5 text-[11.5px] leading-relaxed text-red-100/70">
                {status.message}{" "}
                <a
                  href={mailtoHref}
                  className="font-medium text-red-100 underline decoration-red-200/40 underline-offset-2 hover:text-white"
                >
                  Email me instead
                </a>
                .
              </p>
            </div>
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            id={fieldId("name")}
            label="Name"
            errorId={errorId("name")}
            error={errors.name}
            required
          >
            <input
              id={fieldId("name")}
              name="name"
              type="text"
              autoComplete="name"
              required
              maxLength={80}
              value={values.name}
              onChange={(event) => updateField("name", event.target.value)}
              onBlur={() => blurField("name")}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? errorId("name") : undefined}
              className="field"
              placeholder="Your name"
            />
          </Field>

          <Field
            id={fieldId("email")}
            label="Email"
            errorId={errorId("email")}
            error={errors.email}
            required
          >
            <input
              id={fieldId("email")}
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              spellCheck={false}
              required
              maxLength={160}
              value={values.email}
              onChange={(event) => updateField("email", event.target.value)}
              onBlur={() => blurField("email")}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? errorId("email") : undefined}
              className="field"
              placeholder="you@company.com"
            />
          </Field>
        </div>

        <Field
          id={fieldId("subject")}
          label="Subject"
          errorId={errorId("subject")}
          error={errors.subject}
          required
        >
          <input
            id={fieldId("subject")}
            name="subject"
            type="text"
            required
            maxLength={120}
            value={values.subject}
            onChange={(event) => updateField("subject", event.target.value)}
            onBlur={() => blurField("subject")}
            aria-invalid={Boolean(errors.subject)}
            aria-describedby={errors.subject ? errorId("subject") : undefined}
            className="field"
            placeholder="New website, redesign, collaboration…"
          />
        </Field>

        <Field
          id={fieldId("message")}
          label="Message"
          errorId={errorId("message")}
          error={errors.message}
          required
          hint={
            <span className="font-mono text-[9.5px] text-faint">
              {values.message.length}/2000
            </span>
          }
        >
          <textarea
            id={fieldId("message")}
            name="message"
            rows={5}
            required
            maxLength={2000}
            value={values.message}
            onChange={(event) => updateField("message", event.target.value)}
            onBlur={() => blurField("message")}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? errorId("message") : undefined}
            className="field resize-y"
            placeholder="What are you building, what's the goal, and is there a timeline I should know about?"
          />
        </Field>

        {/* Honeypot — hidden from people, tempting to bots. */}
        <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
          <label htmlFor={fieldId("message") + "-company"}>Company</label>
          <input
            id={fieldId("message") + "-company"}
            name="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={values.company}
            onChange={(event) => updateField("company", event.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className={cn(
            "group relative mt-1 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-[linear-gradient(115deg,#ff3b3b_0%,#d92626_52%,#a81414_100%)] px-6 py-3.5 text-[13.5px] font-semibold text-white shadow-[0_12px_32px_-14px_rgba(255,59,59,0.85),inset_0_1px_0_rgba(255,255,255,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_-14px_rgba(255,59,59,0.9)] disabled:translate-y-0 disabled:cursor-wait disabled:opacity-70",
          )}
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(100deg,transparent,rgba(255,255,255,0.22),transparent)] transition-transform duration-700 group-hover:translate-x-full"
          />
          {isSubmitting ? (
            <>
              <span
                aria-hidden="true"
                className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white"
              />
              Sending…
            </>
          ) : (
            <>
              Send message
              <Icon
                name="arrow-up-right"
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </>
          )}
        </button>

        <p className="text-center text-[10.5px] leading-relaxed text-faint">
          {contact.formNote}
        </p>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  errorId,
  required,
  hint,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  errorId: string;
  required?: boolean;
  hint?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between gap-2">
        <label
          htmlFor={id}
          className="text-[11.5px] font-medium tracking-wide text-ink/85"
        >
          {label}
          {required && (
            <span aria-hidden="true" className="ml-0.5 text-accent-soft">
              *
            </span>
          )}
        </label>
        {hint}
      </div>
      {children}
      {error && (
        <p id={errorId} className="mt-1.5 text-[11px] leading-snug text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}
