import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import viteCompression from 'vite-plugin-compression'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    // 配置Gzip压缩
    viteCompression({
      verbose: true,  // 控制台显示压缩信息
      disable: false, // 不禁用压缩
      threshold: 5120,  // 大小超过5kb的文件才压缩
      algorithm: 'gzip',  // 压缩算法
      ext: '.gz',       // 压缩文件后缀
      deleteOriginFile: false  // 不删除源文件
    })
  ],
  base: '/personal-blog/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
