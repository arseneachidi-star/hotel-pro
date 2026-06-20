"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { 
  Plus, 
  Download, 
  Search, 
  SlidersHorizontal, 
  ChevronLeft, 
  ChevronRight,
  Pencil,
  MoreVertical,
  Mail,
  Phone,
  MapPin,
  Calendar,
  BedDouble,
  CreditCard,
  Star,
  Trash2,
  CheckCircle2,
  X,
  UserCheck,
  Archive
} from "lucide-react";

// --- INTERFACES DES DONNÉES ---
interface StayHistory {
  id: string;
  room: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  amount: string;
  status: string;
}

interface ClientNote {
  id: number;
  text: string;
  author: string;
  date: string;
}

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  tag: "VIP" | "Fidèle" | "Nouveau";
  tagColor: string;
  joinedDate: string;
  birthDate: string;
  address: string;
  idCard: string;
  nationality: string;
  language: string;
  stats: { stays: number; nights: number; spent: string; rating: string; };
  preferences: { roomType: string; floor: string; bed: string; smoker: string; specialRequests: string; };
  history: StayHistory[];
  notes: ClientNote[];
}

// --- BASE DE DONNÉES DYNAMIQUE DES CLIENTS ---
const initialClients: Client[] = [
  {
    id: 1,
    name: "Jean Dupont",
    email: "jean.dupont@email.com",
    phone: "+33612345678", // Format nettoyé pour l'attribut tel:
    tag: "VIP",
    tagColor: "bg-blue-50 text-blue-600",
    joinedDate: "12/03/2022",
    birthDate: "15/06/1985",
    address: "25 Rue de la Paix, 75002 Paris, France",
    idCard: "Passeport - FR1234567",
    nationality: "Française",
    language: "Français",
    stats: { stays: 12, nights: 38, spent: "4 250 €", rating: "4.8/5" },
    preferences: { roomType: "Deluxe / Vue mer", floor: "Étage élevé", bed: "Grand lit", smoker: "Non", specialRequests: "Petit-déjeuner en chambre, Arrivée tardive" },
    history: [
      { id: "#RES1001", room: "305 (Deluxe)", checkIn: "10/06/2024", checkOut: "14/06/2024", nights: 4, amount: "980,00 €", status: "Terminé" },
      { id: "#RES0987", room: "210 (Standard)", checkIn: "22/04/2024", checkOut: "25/04/2024", nights: 3, amount: "540,00 €", status: "Terminé" }
    ],
    notes: [{ id: 1, text: "Client très satisfait, apprécie le calme et la vue sur mer.", author: "Admin Hotel", date: "10/06/2024" }]
  },
  {
    id: 2,
    name: "Marie Martin",
    email: "marie.martin@email.com",
    phone: "+33623456789",
    tag: "Fidèle",
    tagColor: "bg-emerald-50 text-emerald-600",
    joinedDate: "05/11/2023",
    birthDate: "22/09/1990",
    address: "14 Avenue des Champs, 69002 Lyon, France",
    idCard: "CNI - FR987654",
    nationality: "Française",
    language: "Français",
    stats: { stays: 6, nights: 18, spent: "2 100 €", rating: "4.9/5" },
    preferences: { roomType: "Standard", floor: "Rez-de-chaussée", bed: "Lits jumeaux", smoker: "Non", specialRequests: "Proche de l'ascenseur" },
    history: [{ id: "#RES1022", room: "102 (Standard)", checkIn: "14/06/2024", checkOut: "16/06/2024", nights: 2, amount: "300,00 €", status: "Terminé" }],
    notes: [{ id: 2, text: "Demande toujours un oreiller supplémentaire.", author: "Gouvernante", date: "15/06/2024" }]
  },
  {
    id: 3,
    name: "Paul Durand",
    email: "paul.durand@email.com",
    phone: "+33634567890",
    tag: "Fidèle",
    tagColor: "bg-emerald-50 text-emerald-600",
    joinedDate: "18/01/2023",
    birthDate: "30/01/1978",
    address: "8 Rue de la Gare, 33000 Bordeaux, France",
    idCard: "Passeport - FR554433",
    nationality: "Française",
    language: "Français / Anglais",
    stats: { stays: 8, nights: 24, spent: "3 400 €", rating: "4.5/5" },
    preferences: { roomType: "Suite", floor: "Étage intermédiaire", bed: "King Size", smoker: "Oui", specialRequests: "Machine à café premium requise" },
    history: [{ id: "#RES0854", room: "402 (Suite)", checkIn: "05/02/2024", checkOut: "09/02/2024", nights: 4, amount: "1 250,00 €", status: "Terminé" }],
    notes: []
  },
  {
    id: 4,
    name: "Sophie Leroy",
    email: "sophie.leroy@email.com",
    phone: "+33645678901",
    tag: "Nouveau",
    tagColor: "bg-amber-50 text-amber-600",
    joinedDate: "10/05/2024",
    birthDate: "12/11/1992",
    address: "42 Rue des Fleurs, 13001 Marseille, France",
    idCard: "CNI - FR445566",
    nationality: "Française",
    language: "Français",
    stats: { stays: 1, nights: 2, spent: "280 €", rating: "5.0/5" },
    preferences: { roomType: "Standard", floor: "Étage élevé", bed: "Grand lit", smoker: "Non", specialRequests: "Bouteille d'eau à l'arrivée" },
    history: [],
    notes: []
  },
  {
    id: 5,
    name: "Lucas Bernard",
    email: "lucas.bernard@email.com",
    phone: "+33656789012",
    tag: "Nouveau",
    tagColor: "bg-amber-50 text-amber-600",
    joinedDate: "01/06/2024",
    birthDate: "04/04/1988",
    address: "3 Avenue Foch, 59000 Lille, France",
    idCard: "Passeport - FR889900",
    nationality: "Française",
    language: "Français",
    stats: { stays: 1, nights: 3, spent: "450 €", rating: "4.0/5" },
    preferences: { roomType: "Deluxe", floor: "Indifférent", bed: "Grand lit", smoker: "Non", specialRequests: "Aucune" },
    history: [],
    notes: []
  },
  {
    id: 6,
    name: "Chloé Dubois",
    email: "chloe.dubois@email.com",
    phone: "+33667890123",
    tag: "VIP",
    tagColor: "bg-blue-50 text-blue-600",
    joinedDate: "20/09/2021",
    birthDate: "29/07/1981",
    address: "88 Boulevard Haussmann, 75008 Paris, France",
    idCard: "CNI - FR112233",
    nationality: "Française",
    language: "Français / Espagnol",
    stats: { stays: 22, nights: 74, spent: "9 800 €", rating: "4.9/5" },
    preferences: { roomType: "Suite / Vue mer", floor: "Dernier étage", bed: "King Size", smoker: "Non", specialRequests: "Service VIP complet, Transfert aéroport" },
    history: [],
    notes: []
  },
  {
    id: 7,
    name: "Antoine Lefevre",
    email: "antoine.lefevre@email.com",
    phone: "+33678901234",
    tag: "Fidèle",
    tagColor: "bg-emerald-50 text-emerald-600",
    joinedDate: "11/02/2023",
    birthDate: "17/12/1975",
    address: "12 Rue des Arts, 44000 Nantes, France",
    idCard: "Passeport - FR667788",
    nationality: "Française",
    language: "Français",
    stats: { stays: 9, nights: 28, spent: "3 950 €", rating: "4.7/5" },
    preferences: { roomType: "Standard", floor: "Étage intermédiaire", bed: "Grand lit", smoker: "Non", specialRequests: "Alunissage calme" },
    history: [],
    notes: []
  },
  {
    id: 8,
    name: "Julie Garnier",
    email: "julie.garnier@email.com",
    phone: "+33689012345",
    tag: "Nouveau",
    tagColor: "bg-amber-50 text-amber-600",
    joinedDate: "14/06/2024",
    birthDate: "02/03/1995",
    address: "55 Rue de la République, 60000 Beauvais, France",
    idCard: "CNI - FR773322",
    nationality: "Française",
    language: "Français / Allemand",
    stats: { stays: 1, nights: 1, spent: "120 €", rating: "4.5/5" },
    preferences: { roomType: "Standard", floor: "Rez-de-chaussée", bed: "Lits jumeaux", smoker: "Non", specialRequests: "Arrivée matinale" },
    history: [],
    notes: []
  }
];

// Fonction utilitaire pour formater joliment le numéro de téléphone à l'affichage
const formatPhoneDisplay = (phone: string) => {
  if (phone.startsWith("+33")) {
    return phone.replace(/(\+33)(\d)(\d{2})(\d{2})(\d{2})(\d{2})/, "$1 $2 $3 $4 $5 $6");
  }
  return phone;
};

export default function ClientsCRMPage() {
  // --- ÉTATS ---
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [selectedClientId, setSelectedClientId] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("Informations");
  const [currentPage, setCurrentPage] = useState(1);
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  const clientsPerPage = 5;

  // Gestion des notes
  const [newNoteText, setNewNoteText] = useState("");
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Fermer le menu dropdown si on clique à l'extérieur
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsActionsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- FILTRAGE ET PAGINATION ---
  const filteredClients = useMemo(() => {
    return clients.filter(c => 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery)
    );
  }, [clients, searchQuery]);

  const totalClientsCount = filteredClients.length;
  const totalPages = Math.ceil(totalClientsCount / clientsPerPage) || 1;

  const paginatedClients = useMemo(() => {
    const startIndex = (currentPage - 1) * clientsPerPage;
    return filteredClients.slice(startIndex, startIndex + clientsPerPage);
  }, [filteredClients, currentPage]);

  // Client sélectionné actuellement
  const currentClient = useMemo(() => {
    return clients.find(c => c.id === selectedClientId) || clients[0];
  }, [clients, selectedClientId]);

  // --- ACTIONS DYNAMIQUES ---
  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;

    setClients(prevClients => prevClients.map(client => {
      if (client.id === currentClient.id) {
        return {
          ...client,
          notes: [
            ...client.notes,
            {
              id: Date.now(),
              text: newNoteText,
              author: "Réception",
              date: new Date().toLocaleDateString("fr-FR")
            }
          ]
        };
      }
      return client;
    }));

    setNewNoteText("");
    setIsAddingNote(false);
    triggerToast("Note ajoutée avec succès !");
  };

  const handleDeleteNote = (noteId: number) => {
    setClients(prevClients => prevClients.map(client => {
      if (client.id === currentClient.id) {
        return { ...client, notes: client.notes.filter(n => n.id !== noteId) };
      }
      return client;
    }));
    triggerToast("Note supprimée.");
  };

  return (
    <div className="space-y-6">
      
      {/* Toast de Notification */}
      {toast && (
        <div className="fixed top-4 right-4 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 z-50 text-xs animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span className="font-semibold">{toast}</span>
        </div>
      )}

      {/* --- EN-TÊTE --- */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">CRM Clients</h1>
          <p className="text-xs text-slate-400 mt-0.5">Accueil / Clients / CRM Clients</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button onClick={() => triggerToast("Ouverture du formulaire de création...")} className="bg-[#0B45D2] hover:bg-[#093bb5] text-white text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-2 shadow-xs transition-colors active:scale-95">
            <Plus className="h-4 w-4" /> Nouveau client
          </button>
          <button onClick={() => triggerToast("Exportation Excel lancée.")} className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-2 shadow-xs transition-colors">
            <Download className="h-4 w-4 text-slate-400" /> Exporter
          </button>
        </div>
      </div>

      {/* --- GRILLE PRINCIPALE (Master-Detail) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ================= COLONNE GAUCHE : LISTE DES CLIENTS ================= */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col h-[780px]">
          <div className="p-4 border-b border-slate-100 space-y-3">
            <h3 className="font-bold text-slate-800 text-sm">Liste des clients</h3>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                  placeholder="Rechercher un client..." 
                  className="w-full pl-9 pr-4 py-1.5 border border-slate-200 rounded-lg text-xs bg-slate-50 focus:outline-hidden focus:border-blue-500 transition-colors"
                />
              </div>
              <button className="p-1.5 border border-slate-200 rounded-lg text-slate-500 bg-white hover:bg-slate-50">
                <SlidersHorizontal className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Liste déroulante dynamique */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {paginatedClients.length === 0 ? (
              <div className="p-4 text-center text-xs text-slate-400">Aucun client trouvé</div>
            ) : (
              paginatedClients.map((client) => (
                <div 
                  key={client.id}
                  onClick={() => { setSelectedClientId(client.id); setActiveTab("Informations"); }}
                  className={`p-3 flex items-center justify-between cursor-pointer transition-all ${
                    selectedClientId === client.id ? "bg-blue-50/60 border-l-4 border-l-[#0B45D2]" : "hover:bg-slate-50/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-xs text-slate-600">
                      {client.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{client.name}</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">{client.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${client.tagColor}`}>
                      {client.tag}
                    </span>
                    <ChevronRight className="h-3 w-3 text-slate-300" />
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination Dynamique */}
          <div className="p-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 bg-slate-50/50">
            <span>{Math.min((currentPage - 1) * clientsPerPage + 1, totalClientsCount)} - {Math.min(currentPage * clientsPerPage, totalClientsCount)} sur {totalClientsCount} clients</span>
            <div className="flex items-center gap-1">
              <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="p-1 border border-slate-200 rounded bg-white hover:bg-slate-50 disabled:opacity-50"><ChevronLeft className="h-3 w-3" /></button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button key={i} onClick={() => setCurrentPage(i + 1)} className={`px-2 py-0.5 rounded font-bold ${currentPage === i + 1 ? "bg-[#0B45D2] text-white" : "border border-slate-200 bg-white"}`}>{i + 1}</button>
              ))}
              <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} className="p-1 border border-slate-200 rounded bg-white hover:bg-slate-50 disabled:opacity-50"><ChevronRight className="h-3 w-3" /></button>
            </div>
          </div>
        </div>

        {/* ================= COLONNE DROITE : PROFIL CLIENT SÉLECTIONNÉ ================= */}
        {currentClient && (
          <div className="lg:col-span-8 space-y-6">
            
            {/* Fiche Profil */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-xl text-[#0B45D2]">
                    {currentClient.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold text-slate-900">{currentClient.name}</h2>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wide ${currentClient.tagColor}`}>{currentClient.tag}</span>
                    </div>
                    
                    {/* LIENS INTERACTIFS ET CLICABLES (Email & Téléphone) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 mt-2 text-xs text-slate-500">
                      <a href={`mailto:${currentClient.email}`} className="flex items-center gap-1.5 hover:text-[#0B45D2] hover:underline transition-all">
                        <Mail className="h-3.5 w-3.5 text-slate-400" /> {currentClient.email}
                      </a>
                      <a href={`tel:${currentClient.phone}`} className="flex items-center gap-1.5 hover:text-[#0B45D2] hover:underline transition-all">
                        <Phone className="h-3.5 w-3.5 text-slate-400" /> {formatPhoneDisplay(currentClient.phone)}
                      </a>
                      <div className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-slate-400" /> {currentClient.nationality}</div>
                      <div className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5 text-slate-400" /> Profil créé le {currentClient.joinedDate}</div>
                    </div>
                  </div>
                </div>

                {/* BOUTON MODIFIER ET MENU DROPDOWN */}
                <div className="flex items-center gap-2 self-start sm:self-center relative" ref={menuRef}>
                  <button onClick={() => triggerToast(`Fiche de ${currentClient.name} prête à l'édition.`)} className="bg-[#0B45D2] hover:bg-[#093bb5] text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors">
                    <Pencil className="h-3 w-3" /> Modifier
                  </button>
                  
                  <button 
                    onClick={() => setIsActionsOpen(!isActionsOpen)} 
                    className={`p-1.5 border border-slate-200 rounded-lg transition-colors ${isActionsOpen ? "bg-slate-100 text-slate-800" : "text-slate-400 hover:bg-slate-50"}`}
                  >
                    <MoreVertical className="h-4 w-4" />
                  </button>

                  {/* Menu contextuel déroulant */}
                  {isActionsOpen && (
                    <div className="absolute right-0 top-10 bg-white border border-slate-200 rounded-xl shadow-xl py-1 w-44 z-40 animate-in fade-in slide-in-from-top-2 duration-150">
                      <a href={`mailto:${currentClient.email}`} onClick={() => setIsActionsOpen(false)} className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                        <Mail className="h-3.5 w-3.5 text-slate-400" /> Envoyer un message
                      </a>
                      <button onClick={() => { setIsActionsOpen(false); triggerToast(`Statut mis à jour.`); }} className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                        <UserCheck className="h-3.5 w-3.5 text-slate-400" /> Changer le statut
                      </button>
                      <hr className="border-slate-100 my-1" />
                      <button onClick={() => { setIsActionsOpen(false); triggerToast(`Client archivé.`); }} className="w-full text-left px-3 py-2 text-xs text-rose-600 hover:bg-rose-50/50 flex items-center gap-2">
                        <Archive className="h-3.5 w-3.5 text-rose-500" /> Archiver le dossier
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Indicateurs statistiques */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="border border-slate-100 rounded-xl p-3 bg-slate-50/30 text-center">
                  <div className="mx-auto h-7 w-7 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-2"><Calendar className="h-4 w-4" /></div>
                  <p className="text-xl font-bold text-slate-900">{currentClient.stats.stays}</p>
                  <p className="text-[10px] text-slate-400 font-medium">Séjours</p>
                </div>
                <div className="border border-slate-100 rounded-xl p-3 bg-slate-50/30 text-center">
                  <div className="mx-auto h-7 w-7 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 mb-2"><BedDouble className="h-4 w-4" /></div>
                  <p className="text-xl font-bold text-slate-900">{currentClient.stats.nights}</p>
                  <p className="text-[10px] text-slate-400 font-medium">Nuits</p>
                </div>
                <div className="border border-slate-100 rounded-xl p-3 bg-slate-50/30 text-center">
                  <div className="mx-auto h-7 w-7 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 mb-2"><CreditCard className="h-4 w-4" /></div>
                  <p className="text-xl font-bold text-slate-900">{currentClient.stats.spent}</p>
                  <p className="text-[10px] text-slate-400 font-medium">Dépensé</p>
                </div>
                <div className="border border-slate-100 rounded-xl p-3 bg-slate-50/30 text-center">
                  <div className="mx-auto h-7 w-7 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 mb-2"><Star className="h-4 w-4" /></div>
                  <p className="text-xl font-bold text-slate-900">{currentClient.stats.rating}</p>
                  <p className="text-[10px] text-slate-400 font-medium">Note moyenne</p>
                </div>
              </div>

              {/* Onglets (Tabs) */}
              <div className="border-b border-slate-100 flex gap-6 text-xs font-semibold text-slate-400 overflow-x-auto whitespace-nowrap">
                {["Informations", "Historique des séjours", "Préférences"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 relative transition-all ${
                      activeTab === tab ? "text-[#0B45D2] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#0B45D2]" : "hover:text-slate-600"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Contenu Dynamique des Onglets */}
              {activeTab === "Informations" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs pt-2">
                  <div className="space-y-3">
                    <h3 className="font-bold text-slate-800 text-sm mb-2">Informations personnelles</h3>
                    <div className="flex justify-between py-1 border-b border-slate-50"><span className="text-slate-400 font-medium">Date de naissance :</span><span className="font-semibold text-slate-700">{currentClient.birthDate}</span></div>
                    <div className="flex justify-between py-1 border-b border-slate-50"><span className="text-slate-400 font-medium">Adresse :</span><span className="font-semibold text-slate-700 text-right max-w-[200px]">{currentClient.address}</span></div>
                    <div className="flex justify-between py-1 border-b border-slate-50"><span className="text-slate-400 font-medium">Pièce d'identité :</span><span className="font-semibold text-slate-700">{currentClient.idCard}</span></div>
                    <div className="flex justify-between py-1 border-b border-slate-50"><span className="text-slate-400 font-medium">Langue préférée :</span><span className="font-semibold text-slate-700">{currentClient.language}</span></div>
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-bold text-slate-800 text-sm mb-2">Coordonnées</h3>
                    <div className="flex justify-between py-1 border-b border-slate-50"><span className="text-slate-400 font-medium">Téléphone portable :</span><a href={`tel:${currentClient.phone}`} className="font-semibold text-slate-700 hover:text-[#0B45D2] hover:underline">{formatPhoneDisplay(currentClient.phone)}</a></div>
                    <div className="flex justify-between py-1 border-b border-slate-50"><span className="text-slate-400 font-medium">E-mail principal :</span><a href={`mailto:${currentClient.email}`} className="font-semibold text-blue-600 hover:underline">{currentClient.email}</a></div>
                  </div>
                </div>
              )}

              {activeTab === "Préférences" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs pt-2">
                  <div className="space-y-3">
                    <h3 className="font-bold text-slate-800 text-sm mb-2">Hébergement</h3>
                    <div className="flex justify-between py-1 border-b border-slate-50"><span className="text-slate-400 font-medium">Type de chambre :</span><span className="font-semibold text-slate-700">{currentClient.preferences.roomType}</span></div>
                    <div className="flex justify-between py-1 border-b border-slate-50"><span className="text-slate-400 font-medium">Étage préféré :</span><span className="font-semibold text-slate-700">{currentClient.preferences.floor}</span></div>
                    <div className="flex justify-between py-1 border-b border-slate-50"><span className="text-slate-400 font-medium">Type de lit :</span><span className="font-semibold text-slate-700">{currentClient.preferences.bed}</span></div>
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-bold text-slate-800 text-sm mb-2">Restauration & Extras</h3>
                    <div className="flex justify-between py-1 border-b border-slate-50"><span className="text-slate-400 font-medium">Fumeur :</span><span className="font-semibold text-slate-700">{currentClient.preferences.smoker}</span></div>
                    <div className="flex justify-between py-1"><span className="text-slate-400 font-medium">Notes spéciales :</span><span className="font-semibold text-slate-700 text-right max-w-[200px]">{currentClient.preferences.specialRequests}</span></div>
                  </div>
                </div>
              )}

              {activeTab === "Historique des séjours" && (
                <div className="overflow-x-auto pt-2">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="text-[10px] font-bold uppercase text-slate-400 border-b border-slate-100 bg-slate-50/50">
                        <th className="p-2">ID Séjour</th>
                        <th className="p-2">Chambre</th>
                        <th className="p-2">Arrivée</th>
                        <th className="p-2">Départ</th>
                        <th className="p-2 text-center">Nuits</th>
                        <th className="p-2">Montant</th>
                        <th className="p-2">Statut</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-600">
                      {currentClient.history.length === 0 ? (
                        <tr><td colSpan={7} className="p-4 text-center text-slate-400">Aucun séjour archivé pour le moment.</td></tr>
                      ) : (
                        currentClient.history.map((stay, idx) => (
                          <tr key={idx} className="hover:bg-slate-50/50">
                            <td className="p-2 font-bold text-[#0B45D2]">{stay.id}</td>
                            <td className="p-2 text-slate-700">{stay.room}</td>
                            <td className="p-2">{stay.checkIn}</td>
                            <td className="p-2">{stay.checkOut}</td>
                            <td className="p-2 text-center">{stay.nights}</td>
                            <td className="p-2 font-bold text-slate-900">{stay.amount}</td>
                            <td className="p-2">
                              <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-50 text-emerald-600">{stay.status}</span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Section basse : Rappels Séjours & Notes */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Table de rappel rapide */}
              <div className="md:col-span-7 bg-white border border-slate-200 rounded-xl shadow-sm p-4 space-y-4">
                <h3 className="font-bold text-slate-800 text-sm">Vue rapide des séjours</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="text-[10px] font-bold uppercase text-slate-400 border-b border-slate-100 bg-slate-50/50">
                        <th className="p-2">Séjour</th>
                        <th className="p-2">Chambre</th>
                        <th className="p-2">Dates</th>
                        <th className="p-2">Montant</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-600">
                      {currentClient.history.length === 0 ? (
                        <tr><td colSpan={4} className="p-2 text-slate-400 italic text-center">Aucun séjour</td></tr>
                      ) : (
                        currentClient.history.slice(0, 2).map((stay, idx) => (
                          <tr key={idx} className="hover:bg-slate-50/50">
                            <td className="p-2 font-bold text-[#0B45D2]">{stay.id}</td>
                            <td className="p-2 text-slate-700">{stay.room}</td>
                            <td className="p-2 text-[11px]">{stay.checkIn} - {stay.checkOut}</td>
                            <td className="p-2 font-bold text-slate-900">{stay.amount}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Bloc de Notes Suivi Internes */}
              <div className="md:col-span-5 bg-white border border-slate-200 rounded-xl shadow-sm p-4 flex flex-col justify-between h-48">
                <div className="flex items-center justify-between border-b border-slate-50 pb-2 mb-2">
                  <h3 className="font-bold text-slate-800 text-sm">Notes Suivi</h3>
                  {!isAddingNote ? (
                    <button onClick={() => setIsAddingNote(true)} className="text-[11px] font-bold text-[#0B45D2] hover:underline">
                      + Nouvelle Note
                    </button>
                  ) : (
                    <button onClick={() => setIsAddingNote(false)} className="text-slate-400 hover:text-slate-600"><X className="h-3 w-3" /></button>
                  )}
                </div>

                <div className="flex-1 overflow-y-auto space-y-2 pr-1">
                  {isAddingNote ? (
                    <form onSubmit={handleAddNote} className="space-y-2">
                      <textarea 
                        required
                        value={newNoteText}
                        onChange={(e) => setNewNoteText(e.target.value)}
                        placeholder="Écrire une note interne..." 
                        className="w-full h-20 p-2 border border-slate-200 rounded-lg text-xs focus:outline-hidden focus:border-blue-500 bg-slate-50 resize-none"
                      />
                      <button type="submit" className="w-full py-1.5 bg-[#0B45D2] text-white text-[11px] font-semibold rounded-md shadow-xs">Enregistrer</button>
                    </form>
                  ) : currentClient.notes.length === 0 ? (
                    <p className="text-xs text-slate-400 italic pt-4 text-center">Aucune note pour ce client.</p>
                  ) : (
                    currentClient.notes.map((note) => (
                      <div key={note.id} className="border border-slate-100 rounded-lg p-2.5 bg-slate-50/60 relative group">
                        <p className="text-xs font-medium text-slate-600 leading-relaxed pr-6">{note.text}</p>
                        <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400 font-semibold">
                          <span>{note.author} - {note.date}</span>
                          <button onClick={() => handleDeleteNote(note.id)} className="text-rose-500 hover:text-rose-700 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}