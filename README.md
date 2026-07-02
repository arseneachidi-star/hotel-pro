This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.




# 📦 Installation du projet

Ce guide permet à un collaborateur de configurer et tester le projet facilement.

---

## 🧰 1. Prérequis

Avant de commencer, assure-toi d’avoir installé :

* **Node.js** (version recommandée ≥ 18)
* **npm** ou **yarn**
* **Git**

### Vérification :

```bash
node -v
npm -v
git --version
```

---

## 📥 2. Cloner le projet

```bash
git clone <URL_DU_PROJET>
cd nom_du_projet
```

---

## 📦 3. Installation des dépendances

### Installer toutes les dépendances :

```bash
npm install
```

---

## 📚 4. Dépendances principales du projet

Installer manuellement si nécessaire :

```bash
# Framework
npm install next react react-dom

# Icônes
npm install lucide-react

# Styles (si utilisé)
npm install tailwindcss postcss autoprefixer

# Utilitaires
npm install axios

# Lint & format
npm install eslint prettier --save-dev

# Types (si TypeScript)
npm install typescript @types/react @types/node --save-dev
```

---

## ⚙️ 5. Configuration Tailwind (si utilisé)

```bash
npx tailwindcss init -p
```

---

## 🔐 6. Variables d’environnement

Créer un fichier `.env.local` à la racine :

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
API_KEY=your_api_key
SECRET_KEY=your_secret
```

---

## 🗄️ 7. Base de données (optionnel)

### Prisma :

```bash
npm install prisma @prisma/client
npx prisma init
npx prisma generate
npx prisma migrate dev
```

---

## 🚀 8. Lancer le projet

```bash
npm run dev
```

Puis ouvrir :
👉 http://localhost:3000

---

## 🏗️ 9. Build du projet

```bash
npm run build
npm start
```

---

## 🧪 10. Vérification & outils

```bash
npm run lint
npm run test
```

---

## 📌 11. Checklist rapide

* [ ] Node.js installé
* [ ] Projet cloné
* [ ] `npm install` exécuté
* [ ] `.env.local` configuré
* [ ] `npm run dev` lancé

---

## 💡 Notes

* Si erreur : supprimer `node_modules` puis relancer :

```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 👨‍💻 Auteur

Projet développé pour collaboration et test.
