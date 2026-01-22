<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.ico?url';
	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
{@render children()}
