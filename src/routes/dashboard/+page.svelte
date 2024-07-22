<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData;

	const successful = data.breachData.success
	console.log(successful)
</script>

<svelte:head>
	<title>Dashboard</title>
</svelte:head>

<h1>Dashboard</h1>

<p>This is your dashboard, {data.name}.</p>

{#if data.breachData.success}
	<h1>Breach Data</h1>
	<h2>Your email has appeared in a data breach! Please look below and confirm your email is safe on these sites</h2>
	<pre>{JSON.stringify(data.breachData.sources, null, 2)}</pre>

	<h2>These data fields have been compromised</h2>
	<pre>{JSON.stringify(data.breachData.fields, null, 2)}</pre>
{:else}
	<h2>Your email has not appeared in a known data breach, you're safe for now...</h2>
{/if}
<img src="/YETIVAULTLOGO.png" alt="Yeti Vault Logo" />

<style>
	img {
		display: block;
		max-width: 100%;
		margin-top: 1rem;
	}
</style>
