"use client";

import React from "react";
import { 
  Bell, 
  Calendar, 
  CreditCard, 
  AlertTriangle, 
  Wrench, 
  UserCheck, 
  Star, 
  Info, 
  Check, 
  SlidersHorizontal, 
  MoreVertical,
  ChevronRight,
  Mail,
  MessageSquare,
  ShieldCheck,
  Settings,
  History
} from "lucide-react";

// Données de la liste centrale de la maquette
const notificationsList = [
  {
    id: 1,
    title: "Nouvelle réservation",
    desc: "Une nouvelle réservation #RES-2024-1458 a été créée par Jean Dupont",
    subDesc: "Chambre 101 - 15/05/2024 au 18/05/2024",
    time: "Il y a 5 min",
    unread: true,
    icon: Calendar,
    iconClass: "bg-[#10B981] text-white", // Vert
  },
  {
    id: 2,
    title: "Paiement en attente",
    desc: "Le paiement de la facture #FAC-2024-1456 est en attente depuis 2 jours",
    subDesc: "Client : Paul Bernard - Montant : 75 000 XOF",
    time: "Il y a 1 heure",
    unread: true,
    icon: CreditCard,
    iconClass: "bg-[#F59E0B] text-white", // Orange/Jaune
  },
  {
    id: 3,
    title: "Chambre en maintenance",
    desc: "La chambre 203 est en maintenance depuis 1 jour",
    subDesc: "Type : Deluxe - Signalé par : Service technique",
    time: "Il y a 2 heures",
    unread: true,
    icon: AlertTriangle,
    iconClass: "bg-[#EF4444] text-white", // Rouge
  },
  {
    id: 4,
    title: "Chambre à nettoyer",
    desc: "La chambre 105 doit être nettoyée",
    subDesc: "Départ : Marie Martin - Départ prévu : 11/05/2024",
    time: "Il y a 3 heures",
    unread: true,
    icon: Wrench,
    iconClass: "bg-[#F59E0B] text-white", // Orange
  },
  {
    id: 5,
    title: "Check-in effectué",
    desc: "Le client Sophie Leroy a effectué son check-in",
    subDesc: "Chambre 102 - 20/05/2024",
    time: "Il y a 4 heures",
    unread: false,
    icon: UserCheck,
    iconClass: "bg-[#2563EB] text-white", // Bleu
  },
  {
    id: 6,
    title: "Nouvel avis client",
    desc: "Un nouveau commentaire a été laissé par Lucas Moreau",
    subDesc: "★★★★★ 4.5/5 - Hôtel Paradise",
    time: "Il y a 1 jour",
    unread: true,
    icon: Star,
    iconClass: "bg-[#8B5CF6] text-white", // Violet
  },
  {
    id: 7,
    title: "Mise à jour système",
    desc: "Le système a été mis à jour avec succès vers la version 2.1.0",
    subDesc: "Nouvelles fonctionnalités et améliorations",
    time: "Il y a 1 jour",
    unread: false,
    icon: Info,
    iconClass: "bg-[#3B82F6] text-white", // Bleu ciel
  },
];

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Notifications & Alertes</h1>
          <p className="text-[11px] text-slate-400 mt-0.5">Gérez et suivez toutes les notifications et alertes en temps réel</p>
        </div>

        <button className="flex items-center gap-1.5 bg-[#0B45D2] hover:bg-[#093bb5] text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-3xs transition-colors self-start sm:self-auto">
          <Check className="h-4 w-4 stroke-[2.5]" /> Marquer tout comme lu
        </button>
      </div>

      {/* --- MAIN GRID CONTENT --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LE BLOC CENTRAL : LISTE DES NOTIFICATIONS (8 COLONNES) */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Barre de Filtres / Onglets */}
          <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl p-2 shadow-3xs overflow-x-auto whitespace-nowrap scrollbar-none">
            <div className="flex items-center gap-1">
              <button className="px-3.5 py-1.5 text-xs font-bold rounded-lg bg-blue-50 text-[#0B45D2]">Toutes (12)</button>
              <button className="px-3.5 py-1.5 text-xs font-bold rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-50">Non lues (12)</button>
              <button className="px-3.5 py-1.5 text-xs font-bold rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-50">Importantes (4)</button>
              <button className="px-3.5 py-1.5 text-xs font-bold rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-50">Système (3)</button>
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 text-slate-700 text-xs font-bold rounded-lg bg-white shadow-3xs ml-4">
              <SlidersHorizontal className="h-3.5 w-3.5 text-slate-400" /> Filtres
            </button>
          </div>

          {/* Liste Principale */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-xs divide-y divide-slate-100 overflow-hidden">
            {notificationsList.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.id} className="p-4 flex items-center justify-between gap-4 font-semibold text-xs text-slate-600 hover:bg-slate-50/30 transition-colors">
                  <div className="flex items-center gap-4 flex-1">
                    {/* Icône Ronde Colorée */}
                    <div className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 ${item.iconClass}`}>
                      <Icon className="h-4 w-4 stroke-[2.5]" />
                    </div>

                    {/* Textes descriptifs */}
                    <div className="space-y-0.5">
                      <h4 className="text-slate-900 font-black text-xs">{item.title}</h4>
                      <p className="text-slate-600 font-medium text-[11px] leading-relaxed">{item.desc}</p>
                      <p className="text-[10px] text-slate-400 font-medium">{item.subDesc}</p>
                    </div>
                  </div>

                  {/* Côté Droit : Temps, Badge Non Lu & Actions */}
                  <div className="flex items-center gap-4 shrink-0">
                    <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap">{item.time}</span>
                    
                    {/* Indicateur point bleu */}
                    <div className="w-2 flex justify-center">
                      {item.unread && (
                        <span className="h-2 w-2 rounded-full bg-[#0B45D2]" />
                      )}
                    </div>

                    <button className="text-slate-300 hover:text-slate-500 p-1">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination du bas identique à la maquette */}
          <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl p-3 shadow-3xs font-semibold text-[11px] text-slate-400">
            <span>Affichage de 1 à 7 sur 12 notifications</span>
            <div className="flex items-center gap-1">
              <button className="h-6 w-6 border border-slate-200 rounded-md bg-white flex items-center justify-center text-slate-400 disabled:opacity-50">{"<"}</button>
              <button className="h-6 w-6 rounded-md bg-[#0B45D2] text-white flex items-center justify-center font-bold">1</button>
              <button className="h-6 w-6 border border-slate-200 rounded-md bg-white text-slate-600 flex items-center justify-center hover:bg-slate-50">2</button>
              <button className="h-6 w-6 border border-slate-200 rounded-md bg-white flex items-center justify-center text-slate-400">{">"}</button>
            </div>
          </div>

        </div>

        {/* --- LE BLOC DE DROITE : SIDEBAR DE STATUTS & PRÉFÉRENCES (4 COLONNES) --- */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Section 1 : Aperçu des alertes */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-3xs space-y-3">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Aperçu des alertes</h3>
            <div className="space-y-2">
              {[
                { label: "Importantes", count: 4, icon: Bell, bg: "bg-rose-50 text-[#EF4444]" },
                { label: "En attente", count: 5, icon: Bell, bg: "bg-amber-50 text-[#F59E0B]" },
                { label: "Système", count: 3, icon: Info, bg: "bg-blue-50 text-[#3B82F6]" },
                { label: "Résolues", count: 128, icon: Check, bg: "bg-emerald-50 text-[#10B981]" },
              ].map((row, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 hover:bg-slate-50/50 rounded-lg border border-transparent hover:border-slate-100 transition-colors cursor-pointer group text-xs font-semibold text-slate-600">
                  <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded-lg ${row.bg}`}>
                      <row.icon className="h-3.5 w-3.5 stroke-[2.5]" />
                    </div>
                    <span className="text-slate-700">{row.label}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-900 font-black">{row.count}</span>
                    <ChevronRight className="h-3.5 w-3.5 text-slate-300 group-hover:text-slate-400 transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2 : Canaux de notification */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-3xs space-y-3">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Canaux de notification</h3>
            <div className="space-y-3 text-xs font-semibold text-slate-600">
              {[
                { label: "Email", icon: Mail },
                { label: "SMS", icon: MessageSquare },
                { label: "Notifications push", icon: Bell },
              ].map((channel, idx) => (
                <div key={idx} className="flex items-center justify-between py-0.5">
                  <div className="flex items-center gap-3">
                    <channel.icon className="h-4 w-4 text-slate-400 stroke-[2]" />
                    <span className="text-slate-700">{channel.label}</span>
                  </div>
                  <span className="text-[10px] font-black text-[#10B981] bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100 uppercase tracking-wide">Actif</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3 : Paramètres rapides */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-3xs space-y-3">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Paramètres rapides</h3>
            <div className="space-y-1 text-xs font-semibold text-slate-700">
              {[
                { label: "Gérer les préférences", icon: Settings },
                { label: "Règles d'alertes", icon: ShieldCheck },
                { label: "Historique des alertes", icon: History },
              ].map((param, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 hover:bg-slate-50 text-slate-600 rounded-lg cursor-pointer transition-colors group">
                  <div className="flex items-center gap-3">
                    <param.icon className="h-4 w-4 text-slate-400 group-hover:text-[#0B45D2] transition-colors" />
                    <span>{param.label}</span>
                  </div>
                  <ChevronRight className="h-3.5 w-3.5 text-slate-300 group-hover:text-slate-400" />
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

