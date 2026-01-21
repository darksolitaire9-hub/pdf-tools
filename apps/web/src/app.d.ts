// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

// Declare module for SVG imports
declare module '*.svg' {
	const content: string;
	export default content;
}

// Declare module for Svelte component imports in tests
declare module '*.svelte' {
	import type { ComponentType, SvelteComponent } from 'svelte';
	const component: ComponentType<SvelteComponent>;
	export default component;
}

export {};
