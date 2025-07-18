import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  ssr: false,
  css: ['~/assets/css/main.css'],

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/ui',
    '@nuxtjs/color-mode',
    'nuxt-lucide-icons',
  ],

  fonts: {
    defaults: {
      weights: [300, 400, 500, 600, 700, 800, 900],
      styles: ['normal', 'italic'],
    },
    families: [
      {
        name: 'Inter',
        provider: 'google',
        weights: [300, 400, 500, 600, 700, 800],
        styles: ['normal', 'italic'],
        display: 'swap',
      },
    ],
  },

  vite: {
    plugins: [tailwindcss()],
  },

  runtimeConfig: {
    databaseUrl: process.env.POSTGRES_DB_URL,
  },

  colorMode: {
    preference: 'dark',
    fallback: 'dark',
  },

  ui: {
    theme: {
      colors: [
        'primary',
        'secondary',
        'tertiary',
        'info',
        'success',
        'warning',
        'error',
      ],
    },
  },
});
