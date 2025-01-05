<script lang="ts">
	import Nav from "$lib/components/Nav.svelte";
	import "$lib/css/app.css";
	import type { LayoutData } from "./$types";
	export let data: LayoutData;
</script>

<Nav logged_in={!!data.name && !!data.email} />

<main>
	<slot />
</main>

<style>
    main {
        margin: 0 auto;
        padding: 1rem;
        width: 100%;
        max-width: 800px; /* Restrict the width of the main container */
        box-sizing: border-box; /* Ensures padding is included in width */
    }

    /* Optional: Add responsive design to handle smaller screens */
    @media (max-width: 768px) {
        main {
            max-width: 90%; /* Make the container responsive */
        }
    }
</style>
