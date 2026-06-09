"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  CalendarDays, 
  BedDouble, 
  Users, 
  FileText, 
  CreditCard, 
  BarChart3, 
  Star, 
  ShieldCheck, 
  Bell, 
  Settings, 
  Building2, 
  LogOut 
} from "lucide-react";

// Liste des onglets calquée sur vos maquettes
const menuItems = [
  { icon: LayoutDashboard, label: "Tableau de bord", href: "/dashboard" },
  { icon: CalendarDays, label: "Réservations", href: "/reservations" },
  { icon: BedDouble, label: "Chambres", href: "/chambres" },
  { icon: Users, label: "Clients", href: "/clients" },
  { icon: LogOut,label: "Check-in/Check-out", href: "check-in-out"},
  { icon: FileText, label: "Facturation", href: "/facturation" },
  { icon: CreditCard, label: "Paiements", href: "/facturation" }, // Redirige vers le même module
  { icon: BarChart3, label: "Rapports", href: "/dashboard" },     // Intégré au dashboard/reporting
  { icon: Star, label: "Avis clients", href: "/avis-admin" },
  { icon: ShieldCheck, label: "Droits & Rôles", href: "/roles-droits" },
  { icon: Bell, label: "Notifications & Alertes", href: "/notifications" },
  { icon: Building2, label: "Établissements", href: "/etablissements" },
  { icon: Settings, label: "Paramètres", href: "/parametres" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#0B45D2] text-white flex flex-col h-screen fixed left-0 top-0 z-40 shadow-xl">
      {/* Logo / Header de la Sidebar */}
      <div className="p-6 border-b border-blue-500/30">
        <div className="flex items-center gap-3">
          <Building2 className="h-8 w-8 text-white" />
          <div>
            <h1 className="font-bold text-xl tracking-wide">HotelPro</h1>
            <p className="text-xs text-blue-200/80 font-light">Gérez votre hôtel en toute simplicité</p>
          </div>
        </div>
      </div>

      {/* Navigation Principale (Scrollable si l'écran est petit) */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
        {menuItems.map((item, index) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={index}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-white text-[#0B45D2] shadow-md font-semibold scale-[1.02]"
                  : "text-blue-100 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? "text-[#0B45D2]" : "text-blue-200"}`} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bas de la Sidebar : Sélecteur d'établissement & Déconnexion */}
      <div className="p-4 border-t border-blue-500/30 bg-[#093BC2] space-y-3">
        {/* Widget Hôtel Actif (Aperçu en bas à gauche de vos maquettes) */}
        <div className="flex items-center gap-3 p-2 bg-white/5 rounded-xl border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
          <div className="h-9 w-9 bg-slate-200 rounded-lg overflow-hidden flex items-center justify-center text-blue-900 font-bold text-xs">
            H
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold truncate">Hôtel Amazone</p>
            <p className="text-[10px] text-blue-200 truncate">Centre, Cotonou</p>
          </div>
          <span className="text-xs text-blue-300">▼</span>
        </div>

        {/* Bouton Déconnexion */}
        <Link 
          href="/auth/login" 
          className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-blue-200 hover:text-white hover:bg-red-500/20 rounded-xl transition-all"
        >
          <LogOut className="h-5 w-5 text-blue-300" />
          Déconnexion
        </Link>
      </div>
    </aside>
  );
}

