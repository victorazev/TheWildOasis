/* eslint-disable no-undef */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), eslint()],
	define: {
		'process.env.VITE_SUPABASE_KEY': JSON.stringify(
			process.env.VITE_SUPABASE_KEY,
		),
	},
});
