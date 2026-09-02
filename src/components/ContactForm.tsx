"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export function ContactForm({ dict }: { dict: Dictionary }) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="grid gap-5"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={dict.contact.formName} name="name" />
        <Field label={dict.contact.formEmail} name="email" type="email" />
      </div>
      <Field label={dict.contact.formSubject} name="subject" />
      <div>
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-fg-subtle">
          {dict.contact.formMessage}
        </label>
        <textarea
          name="message"
          rows={6}
          className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-fg outline-none transition-colors focus:border-accent-purple-strong"
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          className="w-fit rounded-full bg-accent-purple px-7 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-accent-purple-strong"
        >
          {dict.contact.formSubmit}
        </button>
        <p className="text-xs text-fg-subtle">{dict.contact.formNote}</p>
      </div>

      {submitted && (
        <p className="rounded-lg border border-accent-purple/30 bg-accent-purple/10 px-4 py-3 text-sm text-accent-purple-strong">
          {dict.contact.formNote}
        </p>
      )}
    </form>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-fg-subtle">{label}</label>
      <input
        type={type}
        name={name}
        className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-fg outline-none transition-colors focus:border-accent-purple-strong"
      />
    </div>
  );
}
