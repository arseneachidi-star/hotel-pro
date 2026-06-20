"use client";

import React, { createContext, useContext, useState } from "react";

// Définition des types
type UserProfile = {
  name: string;
  role: string;
  avatar: string;
  email: string;
  phone: string;
};

type Notification = { id: number; message: string; isRead: boolean };
type Message = { id: number; sender: string; message: string; isRead: boolean };

type AppContextType = {
  user: UserProfile;
  notifications: Notification[];
  messages: Message[];
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  addNotification: (message: string) => void;
  markNotificationsAsRead: () => void;
  markMessagesAsRead: () => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  // Profil de l'administrateur maintenant dynamique
  const [user, setUser] = useState<UserProfile>({
    name: "Admin Hotel",
    role: "Administrateur",
    avatar: "/galerie1.jpeg", // Image par défaut
    email: "admin@hotelpro.com",
    phone: "+33 6 12 34 56 78"
  });

  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, message: "Nouvelle réservation pour la chambre 101", isRead: false },
    { id: 2, message: "Nettoyage terminé pour la chambre 104", isRead: false },
  ]);

  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: "Jean D.", message: "Le lit bébé est-il en place ?", isRead: false },
  ]);

  // Fonction pour mettre à jour le profil de l'admin
  const updateUserProfile = (updatedFields: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updatedFields }));
  };

  const addNotification = (message: string) => {
    setNotifications((prev) => [
      { id: Date.now(), message, isRead: false },
      ...prev,
    ]);
  };

  const markNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const markMessagesAsRead = () => {
    setMessages((prev) => prev.map((m) => ({ ...m, isRead: true })));
  };

  return (
    <AppContext.Provider value={{ 
      user, 
      notifications, 
      messages, 
      updateUserProfile, 
      addNotification, 
      markNotificationsAsRead, 
      markMessagesAsRead 
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp doit être utilisé dans un AppProvider");
  return context;
}