// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   base: process.env.NODE_ENV === 'production'
//     ? '/creatorverse-app/'
//     : '/',
//   plugins: [react()],
// });

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/CREATOR/creatorverse-app/',   // <-- IMPORTANT
})
