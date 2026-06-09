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
  Send
} from "lucide-react";

export default function ForgotPasswordPage() {
  const [deliveryMethod, setDeliveryMethod] = useState<"email" | "sms">("email");

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F8FAFC]">
      
      {/* CORPS PRINCIPAL DE LA PAGE */}
      <div className="grow grid grid-cols-1 lg:grid-cols-12 relative items-stretch">
        
        {/* --- SECTION GAUCHE : ILLUSTRATION HÔTEL (7 COLONNES SUR 12) --- */}
        <div className="hidden lg:flex lg:col-span-7 relative p-12 flex-col justify-between overflow-hidden">
          {/* Image de fond issue du dossier public */}
          <div className="absolute inset-0 z-0">
            <Image 
              src="/hotel2.jpg" 
              alt="HotelPro background" 
              fill
              priority
              className="object-cover"
            />
            {/* Filtres sombres pour le contraste des textes blancs */}
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

          {/* Slogans textuels centrés verticalement (Fidèle à Mot de passe oublié-1.png) */}
          <div className="relative z-10 max-w-xl space-y-4 my-auto pt-20">
            <h2 className="text-4xl font-black text-white leading-[1.15] tracking-tight">
              Simplifiez la gestion<br />de votre hôtel
            </h2>
            <p className="text-sm text-slate-200 font-medium leading-relaxed max-w-md">
              Gérez vos réservations, vos clients et vos opérations en toute simplicité.
            </p>
          </div>

          {/* Les 3 indicateurs de fonctionnalités du bas */}
          <div className="relative z-10 grid grid-cols-3 gap-4 pt-8 border-t border-white/10">
            <div className="flex flex-col gap-2">
              <div className="h-9 w-9 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/10">
                <Calendar className="h-4 w-4 text-white" />
              </div>
              <p className="text-[11px] font-black text-white leading-tight">
                Réservations<br />
                <span className="font-medium text-slate-300">en temps réel</span>
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="h-9 w-9 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/10">
                <BarChart3 className="h-4 w-4 text-white" />
              </div>
              <p className="text-[11px] font-black text-white leading-tight">
                Tableaux de bord<br />
                <span className="font-medium text-slate-300">et rapports</span>
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="h-9 w-9 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/10">
                <Users className="h-4 w-4 text-white" />
              </div>
              <p className="text-[11px] font-black text-white leading-tight">
                Expérience client<br />
                <span className="font-medium text-slate-300">optimisée</span>
              </p>
            </div>
          </div>
        </div>

        {/* --- SECTION DROITE : FORMULAIRE DE RÉCUPÉRATION (5 COLONNES SUR 12) --- */}
        <div className="col-span-1 lg:col-span-5 flex flex-col items-center justify-center p-6 sm:p-12 relative z-10">
          
          {/* Barre supérieure d'outils (Retour + Langue) */}
          <div className="w-full max-w-[440px] flex items-center justify-between mb-4 text-slate-600 font-bold text-xs">
            <Link href="/auth/login" className="flex items-center gap-2 hover:text-slate-900 transition-colors">
              <ArrowLeft className="h-4 w-4 stroke-[2.5]" />
              <span>Retour à la connexion</span>
            </Link>

            <div className="flex items-center gap-1.5 hover:text-slate-900 cursor-pointer transition-colors">
              <Globe className="h-3.5 w-3.5 text-slate-400" />
              <span>Français</span>
              <ChevronDown className="h-3 w-3 text-slate-400 stroke-[2.5]" />
            </div>
          </div>

          {/* Formulaire suspendu */}
          <div className="w-full max-w-[440px] bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-xl lg:-ml-20 xl:-ml-28 relative z-20 transition-all">
            
            <div className="text-center mb-8 space-y-2">
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">Mot de passe oublié ?</h1>
              <p className="text-xs font-medium text-slate-400 leading-relaxed max-w-[320px] mx-auto">
                Entrez votre adresse e-mail ou votre numéro de téléphone. Nous vous enverrons un code de réinitialisation.
              </p>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
              
              {/* Saisie Identifiant (E-mail ou Téléphone) */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-700 block">E-mail ou numéro de téléphone</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="h-4 w-4" />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Entrez votre e-mail ou numéro de téléphone" 
                    className="w-full text-xs font-semibold text-slate-800 placeholder-slate-400 pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-[#0B45D2] focus:ring-2 focus:ring-blue-100 focus:outline-hidden transition-all"
                    required
                  />
                </div>
              </div>

              {/* Sélecteur du mode de réception (Boutons Radio customisés) */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-700 block">Choisissez le mode de réception</label>
                <div className="grid grid-cols-2 gap-3">
                  
                  {/* Option E-mail */}
                  <div 
                    onClick={() => setDeliveryMethod("email")}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition-all select-none ${
                      deliveryMethod === "email" 
                        ? "border-[#0B45D2] bg-blue-50/20 text-[#0B45D2]" 
                        : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <div className="relative flex items-center justify-center shrink-0">
                      {deliveryMethod === "email" ? (
                        <CheckCircle2 className="h-4 w-4 text-[#0B45D2] fill-blue-100" />
                      ) : (
                        <div className="h-4 w-4 rounded-full border border-slate-300 bg-white" />
                      )}
                    </div>
                    <Mail className="h-4 w-4 shrink-0" />
                    <span className="text-xs font-bold tracking-tight">Recevoir par e-mail</span>
                  </div>

                  {/* Option SMS */}
                  <div 
                    onClick={() => setDeliveryMethod("sms")}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition-all select-none ${
                      deliveryMethod === "sms" 
                        ? "border-[#0B45D2] bg-blue-50/20 text-[#0B45D2]" 
                        : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <div className="relative flex items-center justify-center shrink-0">
                      {deliveryMethod === "sms" ? (
                        <CheckCircle2 className="h-4 w-4 text-[#0B45D2] fill-blue-100" />
                      ) : (
                        <div className="h-4 w-4 rounded-full border border-slate-300 bg-white" />
                      )}
                    </div>
                    <Phone className="h-4 w-4 shrink-0" />
                    <span className="text-xs font-bold tracking-tight">Recevoir par SMS</span>
                  </div>

                </div>
              </div>

              {/* Bouton d'envoi du code */}
              <button 
                type="submit" 
                className="w-full bg-[#0B45D2] hover:bg-[#093bb5] text-white font-bold text-xs py-3.5 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Envoyer le code</span>
              </button>

              {/* Séparateur horizontal "ou" */}
              <div className="relative flex py-1 items-center">
                <div className="grow border-t border-slate-200"></div>
                <span className="flex-shrink mx-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">ou</span>
                <div className="grow border-t border-slate-200"></div>
              </div>

              {/* Lien alternatif de retour */}
              <div className="text-center">
                <Link href="/auth/login" className="text-xs font-bold text-[#0B45D2] hover:underline">
                  Retour à la connexion
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

