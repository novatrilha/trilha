import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

const config = {
	preprocess: preprocess(),

	kit: {
		adapter: adapter({
			fallback: 'index.html'
		}),
	}
};

export default config;
