"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Building2, 
  Mail, 
  Phone,
  User,
  Globe,
  ChevronDown,
  ArrowLeft,
  Calendar, 
  BarChart3, 
  Users,
  CheckCircle2,
  Send,
  Loader2,
  AlertCircle
} from "lucide-react";

// --- DICTIONNAIRE DE TRADUCTION ---
const TRANSLATIONS = {
  fr: {
    backToLogin: "Retour à la connexion",
    slogan: "Simplifiez la gestion de votre hôtel",
    subSlogan: "Gérences vos réservations, vos clients et vos opérations en toute simplicité.",
    feat1Title: "Réservations",
    feat1Sub: "en temps réel",
    feat2Title: "Tableaux de bord",
    feat2Sub: "et rapports",
    feat3Title: "Expérience client",
    feat3Sub: "optimisée",
    title: "Mot de passe oublié ?",
    description: "Entrez votre adresse e-mail ou votre numéro de téléphone. Nous vous enverrons un code de réinitialisation.",
    inputLabel: "E-mail ou numéro de téléphone",
    inputPlaceholder: "Entrez votre e-mail ou numéro de téléphone",
    methodLabel: "Choisissez le mode de réception",
    methodEmail: "Recevoir par e-mail",
    methodSms: "Recevoir par SMS",
    submitBtn: "Envoyer le code",
    sendingBtn: "Envoi en cours...",
    successEmail: "Un code de réinitialisation a été envoyé à votre adresse e-mail.",
    successSms: "Un code de réinitialisation vous a été envoyé par SMS.",
    errorEmpty: "Veuillez remplir le champ de saisie.",
    or: "ou",
    copyright: "© 2026 HotelPro. Tous droits réservés.",
    privacy: "Confidentialité",
    terms: "Conditions d'utilisation",
    support: "Support"
  },
  en: {
    backToLogin: "Back to login",
    slogan: "Simplify your hotel management",
    subSlogan: "Manage your bookings, guests, and operations with ease.",
    feat1Title: "Bookings",
    feat1Sub: "in real time",
    feat2Title: "Dashboards",
    feat2Sub: "and reports",
    feat3Title: "Guest experience",
    feat3Sub: "optimized",
    title: "Forgot password?",
    description: "Enter your email address or phone number. We will send you a reset code.",
    inputLabel: "Email or phone number",
    inputPlaceholder: "Enter your email or phone number",
    methodLabel: "Choose delivery method",
    methodEmail: "Receive via email",
    methodSms: "Receive via SMS",
    submitBtn: "Send code",
    sendingBtn: "Sending...",
    successEmail: "A reset code has been sent to your email address.",
    successSms: "A reset code has been sent to your phone via SMS.",
    errorEmpty: "Please fill out the input field.",
    or: "or",
    copyright: "© 2026 HotelPro. All rights reserved.",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    support: "Support"
  }
};

export default function ForgotPasswordPage() {
  const [inputValue, setInputValue] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState<"email" | "sms">("email");
  const [locale, setLocale] = useState<"fr" | "en">("fr");
  const [showLangMenu, setShowLangMenu] = useState(false);
  
  // États pour la gestion de la soumission
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Raccourci pour récupérer les textes de la langue active
  const t = TRANSLATIONS[locale];

  // Gestion de la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    if (!inputValue.trim()) {
      setStatusMessage({ type: "error", text: t.errorEmpty });
      return;
    }

    setIsLoading(true);

    try {
      // Simulation de l'appel API (Attente de 2 secondes)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Personnalisation du message de succès selon le choix (E-mail ou SMS)
      if (deliveryMethod === "email") {
        setStatusMessage({ type: "success", text: `${t.successEmail} (${inputValue})` });
      } else {
        setStatusMessage({ type: "success", text: `${t.successSms} (${inputValue})` });
      }
      
      // Optionnel : vider le champ après succès
      setInputValue("");
    } catch (error) {
      setStatusMessage({ type: "error", text: "Une erreur est survenue. Veuillez réessayer." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F8FAFC]">
      
      {/* CORPS PRINCIPAL DE LA PAGE */}
      <div className="grow grid grid-cols-1 lg:grid-cols-12 relative items-stretch">
        
        {/* --- SECTION GAUCHE : ILLUSTRATION HÔTEL --- */}
        <div className="hidden lg:flex lg:col-span-7 relative p-12 flex-col justify-between overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image 
              src="/hotel2.jpg" 
              alt="HotelPro background" 
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-slate-950/40 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
          </div>

          <div className="relative z-10 flex items-center gap-3 text-white">
            <div className="bg-white/10 p-2.5 rounded-xl backdrop-blur-md border border-white/10 shadow-sm">
              <Building2 className="h-6 w-6 text-white stroke-[2]" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight block">HotelPro</span>
              <span className="text-[10px] text-slate-200/90 font-bold block -mt-1 tracking-wide uppercase">Smart Hotel Management</span>
            </div>
          </div>

          <div className="relative z-10 max-w-xl space-y-4 my-auto pt-20">
            <h2 className="text-4xl font-black text-white leading-[1.15] tracking-tight">
              {t.slogan.split("<br />").map((text, i) => <React.Fragment key={i}>{text}<br /></React.Fragment>)}
            </h2>
            <p className="text-sm text-slate-200 font-medium leading-relaxed max-w-md">
              {t.subSlogan}
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-3 gap-4 pt-8 border-t border-white/10">
            <div className="flex flex-col gap-2">
              <div className="h-9 w-9 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/10">
                <Calendar className="h-4 w-4 text-white" />
              </div>
              <p className="text-[11px] font-black text-white leading-tight">
                {t.feat1Title}<br />
                <span className="font-medium text-slate-300">{t.feat1Sub}</span>
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="h-9 w-9 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/10">
                <BarChart3 className="h-4 w-4 text-white" />
              </div>
              <p className="text-[11px] font-black text-white leading-tight">
                {t.feat2Title}<br />
                <span className="font-medium text-slate-300">{t.feat2Sub}</span>
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="h-9 w-9 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/10">
                <Users className="h-4 w-4 text-white" />
              </div>
              <p className="text-[11px] font-black text-white leading-tight">
                {t.feat3Title}<br />
                <span className="font-medium text-slate-300">{t.feat3Sub}</span>
              </p>
            </div>
          </div>
        </div>

        {/* --- SECTION DROITE : FORMULAIRE DE RÉCUPÉRATION --- */}
        <div className="col-span-1 lg:col-span-5 flex flex-col items-center justify-center p-6 sm:p-12 relative z-10">
          
          <div className="w-full max-w-[440px] flex items-center justify-between mb-4 text-slate-600 font-bold text-xs relative">
            <Link href="/auth/login" className="flex items-center gap-2 hover:text-slate-900 transition-colors">
              <ArrowLeft className="h-4 w-4 stroke-[2.5]" />
              <span>{t.backToLogin}</span>
            </Link>

            <div className="relative">
              <button 
                type="button"
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center gap-1.5 hover:text-slate-900 cursor-pointer transition-colors"
              >
                <Globe className="h-3.5 w-3.5 text-slate-400" />
                <span>{locale === "fr" ? "Français" : "English"}</span>
                <ChevronDown className={`h-3 w-3 text-slate-400 stroke-[2.5] transition-transform ${showLangMenu ? "rotate-180" : ""}`} />
              </button>

              {showLangMenu && (
                <div className="absolute right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-lg py-1 w-28 text-xs font-semibold overflow-hidden z-30">
                  <button
                    type="button"
                    onClick={() => { setLocale("fr"); setShowLangMenu(false); }}
                    className={`w-full text-left px-3 py-2 hover:bg-slate-50 transition-colors ${locale === "fr" ? "text-[#0B45D2] font-black" : "text-slate-600"}`}
                  >
                    Français
                  </button>
                  <button
                    type="button"
                    onClick={() => { setLocale("en"); setShowLangMenu(false); }}
                    className={`w-full text-left px-3 py-2 hover:bg-slate-50 transition-colors ${locale === "en" ? "text-[#0B45D2] font-black" : "text-slate-600"}`}
                  >
                    English
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="w-full max-w-[440px] bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-xl lg:-ml-20 xl:-ml-28 relative z-20 transition-all">
            
            <div className="text-center mb-8 space-y-2">
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">{t.title}</h1>
              <p className="text-xs font-medium text-slate-400 leading-relaxed max-w-[320px] mx-auto">
                {t.description}
              </p>
            </div>

            {/* MESSAGE D'ALERTE DYNAMIQUE (SUCCÈS OU ERREUR) */}
            {statusMessage && (
              <div className={`mb-6 p-4 rounded-xl flex items-start gap-3 text-xs font-semibold ${
                statusMessage.type === "success" 
                  ? "bg-green-50 text-green-700 border border-green-200" 
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}>
                {statusMessage.type === "success" ? (
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-green-600 mt-0.5" />
                ) : (
                  <AlertCircle className="h-4 w-4 shrink-0 text-red-600 mt-0.5" />
                )}
                <span>{statusMessage.text}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Saisie Identifiant */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-700 block">{t.inputLabel}</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="h-4 w-4" />
                  </div>
                  <input 
                    type="text" 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={t.inputPlaceholder} 
                    className="w-full text-xs font-semibold text-slate-800 placeholder-slate-400 pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-[#0B45D2] focus:ring-2 focus:ring-blue-100 focus:outline-hidden transition-all"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Sélecteur du mode de réception */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-700 block">{t.methodLabel}</label>
                <div className="grid grid-cols-2 gap-3">
                  
                  {/* Option E-mail */}
                  <div 
                    onClick={() => !isLoading && setDeliveryMethod("email")}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition-all select-none ${
                      deliveryMethod === "email" 
                        ? "border-[#0B45D2] bg-blue-50/20 text-[#0B45D2]" 
                        : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                    } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <div className="relative flex items-center justify-center shrink-0">
                      {deliveryMethod === "email" ? (
                        <CheckCircle2 className="h-4 w-4 text-[#0B45D2] fill-blue-100" />
                      ) : (
                        <div className="h-4 w-4 rounded-full border border-slate-300 bg-white" />
                      )}
                    </div>
                    <Mail className="h-4 w-4 shrink-0" />
                    <span className="text-xs font-bold tracking-tight">{t.methodEmail}</span>
                  </div>

                  {/* Option SMS */}
                  <div 
                    onClick={() => !isLoading && setDeliveryMethod("sms")}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition-all select-none ${
                      deliveryMethod === "sms" 
                        ? "border-[#0B45D2] bg-blue-50/20 text-[#0B45D2]" 
                        : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                    } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <div className="relative flex items-center justify-center shrink-0">
                      {deliveryMethod === "sms" ? (
                        <CheckCircle2 className="h-4 w-4 text-[#0B45D2] fill-blue-100" />
                      ) : (
                        <div className="h-4 w-4 rounded-full border border-slate-300 bg-white" />
                      )}
                    </div>
                    <Phone className="h-4 w-4 shrink-0" />
                    <span className="text-xs font-bold tracking-tight">{t.methodSms}</span>
                  </div>

                </div>
              </div>

              {/* Bouton d'envoi du code dynamique */}
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-[#0B45D2] hover:bg-[#093bb5] disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold text-xs py-3.5 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    <span>{t.sendingBtn}</span>
                  </>
                ) : (
                  <>
                    <Send className="h-3.5 w-3.5" />
                    <span>{t.submitBtn}</span>
                  </>
                )}
              </button>

              <div className="relative flex py-1 items-center">
                <div className="grow border-t border-slate-200"></div>
                <span className="flex-shrink mx-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">{t.or}</span>
                <div className="grow border-t border-slate-200"></div>
              </div>

              <div className="text-center">
                <Link href="/auth/login" className="text-xs font-bold text-[#0B45D2] hover:underline">
                  {t.backToLogin}
                </Link>
              </div>

            </form>
          </div>

        </div>
      </div>

      {/* --- FOOTER GLOBAL DE LA PAGE --- */}
      <div className="bg-white border-t border-slate-200 px-6 sm:px-12 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-semibold text-slate-400 relative z-30">
        <div>
          {t.copyright}
        </div>
        <div className="flex items-center gap-4 sm:gap-6 text-slate-500">
          <Link href="/legal/privacy" className="hover:text-slate-800 transition-colors">{t.privacy}</Link>
          <span className="text-slate-200 font-light">|</span>
          <Link href="/legal/terms" className="hover:text-slate-800 transition-colors">{t.terms}</Link>
          <span className="text-slate-200 font-light">|</span>
          <Link href="/support" className="hover:text-slate-800 transition-colors">{t.support}</Link>
        </div>
      </div>

    </div>
  );
}