import { defineConfig } from 'vite'
import { pluginHonoDeno } from './plugin/mod.ts'

export default defineConfig({
  plugins: [
    pluginHonoDeno()
  ]
})
