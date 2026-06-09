"use client";

import React from "react";
import { 
  MessageSquare, 
  Star, 
  Smile, 
  Meh, 
  Frown, 
  SlidersHorizontal, 
  Calendar, 
  CornerUpLeft, 
  MoreVertical,
  ChevronDown
} from "lucide-react";

// Statistiques des cartes supérieures
const statCards = [
  { id: "total", title: "Total des avis", value: "128", sub: "+12 ce mois-ci", subColor: "text-emerald-500", icon: MessageSquare, iconBg: "bg-blue-50 text-blue-500" },
  { id: "rating", title: "Note moyenne", value: "4.6 / 5", sub: "+0.2 ce mois-ci", subColor: "text-emerald-500", icon: Star, iconBg: "bg-emerald-50 text-emerald-500" },
  { id: "positive", title: "Avis positifs", value: "98", sub: "76.6%", subColor: "text-slate-500", icon: Smile, iconBg: "bg-purple-50 text-purple-500" },
  { id: "neutral", title: "Avis neutres", value: "18", sub: "14.1%", subColor: "text-slate-500", icon: Meh, iconBg: "bg-amber-50 text-amber-500" },
  { id: "negative", title: "Avis négatifs", value: "12", sub: "9.3%", subColor: "text-slate-500", icon: Frown, iconBg: "bg-rose-50 text-rose-500" },
];

// Liste des avis récents (Bloc gauche)
const avisRecents = [
  { client: "Jean Dupont", room: "Chambre 101", rating: 5, comment: "Excellent séjour ! Le personnel était très accueillant et la chambre était parfaite.", sentiment: "Positif", badgeClass: "bg-emerald-50 text-emerald-600 border-emerald-100", date: "10/06/2024" },
  { client: "Marie Martin", room: "Chambre 205", rating: 3, comment: "Très bon hôtel, bien situé. Petit bémol sur le bruit dans les couloirs.", sentiment: "Neutre", badgeClass: "bg-amber-50 text-amber-600 border-amber-100", date: "10/06/2024" },
  { client: "Paul Durand", room: "Chambre 302", rating: 5, comment: "Séjour agréable, tout était parfait. Je reviendrai avec plaisir.", sentiment: "Positif", badgeClass: "bg-emerald-50 text-emerald-600 border-emerald-100", date: "09/06/2024" },
  { client: "Sophie Leroy", room: "Chambre 103", rating: 3, comment: "Le service était correct mais la chambre pourrait être plus propre.", sentiment: "Neutre", badgeClass: "bg-amber-50 text-amber-600 border-amber-100", date: "09/06/2024" },
  { client: "Thomas Petit", room: "Chambre 202", rating: 1, comment: "Déçu par le séjour. Problème avec la climatisation et le service client.", sentiment: "Négatif", badgeClass: "bg-rose-50 text-rose-600 border-rose-100", date: "08/06/2024" },
];

// Notes par catégorie (Bloc droit)
const categoriesRating = [
  { label: "Propreté", score: 4.7, percent: "94%", color: "bg-emerald-500" },
  { label: "Confort", score: 4.5, percent: "90%", color: "bg-emerald-500" },
  { label: "Emplacement", score: 4.8, percent: "96%", color: "bg-emerald-500" },
  { label: "Service", score: 4.6, percent: "92%", color: "bg-emerald-500" },
  { label: "Rapport qualité/prix", score: 4.2, percent: "84%", color: "bg-blue-600" },
];

export default function GestionAvisClientsPage() {
  return (
    <div className="space-y-6">
      
      {/* --- EN-TÊTE DE LA PAGE --- */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Gestion des avis clients</h1>
          <p className="text-[11px] text-slate-400 mt-0.5">Accueil  /  Avis Clients</p>
        </div>

        {/* Boutons d'actions supérieurs */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
          <button className="flex items-center gap-1.5 bg-[#0B45D2] hover:bg-[#093bb5] text-white px-3 py-2 rounded-lg shadow-3xs transition-colors">
            <CornerUpLeft className="h-3.5 w-3.5" /> Répondre à un avis
          </button>
          <button className="flex items-center gap-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-3 py-2 rounded-lg shadow-3xs transition-colors">
            <SlidersHorizontal className="h-3.5 w-3.5 text-slate-400" /> Filtrer
          </button>
          <div className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-2 rounded-lg text-slate-600 shadow-3xs">
            <Calendar className="h-3.5 w-3.5 text-slate-400" />
            <span>10 Juin 2024 - 16 Juin 2024</span>
          </div>
        </div>
      </div>

      {/* --- STATS CARDS (5 COLONNES) --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.id} className="bg-white border border-slate-200 rounded-xl p-4 shadow-3xs flex items-center gap-3.5">
              <div className={`p-2.5 rounded-full ${card.iconBg} shrink-0`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide block">{card.title}</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xl font-black text-slate-900 tracking-tight">{card.value}</span>
                  <span className={`text-[10px] font-bold ${card.subColor}`}>{card.sub}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* --- CONTENU SPLIT CENTRAL --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* BLOC GAUCHE : AVIS RÉCENTS (7 COLONNES) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden flex flex-col justify-between">
          <div>
            <div className="p-4 border-b border-slate-100">
              <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Avis récents</h3>
            </div>

            <div className="divide-y divide-slate-100">
              {avisRecents.map((item, i) => (
                <div key={i} className="p-4 flex flex-col sm:flex-row items-start gap-4 hover:bg-slate-50/20 font-semibold text-xs text-slate-600">
                  {/* Profil Client */}
                  <div className="flex items-center gap-2.5 sm:w-36 shrink-0">
                    <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-700 text-xs">
                      {item.client.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <p className="text-slate-900 font-bold text-xs whitespace-nowrap">{item.client}</p>
                      <p className="text-[10px] text-slate-400 font-medium whitespace-nowrap">{item.room}</p>
                    </div>
                  </div>

                  {/* Contenu de l'avis */}
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[...Array(5)].map((_, idx) => (
                        <Star key={idx} className={`h-3.5 w-3.5 ${idx < item.rating ? "fill-amber-400 text-amber-400" : "text-slate-200 fill-slate-200"}`} />
                      ))}
                    </div>
                    <p className="text-slate-600 text-[11px] leading-relaxed font-medium">{item.comment}</p>
                  </div>

                  {/* Statut Badge & Actions */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 w-full sm:w-auto shrink-0 border-t sm:border-0 pt-2 sm:pt-0 border-slate-50">
                    <div className="text-left sm:text-right space-y-0.5">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${item.badgeClass}`}>
                        {item.sentiment}
                      </span>
                      <p className="text-[9px] text-slate-400 font-medium block">{item.date}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button className="border border-slate-200 hover:bg-slate-50 text-[#0B45D2] p-1.5 rounded-lg shadow-3xs transition-colors">
                        <CornerUpLeft className="h-3 w-3 stroke-[2.5]" />
                      </button>
                      <button className="text-slate-300 hover:text-slate-500 p-1"><MoreVertical className="h-4 w-4" /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bouton bas de liste */}
          <div className="p-3 bg-white text-center border-t border-slate-100">
            <button className="w-full border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-2 rounded-lg text-xs shadow-3xs transition-colors">
              Voir tous les avis
            </button>
          </div>
        </div>

        {/* BLOC DROITE : ANALYSES & CRITÈRES (5 COLONNES) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Section Répartition des avis (Donut) */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-4">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Répartition des avis</h3>
            <div className="flex items-center justify-center gap-8 h-36">
              {/* Graph Donut simulé */}
              <div className="h-28 w-28 rounded-full border-[14px] border-[#10B981] border-t-amber-400 border-r-rose-400 flex items-center justify-center shrink-0 relative">
                <div className="text-center">
                  <p className="text-xl font-black text-slate-900 tracking-tight">128</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total</p>
                </div>
              </div>
              {/* Légendes */}
              <div className="space-y-2 text-[11px] font-bold text-slate-500 w-full max-w-[160px]">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#10B981]"/>Positifs</div>
                  <span className="text-slate-800">98 (76.6%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-amber-400"/>Neutres</div>
                  <span className="text-slate-800">18 (14.1%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-rose-400"/>Négatifs</div>
                  <span className="text-slate-800">12 (9.3%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section Notes par catégorie */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-4">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Notes par catégorie</h3>
            <div className="space-y-3.5 text-xs font-bold text-slate-700">
              {categoriesRating.map((cat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-slate-600">{cat.label}</span>
                    <span className="text-slate-900 font-black">{cat.score}</span>
                  </div>
                  {/* Barre de progression */}
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className={`${cat.color} h-full rounded-full`} style={{ width: cat.percent }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* --- SECTION DU BAS : AVIS NÉCESSITANT UNE RÉPONSE --- */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Avis nécessitant une réponse</h3>
          <span className="bg-rose-50 text-rose-600 text-[10px] font-bold px-2 py-0.2 rounded-full border border-rose-100">3</span>
        </div>

        <div className="border border-slate-100 rounded-xl p-4 bg-slate-50/20 flex flex-col md:flex-row md:items-center justify-between gap-4 font-semibold text-xs text-slate-600">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-1">
            {/* Infos Client */}
            <div className="flex items-center gap-2.5 sm:w-40 shrink-0">
              <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-700 text-xs">
                TP
              </div>
              <div>
                <p className="text-slate-900 font-bold text-xs">Thomas Petit</p>
                <p className="text-[10px] text-slate-400 font-medium">Chambre 202</p>
              </div>
            </div>
            
            {/* Étoiles & Commentaire */}
            <div className="space-y-1 flex-1">
              <div className="flex text-amber-400"><Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" /></div>
              <p className="text-slate-600 text-[11px] font-medium leading-relaxed">Déçu par le séjour. Problème avec la climatisation et le service client.</p>
            </div>
          </div>

          {/* Date & Bouton Action */}
          <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-0 pt-2 md:pt-0 border-slate-100 shrink-0">
            <span className="text-[11px] text-slate-400 font-medium">08/06/2024</span>
            <button className="bg-[#0B45D2] hover:bg-[#093bb5] text-white text-[11px] font-bold px-4 py-2 rounded-lg shadow-3xs transition-colors">
              Répondre
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

