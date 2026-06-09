"use client";

import React from "react";
import Image from "next/image";
import { 
  BedDouble, 
  Plus, 
  SlidersHorizontal, 
  Layers, 
  Users, 
  Maximize2, 
  Wifi, 
  Tv, 
  Wind, 
  Coffee, 
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  TrendingDown
} from "lucide-react";

// Statistiques supérieures (KPIs)
const statsCards = [
  { id: 1, title: "Disponibles", value: "25", sub: "+ 12%", subColor: "text-emerald-500", isUp: true, colorClass: "bg-emerald-50 text-emerald-600 border-emerald-100", iconBg: "bg-emerald-600 text-white" },
  { id: 2, title: "Occupées", value: "40", sub: "+ 5%", subColor: "text-amber-500", isUp: true, colorClass: "bg-amber-50 text-amber-600 border-amber-100", iconBg: "bg-amber-500 text-white" },
  { id: 3, title: "En maintenance", value: "05", sub: "- 2%", subColor: "text-rose-500", isUp: false, colorClass: "bg-rose-50 text-rose-600 border-rose-100", iconBg: "bg-rose-600 text-white" },
  { id: 4, title: "En nettoyage", value: "08", sub: "+ 3%", subColor: "text-orange-500", isUp: true, colorClass: "bg-orange-50 text-orange-600 border-orange-100", iconBg: "bg-orange-500 text-white" },
  { id: 5, title: "Total chambres", value: "78", sub: "chambres", subColor: "text-slate-400", isUp: null, colorClass: "bg-blue-50 text-blue-600 border-blue-100", iconBg: "bg-blue-600 text-white" },
];

// Liste des chambres de la grille avec les images du dossier public
const roomsData = [
  { id: "101", type: "Standard", bed: "1 Lit double", guests: "2 Adultes", size: "25 m²", status: "Disponible", image: "/galerie1.jpeg", statusColor: "bg-emerald-50 text-emerald-600 border-emerald-200", topBorder: "border-t-emerald-500" },
  { id: "102", type: "Standard", bed: "1 Lit double", guests: "2 Adultes", size: "25 m²", status: "Occupée", image: "/galerie2.jpeg", statusColor: "bg-amber-50 text-amber-600 border-amber-200", topBorder: "border-t-amber-500" },
  { id: "103", type: "Deluxe", bed: "1 Lit king size", guests: "2 Adultes", size: "30 m²", status: "Maintenance", image: "/galerie3.jpeg", statusColor: "bg-rose-50 text-rose-600 border-rose-200", topBorder: "border-t-rose-500" },
  { id: "104", type: "Standard", bed: "1 Lit double", guests: "2 Adultes", size: "25 m²", status: "Nettoyage", image: "/galerie4.jpeg", statusColor: "bg-orange-50 text-orange-600 border-orange-200", topBorder: "border-t-orange-500" },
  { id: "105", type: "Suite", bed: "1 Lit king size", guests: "2 Adultes", size: "25 m²", status: "Disponible", image: "/galerie5.jpeg", statusColor: "bg-emerald-50 text-emerald-600 border-emerald-200", topBorder: "border-t-emerald-500", extraFeatures: true },
  { id: "106", type: "Standard", bed: "1 Lit double", guests: "2 Adultes", size: "25 m²", status: "Disponible", image: "/galerie6.jpeg", statusColor: "bg-emerald-50 text-emerald-600 border-emerald-200", topBorder: "border-t-emerald-500" },
  { id: "107", type: "Deluxe", bed: "1 Lit king size", guests: "2 Adultes", size: "30 m²", status: "Occupée", image: "/galerie7.jpeg", statusColor: "bg-amber-50 text-amber-600 border-amber-200", topBorder: "border-t-amber-500" },
  { id: "108", type: "Suite", bed: "1 Lit king size", guests: "2 Adultes", size: "40 m²", status: "Maintenance", image: "/galerie8.jpg", statusColor: "bg-rose-50 text-rose-600 border-rose-200", topBorder: "border-t-rose-500", extraFeatures: true },
];

export default function GestionChambresPage() {
  return (
    <div className="space-y-6">
      
      {/* --- EN-TÊTE ET ACTIONS --- */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Gestion des Chambres</h1>
          <p className="text-[10px] text-slate-400 font-medium mt-1">Accueil  /  Chambres</p>
        </div>

        {/* Bloc de boutons à droite */}
        <div className="flex flex-wrap items-center gap-2">
          <button className="flex items-center gap-1.5 bg-[#0B45D2] hover:bg-[#093bb5] text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-3xs transition-colors">
            <Plus className="h-4 w-4 stroke-[2.5]" /> Ajouter une chambre
          </button>
          <button className="flex items-center gap-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold px-3 py-2.5 rounded-lg shadow-3xs transition-colors">
            <Layers className="h-4 w-4 text-slate-400" /> Types de chambres
          </button>
          <button className="flex items-center gap-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold px-3 py-2.5 rounded-lg shadow-3xs transition-colors">
            <SlidersHorizontal className="h-4 w-4 text-slate-400" /> Filtrer
          </button>
        </div>
      </div>

      {/* --- COMPTEURS / STATISTIQUES (KPIs) --- */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {statsCards.map((card) => (
          <div key={card.id} className="bg-white border border-slate-200 rounded-xl p-4 shadow-3xs flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-slate-400 block">{card.title}</span>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-black text-slate-900 tracking-tight">{card.value}</span>
                {card.isUp !== null && (
                  <span className={`text-[9px] font-bold flex items-center gap-0.5 ${card.subColor}`}>
                    {card.isUp ? <TrendingUp className="h-2.5 w-2.5" /> : <TrendingDown className="h-2.5 w-2.5" />}
                    {card.sub}
                  </span>
                )}
                {card.isUp === null && (
                  <span className="text-[10px] text-slate-400 font-medium">{card.sub}</span>
                )}
              </div>
            </div>
            <div className={`p-2.5 rounded-xl ${card.iconBg} shrink-0 shadow-3xs`}>
              <BedDouble className="h-4 w-4 stroke-[2]" />
            </div>
          </div>
        ))}
      </div>

      {/* --- LÉGENDE DE COULEURS --- */}
      <div className="flex flex-wrap items-center gap-5 text-[11px] font-bold text-slate-500 pl-1">
        <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-emerald-500"/>Disponible</div>
        <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-amber-500"/>Occupée</div>
        <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-rose-500"/>Maintenance</div>
        <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-orange-500"/>Nettoyage</div>
      </div>

      {/* --- GRILLE DES CHAMBRES --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {roomsData.map((room) => (
          <div 
            key={room.id} 
            className={`bg-white border border-slate-200 rounded-xl shadow-3xs overflow-hidden border-t-[3px] ${room.topBorder} flex flex-col justify-between`}
          >
            {/* Corps supérieur de la carte */}
            <div className="p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-black text-slate-900 tracking-tight">{room.id}</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">{room.type}</p>
                </div>
                <button className="text-slate-300 hover:text-slate-500 p-0.5">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>

              {/* Contenu divisé : Infos à gauche, Image à droite */}
              <div className="flex items-start gap-4 justify-between">
                
                {/* Caractéristiques techniques */}
                <div className="space-y-2 text-[11px] font-semibold text-slate-500 pt-1">
                  <div className="flex items-center gap-2">
                    <BedDouble className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span>{room.bed}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span>{room.guests}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Maximize2 className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span>{room.size}</span>
                  </div>
                  
                  {/* Équipements (icônes) corrigés avec span wrapper pour éviter l'erreur TypeScript */}
                  <div className="flex items-center gap-1.5 pt-1 text-slate-400">
                    <span title="Wi-Fi" className="inline-flex">
                      <Wifi className="h-3.5 w-3.5" />
                    </span>
                    <span title="TV" className="inline-flex">
                      <Tv className="h-3.5 w-3.5" />
                    </span>
                    <span title="Climatisation" className="inline-flex">
                      <Wind className="h-3.5 w-3.5" />
                    </span>
                    {room.extraFeatures && (
                      <span title="Mini bar" className="inline-flex">
                        <Coffee className="h-3.5 w-3.5" />
                      </span>
                    )}
                  </div>
                </div>

                {/* Box de l'image (Dossier Public) */}
                <div className="relative h-20 w-28 rounded-lg overflow-hidden border border-slate-100 bg-slate-50 shrink-0 shadow-3xs">
                  <Image 
                    src={room.image} 
                    alt={`Chambre ${room.id}`}
                    fill
                    sizes="112px"
                    className="object-cover"
                    priority={parseInt(room.id) <= 104}
                  />
                </div>

              </div>
            </div>

            {/* Pied de carte avec le badge de statut */}
            <div className="p-4 pt-0">
              <span className={`inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-md border ${room.statusColor}`}>
                {room.status}
              </span>
            </div>

          </div>
        ))}
      </div>

      {/* --- PAGINATION BAS DE PAGE --- */}
      <div className="bg-white border border-slate-200 rounded-xl p-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-semibold text-slate-500 shadow-3xs">
        <span className="text-slate-400 font-medium">Affichage de 1 à 8 sur 78 chambres</span>
        
        <div className="flex items-center gap-4">
          {/* Numéros de page */}
          <div className="flex items-center gap-1">
            <button className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-400 disabled:opacity-50" disabled>
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
            <button className="h-7 w-7 flex items-center justify-center rounded-lg bg-[#0B45D2] text-white font-bold">1</button>
            <button className="h-7 w-7 flex items-center justify-center rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 text-slate-700">2</button>
            <button className="h-7 w-7 flex items-center justify-center rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 text-slate-700">3</button>
            <span className="px-1 text-slate-300">...</span>
            <button className="h-7 w-7 flex items-center justify-center rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 text-slate-700">10</button>
            <button className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700">
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Selecteur de taille de page */}
          <select className="border border-slate-200 rounded-lg px-2 py-1.5 bg-white text-slate-700 font-bold focus:outline-hidden">
            <option>8 / page</option>
            <option>16 / page</option>
            <option>24 / page</option>
          </select>
        </div>
      </div>

    </div>
  );
}

