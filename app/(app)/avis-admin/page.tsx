"use client";

import React, { useState, useMemo } from "react";
import { 
  MessageSquare, 
  Star, 
  Smile, 
  Meh, 
  Frown, 
  SlidersHorizontal, 
  Calendar, 
  CornerUpLeft, 
  MoreVertical,
  X,
  Send,
  CheckCircle2,
  RefreshCw,
  MessageCircle
} from "lucide-react";

// --- INTERFACES DES TYPES ---
interface Review {
  id: string;
  client: string;
  room: string;
  rating: number;
  comment: string;
  sentiment: string;
  badgeClass: string;
  date: string;
  replied: boolean;
  replyText: string;
}

// --- BASE DE DONNÉES INITIALE ---
const INITIAL_REVIEWS: Review[] = [
  { id: "rev-1", client: "Jean Dupont", room: "Chambre 101", rating: 5, comment: "Excellent séjour ! Le personnel était très accueillant et la chambre était parfaite.", sentiment: "Positif", badgeClass: "bg-emerald-50 text-emerald-600 border-emerald-100", date: "10/06/2024", replied: false, replyText: "" },
  { id: "rev-2", client: "Marie Martin", room: "Chambre 205", rating: 3, comment: "Très bon hôtel, bien situé. Petit bémol sur le bruit dans les couloirs.", sentiment: "Neutre", badgeClass: "bg-amber-50 text-amber-600 border-amber-100", date: "10/06/2024", replied: true, replyText: "Bonjour Marie, merci pour votre retour. Nous prenons note du bémol concernant l'isolation phonique." },
  { id: "rev-3", client: "Paul Durand", room: "Chambre 302", rating: 5, comment: "Séjour agréable, tout était parfait. Je reviendrai avec plaisir.", sentiment: "Positif", badgeClass: "bg-emerald-50 text-emerald-600 border-emerald-100", date: "09/06/2024", replied: false, replyText: "" },
  { id: "rev-4", client: "Sophie Leroy", room: "Chambre 103", rating: 3, comment: "Le service était correct mais la chambre pourrait être plus propre.", sentiment: "Neutre", badgeClass: "bg-amber-50 text-amber-600 border-amber-100", date: "09/06/2024", replied: false, replyText: "" },
  { id: "rev-5", client: "Thomas Petit", room: "Chambre 202", rating: 1, comment: "Déçu par le séjour. Problème avec la climatisation et le service client.", sentiment: "Négatif", badgeClass: "bg-rose-50 text-rose-600 border-rose-100", date: "08/06/2024", replied: false, replyText: "" },
];

const CATEGORIES_RATING = [
  { label: "Propreté", score: 4.7, percent: "94%", color: "bg-emerald-500" },
  { label: "Confort", score: 4.5, percent: "90%", color: "bg-emerald-500" },
  { label: "Emplacement", score: 4.8, percent: "96%", color: "bg-emerald-500" },
  { label: "Service", score: 4.6, percent: "92%", color: "bg-emerald-500" },
  { label: "Rapport qualité/prix", score: 4.2, percent: "84%", color: "bg-blue-600" },
];

export default function GestionAvisClientsPage() {
  // --- ÉTATS ---
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [selectedSentiment, setSelectedSentiment] = useState<string | null>(null);
  const [activeReplyTarget, setActiveReplyTarget] = useState<Review | null>(null);
  const [replyInput, setReplyInput] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);
  const [toast, setToast] = useState<string | null>(null);
  const [showAll, setShowAll] = useState<boolean>(false);

  // --- COMPTEURS ---
  const counts = useMemo(() => {
    return {
      total: reviews.length,
      positive: reviews.filter((r) => r.sentiment === "Positif").length,
      neutral: reviews.filter((r) => r.sentiment === "Neutre").length,
      negative: reviews.filter((r) => r.sentiment === "Négatif").length,
      unrepliedCount: reviews.filter((r) => !r.replied && r.sentiment === "Négatif").length,
    };
  }, [reviews]);

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  // --- FILTRAGE ---
  const filteredReviews = useMemo(() => {
    let result = reviews;
    if (selectedSentiment) {
      result = result.filter((r) => r.sentiment === selectedSentiment);
    }
    return showAll ? result : result.slice(0, 5);
  }, [reviews, selectedSentiment, showAll]);

  const urgentReview = useMemo(() => {
    return reviews.find((r) => !r.replied && r.sentiment === "Négatif");
  }, [reviews]);

  // --- ACTIONS ---
  const handleOpenReply = (review: Review) => {
    setActiveReplyTarget(review);
    setReplyInput(review.replied ? review.replyText : "");
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyInput.trim() || !activeReplyTarget) return;

    setIsSending(true);
    setTimeout(() => {
      setReviews((prev) =>
        prev.map((r) =>
          r.id === activeReplyTarget.id
            ? { ...r, replied: true, replyText: replyInput }
            : r
        )
      );
      setIsSending(false);
      setActiveReplyTarget(null);
      setReplyInput("");
      triggerToast(`Réponse enregistrée pour ${activeReplyTarget.client}.`);
    }, 1000);
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

      {/* --- TIROIR / MODAL DE RÉPONSE --- */}
      {activeReplyTarget && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-slate-200 w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-[#0B45D2]" />
                <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">
                  {activeReplyTarget.replied ? "Modifier la réponse" : "Rédiger une réponse"}
                </h3>
              </div>
              <button type="button" onClick={() => setActiveReplyTarget(null)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="h-4 w-4" />
              </button>
            </div>
            
            <form onSubmit={handleSendReply} className="p-4 space-y-4">
              <div className="p-3 bg-slate-50 rounded-lg text-xs space-y-1">
                <div className="flex justify-between text-slate-400 font-bold">
                  <span>{activeReplyTarget.client} • {activeReplyTarget.room}</span>
                  <span className="text-amber-500">★ {activeReplyTarget.rating}/5</span>
                </div>
                <p className="text-slate-600 font-medium italic">"{activeReplyTarget.comment}"</p>
              </div>

              {!activeReplyTarget.replied && (
                <div className="space-y-1.5">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Réponses rapides</p>
                  <div className="flex flex-wrap gap-1.5">
                    <button type="button" onClick={() => setReplyInput("Un grand merci pour votre retour chaleureux ! Au plaisir de vous revoir.")} className="text-[10px] bg-blue-50 text-blue-600 px-2 py-1 rounded border border-blue-100 hover:bg-blue-100 font-semibold transition-colors">Remerciement</button>
                    <button type="button" onClick={() => setReplyInput("Bonjour, nous regrettons sincèrement ce désagrément. Notre service technique intervient immédiatement.")} className="text-[10px] bg-rose-50 text-rose-600 px-2 py-1 rounded border border-rose-100 hover:bg-rose-100 font-semibold transition-colors">Incident</button>
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Message officiel</label>
                <textarea
                  required
                  rows={4}
                  value={replyInput}
                  onChange={(e) => setReplyInput(e.target.value)}
                  placeholder="Écrivez votre message de réponse..."
                  className="w-full border border-slate-200 rounded-lg p-2.5 text-xs focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-medium text-slate-800"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button type="button" onClick={() => setActiveReplyTarget(null)} className="px-3 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg text-xs font-bold transition-colors">
                  Annuler
                </button>
                <button type="submit" disabled={isSending} className="flex items-center gap-1.5 bg-[#0B45D2] hover:bg-[#093bb5] text-white px-4 py-1.5 rounded-lg text-xs font-bold shadow-sm transition-colors disabled:opacity-50">
                  {isSending ? <RefreshCw className="h-3 w-3 animate-spin" /> : <Send className="h-3 w-3" />}
                  Envoyer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- EN-TÊTE --- */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Gestion des avis clients</h1>
          <p className="text-[11px] text-slate-400 mt-0.5">HôtelPro  /  Avis Clients</p>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
          {selectedSentiment && (
            <button type="button" onClick={() => setSelectedSentiment(null)} className="flex items-center gap-1 bg-rose-50 border border-rose-200 text-rose-600 px-2.5 py-1.5 rounded-lg text-[11px] font-bold hover:bg-rose-100 transition-colors">
              Filtre actif : {selectedSentiment} <X className="h-3 w-3" />
            </button>
          )}
          <button 
            type="button"
            onClick={() => {
              const pending = reviews.find(r => !r.replied);
              if (pending) handleOpenReply(pending);
              else triggerToast("Tous les avis ont reçu une réponse.");
            }} 
            className="flex items-center gap-1.5 bg-[#0B45D2] hover:bg-[#093bb5] text-white px-3 py-2 rounded-lg shadow-sm transition-colors"
          >
            <CornerUpLeft className="h-3.5 w-3.5" /> Répondre à un avis
          </button>
          <button type="button" onClick={() => triggerToast("Filtre activé")} className="flex items-center gap-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-3 py-2 rounded-lg shadow-sm transition-colors">
            <SlidersHorizontal className="h-3.5 w-3.5 text-slate-400" /> Filtrer
          </button>
          <div className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-2 rounded-lg text-slate-600 shadow-sm">
            <Calendar className="h-3.5 w-3.5 text-slate-400" />
            <span>10 Juin 2024 - 16 Juin 2024</span>
          </div>
        </div>
      </div>

      {/* --- CARTES DE STATISTIQUES FILTRANTES --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <button type="button" onClick={() => setSelectedSentiment(null)} className={`w-full text-left bg-white border rounded-xl p-4 shadow-sm flex items-center gap-3.5 transition-all ${!selectedSentiment ? "border-blue-500 ring-2 ring-blue-500/10 bg-blue-50/10" : "border-slate-200 hover:border-slate-300"}`}>
          <div className="p-2.5 rounded-full bg-blue-50 text-blue-500 shrink-0"><MessageSquare className="h-4 w-4" /></div>
          <div className="space-y-0.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide block">Total des avis</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-black text-slate-900 tracking-tight">{counts.total}</span>
              <span className="text-[10px] font-bold text-emerald-500">+12</span>
            </div>
          </div>
        </button>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex items-center gap-3.5">
          <div className="p-2.5 rounded-full bg-emerald-50 text-emerald-500 shrink-0"><Star className="h-4 w-4 fill-emerald-500 text-emerald-500" /></div>
          <div className="space-y-0.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide block">Note moyenne</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-black text-slate-900 tracking-tight">4.6 / 5</span>
              <span className="text-[10px] font-bold text-emerald-500">+0.2</span>
            </div>
          </div>
        </div>

        <button type="button" onClick={() => setSelectedSentiment("Positif")} className={`w-full text-left bg-white border rounded-xl p-4 shadow-sm flex items-center gap-3.5 transition-all ${selectedSentiment === "Positif" ? "border-emerald-500 ring-2 ring-emerald-500/10 bg-emerald-50/10" : "border-slate-200 hover:border-slate-300"}`}>
          <div className="p-2.5 rounded-full bg-emerald-50 text-emerald-500 shrink-0"><Smile className="h-4 w-4" /></div>
          <div className="space-y-0.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide block">Avis positifs</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-black text-slate-900 tracking-tight">{counts.positive}</span>
              <span className="text-[10px] font-bold text-slate-400">76.6%</span>
            </div>
          </div>
        </button>

        <button type="button" onClick={() => setSelectedSentiment("Neutre")} className={`w-full text-left bg-white border rounded-xl p-4 shadow-sm flex items-center gap-3.5 transition-all ${selectedSentiment === "Neutre" ? "border-amber-400 ring-2 ring-amber-400/10 bg-amber-50/10" : "border-slate-200 hover:border-slate-300"}`}>
          <div className="p-2.5 rounded-full bg-amber-50 text-amber-500 shrink-0"><Meh className="h-4 w-4" /></div>
          <div className="space-y-0.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide block">Avis neutres</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-black text-slate-900 tracking-tight">{counts.neutral}</span>
              <span className="text-[10px] font-bold text-slate-400">14.1%</span>
            </div>
          </div>
        </button>

        <button type="button" onClick={() => setSelectedSentiment("Négatif")} className={`w-full text-left bg-white border rounded-xl p-4 shadow-sm flex items-center gap-3.5 transition-all ${selectedSentiment === "Négatif" ? "border-rose-500 ring-2 ring-rose-500/10 bg-rose-50/10" : "border-slate-200 hover:border-slate-300"}`}>
          <div className="p-2.5 rounded-full bg-rose-50 text-rose-500 shrink-0"><Frown className="h-4 w-4" /></div>
          <div className="space-y-0.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide block">Avis négatifs</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-black text-slate-900 tracking-tight">{counts.negative}</span>
              <span className="text-[10px] font-bold text-rose-500">9.3%</span>
            </div>
          </div>
        </button>
      </div>

      {/* --- FLUX DE DONNÉES CENTRALES --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* BLOC FLUX DES AVIS (7 COLONNES) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden flex flex-col justify-between">
          <div>
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/40">
              <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Avis récents</h3>
              <span className="text-[11px] font-bold text-slate-400">{filteredReviews.length} visibles</span>
            </div>

            <div className="divide-y divide-slate-100">
              {filteredReviews.map((item) => (
                <div key={item.id} className="p-4 flex flex-col sm:flex-row items-start gap-4 hover:bg-slate-50/20 font-semibold text-xs transition-colors">
                  <div className="flex items-center gap-2.5 sm:w-36 shrink-0">
                    <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-700 text-xs">
                      {item.client.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <p className="text-slate-900 font-bold text-xs whitespace-nowrap">{item.client}</p>
                      <p className="text-[10px] text-slate-400 font-medium whitespace-nowrap">{item.room}</p>
                    </div>
                  </div>

                  <div className="space-y-1.5 flex-1 w-full">
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[...Array(5)].map((_, idx) => (
                        <Star key={idx} className={`h-3.5 w-3.5 ${idx < item.rating ? "fill-amber-400 text-amber-400" : "text-slate-200 fill-slate-200"}`} />
                      ))}
                    </div>
                    <p className="text-slate-600 text-[11px] leading-relaxed font-medium">"{item.comment}"</p>
                    
                    {item.replied && (
                      <div className="mt-2 p-2.5 bg-blue-50/40 border-l-2 border-[#0B45D2] rounded-r-lg text-[11px]">
                        <span className="text-[#0B45D2] font-black text-[9px] uppercase tracking-wide block mb-0.5">Réponse :</span>
                        <p className="text-slate-600 italic">"{item.replyText}"</p>
                      </div>
                    )}
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 w-full sm:w-auto shrink-0 border-t sm:border-0 pt-2 sm:pt-0 border-slate-50">
                    <div className="text-left sm:text-right space-y-0.5">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${item.badgeClass}`}>
                        {item.sentiment}
                      </span>
                      <p className="text-[9px] text-slate-400 font-medium block">{item.date}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button 
                        type="button"
                        onClick={() => handleOpenReply(item)}
                        className="border border-slate-200 bg-white hover:bg-slate-50 text-[#0B45D2] px-2 py-1 rounded-lg shadow-sm font-bold text-[11px] flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <CornerUpLeft className="h-3 w-3 stroke-[2.5]" /> 
                        {item.replied ? "Modifier" : "Répondre"}
                      </button>
                      <button type="button" className="text-slate-300 hover:text-slate-500 p-1"><MoreVertical className="h-4 w-4" /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-white text-center border-t border-slate-100">
            <button type="button" onClick={() => setShowAll(!showAll)} className="w-full border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-2 rounded-lg text-xs shadow-sm transition-colors cursor-pointer">
              {showAll ? "Réduire l'affichage" : "Voir tous les avis"}
            </button>
          </div>
        </div>

        {/* ANALYSES ET CRITÈRES (5 COLONNES) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-4">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Répartition des avis</h3>
            <div className="flex items-center justify-center gap-8 h-36">
              <div className="h-28 w-28 rounded-full border-[14px] border-emerald-500 border-t-amber-400 border-r-rose-400 flex items-center justify-center shrink-0 relative">
                <div className="text-center">
                  <p className="text-xl font-black text-slate-900 tracking-tight">{counts.total}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total</p>
                </div>
              </div>
              <div className="space-y-2 text-[11px] font-bold text-slate-500 w-full max-w-[160px]">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-500"/>Positifs</div>
                  <span className="text-slate-800">{counts.positive}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-amber-400"/>Neutres</div>
                  <span className="text-slate-800">{counts.neutral}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-rose-400"/>Négatifs</div>
                  <span className="text-slate-800">{counts.negative}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-4">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Notes par catégorie</h3>
            <div className="space-y-3.5 text-xs font-bold text-slate-700">
              {CATEGORIES_RATING.map((cat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-slate-600">{cat.label}</span>
                    <span className="text-slate-900 font-black">{cat.score}</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className={`${cat.color} h-full rounded-full`} style={{ width: cat.percent }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- RECONSTRUCTION ACCRUE DU BLOC BAS (TRAITEMENT CRITIQUE) --- */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Avis nécessitant une réponse</h3>
          <span className="bg-rose-50 text-rose-600 text-[10px] font-bold px-2 py-0.2 rounded-full border border-rose-100">
            {counts.unrepliedCount}
          </span>
        </div>

        {urgentReview ? (
          <div className="border border-slate-100 rounded-xl p-4 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4 font-semibold text-xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-1">
              <div className="flex items-center gap-2.5 sm:w-40 shrink-0">
                <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-700 text-xs">
                  {urgentReview.client.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <p className="text-slate-900 font-bold text-xs">{urgentReview.client}</p>
                  <p className="text-[10px] text-slate-400 font-medium">{urgentReview.room}</p>
                </div>
              </div>
              
              <div className="space-y-1 flex-1">
                <div className="flex text-amber-400">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                </div>
                <p className="text-slate-600 text-[11px] font-medium leading-relaxed">"{urgentReview.comment}"</p>
              </div>
            </div>

            <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-0 pt-2 md:pt-0 border-slate-100 shrink-0">
              <span className="text-[11px] text-slate-400 font-medium">{urgentReview.date}</span>
              <button 
                type="button" 
                onClick={() => handleOpenReply(urgentReview)}
                className="bg-[#0B45D2] hover:bg-[#093bb5] text-white text-[11px] font-bold px-4 py-2 rounded-lg shadow-sm transition-colors flex items-center gap-1 cursor-pointer"
              >
                <CornerUpLeft className="h-3.5 w-3.5" /> Répondre
              </button>
            </div>
          </div>
        ) : (
          <p className="text-xs font-semibold text-slate-400 text-center py-2">Aucun avis urgent en suspens.</p>
        )}
      </div>

    </div>
  );
}