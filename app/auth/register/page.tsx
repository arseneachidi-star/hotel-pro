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

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F8FAFC]">
      
      {/* CORPS PRINCIPAL DE LA PAGE */}
      <div className="grow grid grid-cols-1 lg:grid-cols-12 relative items-stretch">
        
        {/* --- SECTION GAUCHE : ILLUSTRATION HÔTEL (5 COLONNES SUR 12 POUR LAISSER PLUS DE PLACE AU FORMULAIRE) --- */}
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

          {/* Slogans textuels adaptés à la maquette de création de compte */}
          <div className="relative z-10 max-w-xl space-y-4 my-auto pt-20">
            <h2 className="text-4xl font-black text-white leading-[1.15] tracking-tight">
              Rejoignez HotelPro
            </h2>
            <p className="text-sm text-slate-200 font-medium leading-relaxed max-w-xs">
              Créez votre compte et simplifiez la gestion de votre hôtel dès aujourd'hui.
            </p>
          </div>

          {/* Les 3 indicateurs de fonctionnalités du bas */}
          <div className="relative z-10 grid grid-cols-3 gap-4 pt-8 border-t border-white/10">
            <div>
              <div className="h-9 w-9 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/10 mb-2">
                <Calendar className="h-4 w-4 text-white" />
              </div>
              <p className="text-[10px] font-black text-white leading-tight">
                Réservations<br />
                <span className="font-medium text-slate-300">en temps réel</span>
              </p>
            </div>
            <div>
              <div className="h-9 w-9 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/10 mb-2">
                <BarChart3 className="h-4 w-4 text-white" />
              </div>
              <p className="text-[10px] font-black text-white leading-tight">
                Tableaux de bord<br />
                <span className="font-medium text-slate-300">et rapports</span>
              </p>
            </div>
            <div>
              <div className="h-9 w-9 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/10 mb-2">
                <Users className="h-4 w-4 text-white" />
              </div>
              <p className="text-[10px] font-black text-white leading-tight">
                Expérience client<br />
                <span className="font-medium text-slate-300">optimisée</span>
              </p>
            </div>
          </div>
        </div>

        {/* --- SECTION DROITE : LARGE FORMULAIRE EN DEUX COLONNES (7 COLONNES SUR 12) --- */}
        <div className="col-span-1 lg:col-span-7 flex flex-col items-center justify-center p-4 sm:p-8 md:p-12 relative z-10">
          
          {/* Barre d'outils supérieure (Retour + Langue) */}
          <div className="w-full max-w-[680px] flex items-center justify-between mb-4 px-2">
            <Link href="/auth/login" className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors">
              <ArrowLeft className="h-4 w-4 stroke-[2.5]" />
              <span>Retour à la connexion</span>
            </Link>

            <div className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 font-bold text-xs cursor-pointer transition-colors">
              <Globe className="h-3.5 w-3.5 text-slate-400" />
              <span>Français</span>
              <ChevronDown className="h-3 w-3 text-slate-400 stroke-[2.5]" />
            </div>
          </div>

          {/* Formulaire de Création de compte suspendu et élargi */}
          <div className="w-full max-w-[680px] bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xl relative z-20 transition-all">
            
            <div className="mb-6">
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">Créer un compte</h1>
              <p className="text-xs font-medium text-slate-400 mt-1">Remplissez les informations ci-dessous pour créer votre compte</p>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              
              {/* Grille Nom complet / Adresse e-mail */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-700 block">Nom complet</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <User className="h-4 w-4" />
                    </div>
                    <input 
                      type="text" 
                      placeholder="Entrez votre nom complet" 
                      className="w-full text-xs font-semibold text-slate-800 placeholder-slate-400 pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-[#0B45D2] focus:ring-2 focus:ring-blue-100 focus:outline-hidden transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-700 block">Adresse e-mail</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Mail className="h-4 w-4" />
                    </div>
                    <input 
                      type="email" 
                      placeholder="Entrez votre adresse e-mail" 
                      className="w-full text-xs font-semibold text-slate-800 placeholder-slate-400 pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-[#0B45D2] focus:ring-2 focus:ring-blue-100 focus:outline-hidden transition-all"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Grille Numéro de téléphone / Nom de l'hôtel */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-700 block">Numéro de téléphone</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Phone className="h-4 w-4" />
                    </div>
                    <input 
                      type="tel" 
                      placeholder="Entrez votre numéro" 
                      className="w-full text-xs font-semibold text-slate-800 placeholder-slate-400 pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-[#0B45D2] focus:ring-2 focus:ring-blue-100 focus:outline-hidden transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-700 block">Nom de l'hôtel / Établissement</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Building2 className="h-4 w-4" />
                    </div>
                    <input 
                      type="text" 
                      placeholder="Entrez le nom de votre hôtel" 
                      className="w-full text-xs font-semibold text-slate-800 placeholder-slate-400 pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-[#0B45D2] focus:ring-2 focus:ring-blue-100 focus:outline-hidden transition-all"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Champ Mot de passe */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-700 block">Mot de passe</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Créez un mot de passe" 
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

              {/* Champ Confirmer le mot de passe */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-700 block">Confirmer le mot de passe</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input 
                    type={showConfirmPassword ? "text" : "password"} 
                    placeholder="Confirmez votre mot de passe" 
                    className="w-full text-xs font-semibold text-slate-800 placeholder-slate-400 pl-10 pr-10 py-3 rounded-xl border border-slate-200 bg-white focus:border-[#0B45D2] focus:ring-2 focus:ring-blue-100 focus:outline-hidden transition-all"
                    required
                  />
                  <button 
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Bloc des exigences de sécurité du mot de passe */}
              <div className="bg-[#F1F5F9] border border-slate-100 rounded-xl p-4 text-[11px] font-semibold text-slate-600 space-y-2">
                <p className="text-[#0B45D2] font-bold">Le mot de passe doit contenir :</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5">
                  <div className="flex items-center gap-2 text-emerald-600">
                    <Check className="h-3.5 w-3.5 stroke-[3]" /> <span>Au moins 8 caractères</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-600">
                    <Check className="h-3.5 w-3.5 stroke-[3]" /> <span>Une lettre majuscule</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-600">
                    <Check className="h-3.5 w-3.5 stroke-[3]" /> <span>Une lettre minuscule</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-600">
                    <Check className="h-3.5 w-3.5 stroke-[3]" /> <span>Un chiffre ou un symbole</span>
                  </div>
                </div>
              </div>

              {/* Case d'acceptation des CGU */}
              <div className="pt-1">
                <label className="flex items-start gap-2.5 cursor-pointer text-[11px] sm:text-xs text-slate-600 hover:text-slate-800 select-none font-medium leading-normal">
                  <input 
                    type="checkbox" 
                    className="h-4 w-4 mt-0.5 rounded-md border-slate-300 text-[#0B45D2] focus:ring-[#0B45D2]/20 focus:ring-offset-0"
                    required
                  />
                  <span>
                    J'accepte les <Link href="/legal/terms" className="text-[#0B45D2] font-bold hover:underline">Conditions d'utilisation</Link> et la <Link href="/legal/privacy" className="text-[#0B45D2] font-bold hover:underline">Politique de confidentialité</Link>
                  </span>
                </label>
              </div>

              {/* Bouton Soumettre principal */}
              <button 
                type="submit" 
                className="w-full bg-[#0B45D2] hover:bg-[#093bb5] text-white font-bold text-xs py-3.5 rounded-xl transition-all shadow-sm block text-center pt-2"
              >
                Créer mon compte
              </button>

              {/* Lien d'alternative bas de page */}
              <div className="text-center pt-2 text-xs font-medium text-slate-500">
                Vous avez déjà un compte ?{" "}
                <Link href="/auth/login" className="text-[#0B45D2] font-bold hover:underline ml-1">
                  Se connecter
                </Link>
              </div>

            </form>
          </div>

        </div>
      </div>

      {/* --- FOOTER GLOBAL DE LA PAGE --- */}
      <div className="bg-white border-t border-slate-200 px-6 sm:px-12 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-semibold text-slate-400 relative z-30">
        <div>
          © 2026 HotelPro. Tous droits réservés.
        </div>
        <div className="flex items-center gap-4 sm:gap-6 text-slate-500">
          <Link href="/legal/privacy" className="hover:text-slate-800 transition-colors">Confidentialité</Link>
          <span className="text-slate-200 font-light">|</span>
          <Link href="/legal/terms" className="hover:text-slate-800 transition-colors">Conditions d'utilisation</Link>
          <span className="text-slate-200 font-light">|</span>
          <Link href="/support" className="hover:text-slate-800 transition-colors">Support</Link>
        </div>
      </div>

    </div>
  );
}

