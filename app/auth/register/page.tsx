"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Building2, 
  Mail, 
  Lock, 
  User,
  Phone,
  Eye, 
  EyeOff, 
  Calendar, 
  BarChart3, 
  Users,
  Globe,
  ChevronDown,
  ArrowLeft,
  Check
} from "lucide-react";

// --- DICTIONNAIRE DE TRADUCTION ---
const TRANSLATIONS = {
  fr: {
    backToLogin: "Retour à la connexion",
    slogan: "Rejoignez HotelPro",
    subSlogan: "Créez votre compte et simplifiez la gestion de votre hôtel dès aujourd'hui.",
    feat1Title: "Réservations",
    feat1Sub: "en temps réel",
    feat2Title: "Tableaux de bord",
    feat2Sub: "et rapports",
    feat3Title: "Expérience client",
    feat3Sub: "optimisée",
    title: "Créer un compte",
    description: "Remplissez les informations ci-dessous pour créer votre compte",
    labelFullName: "Nom complet",
    placeholderFullName: "Entrez votre nom complet",
    labelEmail: "Adresse e-mail",
    placeholderEmail: "Entrez votre adresse e-mail",
    labelPhone: "Numéro de téléphone",
    placeholderPhone: "Entrez votre numéro",
    labelHotel: "Nom de l'hôtel / Établissement",
    placeholderHotel: "Entrez le nom de votre hôtel",
    labelPassword: "Mot de passe",
    placeholderPassword: "Créez un mot de passe",
    labelConfirmPassword: "Confirmer le mot de passe",
    placeholderConfirmPassword: "Confirmez votre mot de passe",
    pwdRequirementsTitle: "Le mot de passe doit contenir :",
    reqChar: "Au moins 8 caractères",
    reqUpper: "Une lettre majuscule",
    reqLower: "Une lettre minuscule",
    reqSymbol: "Un chiffre ou un symbole",
    acceptTermsPre: "J'accepte les ",
    acceptTermsLink: "Conditions d'utilisation",
    acceptTermsAnd: " et la ",
    acceptTermsPrivacy: "Politique de confidentialité",
    submitBtn: "Créer mon compte",
    alreadyHaveAccount: "Vous avez déjà un compte ?",
    loginLink: "Se connecter",
    copyright: "© 2026 HotelPro. Tous droits réservés.",
    privacy: "Confidentialité",
    terms: "Conditions d'utilisation",
    support: "Support"
  },
  en: {
    backToLogin: "Back to login",
    slogan: "Join HotelPro",
    subSlogan: "Create your account and simplify your hotel management today.",
    feat1Title: "Bookings",
    feat1Sub: "in real time",
    feat2Title: "Dashboards",
    feat2Sub: "and reports",
    feat3Title: "Guest experience",
    feat3Sub: "optimized",
    title: "Create an account",
    description: "Fill in the information below to create your account",
    labelFullName: "Full name",
    placeholderFullName: "Enter your full name",
    labelEmail: "Email address",
    placeholderEmail: "Enter your email address",
    labelPhone: "Phone number",
    placeholderPhone: "Enter your number",
    labelHotel: "Hotel / Property name",
    placeholderHotel: "Enter your hotel name",
    labelPassword: "Password",
    placeholderPassword: "Create a password",
    labelConfirmPassword: "Confirm password",
    placeholderConfirmPassword: "Confirm your password",
    pwdRequirementsTitle: "Password must contain:",
    reqChar: "At least 8 characters",
    reqUpper: "One uppercase letter",
    reqLower: "One lowercase letter",
    reqSymbol: "One number or symbol",
    acceptTermsPre: "I accept the ",
    acceptTermsLink: "Terms of Service",
    acceptTermsAnd: " and the ",
    acceptTermsPrivacy: "Privacy Policy",
    submitBtn: "Create my account",
    alreadyHaveAccount: "Already have an account?",
    loginLink: "Login",
    copyright: "© 2026 HotelPro. All rights reserved.",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    support: "Support"
  }
};

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [locale, setLocale] = useState<"fr" | "en">("fr");
  const [showLangMenu, setShowLangMenu] = useState(false);

  // Raccourci vers les traductions de la langue active
  const t = TRANSLATIONS[locale];

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F8FAFC]">
      
      {/* CORPS PRINCIPAL DE LA PAGE */}
      <div className="grow grid grid-cols-1 lg:grid-cols-12 relative items-stretch">
        
        {/* --- SECTION GAUCHE : ILLUSTRATION HÔTEL --- */}
        <div className="hidden lg:flex lg:col-span-5 relative p-12 flex-col justify-between overflow-hidden">
          {/* Image de fond issue du dossier public */}
          <div className="absolute inset-0 z-0">
            <Image 
              src="/hotel3.jpg" 
              alt="HotelPro background" 
              fill
              priority
              className="object-cover"
            />
            {/* Double overlay pour préserver le contraste */}
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

          {/* Slogans textuels */}
          <div className="relative z-10 max-w-xl space-y-4 my-auto pt-20">
            <h2 className="text-4xl font-black text-white leading-[1.15] tracking-tight">
              {t.slogan}
            </h2>
            <p className="text-sm text-slate-200 font-medium leading-relaxed max-w-xs">
              {t.subSlogan}
            </p>
          </div>

          {/* Les 3 indicateurs de fonctionnalités du bas */}
          <div className="relative z-10 grid grid-cols-3 gap-4 pt-8 border-t border-white/10">
            <div>
              <div className="h-9 w-9 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/10 mb-2">
                <Calendar className="h-4 w-4 text-white" />
              </div>
              <p className="text-[10px] font-black text-white leading-tight">
                {t.feat1Title}<br />
                <span className="font-medium text-slate-300">{t.feat1Sub}</span>
              </p>
            </div>
            <div>
              <div className="h-9 w-9 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/10 mb-2">
                <BarChart3 className="h-4 w-4 text-white" />
              </div>
              <p className="text-[10px] font-black text-white leading-tight">
                {t.feat2Title}<br />
                <span className="font-medium text-slate-300">{t.feat2Sub}</span>
              </p>
            </div>
            <div>
              <div className="h-9 w-9 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/10 mb-2">
                <Users className="h-4 w-4 text-white" />
              </div>
              <p className="text-[10px] font-black text-white leading-tight">
                {t.feat3Title}<br />
                <span className="font-medium text-slate-300">{t.feat3Sub}</span>
              </p>
            </div>
          </div>
        </div>

        {/* --- SECTION DROITE : LARGE FORMULAIRE EN DEUX COLONNES --- */}
        <div className="col-span-1 lg:col-span-7 flex flex-col items-center justify-center p-4 sm:p-8 md:p-12 relative z-10">
          
          {/* Barre d'outils supérieure (Retour + Sélecteur de langue) */}
          <div className="w-full max-w-[680px] flex items-center justify-between mb-4 px-2 relative">
            <Link href="/auth/login" className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors">
              <ArrowLeft className="h-4 w-4 stroke-[2.5]" />
              <span>{t.backToLogin}</span>
            </Link>

            {/* SÉLECTEUR DE LANGUE DYNAMIQUE */}
            <div className="relative">
              <button 
                type="button"
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 font-bold text-xs cursor-pointer transition-colors"
              >
                <Globe className="h-3.5 w-3.5 text-slate-400" />
                <span>{locale === "fr" ? "Français" : "English"}</span>
                <ChevronDown className={`h-3 w-3 text-slate-400 stroke-[2.5] transition-transform ${showLangMenu ? "rotate-180" : ""}`} />
              </button>

              {/* Menu Déroulant */}
              {showLangMenu && (
                <div className="absolute right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-lg py-1 w-28 text-xs font-semibold overflow-hidden z-30 animate-in fade-in slide-in-from-top-1">
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

          {/* Formulaire de Création de compte suspendu et élargi */}
          <div className="w-full max-w-[680px] bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xl relative z-20 transition-all">
            
            <div className="mb-6">
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">{t.title}</h1>
              <p className="text-xs font-medium text-slate-400 mt-1">{t.description}</p>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              
              {/* Grille Nom complet / Adresse e-mail */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-700 block">{t.labelFullName}</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <User className="h-4 w-4" />
                    </div>
                    <input 
                      type="text" 
                      placeholder={t.placeholderFullName} 
                      className="w-full text-xs font-semibold text-slate-800 placeholder-slate-400 pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-[#0B45D2] focus:ring-2 focus:ring-blue-100 focus:outline-hidden transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-700 block">{t.labelEmail}</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Mail className="h-4 w-4" />
                    </div>
                    <input 
                      type="email" 
                      placeholder={t.placeholderEmail} 
                      className="w-full text-xs font-semibold text-slate-800 placeholder-slate-400 pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-[#0B45D2] focus:ring-2 focus:ring-blue-100 focus:outline-hidden transition-all"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Grille Numéro de téléphone / Nom de l'hôtel */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-700 block">{t.labelPhone}</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Phone className="h-4 w-4" />
                    </div>
                    <input 
                      type="tel" 
                      placeholder={t.placeholderPhone} 
                      className="w-full text-xs font-semibold text-slate-800 placeholder-slate-400 pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-[#0B45D2] focus:ring-2 focus:ring-blue-100 focus:outline-hidden transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-700 block">{t.labelHotel}</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Building2 className="h-4 w-4" />
                    </div>
                    <input 
                      type="text" 
                      placeholder={t.placeholderHotel} 
                      className="w-full text-xs font-semibold text-slate-800 placeholder-slate-400 pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-[#0B45D2] focus:ring-2 focus:ring-blue-100 focus:outline-hidden transition-all"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Champ Mot de passe */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-700 block">{t.labelPassword}</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder={t.placeholderPassword} 
                    className="w-full text-xs font-semibold text-slate-800 placeholder-slate-400 pl-10 pr-10 py-3 rounded-xl border border-slate-200 bg-white focus:border-[#0B45D2] focus:ring-2 focus:ring-blue-100 focus:outline-hidden transition-all"
                    required
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Champ Confirmer le mot de passe */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-700 block">{t.labelConfirmPassword}</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input 
                    type={showConfirmPassword ? "text" : "password"} 
                    placeholder={t.placeholderConfirmPassword} 
                    className="w-full text-xs font-semibold text-slate-800 placeholder-slate-400 pl-10 pr-10 py-3 rounded-xl border border-slate-200 bg-white focus:border-[#0B45D2] focus:ring-2 focus:ring-blue-100 focus:outline-hidden transition-all"
                    required
                  />
                  <button 
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Bloc des exigences de sécurité du mot de passe */}
              <div className="bg-[#F1F5F9] border border-slate-100 rounded-xl p-4 text-[11px] font-semibold text-slate-600 space-y-2">
                <p className="text-[#0B45D2] font-bold">{t.pwdRequirementsTitle}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5">
                  <div className="flex items-center gap-2 text-emerald-600">
                    <Check className="h-3.5 w-3.5 stroke-[3]" /> <span>{t.reqChar}</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-600">
                    <Check className="h-3.5 w-3.5 stroke-[3]" /> <span>{t.reqUpper}</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-600">
                    <Check className="h-3.5 w-3.5 stroke-[3]" /> <span>{t.reqLower}</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-600">
                    <Check className="h-3.5 w-3.5 stroke-[3]" /> <span>{t.reqSymbol}</span>
                  </div>
                </div>
              </div>

              {/* Case d'acceptation des CGU */}
              <div className="pt-1">
                <label className="flex items-start gap-2.5 cursor-pointer text-[11px] sm:text-xs text-slate-600 hover:text-slate-800 select-none font-medium leading-normal">
                  <input 
                    type="checkbox" 
                    className="h-4 w-4 mt-0.5 rounded-md border-slate-300 text-[#0B45D2] focus:ring-[#0B45D2]/20 focus:ring-offset-0 cursor-pointer"
                    required
                  />
                  <span>
                    {t.acceptTermsPre}
                    <Link href="/legal/terms" className="text-[#0B45D2] font-bold hover:underline">{t.acceptTermsLink}</Link>
                    {t.acceptTermsAnd}
                    <Link href="/legal/privacy" className="text-[#0B45D2] font-bold hover:underline">{t.acceptTermsPrivacy}</Link>
                  </span>
                </label>
              </div>

              {/* Bouton Soumettre principal */}
              <button 
                type="submit" 
                className="w-full bg-[#0B45D2] hover:bg-[#093bb5] text-white font-bold text-xs py-3.5 rounded-xl transition-all shadow-sm flex items-center justify-center cursor-pointer"
              >
                {t.submitBtn}
              </button>

              {/* Lien d'alternative bas de page */}
              <div className="text-center pt-2 text-xs font-medium text-slate-500">
                {t.alreadyHaveAccount}{" "}
                <Link href="/auth/login" className="text-[#0B45D2] font-bold hover:underline ml-1">
                  {t.loginLink}
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