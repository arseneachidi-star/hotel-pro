"use client";

import React, { useState, useMemo } from "react";
import { 
  Download, 
  FileSpreadsheet, 
  TrendingUp, 
  Percent, 
  Layers, 
  Calendar,
  ChevronDown,
  Activity,
  CheckCircle2,
  AlertCircle,
  Loader2,
  X
} from "lucide-react";

// Types pour la gestion des données
type TimeRange = "7d" | "30d" | "this_month" | "custom";

// Données brutes de base réutilisables selon la période sélectionnée
const initialStatsData = {
  "7d": [
    { title: "Taux d'occupation", value: "78%", sub: "+12% vs semaine dernière", subColor: "text-emerald-600", icon: Percent, trends: [30, 45, 35, 60, 80] },
    { title: "RevPAR", value: "45 000 XOF", sub: "+8% vs semaine dernière", subColor: "text-emerald-600", icon: Layers, trends: [40, 50, 42, 58, 70] },
    { title: "CA Journalier", value: "2 450 000 XOF", sub: "+15% vs semaine dernière", subColor: "text-emerald-600", icon: TrendingUp, trends: [20, 55, 40, 70, 90] },
    { title: "Réservations", value: "42", sub: "+10% vs semaine dernière", subColor: "text-emerald-600", icon: Calendar, trends: [30, 40, 50, 45, 60] },
  ],
  "30d": [
    { title: "Taux d'occupation", value: "72%", sub: "+4% vs mois dernier", subColor: "text-emerald-600", icon: Percent, trends: [50, 60, 55, 65, 72] },
    { title: "RevPAR", value: "41 500 XOF", sub: "-2% vs mois dernier", subColor: "text-rose-600", icon: Layers, trends: [60, 58, 52, 48, 45] },
    { title: "CA Journalier", value: "1 980 000 XOF", sub: "+5% vs mois dernier", subColor: "text-emerald-600", icon: TrendingUp, trends: [40, 45, 50, 58, 65] },
    { title: "Réservations", value: "158", sub: "+14% vs mois dernier", subColor: "text-emerald-600", icon: Calendar, trends: [35, 45, 60, 75, 95] },
  ]
};

const topChambresData = [
  { id: "101 - Standard", views: 18, occupation: "90%", revenue: "810 000 XOF", rawRevenue: 810000, type: "Standard" },
  { id: "102 - Deluxe", views: 15, occupation: "75%", revenue: "750 000 XOF", rawRevenue: 750000, type: "Deluxe" },
  { id: "201 - Suite", views: 12, occupation: "80%", revenue: "960 000 XOF", rawRevenue: 960000, type: "Suite" },
  { id: "103 - Standard", views: 10, occupation: "70%", revenue: "450 000 XOF", rawRevenue: 450000, type: "Standard" },
  { id: "104 - Deluxe", views: 8, occupation: "65%", revenue: "400 000 XOF", rawRevenue: 400000, type: "Deluxe" },
  { id: "202 - Suite", views: 7, occupation: "60%", revenue: "720 000 XOF", rawRevenue: 720000, type: "Suite" },
];

const dernieresReservationsData = [
  { client: "Paul Bernard", room: "101", checkIn: "21/05/2024", checkOut: "23/05/2024", amount: "90 000 XOF", status: "Confirmée", statusClass: "bg-emerald-50 text-emerald-600" },
  { client: "Sophie Leroy", room: "102", checkIn: "20/05/2024", checkOut: "22/05/2024", amount: "120 000 XOF", status: "Confirmée", statusClass: "bg-emerald-50 text-emerald-600" },
  { client: "Lucas Moreau", room: "201", checkIn: "19/05/2024", checkOut: "21/05/2024", amount: "150 000 XOF", status: "Confirmée", statusClass: "bg-emerald-50 text-emerald-600" },
  { client: "Claire Dubois", room: "103", checkIn: "18/05/2024", checkOut: "20/05/2024", amount: "90 000 XOF", status: "Confirmée", statusClass: "bg-emerald-50 text-emerald-600" },
  { client: "Thomas Petit", room: "104", checkIn: "18/05/2024", checkOut: "19/05/2024", amount: "80 000 XOF", status: "Annulée", statusClass: "bg-rose-50 text-rose-600" },
  { id: "6", client: "Amadou Diallo", room: "202", checkIn: "17/05/2024", checkOut: "19/05/2024", amount: "180 000 XOF", status: "Confirmée", statusClass: "bg-emerald-50 text-emerald-600" },
];

export default function TableauDeBordReporting() {
  // --- ÉTATS ---
  const [timeRange, setTimeRange] = useState<TimeRange>("7d");
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [exportingType, setExportingType] = useState<"pdf" | "excel" | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  
  // États de vue étendue pour les tableaux
  const [showAllChambres, setShowAllChambres] = useState(false);
  const [showAllReservations, setShowAllReservations] = useState(false);
  const [showFullReportModal, setShowFullReportModal] = useState(false);

  // --- SÉLECTION DES LABELS DE DATE ---
  const dateLabel = useMemo(() => {
    switch (timeRange) {
      case "7d": return "15/05/2024 - 21/05/2024 (7 Derniers jours)";
      case "30d": return "22/04/2024 - 21/05/2024 (30 Derniers jours)";
      case "this_month": return "01/05/2024 - 21/05/2024 (Mois en cours)";
      default: return "Période personnalisée";
    }
  }, [timeRange]);

  // Synchronisation des indicateurs du haut
  const currentStats = useMemo(() => {
    if (timeRange === "7d") return initialStatsData["7d"];
    return initialStatsData["30d"]; // Simule des données de variation sur 30j ou mois en cours
  }, [timeRange]);

  // --- TRUNCATE OU DISPLAY COMPLET DES TABLEAUX ---
  const visibleChambres = useMemo(() => {
    return showAllChambres ? topChambresData : topChambresData.slice(0, 5);
  }, [showAllChambres]);

  const visibleReservations = useMemo(() => {
    return showAllReservations ? dernieresReservationsData : dernieresReservationsData.slice(0, 5);
  }, [showAllReservations]);

  // --- FONCTIONS ACTIONS (EXPORT SIMULÉ) ---
  const handleExport = (type: "pdf" | "excel") => {
    setExportingType(type);
    // Simulation du temps de génération de document professionnel
    setTimeout(() => {
      setExportingType(null);
      setNotification(`Le rapport d'établissement a été exporté avec succès au format ${type.toUpperCase()}.`);
      // Extinction automatique du toast de notification
      setTimeout(() => setNotification(null), 4000);
    }, 1800);
  };

  return (
    <div className="space-y-6 relative">
      
      {/* --- BANDEAU ALERTE TOAST NOTIFICATION --- */}
      {notification && (
        <div className="fixed top-4 right-4 bg-slate-900 border border-slate-800 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 z-50 text-xs animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
          <span className="font-semibold">{notification}</span>
          <button onClick={() => setNotification(null)} className="text-slate-400 hover:text-white ml-2 p-0.5 rounded-full hover:bg-slate-800">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

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
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold relative">
          
          {/* Menu déroulant sélecteur de Date */}
          <div className="relative">
            <button 
              onClick={() => setShowDateDropdown(!showDateDropdown)}
              className="flex items-center gap-2 bg-white border border-slate-200 hover:border-slate-300 px-3 py-2 rounded-lg text-slate-600 shadow-3xs transition-all active:scale-95"
            >
              <Calendar className="h-3.5 w-3.5 text-slate-400" />
              <span>{dateLabel}</span>
              <ChevronDown className="h-3 w-3 text-slate-400 ml-1 transition-transform duration-200" />
            </button>

            {showDateDropdown && (
              <div className="absolute right-0 top-full mt-1.5 w-56 bg-white border border-slate-200 rounded-xl shadow-lg z-50 p-1.5 space-y-0.5">
                <button 
                  onClick={() => { setTimeRange("7d"); setShowDateDropdown(false); }} 
                  className={`w-full text-left px-3 py-2 rounded-lg ${timeRange === "7d" ? "bg-slate-50 text-[#0B45D2]" : "hover:bg-slate-50 text-slate-600"}`}
                >
                  7 Derniers Jours
                </button>
                <button 
                  onClick={() => { setTimeRange("30d"); setShowDateDropdown(false); }} 
                  className={`w-full text-left px-3 py-2 rounded-lg ${timeRange === "30d" ? "bg-slate-50 text-[#0B45D2]" : "hover:bg-slate-50 text-slate-600"}`}
                >
                  30 Derniers Jours
                </button>
                <button 
                  onClick={() => { setTimeRange("this_month"); setShowDateDropdown(false); }} 
                  className={`w-full text-left px-3 py-2 rounded-lg ${timeRange === "this_month" ? "bg-slate-50 text-[#0B45D2]" : "hover:bg-slate-50 text-slate-600"}`}
                >
                  Mois en cours
                </button>
              </div>
            )}
          </div>

          {/* Bouton Exporter PDF */}
          <button 
            disabled={exportingType !== null}
            onClick={() => handleExport("pdf")}
            className="flex items-center gap-1.5 bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-60 text-slate-700 px-3 py-2 rounded-lg shadow-3xs transition-all active:scale-95"
          >
            {exportingType === "pdf" ? (
              <Loader2 className="h-3.5 w-3.5 text-slate-400 animate-spin" />
            ) : (
              <Download className="h-3.5 w-3.5 text-slate-400" />
            )}
            <span>Exporter PDF</span>
          </button>

          {/* Bouton Exporter Excel */}
          <button 
            disabled={exportingType !== null}
            onClick={() => handleExport("excel")}
            className="flex items-center gap-1.5 bg-[#0B45D2] hover:bg-[#093bb5] disabled:opacity-60 text-white px-3 py-2 rounded-lg shadow-3xs transition-all active:scale-95"
          >
            {exportingType === "excel" ? (
              <Loader2 className="h-3.5 w-3.5 text-white animate-spin" />
            ) : (
              <FileSpreadsheet className="h-3.5 w-3.5" />
            )}
            <span>Exporter Excel</span>
          </button>
        </div>
      </div>

      {/* --- SECTION 1 : LES 4 CARTES D'INDICATEURS --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {currentStats.map((card, idx) => {
          return (
            <div key={idx} className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-3xs space-y-2 hover:shadow-2xs transition-shadow">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">{card.title}</span>
                <card.icon className="h-4 w-4 text-slate-400" />
              </div>
              
              <div className="flex items-baseline justify-between">
                <div className="space-y-0.5">
                  <p className="text-2xl font-black text-slate-900 tracking-tight">{card.value}</p>
                  <p className={`text-[10px] font-bold ${card.subColor}`}>{card.sub}</p>
                </div>
                
                {/* Graphique de tendance dynamique selon les hauteurs de tableau d'indicateur */}
                <div className="h-8 w-16 flex items-end gap-0.5 opacity-50">
                  {card.trends.map((h, i) => (
                    <div 
                      key={i} 
                      style={{ height: `${h}%` }} 
                      className={`w-full rounded-2xs ${card.subColor.includes("emerald") ? "bg-emerald-500" : "bg-rose-500"}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* --- SECTION 2 : LES GRAPHIQUES PRINCIPAUX --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Graphique Taux d'occupation (Interactions sur axes) */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Taux d'occupation</h3>
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
              <span className="px-2 py-0.5 border border-slate-200 rounded bg-slate-50">{timeRange === "7d" ? "7 derniers jours" : "30 derniers jours"}</span>
            </div>
          </div>
          
          <div className="h-48 w-full border-b border-l border-slate-100 relative flex items-end pt-4 cursor-pointer group">
            <div className="absolute inset-0 flex flex-col justify-between text-[9px] text-slate-300 pointer-events-none font-bold">
              <div className="border-b border-slate-100/50 w-full pb-0.5">100%</div>
              <div className="border-b border-slate-100/50 w-full pb-0.5">75%</div>
              <div className="border-b border-slate-100/50 w-full pb-0.5">50%</div>
              <div className="border-b border-slate-100/50 w-full pb-0.5">25%</div>
              <div className="w-full">0%</div>
            </div>
            
            {/* Simulation de survol interactif d'une courbe de données */}
            <div className={`w-full ${timeRange === "7d" ? "h-32" : "h-28"} bg-gradient-to-t from-blue-50/40 to-blue-500/10 border-t-2 border-blue-600 absolute bottom-0 left-0 right-0 rounded-t-sm flex items-end justify-between px-2 text-[9px] font-bold text-slate-400 transition-all duration-300 group-hover:from-blue-100/50`}>
              <span>15/05</span><span>16/05</span><span>17/05</span><span>18/05</span><span>19/05</span><span>20/05</span><span>21/05</span>
            </div>
          </div>
        </div>

        {/* Répartition des réservations (Donut interactif) */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-4 space-y-4">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Répartition des réservations</h3>
          <div className="flex items-center h-48 gap-4 justify-center">
            <div className="h-28 w-28 rounded-full border-[14px] border-blue-600 border-t-emerald-500 border-r-amber-400 border-b-slate-400 flex items-center justify-center shrink-0 shadow-3xs transition-transform duration-300 hover:rotate-12" />
            <div className="space-y-1.5 text-[10px] font-bold text-slate-500 w-full">
              <div className="flex justify-between items-center px-1.5 py-0.5 rounded-md hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-blue-600"/>Directes</div>
                <span className="text-slate-800">55%</span>
              </div>
              <div className="flex justify-between items-center px-1.5 py-0.5 rounded-md hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-emerald-500"/>Booking.com</div>
                <span className="text-slate-800">25%</span>
              </div>
              <div className="flex justify-between items-center px-1.5 py-0.5 rounded-md hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-amber-400"/>Expedia</div>
                <span className="text-slate-800">15%</span>
              </div>
              <div className="flex justify-between items-center px-1.5 py-0.5 rounded-md hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-slate-400"/>Autres</div>
                <span className="text-slate-800">5%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Revenus Histogramme (Effets au passage de la souris) */}
        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-xl p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Revenus (XOF)</h3>
          </div>
          
          <div className="h-48 flex items-end justify-between gap-2 px-1 pt-6 border-b border-slate-100 text-[9px] font-bold text-slate-400">
            <div className="flex flex-col items-center gap-1 w-full group"><div className="w-full bg-blue-600 h-28 rounded-t-xs transition-all group-hover:bg-[#0B45D2]"></div><span>15/05</span></div>
            <div className="flex flex-col items-center gap-1 w-full group"><div className="w-full bg-blue-600 h-32 rounded-t-xs transition-all group-hover:bg-[#0B45D2]"></div><span>16/05</span></div>
            <div className="flex flex-col items-center gap-1 w-full group"><div className="w-full bg-blue-600 h-36 rounded-t-xs transition-all group-hover:bg-[#0B45D2]"></div><span>17/05</span></div>
            <div className="flex flex-col items-center gap-1 w-full group"><div className="w-full bg-blue-600 h-24 rounded-t-xs transition-all group-hover:bg-[#0B45D2]"></div><span>18/05</span></div>
            <div className="flex flex-col items-center gap-1 w-full group"><div className="w-full bg-blue-600 h-30 rounded-t-xs transition-all group-hover:bg-[#0B45D2]"></div><span>19/05</span></div>
            <div className="flex flex-col items-center gap-1 w-full group"><div className="w-full bg-blue-600 h-40 rounded-t-xs transition-all group-hover:bg-[#0B45D2]"></div><span>20/05</span></div>
            <div className="flex flex-col items-center gap-1 w-full group"><div className="w-full bg-blue-600 h-44 rounded-t-xs transition-all group-hover:bg-[#0B45D2]"></div><span>21/05</span></div>
          </div>
        </div>

      </div>

      {/* --- SECTION 3 : LES TABLEAUX INTERACTIFS (BAS DE PAGE) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Top des chambres (Dynamisé pour voir la liste complète) */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden flex flex-col justify-between">
          <div>
            <div className="p-3 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Top des chambres</h3>
              <span className="text-[10px] bg-slate-100 text-slate-500 font-bold px-1.5 py-0.5 rounded-full">{topChambresData.length} total</span>
            </div>
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 text-[10px] text-slate-400 font-bold uppercase border-b border-slate-100">
                  <th className="p-2.5">Chambre</th>
                  <th className="p-2.5 text-center">Rés.</th>
                  <th className="p-2.5 text-center">Occupation</th>
                  <th className="p-2.5 text-right">Revenus</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 font-semibold text-slate-600">
                {visibleChambres.map((item, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
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
            <button 
              onClick={() => setShowAllChambres(!showAllChambres)}
              className="text-[11px] font-bold text-[#0B45D2] hover:underline"
            >
              {showAllChambres ? "Réduire la liste" : "Voir toutes les chambres"}
            </button>
          </div>
        </div>

        {/* Dernières réservations (Dynamisé pour voir la liste complète) */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden flex flex-col justify-between">
          <div>
            <div className="p-3 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Dernières réservations</h3>
              <span className="text-[10px] bg-slate-100 text-slate-500 font-bold px-1.5 py-0.5 rounded-full">{dernieresReservationsData.length} total</span>
            </div>
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 text-[10px] text-slate-400 font-bold uppercase border-b border-slate-100">
                  <th className="p-2.5">Client</th>
                  <th className="p-2.5 text-center">Ch.</th>
                  <th className="p-2.5">Arrivée</th>
                  <th className="p-2.5 text-right">Montant</th>
                  <th className="p-2.5 text-center">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 font-semibold text-slate-600">
                {visibleReservations.map((res, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-2.5 text-slate-900 font-bold">{res.client}</td>
                    <td className="p-2.5 text-center text-slate-500">{res.room}</td>
                    <td className="p-2.5 text-slate-400">{res.checkIn}</td>
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
            <button 
              onClick={() => setShowAllReservations(!showAllReservations)}
              className="text-[11px] font-bold text-[#0B45D2] hover:underline"
            >
              {showAllReservations ? "Réduire l'affichage" : "Voir toutes les réservations"}
            </button>
          </div>
        </div>

        {/* Résumé rapide (Bouton d'affichage d'un modal pour le rapport complet) */}
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
          <button 
            onClick={() => setShowFullReportModal(true)}
            className="w-full mt-4 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold py-2 rounded-lg text-[11px] flex items-center justify-center gap-1 shadow-3xs transition-all active:scale-95"
          >
            <Activity className="h-3.5 w-3.5 text-slate-400" /> Voir le rapport complet
          </button>
        </div>

      </div>

      {/* --- FOOTER TIMESTAMP --- */}
      <p className="text-[10px] font-bold text-slate-400 text-center pt-2">Données mises à jour le 21/05/2024 à 08:30 ↻</p>

      {/* ========================================================
          MODAL DE SIMULATION DU RAPPORT COMPLET (PRO ET PROPRE)
         ======================================================== */}
      {showFullReportModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-3xs animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center px-4 py-3 bg-slate-50 border-b border-slate-100">
              <div className="flex items-center gap-2 text-[#0B45D2]">
                <Activity className="h-4 w-4" />
                <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Rapport Audit Analytique - HôtelPro</h2>
              </div>
              <button 
                onClick={() => setShowFullReportModal(false)} 
                className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-200/50 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            
            <div className="p-5 space-y-4 text-xs font-medium text-slate-600">
              <div className="p-3 bg-blue-50/50 border border-blue-100 rounded-lg flex gap-3">
                <AlertCircle className="h-4 w-4 text-[#0B45D2] shrink-0 mt-0.5" />
                <p className="text-[11px] text-[#0B45D2] font-semibold leading-relaxed">
                  Ce module d'audit consolide l'ensemble des données d'inventaire, de nettoyage et des plateformes tierces comme Booking.com et Expedia.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-800 text-[11px] uppercase tracking-wide">Métriques Générales Audités</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                    <span className="text-[10px] text-slate-400 block">Chiffre d'Affaire Net Estimé</span>
                    <span className="text-sm font-black text-slate-900">17 150 000 XOF</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                    <span className="text-[10px] text-slate-400 block">Durée Moyenne de Séjour</span>
                    <span className="text-sm font-black text-slate-900">2.4 Nuits</span>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 border-t border-slate-100 pt-3">
                <h4 className="font-bold text-slate-800 text-[11px] uppercase tracking-wide">État des Canaux Locaux</h4>
                <div className="flex justify-between py-1 border-b border-slate-50"><span>Taux d'annulation global</span><span className="font-bold text-rose-600">4.2%</span></div>
                <div className="flex justify-between py-1 border-b border-slate-50"><span>Score de satisfaction client</span><span className="font-bold text-emerald-600">4.8 / 5</span></div>
                <div className="flex justify-between py-1"><span>Performance du personnel de chambre</span><span className="font-bold text-slate-900">96.8%</span></div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 p-3 bg-slate-50 border-t border-slate-100">
              <button 
                onClick={() => setShowFullReportModal(false)}
                className="px-4 py-2 text-xs font-bold text-slate-500 hover:bg-slate-200/50 rounded-lg transition-colors"
              >
                Fermer l'audit
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}