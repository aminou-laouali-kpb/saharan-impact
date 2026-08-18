"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, Send, ShieldAlert } from "lucide-react";
import { isSuccessResponse, type CaptureKind } from "@/lib/capture";
import { postJson } from "@/lib/http";

interface InterestFormProps {
  kind: Exclude<CaptureKind, "newsletter">;
  title: string;
  description: string;
  interests: readonly string[];
  submitLabel: string;
  initialInterest?: string;
}

type ContactMethod = "email" | "whatsapp";

export default function InterestForm({
  kind,
  title,
  description,
  interests,
  submitLabel,
  initialInterest,
}: InterestFormProps) {
  const defaultInterest = initialInterest && interests.includes(initialInterest)
    ? initialInterest
    : interests[0] ?? "Échange général";
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [contactMethod, setContactMethod] = useState<ContactMethod>("email");
  const [contact, setContact] = useState("");
  const [interest, setInterest] = useState(defaultInterest);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await postJson(
        "/api/interest",
        { kind, name, organization, contactMethod, contact, interest, message },
        isSuccessResponse,
      );
      setSubmitted(true);
    } catch (submitError: unknown) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Le formulaire n'a pas pu être transmis.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div role="status" className="flex items-start gap-4 rounded-xl border border-or-de-l-aube/30 bg-or-de-l-aube/10 p-6">
        <CheckCircle2 className="mt-0.5 shrink-0 text-or-de-l-aube" aria-hidden="true" />
        <div>
          <h3 className="font-semibold text-pierre-froide">Demande transmise</h3>
          <p className="mt-1 text-sm text-sable-attenue">Merci {name}. Votre demande est enregistrée ; notre équipe vous répondra par {contactMethod === "email" ? "email" : "WhatsApp"}.</p>
        </div>
      </div>
    );
  }

  const inputClasses = "mt-1.5 min-h-11 w-full rounded-lg border border-white/15 bg-nuit-sahara px-4 py-3 text-sm font-normal normal-case tracking-normal text-pierre-froide placeholder:text-sable-attenue/60 focus-visible:outline-or-de-l-aube";
  const requiredMark = <><span aria-hidden="true" className="text-or-de-l-aube"> *</span><span className="sr-only"> obligatoire</span></>;

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-white/10 bg-terre p-6 md:p-8">
      <div>
        <h2 className="font-display text-2xl font-bold text-pierre-froide">{title}</h2>
        <p className="mt-2 text-sm leading-relaxed text-sable-attenue">{description}</p>
        <p className="mt-3 text-xs text-sable-attenue"><span aria-hidden="true" className="text-or-de-l-aube">*</span> Champs obligatoires</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-pierre-froide/80">
          Nom complet{requiredMark}
          <input className={inputClasses} value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" minLength={2} maxLength={120} required />
        </label>
        <label className="text-xs font-semibold uppercase tracking-wider text-pierre-froide/80">
          Organisation <span className="font-normal normal-case tracking-normal text-sable-attenue">(facultatif)</span>
          <input className={inputClasses} value={organization} onChange={(event) => setOrganization(event.target.value)} autoComplete="organization" maxLength={180} />
        </label>
        <label className="text-xs font-semibold uppercase tracking-wider text-pierre-froide/80">
          Canal de réponse{requiredMark}
          <select className={inputClasses} value={contactMethod} onChange={(event) => {
            setContactMethod(event.target.value as ContactMethod);
            setContact("");
          }}>
            <option value="email">Email</option>
            <option value="whatsapp">WhatsApp</option>
          </select>
        </label>
        <label className="text-xs font-semibold uppercase tracking-wider text-pierre-froide/80">
          {contactMethod === "email" ? "Adresse email" : "Numéro WhatsApp"}{requiredMark}
          <input
            className={inputClasses}
            type={contactMethod === "email" ? "email" : "tel"}
            value={contact}
            onChange={(event) => setContact(event.target.value)}
            autoComplete={contactMethod === "email" ? "email" : "tel"}
            inputMode={contactMethod === "email" ? "email" : "tel"}
            placeholder={contactMethod === "email" ? "vous@organisation.org" : "+227 00 00 00 00"}
            minLength={contactMethod === "email" ? 5 : 8}
            maxLength={160}
            aria-describedby="contact-format"
            required
          />
          <span id="contact-format" className="mt-1.5 block text-[11px] font-normal normal-case leading-relaxed tracking-normal text-sable-attenue">
            {contactMethod === "email" ? "Utilisez une adresse que vous consultez régulièrement." : "Ajoutez l'indicatif du pays, par exemple +227."}
          </span>
        </label>
        <label className="text-xs font-semibold uppercase tracking-wider text-pierre-froide/80 md:col-span-2">
          Sujet{requiredMark}
          <select className={inputClasses} value={interest} onChange={(event) => setInterest(event.target.value)} required>
            {interests.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
      </div>

      <label className="block text-xs font-semibold uppercase tracking-wider text-pierre-froide/80">
        Contexte ou objectif <span className="font-normal normal-case tracking-normal text-sable-attenue">(facultatif)</span>
        <textarea className={`${inputClasses} min-h-28 resize-y`} rows={4} value={message} onChange={(event) => setMessage(event.target.value)} maxLength={1_000} placeholder="Décrivez brièvement le besoin, le public concerné ou le résultat attendu." />
      </label>

      {error && (
        <div role="alert" className="flex items-start gap-3 rounded-lg border border-red-500/20 bg-red-950/40 p-4 text-xs text-red-200">
          <ShieldAlert size={16} className="shrink-0 text-red-400" aria-hidden="true" />
          <p>{error}</p>
        </div>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-md text-xs leading-relaxed text-sable-attenue">Vos informations restent confidentielles et servent uniquement à répondre à cette demande.</p>
        <button type="submit" disabled={submitting} aria-busy={submitting} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-or-de-l-aube px-6 py-3 text-xs font-bold uppercase tracking-wider text-nuit-sahara transition hover:bg-pierre-froide disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-sable-attenue">
          {submitting ? <Loader2 size={14} className="animate-spin" aria-hidden="true" /> : <Send size={14} aria-hidden="true" />}
          {submitting ? "Transmission…" : submitLabel}
        </button>
      </div>
    </form>
  );
}
