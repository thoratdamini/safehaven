import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    port:3002
  },

  plugins: [
    react(),
    VitePWA({
      registerType:"autoUpdate",
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "Safe-Haven",
        short_name: "safehaven",
        start_url: "./",
        display: "standalone",
        background_color: "#fff",
        description: "A Refugee App.",
        theme_color: "#ffffff",
        icons: [
          {
            src: "public/images/SafeHaven__3_-removebg-preview.png",
            sizes: "64x64",
            type: "image/png",
          },
          {
            src: "public/images/SafeHaven__3_-removebg-preview.png",
            sizes: "168x168",
            type: "image/png",
          },
          {
            src: "public/images/SafeHaven__3_-removebg-preview.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});

