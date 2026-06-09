"use client";

import React from "react";
import { 
  Plus, 
  SlidersHorizontal, 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  Download, 
  Eye, 
  Pencil, 
  Trash2 
} from "lucide-react";

// Données pour le planning (Timeline)
const timelineRooms = [
  { id: "101", type: "Standard", initial: "Chambre 101", sub: "Standard", events: [{ name: "Jean Dupont", start: 2, end: 4 }] },
  { id: "102", type: "Standard", initial: "Chambre 102", sub: "Standard", events: [{ name: "Paul Durand", start: 0, end: 2 }, { name: "Lucie Bernard", start: 5, end: 7 }] },
  { id: "201", type: "Deluxe", initial: "Chambre 201", sub: "Deluxe", events: [{ name: "Alice Moreau", start: 3, end: 5 }] },
  { id: "202", type: "Deluxe", initial: "Chambre 202", sub: "Deluxe", events: [{ name: "Thomas Petit", start: 1, end: 3 }, { name: "Sophie Leroy", start: 5, end: 7 }] },
  { id: "301", type: "Suite", initial: "Suite 301", sub: "Suite", events: [{ name: "Entreprise ABC", start: 4, end: 6 }] },
];

const daysOfWeek = [
  { label: "Lun", num: "10" },
  { label: "Mar", num: "11" },
  { label: "Mer", num: "12" },
  { label: "Jeu", num: "13" },
  { label: "Ven", num: "14" },
  { label: "Sam", num: "15" },
  { label: "Dim", num: "16" },
];

// Données pour la table du bas
const reservationsTable = [
  { id: 1, client: "Jean Dupont", avatar: "JD", room: "101 (Standard)", checkIn: "10/06/2024", checkOut: "12/06/2024", adults: 2, kids: 0, status: "Confirmée", amount: "250,00 €" },
  { id: 2, client: "Marie Martin", avatar: "MM", room: "101 (Standard)", checkIn: "14/06/2024", checkOut: "15/06/2024", adults: 2, kids: 0, status: "Confirmée", amount: "150,00 €" },
  { id: 3, client: "Paul Durand", avatar: "PD", room: "102 (Standard)", checkIn: "10/06/2024", checkOut: "11/06/2024", adults: 1, kids: 0, status: "En attente", amount: "80,00 €" },
  { id: 4, client: "Alice Moreau", avatar: "AM", room: "201 (Deluxe)", checkIn: "12/06/2024", checkOut: "14/06/2024", adults: 2, kids: 1, status: "Confirmée", amount: "320,00 €" },
  { id: 5, client: "Sophie Leroy", avatar: "SL", room: "202 (Deluxe)", checkIn: "15/06/2024", checkOut: "16/06/2024", adults: 2, kids: 0, status: "Confirmée", amount: "180,00 €" },
];

export default function ReservationsPage() {
  return (
    <div className="space-y-6">
      
      {/* --- EN-TÊTE DE LA PAGE --- */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Gestion des Réservations</h1>
          <p className="text-xs text-slate-400 mt-0.5">Accueil / Réservations</p>
        </div>
        
        <div className="flex items-center gap-3 flex-wrap">
          <button className="bg-[#0B45D2] hover:bg-[#093bb5] text-white text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm transition-colors">
            <Plus className="h-4 w-4" /> Nouvelle réservation
          </button>
          <button className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm transition-colors">
            <SlidersHorizontal className="h-4 w-4 text-slate-400" /> Filtrer
          </button>
          <div className="bg-white border border-slate-200 text-slate-700 text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm">
            <CalendarIcon className="h-4 w-4 text-slate-400" /> 10 Juin 2024 - 16 Juin 2024
          </div>
        </div>
      </div>

      {/* --- SECTION PLANNING / TIMELINE --- */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        {/* Contrôles du calendrier */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-1.5">
            <button className="p-1.5 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50">
              Aujourd'hui
            </button>
            <button className="p-1.5 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          
          <h2 className="text-base font-bold text-slate-800">Juin 2024</h2>
          
          <div className="bg-slate-100 p-0.5 rounded-lg flex gap-0.5">
            <button className="px-3 py-1 text-xs font-medium text-slate-500 rounded-md">Mois</button>
            <button className="px-3 py-1 text-xs font-medium bg-white text-[#0B45D2] shadow-xs rounded-md">Semaine</button>
            <button className="px-3 py-1 text-xs font-medium text-slate-500 rounded-md">Jour</button>
          </div>
        </div>

        {/* Grille de la Grille de Temps */}
        <div className="overflow-x-auto">
          <div className="min-w-[800px] grid grid-cols-8 border-b border-slate-100 bg-slate-50/50">
            <div className="p-3"></div>
            {daysOfWeek.map((day, idx) => (
              <div key={idx} className="p-2 text-center border-l border-slate-100 flex flex-col justify-center">
                <span className="text-xs text-slate-400 font-medium">{day.label}</span>
                <span className={`text-sm font-bold mt-0.5 ${day.num === "13" ? "text-[#0B45D2]" : "text-slate-700"}`}>{day.num}</span>
              </div>
            ))}
          </div>

          {/* Rangées des chambres */}
          <div className="min-w-[800px] divide-y divide-slate-100">
            {timelineRooms.map((room) => (
              <div key={room.id} className="grid grid-cols-8 items-center h-14 relative">
                {/* Nom de la chambre */}
                <div className="p-3 flex items-center gap-2 border-r border-slate-100 h-full bg-white z-10">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <div>
                    <p className="text-xs font-bold text-slate-800">{room.initial}</p>
                    <p className="text-[10px] text-slate-400">{room.sub}</p>
                  </div>
                </div>

                {/* Blocs de fond pour les jours de la grille */}
                {Array.from({ length: 7 }).map((_, i) => (
                  <div key={i} className="border-l border-slate-100 h-full relative bg-white" />
                ))}

                {/* Superposition absolue des barres d'événements clients */}
                <div className="absolute inset-y-0 left-[12.5%] right-0 grid grid-cols-7 pointer-events-none px-1 items-center">
                  {room.events.map((event, eIdx) => {
                    const gridStart = event.start + 1;
                    const gridSpan = event.end - event.start;
                    return (
                      <div
                        key={eIdx}
                        style={{ gridColumn: `${gridStart} / span ${gridSpan}` }}
                        className="pointer-events-auto h-8 bg-blue-100 border border-blue-200 text-blue-700 rounded-lg px-3 flex items-center shadow-xs mx-1"
                      >
                        <span className="text-xs font-medium truncate">{event.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- SECTION TABLEAU LISTE --- */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        
        {/* Barre de recherche de la table */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h3 className="font-bold text-slate-800 text-base">Liste des réservations</h3>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Rechercher..." 
                className="w-full pl-9 pr-4 py-1.5 border border-slate-200 rounded-lg text-xs bg-slate-50 focus:outline-hidden focus:border-blue-500 transition-colors"
              />
            </div>
            <button className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium px-3 py-2 rounded-lg flex items-center gap-2 shadow-xs shrink-0 transition-colors">
              <Download className="h-3.5 w-3.5 text-slate-400" /> Exporter
            </button>
          </div>
        </div>

        {/* Le Tableau */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="p-4 w-12 text-center">#</th>
                <th className="p-4">Client</th>
                <th className="p-4">Chambre</th>
                <th className="p-4">Date d'arrivée</th>
                <th className="p-4">Date de départ</th>
                <th className="p-4 text-center">Adultes</th>
                <th className="p-4 text-center">Enfants</th>
                <th className="p-4">Statut</th>
                <th className="p-4">Montant</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {reservationsTable.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 text-center font-medium text-slate-400">{row.id}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2.5">
                      <div className="h-7 w-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600">
                        {row.avatar}
                      </div>
                      <span className="font-semibold text-slate-900">{row.client}</span>
                    </div>
                  </td>
                  <td className="p-4 text-slate-600 font-medium">{row.room}</td>
                  <td className="p-4 font-medium">{row.checkIn}</td>
                  <td className="p-4 font-medium">{row.checkOut}</td>
                  <td className="p-4 text-center font-medium">{row.adults}</td>
                  <td className="p-4 text-center font-medium">{row.kids}</td>
                  <td className="p-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-md text-[10px] font-bold ${
                      row.status === "Confirmée" 
                        ? "bg-emerald-50 text-emerald-600" 
                        : "bg-amber-50 text-amber-600"
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-slate-900">{row.amount}</td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-1.5">
                      <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md border border-slate-100 shadow-2xs transition-colors">
                        <Eye className="h-3.5 w-3.5" />
                      </button>
                      <button className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-md border border-slate-100 shadow-2xs transition-colors">
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-md border border-slate-100 shadow-2xs transition-colors">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Bas de page */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Affichage de 1 à 5 sur 25 résultats</span>
          <div className="flex items-center gap-1">
            <button className="p-1.5 border border-slate-200 rounded-md text-slate-400 hover:bg-slate-50"><ChevronLeft className="h-3.5 w-3.5" /></button>
            <button className="px-3 py-1.5 bg-[#0B45D2] text-white font-bold rounded-md shadow-xs">1</button>
            <button className="px-3 py-1.5 border border-slate-200 text-slate-700 font-medium rounded-md hover:bg-slate-50">2</button>
            <button className="px-3 py-1.5 border border-slate-200 text-slate-700 font-medium rounded-md hover:bg-slate-50">3</button>
            <span className="px-1.5 text-slate-300">...</span>
            <button className="px-3 py-1.5 border border-slate-200 text-slate-700 font-medium rounded-md hover:bg-slate-50">5</button>
            <button className="p-1.5 border border-slate-200 rounded-md text-slate-700 hover:bg-slate-50"><ChevronRight className="h-3.5 w-3.5" /></button>
          </div>
        </div>

      </div>

    </div>
  );
}
