/* import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}) */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as dotenv from 'dotenv';
import { resolve } from 'path';
import path from "path"

// Cargar el archivo .env dependiendo del entorno
export default defineConfig(({ mode }) => {
  const envFileName = `.env.${mode}`;
  dotenv.config({ path: resolve(__dirname, 'environments', envFileName) });

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});

