"use client";

import React, { useState, useMemo } from "react";
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
  Info,
  X,
  CheckCircle2,
  Trash2,
  Power,
  TrendingUp,
  ShieldAlert,
  UserCheck,
  Copy,
  Mail
} from "lucide-react";

// --- INTERFACES DES TYPES ---
interface HotelItem {
  id: number;
  name: string;
  badge: string;
  email: string;
  geo: string;
  rooms: number;
  resToday: number;
  occupy: number;
  occupyColor: string;
  active: boolean;
  revenue: { month: number; year: number };
}

interface ActivityItem {
  id: string;
  title: string;
  time: string;
  sub: string;
  type: "info" | "success" | "warning";
}

// --- DONNÉES INITIALES ---
const INITIAL_HOTELS: HotelItem[] = [
  { id: 1, name: "Hôtel Central Paris", badge: "Principal", email: "paris@hotelpro.com", geo: "Paris, France", rooms: 120, resToday: 18, occupy: 78, occupyColor: "bg-emerald-500", active: true, revenue: { month: 14250, year: 171000 } },
  { id: 2, name: "Hôtel Riviera Nice", badge: "", email: "nice@hotelpro.com", geo: "Nice, France", rooms: 60, resToday: 7, occupy: 65, occupyColor: "bg-emerald-500", active: true, revenue: { month: 6300, year: 75600 } },
  { id: 3, name: "Hôtel Montagne Resort", badge: "", email: "montagne@hotelpro.com", geo: "Chamonix, France", rooms: 45, resToday: 4, occupy: 48, occupyColor: "bg-amber-500", active: true, revenue: { month: 3200, year: 38400 } },
  { id: 4, name: "Hôtel Sunset Beach", badge: "", email: "beach@hotelpro.com", geo: "Marseille, France", rooms: 20, resToday: 3, occupy: 30, occupyColor: "bg-rose-500", active: true, revenue: { month: 1100, year: 13200 } },
];

const INITIAL_ACTIVITIES: ActivityItem[] = [
  { id: "act-1", title: "Nouvelle réservation à Hôtel Central Paris", time: "Il y a 10 min", sub: "Chambre 101 - Jean Dupont", type: "info" },
  { id: "act-2", title: "Paiement reçu à Hôtel Riviera Nice", time: "Il y a 1 h", sub: "Réservation #RES0987 - 650 €", type: "success" },
  { id: "act-3", title: "Check-in effectué à Hôtel Montagne Resort", time: "Il y a 2 h", sub: "Chambre 12 - Marie Martin", type: "info" },
];

export default function MultiEtablissementsPage() {
  // --- ÉTATS ---
  const [hotels, setHotels] = useState<HotelItem[]>(INITIAL_HOTELS);
  const [activities, setActivities] = useState<ActivityItem[]>(INITIAL_ACTIVITIES);
  const [timePeriod, setTimePeriod] = useState<"month" | "year">("month");
  const [activeMenuId, setActiveMenuId] = useState<number | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [showAllHotels, setShowAllHotels] = useState(false);
  
  // États des fenêtres modales
  const [showAddModal, setShowAddModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showUsersModal, setShowUsersModal] = useState(false);
  
  // Formulaire d'ajout
  const [newHotelName, setNewHotelName] = useState("");
  const [newHotelGeo, setNewHotelGeo] = useState("");
  const [newHotelRooms, setNewHotelRooms] = useState("30");

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // --- COPIER L'EMAIL DANS LE PRESSE-PAPIERS ---
  const handleCopyEmail = (email: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Évite les conflits de clics sur la ligne
    navigator.clipboard.writeText(email);
    triggerToast(`Adresse copiée : ${email}`);
  };

  // --- ACTIONS MUTATEURS ---
  const handleToggleStatus = (id: number) => {
    setHotels(prev => prev.map(h => h.id === id ? { ...h, active: !h.active } : h));
    const target = hotels.find(h => h.id === id);
    triggerToast(`Statut de "${target?.name}" modifié.`);
    setActiveMenuId(null);
  };

  const handleDeleteHotel = (id: number) => {
    const target = hotels.find(h => h.id !== id);
    setHotels(prev => prev.filter(h => h.id !== id));
    triggerToast(`"${target?.name}" a été retiré du parc.`);
    setActiveMenuId(null);
  };

  const handleCreateHotel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHotelName || !newHotelGeo) return;

    const newId = hotels.length > 0 ? Math.max(...hotels.map(h => h.id)) + 1 : 1;
    const roomsCount = parseInt(newHotelRooms, 10) || 10;
    const cleanEmail = `${newHotelName.toLowerCase().trim().replace(/\s+/g, "-")}@hotelpro.com`;
    
    const newProperty: HotelItem = {
      id: newId,
      name: newHotelName,
      badge: "",
      email: cleanEmail,
      geo: newHotelGeo,
      rooms: roomsCount,
      resToday: 0,
      occupy: 0,
      occupyColor: "bg-rose-500",
      active: true,
      revenue: { month: 1200, year: 14400 }
    };

    setHotels(prev => [...prev, newProperty]);
    
    setActivities(prev => [
      {
        id: `act-${Date.now()}`,
        title: `Ajout de l'établissement ${newHotelName}`,
        time: "À l'instant",
        sub: `Propriété enregistrée avec ${roomsCount} chambres à ${newHotelGeo}.`,
        type: "success"
      },
      ...prev
    ]);

    setShowAddModal(false);
    setNewHotelName("");
    setNewHotelGeo("");
    triggerToast(`"${newHotelName}" configuré avec succès.`);
  };

  // --- CALCULS DES KPI DYNAMIQUES VIA MEMOIZATON ---
  const stats = useMemo(() => {
    const totalEtablissements = hotels.length;
    const totalChambres = hotels.reduce((acc, curr) => acc + curr.rooms, 0);
    const totalReservationsToday = hotels.reduce((acc, curr) => acc + curr.resToday, 0);
    const calculatedRevenue = hotels.reduce((acc, curr) => acc + (timePeriod === "month" ? curr.revenue.month : curr.revenue.year), 0);

    return {
      totalEtablissements,
      totalChambres,
      totalReservationsToday,
      totalRevenue: calculatedRevenue.toLocaleString("fr-FR") + " €"
    };
  }, [hotels, timePeriod]);

  const displayedHotels = showAllHotels ? hotels : hotels.slice(0, 3);

  const alerts: ActivityItem[] = useMemo(() => {
    return hotels
      .filter(h => h.occupy < 50)
      .map(h => ({
        id: `alt-${h.id}`,
        title: `Alerte occupation : ${h.name}`,
        time: "Analyse en direct",
        sub: `Le taux d'occupation actuel est critique (${h.occupy}%).`,
        type: "warning"
      }));
  }, [hotels]);

  return (
    <div className="space-y-6 relative text-slate-600">
      
      {/* --- TOAST SYSTEM --- */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-xl border border-slate-800 transition-all animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>{toast}</span>
        </div>
      )}

      {/* --- MODALE D'AJOUT D'ÉTABLISSEMENT --- */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <form onSubmit={handleCreateHotel} className="bg-white rounded-xl border border-slate-200 w-full max-w-md shadow-2xl overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2 font-black text-slate-800 text-xs uppercase tracking-wider">
                <Building2 className="h-4 w-4 text-[#0B45D2]" />
                <span>Nouvel Établissement</span>
              </div>
              <button type="button" onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-4 space-y-4 text-xs font-semibold">
              <div className="space-y-1.5">
                <label className="text-slate-500 block">Nom de l'hôtel</label>
                <input type="text" required placeholder="Ex: Hôtel Grand Bellevue" value={newHotelName} onChange={(e) => setNewHotelName(e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-800 font-medium focus:outline-hidden focus:border-[#0B45D2]" />
              </div>
              <div className="space-y-1.5">
                <label className="text-slate-500 block">Localisation (Ville, Pays)</label>
                <input type="text" required placeholder="Ex: Lyon, France" value={newHotelGeo} onChange={(e) => setNewHotelGeo(e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-800 font-medium focus:outline-hidden focus:border-[#0B45D2]" />
              </div>
              <div className="space-y-1.5">
                <label className="text-slate-500 block">Nombre total de chambres</label>
                <input type="number" min="1" value={newHotelRooms} onChange={(e) => setNewHotelRooms(e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-800 font-medium focus:outline-hidden focus:border-[#0B45D2]" />
              </div>
            </div>
            <div className="p-3 bg-slate-50 border-t border-slate-100 flex justify-end gap-2 text-xs font-bold">
              <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 text-slate-500 cursor-pointer">Annuler</button>
              <button type="submit" className="px-4 py-2 bg-[#0B45D2] hover:bg-[#093bb5] text-white rounded-lg cursor-pointer">Enregistrer</button>
            </div>
          </form>
        </div>
      )}

      {/* --- MODALE REPORT FINANCIER CONSOLIDÉ --- */}
      {showReportModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-slate-200 w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2 font-black text-slate-800 text-xs uppercase tracking-wider">
                <FileSpreadsheet className="h-4 w-4 text-emerald-600" />
                <span>Rapport d'Analyse Financière ({timePeriod === "month" ? "Mensuel" : "Annuel"})</span>
              </div>
              <button type="button" onClick={() => setShowReportModal(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-4 space-y-3 text-xs">
              <p className="font-semibold text-slate-500">Flux de revenus générés par vos {hotels.length} propriétés hôtelières :</p>
              <div className="space-y-2">
                {hotels.map(h => (
                  <div key={h.id} className="flex justify-between items-center p-2.5 bg-slate-50 rounded-lg font-bold">
                    <span className="text-slate-800">{h.name}</span>
                    <span className="text-slate-900">{(timePeriod === "month" ? h.revenue.month : h.revenue.year).toLocaleString("fr-FR")} €</span>
                  </div>
                ))}
                <div className="flex justify-between items-center p-3 bg-emerald-50 text-emerald-900 rounded-lg font-black text-sm border border-emerald-100">
                  <span>CHIFFRE D'AFFAIRES TOTAL</span>
                  <span>{stats.totalRevenue}</span>
                </div>
              </div>
            </div>
            <div className="p-3 bg-slate-50 border-t border-slate-100 flex justify-end text-xs font-bold">
              <button type="button" onClick={() => { setShowReportModal(false); triggerToast("Exportation Excel (.xlsx) démarrée"); }} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg cursor-pointer flex items-center gap-1.5">
                <FileSpreadsheet className="h-3.5 w-3.5" /> Exporter les données (.xlsx)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODALE GESTION DES UTILISATEURS / PERMISSIONS --- */}
      {showUsersModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-slate-200 w-full max-w-md shadow-2xl overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2 font-black text-slate-800 text-xs uppercase tracking-wider">
                <Users className="h-4 w-4 text-[#0B45D2]" />
                <span>Permissions & Équipe Technique</span>
              </div>
              <button type="button" onClick={() => setShowUsersModal(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-4 space-y-3 text-xs font-semibold">
              <div className="flex items-center justify-between p-2.5 border border-slate-100 rounded-lg">
                <div>
                  <p className="text-slate-900 font-bold">Arsene (Vous)</p>
                  <p className="text-[10px] text-slate-400">Administrateur Système / Chef de projet</p>
                </div>
                <span className="bg-blue-50 text-[#0B45D2] text-[9px] px-2 py-0.5 rounded-md font-black border border-blue-100 uppercase">Super-Admin</span>
              </div>
              <div className="flex items-center justify-between p-2.5 border border-slate-100 rounded-lg bg-slate-50/50">
                <div>
                  <p className="text-slate-700">Équipe Technique (7 membres)</p>
                  <p className="text-[10px] text-slate-400">Managers d'hôtels & Développeurs intégrateurs</p>
                </div>
                <span className="bg-slate-100 text-slate-600 text-[9px] px-2 py-0.5 rounded-md font-black uppercase">Équipe Active</span>
              </div>
            </div>
            <div className="p-3 bg-slate-50 border-t border-slate-100 flex justify-end text-xs font-bold">
              <button type="button" onClick={() => { setShowUsersModal(false); triggerToast("Invitation envoyée au collaborateur."); }} className="px-4 py-2 bg-[#0B45D2] hover:bg-[#093bb5] text-white rounded-lg cursor-pointer flex items-center gap-1.5">
                <UserCheck className="h-3.5 w-3.5" /> Inviter un manager
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- EN-TÊTE --- */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Multi-établissements</h1>
          <p className="text-[11px] text-slate-400 mt-0.5">Gérez et centralisez toutes vos propriétés hôtelières</p>
          <p className="text-[10px] text-slate-400 font-medium mt-1">Accueil  /  Multi-établissements</p>
        </div>
        <button type="button" onClick={() => setShowAddModal(true)} className="flex items-center gap-1.5 bg-[#0B45D2] hover:bg-[#093bb5] text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-xs transition-colors cursor-pointer">
          <Plus className="h-4 w-4 stroke-[2.5]" /> Ajouter un établissement
        </button>
      </div>

      {/* --- CARTES KPI DYNAMIQUES --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { id: 1, title: "Total établissements", value: stats.totalEtablissements, sub: "Actifs", subColor: "text-slate-400", icon: Building2, bgIcon: "bg-blue-50 text-blue-600" },
          { id: 2, title: "Chambres totales", value: stats.totalChambres, sub: "Toutes propriétés", subColor: "text-slate-400", icon: BedDouble, bgIcon: "bg-emerald-50 text-emerald-600" },
          { id: 3, title: "Réservations aujourd'hui", value: stats.totalReservationsToday, sub: "Toutes propriétés", subColor: "text-slate-400", icon: CalendarCheck2, bgIcon: "bg-amber-50 text-amber-600" },
          { id: 4, title: `Chiffre d'affaires (${timePeriod === "month" ? "mois" : "année"})`, value: stats.totalRevenue, sub: "▲ 18.6% vs période préc.", subColor: "text-emerald-500", icon: Euro, bgIcon: "bg-purple-50 text-purple-600" },
        ].map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.id} className="bg-white border border-slate-200 rounded-xl p-4 shadow-3xs flex items-center gap-4 transition-all hover:shadow-xs">
              <div className={`p-3 rounded-xl ${kpi.bgIcon} shrink-0`}><Icon className="h-5 w-5 stroke-[2]" /></div>
              <div className="space-y-0.5">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide block">{kpi.title}</span>
                <h2 className="text-xl font-black text-slate-900 tracking-tight">{kpi.value}</h2>
                <span className={`text-[10px] font-bold ${kpi.subColor}`}>{kpi.sub}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* --- GRILLE PRINCIPALE --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* TABLEAU DES ÉTABLISSEMENTS INTERACTIF */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/20">
              <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Liste des établissements</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 rounded-md text-slate-500">Affichage : {displayedHotels.length} sur {hotels.length}</span>
            </div>

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
                  {displayedHotels.map((hotel) => (
                    <tr key={hotel.id} className={`transition-colors ${hotel.active ? "hover:bg-slate-50/30" : "bg-slate-50/40 opacity-75"}`}>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-12 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-400 text-[10px]">HÔTEL</div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-slate-900 font-bold">{hotel.name}</span>
                              {hotel.badge && <span className="bg-blue-50 text-[#0B45D2] text-[9px] px-1.5 py-0.2 rounded-md font-bold border border-blue-100">{hotel.badge}</span>}
                            </div>
                            
                            {/* ENCADREMENT EMAIL FONCTIONNEL + ACTION ACTION RAPIDE COPIE */}
                            <div className="flex items-center gap-1 group/mail mt-0.5">
                              <a 
                                href={`mailto:${hotel.email}`} 
                                className="text-[10px] text-slate-400 hover:text-[#0B45D2] font-medium flex items-center gap-1 transition-colors hover:underline"
                                title={`Envoyer un email à ${hotel.name}`}
                              >
                                <Mail className="h-2.5 w-2.5 shrink-0" />
                                <span className="truncate max-w-[130px]">{hotel.email}</span>
                              </a>
                              <button 
                                type="button"
                                onClick={(e) => handleCopyEmail(hotel.email, e)}
                                className="opacity-0 group-hover/mail:opacity-100 p-0.5 rounded-sm hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-all cursor-pointer"
                                title="Copier l'adresse email"
                              >
                                <Copy className="h-2.5 w-2.5" />
                              </button>
                            </div>

                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-slate-500 font-medium">{hotel.geo}</td>
                      <td className="p-4 text-center font-bold text-slate-700">{hotel.rooms}</td>
                      <td className="p-4 text-center font-bold text-slate-700">{hotel.resToday}</td>
                      <td className="p-4">
                        <div className="space-y-1">
                          <div className="flex justify-between items-center text-[10px] font-bold text-slate-700"><span>{hotel.occupy}%</span></div>
                          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                            <div className={`${hotel.occupyColor} h-full rounded-full`} style={{ width: `${hotel.occupy}%` }} />
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <span className={`border text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wide transition-all ${hotel.active ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-rose-50 text-rose-600 border-rose-100"}`}>
                          {hotel.active ? "Actif" : "Inactif"}
                        </span>
                      </td>
                      <td className="p-4 relative">
                        <div className="flex items-center justify-center gap-1">
                          <button type="button" onClick={() => { setTimePeriod("month"); setShowReportModal(true); }} className="p-1.5 text-slate-400 hover:text-[#0B45D2] rounded-md hover:bg-slate-50 cursor-pointer transition-colors" title="Rapports"><BarChart3 className="h-3.5 w-3.5" /></button>
                          <button type="button" onClick={() => triggerToast(`Ouverture de la configuration technique de ${hotel.name}`)} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-50 cursor-pointer transition-colors" title="Configuration"><Settings className="h-3.5 w-3.5" /></button>
                          <div className="relative">
                            <button type="button" onClick={() => setActiveMenuId(activeMenuId === hotel.id ? null : hotel.id)} className="p-1 text-slate-300 hover:text-slate-500 cursor-pointer"><MoreVertical className="h-4 w-4" /></button>
                            {activeMenuId === hotel.id && (
                              <div className="absolute right-0 top-6 bg-white border border-slate-200 rounded-lg shadow-xl py-1 z-30 w-36 text-left text-[11px] font-bold">
                                <button type="button" onClick={() => handleToggleStatus(hotel.id)} className="w-full text-left px-2.5 py-1.5 hover:bg-slate-50 text-slate-700 flex items-center gap-1.5 cursor-pointer"><Power className="h-3 w-3 text-slate-400" />{hotel.active ? "Désactiver" : "Activer"}</button>
                                <button type="button" onClick={() => handleDeleteHotel(hotel.id)} className="w-full text-left px-2.5 py-1.5 hover:bg-rose-50 text-rose-600 flex items-center gap-1.5 border-t border-slate-100 cursor-pointer"><Trash2 className="h-3 w-3" /> Supprimer</button>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-3 bg-white text-center border-t border-slate-100">
              <button 
                type="button" 
                onClick={() => setShowAllHotels(!showAllHotels)}
                className="text-[#0B45D2] font-bold hover:underline text-xs cursor-pointer"
              >
                {showAllHotels ? "Réduire l'affichage" : `Voir tous les établissements (${hotels.length})`}
              </button>
            </div>
          </div>
        </div>

        {/* SIDEBAR DE DROITE : FINANCES & ACTIONS RAPIDES COMPLÈTES */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-3xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Vue d'ensemble</h3>
              <select value={timePeriod} onChange={(e) => setTimePeriod(e.target.value as "month" | "year")} className="border border-slate-200 bg-white font-bold text-[10px] rounded-md px-2 py-1 text-slate-600 focus:outline-hidden cursor-pointer">
                <option value="month">Ce mois</option>
                <option value="year">Cette année</option>
              </select>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col items-center justify-center gap-4 py-2">
              <div className="h-28 w-28 rounded-full border-[14px] border-[#2563EB] border-t-[#10B981] border-r-[#F59E0B] border-b-[#8B5CF6] flex items-center justify-center shrink-0">
                <div className="text-center">
                  <p className="text-[11px] font-black text-slate-900 tracking-tight leading-none mb-0.5">{stats.totalRevenue}</p>
                  <p className="text-[8px] text-slate-400 font-bold uppercase">Total CA</p>
                </div>
              </div>
              <div className="space-y-1.5 text-[10px] font-bold text-slate-500 w-full">
                {hotels.map((h, i) => {
                  const colors = ["bg-[#2563EB]", "bg-[#10B981]", "bg-[#F59E0B]", "bg-[#8B5CF6]"];
                  return (
                    <div key={h.id} className="flex justify-between items-center">
                      <div className="flex items-center gap-1.5">
                        <span className={`h-2 w-2 rounded-full ${colors[i % colors.length]}`}/>
                        <span className="truncate max-w-[90px]">{h.name.replace("Hôtel ", "")}</span>
                      </div>
                      <span className="text-slate-800 font-black">{(timePeriod === "month" ? h.revenue.month : h.revenue.year).toLocaleString("fr-FR")} €</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-50 flex items-center justify-between text-[11px] font-bold">
              <span className="text-emerald-500 flex items-center gap-1"><TrendingUp className="h-3 w-3" /> ▲ 18.6%</span>
              <button type="button" onClick={() => setShowReportModal(true)} className="text-[#0B45D2] hover:underline text-[10px] cursor-pointer">Voir le rapport complet</button>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-3xs space-y-3">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Actions rapides</h3>
            <div className="space-y-1 text-xs font-semibold text-slate-700">
              {[
                { label: "Ajouter un établissement", icon: Building2, action: () => setShowAddModal(true) },
                { label: "Gérer les utilisateurs", icon: Users, action: () => setShowUsersModal(true) },
                { label: "Paramètres généraux", icon: Settings, action: () => triggerToast("Ouverture globale des réglages système du parc...") },
                { label: "Rapport consolidé", icon: FileSpreadsheet, action: () => setShowReportModal(true) },
              ].map((act, i) => (
                <div key={i} onClick={act.action} className="flex items-center justify-between p-2.5 hover:bg-slate-50 text-slate-600 rounded-lg cursor-pointer transition-colors group">
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

      {/* --- BLOCS INFÉRIEURS --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* BLOC ACTIVITÉ RÉCENTE */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-3xs space-y-4">
          <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Activité récente du parc</h3>
          <div className="divide-y divide-slate-100 font-semibold text-xs text-slate-600">
            {activities.map((act) => (
              <div key={act.id} className="py-3 flex items-start gap-3.5 first:pt-0 last:pb-0">
                <div className={`p-2 rounded-xl shrink-0 ${act.type === "success" ? "bg-emerald-50 text-emerald-600" : "bg-blue-50 text-blue-600"}`}>
                  <Clock className="h-4 w-4" />
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

        {/* BLOC ALERTES EN DIRECT */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-3xs space-y-4">
          <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Alertes de performance</h3>
          <div className="divide-y divide-slate-100 font-semibold text-xs text-slate-600">
            {alerts.length === 0 ? (
              <p className="text-slate-400 font-medium text-center py-4 text-[11px]">Aucune alerte critique détectée. Toutes les propriétés sont stables.</p>
            ) : (
              alerts.map((al) => (
                <div key={al.id} className="py-3 flex items-start gap-3.5 first:pt-0 last:pb-0">
                  <div className="p-2 rounded-xl shrink-0 bg-rose-50 text-rose-600">
                    <ShieldAlert className="h-4 w-4" />
                  </div>
                  <div className="flex-1 space-y-0.5">
                    <div className="flex items-center justify-between gap-4">
                      <h4 className="text-slate-900 font-bold text-xs">{al.title}</h4>
                      <span className="text-[10px] text-amber-500 font-bold whitespace-nowrap">{al.time}</span>
                    </div>
                    <p className="text-slate-400 text-[10px] font-medium">{al.sub}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

    </div>
  );
}