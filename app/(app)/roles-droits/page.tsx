"use client";

import React from "react";
import { 
  Shield, 
  Plus, 
  CheckCircle2, 
  XCircle, 
  Eye, 
  UserCheck, 
  ChevronRight,
  MoreVertical,
  Pencil,
  LayoutDashboard,
  Calendar,
  BedDouble,
  Users,
  FileText,
  CreditCard,
  BarChart3,
  Bell,
  Settings,
  ShieldAlert
} from "lucide-react";

// Cartes des rôles du haut
const roleCards = [
  { id: "admin", name: "Administrateur", count: 2, desc: "Accès complet à toutes les fonctionnalités", bgIcon: "bg-blue-50 text-blue-600" },
  { id: "reception", name: "Réceptionniste", count: 5, desc: "Gestion des réservations, clients et facturation", bgIcon: "bg-emerald-50 text-emerald-600" },
  { id: "menage", name: "Personnel de ménage", count: 8, desc: "Gestion du nettoyage et des chambres", bgIcon: "bg-amber-50 text-amber-600" },
  { id: "direction", name: "Direction", count: 3, desc: "Accès aux rapports et statistiques", bgIcon: "bg-purple-50 text-purple-600" },
];

// Liste des lignes de fonctionnalités pour la matrice des droits
const permissionsMatrix = [
  { feature: "Tableau de bord", icon: LayoutDashboard, admin: "accès", reception: "accès", menage: "aucun", direction: "accès" },
  { feature: "Réservations", icon: Calendar, admin: "accès", reception: "accès", menage: "aucun", direction: "lecture" },
  { feature: "Chambres", icon: BedDouble, admin: "accès", reception: "accès", menage: "accès", direction: "lecture" },
  { feature: "Clients", icon: Users, admin: "accès", reception: "accès", menage: "aucun", direction: "lecture" },
  { feature: "Facturation", icon: FileText, admin: "accès", reception: "accès", menage: "aucun", direction: "lecture" },
  { feature: "Paiements", icon: CreditCard, admin: "accès", reception: "accès", menage: "aucun", direction: "lecture" },
  { feature: "Rapports", icon: BarChart3, admin: "accès", reception: "lecture", menage: "aucun", direction: "accès" },
  { feature: "Notifications", icon: Bell, admin: "accès", reception: "accès", menage: "accès", direction: "accès" },
  { feature: "Paramètres", icon: Settings, admin: "accès", reception: "aucun", menage: "aucun", direction: "accès" },
  { feature: "Droits & Rôles", icon: ShieldAlert, admin: "accès", reception: "aucun", menage: "aucun", direction: "aucun" },
];

export default function DroitsRolesPage() {
  
  // Fonction utilitaire pour générer le badge textuel/visuel de la matrice
  const renderStatus = (status: string) => {
    if (status === "accès") {
      return (
        <div className="flex items-center gap-1.5 text-emerald-600 font-bold justify-start">
          <CheckCircle2 className="h-3.5 w-3.5 shrink-0" /> <span>Accès</span>
        </div>
      );
    }
    if (status === "lecture") {
      return (
        <div className="flex items-center gap-1.5 text-amber-500 font-bold justify-start">
          <Eye className="h-3.5 w-3.5 shrink-0" /> <span>Lecture seule</span>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-1.5 text-rose-500 font-bold justify-start">
        <XCircle className="h-3.5 w-3.5 shrink-0" /> <span>Aucun accès</span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      
      {/* --- EN-TÊTE --- */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-slate-800 stroke-[2]" />
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Gestion des Droits & Rôles</h1>
          </div>
          <p className="text-[11px] text-slate-400">Définissez les rôles et gérez les permissions d'accès au système</p>
          <p className="text-[10px] text-slate-400 font-medium pt-1">Accueil  /  Droits & Rôles</p>
        </div>

        <button className="flex items-center gap-1.5 bg-[#0B45D2] hover:bg-[#093bb5] text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-3xs transition-colors self-start sm:self-auto">
          <Plus className="h-4 w-4 stroke-[2.5]" /> Ajouter un rôle
        </button>
      </div>

      {/* --- ONGLETS (ROLES / UTILISATEURS) --- */}
      <div className="border-b border-slate-200 flex items-center gap-6 text-xs font-bold pl-1">
        <button className="text-[#0B45D2] border-b-2 border-[#0B45D2] pb-2 px-1">Rôles</button>
        <button className="text-slate-400 hover:text-slate-600 pb-2 px-1 transition-colors">Utilisateurs</button>
      </div>

      {/* --- GRID DE CARTES COMPACTES --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {roleCards.map((role) => (
          <div key={role.id} className="bg-white border border-slate-200 rounded-xl p-4 shadow-3xs flex items-start gap-3.5 hover:border-slate-300 transition-colors cursor-pointer">
            <div className={`p-2.5 rounded-xl ${role.bgIcon} shrink-0 mt-0.5`}>
              <UserCheck className="h-4 w-4 stroke-[2]" />
            </div>
            <div className="space-y-1">
              <div className="flex items-baseline gap-2">
                <h3 className="text-xs font-black text-slate-900">{role.name}</h3>
                <span className="text-sm font-black text-slate-900">{role.count}</span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium leading-relaxed">{role.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* --- SPLIT CENTRAL MATRIX & SIDEBAR --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* BLOC DE GAUCHE : MATRICE PERMISSIONS (8 COLONNES) */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-100">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Permissions par rôle</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-semibold text-slate-600">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] text-slate-400 uppercase font-black bg-slate-50/40">
                  <th className="p-4">Fonctionnalité</th>
                  <th className="p-4">Administrateur</th>
                  <th className="p-4">Réceptionniste</th>
                  <th className="p-4">Personnel de ménage</th>
                  <th className="p-4">Direction</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {permissionsMatrix.map((item, idx) => {
                  const FeatIcon = item.icon;
                  return (
                    <tr key={idx} className="hover:bg-slate-50/20 transition-colors">
                      {/* Titre et icône de la fonctionnalité */}
                      <td className="p-4">
                        <div className="flex items-center gap-2.5 text-slate-800">
                          <FeatIcon className="h-4 w-4 text-slate-400 stroke-[2]" />
                          <span className="font-bold">{item.feature}</span>
                        </div>
                      </td>
                      {/* Statuts pour chaque rôle */}
                      <td className="p-4">{renderStatus(item.admin)}</td>
                      <td className="p-4">{renderStatus(item.reception)}</td>
                      <td className="p-4">{renderStatus(item.menage)}</td>
                      <td className="p-4">{renderStatus(item.direction)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* BLOC DE DROITE : DETAILS DU RÔLE SÉLECTIONNÉ (4 COLONNES) */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-4 shadow-3xs space-y-5">
          <div>
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider mb-3">Détails du rôle</h3>
            
            {/* Profil global du rôle */}
            <div className="flex items-center gap-3 bg-slate-50/50 border border-slate-100 p-3 rounded-xl">
              <div className="h-9 w-9 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-3xs">
                <Shield className="h-4 w-4" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-slate-900 font-black text-xs">Administrateur</h4>
                  <span className="bg-blue-50 text-[#0B45D2] text-[8px] font-black uppercase px-1.5 py-0.2 rounded border border-blue-100">
                    Rôle système
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-medium leading-tight">Accès complet à toutes les fonctionnalités du système</p>
              </div>
            </div>
          </div>

          {/* Section Permissions Incluses */}
          <div className="space-y-2">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Permissions incluses</h4>
            <div className="space-y-1.5 text-[11px] font-bold text-slate-600">
              {[
                "Accès complet à toutes les fonctionnalités",
                "Gestion des utilisateurs et des rôles",
                "Modification des paramètres système",
                "Accès aux rapports et statistiques",
                "Gestion des établissements",
              ].map((perm, index) => (
                <div key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-slate-700 font-medium">{perm}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section Liste Utilisateurs Liés */}
          <div className="space-y-2.5">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Utilisateurs avec ce rôle (2)</h4>
            <div className="space-y-2">
              {[
                { name: "Jean Dupont", email: "jean.dupont@hotelpro.com" },
                { name: "Fatou Diop", email: "fatou.diop@hotelpro.com" },
              ].map((user, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-xl border border-slate-100 bg-slate-50/20 font-semibold text-xs text-slate-600">
                  <div className="flex items-center gap-2.5">
                    <div className="h-7 w-7 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-700 uppercase">
                      {user.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <p className="text-slate-900 font-bold text-[11px] leading-tight">{user.name}</p>
                      <p className="text-[10px] text-slate-400 font-medium">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[9px] font-black text-[#10B981] bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-100">Actif</span>
                    <button className="text-slate-300 hover:text-slate-500 p-0.5"><MoreVertical className="h-3.5 w-3.5" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bouton d'action de modification */}
          <div className="pt-2">
            <button className="w-full flex items-center justify-center gap-1.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-2 rounded-lg text-xs shadow-3xs transition-colors">
              <Pencil className="h-3.5 w-3.5 text-slate-400" /> Modifier les permissions
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}

