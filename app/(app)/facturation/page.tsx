"use client";

import React, { useState } from "react";
import { 
  Plus, 
  Download, 
  Search, 
  SlidersHorizontal, 
  ChevronLeft, 
  ChevronRight, 
  Eye, 
  FileText, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Mail,
  PieChart
} from "lucide-react";

// Données des cartes du haut
const statsCards = [
  { title: "Chiffre d'affaires (mois)", value: "2 450 000 XOF", sub: "+12.5% vs mois dernier", color: "text-blue-600", bg: "bg-blue-50/50", icon: TrendingUp },
  { title: "Factures payées", value: "18", sub: "+8.3% vs mois dernier", color: "text-emerald-600", bg: "bg-emerald-50/50", icon: CheckCircle2 },
  { title: "En attente de paiement", value: "7", sub: "-2.1% vs mois dernier", color: "text-amber-600", bg: "bg-amber-50/50", icon: Clock },
  { title: "Montant en attente", value: "785 000 XOF", sub: "-5.4% vs mois dernier", color: "text-purple-600", bg: "bg-purple-50/50", icon: AlertCircle },
];

// Liste des factures (Tableau de gauche)
const invoicesData = [
  { id: "FAC-2024-1458", client: "Jean Dupont", stay: "10/05/2024 - 15/05/2024", date: "15/05/2024", amount: "135 000 XOF", status: "Payée" },
  { id: "FAC-2024-1457", client: "Marie Martin", stay: "08/05/2024 - 10/05/2024", date: "10/05/2024", amount: "90 000 XOF", status: "En attente" },
  { id: "FAC-2024-1456", client: "Paul Bernard", stay: "05/02/2024 - 07/05/2024", date: "07/05/2024", amount: "75 000 XOF", status: "En retard" },
  { id: "FAC-2024-1455", client: "Sophie Leroy", stay: "01/05/2024 - 03/05/2024", date: "03/05/2024", amount: "120 000 XOF", status: "Payée" },
  { id: "FAC-2024-1454", client: "Lucas Moreau", stay: "28/04/2024 - 01/05/2024", date: "01/05/2024", amount: "60 000 XOF", status: "Payée" },
  { id: "FAC-2024-1453", client: "Claire Dubois", stay: "26/04/2024 - 28/04/2024", date: "28/04/2024", amount: "110 000 XOF", status: "En attente" },
  { id: "FAC-2024-1452", client: "Thomas Petit", stay: "24/04/2024 - 26/04/2024", date: "26/04/2024", amount: "85 000 XOF", status: "En retard" },
  { id: "FAC-2024-1451", client: "Isabelle Richard", stay: "20/04/2024 - 23/04/2024", date: "23/04/2024", amount: "105 000 XOF", status: "Payée" },
];

export default function FacturationPage() {
  const [activeTab, setActiveTab] = useState("Toutes les factures");
  const [selectedInvoice, setSelectedInvoice] = useState("FAC-2024-1458");

  return (
    <div className="space-y-6">
      
      {/* --- EN-TÊTE --- */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Facturation & Paiements</h1>
          <p className="text-xs text-slate-400 mt-0.5">Gérez les factures, paiements et transactions</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-2 shadow-xs transition-colors">
            <Download className="h-4 w-4 text-slate-400" /> Exporter
          </button>
          <button className="bg-[#0B45D2] hover:bg-[#093bb5] text-white text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-2 shadow-xs transition-colors">
            <Plus className="h-4 w-4" /> Nouvelle facture
          </button>
        </div>
      </div>

      {/* --- BLOC DES 4 STATISTIQUES --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div key={idx} className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-[11px] font-semibold text-slate-400 tracking-wide uppercase">{card.title}</p>
                <p className="text-xl font-bold text-slate-900">{card.value}</p>
                <p className="text-[10px] text-slate-400 font-medium">{card.sub}</p>
              </div>
              <div className={`h-10 w-10 rounded-xl ${card.bg} flex items-center justify-center ${card.color}`}>
                <Icon className="h-5 w-5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* --- GRILLE PRINCIPALE SPLIT --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ================= ZONE DE GAUCHE : TABLEAU DES FACTURES ================= */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          {/* Menu Filtres par Onglet & Recherche */}
          <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex gap-4 text-xs font-semibold text-slate-400 border-b sm:border-b-0 border-slate-100 pb-2 sm:pb-0">
              {["Toutes les factures", "Payées", "En attente", "En retard", "Annulées"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2 relative transition-colors ${
                    activeTab === tab ? "text-[#0B45D2] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#0B45D2]" : "hover:text-slate-600"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Rechercher une facture..." 
                  className="w-full pl-9 pr-4 py-1.5 border border-slate-200 rounded-lg text-xs bg-slate-50 focus:outline-hidden focus:border-blue-500"
                />
              </div>
              <button className="p-1.5 border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50">
                <SlidersHorizontal className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Tableau */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50/60 border-b border-slate-100 text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                  <th className="p-3">N° Facture</th>
                  <th className="p-3">Client</th>
                  <th className="p-3">Séjour</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Montant</th>
                  <th className="p-3">Statut</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600 font-medium">
                {invoicesData.map((row) => (
                  <tr 
                    key={row.id} 
                    onClick={() => setSelectedInvoice(row.id)}
                    className={`hover:bg-slate-50/50 cursor-pointer transition-colors ${selectedInvoice === row.id ? "bg-blue-50/30" : ""}`}
                  >
                    <td className="p-3 font-bold text-slate-800">{row.id}</td>
                    <td className="p-3 font-semibold text-slate-900">{row.client}</td>
                    <td className="p-3 text-slate-400">{row.stay}</td>
                    <td className="p-3">{row.date}</td>
                    <td className="p-3 font-bold text-slate-900">{row.amount}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        row.status === "Payée" ? "bg-emerald-50 text-emerald-600" :
                        row.status === "En attente" ? "bg-amber-50 text-amber-600" : "bg-rose-50 text-rose-600"
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center justify-center gap-1">
                        <button className="p-1 border border-slate-100 rounded-md text-slate-400 hover:text-[#0B45D2] hover:bg-blue-50 bg-white shadow-3xs">
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                        <button className="p-1 border border-slate-100 rounded-md text-slate-400 hover:text-[#0B45D2] hover:bg-blue-50 bg-white shadow-3xs">
                          <Download className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Affichage de 1 à 8 sur 18 résultats</span>
            <div className="flex items-center gap-0.5">
              <button className="p-1 border border-slate-200 rounded"><ChevronLeft className="h-3 w-3" /></button>
              <button className="px-2 py-0.5 bg-[#0B45D2] text-white font-bold rounded">1</button>
              <button className="px-2 py-0.5 border border-slate-200 rounded">2</button>
              <button className="px-2 py-0.5 border border-slate-200 rounded">3</button>
              <button className="p-1 border border-slate-200 rounded"><ChevronRight className="h-3 w-3" /></button>
            </div>
          </div>
        </div>

        {/* ================= ZONE DE DROITE : DÉTAILS DE LA FACTURE COMPLÈTE ================= */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl shadow-sm p-4 space-y-4 text-xs">
          <div className="flex items-center justify-between border-b border-slate-50 pb-2">
            <h3 className="font-bold text-slate-800 text-sm">Détails de la facture</h3>
            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded text-[10px] font-bold">Payée</span>
          </div>

          <div>
            <p className="text-[10px] text-slate-400 font-semibold">N° Facture</p>
            <p className="font-bold text-slate-800 text-sm">FAC-2024-1458</p>
          </div>

          <div className="grid grid-cols-2 gap-4 border-b border-slate-50 pb-3">
            <div>
              <p className="text-[10px] text-slate-400 font-semibold">Client</p>
              <p className="font-bold text-slate-800">Jean Dupont</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-semibold">Séjour</p>
              <p className="font-medium text-slate-700">10/05/2024 - 15/05/2024</p>
              <span className="inline-block mt-0.5 text-[9px] font-bold bg-blue-50 text-blue-600 px-1 rounded">5 nuits</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 border-b border-slate-50 pb-3">
            <div>
              <p className="text-[10px] text-slate-400 font-semibold">Date d'émission</p>
              <p className="font-medium text-slate-700">15/05/2024</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-semibold">Date d'échéance</p>
              <p className="font-medium text-slate-700">22/05/2024</p>
            </div>
          </div>

          {/* Ticket de caisse intérieur */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-800 text-[11px] uppercase tracking-wide">Détail des prestations</h4>
            <div className="space-y-1.5 font-medium text-slate-600">
              <div className="flex justify-between"><span>Chambre Standard (5 nuits)</span><span className="font-bold text-slate-800">100 000 XOF</span></div>
              <div className="flex justify-between"><span>Petit déjeuner (2 personnes)</span><span className="font-bold text-slate-800">20 000 XOF</span></div>
              <div className="flex justify-between"><span>Service de blanchisserie</span><span className="font-bold text-slate-800">10 000 XOF</span></div>
              <div className="flex justify-between pb-1.5 border-b border-slate-100"><span>Taxe de séjour</span><span className="font-bold text-slate-800">5 000 XOF</span></div>
              <div className="flex justify-between text-slate-500"><span>Sous-total</span><span>135 000 XOF</span></div>
              <div className="flex justify-between text-slate-500 border-b border-slate-50 pb-1.5"><span>TVA (18%)</span><span>0 XOF</span></div>
              <div className="flex justify-between items-baseline pt-1">
                <span className="font-bold text-slate-800 text-sm">Total</span>
                <span className="text-base font-black text-[#0B45D2]">135 000 XOF</span>
              </div>
            </div>
          </div>

          {/* Mode de paiement */}
          <div className="border-t border-slate-100 pt-3 space-y-1.5 text-[11px]">
            <h4 className="font-bold text-slate-800 uppercase tracking-wide text-[10px]">Informations de paiement</h4>
            <div className="grid grid-cols-2 gap-y-1 text-slate-500 font-medium">
              <span>Méthode de paiement</span><span className="font-semibold text-slate-700 text-right">Carte bancaire (Visa **** 4242)</span>
              <span>Date de paiement</span><span className="font-semibold text-slate-700 text-right">15/05/2024 14:35</span>
              <span>Transaction ID</span><span className="font-mono text-slate-700 text-right">txn_1234567890</span>
            </div>
          </div>

          {/* Actions du bas de volet */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <button className="border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-2 rounded-lg flex items-center justify-center gap-1.5 transition-colors">
              <Download className="h-3.5 w-3.5" /> Télécharger PDF
            </button>
            <button className="bg-[#0B45D2] hover:bg-[#093bb5] text-white font-bold py-2 rounded-lg flex items-center justify-center gap-1.5 shadow-xs transition-colors">
              <Mail className="h-3.5 w-3.5" /> Envoyer par email
            </button>
          </div>
        </div>

      </div>

      {/* --- SECTION BAS DE PAGE : GRILLE À 3 COLONNES --- */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Méthodes de paiement */}
        <div className="md:col-span-4 bg-white border border-slate-200 rounded-xl p-4 space-y-4">
          <h3 className="font-bold text-slate-800 text-sm">Méthodes de paiement acceptées</h3>
          <div className="flex items-center gap-3 flex-wrap opacity-80 pt-2">
            <span className="px-2 py-1 bg-slate-100 rounded text-[10px] font-black tracking-widest text-blue-800">VISA</span>
            <span className="px-2 py-1 bg-slate-100 rounded text-[10px] font-bold text-orange-600">mastercard</span>
            <span className="px-2 py-1 bg-slate-100 rounded text-[10px] font-bold text-indigo-500">stripe</span>
            <span className="px-2 py-1 bg-slate-100 rounded text-[10px] font-black italic text-blue-600">PayPal</span>
            <span className="px-2 py-1 bg-slate-100 rounded text-[10px] font-extrabold text-cyan-500">wave</span>
            <span className="text-slate-300 font-bold">•••</span>
          </div>
        </div>

        {/* Récapitulatif Circulaire */}
        <div className="md:col-span-4 bg-white border border-slate-200 rounded-xl p-4 space-y-3">
          <h3 className="font-bold text-slate-800 text-sm">Récapitulatif des paiements (mois)</h3>
          <div className="flex items-center gap-4 pt-1">
            <div className="h-12 w-12 rounded-full border-4 border-emerald-500 border-t-amber-500 border-r-rose-500 flex items-center justify-center shrink-0">
              <PieChart className="h-4 w-4 text-slate-400" />
            </div>
            <div className="w-full text-[11px] space-y-1 font-semibold text-slate-500">
              <div className="flex justify-between items-center"><div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-emerald-500"/>Paiements reçus</div><span className="text-slate-800 font-bold">1 650 000 XOF (67%)</span></div>
              <div className="flex justify-between items-center"><div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-amber-500"/>En attente</div><span className="text-slate-800 font-bold">785 000 XOF (29%)</span></div>
              <div className="flex justify-between items-center"><div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-rose-500"/>En retard</div><span className="text-slate-800 font-bold">115 000 XOF (4%)</span></div>
            </div>
          </div>
        </div>

        {/* Actions Rapides */}
        <div className="md:col-span-4 bg-white border border-slate-200 rounded-xl p-4 space-y-2">
          <h3 className="font-bold text-slate-800 text-sm mb-3">Actions rapides</h3>
          <div className="grid grid-cols-2 gap-2 text-[11px] font-bold text-slate-600">
            <button className="border border-slate-200 hover:bg-slate-50 p-2 rounded-lg text-left flex items-center gap-1.5 transition-colors"><Plus className="h-3.5 w-3.5 text-slate-400" /> Nouvelle facture</button>
            <button className="border border-slate-200 hover:bg-slate-50 p-2 rounded-lg text-left flex items-center gap-1.5 transition-colors"><FileText className="h-3.5 w-3.5 text-slate-400" /> Enregistrer paiement</button>
          </div>
        </div>

      </div>

    </div>
  );
}

