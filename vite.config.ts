import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react(),],
  resolve: {
    alias: [
      { find: '@', replacement: '/src' },
      { find: '@layut', replacement: '/src/layout' },
      { find: '@ui', replacement: '/src/components/ui' },
      { find: '@components', replacement: '/src/components' },
      { find: '@pages', replacement: '/src/pages' },
      { find: '@assets', replacement: '/src/assets' },
      { find: '@router', replacement: '/src/router' },
      { find: '@validations', replacement: '/src/validations' },
      { find: '@modals', replacement: '/src/components/modals' },


      { find: '@coocse', replacement: '/src/utils/cocies.ts' },
      {find: "@service-auth" , replacement: "/src/service/auth"},
      { find: '@globol-interface', replacement: '/src/types/globol-interface' },

      { find: '@category', replacement: '/src/service/category' },
      { find: '@sub-category', replacement: '/src/service/sub-category' },
      { find: '@brand', replacement: '/src/service/brand' },
      { find: '@brand-category', replacement: '/src/service/brand-category' },
      { find: '@product', replacement: '/src/service/product' },
      { find: '@stock', replacement: '/src/service/stock' },
      { find: '@banner', replacement: '/src/service/banner' },





      { find: '@stor-category', replacement: '/src/stor/stor-category'},
      { find: '@store-sub-category', replacement: '/src/stor/stor-sub-category'},
      { find: '@store-brand', replacement: '/src/stor/stor-brand'},
      { find: '@store-brand-category', replacement: '/src/stor/stor-brand-category'},
      { find: '@store-product', replacement: '/src/stor/stor-product'},
      { find: '@store-stock', replacement: '/src/stor/stor-stock'},
      { find: '@store-banner', replacement: '/src/stor/stor-banner'},


    ]
  }
})
