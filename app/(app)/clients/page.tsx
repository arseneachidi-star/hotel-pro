"use client";

import React, { useState } from "react";
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
  User,
  MessageSquare,
  Sparkles,
  BedDouble,
  CreditCard,
  Star
} from "lucide-react";

// Données fictives de la liste de gauche
const clientsList = [
  { id: 1, name: "Jean Dupont", email: "jean.dupont@email.com", phone: "+33 6 12 34 56 78", tag: "VIP", tagColor: "bg-blue-50 text-blue-600" },
  { id: 2, name: "Marie Martin", email: "marie.martin@email.com", phone: "+33 6 23 45 67 89", tag: "Fidèle", tagColor: "bg-emerald-50 text-emerald-600" },
  { id: 3, name: "Paul Durand", email: "paul.durand@email.com", phone: "+33 6 34 56 78 90", tag: "Fidèle", tagColor: "bg-emerald-50 text-emerald-600" },
  { id: 4, name: "Sophie Leroy", email: "sophie.leroy@email.com", phone: "+33 6 45 67 89 01", tag: "Nouveau", tagColor: "bg-amber-50 text-amber-600" },
  { id: 5, name: "Lucas Bernard", email: "lucas.bernard@email.com", phone: "+33 6 56 78 90 12", tag: "Nouveau", tagColor: "bg-amber-50 text-amber-600" },
  { id: 6, name: "Chloé Dubois", email: "chloe.dubois@email.com", phone: "+33 6 67 89 01 23", tag: "VIP", tagColor: "bg-blue-50 text-blue-600" },
  { id: 7, name: "Antoine Lefevre", email: "antoine.lefevre@email.com", phone: "+33 6 78 90 12 34", tag: "Fidèle", tagColor: "bg-emerald-50 text-emerald-600" },
  { id: 8, name: "Julie Garnier", email: "julie.garnier@email.com", phone: "+33 6 89 01 23 45", tag: "Nouveau", tagColor: "bg-amber-50 text-amber-600" },
];

// Historique des séjours récents du client sélectionné
const recentStays = [
  { id: "#RES1001", room: "305 (Deluxe)", checkIn: "10/06/2024", checkOut: "14/06/2024", nights: 4, amount: "980,00 €", status: "Terminé" },
  { id: "#RES0987", room: "210 (Standard)", checkIn: "22/04/2024", checkOut: "25/04/2024", nights: 3, amount: "540,00 €", status: "Terminé" },
  { id: "#RES0854", room: "402 (Suite)", checkIn: "05/02/2024", checkOut: "09/02/2024", nights: 4, amount: "1 250,00 €", status: "Terminé" },
];

export default function ClientsCRMPage() {
  const [activeTab, setActiveTab] = useState("Informations");
  const [selectedClient, setSelectedClient] = useState(1);

  return (
    <div className="space-y-6">
      
      {/* --- EN-TÊTE --- */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">CRM Clients</h1>
          <p className="text-xs text-slate-400 mt-0.5">Accueil / Clients / CRM Clients</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="bg-[#0B45D2] hover:bg-[#093bb5] text-white text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-2 shadow-xs transition-colors">
            <Plus className="h-4 w-4" /> Nouveau client
          </button>
          <button className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-2 shadow-xs transition-colors">
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
                  placeholder="Rechercher un client..." 
                  className="w-full pl-9 pr-4 py-1.5 border border-slate-200 rounded-lg text-xs bg-slate-50 focus:outline-hidden focus:border-blue-500 transition-colors"
                />
              </div>
              <button className="p-1.5 border border-slate-200 rounded-lg text-slate-500 bg-white hover:bg-slate-50">
                <SlidersHorizontal className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Liste déroulante */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {clientsList.map((client) => (
              <div 
                key={client.id}
                onClick={() => setSelectedClient(client.id)}
                className={`p-3 flex items-center justify-between cursor-pointer transition-colors ${
                  selectedClient === client.id ? "bg-blue-50/60 border-l-4 border-[#0B45D2]" : "hover:bg-slate-50/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center font-bold text-xs text-slate-600">
                    {client.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{client.name}</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">{client.email}</p>
                    <p className="text-[10px] text-slate-400">{client.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${client.tagColor}`}>
                    {client.tag}
                  </span>
                  <ChevronRight className="h-3 w-3 text-slate-300" />
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Liste */}
          <div className="p-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 bg-slate-50/50">
            <span>1 - 8 sur 128 clients</span>
            <div className="flex items-center gap-0.5">
              <button className="p-1 border border-slate-200 rounded bg-white"><ChevronLeft className="h-3 w-3" /></button>
              <button className="px-2 py-0.5 bg-[#0B45D2] text-white font-bold rounded">1</button>
              <button className="px-2 py-0.5 border border-slate-200 bg-white rounded">2</button>
              <button className="px-2 py-0.5 border border-slate-200 bg-white rounded">3</button>
              <span className="px-0.5 text-slate-300">...</span>
              <button className="px-2 py-0.5 border border-slate-200 bg-white rounded">16</button>
              <button className="p-1 border border-slate-200 rounded bg-white"><ChevronRight className="h-3 w-3" /></button>
            </div>
          </div>
        </div>

        {/* ================= COLONNE DROITE : PROFIL DU CLIENT DETAILED ================= */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Fiche Profil & Compteurs */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-slate-200 border-2 border-slate-300 overflow-hidden flex items-center justify-center font-bold text-xl text-slate-500">
                  JD
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-slate-900">Jean Dupont</h2>
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[9px] font-bold uppercase tracking-wide">VIP</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 mt-2 text-xs text-slate-500">
                    <div className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5 text-slate-400" /> jean.dupont@email.com</div>
                    <div className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5 text-slate-400" /> +33 6 12 34 56 78</div>
                    <div className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-slate-400" /> France</div>
                    <div className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5 text-slate-400" /> Client depuis le 12/03/2022</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-center">
                <button className="bg-[#0B45D2] hover:bg-[#093bb5] text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors">
                  <Pencil className="h-3 w-3" /> Modifier
                </button>
                <button className="p-1.5 border border-slate-200 rounded-lg text-slate-400 hover:bg-slate-50">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Grille des 4 indicateurs de performance */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="border border-slate-100 rounded-xl p-3 bg-slate-50/30 text-center">
                <div className="mx-auto h-7 w-7 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-2"><Calendar className="h-4 w-4" /></div>
                <p className="text-xl font-bold text-slate-900">12</p>
                <p className="text-[10px] text-slate-400 font-medium">Séjours</p>
              </div>
              <div className="border border-slate-100 rounded-xl p-3 bg-slate-50/30 text-center">
                <div className="mx-auto h-7 w-7 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 mb-2"><BedDouble className="h-4 w-4" /></div>
                <p className="text-xl font-bold text-slate-900">38</p>
                <p className="text-[10px] text-slate-400 font-medium">Nuits</p>
              </div>
              <div className="border border-slate-100 rounded-xl p-3 bg-slate-50/30 text-center">
                <div className="mx-auto h-7 w-7 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 mb-2"><CreditCard className="h-4 w-4" /></div>
                <p className="text-xl font-bold text-slate-900">4 250 €</p>
                <p className="text-[10px] text-slate-400 font-medium">Dépensé</p>
              </div>
              <div className="border border-slate-100 rounded-xl p-3 bg-slate-50/30 text-center">
                <div className="mx-auto h-7 w-7 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 mb-2"><Star className="h-4 w-4" /></div>
                <p className="text-xl font-bold text-slate-900">4.8/5</p>
                <p className="text-[10px] text-slate-400 font-medium">Note moyenne</p>
              </div>
            </div>

            {/* Menu des onglets (Tabs) */}
            <div className="border-b border-slate-100 flex gap-6 text-xs font-semibold text-slate-400">
              {["Informations", "Historique des séjours", "Préférences", "Notes", "Documents"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 relative transition-colors ${
                    activeTab === tab ? "text-[#0B45D2] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#0B45D2]" : "hover:text-slate-600"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Contenu de l'onglet : Informations */}
            {activeTab === "Informations" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs pt-2">
                <div className="space-y-3">
                  <h3 className="font-bold text-slate-800 text-sm mb-4">Informations personnelles</h3>
                  <div className="flex justify-between py-1 border-b border-slate-50"><span className="text-slate-400 font-medium">Date de naissance :</span><span className="font-semibold text-slate-700">15/06/1985</span></div>
                  <div className="flex justify-between py-1 border-b border-slate-50"><span className="text-slate-400 font-medium">Adresse :</span><span className="font-semibold text-slate-700 text-right max-w-[200px]">25 Rue de la Paix, 75002 Paris, France</span></div>
                  <div className="flex justify-between py-1 border-b border-slate-50"><span className="text-slate-400 font-medium">Pièce d'identité :</span><span className="font-semibold text-slate-700">Passeport - FR1234567</span></div>
                  <div className="flex justify-between py-1 border-b border-slate-50"><span className="text-slate-400 font-medium">Nationalité :</span><span className="font-semibold text-slate-700">Française</span></div>
                  <div className="flex justify-between py-1 border-b border-slate-50"><span className="text-slate-400 font-medium">Langue préférée :</span><span className="font-semibold text-slate-700">Français</span></div>
                  <div className="flex justify-between py-1 border-b border-slate-50"><span className="text-slate-400 font-medium">Email :</span><span className="font-semibold text-blue-600">jean.dupont@email.com</span></div>
                  <div className="flex justify-between py-1"><span className="text-slate-400 font-medium">Téléphone :</span><span className="font-semibold text-slate-700">+33 6 12 34 56 78</span></div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-bold text-slate-800 text-sm mb-4">Préférences</h3>
                  <div className="flex justify-between py-1 border-b border-slate-50"><span className="text-slate-400 font-medium">Type de chambre préféré :</span><span className="font-semibold text-slate-700">Deluxe / Vue mer</span></div>
                  <div className="flex justify-between py-1 border-b border-slate-50"><span className="text-slate-400 font-medium">Étage préféré :</span><span className="font-semibold text-slate-700">Étage élevé</span></div>
                  <div className="flex justify-between py-1 border-b border-slate-50"><span className="text-slate-400 font-medium">Lit préféré :</span><span className="font-semibold text-slate-700">Grand lit</span></div>
                  <div className="flex justify-between py-1 border-b border-slate-50"><span className="text-slate-400 font-medium">Fumeur :</span><span className="font-semibold text-slate-700">Non</span></div>
                  <div className="flex justify-between py-1"><span className="text-slate-400 font-medium">Demandes spéciales :</span><span className="font-semibold text-slate-700 text-right max-w-[200px]">Petit-déjeuner en chambre, Arrivée tardive</span></div>
                </div>
              </div>
            )}
          </div>

          {/* Section Inférieure : Séjours récents & Notes */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Tableau Séjours Récents */}
            <div className="md:col-span-8 bg-white border border-slate-200 rounded-xl shadow-sm p-4 space-y-4">
              <h3 className="font-bold text-slate-800 text-sm">Historique des séjours récents</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="text-[10px] font-bold uppercase text-slate-400 border-b border-slate-100 bg-slate-50/50">
                      <th className="p-2">Séjour</th>
                      <th className="p-2">Chambre</th>
                      <th className="p-2">Arrivée</th>
                      <th className="p-2">Départ</th>
                      <th className="p-2 text-center">Nuits</th>
                      <th className="p-2">Montant</th>
                      <th className="p-2">Statut</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-600">
                    {recentStays.map((stay, idx) => (
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
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Encadré Notes */}
            <div className="md:col-span-4 bg-white border border-slate-200 rounded-xl shadow-sm p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-slate-50 pb-2 mb-2">
                <h3 className="font-bold text-slate-800 text-sm">Notes</h3>
                <button className="text-[11px] font-bold text-[#0B45D2] hover:underline flex items-center gap-0.5">
                  + Ajouter une note
                </button>
              </div>
              <div className="border border-slate-100 rounded-lg p-3 bg-slate-50/40 relative flex-1">
                <p className="text-xs font-medium text-slate-600 leading-relaxed">
                  Client très satisfait, apprécie le calme et la vue sur mer.
                </p>
                <div className="mt-4 flex items-center justify-between text-[10px] text-slate-400 font-semibold">
                  <span>Admin Hotel - 10/06/2024</span>
                  <button className="text-slate-400 hover:text-slate-600">
                    <MoreVertical className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

