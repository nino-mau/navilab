import { fileURLToPath } from 'url';

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
    'nuxt-lucide-icons'
  ],

  runtimeConfig: {
    databaseUrl: process.env.POSTGRES_DB_URL,
    public: {
      betterAuthUrl: process.env.BETTER_AUTH_URL,
      avatarPlaceholderUrl: process.env.AVATAR_PLACEHOLDER_URL
    }
  },

  app: {
    layoutTransition: { name: 'layout', mode: 'out-in' },
    pageTransition: { name: 'page', mode: 'out-in' }
  },

  // Aliases
  alias: {
    '@services': fileURLToPath(new URL('./server/models/', import.meta.url)),
    '@server': fileURLToPath(new URL('./server/', import.meta.url))
  },

  fonts: {
    defaults: {
      weights: [300, 400, 500, 600, 700, 800, 900],
      styles: ['normal', 'italic']
    },
    families: [
      {
        name: 'Inter',
        provider: 'google',
        weights: [300, 400, 500, 600, 700, 800],
        styles: ['normal', 'italic'],
        display: 'swap'
      }
    ]
  },

  colorMode: {
    preference: 'light',
    fallback: 'light'
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
        'error'
      ]
    }
  }
});
