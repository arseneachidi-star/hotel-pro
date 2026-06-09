import type { Metadata } from "next";
import "./globals.css"; // Écrit en chemin relatif pour éviter tout conflit d'alias

export const metadata: Metadata = {
  title: "HotelPro",
  description: "Système de gestion hôtelière complet",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="antialiased text-slate-800">
        {children}
      </body>
    </html>
  );
}

