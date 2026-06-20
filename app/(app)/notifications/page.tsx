"use client";

import React, { useState, useMemo } from "react";
import { 
  Bell, 
  Calendar, 
  CreditCard, 
  AlertTriangle, 
  Wrench, 
  UserCheck, 
  Star, 
  Info, 
  Check, 
  SlidersHorizontal, 
  MoreVertical,
  ChevronRight,
  Mail,
  MessageSquare,
  ShieldCheck,
  Settings,
  History,
  X,
  Trash2,
  CheckCircle2,
  Eye,
  Sliders
} from "lucide-react";

// --- INTERFACES DES TYPES ---
interface NotificationItem {
  id: number;
  title: string;
  desc: string;
  subDesc: string;
  time: string;
  unread: boolean;
  type: "important" | "attente" | "systeme" | "normal";
  icon: React.ComponentType<{ className?: string }>;
  iconClass: string;
}

interface ChannelSetting {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  active: boolean;
}

// --- DONNÉES INITIALES ---
const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  { id: 1, title: "Nouvelle réservation", desc: "Une nouvelle réservation #RES-2024-1458 a été créée par Jean Dupont", subDesc: "Chambre 101 - 15/05/2024 au 18/05/2024", time: "Il y a 5 min", unread: true, type: "normal", icon: Calendar, iconClass: "bg-emerald-500 text-white" },
  { id: 2, title: "Paiement en attente", desc: "Le paiement de la facture #FAC-2024-1456 est en attente depuis 2 jours", subDesc: "Client : Paul Bernard - Montant : 75 000 XOF", time: "Il y a 1 heure", unread: true, type: "attente", icon: CreditCard, iconClass: "bg-amber-500 text-white" },
  { id: 3, title: "Chambre en maintenance", desc: "La chambre 203 est en maintenance depuis 1 jour", subDesc: "Type : Deluxe - Signalé par : Service technique", time: "Il y a 2 heures", unread: true, type: "important", icon: AlertTriangle, iconClass: "bg-rose-500 text-white" },
  { id: 4, title: "Chambre à nettoyer", desc: "La chambre 105 doit être nettoyée", subDesc: "Départ : Marie Martin - Départ prévu : 11/05/2024", time: "Il y a 3 heures", unread: true, type: "attente", icon: Wrench, iconClass: "bg-amber-500 text-white" },
  { id: 5, title: "Check-in effectué", desc: "Le client Sophie Leroy a effectué son check-in", subDesc: "Chambre 102 - 20/05/2024", time: "Il y a 4 heures", unread: false, type: "normal", icon: UserCheck, iconClass: "bg-blue-600 text-white" },
  { id: 6, title: "Nouvel avis client", desc: "Un nouveau commentaire a été laissé par Lucas Moreau", subDesc: "★★★★★ 4.5/5 - Hôtel Paradise", time: "Il y a 1 jour", unread: true, type: "important", icon: Star, iconClass: "bg-purple-500 text-white" },
  { id: 7, title: "Mise à jour système", desc: "Le système a été mis à jour avec succès vers la version 2.1.0", subDesc: "Nouvelles fonctionnalités et améliorations", time: "Il y a 1 jour", unread: false, type: "systeme", icon: Info, iconClass: "bg-blue-400 text-white" },
];

export default function NotificationsPage() {
  // --- ÉTATS ---
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [activeFilter, setActiveFilter] = useState<"toutes" | "non-lues" | "importantes" | "systeme">("toutes");
  const [activeMenuId, setActiveMenuId] = useState<number | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  
  // États de configuration (Modales)
  const [showPreferencesModal, setShowPreferencesModal] = useState(false);
  const [showRulesModal, setShowRulesModal] = useState(false);
  
  // Canaux réactifs
  const [channels, setChannels] = useState<ChannelSetting[]>([
    { id: "email", label: "Email", icon: Mail, active: true },
    { id: "sms", label: "SMS", icon: MessageSquare, active: true },
    { id: "push", label: "Notifications push", icon: Bell, active: false },
  ]);

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  // --- TRAITEMENT ET COMPTEURS COMPARES ---
  const counts = useMemo(() => {
    return {
      toutes: notifications.length,
      nonLues: notifications.filter(n => n.unread).length,
      importantes: notifications.filter(n => n.type === "important" || n.type === "attente").length,
      systeme: notifications.filter(n => n.type === "systeme").length,
    };
  }, [notifications]);

  const filteredNotifications = useMemo(() => {
    switch (activeFilter) {
      case "non-lues": return notifications.filter(n => n.unread);
      case "importantes": return notifications.filter(n => n.type === "important" || n.type === "attente");
      case "systeme": return notifications.filter(n => n.type === "systeme");
      default: return notifications;
    }
  }, [notifications, activeFilter]);

  // --- ACTIONS SYSTEME ---
  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
    triggerToast("Toutes les notifications ont été marquées comme lues.");
  };

  const toggleReadStatus = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: !n.unread } : n));
    setActiveMenuId(null);
  };

  const handleDeleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    setActiveMenuId(null);
    triggerToast("Notification supprimée.");
  };

  const toggleChannel = (id: string) => {
    setChannels(prev => prev.map(c => c.id === id ? { ...c, active: !c.active } : c));
    const target = channels.find(c => c.id === id);
    triggerToast(`Canal ${target?.label} ${!target?.active ? "activé" : "désactivé"}.`);
  };

  return (
    <div className="space-y-6 relative font-sans text-slate-600">
      
      {/* --- NOTIFICATION TOAST --- */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2.5 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-lg border border-slate-800 transition-all">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>{toast}</span>
        </div>
      )}

      {/* --- MODALE DYNAMIQUE 1 : PREFERENCES --- */}
      {showPreferencesModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-slate-200 w-full max-w-md shadow-2xl overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2 font-black text-slate-800 text-xs uppercase tracking-wider">
                <Settings className="h-4 w-4 text-[#0B45D2]" />
                <span>Préférences de l'application</span>
              </div>
              <button type="button" onClick={() => setShowPreferencesModal(false)} className="text-slate-400 hover:text-slate-600"><X className="h-4 w-4" /></button>
            </div>
            <div className="p-4 space-y-4 text-xs font-semibold">
              <p className="text-slate-400 font-medium text-[11px]">Configurez le regroupement ou l'effacement automatique des historiques système.</p>
              <div className="flex justify-between items-center py-1">
                <span>Rapports de fin de journée par mail</span>
                <input type="checkbox" defaultChecked className="h-4 w-4 accent-[#0B45D2]" />
              </div>
              <div className="flex justify-between items-center py-1">
                <span>Sonnerie à chaque réservation entrante</span>
                <input type="checkbox" className="h-4 w-4 accent-[#0B45D2]" />
              </div>
            </div>
            <div className="p-3 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button type="button" onClick={() => { setShowPreferencesModal(false); triggerToast("Préférences sauvegardées."); }} className="bg-slate-900 text-white font-bold px-4 py-1.5 rounded-lg text-xs">Fermer</button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODALE DYNAMIQUE 2 : REGLES D'ALERTES --- */}
      {showRulesModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-slate-200 w-full max-w-md shadow-2xl overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2 font-black text-slate-800 text-xs uppercase tracking-wider">
                <ShieldCheck className="h-4 w-4 text-[#EF4444]" />
                <span>Règles de criticité système</span>
              </div>
              <button type="button" onClick={() => setShowRulesModal(false)} className="text-slate-400 hover:text-slate-600"><X className="h-4 w-4" /></button>
            </div>
            <div className="p-4 space-y-3 text-xs font-bold text-slate-600">
              <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-100 text-rose-700 text-[11px]">
                Seuils critiques : Un retard de paiement supérieur à 48 heures bascule automatiquement la facture en priorité "Haute".
              </div>
              <div className="flex justify-between items-center pt-2">
                <span>Notifier la Direction si alerte rouge &gt; 3h</span>
                <input type="checkbox" defaultChecked className="h-4 w-4 accent-rose-600" />
              </div>
            </div>
            <div className="p-3 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button type="button" onClick={() => { setShowRulesModal(false); triggerToast("Règles de sécurité mises à jour."); }} className="bg-slate-900 text-white font-bold px-4 py-1.5 rounded-lg text-xs">Valider</button>
            </div>
          </div>
        </div>
      )}

      {/* --- HEADER --- */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Notifications & Alertes</h1>
          <p className="text-[11px] text-slate-400 mt-0.5">Gérez et suivez toutes les notifications et alertes en temps réel</p>
        </div>

        <button 
          type="button" 
          onClick={handleMarkAllAsRead}
          disabled={counts.nonLues === 0}
          className="flex items-center gap-1.5 bg-[#0B45D2] hover:bg-[#093bb5] text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-xs transition-colors self-start sm:self-auto disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          <Check className="h-4 w-4 stroke-[2.5]" /> Marquer tout comme lu
        </button>
      </div>

      {/* --- MAIN GRID CONTENT --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* BLOC CENTRAL : LISTE DES NOTIFICATIONS */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* BARRE DES FILTRES / ONGLETS INTERACTIFS */}
          <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl p-2 shadow-xs overflow-x-auto whitespace-nowrap scrollbar-none">
            <div className="flex items-center gap-1 font-bold text-xs">
              <button 
                type="button" 
                onClick={() => setActiveFilter("toutes")} 
                className={`px-3.5 py-1.5 rounded-lg transition-all ${activeFilter === "toutes" ? "bg-blue-50 text-[#0B45D2]" : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"}`}
              >
                Toutes ({counts.toutes})
              </button>
              <button 
                type="button" 
                onClick={() => setActiveFilter("non-lues")} 
                className={`px-3.5 py-1.5 rounded-lg transition-all ${activeFilter === "non-lues" ? "bg-blue-50 text-[#0B45D2]" : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"}`}
              >
                Non lues ({counts.nonLues})
              </button>
              <button 
                type="button" 
                onClick={() => setActiveFilter("importantes")} 
                className={`px-3.5 py-1.5 rounded-lg transition-all ${activeFilter === "importantes" ? "bg-blue-50 text-[#0B45D2]" : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"}`}
              >
                Importantes ({counts.importantes})
              </button>
              <button 
                type="button" 
                onClick={() => setActiveFilter("systeme")} 
                className={`px-3.5 py-1.5 rounded-lg transition-all ${activeFilter === "systeme" ? "bg-blue-50 text-[#0B45D2]" : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"}`}
              >
                Système ({counts.systeme})
              </button>
            </div>
            <button type="button" onClick={() => triggerToast(`Filtre par lot actif sur : ${activeFilter}`)} className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 text-slate-700 text-xs font-bold rounded-lg bg-white shadow-xs ml-4 cursor-pointer hover:bg-slate-50 transition-colors">
              <SlidersHorizontal className="h-3.5 w-3.5 text-slate-400" /> Tri
            </button>
          </div>

          {/* LISTE PRINCIPALE FLUIDE */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm divide-y divide-slate-100 overflow-hidden">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.id} className={`p-4 flex items-center justify-between gap-4 font-semibold text-xs text-slate-600 transition-colors ${item.unread ? "bg-slate-50/40 hover:bg-slate-50/80" : "hover:bg-slate-50/20"}`}>
                    <div className="flex items-center gap-4 flex-1">
                      {/* Icône Ronde Colorée */}
                      <div className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 ${item.iconClass}`}>
                        <Icon className="h-4 w-4 stroke-[2.5]" />
                      </div>

                      {/* Textes descriptifs */}
                      <div className="space-y-0.5">
                        <h4 className="text-slate-900 font-black text-xs">{item.title}</h4>
                        <p className="text-slate-600 font-medium text-[11px] leading-relaxed">"{item.desc}"</p>
                        <p className="text-[10px] text-slate-400 font-medium">{item.subDesc}</p>
                      </div>
                    </div>

                    {/* Côté Droit : Temps, Indicateurs et Actions */}
                    <div className="flex items-center gap-4 shrink-0 relative">
                      <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap">{item.time}</span>
                      
                      {/* Point bleu d'état non lu */}
                      <div className="w-2 flex justify-center">
                        {item.unread && (
                          <span className="h-2 w-2 rounded-full bg-[#0B45D2]" />
                        )}
                      </div>

                      <div className="relative">
                        <button 
                          type="button" 
                          onClick={() => setActiveMenuId(activeMenuId === item.id ? null : item.id)}
                          className="text-slate-300 hover:text-slate-500 p-1 cursor-pointer"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </button>

                        {/* Menu contextuel individuel de ligne */}
                        {activeMenuId === item.id && (
                          <div className="absolute right-0 top-7 bg-white border border-slate-200 rounded-lg shadow-xl py-1 z-30 w-36 text-left text-[11px] font-bold">
                            <button 
                              type="button" 
                              onClick={() => toggleReadStatus(item.id)} 
                              className="w-full text-left px-2.5 py-1.5 hover:bg-slate-50 text-slate-700 flex items-center gap-1.5"
                            >
                              <Eye className="h-3 w-3 text-slate-400" />
                              {item.unread ? "Marquer lu" : "Marquer non lu"}
                            </button>
                            <button 
                              type="button" 
                              onClick={() => handleDeleteNotification(item.id)} 
                              className="w-full text-left px-2.5 py-1.5 hover:bg-rose-50 text-rose-600 flex items-center gap-1.5 border-t border-slate-100"
                            >
                              <Trash2 className="h-3 w-3" /> Supprimer
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-8 text-center text-slate-400 font-medium italic">
                Aucune notification ne correspond au filtre sélectionné.
              </div>
            )}
          </div>

          {/* PAGINATION INTERACTIVE */}
          <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl p-3 shadow-xs font-semibold text-[11px] text-slate-400">
            <span>Affichage de 1 à {filteredNotifications.length} sur {filteredNotifications.length} lignes filtrées</span>
            <div className="flex items-center gap-1">
              <button type="button" onClick={() => triggerToast("Défilement vers la page précédente indisponible")} className="h-6 w-6 border border-slate-200 rounded-md bg-white flex items-center justify-center text-slate-400 hover:bg-slate-50 transition-colors">{"<"}</button>
              <button type="button" className="h-6 w-6 rounded-md bg-[#0B45D2] text-white flex items-center justify-center font-bold">1</button>
              <button type="button" onClick={() => triggerToast("Chargement de la page suivante des flux")} className="h-6 w-6 border border-slate-200 rounded-md bg-white text-slate-600 flex items-center justify-center hover:bg-slate-50 transition-colors">2</button>
              <button type="button" onClick={() => triggerToast("Défilement vers la page suivante")} className="h-6 w-6 border border-slate-200 rounded-md bg-white flex items-center justify-center text-slate-400 hover:bg-slate-50 transition-colors">{">"}</button>
            </div>
          </div>

        </div>

        {/* --- LE BLOC DE DROITE : SIDEBAR DE STATUTS & PRÉFÉRENCES --- */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Section 1 : Aperçu des alertes cliquables */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-3">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Aperçu des alertes</h3>
            <div className="space-y-2">
              {[
                { filterKey: "importantes", label: "Importantes", count: counts.importantes, icon: Bell, bg: "bg-rose-50 text-rose-500" },
                { filterKey: "toutes", label: "En attente", count: counts.nonLues, icon: Bell, bg: "bg-amber-50 text-amber-500" },
                { filterKey: "systeme", label: "Système", count: counts.systeme, icon: Info, bg: "bg-blue-50 text-blue-500" },
                { filterKey: "toutes", label: "Total général", count: counts.toutes, icon: Check, bg: "bg-emerald-50 text-emerald-500" },
              ].map((row, idx) => (
                <div 
                  key={idx} 
                  onClick={() => {
                    setActiveFilter(row.filterKey as any);
                    triggerToast(`Filtre synchronisé sur : ${row.label}`);
                  }}
                  className={`flex items-center justify-between p-2 rounded-lg border transition-all cursor-pointer group text-xs font-semibold text-slate-600 ${
                    activeFilter === row.filterKey ? "bg-slate-50 border-slate-200 shadow-2xs" : "border-transparent hover:border-slate-100 hover:bg-slate-50/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded-lg ${row.bg}`}>
                      <row.icon className="h-3.5 w-3.5 stroke-[2.5]" />
                    </div>
                    <span className="text-slate-700 font-bold">{row.label}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-900 font-black">{row.count}</span>
                    <ChevronRight className="h-3.5 w-3.5 text-slate-300 group-hover:text-slate-500 transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2 : Canaux de notification interactifs */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-3">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Canaux de réception</h3>
            <div className="space-y-3 text-xs font-semibold text-slate-600">
              {channels.map((channel) => (
                <div key={channel.id} className="flex items-center justify-between py-0.5">
                  <div className="flex items-center gap-3">
                    <channel.icon className="h-4 w-4 text-slate-400 stroke-[2]" />
                    <span className="text-slate-700 font-medium">{channel.label}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleChannel(channel.id)}
                    className={`text-[9px] font-black px-2 py-0.5 rounded-md border tracking-wide uppercase cursor-pointer transition-all ${
                      channel.active 
                        ? "bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100" 
                        : "bg-slate-50 text-slate-400 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {channel.active ? "Actif" : "Inactif"}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3 : Paramètres rapides raccordés aux modales */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-3">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Paramètres rapides</h3>
            <div className="space-y-1 text-xs font-semibold text-slate-700">
              <div 
                onClick={() => setShowPreferencesModal(true)} 
                className="flex items-center justify-between p-2 hover:bg-slate-50 text-slate-600 rounded-lg cursor-pointer transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <Settings className="h-4 w-4 text-slate-400 group-hover:text-[#0B45D2] transition-colors" />
                  <span>Gérer les préférences</span>
                </div>
                <ChevronRight className="h-3.5 w-3.5 text-slate-300 group-hover:text-slate-400" />
              </div>

              <div 
                onClick={() => setShowRulesModal(true)} 
                className="flex items-center justify-between p-2 hover:bg-slate-50 text-slate-600 rounded-lg cursor-pointer transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-4 w-4 text-slate-400 group-hover:text-rose-600 transition-colors" />
                  <span>Règles d'alertes</span>
                </div>
                <ChevronRight className="h-3.5 w-3.5 text-slate-300 group-hover:text-slate-400" />
              </div>

              <div 
                onClick={() => {
                  setNotifications(INITIAL_NOTIFICATIONS);
                  triggerToast("Flux de notifications restauré à l'état initial.");
                }} 
                className="flex items-center justify-between p-2 hover:bg-slate-50 text-slate-600 rounded-lg cursor-pointer transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <History className="h-4 w-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                  <span>Réinitialiser le flux</span>
                </div>
                <ChevronRight className="h-3.5 w-3.5 text-slate-300 group-hover:text-slate-400" />
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}