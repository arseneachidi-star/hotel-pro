import { handlers } from "@/auth";

// Auth.js (NextAuth v5) utilise ces handlers pour intercepter automatiquement 
// toutes les requêtes d'authentification (GET et POST)
export const { GET, POST } = handlers;