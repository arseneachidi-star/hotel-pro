"use client";

import React, { useState, useMemo } from "react";
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
  Trash2,
  X,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";

interface Reservation {
  id: number;
  client: string;
  avatar: string;
  room: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  kids: number;
  status: "Confirmée" | "En attente";
  amount: string;
}

const initialTimelineRooms = [
  { id: "101", type: "Standard", initial: "Chambre 101", sub: "Standard", events: [{ name: "Jean Dupont", start: 2, end: 4 }] },
  { id: "102", type: "Standard", initial: "Chambre 102", sub: "Standard", events: [{ name: "Paul Durand", start: 0, end: 2 }, { name: "Lucie Bernard", start: 5, end: 7 }] },
  { id: "201", type: "Deluxe", initial: "Chambre 201", sub: "Deluxe", events: [{ name: "Alice Moreau", start: 3, end: 5 }] },
  { id: "202", type: "Deluxe", initial: "Chambre 202", sub: "Deluxe", events: [{ name: "Thomas Petit", start: 1, end: 3 }, { name: "Sophie Leroy", start: 5, end: 7 }] },
  { id: "301", type: "Suite", initial: "Suite 301", sub: "Suite", events: [{ name: "Entreprise ABC", start: 4, end: 6 }] },
];

const initialReservations: Reservation[] = [
  { id: 1, client: "Jean Dupont", avatar: "JD", room: "101 (Standard)", roomId: "101", checkIn: "10/06/2024", checkOut: "12/06/2024", adults: 2, kids: 0, status: "Confirmée", amount: "250,00 €" },
  { id: 2, client: "Marie Martin", avatar: "MM", room: "101 (Standard)", roomId: "101", checkIn: "14/06/2024", checkOut: "15/06/2024", adults: 2, kids: 0, status: "Confirmée", amount: "150,00 €" },
  { id: 3, client: "Paul Durand", avatar: "PD", room: "102 (Standard)", roomId: "102", checkIn: "10/06/2024", checkOut: "11/06/2024", adults: 1, kids: 0, status: "En attente", amount: "80,00 €" },
  { id: 4, client: "Alice Moreau", avatar: "AM", room: "201 (Deluxe)", roomId: "201", checkIn: "12/06/2024", checkOut: "14/06/2024", adults: 2, kids: 1, status: "Confirmée", amount: "320,00 €" },
  { id: 5, client: "Sophie Leroy", avatar: "SL", room: "202 (Deluxe)", roomId: "202", checkIn: "15/06/2024", checkOut: "16/06/2024", adults: 2, kids: 0, status: "Confirmée", amount: "180,00 €" },
];

export default function ReservationsPage() {
  // --- ÉTATS ---
  const [reservations, setReservations] = useState<Reservation[]>(initialReservations);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"Tous" | "Confirmée" | "En attente">("Tous");
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [viewMode, setViewMode] = useState<"Mois" | "Semaine" | "Jour">("Semaine");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Pivot temporel : Initialisé sur la semaine du 10 Juin 2024 pour correspondre à vos données d'exemple
  const [currentDate, setCurrentDate] = useState<Date>(new Date(2024, 5, 10)); 

  // États de gestion des fenêtres/alertes
  const [toast, setToast] = useState<string | null>(null);
  const [activeModal, setActiveModal] = useState<{ type: "create" | "view" | "edit" | "delete"; data?: any } | null>(null);

  const [formClient, setFormClient] = useState("");
  const [formRoom, setFormRoom] = useState("101");
  const [formStatus, setFormStatus] = useState<"Confirmée" | "En attente">("Confirmée");

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  // --- LOGIQUE DE CALCUL DU CALENDRIER DYNAMIQUE ---
  const calendarData = useMemo(() => {
    const startOfWeek = new Date(currentDate);
    const dayPosition = startOfWeek.getDay();
    // Ajustement pour caler le début de semaine sur le Lundi (1) au lieu du Dimanche (0)
    const diffToMonday = dayPosition === 0 ? -6 : 1 - dayPosition;
    startOfWeek.setDate(startOfWeek.getDate() + diffToMonday);

    const days = [];
    const labels = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
    
    for (let i = 0; i < 7; i++) {
      const targetDay = new Date(startOfWeek);
      targetDay.setDate(startOfWeek.getDate() + i);
      days.push({
        label: labels[i],
        num: targetDay.getDate().toString(),
        fullDate: targetDay,
        isToday: new Date().toDateString() === targetDay.toDateString()
      });
    }

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    // Formateurs corrigés avec "long" (minuscules obligatoire)
    const formatLabel = (d: Date) => d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
    const formatMonthYear = (d: Date) => d.toLocaleDateString("fr-FR", { month: "long", year: "numeric" });

    return {
      days,
      rangeString: `${formatLabel(startOfWeek)} - ${formatLabel(endOfWeek)}`,
      monthYearString: formatMonthYear(currentDate).replace(/^\w/, (c) => c.toUpperCase()),
    };
  }, [currentDate]);

  // --- NAVIGATION DU PLANNING ---
  const handlePrevWeek = () => {
    setCurrentDate(prev => {
      const next = new Date(prev);
      next.setDate(prev.getDate() - 7);
      return next;
    });
  };

  const handleNextWeek = () => {
    setCurrentDate(prev => {
      const next = new Date(prev);
      next.setDate(prev.getDate() + 7);
      return next;
    });
  };

  const handleResetToday = () => {
    setCurrentDate(new Date());
  };

  // --- GESTION DU TABLEAU ---
  const filteredReservations = useMemo(() => {
    return reservations.filter((res) => {
      const matchesSearch = res.client.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            res.room.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "Tous" || res.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [reservations, searchQuery, statusFilter]);

  const totalItems = filteredReservations.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const paginatedReservations = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredReservations.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredReservations, currentPage]);

  const handleCreateReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formClient.trim()) return;

    const newRes: Reservation = {
      id: reservations.length + 1,
      client: formClient,
      avatar: formClient.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2),
      room: `Chambre ${formRoom}`,
      roomId: formRoom,
      checkIn: "22/06/2026",
      checkOut: "25/06/2026",
      adults: 2,
      kids: 0,
      status: formStatus,
      amount: "210,00 €"
    };

    setReservations([newRes, ...reservations]);
    setActiveModal(null);
    setFormClient("");
    triggerToast(`Réservation enregistrée (${newRes.client}) !`);
  };

  const handleUpdateStatus = (id: number, nextStatus: "Confirmée" | "En attente") => {
    setReservations(prev => prev.map(r => r.id === id ? { ...r, status: nextStatus } : r));
    setActiveModal(null);
    triggerToast("La réservation a été mise à jour.");
  };

  const handleDeleteReservation = (id: number) => {
    setReservations(prev => prev.filter(r => r.id !== id));
    setActiveModal(null);
    triggerToast("Réservation supprimée du système.");
  };

  return (
    <div className="space-y-6 relative">
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-4 right-4 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 z-50 text-xs animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span className="font-semibold">{toast}</span>
        </div>
      )}

      {/* --- EN-TÊTE DE LA PAGE --- */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Gestion des Réservations</h1>
          <p className="text-xs text-slate-400 mt-0.5">Accueil / Réservations</p>
        </div>
        
        <div className="flex items-center gap-3 flex-wrap">
          <button 
            onClick={() => setActiveModal({ type: "create" })}
            className="bg-[#0B45D2] hover:bg-[#093bb5] text-white text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-2 shadow-xs transition-all active:scale-95"
          >
            <Plus className="h-4 w-4" /> Nouvelle réservation
          </button>

          <div className="relative">
            <button 
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              className={`text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-2 shadow-xs transition-colors border ${
                statusFilter !== "Tous" ? "bg-blue-50 text-[#0B45D2] border-blue-200" : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
              }`}
            >
              <SlidersHorizontal className="h-4 w-4 text-slate-400" /> 
              <span>Statut : {statusFilter}</span>
            </button>

            {showFilterMenu && (
              <div className="absolute right-0 top-full mt-1.5 w-44 bg-white border border-slate-200 rounded-xl shadow-lg z-30 p-1 space-y-0.5 text-xs">
                {(["Tous", "Confirmée", "En attente"] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => { setStatusFilter(status); setShowFilterMenu(false); setCurrentPage(1); }}
                    className={`w-full text-left px-3 py-2 rounded-lg font-medium ${statusFilter === status ? "bg-slate-100 text-[#0B45D2]" : "hover:bg-slate-50 text-slate-600"}`}
                  >
                    {status === "Tous" ? "Tous les statuts" : status}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* PLAGE DE DATE DYNAMIQUE */}
          <div className="bg-white border border-slate-200 text-slate-700 text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-2 shadow-xs transition-all">
            <CalendarIcon className="h-4 w-4 text-slate-400" /> {calendarData.rangeString}
          </div>
        </div>
      </div>

      {/* --- SECTION PLANNING / TIMELINE --- */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        
        {/* Contrôles du calendrier */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-1.5">
            <button onClick={handlePrevWeek} className="p-1.5 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button onClick={handleResetToday} className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors">
              Aujourd'hui
            </button>
            <button onClick={handleNextWeek} className="p-1.5 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          
          {/* TITRE DU MOIS DYNAMIQUE */}
          <h2 className="text-base font-bold text-slate-800">{calendarData.monthYearString}</h2>
          
          <div className="bg-slate-100 p-0.5 rounded-lg flex gap-0.5">
            {(["Mois", "Semaine", "Jour"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${viewMode === mode ? "bg-white text-[#0B45D2] shadow-xs" : "text-slate-500 hover:text-slate-800"}`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* Grille Temporelle */}
        <div className="overflow-x-auto">
          {/* JOURS DE LA SEMAINE DYNAMIQUES */}
          <div className="min-w-[800px] grid grid-cols-8 border-b border-slate-100 bg-slate-50/50">
            <div className="p-3"></div>
            {calendarData.days.map((day, idx) => (
              <div key={idx} className={`p-2 text-center border-l border-slate-100 flex flex-col justify-center ${day.isToday ? "bg-blue-50/40" : ""}`}>
                <span className="text-xs text-slate-400 font-medium">{day.label}</span>
                <span className={`text-sm font-bold mt-0.5 ${day.isToday ? "text-[#0B45D2] bg-blue-100/60 rounded-full px-1.5 py-0.5" : "text-slate-700"}`}>
                  {day.num}
                </span>
              </div>
            ))}
          </div>

          {/* Rangées des chambres */}
          <div className="min-w-[800px] divide-y divide-slate-100">
            {initialTimelineRooms.map((room) => {
              const activeEvents = room.events.filter(e => 
                e.name.toLowerCase().includes(searchQuery.toLowerCase())
              );

              return (
                <div key={room.id} className="grid grid-cols-8 items-center h-14 relative">
                  <div className="p-3 flex items-center gap-2 border-r border-slate-100 h-full bg-white z-10">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    <div>
                      <p className="text-xs font-bold text-slate-800">{room.initial}</p>
                      <p className="text-[10px] text-slate-400">{room.sub}</p>
                    </div>
                  </div>

                  {Array.from({ length: 7 }).map((_, i) => (
                    <div key={i} className="border-l border-slate-100 h-full relative bg-white" />
                  ))}

                  <div className="absolute inset-y-0 left-[12.5%] right-0 grid grid-cols-7 pointer-events-none px-1 items-center">
                    {activeEvents.map((event, eIdx) => {
                      const gridStart = event.start + 1;
                      const gridSpan = event.end - event.start;
                      return (
                        <div
                          key={eIdx}
                          style={{ gridColumn: `${gridStart} / span ${gridSpan}` }}
                          onClick={() => {
                            const matchedRes = reservations.find(r => r.client.toLowerCase() === event.name.toLowerCase());
                            if (matchedRes) setActiveModal({ type: "view", data: matchedRes });
                          }}
                          className="pointer-events-auto h-8 bg-blue-100 border border-blue-200 hover:bg-blue-200 text-blue-700 rounded-lg px-3 flex items-center shadow-2xs mx-1 cursor-pointer transition-colors"
                        >
                          <span className="text-xs font-medium truncate">{event.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* --- SECTION TABLEAU LISTE --- */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h3 className="font-bold text-slate-800 text-base">Liste des réservations</h3>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                placeholder="Rechercher un client, une chambre..." 
                className="w-full pl-9 pr-4 py-1.5 border border-slate-200 rounded-lg text-xs bg-slate-50 focus:outline-hidden focus:border-blue-500 focus:bg-white transition-all"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
            <button 
              onClick={() => triggerToast("Fichier Excel généré.")}
              className="bg-white border border-slate-200 text-slate-700 text-xs font-medium px-3 py-2 rounded-lg flex items-center gap-2 shadow-2xs shrink-0 hover:bg-slate-50 transition-colors"
            >
              <Download className="h-3.5 w-3.5 text-slate-400" /> Exporter
            </button>
          </div>
        </div>

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
              {paginatedReservations.length === 0 ? (
                <tr>
                  <td colSpan={10} className="p-8 text-center font-medium text-slate-400">
                    Aucune réservation trouvée.
                  </td>
                </tr>
              ) : (
                paginatedReservations.map((row) => (
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
                        row.status === "Confirmée" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="p-4 font-bold text-slate-900">{row.amount}</td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-1.5">
                        <button onClick={() => setActiveModal({ type: "view", data: row })} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md border border-slate-100 transition-colors"><Eye className="h-3.5 w-3.5" /></button>
                        <button onClick={() => { setActiveModal({ type: "edit", data: row }); setFormClient(row.client); setFormStatus(row.status); }} className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-md border border-slate-100 transition-colors"><Pencil className="h-3.5 w-3.5" /></button>
                        <button onClick={() => setActiveModal({ type: "delete", data: row })} className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-md border border-slate-100 transition-colors"><Trash2 className="h-3.5 w-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Affichage de {totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} à {Math.min(currentPage * itemsPerPage, totalItems)} sur {totalItems} résultats</span>
          <div className="flex items-center gap-1">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)} className="p-1.5 border border-slate-200 rounded-md text-slate-600 hover:bg-slate-50 disabled:opacity-40 transition-colors"><ChevronLeft className="h-3.5 w-3.5" /></button>
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button key={idx} onClick={() => setCurrentPage(idx + 1)} className={`px-3 py-1.5 rounded-md font-bold transition-all ${currentPage === idx + 1 ? "bg-[#0B45D2] text-white" : "border border-slate-200 text-slate-700 hover:bg-slate-50"}`}>{idx + 1}</button>
            ))}
            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)} className="p-1.5 border border-slate-200 rounded-md text-slate-600 hover:bg-slate-50 disabled:opacity-40 transition-colors"><ChevronRight className="h-3.5 w-3.5" /></button>
          </div>
        </div>
      </div>

      {/* --- MODAL : CRÉATION --- */}
      {activeModal?.type === "create" && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-3xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full border border-slate-200 overflow-hidden">
            <div className="px-4 py-3 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-slate-900 text-sm">Nouvelle réservation</h3>
              <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-slate-600"><X className="h-4 w-4" /></button>
            </div>
            <form onSubmit={handleCreateReservation} className="p-4 space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Nom du client</label>
                <input required type="text" value={formClient} onChange={(e) => setFormClient(e.target.value)} placeholder="Ex: Jean Dupont" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:border-blue-500 focus:outline-hidden" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700">Chambre</label>
                  <select value={formRoom} onChange={(e) => setFormRoom(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white text-xs">
                    <option value="101">101 - Standard</option>
                    <option value="102">102 - Standard</option>
                    <option value="201">201 - Deluxe</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700">Statut</label>
                  <select value={formStatus} onChange={(e) => setFormStatus(e.target.value as any)} className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white text-xs">
                    <option value="Confirmée">Confirmée</option>
                    <option value="En attente">En attente</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button type="button" onClick={() => setActiveModal(null)} className="px-3 py-1.5 border border-slate-200 rounded-lg">Annuler</button>
                <button type="submit" className="px-3 py-1.5 bg-[#0B45D2] text-white rounded-lg font-semibold">Enregistrer</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL : VISIONNER --- */}
      {activeModal?.type === "view" && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-3xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-sm w-full border border-slate-200 overflow-hidden">
            <div className="px-4 py-3 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-slate-900 text-sm">Fiche de Réservation</h3>
              <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-slate-600"><X className="h-4 w-4" /></button>
            </div>
            <div className="p-4 space-y-3 text-xs">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-2.5">
                <div className="h-10 w-10 rounded-full bg-blue-50 text-blue-600 font-bold flex items-center justify-center text-sm">{activeModal.data.avatar}</div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{activeModal.data.client}</h4>
                  <span className={`inline-block px-2 py-0.5 mt-0.5 text-[9px] font-bold rounded-sm ${activeModal.data.status === "Confirmée" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>{activeModal.data.status}</span>
                </div>
              </div>
              <div className="space-y-1.5 font-medium text-slate-600">
                <p><strong className="text-slate-800">Chambre :</strong> {activeModal.data.room}</p>
                <p><strong className="text-slate-800">Séjour :</strong> Du {activeModal.data.checkIn} au {activeModal.data.checkOut}</p>
                <p><strong className="text-slate-800">Occupants :</strong> {activeModal.data.adults} Adulte(s), {activeModal.data.kids} Enfant(s)</p>
                <p className="text-sm pt-1.5 border-t border-slate-50"><strong className="text-slate-900">Total facturé :</strong> <span className="font-bold text-slate-900">{activeModal.data.amount}</span></p>
              </div>
              <button onClick={() => setActiveModal(null)} className="w-full mt-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2 rounded-lg text-center transition-colors">Fermer</button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL : MODIFIER --- */}
      {activeModal?.type === "edit" && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-3xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-sm w-full border border-slate-200 overflow-hidden">
            <div className="px-4 py-3 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-slate-900 text-sm">Édition Rapide</h3>
              <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-slate-600"><X className="h-4 w-4" /></button>
            </div>
            <div className="p-4 space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-500">Client</label>
                <input disabled type="text" value={formClient} className="w-full px-3 py-2 border border-slate-200 bg-slate-50 rounded-lg text-slate-400" />
              </div>
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Changer le statut de réservation</label>
                <select value={formStatus} onChange={(e) => setFormStatus(e.target.value as any)} className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white focus:outline-hidden focus:border-blue-500">
                  <option value="Confirmée">Confirmée</option>
                  <option value="En attente">En attente</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button onClick={() => setActiveModal(null)} className="px-3 py-1.5 border border-slate-200 hover:bg-slate-50 rounded-lg font-medium text-slate-600">Annuler</button>
                <button onClick={() => handleUpdateStatus(activeModal.data.id, formStatus)} className="px-3 py-1.5 bg-[#0B45D2] hover:bg-[#093bb5] text-white font-semibold rounded-lg shadow-xs">Appliquer</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL : SUPPRIMER --- */}
      {activeModal?.type === "delete" && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-3xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-xs w-full border border-slate-200 overflow-hidden p-4 space-y-3 text-center">
            <div className="mx-auto h-9 w-9 rounded-full bg-rose-50 flex items-center justify-center text-rose-600">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-slate-900 text-sm">Supprimer la réservation ?</h3>
              <p className="text-xs text-slate-400 leading-relaxed">Cette action annulera la réservation de <strong>{activeModal.data?.client}</strong> définitivement.</p>
            </div>
            <div className="flex gap-2 pt-2">
              <button onClick={() => setActiveModal(null)} className="w-full py-2 border border-slate-200 hover:bg-slate-50 font-semibold rounded-lg text-slate-600 text-xs">Annuler</button>
              <button onClick={() => handleDeleteReservation(activeModal.data.id)} className="w-full py-2 bg-rose-600 hover:bg-rose-700 font-bold rounded-lg text-white text-xs shadow-xs">Supprimer</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}