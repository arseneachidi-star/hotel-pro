"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Building2, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Calendar, 
  BarChart3, 
  Users,
  Globe,
  ChevronDown
} from "lucide-react";

// --- DICTIONNAIRE DE TRADUCTION ---
const TRANSLATIONS = {
  fr: {
    slogan: "Simplifiez la gestion de votre hôtel",
    subSlogan: "La solution tout-en-un pour gérer vos réservations, vos clients, vos paiements et bien plus encore.",
    feat1Title: "Réservations",
    feat1Sub: "en temps réel",
    feat2Title: "Tableaux de bord",
    feat2Sub: "et rapports",
    feat3Title: "Expérience client",
    feat3Sub: "optimisée",
    login: "Connexion",
    emailLabel: "Adresse e-mail",
    emailPlaceholder: "Entrez votre adresse e-mail",
    passwordLabel: "Mot de passe",
    passwordPlaceholder: "Entrez votre mot de passe",
    rememberMe: "Se souvenir de moi",
    forgotPassword: "Mot de passe oublié ?",
    submitBtn: "Se connecter",
    or: "ou",
    noAccount: "Vous n'avez pas encore de compte ?",
    createAccount: "Créer un compte",
    copyright: "© 2026 HotelPro. Tous droits réservés.",
    privacy: "Confidentialité",
    terms: "Conditions d'utilisation",
    support: "Support"
  },
  en: {
    slogan: "Simplify your hotel management",
    subSlogan: "The all-in-one solution to manage your bookings, guests, payments, and much more.",
    feat1Title: "Bookings",
    feat1Sub: "in real time",
    feat2Title: "Dashboards",
    feat2Sub: "and reports",
    feat3Title: "Guest experience",
    feat3Sub: "optimized",
    login: "Sign In",
    emailLabel: "Email address",
    emailPlaceholder: "Enter your email address",
    passwordLabel: "Password",
    passwordPlaceholder: "Enter your password",
    rememberMe: "Remember me",
    forgotPassword: "Forgot password?",
    submitBtn: "Sign In",
    or: "or",
    noAccount: "Don't have an account yet?",
    createAccount: "Create an account",
    copyright: "© 2026 HotelPro. All rights reserved.",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    support: "Support"
  }
};

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [locale, setLocale] = useState<"fr" | "en">("fr");
  const [showLangMenu, setShowLangMenu] = useState(false);

  // Raccourci pour récupérer les textes de la langue active
  const t = TRANSLATIONS[locale];

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F8FAFC]">
      
      {/* CORPS PRINCIPAL DE LA PAGE */}
      <div className="grow grid grid-cols-1 lg:grid-cols-12 relative items-stretch">
        
        {/* --- SECTION GAUCHE : ILLUSTRATION HÔTEL (7 COLONNES SUR 12) --- */}
        <div className="hidden lg:flex lg:col-span-7 relative p-12 flex-col justify-between overflow-hidden">
          {/* Image de fond issue du dossier public */}
          <div className="absolute inset-0 z-0">
            <Image 
              src="/hotel.png" 
              alt="HotelPro background" 
              fill
              priority
              className="object-cover"
            />
            {/* Double filtre sombre pour garantir le contraste parfait des textes blancs */}
            <div className="absolute inset-0 bg-slate-950/40 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
          </div>

          {/* Logo applicatif */}
          <div className="relative z-10 flex items-center gap-3 text-white">
            <div className="bg-white/10 p-2.5 rounded-xl backdrop-blur-md border border-white/10 shadow-sm">
              <Building2 className="h-6 w-6 text-white stroke-[2]" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight block">HotelPro</span>
              <span className="text-[10px] text-slate-200/90 font-bold block -mt-1 tracking-wide uppercase">Smart Hotel Management</span>
            </div>
          </div>

          {/* Slogans textuels centrés verticalement */}
          <div className="relative z-10 max-w-xl space-y-4 my-auto pt-20">
            <h2 className="text-4xl font-black text-white leading-[1.15] tracking-tight">
              {t.slogan.split("<br />").map((text, i) => <React.Fragment key={i}>{text}<br /></React.Fragment>)}
            </h2>
            <p className="text-sm text-slate-200 font-medium leading-relaxed max-w-md">
              {t.subSlogan}
            </p>
          </div>

          {/* Les 3 indicateurs de fonctionnalités du bas */}
          <div className="relative z-10 grid grid-cols-3 gap-4 pt-8 border-t border-white/10">
            {/* Item 1 */}
            <div className="flex flex-col gap-2">
              <div className="h-9 w-9 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/10">
                <Calendar className="h-4 w-4 text-white" />
              </div>
              <p className="text-[11px] font-black text-white leading-tight">
                {t.feat1Title}<br />
                <span className="font-medium text-slate-300">{t.feat1Sub}</span>
              </p>
            </div>
            {/* Item 2 */}
            <div className="flex flex-col gap-2">
              <div className="h-9 w-9 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/10">
                <BarChart3 className="h-4 w-4 text-white" />
              </div>
              <p className="text-[11px] font-black text-white leading-tight">
                {t.feat2Title}<br />
                <span className="font-medium text-slate-300">{t.feat2Sub}</span>
              </p>
            </div>
            {/* Item 3 */}
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

        {/* --- SECTION DROITE : FORMULAIRE EN PORTE-À-FAUX (5 COLONNES SUR 12) --- */}
        <div className="col-span-1 lg:col-span-5 flex flex-col items-center justify-center p-6 sm:p-12 relative z-10">
          
          {/* SÉLECTEUR DE LANGUE DYNAMIQUE */}
          <div className="absolute top-6 right-6 lg:right-12 z-30">
            <button 
              type="button"
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 font-bold text-xs cursor-pointer transition-colors"
            >
              <Globe className="h-3.5 w-3.5 text-slate-400" />
              <span>{locale === "fr" ? "Français" : "English"}</span>
              <ChevronDown className={`h-3 w-3 text-slate-400 stroke-[2.5] transition-transform ${showLangMenu ? "rotate-180" : ""}`} />
            </button>
            
            {/* Menu Déroulant (Dropdown) */}
            {showLangMenu && (
              <div className="absolute right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-lg py-1 w-28 text-xs font-semibold overflow-hidden animate-in fade-in slide-in-from-top-1">
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

          {/* Formulaire de Connexion suspendu */}
          <div className="w-full max-w-[440px] bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-xl lg:-ml-20 xl:-ml-28 relative z-20 transition-all">
            
            <div className="mb-8">
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">{t.login}</h1>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
              
              {/* Adresse E-mail */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-700 block">{t.emailLabel}</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="h-4 w-4" />
                  </div>
                  <input 
                    type="email" 
                    placeholder={t.emailPlaceholder} 
                    className="w-full text-xs font-semibold text-slate-800 placeholder-slate-400 pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-[#0B45D2] focus:ring-2 focus:ring-blue-100 focus:outline-hidden transition-all"
                    required
                  />
                </div>
              </div>

              {/* Mot de passe */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-700 block">{t.passwordLabel}</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder={t.passwordPlaceholder} 
                    className="w-full text-xs font-semibold text-slate-800 placeholder-slate-400 pl-10 pr-10 py-3 rounded-xl border border-slate-200 bg-white focus:border-[#0B45D2] focus:ring-2 focus:ring-blue-100 focus:outline-hidden transition-all"
                    required
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Checkbox "Se souvenir de moi" et lien oubli */}
              <div className="flex items-center justify-between text-xs font-bold pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-slate-600 hover:text-slate-800 select-none font-medium">
                  <input 
                    type="checkbox" 
                    className="h-4 w-4 rounded-md border-slate-300 text-[#0B45D2] focus:ring-[#0B45D2]/20 focus:ring-offset-0"
                  />
                  <span>{t.rememberMe}</span>
                </label>
                <Link href="/auth/forgot-password" id="forgot-link" className="text-[#0B45D2] hover:underline">
                  {t.forgotPassword}
                </Link>
              </div>

              {/* Bouton Soumettre */}
              <button 
                type="submit" 
                className="w-full bg-[#0B45D2] hover:bg-[#093bb5] text-white font-bold text-xs py-3.5 rounded-xl transition-all shadow-sm block text-center cursor-pointer"
              >
                {t.submitBtn}
              </button>

              {/* Séparateur élégant "ou" */}
              <div className="relative flex py-1 items-center">
                <div className="grow border-t border-slate-200"></div>
                <span className="flex-shrink mx-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">{t.or}</span>
                <div className="grow border-t border-slate-200"></div>
              </div>

              {/* Inscription de compte */}
              <div className="space-y-3 text-center">
                <p className="text-xs font-medium text-slate-500">{t.noAccount}</p>
                <Link 
                  href="/auth/register" 
                  className="w-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs py-3 rounded-xl transition-colors block text-center shadow-3xs"
                >
                  {t.createAccount}
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