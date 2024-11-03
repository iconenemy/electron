import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    resolve: {
      alias: {
        '@shared': resolve('src/shared'),
        '@main/lib': resolve('src/main/lib')
      }
    }
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
    resolve: {
      alias: {
        '@shared': resolve('src/shared')
      }
    }
  },
  renderer: {
    assetsInclude: 'src/renderer/assets/**',
    resolve: {
      alias: {
        '@shared': resolve('src/shared'),
        '@renderer': resolve('src/renderer/src'),
        '@renderer/ui/*': resolve('src/renderer/src/ui/*'),
        '@renderer/store': resolve('src/renderer/src/store'),
        '@renderer/pages': resolve('src/renderer/src/pages'),
        '@renderer/utils/*': resolve('src/renderer/src/utils/*'),
        '@renderer/components': resolve('src/renderer/src/components')
      }
    },
    plugins: [react()]
  }
})
