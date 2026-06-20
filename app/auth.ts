import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import MicrosoftEntraID from "next-auth/providers/microsoft-entra-id";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    MicrosoftEntraID({
      clientId: process.env.AUTH_MICROSOFT_ID,
      clientSecret: process.env.AUTH_MICROSOFT_SECRET,
      // Accepte à la fois les comptes Microsoft personnels, professionnels et d'étudiants
      issuer: "https://login.microsoftonline.com/common/v2.0",
    }),
  ],
  pages: {
    signIn: "/auth/login", // Redirige ici si l'accès à une page protégée est refusé
  },
  callbacks: {
    async jwt({ token, account }) {
      // Optionnel : Vous pourrez ajouter des informations personnalisées au jeton ici
      return token;
    },
    async session({ session, token }) {
      // Optionnel : Rend les données utilisateur accessibles sur vos composants Next.js
      return session;
    },
  },
});