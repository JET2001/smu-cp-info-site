import { defineConfig } from 'vite'
import { resolve } from 'path'


export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        members: resolve(__dirname, 'members/index.html'),
        trainings: resolve(__dirname, 'trainings/index.html')
      },
    },
  },
})