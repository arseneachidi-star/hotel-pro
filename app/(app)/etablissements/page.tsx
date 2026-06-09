"use client";

import React from "react";
import { 
  Building2, 
  BedDouble, 
  CalendarCheck2, 
  Euro, 
  Plus, 
  BarChart3, 
  Settings, 
  MoreVertical,
  ChevronRight,
  Users,
  FileSpreadsheet,
  Clock,
  AlertTriangle,
  Info
} from "lucide-react";

// Statistiques supérieures
const kpiCards = [
  { id: 1, title: "Total établissements", value: "4", sub: "Actifs", subColor: "text-slate-400", icon: Building2, bgIcon: "bg-blue-50 text-blue-600" },
  { id: 2, title: "Chambres totales", value: "245", sub: "Toutes propriétés", subColor: "text-slate-400", icon: BedDouble, bgIcon: "bg-emerald-50 text-emerald-600" },
  { id: 3, title: "Réservations aujourd'hui", value: "32", sub: "Toutes propriétés", subColor: "text-slate-400", icon: CalendarCheck2, bgIcon: "bg-amber-50 text-amber-600" },
  { id: 4, title: "Chiffre d'affaires (mois)", value: "24 850 €", sub: "▲ 18.6% vs mois dernier", subColor: "text-emerald-500", icon: Euro, bgIcon: "bg-purple-50 text-purple-600" },
];

// Liste des hôtels (Tableau central)
const hotelsList = [
  { id: 1, name: "Hôtel Central Paris", badge: "Principal", email: "paris@hotelpro.com", geo: "Paris, France", rooms: 120, resToday: 18, occupy: 78, occupyColor: "bg-emerald-500" },
  { id: 2, name: "Hôtel Riviera Nice", badge: "", email: "nice@hotelpro.com", geo: "Nice, France", rooms: 60, resToday: 7, occupy: 65, occupyColor: "bg-emerald-500" },
  { id: 3, name: "Hôtel Montagne Resort", badge: "", email: "montagne@hotelpro.com", geo: "Chamonix, France", rooms: 45, resToday: 4, occupy: 48, occupyColor: "bg-amber-500" },
  { id: 4, name: "Hôtel Sunset Beach", badge: "", email: "beach@hotelpro.com", geo: "Marseille, France", rooms: 20, resToday: 3, occupy: 30, occupyColor: "bg-rose-500" },
];

export default function MultiEtablissementsPage() {
  return (
    <div className="space-y-6">
      
      {/* --- EN-TÊTE --- */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Multi-établissements</h1>
          <p className="text-[11px] text-slate-400 mt-0.5">Gérez et centralisez toutes vos propriétés hôtelières</p>
          <p className="text-[10px] text-slate-400 font-medium mt-1">Accueil  /  Multi-établissements</p>
        </div>

        <button className="flex items-center gap-1.5 bg-[#0B45D2] hover:bg-[#093bb5] text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-3xs transition-colors self-start sm:self-auto">
          <Plus className="h-4 w-4 stroke-[2.5]" /> Ajouter un établissement
        </button>
      </div>

      {/* --- CARTES KPI --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.id} className="bg-white border border-slate-200 rounded-xl p-4 shadow-3xs flex items-center gap-4">
              <div className={`p-3 rounded-xl ${kpi.bgIcon} shrink-0`}>
                <Icon className="h-5 w-5 stroke-[2]" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide block">{kpi.title}</span>
                <h2 className="text-xl font-black text-slate-900 tracking-tight">{kpi.value}</h2>
                <span className={`text-[10px] font-bold ${kpi.subColor}`}>{kpi.sub}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* --- GRILLE PRINCIPALE (TABLEAU + SIDEBAR VILLES) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* BLOC CENTRAL : TABLEAU DES ÉTABLISSEMENTS (8 COLONNES) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-100">
              <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Liste des établissements</h3>
            </div>

            {/* Version Desktop du Tableau */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs font-semibold text-slate-600">
                <thead>
                  <tr className="border-b border-slate-100 text-[10px] text-slate-400 uppercase font-black bg-slate-50/40">
                    <th className="p-4">Établissement</th>
                    <th className="p-4">Localisation</th>
                    <th className="p-4 text-center">Chambres</th>
                    <th className="p-4 text-center">Réservations <br/> aujourd'hui</th>
                    <th className="p-4 w-32">Taux d'occupation</th>
                    <th className="p-4 text-center">Statut</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {hotelsList.map((hotel) => (
                    <tr key={hotel.id} className="hover:bg-slate-50/30 transition-colors">
                      {/* Nom & Avatar hôtel */}
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-12 rounded-lg bg-slate-100 border border-slate-200 shadow-3xs flex items-center justify-center font-bold text-slate-400 text-[10px]">
                            HÔTEL
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-slate-900 font-bold">{hotel.name}</span>
                              {hotel.badge && (
                                <span className="bg-blue-50 text-[#0B45D2] text-[9px] px-1.5 py-0.2 rounded-md font-bold border border-blue-100">
                                  {hotel.badge}
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-slate-400 font-medium block">{hotel.email}</span>
                          </div>
                        </div>
                      </td>
                      {/* Localisation */}
                      <td className="p-4 text-slate-500 font-medium">{hotel.geo}</td>
                      {/* Chambres */}
                      <td className="p-4 text-center font-bold text-slate-700">{hotel.rooms}</td>
                      {/* Réservations jour */}
                      <td className="p-4 text-center font-bold text-slate-700">{hotel.resToday}</td>
                      {/* Taux occupation Progress Bar */}
                      <td className="p-4">
                        <div className="space-y-1">
                          <div className="flex justify-between items-center text-[10px] font-bold text-slate-700">
                            <span>{hotel.occupy}%</span>
                          </div>
                          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                            <div className={`${hotel.occupyColor} h-full rounded-full`} style={{ width: `${hotel.occupy}%` }} />
                          </div>
                        </div>
                      </td>
                      {/* Statut badge */}
                      <td className="p-4 text-center">
                        <span className="bg-emerald-50 text-[#10B981] border border-emerald-100 text-[9px] font-bold px-2 py-0.5 rounded-md">
                          Actif
                        </span>
                      </td>
                      {/* Actions icônes */}
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-1">
                          <button className="p-1.5 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-50" title="Rapports">
                            <BarChart3 className="h-3.5 w-3.5" />
                          </button>
                          <button className="p-1.5 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-50" title="Configuration">
                            <Settings className="h-3.5 w-3.5" />
                          </button>
                          <button className="p-1 text-slate-300 hover:text-slate-500">
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Bouton Voir tout */}
            <div className="p-3 bg-white text-center border-t border-slate-100">
              <button className="text-[#0B45D2] font-bold hover:underline text-xs">
                Voir tous les établissements
              </button>
            </div>
          </div>
        </div>

        {/* SIDEBAR DE DROITE : RÉPARTITION DONUT & ACTIONS COMPLÈTES (4 COLONNES) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Section Vue d'ensemble Graphique */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-3xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Vue d'ensemble</h3>
              <select className="border border-slate-200 bg-white font-bold text-[10px] rounded-md px-2 py-1 text-slate-600 focus:outline-hidden">
                <option>Ce mois</option>
              </select>
            </div>

            {/* Simulateur graphique Donut */}
            <div className="flex items-center justify-center gap-4 py-2">
              <div className="h-28 w-28 rounded-full border-[14px] border-[#2563EB] border-t-[#10B981] border-r-[#F59E0B] border-b-[#8B5CF6] flex items-center justify-center shrink-0">
                <div className="text-center">
                  <p className="text-sm font-black text-slate-900 tracking-tight">24 850 €</p>
                  <p className="text-[9px] text-slate-400 font-bold uppercase">Total CA</p>
                </div>
              </div>

              {/* Légende textuelle à côté */}
              <div className="space-y-1.5 text-[10px] font-bold text-slate-500 w-full">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#2563EB]"/>Paris</div>
                  <span className="text-slate-800">14 250 € (57%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#10B981]"/>Nice</div>
                  <span className="text-slate-800">6 300 € (25%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#F59E0B]"/>Chamonix</div>
                  <span className="text-slate-800">3 200 € (13%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#8B5CF6]"/>Marseille</div>
                  <span className="text-slate-800">1 100 € (5%)</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-50 flex items-center justify-between text-[11px] font-bold">
              <span className="text-emerald-500">▲ 18.6% vs mois dernier</span>
              <button className="text-[#0B45D2] hover:underline text-[10px]">Voir le rapport complet</button>
            </div>
          </div>

          {/* Section Actions Rapides */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-3xs space-y-3">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Actions rapides</h3>
            <div className="space-y-1 text-xs font-semibold text-slate-700">
              {[
                { label: "Ajouter un établissement", icon: Building2 },
                { label: "Gérer les utilisateurs", icon: Users },
                { label: "Paramètres généraux", icon: Settings },
                { label: "Rapport consolidé", icon: FileSpreadsheet },
              ].map((act, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 hover:bg-slate-50 text-slate-600 rounded-lg cursor-pointer transition-colors group">
                  <div className="flex items-center gap-3">
                    <act.icon className="h-4 w-4 text-slate-400 group-hover:text-[#0B45D2] transition-colors" />
                    <span>{act.label}</span>
                  </div>
                  <ChevronRight className="h-3.5 w-3.5 text-slate-300 group-hover:text-slate-400" />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* --- BLOCS INFÉRIEURS : ACTIVITÉ RÉCENTE vs ALERTES --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* BLOC INFÉRIEUR GAUCHE : ACTIVITÉ RÉCENTE */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-3xs space-y-4">
          <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Activité récente</h3>
          <div className="divide-y divide-slate-100 font-semibold text-xs text-slate-600">
            {[
              { title: "Nouvelle réservation à Hôtel Central Paris", time: "Il y a 10 min", sub: "Chambre 101 - Jean Dupont", icon: Clock, bgIcon: "bg-purple-50 text-purple-600" },
              { title: "Paiement reçu à Hôtel Riviera Nice", time: "Il y a 1 h", sub: "Réservation #RES0987 - 650 €", icon: Euro, bgIcon: "bg-emerald-50 text-emerald-600" },
              { title: "Check-in effectué à Hôtel Montagne Resort", time: "Il y a 2 h", sub: "Chambre 12 - Marie Martin", icon: BedDouble, bgIcon: "bg-orange-50 text-orange-600" },
            ].map((act, idx) => (
              <div key={idx} className="py-3 flex items-start gap-3.5 first:pt-0 last:pb-0">
                <div className={`p-2 rounded-xl shrink-0 ${act.bgIcon}`}>
                  <act.icon className="h-4 w-4" />
                </div>
                <div className="flex-1 space-y-0.5">
                  <div className="flex items-center justify-between gap-4">
                    <h4 className="text-slate-900 font-bold text-xs">{act.title}</h4>
                    <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap">{act.time}</span>
                  </div>
                  <p className="text-slate-400 text-[10px] font-medium">{act.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BLOC INFÉRIEUR DROITE : ALERTES ET NOTIFICATIONS */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-3xs space-y-4">
          <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Alertes et notifications</h3>
          <div className="divide-y divide-slate-100 font-semibold text-xs text-slate-600">
            {[
              { title: "Taux d'occupation faible", time: "Il y a 15 min", sub: "Hôtel Sunset Beach - 30% d'occupation", icon: AlertTriangle, bgIcon: "bg-rose-50 text-rose-600" },
              { title: "Maintenance préventive", time: "Il y a 1 h", sub: "2 chambres en maintenance à Hôtel Montagne Resort", icon: AlertTriangle, bgIcon: "bg-amber-50 text-amber-600" },
              { title: "Mise à jour système", time: "Il y a 3 h", sub: "Nouvelle version disponible", icon: Info, bgIcon: "bg-blue-50 text-blue-600" },
            ].map((al, idx) => (
              <div key={idx} className="py-3 flex items-start gap-3.5 first:pt-0 last:pb-0">
                <div className={`p-2 rounded-xl shrink-0 ${al.bgIcon}`}>
                  <al.icon className="h-4 w-4" />
                </div>
                <div className="flex-1 space-y-0.5">
                  <div className="flex items-center justify-between gap-4">
                    <h4 className="text-slate-900 font-bold text-xs">{al.title}</h4>
                    <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap">{al.time}</span>
                  </div>
                  <p className="text-slate-400 text-[10px] font-medium">{al.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}

