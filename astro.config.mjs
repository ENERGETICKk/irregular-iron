import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless'; // O import vercel from '@astrojs/vercel';

export default defineConfig({
  // 'server' es para SSR (formularios, APIs, etc)
  output: 'server', 
  
  // Usamos el adaptador de Vercel
  adapter: vercel(),
});