'use client'
import Topbar from '@/components/layout/Topbar'
import { TrendingUp, Download, FileSpreadsheet } from 'lucide-react'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const occData = [
  { d: '15/05', v: 50 }, { d: '16/05', v: 65 }, { d: '17/05', v: 72 }, { d: '18/05', v: 60 },
  { d: '19/05', v: 68 }, { d: '20/05', v: 75 }, { d: '21/05', v: 90 },
]
const revData = [
  { d: '15/05', v: 1500000 }, { d: '16/05', v: 1800000 }, { d: '17/05', v: 2400000 }, { d: '18/05', v: 1600000 },
  { d: '19/05', v: 1900000 }, { d: '20/05', v: 1700000 }, { d: '21/05', v: 2600000 },
]
const pieData = [
  { name: 'Directes', value: 55, color: '#2563eb' },
  { name: 'Booking.com', value: 25, color: '#16a34a' },
  { name: 'Expedia', value: 15, color: '#d97706' },
  { name: 'Autres', value: 5, color: '#9ca3af' },
]
const topRooms = [
  { room: '101 - Standard', res: 18, occ: '90%', rev: '810 000' },
  { room: '102 - Deluxe', res: 15, occ: '75%', rev: '750 000' },
  { room: '201 - Suite', res: 12, occ: '80%', rev: '960 000' },
  { room: '103 - Standard', res: 10, occ: '70%', rev: '450 000' },
  { room: '104 - Deluxe', res: 8, occ: '65%', rev: '400 000' },
]
const lastRes = [
  { client: 'Paul Bernard', room: '101', arrive: '21/05/2024', depart: '23/05/2024', amount: '90 000 XOF', status: 'Confirmée' },
  { client: 'Sophie Leroy', room: '102', arrive: '20/05/2024', depart: '22/05/2024', amount: '120 000 XOF', status: 'Confirmée' },
  { client: 'Lucas Moreau', room: '201', arrive: '19/05/2024', depart: '21/05/2024', amount: '150 000 XOF', status: 'Confirmée' },
  { client: 'Claire Dubois', room: '103', arrive: '18/05/2024', depart: '20/05/2024', amount: '90 000 XOF', status: 'Confirmée' },
  { client: 'Thomas Petit', room: '104', arrive: '18/05/2024', depart: '19/05/2024', amount: '80 000 XOF', status: 'Annulée' },
]

const kpis = [
  { label: "Taux d'occupation", value: '78%', sub: '+12% vs semaine dernière', trend: true },
  { label: 'RevPAR', value: '45 000 XOF', sub: '+8% vs semaine dernière', trend: true },
  { label: 'CA Journalier', value: '2 450 000 XOF', sub: '+15% vs semaine dernière', trend: true },
  { label: 'Réservations', value: '42', sub: '+10% vs semaine dernière', trend: true },
]

export default function TableauDeBordPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          <div>
            <h1 className="text-base font-bold text-gray-900">Tableau de bord & Reporting</h1>
            <p className="text-xs text-gray-400">Suivez les performances clés de votre établissement en temps réel.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input type="date" defaultValue="2024-05-15" className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 text-gray-600" />
          <span className="text-xs text-gray-400">—</span>
          <input type="date" defaultValue="2024-05-21" className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 text-gray-600" />
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-600 hover:bg-gray-50">
            <Download className="w-3.5 h-3.5" /> Exporter PDF
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs hover:bg-blue-700">
            <FileSpreadsheet className="w-3.5 h-3.5" /> Exporter Excel
          </button>
        </div>
      </div>

      <div className="p-6 space-y-5">
        {/* KPIs */}
        <div className="grid grid-cols-4 gap-4">
          {kpis.map((k) => (
            <div key={k.label} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <p className="text-xs text-gray-500 mb-1">{k.label}</p>
              <p className="text-xl font-extrabold text-gray-900">{k.value}</p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3 text-green-500" />
                <span className="text-xs text-green-600 font-medium">{k.sub}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-12 gap-4">
          {/* Occupation line */}
          <div className="col-span-5 bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-bold text-gray-800">Taux d&apos;occupation</p>
              <span className="text-xs text-gray-400">15/05 - 21/05/2024</span>
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={occData}>
                <XAxis dataKey="d" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 100]} unit="%" />
                <Tooltip formatter={(v) => `${v}%`} />
                <Line type="monotone" dataKey="v" stroke="#2563eb" strokeWidth={2.5} dot={{ r: 3, fill: '#2563eb' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Pie chart */}
          <div className="col-span-3 bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <p className="text-sm font-bold text-gray-800 mb-3">Répartition des réservations</p>
            <ResponsiveContainer width="100%" height={140}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="value">
                  {pieData.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip formatter={(v) => `${v}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-2 space-y-1">
              {pieData.map((d) => (
                <div key={d.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
                    <span className="text-xs text-gray-600">{d.name}</span>
                  </div>
                  <span className="text-xs font-semibold text-gray-700">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue bar */}
          <div className="col-span-4 bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <p className="text-sm font-bold text-gray-800 mb-3">Revenus (XOF)</p>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={revData}>
                <XAxis dataKey="d" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                {/* Correction du typage lâche ici pour l'argument de formatage */}
                <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v: any) => `${v / 1000000}M`} />
                <Tooltip formatter={(v: any) => `${(Number(v) / 1000).toFixed(0)} K XOF`} />
                <Bar dataKey="v" fill="#2563eb" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom tables */}
        <div className="grid grid-cols-12 gap-4">
          {/* Top rooms */}
          <div className="col-span-4 bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <p className="text-sm font-bold text-gray-800 mb-3">Top des chambres</p>
            <table className="w-full text-xs">
              <thead><tr className="text-gray-400 border-b border-gray-100">
                <th className="text-left pb-2 font-medium">Chambre</th>
                <th className="text-center pb-2 font-medium">Rés.</th>
                <th className="text-center pb-2 font-medium">Occ.</th>
                <th className="text-right pb-2 font-medium">Revenus</th>
              </tr></thead>
              <tbody>
                {topRooms.map((r, i) => (
                  <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-2 text-gray-700">{r.room}</td>
                    <td className="py-2 text-center text-gray-600">{r.res}</td>
                    <td className="py-2 text-center font-semibold text-blue-600">{r.occ}</td>
                    <td className="py-2 text-right text-gray-700">{r.rev}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Last reservations */}
          <div className="col-span-5 bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <p className="text-sm font-bold text-gray-800 mb-3">Dernières réservations</p>
            <table className="w-full text-xs">
              <thead><tr className="text-gray-400 border-b border-gray-100">
                <th className="text-left pb-2 font-medium">Client</th>
                <th className="text-center pb-2 font-medium">Ch.</th>
                <th className="text-center pb-2 font-medium">Arrivée</th>
                <th className="text-right pb-2 font-medium">Statut</th>
              </tr></thead>
              <tbody>
                {lastRes.map((r, i) => (
                  <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-2 text-gray-700 font-medium">{r.client}</td>
                    <td className="py-2 text-center text-gray-500">{r.room}</td>
                    <td className="py-2 text-center text-gray-500">{r.arrive}</td>
                    <td className="py-2 text-right">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${r.status === 'Annulée' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-700'}`}>
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Quick summary */}
          <div className="col-span-3 bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <p className="text-sm font-bold text-gray-800 mb-3">Résumé rapide</p>
            {[
              { label: 'Chambres totales', value: '120' },
              { label: 'Chambres occupées', value: '94' },
              { label: 'Chambres disponibles', value: '20' },
              { label: 'En nettoyage', value: '4' },
              { label: 'En maintenance', value: '2' },
              { label: 'RevPAR (Semaine)', value: '45 000 XOF' },
              { label: 'ADR (Prix moyen)', value: '57 692 XOF' },
            ].map((s, i) => (
              <div key={i} className="flex justify-between items-center py-1.5 border-b border-gray-50 last:border-0">
                <span className="text-xs text-gray-500">{s.label}</span>
                <span className="text-xs font-bold text-gray-800">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

