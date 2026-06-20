"use client";

import React, { useState, useMemo, useEffect } from "react";
import { 
  Search, 
  Calendar, 
  UserPlus, 
  Key, 
  LogOut, 
  ClipboardCheck, 
  RefreshCw, 
  MoreVertical, 
  ChevronRight,
  CheckCircle2,
  X,
  FileText,
  Bed,
  User,
  SlidersHorizontal
} from "lucide-react";

// --- DONNÉES INITIALES DU PMS ---
const INITIAL_ARRIVEES = [
  { id: "a1", client: "Jean Dupont", phone: "+225 07 89 01 23 45", rsv: "#RSV-2024-1548", details: "2 Adultes • 1 Enfant", room: "101", type: "Standard", date: "14/06/2024", time: "14:00" },
  { id: "a2", client: "Marie Claire", phone: "+225 05 56 78 90 12", rsv: "#RSV-2024-1549", details: "1 Adulte", room: "102", type: "Deluxe", date: "14/06/2024", time: "15:00" },
  { id: "a3", client: "Paul Martin", phone: "+225 07 12 34 56 78", rsv: "#RSV-2024-1550", details: "2 Adultes", room: "203", type: "Suite", date: "14/06/2024", time: "16:00" },
  { id: "a4", client: "Sophie Leroy", phone: "+225 01 23 45 67 89", rsv: "#RSV-2024-1551", details: "2 Adultes • 2 Enfants", room: "204", type: "Familiale", date: "14/06/2024", time: "17:00" },
  { id: "a5", client: "Lucas Bernard", phone: "+225 07 98 76 54 32", rsv: "#RSV-2024-1552", details: "1 Adulte", room: "305", type: "Standard", date: "14/06/2024", time: "18:00" },
];

const INITIAL_DEPARTS = [
  { id: "d1", client: "Thomas Dubois", phone: "+225 07 45 67 89 01", room: "201", type: "Deluxe", date: "14/06/2024", time: "12:00" },
  { id: "d2", client: "Camille Moreau", phone: "+225 05 67 89 01 23", room: "103", type: "Standard", date: "14/06/2024", time: "11:00" },
  { id: "d3", client: "Alexandre Petit", phone: "+225 07 23 45 67 89", room: "202", type: "Suite", date: "14/06/2024", time: "10:30" },
  { id: "d4", client: "Emma Garcia", phone: "+225 01 98 76 54 32", room: "304", type: "Familiale", date: "14/06/2024", time: "13:00" },
  { id: "d5", client: "Nicolas Martin", phone: "+225 07 89 12 34 56", room: "401", type: "Deluxe", date: "14/06/2024", time: "12:30" },
];

const INITIAL_EN_SEJOUR = [
  { id: "s1", name: "David Konan", room: "105", type: "Standard", date: "12/06/2024", nights: "3 nuits" },
  { id: "s2", name: "Fatou Diarra", room: "201", type: "Deluxe", date: "11/06/2024", nights: "4 nuits" },
  { id: "s3", name: "Marc Leblanc", room: "301", type: "Suite", date: "11/06/2024", nights: "5 nuits" },
  { id: "s4", name: "Aicha Traoré", room: "302", type: "Standard", date: "13/06/2024", nights: "2 nuits" },
  { id: "s5", name: "Yannick Koffi", room: "402", type: "Deluxe", date: "09/06/2024", nights: "6 nuits" },
];

export default function CheckInCheckOutPage() {
  // --- ÉTATS ---
  const [arrivees, setArrivees] = useState(INITIAL_ARRIVEES);
  const [departs, setDeparts] = useState(INITIAL_DEPARTS);
  const [enSejour, setEnSejour] = useState(INITIAL_EN_SEJOUR);
  const [searchQuery, setSearchQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Onglet/Filtre actif basé sur les compteurs du haut ('tous', 'arrivees', 'departs', 'en-sejour')
  const [activeTab, setActiveTab] = useState<"tous" | "arrivees" | "departs" | "en-sejour">("tous");

  // COMPTEURS HISTORIQUES ENTIÈREMENT DYNAMIQUES
  const [dejaCheckedInCount, setDejaCheckedInCount] = useState(8);
  const [dejaCheckedOutCount, setDejaCheckedOutCount] = useState(6);

  // Stocke l'ID de la ligne pour le menu d'actions contextuelles
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Système de toast intégré
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" } | null>(null);

  const showToast = (message: string, type: "success" | "info" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Fermeture globale du menu contextuel au clic à l'extérieur
  useEffect(() => {
    const handleClickOutside = () => setActiveMenuId(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const toggleMenu = (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); 
    setActiveMenuId(prev => (prev === id ? null : id));
  };

  // --- TRAITEMENTS ET ACTIONS ---
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      showToast("Synchronisation SmartHotel Élite effectuée avec succès !", "info");
    }, 600);
  };

  const handleCheckIn = (id: string) => {
    const client = arrivees.find((item) => item.id === id);
    if (!client) return;

    // 1. Retirer des arrivées attendues
    setArrivees(prev => prev.filter(item => item.id !== id));
    
    // 2. Ajouter automatiquement au flux "En séjour"
    setEnSejour(prev => [
      {
        id: `s-${Date.now()}`,
        name: client.client,
        room: client.room,
        type: client.type,
        date: client.date,
        nights: "1 nuit"
      },
      ...prev
    ]);

    // 3. EN ACTION : Incrémentation immédiate du compteur du haut "Déjà Check-in"
    setDejaCheckedInCount(prev => prev + 1);
    
    setActiveMenuId(null);
    showToast(`Check-in complété : Chambre ${client.room} attribuée à ${client.client}.`);
  };

  const handleCheckOut = (id: string, isFromCarrousel = false) => {
    let name = "";
    if (isFromCarrousel) {
      const target = enSejour.find(item => item.id === id);
      if (target) {
        name = target.name;
        setEnSejour(prev => prev.filter(item => item.id !== id));
      }
    } else {
      const target = departs.find(item => item.id === id);
      if (target) {
        name = target.client;
        setDeparts(prev => prev.filter(item => item.id !== id));
        setEnSejour(prev => prev.filter(item => item.room !== target.room));
      }
    }

    // EN ACTION : Incrémentation immédiate du compteur du haut "Déjà Check-out"
    setDejaCheckedOutCount(prev => prev + 1);
    
    setActiveMenuId(null);
    showToast(`Check-out validé pour ${name || "le résident"}. Chambre libérée.`);
  };

  const handleContextAction = (actionLabel: string, clientName: string) => {
    setActiveMenuId(null);
    showToast(`${actionLabel} pour ${clientName}`, "info");
  };

  // --- RECHERCHE ET FILTRAGE INTERACTIF ---
  const filteredArrivees = useMemo(() => {
    if (activeTab !== "tous" && activeTab !== "arrivees") return [];
    return arrivees.filter(item => 
      item.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.rsv.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.room.includes(searchQuery)
    );
  }, [arrivees, searchQuery, activeTab]);

  const filteredDeparts = useMemo(() => {
    if (activeTab !== "tous" && activeTab !== "departs") return [];
    return departs.filter(item => 
      item.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.room.includes(searchQuery)
    );
  }, [departs, searchQuery, activeTab]);

  const filteredEnSejour = useMemo(() => {
    if (activeTab !== "tous" && activeTab !== "en-sejour") return [];
    return enSejour.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.room.includes(searchQuery)
    );
  }, [enSejour, searchQuery, activeTab]);

  return (
    <div className="space-y-6 relative pb-12">
      
      {/* TOAST SYSTEM */}
      {toast && (
        <div className="fixed top-4 right-4 z-[100] flex items-center gap-3 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-2xl border border-slate-800 animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className={`h-4 w-4 ${toast.type === 'success' ? 'text-emerald-400' : 'text-blue-400'}`} />
          <span>{toast.message}</span>
          <button onClick={() => setToast(null)} className="ml-2 text-slate-400 hover:text-white"><X className="h-3 w-3" /></button>
        </div>
      )}
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Check-in / Check-out</h1>
          <p className="text-[11px] text-slate-400 mt-0.5">HôtelPro Élite  /  Gestion des Flux Journaliers</p>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filtrer par nom, chambre, numéro..." 
            className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-4 py-2 text-xs focus:outline-hidden focus:border-blue-500 shadow-3xs transition-colors"
          />
          {activeTab !== "tous" && (
            <button 
              onClick={() => setActiveTab("tous")}
              className="absolute right-2 top-1.5 text-[9px] bg-slate-100 font-bold px-2 py-1 rounded text-slate-500 hover:bg-slate-200 flex items-center gap-1"
            >
              Réinitialiser
            </button>
          )}
        </div>
      </div>

      {/* --- CARTES COMPTEURS / BOUTONS DU HAUT TOTALEMENT INTERACTIFS --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Bouton Arrivées (Filtre Actif) */}
          <button 
            onClick={() => setActiveTab(activeTab === "arrivees" ? "tous" : "arrivees")}
            className={`w-full text-left p-4 rounded-xl border flex items-center gap-4 transition-all duration-200 ${
              activeTab === "arrivees" 
                ? "bg-blue-50/80 border-blue-400 ring-2 ring-blue-500/20 shadow-md scale-[1.01]" 
                : "bg-white border-slate-200 hover:border-slate-300 shadow-3xs"
            }`}
          >
            <div className={`p-2.5 rounded-xl bg-[#0B45D2] text-white shrink-0`}>
              <UserPlus className="h-5 w-5" />
            </div>
            <div className="space-y-0.5">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Arrivées Attendues</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-slate-900 tracking-tight">{arrivees.length}</span>
                <span className="text-[10px] text-slate-400 font-bold">restantes</span>
              </div>
              <span className="text-[9px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">Filtrer</span>
            </div>
          </button>

          {/* Bouton Déjà In (DYNAMISÉ) */}
          <div className="p-4 bg-white border border-slate-200 rounded-xl flex items-center gap-4 shadow-3xs transition-all">
            <div className="p-2.5 rounded-xl bg-emerald-500 text-white shrink-0 relative">
              <Key className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>
            <div className="space-y-0.5">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Déjà Check-in</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-slate-900 tracking-tight text-emerald-600">{String(dejaCheckedInCount).padStart(2, '0')}</span>
                <span className="text-[10px] text-slate-400 font-bold">flux</span>
              </div>
              <p className="text-[9px] font-bold text-emerald-500 flex items-center gap-1">▲ Mis à jour</p>
            </div>
          </div>

          {/* Bouton Départs (Filtre Actif) */}
          <button 
            onClick={() => setActiveTab(activeTab === "departs" ? "tous" : "departs")}
            className={`w-full text-left p-4 rounded-xl border flex items-center gap-4 transition-all duration-200 ${
              activeTab === "departs" 
                ? "bg-orange-50/80 border-orange-400 ring-2 ring-orange-500/20 shadow-md scale-[1.01]" 
                : "bg-white border-slate-200 hover:border-slate-300 shadow-3xs"
            }`}
          >
            <div className="p-2.5 rounded-xl bg-[#F97316] text-white shrink-0">
              <LogOut className="h-5 w-5" />
            </div>
            <div className="space-y-0.5">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Départs du jour</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-slate-900 tracking-tight">{departs.length}</span>
                <span className="text-[10px] text-slate-400 font-bold">en attente</span>
              </div>
              <span className="text-[9px] font-bold text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded">Filtrer</span>
            </div>
          </button>

          {/* Bouton Déjà Out / Clôturés (DYNAMISÉ) */}
          <div className="p-4 bg-white border border-slate-200 rounded-xl flex items-center gap-4 shadow-3xs">
            <div className="p-2.5 rounded-xl bg-purple-500 text-white shrink-0">
              <ClipboardCheck className="h-5 w-5" />
            </div>
            <div className="space-y-0.5">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Déjà Check-out</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-slate-900 tracking-tight text-purple-600">{String(dejaCheckedOutCount).padStart(2, '0')}</span>
                <span className="text-[10px] text-slate-400 font-bold">clôturés</span>
              </div>
              <span className="text-[9px] font-bold text-purple-400">Total traité</span>
            </div>
          </div>

        </div>

        {/* Date Widget */}
        <div className="lg:col-span-3 bg-[#0B45D2] text-white rounded-xl p-4 flex flex-col justify-center shadow-xs relative overflow-hidden">
          <span className="text-[10px] font-bold opacity-75 uppercase tracking-wider">Aujourd'hui</span>
          <h3 className="text-sm font-black tracking-tight">Samedi 14 Juin 2024</h3>
          <p className="text-[11px] font-bold opacity-90 flex items-center gap-1.5 mt-0.5">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> PMS Live
          </p>
        </div>
      </div>

      {/* INDICATION DE FILTRE ACTIF */}
      {activeTab !== "tous" && (
        <div className="bg-slate-100 border border-slate-200 rounded-lg p-2.5 flex items-center justify-between text-xs text-slate-700 font-bold animate-in fade-in duration-200">
          <span className="flex items-center gap-2 text-blue-600">
            <SlidersHorizontal className="h-3.5 w-3.5" /> 
            Filtre actif : Vue restreinte aux {activeTab === 'arrivees' ? 'arrivées attendues' : activeTab === 'departs' ? 'départs attendus' : 'résidents'} uniquement.
          </span>
          <button onClick={() => setActiveTab("tous")} className="text-slate-400 hover:text-slate-900 underline text-[11px]">Afficher tout</button>
        </div>
      )}

      {/* --- CORE TABLES GRID --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* VUE ARRIVÉES */}
        {(activeTab === "tous" || activeTab === "arrivees") && (
          <div className="lg:col-span-6 bg-white border border-slate-200 rounded-xl shadow-xs flex flex-col min-h-[320px]">
            <div className="p-3.5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Arrivées du jour</h3>
              <button onClick={handleRefresh} disabled={isRefreshing} className="p-1 text-slate-400 hover:text-slate-600"><RefreshCw className={`h-3 w-3 ${isRefreshing ? 'animate-spin' : ''}`} /></button>
            </div>
            
            <div className="overflow-x-auto grow">
              <table className="w-full text-left text-xs whitespace-nowrap table-fixed">
                <thead>
                  <tr className="bg-slate-50/70 text-[10px] text-slate-400 font-bold uppercase border-b border-slate-100">
                    <th className="p-3 w-[40%]">Client</th>
                    <th className="p-3 w-[25%] text-center">Chambre</th>
                    <th className="p-3 w-[15%]">Heure</th>
                    <th className="p-3 w-[20%] text-center relative z-20">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-semibold text-slate-600">
                  {filteredArrivees.length > 0 ? (
                    filteredArrivees.map((row) => (
                      <tr key={row.id} className="hover:bg-slate-50/40 transition-colors">
                        <td className="p-3 truncate">
                          <p className="text-slate-900 font-bold text-xs truncate">{row.client}</p>
                          <p className="text-[10px] text-slate-400 font-medium">{row.rsv}</p>
                        </td>
                        <td className="p-3 text-center">
                          <p className="text-slate-900 font-bold">{row.room}</p>
                          <p className="text-[9px] text-slate-400 px-1 rounded-sm bg-slate-100 inline-block font-sans">{row.type}</p>
                        </td>
                        <td className="p-3 font-bold text-slate-700 text-[11px]">{row.time}</td>
                        <td className="p-3 text-center overflow-visible relative">
                          <div className="flex items-center justify-center gap-1">
                            <button onClick={() => handleCheckIn(row.id)} className="bg-[#0B45D2] hover:bg-blue-700 text-white text-[10px] font-bold px-2 py-1.5 rounded-md shadow-3xs transition-all">
                              In
                            </button>
                            
                            <button onClick={(e) => toggleMenu(e, row.id)} className="p-1.5 text-slate-400 hover:text-slate-600 bg-slate-50 rounded-md border border-slate-200">
                              <MoreVertical className="h-3.5 w-3.5" />
                            </button>

                            {/* DROPDOWN AVEC INDEX MAXIMUM ET BORDURE SUPÉRIEURE ACCENTUÉE */}
                            {activeMenuId === row.id && (
                              <div className="absolute right-3 top-11 bg-white border border-slate-200 rounded-lg shadow-xl py-1 w-44 z-[90] text-left border-t-blue-500 border-t-2">
                                <button onClick={() => handleContextAction("Profil invité chargé", row.client)} className="w-full px-3 py-1.5 text-[11px] text-slate-700 hover:bg-slate-50 flex items-center gap-2"><User className="h-3.5 w-3.5 text-slate-400" /> Profil Client</button>
                                <button onClick={() => handleContextAction("Changement attribution de chambre", row.client)} className="w-full px-3 py-1.5 text-[11px] text-slate-700 hover:bg-slate-50 flex items-center gap-2"><Bed className="h-3.5 w-3.5 text-slate-400" /> Assigner autre chambre</button>
                                <div className="border-t border-slate-100 my-1"></div>
                                <button onClick={() => handleContextAction("Détails financiers", row.client)} className="w-full px-3 py-1.5 text-[11px] text-slate-700 hover:bg-slate-50 flex items-center gap-2"><FileText className="h-3.5 w-3.5 text-slate-400" /> Reçu préliminaire</button>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan={4} className="text-center p-8 text-slate-400 text-xs">Aucune arrivée en attente.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* VUE DÉPARTS */}
        {(activeTab === "tous" || activeTab === "departs") && (
          <div className="lg:col-span-6 bg-white border border-slate-200 rounded-xl shadow-xs flex flex-col min-h-[320px]">
            <div className="p-3.5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Départs attendus</h3>
              <button onClick={handleRefresh} disabled={isRefreshing} className="p-1 text-slate-400 hover:text-slate-600"><RefreshCw className={`h-3 w-3 ${isRefreshing ? 'animate-spin' : ''}`} /></button>
            </div>

            <div className="overflow-x-auto grow">
              <table className="w-full text-left text-xs whitespace-nowrap table-fixed">
                <thead>
                  <tr className="bg-slate-50/70 text-[10px] text-slate-400 font-bold uppercase border-b border-slate-100">
                    <th className="p-3 w-[40%]">Client</th>
                    <th className="p-3 w-[25%] text-center">Chambre</th>
                    <th className="p-3 w-[15%]">Heure</th>
                    <th className="p-3 w-[20%] text-center relative z-20">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-semibold text-slate-600">
                  {filteredDeparts.length > 0 ? (
                    filteredDeparts.map((row) => (
                      <tr key={row.id} className="hover:bg-slate-50/40 transition-colors">
                        <td className="p-3 truncate">
                          <p className="text-slate-900 font-bold text-xs truncate">{row.client}</p>
                          <p className="text-[10px] text-slate-400 font-medium">{row.phone}</p>
                        </td>
                        <td className="p-3 text-center">
                          <p className="text-slate-900 font-bold">{row.room}</p>
                          <p className="text-[9px] text-slate-400 px-1 rounded-sm bg-slate-100 inline-block font-sans">{row.type}</p>
                        </td>
                        <td className="p-3 font-bold text-slate-700 text-[11px]">{row.time}</td>
                        <td className="p-3 text-center overflow-visible relative">
                          <div className="flex items-center justify-center gap-1">
                            <button onClick={() => handleCheckOut(row.id, false)} className="bg-[#F97316] hover:bg-orange-600 text-white text-[10px] font-bold px-2 py-1.5 rounded-md shadow-3xs transition-all">
                              Out
                            </button>
                            
                            <button onClick={(e) => toggleMenu(e, row.id)} className="p-1.5 text-slate-400 hover:text-slate-600 bg-slate-50 rounded-md border border-slate-200">
                              <MoreVertical className="h-3.5 w-3.5" />
                            </button>

                            {activeMenuId === row.id && (
                              <div className="absolute right-3 top-11 bg-white border border-slate-200 rounded-lg shadow-xl py-1 w-44 z-[90] text-left border-t-orange-400 border-t-2">
                                <button onClick={() => handleContextAction("Édition facture finale", row.client)} className="w-full px-3 py-1.5 text-[11px] text-slate-700 hover:bg-slate-50 flex items-center gap-2"><FileText className="h-3.5 w-3.5 text-slate-400" /> Clôturer et Facturer</button>
                                <button onClick={() => handleContextAction("Extension demandée", row.client)} className="w-full px-3 py-1.5 text-[11px] text-slate-700 hover:bg-slate-50 flex items-center gap-2"><Calendar className="h-3.5 w-3.5 text-slate-400" /> Prolonger le séjour</button>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan={4} className="text-center p-8 text-slate-400 text-xs">Aucun départ prévu.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* --- FLUX DES RÉSIDENTS EN SÉJOUR --- */}
      {(activeTab === "tous" || activeTab === "en-sejour") && (
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">
              Flux Résidents en cours de Séjour <span className="text-slate-400 font-sans lowercase font-normal">({filteredEnSejour.length} actifs)</span>
            </h3>
            <button onClick={() => setActiveTab("en-sejour")} className="text-[11px] font-bold text-[#0B45D2] hover:underline">Isoler cette vue</button>
          </div>

          <div className="w-full grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {filteredEnSejour.length > 0 ? (
              filteredEnSejour.map((card) => (
                <div key={card.id} className="border border-slate-200 rounded-xl p-4 bg-white shadow-3xs space-y-4 flex flex-col justify-between hover:border-slate-300 transition-all">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <span className="bg-emerald-50 text-[#10B981] text-[9px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-emerald-100">
                        <span className="h-1 w-1 rounded-full bg-[#10B981] animate-pulse" /> Actif
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-slate-50 text-slate-700 flex items-center justify-center font-bold text-xs border border-slate-100">
                        {card.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div className="truncate">
                        <h4 className="text-xs font-black text-slate-900 tracking-tight truncate">{card.name}</h4>
                        <p className="text-[10px] font-bold text-slate-500">Chambre {card.room}</p>
                      </div>
                    </div>

                    <div className="text-[10px] font-semibold text-slate-400 space-y-1 bg-slate-50/50 border border-slate-100 p-2 rounded-lg font-sans">
                      <p className="flex justify-between"><span>Arrivée:</span> <span className="text-slate-700 font-bold">{card.date}</span></p>
                      <p className="flex justify-between"><span>Durée:</span> <span className="text-slate-700 font-bold">{card.nights}</span></p>
                    </div>
                  </div>

                  <button onClick={() => handleCheckOut(card.id, true)} className="w-full bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-bold py-2 rounded-lg flex items-center justify-center gap-1 transition-colors shadow-3xs">
                    <LogOut className="h-3 w-3" /> Libérer Chambre
                  </button>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-6 text-slate-400 text-xs">Aucun résident répertorié.</div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}