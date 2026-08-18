"use client";

import { useState, type FormEvent } from "react";
import { Terminal, ArrowRight, Loader2, Sparkles, CheckCircle2, ShieldAlert } from "lucide-react";
import {
  DIAGNOSTIC_MAX_CHARS,
  SECTORS,
  isDiagnosticResult,
  type DiagnosticResult,
  type Sector,
} from "@/lib/diagnostic";
import { isSuccessResponse } from "@/lib/capture";
import { postJson } from "@/lib/http";

export default function DiagnosticEclair() {
  const [besoin, setBesoin] = useState("");
  const [secteur, setSecteur] = useState<Sector>("administration");
  const [loading, setLoading] = useState(false);
  const [diagnosticError, setDiagnosticError] = useState<string | null>(null);
  const [result, setResult] = useState<DiagnosticResult | null>(null);

  // Lead state
  const [leadName, setLeadName] = useState("");
  const [leadOrg, setLeadOrg] = useState("");
  const [leadContact, setLeadContact] = useState("");
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [leadError, setLeadError] = useState<string | null>(null);

  const handleDiagnosticSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (besoin.trim().length < 10) return;

    setLoading(true);
    setDiagnosticError(null);
    setLeadError(null);
    setResult(null);
    setLeadSubmitted(false);

    try {
      const data = await postJson(
        "/api/diagnostic",
        { besoin: besoin.trim(), secteur },
        isDiagnosticResult,
      );
      setResult(data);
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : "Impossible de joindre le serveur de diagnostic. Réessayez plus tard.";
      setDiagnosticError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleLeadSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!leadName.trim() || !leadOrg.trim() || !leadContact.trim() || !result) return;

    setLeadSubmitting(true);
    setLeadError(null);
    try {
      await postJson(
        "/api/lead",
        {
          name: leadName,
          institution: leadOrg,
          contact: leadContact,
          diagnostic: result,
          contexte: { besoin, secteur },
        },
        isSuccessResponse,
      );

      setLeadSubmitted(true);
    } catch (err: unknown) {
      setLeadError(
        err instanceof Error
          ? err.message
          : "Impossible d'enregistrer vos coordonnées. Contactez-nous directement par email.",
      );
    } finally {
      setLeadSubmitting(false);
    }
  };

  return (
    <div id="diagnostic-outil" className="w-full max-w-4xl mx-auto z-10">
      <div className="glass-panel-accent rounded-2xl overflow-hidden shadow-2xl">
        {/* Header bar */}
        <div className="flex items-center justify-between gap-3 border-b border-white/5 bg-terre px-4 py-4 sm:px-6">
          <div className="flex shrink-0 items-center space-x-1.5 sm:space-x-2" aria-hidden="true">
            <div className="size-2.5 rounded-full bg-red-500/80 sm:size-3"></div>
            <div className="size-2.5 rounded-full bg-yellow-500/80 sm:size-3"></div>
            <div className="size-2.5 rounded-full bg-green-500/80 sm:size-3"></div>
          </div>
          <span className="flex min-w-0 items-center justify-center gap-1.5 text-center font-mono text-[10px] uppercase tracking-wider text-sable-attenue sm:text-xs">
            <Terminal size={12} className="shrink-0 text-or-de-l-aube" />
            <span className="sm:hidden">Diagnostic Éclair · v1.0</span>
            <span className="hidden sm:inline">console::diagnostic_éclair_v1.0</span>
          </span>
          <div className="w-[3.25rem] shrink-0 sm:w-[4.25rem]" aria-hidden="true" />
        </div>

        {/* Console Body */}
        <div className="space-y-8 p-4 sm:p-6 md:p-8">
          {!result ? (
            <form onSubmit={handleDiagnosticSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1 space-y-2">
                  <label htmlFor="secteur" className="block text-xs font-semibold uppercase tracking-wider text-pierre-froide/80">
                    Secteur d&apos;Activité
                  </label>
                  <select
                    id="secteur"
                    value={secteur}
                    onChange={(event) => setSecteur(event.target.value as Sector)}
                    className="min-h-11 w-full cursor-pointer rounded-lg border border-white/15 bg-nuit-sahara/80 px-4 py-3 text-sm text-pierre-froide transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-or-de-l-aube"
                  >
                    {SECTORS.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2 space-y-2">
                  <div className="flex justify-between items-center">
                    <label htmlFor="besoin" className="block text-xs font-semibold uppercase tracking-wider text-pierre-froide/80">
                      Processus ou Blocage à Analyser
                    </label>
                    <span className="font-mono text-[10px] text-sable-attenue">
                      {besoin.length}/{DIAGNOSTIC_MAX_CHARS}
                    </span>
                  </div>
                  <textarea
                    id="besoin"
                    rows={3}
                    minLength={10}
                    maxLength={DIAGNOSTIC_MAX_CHARS}
                    value={besoin}
                    onChange={(e) => setBesoin(e.target.value)}
                    placeholder="Ex. Nos rapports mensuels prennent trois jours à consolider."
                    aria-describedby="besoin-limite"
                    className="min-h-28 w-full resize-y rounded-lg border border-white/15 bg-nuit-sahara/80 px-4 py-3 text-sm text-pierre-froide placeholder:text-sable-attenue/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-or-de-l-aube"
                    required
                  />
                  <span id="besoin-limite" aria-live="polite" className="block text-[11px] leading-relaxed text-sable-attenue">
                    {besoin.trim().length < 10
                      ? `Ajoutez encore ${10 - besoin.trim().length} caractère${10 - besoin.trim().length > 1 ? "s" : ""} pour lancer l'analyse.`
                      : "Votre description est assez précise pour lancer l'analyse."}
                  </span>
                </div>
              </div>

              {diagnosticError && (
                <div role="alert" aria-live="polite" className="p-4 bg-red-950/40 border border-red-500/20 rounded-lg flex items-start space-x-3 text-red-200 text-xs">
                  <ShieldAlert size={16} className="text-red-400 shrink-0 mt-0.5" />
                  <p>{diagnosticError}</p>
                </div>
              )}

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={loading || besoin.trim().length < 10}
                  aria-busy={loading}
                  className="inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-or-de-l-aube px-6 py-3 text-xs font-bold uppercase tracking-wider text-nuit-sahara transition-all duration-300 hover:bg-pierre-froide focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pierre-froide disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-sable-attenue md:w-auto"
                >
                  {loading ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      Calcul du Diagnostic...
                    </>
                  ) : (
                    <>
                      Lancer le Diagnostic
                      <Sparkles size={14} />
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            /* Result Dashboard */
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-or-de-l-aube flex items-center gap-2">
                    <Sparkles size={16} />
                    Diagnostic IA Généré
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      setResult(null);
                      setBesoin("");
                      setLeadError(null);
                      setLeadSubmitted(false);
                    }}
                    className="text-xs text-sable-attenue hover:text-pierre-froide focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-or-de-l-aube transition-colors font-mono underline"
                  >
                    _nouveau_calcul
                  </button>
                </div>

                {/* Structured diagnostic values in Geist Mono layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs text-pierre-froide">
                  {/* Left Column: Stats and Overview */}
                  <div className="space-y-4 md:border-r md:border-white/5 md:pr-6">
                    <div className="space-y-1 bg-white/3 p-3.5 rounded-lg border border-white/5">
                      <span className="text-[10px] text-sable-attenue uppercase tracking-wider block">Complexité estimée</span>
                      <span className={`text-sm font-bold uppercase ${
                        result.niveau_complexite === "faible" ? "text-green-400" :
                        result.niveau_complexite === "moyen" ? "text-yellow-400" : "text-red-400"
                      }`}>
                        {result.niveau_complexite}
                      </span>
                    </div>

                    <div className="space-y-1 bg-white/3 p-3.5 rounded-lg border border-white/5">
                      <span className="text-[10px] text-sable-attenue uppercase tracking-wider block">Impact potentiel</span>
                      <p className="text-xs leading-relaxed text-or-de-l-aube">
                        {result.gain_estime}
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Diagnostic & Steps */}
                  <div className="md:col-span-2 space-y-6">
                    <div className="space-y-1.5">
                      <span className="text-[10px] text-sable-attenue uppercase tracking-wider block">Besoin reformulé</span>
                      <p className="text-sm leading-relaxed border-l-2 border-or-de-l-aube pl-3 text-pierre-froide">
                        &quot;{result.besoin_reformule}&quot;
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[10px] text-sable-attenue uppercase tracking-wider block">Opportunité technologique</span>
                      <p className="text-xs leading-relaxed text-sable-attenue">
                        {result.opportunite}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <span className="text-[10px] text-sable-attenue uppercase tracking-wider block">Approche recommandée (3 étapes)</span>
                      <ol className="space-y-2 text-xs">
                        {result.approche_recommandee.map((step, idx) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            <span className="text-or-de-l-aube font-bold shrink-0">{idx + 1}.</span>
                            <span className="text-pierre-froide/90">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    <div className="space-y-1 bg-terre p-3 rounded border border-white/5">
                      <span className="text-[10px] text-or-de-l-aube uppercase tracking-wider block font-bold">Prochaine action décisionnelle</span>
                      <p className="text-xs text-pierre-froide italic font-sans font-medium">
                        {result.prochaine_action}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lead Capture form */}
              <div className="border-t border-white/5 pt-8">
                {!leadSubmitted ? (
                  <form onSubmit={handleLeadSubmit} className="space-y-5 bg-terre/50 p-6 rounded-xl border border-white/5">
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-pierre-froide">
                        Recevez ce diagnostic complet + une piste d&apos;accompagnement
                      </h4>
                      <p className="text-xs text-sable-attenue">
                        Entrez vos coordonnées pour transmettre cette note à notre équipe et préparer un échange adapté à votre contexte.
                      </p>
                      <p className="text-[11px] text-sable-attenue"><span aria-hidden="true" className="text-or-de-l-aube">*</span> Champs obligatoires</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label htmlFor="leadName" className="block text-[10px] font-semibold uppercase tracking-wider text-pierre-froide/80">
                          Votre nom complet <span aria-hidden="true" className="text-or-de-l-aube">*</span><span className="sr-only"> obligatoire</span>
                        </label>
                        <input
                          id="leadName"
                          type="text"
                          autoComplete="name"
                          minLength={2}
                          maxLength={120}
                          value={leadName}
                          onChange={(e) => setLeadName(e.target.value)}
                          placeholder="Ex: Ibrahim Diallo"
                          className="min-h-11 w-full rounded-lg border border-white/15 bg-nuit-sahara px-3 py-2 text-xs text-pierre-froide transition-colors placeholder:text-sable-attenue/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-or-de-l-aube"
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <label htmlFor="leadOrg" className="block text-[10px] font-semibold uppercase tracking-wider text-pierre-froide/80">
                          Organisation <span aria-hidden="true" className="text-or-de-l-aube">*</span><span className="sr-only"> obligatoire</span>
                        </label>
                        <input
                          id="leadOrg"
                          type="text"
                          autoComplete="organization"
                          minLength={2}
                          maxLength={180}
                          value={leadOrg}
                          onChange={(e) => setLeadOrg(e.target.value)}
                          placeholder="Ex. Ministère, ONG ou PME"
                          className="min-h-11 w-full rounded-lg border border-white/15 bg-nuit-sahara px-3 py-2 text-xs text-pierre-froide transition-colors placeholder:text-sable-attenue/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-or-de-l-aube"
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <label htmlFor="leadContact" className="block text-[10px] font-semibold uppercase tracking-wider text-pierre-froide/80">
                          Email ou WhatsApp <span aria-hidden="true" className="text-or-de-l-aube">*</span><span className="sr-only"> obligatoire</span>
                        </label>
                        <input
                          id="leadContact"
                          type="text"
                          autoComplete="email"
                          minLength={5}
                          maxLength={160}
                          value={leadContact}
                          onChange={(e) => setLeadContact(e.target.value)}
                          placeholder="vous@organisation.org ou +227…"
                          aria-describedby="lead-contact-format"
                          className="min-h-11 w-full rounded-lg border border-white/15 bg-nuit-sahara px-3 py-2 text-xs text-pierre-froide transition-colors placeholder:text-sable-attenue/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-or-de-l-aube"
                          required
                        />
                        <span id="lead-contact-format" className="block text-[10px] leading-relaxed text-sable-attenue">Ajoutez l&apos;indicatif du pays pour WhatsApp.</span>
                      </div>
                    </div>

                    {leadError && (
                      <div role="alert" aria-live="polite" className="p-3 bg-red-950/40 border border-red-500/20 rounded-lg flex items-start gap-3 text-red-200 text-xs">
                        <ShieldAlert size={16} className="text-red-400 shrink-0" />
                        <p>{leadError}</p>
                      </div>
                    )}

                    <div className="flex justify-end pt-2">
                      <button
                        type="submit"
                        disabled={leadSubmitting}
                        aria-busy={leadSubmitting}
                        className="inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-or-de-l-aube px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-nuit-sahara transition-all duration-300 hover:bg-pierre-froide focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pierre-froide disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-sable-attenue md:w-auto"
                      >
                        {leadSubmitting ? (
                          <>
                            <Loader2 size={12} className="animate-spin" />
                            Transmission...
                          </>
                        ) : (
                          <>
                            Recevoir le rapport complet
                            <ArrowRight size={12} />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="bg-or-de-l-aube/5 border border-or-de-l-aube/20 p-6 rounded-xl flex items-start space-x-4 text-pierre-froide">
                    <CheckCircle2 size={24} className="text-or-de-l-aube shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold">Diagnostic transmis avec succès !</h4>
                      <p className="text-xs text-sable-attenue">
                        Merci <span className="text-pierre-froide font-medium">{leadName}</span>. Cette note d&apos;opportunité a été envoyée à notre équipe technique, qui vous recontactera dans les meilleurs délais.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
