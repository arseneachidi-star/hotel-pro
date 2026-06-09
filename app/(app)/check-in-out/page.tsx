"use client";

import React from "react";
import { 
  Search, 
  Calendar, 
  UserPlus, 
  Key, 
  LogOut, 
  ClipboardCheck, 
  RefreshCw, 
  MoreVertical, 
  ChevronRight
} from "lucide-react";

// Compteurs du haut avec les vraies couleurs de la maquette
const counters = [
  { id: "arrivées", title: "Arrivées du jour", value: "12", unit: "clients", sub: "▲ 20% vs hier", iconColor: "bg-[#0B45D2] text-white", badgeColor: "text-emerald-500", icon: UserPlus },
  { id: "deja-in", title: "Déjà check-in", value: "08", unit: "clients", sub: "▲ 14% vs hier", iconColor: "bg-[#10B981] text-white", badgeColor: "text-emerald-500", icon: Key },
  { id: "departs", title: "Départs du jour", value: "10", unit: "clients", sub: "▲ 11% vs hier", iconColor: "bg-[#F97316] text-white", badgeColor: "text-emerald-500", icon: LogOut },
  { id: "deja-out", title: "Déjà check-out", value: "06", unit: "clients", sub: "▲ 25% vs hier", iconColor: "bg-[#8B5CF6] text-white", badgeColor: "text-emerald-500", icon: ClipboardCheck },
];

// Arrivées du jour (Tableau de gauche)
const arriveesDuJour = [
  { client: "Jean Dupont", phone: "+225 07 89 01 23 45", rsv: "#RSV-2024-1548", details: "2 Adultes • 1 Enfant", room: "101", type: "Standard", date: "14/06/2024", time: "14:00" },
  { client: "Marie Claire", phone: "+225 05 56 78 90 12", rsv: "#RSV-2024-1549", details: "1 Adulte", room: "102", type: "Deluxe", date: "14/06/2024", time: "15:00" },
  { client: "Paul Martin", phone: "+225 07 12 34 56 78", rsv: "#RSV-2024-1550", details: "2 Adultes", room: "203", type: "Suite", date: "14/06/2024", time: "16:00" },
  { client: "Sophie Leroy", phone: "+225 01 23 45 67 89", rsv: "#RSV-2024-1551", details: "2 Adultes • 2 Enfants", room: "204", type: "Familiale", date: "14/06/2024", time: "17:00" },
  { client: "Lucas Bernard", phone: "+225 07 98 76 54 32", rsv: "#RSV-2024-1552", details: "1 Adulte", room: "305", type: "Standard", date: "14/06/2024", time: "18:00" },
];

// Départs du jour (Tableau de droite)
const departsDuJour = [
  { client: "Thomas Dubois", phone: "+225 07 45 67 89 01", room: "201", type: "Deluxe", date: "14/06/2024", time: "12:00" },
  { client: "Camille Moreau", phone: "+225 05 67 89 01 23", room: "103", type: "Standard", date: "14/06/2024", time: "11:00" },
  { client: "Alexandre Petit", phone: "+225 07 23 45 67 89", room: "202", type: "Suite", date: "14/06/2024", time: "10:30" },
  { client: "Emma Garcia", phone: "+225 01 98 76 54 32", room: "304", type: "Familiale", date: "14/06/2024", time: "13:00" },
  { client: "Nicolas Martin", phone: "+225 07 89 12 34 56", room: "401", type: "Deluxe", date: "14/06/2024", time: "12:30" },
];

// Carrousel du bas : Clients en séjour
const clientsEnSejour = [
  { name: "David Konan", room: "105", type: "Standard", date: "12/06/2024", nights: "3 nuits" },
  { name: "Fatou Diarra", room: "201", type: "Deluxe", date: "11/06/2024", nights: "4 nuits" },
  { name: "Marc Leblanc", room: "301", type: "Suite", date: "11/06/2024", nights: "5 nuits" },
  { name: "Aicha Traoré", room: "302", type: "Standard", date: "13/06/2024", nights: "2 nuits" },
  { name: "Yannick Koffi", room: "402", type: "Deluxe", date: "09/06/2024", nights: "6 nuits" },
];

export default function CheckInCheckOutPage() {
  return (
    <div className="space-y-6">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Check-in / Check-out</h1>
          <p className="text-[11px] text-slate-400 mt-0.5">Accueil  /  Check-in / Check-out</p>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Rechercher un client, une réservation..." 
            className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-4 py-2 text-xs focus:outline-hidden focus:border-blue-500 shadow-3xs transition-colors"
          />
        </div>
      </div>

      {/* --- STATS & DATE CARD --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {counters.map((item) => (
            <div key={item.id} className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-4 shadow-3xs">
              <div className={`p-2.5 rounded-xl ${item.iconColor} shrink-0`}>
                <item.icon className="h-5 w-5" />
              </div>
              <div className="space-y-0.5">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{item.title}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-slate-900 tracking-tight">{item.value}</span>
                  <span className="text-[10px] text-slate-400 font-bold">{item.unit}</span>
                </div>
                <p className={`text-[9px] font-bold ${item.badgeColor}`}>{item.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bloc Jour de la semaine */}
        <div className="lg:col-span-3 bg-[#0B45D2] text-white rounded-xl p-4 flex flex-col justify-center shadow-xs relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 text-blue-500/20 pointer-events-none">
            <Calendar className="h-20 w-20 stroke-[1.5]" />
          </div>
          <span className="text-[10px] font-bold opacity-75 uppercase tracking-wider">Samedi</span>
          <h3 className="text-base font-black tracking-tight">14 Juin 2024</h3>
          <p className="text-[11px] font-bold opacity-90 flex items-center gap-1.5 mt-0.5">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#10B981] animate-pulse" />
            10:30 AM
          </p>
        </div>
      </div>

      {/* --- FLUX DE LA JOURNÉE (SPLIT TABLES) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* BLOC GAUCHe : ARRIVÉES */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
          <div className="p-3.5 border-b border-slate-100 flex items-center justify-between bg-white">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">
              Arrivées du jour <span className="text-slate-400 font-medium font-sans lowercase text-[11px]">(À faire check-in)</span>
            </h3>
            <div className="flex gap-1.5 text-[10px] font-bold">
              <button className="flex items-center gap-1 px-2.5 py-1 border border-slate-200 rounded-lg bg-white text-slate-600 shadow-3xs"><RefreshCw className="h-3 w-3" /> Actualiser</button>
              <button className="px-2.5 py-1 bg-blue-50 text-[#0B45D2] rounded-lg">Voir tout</button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs whitespace-nowrap">
              <thead>
                <tr className="bg-slate-50/70 text-[10px] text-slate-400 font-bold uppercase border-b border-slate-100">
                  <th className="p-3">Client</th>
                  <th className="p-3">Réservation</th>
                  <th className="p-3 text-center">Chambre</th>
                  <th className="p-3">Arrivée</th>
                  <th className="p-3 text-center">Statut</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold text-slate-600">
                {arriveesDuJour.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/20">
                    <td className="p-3">
                      <div className="flex items-center gap-2.5">
                        <div className="h-8 w-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center text-[11px] font-bold">
                          {row.client.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div>
                          <p className="text-slate-900 font-bold text-xs">{row.client}</p>
                          <p className="text-[10px] text-slate-400 font-medium">{row.phone}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <p className="text-slate-800 text-[11px] font-bold">{row.rsv}</p>
                      <p className="text-[10px] text-slate-400 font-medium">{row.details}</p>
                    </td>
                    <td className="p-3 text-center">
                      <p className="text-slate-900 font-bold">{row.room}</p>
                      <p className="text-[10px] text-slate-400 font-medium">{row.type}</p>
                    </td>
                    <td className="p-3 text-slate-400 text-[11px] font-medium">
                      <p>{row.date}</p>
                      <p className="text-[10px] text-slate-500 font-bold">{row.time}</p>
                    </td>
                    <td className="p-3 text-center">
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-blue-50 text-blue-600 border border-blue-100">À faire</span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center justify-center gap-1">
                        <button className="bg-[#0B45D2] hover:bg-[#093bb5] text-white text-[10px] font-bold px-2.5 py-1.5 rounded-lg flex items-center gap-1 shadow-3xs transition-colors">
                          <Key className="h-3 w-3" /> Check-in
                        </button>
                        <button className="p-1 text-slate-400 hover:text-slate-600"><MoreVertical className="h-3.5 w-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* BLOC DROITE : DÉPARTS */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
          <div className="p-3.5 border-b border-slate-100 flex items-center justify-between bg-white">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">
              Départs du jour <span className="text-slate-400 font-medium font-sans lowercase text-[11px]">(À faire check-out)</span>
            </h3>
            <div className="flex gap-1.5 text-[10px] font-bold">
              <button className="flex items-center gap-1 px-2.5 py-1 border border-slate-200 rounded-lg bg-white text-slate-600 shadow-3xs"><RefreshCw className="h-3 w-3" /> Actualiser</button>
              <button className="px-2.5 py-1 bg-blue-50 text-[#0B45D2] rounded-lg">Voir tout</button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs whitespace-nowrap">
              <thead>
                <tr className="bg-slate-50/70 text-[10px] text-slate-400 font-bold uppercase border-b border-slate-100">
                  <th className="p-3">Client</th>
                  <th className="p-3 text-center">Chambre</th>
                  <th className="p-3">Départ</th>
                  <th className="p-3 text-center">Statut</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold text-slate-600">
                {departsDuJour.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/20">
                    <td className="p-3">
                      <div className="flex items-center gap-2.5">
                        <div className="h-8 w-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center text-[11px] font-bold">
                          {row.client.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div>
                          <p className="text-slate-900 font-bold text-xs">{row.client}</p>
                          <p className="text-[10px] text-slate-400 font-medium">{row.phone}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 text-center">
                      <p className="text-slate-900 font-bold">{row.room}</p>
                      <p className="text-[10px] text-slate-400 font-medium">{row.type}</p>
                    </td>
                    <td className="p-3 text-slate-400 text-[11px] font-medium">
                      <p>{row.date}</p>
                      <p className="text-[10px] text-slate-500 font-bold">{row.time}</p>
                    </td>
                    <td className="p-3 text-center">
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-orange-50 text-orange-600 border border-orange-100">À faire</span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center justify-center gap-1">
                        <button className="bg-[#F97316] hover:bg-orange-600 text-white text-[10px] font-bold px-2.5 py-1.5 rounded-lg flex items-center gap-1 shadow-3xs transition-colors">
                          <LogOut className="h-3 w-3" /> Check-out
                        </button>
                        <button className="p-1 text-slate-400 hover:text-slate-600"><MoreVertical className="h-3.5 w-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* --- CARROUSEL : REZ-DE-CHAUSSÉE (CLIENTS EN SÉJOUR) --- */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">
            Clients actuellement en séjour <span className="text-slate-400 font-medium font-sans lowercase text-[11px]">(Déjà check-in)</span>
          </h3>
          <button className="text-[11px] font-bold text-[#0B45D2] hover:underline">Voir tous les clients en séjour</button>
        </div>

        <div className="relative flex items-center group">
          <div className="w-full grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {clientsEnSejour.map((card, idx) => (
              <div key={idx} className="border border-slate-200 rounded-xl p-4 bg-white shadow-3xs space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="bg-emerald-50 text-[#10B981] text-[9px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-emerald-100">
                      <span className="h-1 w-1 rounded-full bg-[#10B981]" /> En séjour
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-xs">
                      {card.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-900 tracking-tight">{card.name}</h4>
                      <p className="text-[10px] font-bold text-slate-400">Chambre {card.room}</p>
                      <p className="text-[9px] text-slate-400 font-medium font-sans">{card.type}</p>
                    </div>
                  </div>

                  <div className="text-[10px] font-semibold text-slate-400 space-y-1 bg-slate-50/50 border border-slate-100 p-2.5 rounded-lg">
                    <p className="flex justify-between"><span>📅 Arrivée:</span> <span className="text-slate-700 font-bold">{card.date}</span></p>
                    <p className="flex justify-between"><span>🌙 Durée:</span> <span className="text-slate-700 font-bold">{card.nights}</span></p>
                  </div>
                </div>

                <button className="w-full bg-[#10B981] hover:bg-emerald-600 text-white text-[10px] font-bold py-2 rounded-lg flex items-center justify-center gap-1 transition-colors shadow-3xs">
                  <LogOut className="h-3 w-3" /> Check-out
                </button>
              </div>
            ))}
          </div>

          <button className="absolute -right-3 bg-white border border-slate-200 p-2 rounded-full text-slate-600 shadow-md hover:bg-slate-50 hidden lg:flex items-center justify-center transition-transform group-hover:scale-105">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

    </div>
  );
}

