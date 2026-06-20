"use client";

import React, { useState, useMemo, createContext, useContext } from "react";
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
  TrendingDown,
  X,
  Settings,
  LogOut
} from "lucide-react";

// ==========================================
// 1. DÉFINITION DU CONTEXTE GLOBAL INTÉGRÉ
// ==========================================
type UserProfile = {
  name: string;
  role: string;
  avatar: string;
  email: string;
  phone: string;
};

type Notification = { id: number; message: string; isRead: boolean };

type AppContextType = {
  user: UserProfile;
  notifications: Notification[];
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  addNotification: (message: string) => void;
  markNotificationsAsRead: () => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

function AppProvider({ children }: { children: React.ReactNode }) {
  // Profil de l'administrateur rendu 100% dynamique
  const [user, setUser] = useState<UserProfile>({
    name: "Admin Hotel",
    role: "Administrateur",
    avatar: "/galerie1.jpeg", 
    email: "admin@hotelpro.com",
    phone: "+33 6 12 34 56 78"
  });

  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, message: "Nouvelle réservation pour la chambre 101", isRead: false },
    { id: 2, message: "Nettoyage terminé pour la chambre 104", isRead: false },
  ]);

  const updateUserProfile = (updatedFields: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updatedFields }));
  };

  const addNotification = (message: string) => {
    setNotifications((prev) => [
      { id: Date.now(), message, isRead: false },
      ...prev,
    ]);
  };

  const markNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  return (
    <AppContext.Provider value={{ user, notifications, updateUserProfile, addNotification, markNotificationsAsRead }}>
      {children}
    </AppContext.Provider>
  );
}

function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp doit être utilisé dans un AppProvider");
  return context;
}

// ==========================================
// 2. DONNÉES INITIALES DES CHAMBRES
// ==========================================
const roomTypes = ["Standard", "Deluxe", "Suite"];

const initialRoomsData = [
  { id: "101", type: "Standard", bed: "1 Lit double", guests: "2 Adultes", size: "25 m²", status: "Disponible", image: "/galerie1.jpeg", statusColor: "bg-emerald-50 text-emerald-600 border-emerald-200", topBorder: "border-t-emerald-500" },
  { id: "102", type: "Standard", bed: "1 Lit double", guests: "2 Adultes", size: "25 m²", status: "Occupée", image: "/galerie2.jpeg", statusColor: "bg-amber-50 text-amber-600 border-amber-200", topBorder: "border-t-amber-500" },
  { id: "103", type: "Deluxe", bed: "1 Lit king size", guests: "2 Adultes", size: "30 m²", status: "Maintenance", image: "/galerie3.jpeg", statusColor: "bg-rose-50 text-rose-600 border-rose-200", topBorder: "border-t-rose-500" },
  { id: "104", type: "Standard", bed: "1 Lit double", guests: "2 Adultes", size: "25 m²", status: "Nettoyage", image: "/galerie4.jpeg", statusColor: "bg-orange-50 text-orange-600 border-orange-200", topBorder: "border-t-orange-500" },
  { id: "105", type: "Suite", bed: "1 Lit king size", guests: "2 Adultes", size: "25 m²", status: "Disponible", image: "/galerie5.jpeg", statusColor: "bg-emerald-50 text-emerald-600 border-emerald-200", topBorder: "border-t-emerald-500", extraFeatures: true },
  { id: "106", type: "Standard", bed: "1 Lit double", guests: "2 Adultes", size: "25 m²", status: "Disponible", image: "/galerie6.jpeg", statusColor: "bg-emerald-50 text-emerald-600 border-emerald-200", topBorder: "border-t-emerald-500" },
  { id: "107", type: "Deluxe", bed: "1 Lit king size", guests: "2 Adultes", size: "30 m²", status: "Occupée", image: "/galerie7.jpeg", statusColor: "bg-amber-50 text-amber-600 border-amber-200", topBorder: "border-t-amber-500" },
  { id: "108", type: "Suite", bed: "1 Lit king size", guests: "2 Adultes", size: "40 m²", status: "Maintenance", image: "/galerie8.jpeg", statusColor: "bg-rose-50 text-rose-600 border-rose-200", topBorder: "border-t-rose-500", extraFeatures: true },
  { id: "109", type: "Standard", bed: "1 Lit double", guests: "2 Adultes", size: "25 m²", status: "Disponible", image: "/galerie1.jpeg", statusColor: "bg-emerald-50 text-emerald-600 border-emerald-200", topBorder: "border-t-emerald-500" },
  { id: "110", type: "Standard", bed: "1 Lit double", guests: "2 Adultes", size: "25 m²", status: "Occupée", image: "/galerie2.jpeg", statusColor: "bg-amber-50 text-amber-600 border-amber-200", topBorder: "border-t-amber-500" },
];

// ==========================================
// 3. COMPOSANT PRINCIPAL DE LA PAGE
// ==========================================
function InterneGestionChambresPage() {
  const { user, addNotification, updateUserProfile } = useApp();
  
  const [rooms, setRooms] = useState(initialRoomsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tous");
  const [typeFilter, setTypeFilter] = useState("Tous");
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage, setRoomsPerPage] = useState(8);

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Formulaire nouvelle chambre
  const [newRoomId, setNewRoomId] = useState("");
  const [newRoomType, setNewRoomType] = useState("Standard");
  const [newRoomStatus, setNewRoomStatus] = useState("Disponible");

  // Formulaire d'édition profil
  const [editName, setEditName] = useState(user.name);
  const [editEmail, setEditEmail] = useState(user.email);
  const [editPhone, setEditPhone] = useState(user.phone);

  // Compteurs synchronisés
  const statsCounters = useMemo(() => {
    const total = rooms.length;
    const dispos = rooms.filter(r => r.status === "Disponible").length;
    const occupees = rooms.filter(r => r.status === "Occupée").length;
    const maintenance = rooms.filter(r => r.status === "Maintenance").length;
    const nettoyage = rooms.filter(r => r.status === "Nettoyage").length;

    return [
      { id: 1, title: "Disponibles", value: dispos.toString().padStart(2, "0"), sub: "+ 12%", subColor: "text-emerald-500", isUp: true, statusFilter: "Disponible", iconBg: "bg-emerald-600 text-white" },
      { id: 2, title: "Occupées", value: occupees.toString().padStart(2, "0"), sub: "+ 5%", subColor: "text-amber-500", isUp: true, statusFilter: "Occupée", iconBg: "bg-amber-500 text-white" },
      { id: 3, title: "En maintenance", value: maintenance.toString().padStart(2, "0"), sub: "- 2%", subColor: "text-rose-500", isUp: false, statusFilter: "Maintenance", iconBg: "bg-rose-600 text-white" },
      { id: 4, title: "En nettoyage", value: nettoyage.toString().padStart(2, "0"), sub: "+ 3%", subColor: "text-orange-500", isUp: true, statusFilter: "Nettoyage", iconBg: "bg-orange-500 text-white" },
      { id: 5, title: "Total chambres", value: total.toString().padStart(2, "0"), sub: "chambres", subColor: "text-slate-400", isUp: null, statusFilter: "Tous", iconBg: "bg-blue-600 text-white" },
    ];
  }, [rooms]);

  // Filtrage
  const filteredRooms = useMemo(() => {
    return rooms.filter(room => {
      const searchMatch = (
        searchTerm === "" || 
        room.id.includes(searchTerm) ||
        room.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.status.toLowerCase().includes(searchTerm.toLowerCase())
      );
      const statusMatch = statusFilter === "Tous" || room.status === statusFilter;
      const typeMatch = typeFilter === "Tous" || room.type === typeFilter;
      return searchMatch && statusMatch && typeMatch;
    });
  }, [rooms, searchTerm, statusFilter, typeFilter]);

  // Pagination
  const totalFilteredRooms = filteredRooms.length;
  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);
  const totalPages = Math.ceil(totalFilteredRooms / roomsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Soumission Ajout Chambre
  const handleAddRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoomId.trim()) return;

    let statusColor = "bg-emerald-50 text-emerald-600 border-emerald-200";
    let topBorder = "border-t-emerald-500";

    if (newRoomStatus === "Occupée") {
      statusColor = "bg-amber-50 text-amber-600 border-amber-200";
      topBorder = "border-t-amber-500";
    } else if (newRoomStatus === "Maintenance") {
      statusColor = "bg-rose-50 text-rose-600 border-rose-200";
      topBorder = "border-t-rose-500";
    } else if (newRoomStatus === "Nettoyage") {
      statusColor = "bg-orange-50 text-orange-600 border-orange-200";
      topBorder = "border-t-orange-500";
    }

    const newRoom = {
      id: newRoomId,
      type: newRoomType,
      bed: newRoomType === "Suite" ? "1 Lit king size" : "1 Lit double",
      guests: "2 Adultes",
      size: newRoomType === "Standard" ? "25 m²" : newRoomType === "Deluxe" ? "30 m²" : "40 m²",
      status: newRoomStatus,
      image: "/galerie1.jpeg",
      statusColor,
      topBorder,
      extraFeatures: newRoomType === "Suite"
    };

    setRooms([newRoom, ...rooms]);
    addNotification(`La chambre ${newRoomId} (${newRoomType}) a été ajoutée au statut : ${newRoomStatus}.`);
    setIsAddModalOpen(false);
    setNewRoomId("");
  };

  // Soumission Édition Profil Administrateur
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name: editName,
      email: editEmail,
      phone: editPhone
    });
    addNotification("Le profil de l'administrateur a été mis à jour avec succès.");
    setIsProfileModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* En-tête sans doublons de navigation */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Gestion des Chambres</h1>
          <p className="text-[10px] text-slate-400 font-medium mt-1">
            Accueil / Chambres {filteredRooms.length !== rooms.length && ` (filtré : ${filteredRooms.length} chambres)`}
          </p>
          <div className="mt-2 text-xs text-slate-500">
            Connecté en tant que : <span onClick={() => setIsProfileModalOpen(true)} className="font-bold text-[#0B45D2] underline cursor-pointer hover:text-blue-800">{user.name}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 bg-[#0B45D2] hover:bg-[#093bb5] text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-3xs transition-colors"
          >
            <Plus className="h-4 w-4 stroke-[2.5]" /> Ajouter une chambre
          </button>
          
          <div className="relative">
            <select 
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="appearance-none flex items-center gap-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold px-3 py-2.5 pl-9 rounded-lg shadow-3xs transition-colors focus:outline-hidden"
            >
              <option value="Tous">Types de chambres</option>
              {roomTypes.map(type => <option key={type} value={type}>{type}</option>)}
            </select>
            <Layers className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          </div>

          <button className="flex items-center gap-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold px-3 py-2.5 rounded-lg shadow-3xs transition-colors">
            <SlidersHorizontal className="h-4 w-4 text-slate-400" /> Filtrer
          </button>
        </div>
      </div>

      {/* Compteurs KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {statsCounters.map((card) => (
          <button 
            key={card.id} 
            onClick={() => setStatusFilter(card.statusFilter)}
            className={`bg-white border hover:shadow-md transition-all rounded-xl p-4 shadow-3xs flex items-center justify-between text-left ${statusFilter === card.statusFilter ? "border-[#0B45D2]" : "border-slate-200"}`}
          >
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
                 {card.isUp === null && <span className="text-[10px] text-slate-400 font-medium">{card.sub}</span>}
               </div>
            </div>
            <div className={`p-2.5 rounded-xl ${card.iconBg} shrink-0 shadow-3xs`}>
               <BedDouble className="h-4 w-4 stroke-[2]" />
            </div>
          </button>
        ))}
      </div>

      {/* Filtres de statut */}
      <div className="flex flex-wrap items-center gap-5 text-[11px] font-bold text-slate-500 pl-1">
        <button onClick={() => setStatusFilter("Tous")} className={`px-2 py-0.5 rounded-md ${statusFilter === "Tous" ? "bg-slate-100 text-slate-800" : ""}`}>Tous</button>
        <button onClick={() => setStatusFilter("Disponible")} className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-emerald-500"/>Disponible</button>
        <button onClick={() => setStatusFilter("Occupée")} className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-amber-500"/>Occupée</button>
        <button onClick={() => setStatusFilter("Maintenance")} className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-rose-500"/>Maintenance</button>
        <button onClick={() => setStatusFilter("Nettoyage")} className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-orange-500"/>Nettoyage</button>
      </div>

      {/* Grille des chambres */}
      {totalFilteredRooms > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {currentRooms.map((room) => (
            <div key={room.id} className={`bg-white border border-slate-200 rounded-xl shadow-3xs overflow-hidden border-t-[3px] ${room.topBorder} flex flex-col justify-between`}>
                <div className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                    <div>
                    <h3 className="text-base font-black text-slate-900 tracking-tight">{room.id}</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">{room.type}</p>
                    </div>
                    <button className="text-slate-300 hover:text-slate-500 p-0.5 rounded-full hover:bg-slate-50 transition-colors">
                    <MoreVertical className="h-4 w-4" />
                    </button>
                </div>

                <div className="flex items-start gap-4 justify-between">
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
                    <div className="flex items-center gap-1.5 pt-1 text-slate-400">
                        <span title="Wi-Fi" className="inline-flex"><Wifi className="h-3.5 w-3.5" /></span>
                        <span title="TV" className="inline-flex"><Tv className="h-3.5 w-3.5" /></span>
                        <span title="Climatisation" className="inline-flex"><Wind className="h-3.5 w-3.5" /></span>
                        {room.extraFeatures && <span title="Mini bar" className="inline-flex"><Coffee className="h-3.5 w-3.5" /></span>}
                    </div>
                    </div>

                    <div className="relative h-20 w-28 rounded-lg overflow-hidden border border-slate-100 bg-slate-50 shrink-0 shadow-3xs">
                    <Image src={room.image} alt={`Chambre ${room.id}`} fill sizes="112px" className="object-cover" priority={parseInt(room.id) <= 104} />
                    </div>
                </div>
                </div>

                <div className="p-4 pt-0">
                <span className={`inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-md border ${room.statusColor}`}>{room.status}</span>
                </div>
            </div>
            ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-xl border border-slate-100 shadow-3xs">
            <div className="inline-flex p-4 rounded-full bg-slate-50 border border-slate-100 text-slate-400"><BedDouble className="h-8 w-8" /></div>
            <h3 className="text-sm font-bold text-slate-700 mt-4">Aucune chambre ne correspond</h3>
        </div>
      )}

      {/* Pagination */}
      <div className="bg-white border border-slate-200 rounded-xl p-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-semibold text-slate-500 shadow-3xs">
        <span>Affichage de {Math.min(indexOfFirstRoom + 1, totalFilteredRooms)} à {Math.min(indexOfLastRoom, totalFilteredRooms)} sur {totalFilteredRooms} chambres</span>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <button onClick={() => paginate(Math.max(1, currentPage - 1))} className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-50" disabled={currentPage === 1}><ChevronLeft className="h-3.5 w-3.5" /></button>
            {[...Array(totalPages).keys()].map(page => (
                <button key={page + 1} onClick={() => paginate(page + 1)} className={`h-7 w-7 rounded-lg font-bold border ${currentPage === page + 1 ? "bg-[#0B45D2] text-white border-[#0B45D2]" : "text-slate-700"}`}>{page + 1}</button>
            ))}
            <button onClick={() => paginate(Math.min(totalPages, currentPage + 1))} className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50" disabled={currentPage === totalPages || totalPages === 0}><ChevronRight className="h-3.5 w-3.5" /></button>
          </div>
          <select value={roomsPerPage} onChange={(e) => {setRoomsPerPage(parseInt(e.target.value)); setCurrentPage(1);}} className="border border-slate-200 rounded-lg px-2 py-1.5 bg-white text-slate-700 font-bold">
            <option value={8}>8 / page</option>
            <option value={16}>16 / page</option>
          </select>
        </div>
      </div>

      {/* Modal 1 : Ajouter une chambre */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center px-4 py-3 border-b border-slate-100">
              <h2 className="text-sm font-bold text-slate-900">Ajouter une nouvelle chambre</h2>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 p-1 rounded-full hover:bg-slate-50"><X className="h-4 w-4" /></button>
            </div>
            <form onSubmit={handleAddRoom} className="p-4 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Numéro de chambre</label>
                <input type="text" required placeholder="Ex: 111..." value={newRoomId} onChange={(e) => setNewRoomId(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Type de chambre</label>
                <select value={newRoomType} onChange={(e) => setNewRoomType(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white">
                  {roomTypes.map(type => <option key={type} value={type}>{type}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Statut initial</label>
                <select value={newRoomStatus} onChange={(e) => setNewRoomStatus(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white">
                  <option value="Disponible">Disponible</option>
                  <option value="Occupée">Occupée</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Nettoyage">Nettoyage</option>
                </select>
              </div>
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-xs font-bold text-slate-500 bg-slate-50 rounded-lg">Annuler</button>
                <button type="submit" className="px-4 py-2 text-xs font-bold text-white bg-[#0B45D2] rounded-lg">Confirmer l'ajout</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2 : Modifier le profil Administrateur (Dynamique) */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center px-4 py-3 border-b border-slate-100">
              <h2 className="text-sm font-bold text-slate-900">Modifier le profil de l'Administrateur</h2>
              <button onClick={() => setIsProfileModalOpen(false)} className="text-slate-400 p-1 rounded-full hover:bg-slate-50"><X className="h-4 w-4" /></button>
            </div>
            <form onSubmit={handleSaveProfile} className="p-4 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Nom complet</label>
                <input type="text" required value={editName} onChange={(e) => setEditName(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Adresse Email</label>
                <input type="email" required value={editEmail} onChange={(e) => setEditEmail(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Téléphone</label>
                <input type="text" required value={editPhone} onChange={(e) => setEditPhone(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs" />
              </div>
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button type="button" onClick={() => setIsProfileModalOpen(false)} className="px-4 py-2 text-xs font-bold text-slate-500 bg-slate-50 rounded-lg">Annuler</button>
                <button type="submit" className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg">Enregistrer les modifications</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

// Exportation enveloppée dans le fournisseur de contexte
export default function GestionChambresPage() {
  return (
    <AppProvider>
      <InterneGestionChambresPage />
    </AppProvider>
  );
}