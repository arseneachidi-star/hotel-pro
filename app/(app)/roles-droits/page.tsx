"use client";

import React, { useState, useMemo } from "react";
import { 
  Shield, 
  Plus, 
  CheckCircle2, 
  XCircle, 
  Eye, 
  UserCheck, 
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
  ShieldAlert,
  X,
  UserX,
  Trash2,
  Check,
  Save,
  Menu
} from "lucide-react";

// --- INTERFACES DES TYPES ---
interface Role {
  id: string;
  name: string;
  count: number;
  desc: string;
  bgIcon: string;
  isSystem?: boolean;
}

interface PermissionRow {
  feature: string;
  icon: React.ComponentType<{ className?: string }>;
  key: string;
  admin: "accès" | "lecture" | "aucun";
  reception: "accès" | "lecture" | "aucun";
  menage: "accès" | "lecture" | "aucun";
  direction: "accès" | "lecture" | "aucun";
  [key: string]: any; // Pour supporter les rôles dynamiques créés
}

interface User {
  id: string;
  name: string;
  email: string;
  roleId: string;
  status: "Actif" | "Inactif";
}

export default function DroitsRolesPage() {
  // --- ÉTATS ---
  const [activeTab, setActiveTab] = useState<"roles" | "utilisateurs">("roles");
  const [selectedRoleId, setSelectedRoleId] = useState<string>("admin");
  const [toast, setToast] = useState<string | null>(null);
  
  // Modales
  const [showAddRoleModal, setShowAddRoleModal] = useState<boolean>(false);
  const [showEditPermsModal, setShowEditPermsModal] = useState<boolean>(false);
  const [activeUserMenuId, setActiveUserMenuId] = useState<string | null>(null);

  // Formulaires
  const [newRoleName, setNewRoleName] = useState("");
  const [newRoleDesc, setNewRoleDesc] = useState("");

  // --- DONNÉES DYNAMIQUES (ÉTAT LOCAL) ---
  const [roles, setRoles] = useState<Role[]>([
    { id: "admin", name: "Administrateur", count: 2, desc: "Accès complet à toutes les fonctionnalités", bgIcon: "bg-blue-50 text-blue-600", isSystem: true },
    { id: "reception", name: "Réceptionniste", count: 2, desc: "Gestion des réservations, clients et facturation", bgIcon: "bg-emerald-50 text-emerald-600", isSystem: true },
    { id: "menage", name: "Personnel de ménage", count: 1, desc: "Gestion du nettoyage et des chambres", bgIcon: "bg-amber-50 text-amber-600", isSystem: true },
    { id: "direction", name: "Direction", count: 1, desc: "Accès aux rapports et statistiques", bgIcon: "bg-purple-50 text-purple-600", isSystem: true },
  ]);

  const [permissionsMatrix, setPermissionsMatrix] = useState<PermissionRow[]>([
    { feature: "Tableau de bord", icon: LayoutDashboard, key: "dashboard", admin: "accès", reception: "accès", menage: "aucun", direction: "accès" },
    { feature: "Réservations", icon: Calendar, key: "reservations", admin: "accès", reception: "accès", menage: "aucun", direction: "lecture" },
    { feature: "Chambres", icon: BedDouble, key: "chambres", admin: "accès", reception: "accès", menage: "accès", direction: "lecture" },
    { feature: "Clients", icon: Users, key: "clients", admin: "accès", reception: "accès", menage: "aucun", direction: "lecture" },
    { feature: "Facturation", icon: FileText, key: "facturation", admin: "accès", reception: "accès", menage: "aucun", direction: "lecture" },
    { feature: "Paiements", icon: CreditCard, key: "paiements", admin: "accès", reception: "accès", menage: "aucun", direction: "lecture" },
    { feature: "Rapports", icon: BarChart3, key: "rapports", admin: "accès", reception: "lecture", menage: "aucun", direction: "accès" },
    { feature: "Notifications", icon: Bell, key: "notifications", admin: "accès", reception: "accès", menage: "accès", direction: "accès" },
    { feature: "Paramètres", icon: Settings, key: "parametres", admin: "accès", reception: "aucun", menage: "aucun", direction: "accès" },
    { feature: "Droits & Rôles", icon: ShieldAlert, key: "droits", admin: "accès", reception: "aucun", menage: "aucun", direction: "aucun" },
  ]);

  const [users, setUsers] = useState<User[]>([
    { id: "u-1", name: "Jean Dupont", email: "jean.dupont@hotelpro.com", roleId: "admin", status: "Actif" },
    { id: "u-2", name: "Fatou Diop", email: "fatou.diop@hotelpro.com", roleId: "admin", status: "Actif" },
    { id: "u-3", name: "Marie Martin", email: "marie.martin@hotelpro.com", roleId: "reception", status: "Actif" },
    { id: "u-4", name: "Lucas Bernard", email: "lucas.bernard@hotelpro.com", roleId: "reception", status: "Inactif" },
    { id: "u-5", name: "Pierre Dubois", email: "pierre.dubois@hotelpro.com", roleId: "menage", status: "Actif" },
    { id: "u-6", name: "Sophie Leroy", email: "sophie.leroy@hotelpro.com", roleId: "direction", status: "Actif" },
  ]);

  // --- COMPATIBILITÉ ET SÉLECTIONS ---
  const currentSelectedRole = useMemo(() => {
    return roles.find(r => r.id === selectedRoleId) || roles[0];
  }, [roles, selectedRoleId]);

  const filteredUsersByRole = useMemo(() => {
    return users.filter(u => u.roleId === selectedRoleId);
  }, [users, selectedRoleId]);

  const permissionsInclusesList = useMemo(() => {
    return permissionsMatrix
      .filter(row => row[selectedRoleId] === "accès" || row[selectedRoleId] === "lecture")
      .map(row => `${row.feature} (${row[selectedRoleId] === "accès" ? "Accès complet" : "Lecture seule"})`);
  }, [permissionsMatrix, selectedRoleId]);

  // --- ACTIONS THERMOMÈTRE TOAST ---
  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  // Ajouter un nouveau rôle
  const handleAddRole = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoleName.trim()) return;

    const newId = newRoleName.toLowerCase().replace(/\s+/g, "-");
    
    // 1. Ajouter le rôle
    const newRole: Role = {
      id: newId,
      name: newRoleName,
      count: 0,
      desc: newRoleDesc || "Aucune description fournie",
      bgIcon: "bg-slate-50 text-slate-600"
    };

    // 2. Mettre à jour la matrice (Donner "aucun" par défaut à toutes les fonctions)
    setPermissionsMatrix(prev => prev.map(row => ({ ...row, [newId]: "aucun" })));
    setRoles(prev => [...prev, newRole]);
    setSelectedRoleId(newId);
    setShowAddRoleModal(false);
    setNewRoleName("");
    setNewRoleDesc("");
    triggerToast(`Le rôle "${newRoleName}" a été créé avec succès.`);
  };

  // Modifier les droits en direct
  const handleUpdatePermission = (featureKey: string, value: "accès" | "lecture" | "aucun") => {
    setPermissionsMatrix(prev => prev.map(row => {
      if (row.key === featureKey) {
        return { ...row, [selectedRoleId]: value };
      }
      return row;
    }));
  };

  // Changer le statut d'un utilisateur
  const toggleUserStatus = (userId: string) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, status: u.status === "Actif" ? "Inactif" : "Actif" } : u));
    setActiveUserMenuId(null);
    triggerToast("Le statut de l'utilisateur a été modifié.");
  };

  // Supprimer un utilisateur du rôle
  const handleDeleteUser = (userId: string) => {
    const userToDelete = users.find(u => u.id === userId);
    setUsers(prev => prev.filter(u => u.id !== userId));
    
    // Mettre à jour le compteur du rôle
    if (userToDelete) {
      setRoles(prev => prev.map(r => r.id === userToDelete.roleId ? { ...r, count: Math.max(0, r.count - 1) } : r));
    }
    setActiveUserMenuId(null);
    triggerToast("Utilisateur dissocié avec succès.");
  };

  // Rendu graphique des badges de droits
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
    <div className="space-y-6 relative font-sans text-slate-600">
      
      {/* --- TOAST NOTIFICATION --- */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2.5 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-lg border border-slate-800 transition-all">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>{toast}</span>
        </div>
      )}

      {/* --- MODALE : AJOUTER UN RÔLE --- */}
      {showAddRoleModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-slate-200 w-full max-w-md shadow-2xl overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-[#0B45D2]" />
                <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">Créer un nouveau rôle</h3>
              </div>
              <button type="button" onClick={() => setShowAddRoleModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="h-4 w-4" />
              </button>
            </div>
            <form onSubmit={handleAddRole} className="p-4 space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Nom du rôle</label>
                <input
                  type="text"
                  required
                  value={newRoleName}
                  onChange={(e) => setNewRoleName(e.target.value)}
                  placeholder="Ex: Superviseur, Comptable..."
                  className="w-full border border-slate-200 rounded-lg p-2.5 text-xs font-medium text-slate-800 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Description des accès</label>
                <textarea
                  rows={3}
                  value={newRoleDesc}
                  onChange={(e) => setNewRoleDesc(e.target.value)}
                  placeholder="Description succincte des responsabilités..."
                  className="w-full border border-slate-200 rounded-lg p-2.5 text-xs font-medium text-slate-800 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button type="button" onClick={() => setShowAddRoleModal(false)} className="px-3 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg text-xs font-bold transition-colors">
                  Annuler
                </button>
                <button type="submit" className="flex items-center gap-1.5 bg-[#0B45D2] hover:bg-[#093bb5] text-white px-4 py-1.5 rounded-lg text-xs font-bold shadow-xs transition-colors">
                  Créer le rôle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODALE : MODIFICATION COMPLÈTE DES PERMISSIONS --- */}
      {showEditPermsModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-slate-200 w-full max-w-lg shadow-2xl overflow-hidden max-h-[85vh] flex flex-col">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div>
                <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">
                  Ajuster les permissions : {currentSelectedRole.name}
                </h3>
                <p className="text-[10px] text-slate-400 font-medium">Modifications appliquées en temps réel</p>
              </div>
              <button type="button" onClick={() => setShowEditPermsModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="h-4 w-4" />
              </button>
            </div>
            
            <div className="p-4 overflow-y-auto space-y-3.5 flex-1 divide-y divide-slate-100">
              {permissionsMatrix.map((row) => (
                <div key={row.key} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-3 first:pt-0 first:border-0 font-semibold text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <row.icon className="h-4 w-4 text-slate-400" />
                    <span>{row.feature}</span>
                  </div>
                  <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg">
                    {(["accès", "lecture", "aucun"] as const).map((mode) => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => handleUpdatePermission(row.key, mode)}
                        className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase transition-all capitalize ${
                          row[selectedRoleId] === mode 
                            ? "bg-white text-slate-900 shadow-xs" 
                            : "text-slate-400 hover:text-slate-600"
                        }`}
                      >
                        {mode === "accès" ? "Total" : mode === "lecture" ? "Lecture" : "Bloqué"}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end">
              <button type="button" onClick={() => { setShowEditPermsModal(false); triggerToast("Permissions sauvegardées."); }} className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors">
                <Check className="h-3.5 w-3.5" /> Confirmer & Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- EN-TÊTE --- */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-slate-800 stroke-[2]" />
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Gestion des Droits & Rôles</h1>
          </div>
          <p className="text-[11px] text-slate-400">Définissez les rôles et gérez les permissions d'accès au système</p>
          <p className="text-[10px] text-slate-400 font-medium pt-1">HôtelPro &nbsp;/&nbsp; Droits & Rôles</p>
        </div>

        <button type="button" onClick={() => setShowAddRoleModal(true)} className="flex items-center gap-1.5 bg-[#0B45D2] hover:bg-[#093bb5] text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-xs transition-colors self-start sm:self-auto cursor-pointer">
          <Plus className="h-4 w-4 stroke-[2.5]" /> Ajouter un rôle
        </button>
      </div>

      {/* --- ONGLETS INTERACTIFS --- */}
      <div className="border-b border-slate-200 flex items-center gap-6 text-xs font-bold pl-1---">
        <button 
          type="button" 
          onClick={() => setActiveTab("roles")} 
          className={`pb-2 px-1 transition-all ${activeTab === "roles" ? "text-[#0B45D2] border-b-2 border-[#0B45D2]" : "text-slate-400 hover:text-slate-600"}`}
        >
          Rôles ({roles.length})
        </button>
        <button 
          type="button" 
          onClick={() => setActiveTab("utilisateurs")} 
          className={`pb-2 px-1 transition-all ${activeTab === "utilisateurs" ? "text-[#0B45D2] border-b-2 border-[#0B45D2]" : "text-slate-400 hover:text-slate-600"}`}
        >
          Tous les utilisateurs ({users.length})
        </button>
      </div>

      {activeTab === "roles" ? (
        <>
          {/* --- GRID DE CARTES DE SÉLECTION --- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {roles.map((role) => {
              const isSelected = role.id === selectedRoleId;
              return (
                <div 
                  key={role.id} 
                  onClick={() => setSelectedRoleId(role.id)}
                  className={`bg-white border rounded-xl p-4 shadow-xs flex items-start gap-3.5 transition-all cursor-pointer relative ${
                    isSelected ? "border-blue-500 ring-2 ring-blue-500/15" : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className={`p-2.5 rounded-xl ${role.bgIcon} shrink-0 mt-0.5`}>
                    <UserCheck className="h-4 w-4 stroke-[2]" />
                  </div>
                  <div className="space-y-1 pr-4">
                    <div className="flex items-baseline gap-2">
                      <h3 className="text-xs font-black text-slate-900">{role.name}</h3>
                      <span className="text-sm font-black text-slate-900">{role.count}</span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-medium leading-relaxed">{role.desc}</p>
                  </div>
                  {isSelected && (
                    <span className="absolute top-3 right-3 h-2 w-2 rounded-full bg-[#0B45D2]" />
                  )}
                </div>
              );
            })}
          </div>

          {/* --- SPLIT CENTRAL MATRIX & SIDEBAR --- */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* MATRICE PERMISSIONS */}
            <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
              <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/20">
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">
                  Matrice des Droits • Focus sur <span className="text-[#0B45D2] underline underline-offset-4">{currentSelectedRole.name}</span>
                </h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs font-semibold text-slate-600">
                  <thead>
                    <tr className="border-b border-slate-100 text-[10px] text-slate-400 uppercase font-black bg-slate-50/40">
                      <th className="p-4">Fonctionnalité</th>
                      {roles.map(r => (
                        <th 
                          key={r.id} 
                          className={`p-4 transition-all text-center ${r.id === selectedRoleId ? "bg-blue-50/50 text-[#0B45D2] font-black" : ""}`}
                        >
                          {r.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {permissionsMatrix.map((item, idx) => {
                      const FeatIcon = item.icon;
                      return (
                        <tr key={idx} className="hover:bg-slate-50/20 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-2.5 text-slate-800">
                              <FeatIcon className="h-4 w-4 text-slate-400 stroke-[2]" />
                              <span className="font-bold">{item.feature}</span>
                            </div>
                          </td>
                          {roles.map(r => (
                            <td 
                              key={r.id} 
                              className={`p-4 transition-all text-center ${r.id === selectedRoleId ? "bg-blue-50/20 font-bold" : ""}`}
                            >
                              <div className="flex justify-center">
                                {renderStatus(item[r.id] || "aucun")}
                              </div>
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* DETAILS DU RÔLE SÉLECTIONNÉ */}
            <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-5">
              <div>
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider mb-3">Détails du rôle</h3>
                
                <div className="flex items-center gap-3 bg-slate-50/50 border border-slate-100 p-3 rounded-xl">
                  <div className="h-9 w-9 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xs">
                    <Shield className="h-4 w-4" />
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-slate-900 font-black text-xs">{currentSelectedRole.name}</h4>
                      <span className={`text-[8px] font-black uppercase px-1.5 py-0.2 rounded border ${
                        currentSelectedRole.isSystem 
                          ? "bg-blue-50 text-[#0B45D2] border-blue-100" 
                          : "bg-amber-50 text-amber-600 border-amber-100"
                      }`}>
                        {currentSelectedRole.isSystem ? "Système" : "Custom"}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-medium leading-tight">{currentSelectedRole.desc}</p>
                  </div>
                </div>
              </div>

              {/* Permissions Incluses */}
              <div className="space-y-2">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Permissions incluses ({permissionsInclusesList.length})</h4>
                <div className="space-y-1.5 text-[11px] font-medium text-slate-600 max-h-48 overflow-y-auto pr-1">
                  {permissionsInclusesList.length > 0 ? (
                    permissionsInclusesList.map((perm, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-slate-700">{perm}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-[10px] italic text-slate-400">Aucun privilège accordé à ce rôle pour l'instant.</p>
                  )}
                </div>
              </div>

              {/* Utilisateurs Liés */}
              <div className="space-y-2.5">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Utilisateurs affectés ({filteredUsersByRole.length})</h4>
                <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                  {filteredUsersByRole.length > 0 ? (
                    filteredUsersByRole.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-2 rounded-xl border border-slate-100 bg-slate-50/20 font-semibold text-xs text-slate-600 relative">
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
                          <button 
                            type="button"
                            onClick={() => toggleUserStatus(user.id)}
                            className={`text-[9px] font-black px-1.5 py-0.2 rounded border cursor-pointer transition-colors ${
                              user.status === "Actif" 
                                ? "bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-100" 
                                : "bg-rose-50 text-rose-600 border-rose-100 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-100"
                            }`}
                            title="Cliquer pour intervertir le statut"
                          >
                            {user.status}
                          </button>
                          
                          <div className="relative">
                            <button 
                              type="button" 
                              onClick={() => setActiveUserMenuId(activeUserMenuId === user.id ? null : user.id)}
                              className="text-slate-300 hover:text-slate-500 p-0.5"
                            >
                              <MoreVertical className="h-3.5 w-3.5" />
                            </button>
                            
                            {/* Petit menu contextuel d'action */}
                            {activeUserMenuId === user.id && (
                              <div className="absolute right-0 top-6 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-30 w-32 font-bold text-[11px]">
                                <button type="button" onClick={() => toggleUserStatus(user.id)} className="w-full text-left px-2.5 py-1.5 hover:bg-slate-50 text-slate-700 flex items-center gap-1.5">
                                  <UserX className="h-3 w-3 text-slate-400" /> Désactiver
                                </button>
                                <button type="button" onClick={() => handleDeleteUser(user.id)} className="w-full text-left px-2.5 py-1.5 hover:bg-rose-50 text-rose-600 flex items-center gap-1.5 border-t border-slate-100">
                                  <Trash2 className="h-3 w-3" /> Dissocier rattaché
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-[10px] italic text-slate-400 py-1">Aucun utilisateur n'est actuellement rattaché à ce rôle.</p>
                  )}
                </div>
              </div>

              {/* Action globale */}
              <div className="pt-2">
                <button 
                  type="button" 
                  onClick={() => setShowEditPermsModal(true)}
                  className="w-full flex items-center justify-center gap-1.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-2 rounded-lg text-xs shadow-xs transition-colors cursor-pointer"
                >
                  <Pencil className="h-3.5 w-3.5 text-slate-400" /> Modifier les permissions
                </button>
              </div>

            </div>

          </div>
        </>
      ) : (
        /* --- AFFICHAGE DE TOUS LES UTILISATEURS (ONGLET COMPLÈTEMENT INTERACTIF) --- */
        <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50/20">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Liste globale du personnel</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-semibold text-slate-600">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] text-slate-400 uppercase font-black bg-slate-50/40">
                  <th className="p-4">Utilisateur</th>
                  <th className="p-4">Adresse email</th>
                  <th className="p-4">Rôle affecté</th>
                  <th className="p-4">Statut de connexion</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((u) => {
                  const roleObj = roles.find(r => r.id === u.roleId);
                  return (
                    <tr key={u.id} className="hover:bg-slate-50/20 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-2.5 font-bold text-slate-900">
                          <div className="h-7 w-7 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-600 uppercase">
                            {u.name.split(" ").map(n => n[0]).join("")}
                          </div>
                          <span>{u.name}</span>
                        </div>
                      </td>
                      <td className="p-4 font-medium text-slate-500">{u.email}</td>
                      <td className="p-4">
                        <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-bold text-[11px]">
                          {roleObj ? roleObj.name : u.roleId}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-black border ${
                          u.status === "Actif" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-rose-50 text-rose-600 border-rose-100"
                        }`}>
                          {u.status}
                        </span>
                      </td>
                      <td className="p-4 text-right relative">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            type="button" 
                            onClick={() => toggleUserStatus(u.id)}
                            className="text-[11px] text-slate-400 hover:text-slate-900 px-2 py-1 rounded border border-slate-200 transition-colors bg-white font-bold"
                          >
                            Inverser Statut
                          </button>
                          <button 
                            type="button" 
                            onClick={() => handleDeleteUser(u.id)}
                            className="text-rose-500 hover:text-rose-700 p-1"
                            title="Retirer l'utilisateur"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}