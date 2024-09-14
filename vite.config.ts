import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
	plugins: [
		react(),
		nodePolyfills({
			include: ['path', 'stream', 'util'],
			exclude: ['http'],
			globals: {
				Buffer: true,
				global: true,
				process: true,
			},
			overrides: {
				fs: 'memfs',
			},
			protocolImports: true,
		}),
	],
	server: {
		open: true,
		port: 3000,
	},
	css: {
		devSourcemap: true,
		preprocessorOptions: {
			scss: {
				additionalData: `@import "src/scss/common/vars.scss";`,
			},
		},
	},
	build: {
		sourcemap: true,
		rollupOptions: {
			output: {
				assetFileNames: (assetInfo) => {
					const extType = assetInfo.name?.split('.').pop()?.toLowerCase() || '';

					if (/png|jpe?g|gif|tiff|bmp|ico/i.test(extType)) {
						return 'assets/img/[name][extname]';
					}

					if (/ttf|otf|woff|woff2/i.test(extType)) {
						return 'assets/fonts/[name][extname]';
					}

					if (extType === 'svg' && /svg/.test(assetInfo.name || '')) {
						return 'assets/svg/[name][extname]';
					}

					if (extType === 'svg') {
						return 'assets/img/[name][extname]';
					}

					return 'assets/[name][extname]';
				},
			},
		},
	},
	base: '/'
})