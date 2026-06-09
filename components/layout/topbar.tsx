"use client";

import { Search, Bell, Mail, ChevronDown } from "lucide-react";
import { Badge } from "../ui/badge";

export default function Topbar() {
  return (
    <header className="h-20 bg-white border-b border-slate-100 fixed top-0 right-0 left-64 z-30 px-8 flex items-center justify-between shadow-sm">
      {/* Barre de recherche globale */}
      <div className="relative w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
        <input
          type="text"
          placeholder="Rechercher un client, une réservation, une chambre..."
          className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-colors"
        />
      </div>

      {/* Actions de droite (Notifications + Profil) */}
      <div className="flex items-center gap-6">
        {/* Messagerie */}
        <button className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors">
          <Mail className="h-5 w-5" />
        </button>

        {/* Cloche de Notifications dynamiques avec badge rouge */}
        <button className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors">
          <Bell className="h-5 w-5" />
          <Badge className="absolute -top-0.5 -right-0.5 h-5 w-5 flex items-center justify-center bg-red-500 text-white border-2 border-white rounded-full p-0 text-[10px]">
            3
          </Badge>
        </button>

        <div className="h-8 w-px bg-slate-200" />

        {/* Profil de l'utilisateur connecté */}
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="h-10 w-10 bg-blue-100 rounded-xl overflow-hidden flex items-center justify-center font-bold text-blue-600">
            JD
          </div>
          <div className="text-left hidden md:block">
            <p className="text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">Jean Dupont</p>
            <p className="text-xs text-slate-400 font-medium">Administrateur</p>
          </div>
          <ChevronDown className="h-4 w-4 text-slate-400" />
        </div>
      </div>
    </header>
  );
}

