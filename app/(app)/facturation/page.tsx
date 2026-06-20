"use client";

import React, { useState, useMemo } from "react";
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
  PieChart,
  X,
  RefreshCw
} from "lucide-react";

// --- BASE DE DONNÉES INVOICES (DYNAMIQUE) ---
const INITIAL_INVOICES = [
  { 
    id: "FAC-2024-1458", 
    client: "Jean Dupont", 
    email: "j.dupont@gmail.com",
    stay: "10/05/2024 - 15/05/2024", 
    nights: 5,
    date: "15/05/2024", 
    dueDate: "22/05/2024",
    amount: 135000, 
    status: "Payée",
    roomAmount: 100000,
    breakfastAmount: 20000,
    laundryAmount: 10000,
    taxAmount: 5000,
    method: "Carte bancaire (Visa **** 4242)",
    payDate: "15/05/2024 14:35",
    txnId: "txn_1234567890"
  },
  { 
    id: "FAC-2024-1457", 
    client: "Marie Martin", 
    email: "m.martin@outlook.com",
    stay: "08/05/2024 - 10/05/2024", 
    nights: 2,
    date: "10/05/2024", 
    dueDate: "17/05/2024",
    amount: 90000, 
    status: "En attente",
    roomAmount: 70000,
    breakfastAmount: 15000,
    laundryAmount: 3000,
    taxAmount: 2000,
    method: "-",
    payDate: "-",
    txnId: "-"
  },
  { 
    id: "FAC-2024-1456", 
    client: "Paul Bernard", 
    email: "p.bernard@yahoo.fr",
    stay: "05/05/2024 - 07/05/2024", 
    nights: 2,
    date: "07/05/2024", 
    dueDate: "14/05/2024",
    amount: 75000, 
    status: "En retard",
    roomAmount: 60000,
    breakfastAmount: 10000,
    laundryAmount: 3000,
    taxAmount: 2000,
    method: "-",
    payDate: "-",
    txnId: "-"
  },
  { 
    id: "FAC-2024-1455", 
    client: "Sophie Leroy", 
    email: "s.leroy@gmail.com",
    stay: "01/05/2024 - 03/05/2024", 
    nights: 2,
    date: "03/05/2024", 
    dueDate: "10/05/2024",
    amount: 120000, 
    status: "Payée",
    roomAmount: 90000,
    breakfastAmount: 20000,
    laundryAmount: 5000,
    taxAmount: 5000,
    method: "Wave Mobile Money",
    payDate: "03/05/2024 09:12",
    txnId: "txn_9876543210"
  },
  { 
    id: "FAC-2024-1454", 
    client: "Lucas Moreau", 
    email: "l.moreau@afrique-pms.ci",
    stay: "28/04/2024 - 01/05/2024", 
    nights: 3,
    date: "01/05/2024", 
    dueDate: "08/05/2024",
    amount: 60000, 
    status: "Payée",
    roomAmount: 50000,
    breakfastAmount: 5000,
    laundryAmount: 3000,
    taxAmount: 2000,
    method: "Espèces",
    payDate: "01/05/2024 11:00",
    txnId: "txn_cash_456"
  },
  { 
    id: "FAC-2024-1453", 
    client: "Claire Dubois", 
    email: "claire.dubois@gmail.com",
    stay: "26/04/2024 - 28/04/2024", 
    nights: 2,
    date: "28/04/2024", 
    dueDate: "05/05/2024",
    amount: 110000, 
    status: "En attente",
    roomAmount: 85000,
    breakfastAmount: 15000,
    laundryAmount: 6000,
    taxAmount: 4000,
    method: "-",
    payDate: "-",
    txnId: "-"
  },
  { 
    id: "FAC-2024-1452", 
    client: "Thomas Petit", 
    email: "t.petit@inter.net",
    stay: "24/04/2024 - 26/04/2024", 
    nights: 2,
    date: "26/04/2024", 
    dueDate: "03/05/2024",
    amount: 85000, 
    status: "En retard",
    roomAmount: 65000,
    breakfastAmount: 10000,
    laundryAmount: 7000,
    taxAmount: 3000,
    method: "-",
    payDate: "-",
    txnId: "-"
  },
  { 
    id: "FAC-2024-1451", 
    client: "Isabelle Richard", 
    email: "i.richard@outlook.fr",
    stay: "20/04/2024 - 23/04/2024", 
    nights: 3,
    date: "23/04/2024", 
    dueDate: "30/04/2024",
    amount: 105000, 
    status: "Payée",
    roomAmount: 80000,
    breakfastAmount: 15000,
    laundryAmount: 6000,
    taxAmount: 4000,
    method: "Orange Money",
    payDate: "23/04/2024 17:40",
    txnId: "txn_om_7789"
  },
];

export default function FacturationPage() {
  // --- ÉTATS ---
  const [invoices, setInvoices] = useState(INITIAL_INVOICES);
  const [activeTab, setActiveTab] = useState("Toutes les factures");
  const [selectedInvoiceId, setSelectedInvoiceId] = useState("FAC-2024-1458");
  const [searchQuery, setSearchQuery] = useState("");
  
  // États de chargement asynchrones pour l'expérience Élite
  const [loadingAction, setLoadingAction] = useState<{ id: string; type: "pdf" | "email" | "global" } | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" } | null>(null);

  const triggerToast = (message: string, type: "success" | "info" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // --- CALCULS DES COMPTEURS ET STATS ---
  const stats = useMemo(() => {
    const totalCA = invoices.filter(i => i.status === "Payée").reduce((sum, i) => sum + i.amount, 0);
    const paidCount = invoices.filter(i => i.status === "Payée").length;
    const pendingCount = invoices.filter(i => i.status === "En attente").length;
    const pendingAmount = invoices.filter(i => i.status === "En attente").reduce((sum, i) => sum + i.amount, 0);
    const overdueAmount = invoices.filter(i => i.status === "En retard").reduce((sum, i) => sum + i.amount, 0);

    return { totalCA, paidCount, pendingCount, pendingAmount, overdueAmount };
  }, [invoices]);

  // --- RECHERCHE ET FILTRAGE COMBINÉS ---
  const filteredInvoices = useMemo(() => {
    return invoices.filter((item) => {
      // Étape 1 : Filtrage par onglet / Statut
      if (activeTab === "Payées" && item.status !== "Payée") return false;
      if (activeTab === "En attente" && item.status !== "En attente") return false;
      if (activeTab === "En retard" && item.status !== "En retard") return false;
      if (activeTab === "Annulées") return false; // Aucune annulée par défaut dans nos données

      // Étape 2 : Filtrage par barre de recherche
      const matchQuery = 
        item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.client.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchQuery;
    });
  }, [invoices, activeTab, searchQuery]);

  // Récupération de l'objet facture complet sélectionné à droite
  const currentInvoice = useMemo(() => {
    return invoices.find(i => i.id === selectedInvoiceId) || invoices[0];
  }, [invoices, selectedInvoiceId]);

  // --- ACTIONS INTERACTIVES ---
  const handleDownloadPDF = (invoiceId: string, clientName: string) => {
    setLoadingAction({ id: invoiceId, type: "pdf" });
    setTimeout(() => {
      setLoadingAction(null);
      triggerToast(`Reçu fiscal ${invoiceId} téléchargé avec succès pour ${clientName}.`);
    }, 1000);
  };

  const handleSendEmail = (invoiceId: string, clientName: string, email: string) => {
    setLoadingAction({ id: invoiceId, type: "email" });
    setTimeout(() => {
      setLoadingAction(null);
      triggerToast(`Le reçu électronique de la facture ${invoiceId} a été transmis à l'adresse : ${email}.`, "info");
    }, 1200);
  };

  const handleExportGlobal = () => {
    setLoadingAction({ id: "global", type: "global" });
    setTimeout(() => {
      setLoadingAction(null);
      triggerToast("Grand livre comptable et relevés exportés (Format CSV / Excel).");
    }, 800);
  };

  return (
    <div className="space-y-6 relative">
      
      {/* TOAST SYSTEM PREMIUM */}
      {toast && (
        <div className="fixed top-4 right-4 z-[100] flex items-center gap-3 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-2xl border border-slate-800 animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className={`h-4 w-4 ${toast.type === 'success' ? 'text-emerald-400' : 'text-blue-400'}`} />
          <span className="max-w-xs">{toast.message}</span>
          <button onClick={() => setToast(null)} className="ml-2 text-slate-400 hover:text-white">
            <X className="h-3 w-3" />
          </button>
        </div>
      )}
      
      {/* --- EN-TÊTE --- */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Facturation & Paiements</h1>
          <p className="text-[11px] text-slate-400 mt-0.5">SmartHotel Élite  /  Suivi financier du livre comptable</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={handleExportGlobal}
            disabled={loadingAction?.id === "global"}
            className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-2 shadow-3xs transition-colors cursor-pointer disabled:opacity-50"
          >
            {loadingAction?.id === "global" ? (
              <RefreshCw className="h-3.5 w-3.5 animate-spin text-slate-400" />
            ) : (
              <Download className="h-3.5 w-3.5 text-slate-400" />
            )}
            Exporter Global
          </button>
          <button 
            onClick={() => triggerToast("Interface d'édition de nouvelle facture ouverte.", "info")}
            className="bg-[#0B45D2] hover:bg-[#093bb5] text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-2 shadow-3xs transition-colors cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" /> Nouvelle facture
          </button>
        </div>
      </div>

      {/* --- BLOC DES 4 STATISTIQUES (DYNAMISÉES ET INTERACTIVES) --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* CA total */}
        <button 
          onClick={() => { setActiveTab("Toutes les factures"); setSearchQuery(""); }}
          className={`w-full text-left bg-white border rounded-xl p-4 shadow-3xs flex items-center justify-between transition-all ${activeTab === "Toutes les factures" ? "border-blue-500 ring-2 ring-blue-500/10 bg-blue-50/10" : "border-slate-200/80 hover:border-slate-300"}`}
        >
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-slate-400 tracking-wide uppercase">Chiffre d'affaires (mois)</p>
            <p className="text-lg font-black text-slate-900 font-sans">{stats.totalCA.toLocaleString()} XOF</p>
            <p className="text-[9px] text-emerald-500 font-bold">▲ +12.5% vs mois dernier</p>
          </div>
          <div className="h-9 w-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
            <TrendingUp className="h-4 w-4" />
          </div>
        </button>

        {/* Factures Payées */}
        <button 
          onClick={() => { setActiveTab("Payées"); setSearchQuery(""); }}
          className={`w-full text-left bg-white border rounded-xl p-4 shadow-3xs flex items-center justify-between transition-all ${activeTab === "Payées" ? "border-emerald-500 ring-2 ring-emerald-500/10 bg-emerald-50/10" : "border-slate-200/80 hover:border-slate-300"}`}
        >
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-slate-400 tracking-wide uppercase">Factures payées</p>
            <p className="text-lg font-black text-slate-900 font-sans">{stats.paidCount} Transac.</p>
            <p className="text-[9px] text-emerald-500 font-bold">▲ +8.3% cumulé</p>
          </div>
          <div className="h-9 w-9 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
            <CheckCircle2 className="h-4 w-4" />
          </div>
        </button>

        {/* En attente */}
        <button 
          onClick={() => { setActiveTab("En attente"); setSearchQuery(""); }}
          className={`w-full text-left bg-white border rounded-xl p-4 shadow-3xs flex items-center justify-between transition-all ${activeTab === "En attente" ? "border-amber-500 ring-2 ring-amber-500/10 bg-amber-50/10" : "border-slate-200/80 hover:border-slate-300"}`}
        >
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-slate-400 tracking-wide uppercase">En attente de paiement</p>
            <p className="text-lg font-black text-slate-900 font-sans">{stats.pendingCount} Factures</p>
            <p className="text-[9px] text-amber-500 font-bold">▼ -2.1% en baisse</p>
          </div>
          <div className="h-9 w-9 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
            <Clock className="h-4 w-4" />
          </div>
        </button>

        {/* Montant Restant du */}
        <button 
          onClick={() => { setActiveTab("En retard"); setSearchQuery(""); }}
          className={`w-full text-left bg-white border rounded-xl p-4 shadow-3xs flex items-center justify-between transition-all ${activeTab === "En retard" ? "border-rose-500 ring-2 ring-rose-500/10 bg-rose-50/10" : "border-slate-200/80 hover:border-slate-300"}`}
        >
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-slate-400 tracking-wide uppercase">Montant En Souffrance</p>
            <p className="text-lg font-black text-rose-600 font-sans">{(stats.pendingAmount + stats.overdueAmount).toLocaleString()} XOF</p>
            <p className="text-[9px] text-slate-400 font-semibold">Total Risque Courant</p>
          </div>
          <div className="h-9 w-9 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
            <AlertCircle className="h-4 w-4" />
          </div>
        </button>
      </div>

      {/* --- GRILLE PRINCIPALE SPLIT --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ================= ZONE DE GAUCHE : TABLEAU DES FACTURES ================= */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden flex flex-col">
          
          {/* Barres des Onglets et Moteur de Recherche */}
          <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex gap-4 text-xs font-bold text-slate-400 border-b sm:border-b-0 border-slate-100 pb-2 sm:pb-0">
              {["Toutes les factures", "Payées", "En attente", "En retard", "Annulées"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2 relative transition-colors cursor-pointer ${
                    activeTab === tab ? "text-[#0B45D2] font-black after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#0B45D2]" : "hover:text-slate-600"
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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher nom, n°..." 
                  className="w-48 pl-9 pr-4 py-1.5 border border-slate-200 rounded-lg text-xs bg-slate-50 focus:outline-hidden focus:border-blue-500 font-medium"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="absolute right-2 top-2 text-slate-400 hover:text-slate-600"><X className="h-3 w-3" /></button>
                )}
              </div>
              <button onClick={() => { setActiveTab("Toutes les factures"); setSearchQuery(""); }} className="p-1.5 border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50 bg-white shadow-3xs" title="Réinitialiser filtres">
                <SlidersHorizontal className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Tableau Centralisé */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse whitespace-nowrap">
              <thead>
                <tr className="bg-slate-50/60 border-b border-slate-100 text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                  <th className="p-3">N° Facture</th>
                  <th className="p-3">Client</th>
                  <th className="p-3">Séjour</th>
                  <th className="p-3">Date d'Émission</th>
                  <th className="p-3">Montant TTC</th>
                  <th className="p-3">Statut</th>
                  <th className="p-3 text-center">Actions rapides</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600 font-semibold">
                {filteredInvoices.length > 0 ? (
                  filteredInvoices.map((row) => (
                    <tr 
                      key={row.id} 
                      onClick={() => setSelectedInvoiceId(row.id)}
                      className={`hover:bg-slate-50/40 cursor-pointer transition-colors ${selectedInvoiceId === row.id ? "bg-blue-50/40" : ""}`}
                    >
                      <td className="p-3 font-bold text-[#0B45D2]">{row.id}</td>
                      <td className="p-3 font-bold text-slate-900">{row.client}</td>
                      <td className="p-3 text-slate-400 text-[11px] font-medium">{row.stay}</td>
                      <td className="p-3 font-medium text-slate-500">{row.date}</td>
                      <td className="p-3 font-black text-slate-900 font-sans">{row.amount.toLocaleString()} XOF</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded-sm text-[9px] font-black tracking-wide uppercase ${
                          row.status === "Payée" ? "bg-emerald-50 text-emerald-600 border border-emerald-200" :
                          row.status === "En attente" ? "bg-amber-50 text-amber-600 border border-amber-200" : "bg-rose-50 text-rose-600 border border-rose-200"
                        }`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="p-3" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-center gap-1.5">
                          <button 
                            onClick={() => setSelectedInvoiceId(row.id)}
                            className="p-1.5 border border-slate-100 rounded-md text-slate-400 hover:text-[#0B45D2] hover:bg-blue-50 bg-white shadow-3xs transition-colors"
                            title="Inspecter dans le volet"
                          >
                            <Eye className="h-3.5 w-3.5" />
                          </button>
                          <button 
                            onClick={() => handleDownloadPDF(row.id, row.client)}
                            disabled={loadingAction?.id === row.id}
                            className="p-1.5 border border-slate-100 rounded-md text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 bg-white shadow-3xs transition-colors disabled:opacity-40"
                            title="Télécharger Reçu"
                          >
                            {loadingAction?.id === row.id && loadingAction?.type === "pdf" ? (
                              <RefreshCw className="h-3.5 w-3.5 animate-spin text-emerald-500" />
                            ) : (
                              <Download className="h-3.5 w-3.5" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center p-12 text-slate-400 font-medium">
                      Aucune facture ne correspond à ces critères de recherche ou de filtre.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Statique mais Propre */}
          <div className="p-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium bg-slate-50/50">
            <span>Affichage de 1 à {filteredInvoices.length} sur {filteredInvoices.length} entrées filtrées</span>
            <div className="flex items-center gap-1">
              <button className="p-1 border border-slate-200 bg-white rounded hover:bg-slate-50"><ChevronLeft className="h-3 w-3" /></button>
              <button className="px-2 py-0.5 bg-[#0B45D2] text-white font-bold rounded">1</button>
              <button className="p-1 border border-slate-200 bg-white rounded hover:bg-slate-50"><ChevronRight className="h-3 w-3" /></button>
            </div>
          </div>
        </div>

        {/* ================= ZONE DE DROITE : DETAILS DYNAMIQUES DE LA FACTURE SELECTIONNEE ================= */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl shadow-xs p-4 space-y-4 text-xs">
          
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="font-black text-slate-800 text-xs uppercase tracking-wide">Détails de la facture</h3>
            <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
              currentInvoice.status === "Payée" ? "bg-emerald-50 text-emerald-600" :
              currentInvoice.status === "En attente" ? "bg-amber-50 text-amber-600" : "bg-rose-50 text-rose-600"
            }`}>
              {currentInvoice.status}
            </span>
          </div>

          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">N° Identifiant Unique</p>
            <p className="font-black text-slate-900 text-sm tracking-tight">{currentInvoice.id}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 border-b border-slate-100 pb-3">
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase">Client Titulaire</p>
              <p className="font-bold text-slate-900">{currentInvoice.client}</p>
              <p className="text-[10px] text-slate-400 font-medium truncate">{currentInvoice.email}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase">Période Réduite</p>
              <p className="font-bold text-slate-700 text-[11px] leading-tight">{currentInvoice.stay}</p>
              <span className="inline-block mt-0.5 text-[9px] font-black bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded">{currentInvoice.nights} nuits</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 border-b border-slate-100 pb-3">
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase">Date émission</p>
              <p className="font-bold text-slate-700 font-sans">{currentInvoice.date}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase">Échéance limite</p>
              <p className="font-bold text-slate-700 font-sans">{currentInvoice.dueDate}</p>
            </div>
          </div>

          {/* Ticket Comptable des flux intérieurs */}
          <div className="space-y-2 bg-slate-50/60 border border-slate-100 p-3 rounded-xl">
            <h4 className="font-black text-slate-800 text-[10px] uppercase tracking-wide">Détail des prestations</h4>
            <div className="space-y-1.5 font-semibold text-slate-600 text-[11px]">
              <div className="flex justify-between"><span>Chambre ({currentInvoice.nights} nuits)</span><span className="font-bold text-slate-800 font-sans">{currentInvoice.roomAmount.toLocaleString()} XOF</span></div>
              <div className="flex justify-between"><span>Restauration / Petit déj.</span><span className="font-bold text-slate-800 font-sans">{currentInvoice.breakfastAmount.toLocaleString()} XOF</span></div>
              <div className="flex justify-between"><span>Blanchisserie hôtelière</span><span className="font-bold text-slate-800 font-sans">{currentInvoice.laundryAmount.toLocaleString()} XOF</span></div>
              <div className="flex justify-between pb-1.5 border-b border-slate-200"><span>Taxe de séjour municipale</span><span className="font-bold text-slate-800 font-sans">{currentInvoice.taxAmount.toLocaleString()} XOF</span></div>
              
              <div className="flex justify-between text-slate-400 text-[10px] pt-1"><span>Sous-total HT</span><span className="font-sans">{(currentInvoice.amount - Math.round(currentInvoice.amount * 0.18)).toLocaleString()} XOF</span></div>
              <div className="flex justify-between text-slate-400 text-[10px] border-b border-slate-200 pb-1.5"><span>TVA État (18%)</span><span className="font-sans">{Math.round(currentInvoice.amount * 0.18).toLocaleString()} XOF</span></div>
              
              <div className="flex justify-between items-baseline pt-1">
                <span className="font-black text-slate-900">NET À PAYER (TTC)</span>
                <span className="text-base font-black text-[#0B45D2] font-sans">{currentInvoice.amount.toLocaleString()} XOF</span>
              </div>
            </div>
          </div>

          {/* Mode de paiement */}
          <div className="border-t border-slate-100 pt-2 space-y-1">
            <h4 className="font-black text-slate-800 uppercase tracking-wide text-[10px]">Audits de règlement</h4>
            <div className="grid grid-cols-2 gap-y-1 text-slate-500 font-medium text-[11px]">
              <span>Méthode de paiement</span><span className="font-bold text-slate-800 text-right">{currentInvoice.method}</span>
              <span>Date de validation</span><span className="font-bold text-slate-700 text-right font-sans">{currentInvoice.payDate}</span>
              <span>Transaction ID</span><span className="font-mono text-slate-500 text-right text-[10px]">{currentInvoice.txnId}</span>
            </div>
          </div>

          {/* Actions interactives d'envoi du volet */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <button 
              onClick={() => handleDownloadPDF(currentInvoice.id, currentInvoice.client)}
              disabled={loadingAction?.id === currentInvoice.id}
              className="border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-2 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50 text-[11px]"
            >
              {loadingAction?.id === currentInvoice.id && loadingAction?.type === "pdf" ? (
                <RefreshCw className="h-3 w-3 animate-spin text-slate-400" />
              ) : (
                <Download className="h-3.5 w-3.5 text-slate-400" />
              )}
              Télécharger PDF
            </button>
            <button 
              onClick={() => handleSendEmail(currentInvoice.id, currentInvoice.client, currentInvoice.email)}
              disabled={loadingAction?.id === currentInvoice.id}
              className="bg-[#0B45D2] hover:bg-[#093bb5] text-white font-bold py-2 rounded-lg flex items-center justify-center gap-1.5 shadow-3xs transition-colors cursor-pointer disabled:opacity-50 text-[11px]"
            >
              {loadingAction?.id === currentInvoice.id && loadingAction?.type === "email" ? (
                <RefreshCw className="h-3 w-3 animate-spin text-white" />
              ) : (
                <Mail className="h-3.5 w-3.5" />
              )}
              Envoyer par email
            </button>
          </div>
        </div>

      </div>

      {/* --- SECTION BAS DE PAGE : GRILLE FINANCIÈRE EXTÉRIEURE --- */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Passerelle Passerelles et modes de paiement */}
        <div className="md:col-span-4 bg-white border border-slate-200 rounded-xl p-4 space-y-3 shadow-3xs">
          <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wide">Passerelles de paiement Élite</h3>
          <div className="flex items-center gap-2 flex-wrap opacity-90 pt-1">
            <span className="px-2 py-1 bg-slate-100 rounded font-black tracking-widest text-blue-800 text-[10px]">VISA</span>
            <span className="px-2 py-1 bg-slate-100 rounded font-bold text-orange-600 text-[10px]">mastercard</span>
            <span className="px-2 py-1 bg-slate-100 rounded font-bold text-indigo-500 text-[10px]">stripe</span>
            <span className="px-2 py-1 bg-slate-100 rounded font-black italic text-blue-600 text-[10px]">PayPal</span>
            <span className="px-2 py-1 bg-slate-100 rounded font-extrabold text-cyan-500 text-[10px]">wave</span>
          </div>
        </div>

        {/* Récapitulatif Circulaire Proportionnel */}
        <div className="md:col-span-4 bg-white border border-slate-200 rounded-xl p-4 space-y-3 shadow-3xs">
          <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wide">Distribution mensuelle des Flux</h3>
          <div className="flex items-center gap-4 pt-1">
            <div className="h-10 w-10 rounded-full border-4 border-emerald-500 border-t-amber-500 border-r-rose-500 flex items-center justify-center shrink-0">
              <PieChart className="h-4 w-4 text-slate-400" />
            </div>
            <div className="w-full text-[11px] space-y-1 font-bold text-slate-500">
              <div className="flex justify-between items-center"><div className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500"/>Reçus encaissés</div><span className="text-slate-900 font-sans">67%</span></div>
              <div className="flex justify-between items-center"><div className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-amber-500"/>Portefeuille d'attente</div><span className="text-slate-900 font-sans">29%</span></div>
              <div className="flex justify-between items-center"><div className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-rose-500"/>Arriérés / litiges</div><span className="text-slate-900 font-sans">4%</span></div>
            </div>
          </div>
        </div>

        {/* Actions Rapides Périphériques */}
        <div className="md:col-span-4 bg-white border border-slate-200 rounded-xl p-4 space-y-2 shadow-3xs">
          <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wide mb-2">Actions Système Directes</h3>
          <div className="grid grid-cols-2 gap-2 text-[11px] font-bold text-slate-600">
            <button onClick={() => triggerToast("Formulaire de facturation express ouvert.", "info")} className="border border-slate-200 hover:bg-slate-50 p-2 rounded-lg text-left flex items-center gap-1.5 transition-colors cursor-pointer bg-white shadow-3xs">
              <Plus className="h-3.5 w-3.5 text-slate-400" /> Facture Express
            </button>
            <button onClick={() => triggerToast("Module de lettrage bancaire activé.", "info")} className="border border-slate-200 hover:bg-slate-50 p-2 rounded-lg text-left flex items-center gap-1.5 transition-colors cursor-pointer bg-white shadow-3xs">
              <FileText className="h-3.5 w-3.5 text-slate-400" /> Lettrer Paiement
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}