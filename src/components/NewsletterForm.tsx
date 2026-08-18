"use client";

import { useState, type FormEvent } from "react";
import { isSuccessResponse } from "@/lib/capture";
import { postJson } from "@/lib/http";

export default function NewsletterForm({ source }: { source: string }) {
  const [contact, setContact] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setStatus("loading");

    try {
      await postJson(
        "/api/interest",
        { kind: "newsletter", contact, interest: source },
        isSuccessResponse,
      );
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return <p role="status" className="text-sm font-medium text-or-de-l-aube">Inscription enregistrée. Merci.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <label htmlFor={`newsletter-${source}`} className="text-xs font-semibold uppercase tracking-wider text-sable-attenue">Recevoir les prochains guides</label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input id={`newsletter-${source}`} type="email" value={contact} onChange={(event) => setContact(event.target.value)} placeholder="votre@email.com" autoComplete="email" maxLength={160} required className="min-w-0 flex-1 rounded-lg border border-white/10 bg-nuit-sahara px-4 py-3 text-sm text-pierre-froide placeholder:text-sable-attenue/50" />
        <button disabled={status === "loading"} className="rounded-lg bg-or-de-l-aube px-5 py-3 text-xs font-bold uppercase tracking-wider text-nuit-sahara disabled:opacity-50">
          {status === "loading" ? "Envoi…" : "S'inscrire"}
        </button>
      </div>
      {status === "error" && <p role="alert" className="text-xs text-red-300">Inscription impossible pour le moment.</p>}
    </form>
  );
}
