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
  ShieldCheck,
  BarChart3, 
  Users2,
  Cloud,
  ChevronDown,
  ChevronLeft,
  UserCheck,
  UserPlus,
  Globe
} from "lucide-react";

// --- DICTIONNAIRE DE TRADUCTION ÉLITE ---
const TRANSLATIONS = {
  fr: {
    back: "Retour",
    alreadyHaveAccount: "Vous avez déjà un compte ?",
    login: "Se connecter",
    join: "Rejoignez",
    sloganSub: "Créez votre compte et gérez votre hôtel plus efficacement.",
    featSecure: "Sécurisé et fiable",
    featComplete: "Gestion complète de votre hôtel",
    featMultiUser: "Accès multi-utilisateurs",
    featCloud: "Données sauvegardées en sécurité",
    title: "Créer un compte",
    subtitle: "Remplissez les informations ci-dessous pour vous inscrire",
    labelName: "Nom complet",
    placeholderName: "Entrez votre nom complet",
    labelEmail: "Adresse e-mail",
    placeholderEmail: "Entrez votre adresse e-mail",
    labelPhone: "Numéro de téléphone",
    placeholderPhone: "+229 01 00 00 00 00",
    labelHotel: "Nom de votre hôtel",
    placeholderHotel: "Entrez le nom de votre hôtel",
    labelPassword: "Mot de passe",
    placeholderPassword: "Créez un mot de passe",
    labelConfirmPassword: "Confirmer le mot de passe",
    placeholderConfirmPassword: "Confirmez votre mot de passe",
    labelRole: "Rôle principal",
    selectRole: "Sélectionnez votre rôle",
    roleOwner: "Propriétaire / Directeur d'établissement",
    roleManager: "Gestionnaire / Chef de réception",
    roleAdmin: "Administrateur Système",
    acceptTermsPre: "J'accepte les ",
    acceptTermsLink: "Conditions d'utilisation",
    acceptTermsAnd: " et la ",
    acceptTermsPrivacy: "Politique de confidentialité",
    btnSubmit: "Créer mon compte",
    or: "ou",
    btnGoogle: "Continuer avec Google",
    btnMicrosoft: "Continuer avec Microsoft",
    copyright: "© 2026 HotelPro. Tous droits réservés.",
    privacy: "Confidentialité",
    terms: "Conditions d'utilisation",
    support: "Support"
  },
  en: {
    back: "Back",
    alreadyHaveAccount: "Already have an account?",
    login: "Login",
    join: "Join",
    sloganSub: "Create your account and manage your hotel more efficiently.",
    featSecure: "Secure and reliable",
    featComplete: "Complete hotel management",
    featMultiUser: "Multi-user access",
    featCloud: "Data securely backed up",
    title: "Create an account",
    subtitle: "Fill in the information below to register",
    labelName: "Full name",
    placeholderName: "Enter your full name",
    labelEmail: "Email address",
    placeholderEmail: "Enter your email address",
    labelPhone: "Phone number",
    placeholderPhone: "+1 (555) 000-0000",
    labelHotel: "Hotel name",
    placeholderHotel: "Enter your hotel name",
    labelPassword: "Password",
    placeholderPassword: "Create a password",
    labelConfirmPassword: "Confirm password",
    placeholderConfirmPassword: "Confirm your password",
    labelRole: "Primary role",
    selectRole: "Select your role",
    roleOwner: "Owner / Property Director",
    roleManager: "Manager / Front Desk Chief",
    roleAdmin: "System Administrator",
    acceptTermsPre: "I accept the ",
    acceptTermsLink: "Terms of Service",
    acceptTermsAnd: " and the ",
    acceptTermsPrivacy: "Privacy Policy",
    btnSubmit: "Create my account",
    or: "or",
    btnGoogle: "Continue with Google",
    btnMicrosoft: "Continue with Microsoft",
    copyright: "© 2026 HotelPro. All rights reserved.",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    support: "Support"
  }
};

export default function RegisterHotelPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [locale, setLocale] = useState<"fr" | "en">("fr");
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [isLoading, setIsLoading] = useState<{ google?: boolean; microsoft?: boolean }>({});

  const t = TRANSLATIONS[locale];

  // --- DYNAMISATION DES APIS SOCIAL OAUTH ---
  const handleSocialRegister = async (provider: "google" | "microsoft") => {
    setIsLoading(prev => ({ ...prev, [provider]: true }));
    try {
      console.log(`Initialisation de l'inscription OAuth via : ${provider} [Locale: ${locale}]`);
      // Exemple d'intégration : await signIn(provider, { callbackUrl: '/dashboard' });
    } catch (error) {
      console.error(`Erreur lors de l'authentification ${provider}:`, error);
    } finally {
      setIsLoading(prev => ({ ...prev, [provider]: false }));
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F8FAFC] font-sans selection:bg-blue-500 selection:text-white">
      
      {/* CORPS PRINCIPAL */}
      <div className="grow grid grid-cols-1 lg:grid-cols-12 relative items-stretch">
        
        {/* --- SECTION GAUCHE : BANNIÈRE AVEC IMAGE hotel.png (5 COLONNES) --- */}
        <div className="hidden lg:flex lg:col-span-5 relative p-12 flex-col justify-between overflow-hidden">
          {/* Image de fond */}
          <div className="absolute inset-0 z-0">
            <Image 
              src="/hotel.png" 
              alt="HotelPro registration background" 
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-slate-950/50 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
          </div>

          {/* Logo HotelPro */}
          <div className="relative z-10 flex items-center gap-3 text-white">
            <div className="bg-white/10 p-2.5 rounded-xl backdrop-blur-md border border-white/10 shadow-sm">
              <Building2 className="h-6 w-6 text-white stroke-[2]" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight block">HotelPro</span>
              <span className="text-[10px] text-slate-200/90 font-bold block -mt-1 tracking-wide uppercase">Smart Hotel Management</span>
            </div>
          </div>

          {/* Slogan & Liste d'avantages verticaux */}
          <div className="relative z-10 space-y-6 my-auto pt-12 max-w-sm">
            <div className="space-y-3">
              <h2 className="text-4xl font-black text-white leading-tight tracking-tight">
                {t.join} <span className="text-blue-400">HotelPro</span>
              </h2>
              <p className="text-xs font-semibold text-slate-300 leading-relaxed">
                {t.sloganSub}
              </p>
            </div>

            {/* Liste à puces avec badges bleus */}
            <div className="space-y-3.5 pt-2">
              <div className="flex items-center gap-3">
                <div className="h-7 w-7 rounded-lg bg-[#0B45D2] flex items-center justify-center text-white shrink-0 shadow-xs">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <span className="text-xs font-bold text-white tracking-wide">{t.featSecure}</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="h-7 w-7 rounded-lg bg-[#0B45D2] flex items-center justify-center text-white shrink-0 shadow-xs">
                  <BarChart3 className="h-4 w-4" />
                </div>
                <span className="text-xs font-bold text-white tracking-wide">{t.featComplete}</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-7 w-7 rounded-lg bg-[#0B45D2] flex items-center justify-center text-white shrink-0 shadow-xs">
                  <Users2 className="h-4 w-4" />
                </div>
                <span className="text-xs font-bold text-white tracking-wide">{t.featMultiUser}</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-7 w-7 rounded-lg bg-[#0B45D2] flex items-center justify-center text-white shrink-0 shadow-xs">
                  <Cloud className="h-4 w-4" />
                </div>
                <span className="text-xs font-bold text-white tracking-wide">{t.featCloud}</span>
              </div>
            </div>
          </div>

          {/* Bloc d'alternative de connexion transparent tout en bas */}
          <div className="relative z-10 max-w-xs bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10 shadow-3xs">
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <p className="text-[10px] font-medium text-slate-300">{t.alreadyHaveAccount}</p>
                <p className="text-xs font-black text-white">{t.login}</p>
              </div>
              <Link 
                href="/auth/login" 
                className="h-8 w-8 rounded-lg bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
              >
                <ChevronLeft className="h-4 w-4 rotate-180 stroke-[2.5]" />
              </Link>
            </div>
          </div>
        </div>

        {/* --- SECTION DROITE : FORMULAIRE ET SOCIAL OAUTH (7 COLONNES) --- */}
        <div className="col-span-1 lg:col-span-7 flex flex-col items-center justify-center p-4 sm:p-8 md:p-10 relative z-10">
          
          {/* Barre supérieure d'outils (Retour + Sélecteur de langue interactif) */}
          <div className="w-full max-w-[690px] lg:-ml-16 xl:-ml-24 flex items-center justify-between mb-4 px-2 relative">
            <Link 
              href="/auth/login" 
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 font-bold text-[11px] shadow-3xs transition-all"
            >
              <ChevronLeft className="h-3.5 w-3.5 stroke-[2.5]" />
              <span>{t.back}</span>
            </Link>

            {/* SÉLECTEUR DE LANGUE DYNAMIQUE */}
            <div className="relative">
              <button 
                type="button"
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 font-bold text-[11px] shadow-3xs transition-all cursor-pointer"
              >
                <Globe className="h-3.5 w-3.5 text-slate-400" />
                <span>{locale === "fr" ? "Français" : "English"}</span>
                <ChevronDown className={`h-3 w-3 text-slate-400 stroke-[2.5] transition-transform ${showLangMenu ? "rotate-180" : ""}`} />
              </button>

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

          {/* Card principale de création de compte hôtelier */}
          <div className="w-full max-w-[690px] bg-white rounded-3xl border border-slate-200/70 p-6 sm:p-9 shadow-xl lg:-ml-16 xl:-ml-24 relative z-20 transition-all">
            
            <div className="text-center mb-6 space-y-1">
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">{t.title}</h1>
              <p className="text-xs font-medium text-slate-400">{t.subtitle}</p>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              
              {/* Ligne 1 : Nom Complet / Adresse E-mail */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-700 block">{t.labelName}</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-444">
                      <User className="h-4 w-4 text-slate-400" />
                    </div>
                    <input 
                      type="text" 
                      placeholder={t.placeholderName} 
                      className="w-full text-xs font-semibold text-slate-800 placeholder-slate-400 pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:border-[#0B45D2] focus:ring-2 focus:ring-blue-100 focus:outline-hidden transition-all"
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
                      className="w-full text-xs font-semibold text-slate-800 placeholder-slate-400 pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:border-[#0B45D2] focus:ring-2 focus:ring-blue-100 focus:outline-hidden transition-all"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Ligne 2 : Numéro de téléphone / Nom de votre hôtel */}
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
                      className="w-full text-xs font-semibold text-slate-800 placeholder-slate-400 pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:border-[#0B45D2] focus:ring-2 focus:ring-blue-100 focus:outline-hidden transition-all"
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
                      className="w-full text-xs font-semibold text-slate-800 placeholder-slate-400 pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:border-[#0B45D2] focus:ring-2 focus:ring-blue-100 focus:outline-hidden transition-all"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Ligne 3 : Mot de passe / Confirmer le mot de passe */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-700 block">{t.labelPassword}</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Lock className="h-4 w-4" />
                    </div>
                    <input 
                      type={showPassword ? "text" : "password"} 
                      placeholder={t.placeholderPassword} 
                      className="w-full text-xs font-semibold text-slate-800 placeholder-slate-400 pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 bg-white focus:border-[#0B45D2] focus:ring-2 focus:ring-blue-100 focus:outline-hidden transition-all"
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

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-700 block">{t.labelConfirmPassword}</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Lock className="h-4 w-4" />
                    </div>
                    <input 
                      type={showConfirmPassword ? "text" : "password"} 
                      placeholder={t.placeholderConfirmPassword} 
                      className="w-full text-xs font-semibold text-slate-800 placeholder-slate-400 pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 bg-white focus:border-[#0B45D2] focus:ring-2 focus:ring-blue-100 focus:outline-hidden transition-all"
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
              </div>

              {/* Rôle principal avec options traduites */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-700 block">{t.labelRole}</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <UserCheck className="h-4 w-4" />
                  </div>
                  <select 
                    className="w-full text-xs font-semibold text-slate-800 pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 bg-white focus:border-[#0B45D2] focus:ring-2 focus:ring-blue-100 focus:outline-hidden appearance-none cursor-pointer transition-all"
                    defaultValue=""
                    required
                  >
                    <option value="" disabled>{t.selectRole}</option>
                    <option value="proprietaire">{t.roleOwner}</option>
                    <option value="manager">{t.roleManager}</option>
                    <option value="administrateur">{t.roleAdmin}</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
                    <ChevronDown className="h-4 w-4 stroke-[2.5]" />
                  </div>
                </div>
              </div>

              {/* Checkbox CGU & Confidentialité */}
              <div className="pt-1">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-600 hover:text-slate-800 select-none font-medium leading-normal">
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

              {/* Bouton de Soumission */}
              <button 
                type="submit" 
                className="w-full bg-[#0B45D2] hover:bg-[#093bb5] text-white font-bold text-xs py-3 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 mt-2 cursor-pointer"
              >
                <UserPlus className="h-4 w-4" />
                <span>{t.btnSubmit}</span>
              </button>

              {/* Séparateur social */}
              <div className="relative flex py-1 items-center">
                <div className="grow border-t border-slate-200"></div>
                <span className="flex-shrink mx-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">{t.or}</span>
                <div className="grow border-t border-slate-200"></div>
              </div>

              {/* BOUTONS SOCIAL OAUTH DYNAMISÉS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Bouton Google */}
                <button 
                  type="button" 
                  disabled={isLoading.google || isLoading.microsoft}
                  onClick={() => handleSocialRegister("google")}
                  className="flex items-center justify-center gap-2.5 bg-white hover:bg-slate-50 disabled:opacity-60 disabled:cursor-not-allowed border border-slate-200 text-slate-700 font-bold text-xs py-2.5 rounded-xl transition-colors shadow-3xs cursor-pointer"
                >
                  {isLoading.google ? (
                    <div className="h-4 w-4 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
                  ) : (
                    <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
                      <path fill="#EA4335" d="M12 5.04c1.64 0 3.12.56 4.28 1.67l3.2-3.2C17.52 1.58 14.92 1 12 1 7.35 1 3.42 3.67 1.48 7.56l3.78 2.93c.89-2.67 3.39-4.45 6.74-4.45z"/>
                      <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.46c-.29 1.48-1.14 2.73-2.42 3.57l3.73 2.89c2.18-2.01 3.46-4.97 3.46-8.61z"/>
                      <path fill="#FBBC05" d="M5.26 14.71a7.1 7.1 0 0 1 0-4.42L1.48 7.36a11.95 11.95 0 0 0 0 9.28l3.78-2.93z"/>
                      <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.92l-3.73-2.89c-1.04.7-2.38 1.11-4.23 1.11-3.35 0-5.85-1.78-6.74-4.45L1.48 16.78C3.42 20.33 7.35 23 12 23z"/>
                    </svg>
                  )}
                  <span>{t.btnGoogle}</span>
                </button>

                {/* Bouton Microsoft */}
                <button 
                  type="button" 
                  disabled={isLoading.google || isLoading.microsoft}
                  onClick={() => handleSocialRegister("microsoft")}
                  className="flex items-center justify-center gap-2.5 bg-white hover:bg-slate-50 disabled:opacity-60 disabled:cursor-not-allowed border border-slate-200 text-slate-700 font-bold text-xs py-2.5 rounded-xl transition-colors shadow-3xs cursor-pointer"
                >
                  {isLoading.microsoft ? (
                    <div className="h-4 w-4 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
                  ) : (
                    <svg className="h-4 w-4 shrink-0" viewBox="0 0 23 23">
                      <path fill="#f35325" d="M0 0h11v11H0z"/>
                      <path fill="#80bb00" d="M12 0h11v11H12z"/>
                      <path fill="#00a1f1" d="M0 12h11v11H0z"/>
                      <path fill="#ffb900" d="M12 12h11v11H12z"/>
                    </svg>
                  )}
                  <span>{t.btnMicrosoft}</span>
                </button>
              </div>

            </form>
          </div>

        </div>
      </div>

      {/* --- FOOTER GLOBAL --- */}
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