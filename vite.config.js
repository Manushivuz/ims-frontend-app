import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '^/(api|user|leave|attendance|task|project|chat|send|get|delete|update|accept|allusers|interns|batches|weeklystatus|dashboard|hr|deletetasksubmition|getsubmitedtasks|assign-intern|available-interns|intern-rankings)': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
