/// <reference types="vite/client" />

// SVG imports
declare module '*.svg' {
	const content: string;
	export default content;
}

declare module '*.svg?component' {
	import type { ComponentType, SvelteComponent } from 'svelte';
	const component: ComponentType<SvelteComponent>;
	export default component;
}

declare module '*.svg?src' {
	const content: string;
	export default content;
}

declare module '*.svg?url' {
	const content: string;
	export default content;
}

// Svelte component imports
declare module '*.svelte' {
	import type { ComponentType, SvelteComponent } from 'svelte';
	const component: ComponentType<SvelteComponent>;
	export default component;
}
