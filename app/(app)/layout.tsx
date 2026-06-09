import Sidebar from "@/components/layout/sidebar";
import Topbar from "@/components/layout/topbar";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* Sidebar fixe à gauche */}
      <Sidebar />

      {/* Zone de contenu à droite de la Sidebar */}
      <div className="pl-64 flex flex-col min-h-screen">
        {/* Topbar fixe en haut */}
        <Topbar />

        {/* Contenu principal de la page courante */}
        <main className="flex-1 pt-20 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

