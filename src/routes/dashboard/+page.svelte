<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<svelte:head>
	<title>Dashboard</title>
</svelte:head>

<h1>Dashboard</h1>

<p>This is your dashboard, {data.name}.</p>

{#if data.breachData}
	<h2>Breach Data</h2>
	<pre>{JSON.stringify(data.breachData, null, 2)}</pre>
{:else}
	<p>No breach data available.</p>
{/if}

<img src="/YETIVAULTLOGO.png" alt="Yeti Vault Logo" />

<style>
	img {
		display: block;
		max-width: 100%;
		margin-top: 1rem;
	}
</style>
