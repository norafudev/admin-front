import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      "/api": {
        //将以api为前缀的请求代理到target
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
})
