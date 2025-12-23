import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig(({ mode }) => {
  // eslint-disable-next-line no-undef
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    // Vite automatically exposes VITE_* prefixed variables via import.meta.env
    // No need to manually define them - they're available automatically
  };
});
