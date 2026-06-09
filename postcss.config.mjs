/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {}, // C'est le nouveau connecteur officiel pour la v4
    autoprefixer: {},
  },
};

export default config;

