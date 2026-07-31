// https://astro.build/config
process.env.SHARP_CONCURRENCY = '1';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { VitePWA } from 'vite-plugin-pwa';

const SITE_URL = process.env.PUBLIC_SITE_URL || 'https://sydoryk.com/';
export default defineConfig({
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  markdown: {
    shikiConfig: {
    theme: "github-dark",
    wrap: true,
    }
  },
  envPrefix: 'PUBLIC_',
  site: SITE_URL,
  integrations: [sitemap()],
  css: {
    preprocessorOptions: {
      sass: {
        api: "modern",
      },
    },
  },
  vite: {
    plugins: [
      VitePWA({
        registerType: 'autoUpdate',
        injectRegister: 'auto',
        workbox: {
          navigateFallback: '/',
          runtimeCaching: [
            {
              urlPattern: ({ url }) =>
                url.pathname.startsWith('/assets/') && url.pathname.endsWith('.mp4'),
              handler: 'CacheFirst',
              options: {
                cacheName: 'video-cache',
                rangeRequests: true,
                expiration: {
                  maxEntries: 50,
                  maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
                },
              },
            },
          ],
        },
      }),
    ],
  },
})