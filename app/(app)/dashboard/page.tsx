"use client";

import React from "react";
import { 
  Download, 
  FileSpreadsheet, 
  TrendingUp, 
  Percent, 
  Layers, 
  Calendar,
  ChevronDown,
  PieChart,
  Activity
} from "lucide-react";

// Données des 4 cartes du haut (avec mini-courbes simulées)
const statsData = [
  { title: "Taux d'occupation", value: "78%", sub: "+12% vs semaine dernière", subColor: "text-emerald-600", icon: Percent },
  { title: "RevPAR", value: "45 000 XOF", sub: "+8% vs semaine dernière", subColor: "text-emerald-600", icon: Layers },
  { title: "CA Journalier", value: "2 450 000 XOF", sub: "+15% vs semaine dernière", subColor: "text-emerald-600", icon: TrendingUp },
  { title: "Réservations", value: "42", sub: "+10% vs semaine dernière", subColor: "text-emerald-600", icon: Calendar },
];

// Données du tableau "Top des chambres"
const topChambres = [
  { id: "101 - Standard", views: 18, occupation: "90%", revenue: "810 000 XOF" },
  { id: "102 - Deluxe", views: 15, occupation: "75%", revenue: "750 000 XOF" },
  { id: "201 - Suite", views: 12, occupation: "80%", revenue: "960 000 XOF" },
  { id: "103 - Standard", views: 10, occupation: "70%", revenue: "450 000 XOF" },
  { id: "104 - Deluxe", views: 8, occupation: "65%", revenue: "400 000 XOF" },
];

// Données du tableau "Dernières réservations"
const dernieresReservations = [
  { client: "Paul Bernard", room: "101", checkIn: "21/05/2024", checkOut: "23/05/2024", amount: "90 000 XOF", status: "Confirmée", statusClass: "bg-emerald-50 text-emerald-600" },
  { client: "Sophie Leroy", room: "102", checkIn: "20/05/2024", checkOut: "22/05/2024", amount: "120 000 XOF", status: "Confirmée", statusClass: "bg-emerald-50 text-emerald-600" },
  { client: "Lucas Moreau", room: "201", checkIn: "19/05/2024", checkOut: "21/05/2024", amount: "150 000 XOF", status: "Confirmée", statusClass: "bg-emerald-50 text-emerald-600" },
  { client: "Claire Dubois", room: "103", checkIn: "18/05/2024", checkOut: "20/05/2024", amount: "90 000 XOF", status: "Confirmée", statusClass: "bg-emerald-50 text-emerald-600" },
  { client: "Thomas Petit", room: "104", checkIn: "18/05/2024", checkOut: "19/05/2024", amount: "80 000 XOF", status: "Annulée", statusClass: "bg-rose-50 text-rose-600" },
];

export default function TableauDeBordReporting() {
  return (
    <div className="space-y-6">
      
      {/* --- EN-TÊTE DE LA PAGE --- */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-[#0B45D2]">
            <TrendingUp className="h-5 w-5 stroke-[2.5]" />
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Tableau de bord & Reporting</h1>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">Suivez les performances clés de votre établissement en temps réel.</p>
        </div>

        {/* Actions & Filtre Date */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
          <div className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-2 rounded-lg text-slate-600 shadow-3xs">
            <Calendar className="h-3.5 w-3.5 text-slate-400" />
            <span>15/05/2024 - 21/05/2024</span>
            <ChevronDown className="h-3 w-3 text-slate-400 ml-1" />
          </div>
          <button className="flex items-center gap-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-3 py-2 rounded-lg shadow-3xs transition-colors">
            <Download className="h-3.5 w-3.5 text-slate-400" /> Exporter PDF
          </button>
          <button className="flex items-center gap-1.5 bg-[#0B45D2] hover:bg-[#093bb5] text-white px-3 py-2 rounded-lg shadow-3xs transition-colors">
            <FileSpreadsheet className="h-3.5 w-3.5" /> Exporter Excel
          </button>
        </div>
      </div>

      {/* --- SECTION 1 : LES 4 CARTES D'INDICATEURS --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((card, idx) => {
          return (
            <div key={idx} className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-3xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">{card.title}</span>
                <card.icon className="h-4 w-4 text-slate-400" />
              </div>
              
              <div className="flex items-baseline justify-between">
                <div className="space-y-0.5">
                  <p className="text-2xl font-black text-slate-900 tracking-tight">{card.value}</p>
                  <p className={`text-[10px] font-bold ${card.subColor}`}>{card.sub}</p>
                </div>
                
                {/* Simulation de la mini ligne de tendance graphique de la maquette */}
                <div className="h-8 w-16 flex items-end gap-0.5 opacity-40">
                  <div className="w-full bg-emerald-500 h-[30%] rounded-2xs"></div>
                  <div className="w-full bg-emerald-500 h-[45%] rounded-2xs"></div>
                  <div className="w-full bg-emerald-500 h-[35%] rounded-2xs"></div>
                  <div className="w-full bg-emerald-500 h-[60%] rounded-2xs"></div>
                  <div className="w-full bg-emerald-500 h-[80%] rounded-2xs"></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* --- SECTION 2 : LES GRAPHIQUES PRINCIPAUX --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Graphique Taux d'occupation (Simulé) */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Taux d'occupation</h3>
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
              <span className="px-2 py-0.5 border border-slate-200 rounded bg-slate-50">15/05/2024 - 21/05/2024</span>
              <span className="px-2 py-0.5 border border-slate-200 rounded bg-slate-50 flex items-center gap-1">Par jour <ChevronDown className="h-2.5 w-2.5" /></span>
            </div>
          </div>
          {/* Zone de courbe simulée */}
          <div className="h-48 w-full border-b border-l border-slate-100 relative flex items-end pt-4">
            <div className="absolute inset-0 flex flex-col justify-between text-[9px] text-slate-300 pointer-events-none font-bold">
              <div className="border-b border-slate-100/50 w-full pb-0.5">100%</div>
              <div className="border-b border-slate-100/50 w-full pb-0.5">75%</div>
              <div className="border-b border-slate-100/50 w-full pb-0.5">50%</div>
              <div className="border-b border-slate-100/50 w-full pb-0.5">25%</div>
              <div className="w-full">0%</div>
            </div>
            {/* Ligne d'onde stylisée */}
            <div className="w-full h-32 bg-gradient-to-t from-blue-50/40 to-blue-500/10 border-t-2 border-blue-600 absolute bottom-0 left-0 right-0 rounded-t-sm flex items-end justify-between px-2 text-[9px] font-bold text-slate-400">
              <span>15/05</span><span>16/05</span><span>17/05</span><span>18/05</span><span>19/05</span><span>20/05</span><span>21/05</span>
            </div>
          </div>
        </div>

        {/* Répartition des réservations (Donut) */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-4 space-y-4">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Répartition des réservations</h3>
          <div className="flex items-center h-48 gap-4 justify-center">
            <div className="h-28 w-28 rounded-full border-[14px] border-blue-600 border-t-emerald-500 border-r-amber-400 border-b-slate-400 flex items-center justify-center shrink-0" />
            <div className="space-y-1.5 text-[10px] font-bold text-slate-500 w-full">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-blue-600"/>Directes</div>
                <span className="text-slate-800">55%</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-emerald-500"/>Booking.com</div>
                <span className="text-slate-800">25%</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-amber-400"/>Expedia</div>
                <span className="text-slate-800">15%</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-slate-400"/>Autres</div>
                <span className="text-slate-800">5%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Revenus Histogramme */}
        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-xl p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Revenus (XOF)</h3>
            <span className="text-[9px] font-bold border border-slate-200 rounded bg-slate-50 px-1.5 py-0.5 text-slate-400 flex items-center gap-1">Par jour <ChevronDown className="h-2 w-2" /></span>
          </div>
          {/* Histogrammes barres */}
          <div className="h-48 flex items-end justify-between gap-2 px-1 pt-6 border-b border-slate-100 text-[9px] font-bold text-slate-400">
            <div className="flex flex-col items-center gap-1 w-full"><div className="w-full bg-blue-600 h-28 rounded-t-xs"></div><span>15/05</span></div>
            <div className="flex flex-col items-center gap-1 w-full"><div className="w-full bg-blue-600 h-32 rounded-t-xs"></div><span>16/05</span></div>
            <div className="flex flex-col items-center gap-1 w-full"><div className="w-full bg-blue-600 h-36 rounded-t-xs"></div><span>17/05</span></div>
            <div className="flex flex-col items-center gap-1 w-full"><div className="w-full bg-blue-600 h-24 rounded-t-xs"></div><span>18/05</span></div>
            <div className="flex flex-col items-center gap-1 w-full"><div className="w-full bg-blue-600 h-30 rounded-t-xs"></div><span>19/05</span></div>
            <div className="flex flex-col items-center gap-1 w-full"><div className="w-full bg-blue-600 h-40 rounded-t-xs"></div><span>20/05</span></div>
            <div className="flex flex-col items-center gap-1 w-full"><div className="w-full bg-blue-600 h-44 rounded-t-xs"></div><span>21/05</span></div>
          </div>
        </div>

      </div>

      {/* --- SECTION 3 : LES TABLEAUX COMPLETS (BAS DE PAGE) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Top des chambres */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden flex flex-col justify-between">
          <div>
            <div className="p-3 border-b border-slate-100">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Top des chambres</h3>
            </div>
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 text-[10px] text-slate-400 font-bold uppercase border-b border-slate-100">
                  <th className="p-2.5">Chambre</th>
                  <th className="p-2.5 text-center">Réservations</th>
                  <th className="p-2.5 text-center">Taux d'occupation</th>
                  <th className="p-2.5 text-right">Revenus (XOF)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 font-semibold text-slate-600">
                {topChambres.map((item, i) => (
                  <tr key={i} className="hover:bg-slate-50/50">
                    <td className="p-2.5 font-bold text-slate-800">{item.id}</td>
                    <td className="p-2.5 text-center text-slate-500">{item.views}</td>
                    <td className="p-2.5 text-center text-slate-700">{item.occupation}</td>
                    <td className="p-2.5 text-right font-bold text-slate-900">{item.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-2.5 bg-slate-50/50 text-center border-t border-slate-100">
            <button className="text-[11px] font-bold text-[#0B45D2] hover:underline">Voir toutes les chambres</button>
          </div>
        </div>

        {/* Dernières réservations */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden flex flex-col justify-between">
          <div>
            <div className="p-3 border-b border-slate-100">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Dernières réservations</h3>
            </div>
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 text-[10px] text-slate-400 font-bold uppercase border-b border-slate-100">
                  <th className="p-2.5">Client</th>
                  <th className="p-2.5 text-center">Chambre</th>
                  <th className="p-2.5">Arrivée</th>
                  <th className="p-2.5">Départ</th>
                  <th className="p-2.5 text-right">Montant</th>
                  <th className="p-2.5 text-center">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 font-semibold text-slate-600">
                {dernieresReservations.map((res, i) => (
                  <tr key={i} className="hover:bg-slate-50/50">
                    <td className="p-2.5 text-slate-900 font-bold">{res.client}</td>
                    <td className="p-2.5 text-center text-slate-500">{res.room}</td>
                    <td className="p-2.5 text-slate-400">{res.checkIn}</td>
                    <td className="p-2.5 text-slate-400">{res.checkOut}</td>
                    <td className="p-2.5 text-right font-bold text-slate-900">{res.amount}</td>
                    <td className="p-2.5 text-center">
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${res.statusClass}`}>
                        {res.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-2.5 bg-slate-50/50 text-center border-t border-slate-100">
            <button className="text-[11px] font-bold text-[#0B45D2] hover:underline">Voir toutes les réservations</button>
          </div>
        </div>

        {/* Résumé rapide (Données techniques) */}
        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-xl shadow-xs p-3 flex flex-col justify-between">
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b border-slate-50 pb-2">Résumé rapide</h3>
            <div className="space-y-2.5 text-xs font-semibold text-slate-500">
              <div className="flex justify-between"><span>Chambres totales</span><span className="text-slate-800 font-bold">120</span></div>
              <div className="flex justify-between"><span>Chambres occupées</span><span className="text-slate-800 font-bold">94</span></div>
              <div className="flex justify-between"><span>Chambres disponibles</span><span className="text-slate-800 font-bold">20</span></div>
              <div className="flex justify-between"><span>En nettoyage</span><span className="text-slate-800 font-bold">4</span></div>
              <div className="flex justify-between border-b border-slate-100 pb-2"><span>En maintenance</span><span className="text-slate-800 font-bold">2</span></div>
              <div className="flex justify-between"><span>RevPAR (Semaine)</span><span className="text-slate-900 font-black">45 000 XOF</span></div>
              <div className="flex justify-between"><span>ADR (Prix moyen)</span><span className="text-slate-900 font-black">57 692 XOF</span></div>
            </div>
          </div>
          <button className="w-full mt-4 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-1.5 rounded-lg text-[11px] flex items-center justify-center gap-1 shadow-3xs transition-colors">
            <Activity className="h-3.5 w-3.5 text-slate-400" /> Voir le rapport complet
          </button>
        </div>

      </div>

      {/* --- FOOTER TIMESTAMP --- */}
      <p className="text-[10px] font-bold text-slate-400 text-center pt-2">Données mises à jour le 21/05/2024 à 08:30 ↻</p>

    </div>
  );
}

