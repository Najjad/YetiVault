<script lang="ts">
    import type { PageData } from "./$types";

    export let data: PageData;
    
    let showBreachInfo = data.breachData.success;

    function ignoreBreachInfo() {
        showBreachInfo = false;
    }

    const successful = data.breachData.success;
    console.log(successful);
</script>

<svelte:head>
    <title>Dashboard</title>
</svelte:head>

<h1>Dashboard</h1>

<p>This is your dashboard, {data.name}.</p>

{#if showBreachInfo}
    <div class="breach-alert">
        <h2>Your email has appeared in a data breach!</h2>
        <p>Please look below and confirm your email is safe on these sites:</p>
        <ul class="breach-list">
            {#each data.breachData.sources as source}
                <li>
                    <img src={source.favicon} alt="favicon" class="favicon" />
                    <strong>{source.name}</strong> - <em>{new Date(source.date).toLocaleDateString()}</em>
                </li>
            {/each}
        </ul>
        <h2>These data fields have been compromised:</h2>
        <ul class="compromised-fields">
            {#each data.breachData.fields as field}
                <li>{field}</li>
            {/each}
        </ul>

        <h2>What exactly does this mean, and what can you do?</h2>
        <p>Data breaches can happen for various reasons, often as a result of harmless data scraping. While this can be annoying, it isn't the end of the world.</p>
        <p>Some breaches might have occurred many years ago, and your information could have been changed since then.</p>
        <p>Your best course of action is to change your password on sites where the breach is recent and not related to scraping.</p>
        <p>The compromised fields shown above tell you what information was leaked.</p>

        <button class="ignore-button" on:click={ignoreBreachInfo}>Ignore</button>
    </div>
{:else}
    <h2>Your email has not appeared in a known data breach, you're safe for now...</h2>
{/if}

<img src="/YETIVAULTLOGO.png" alt="Yeti Vault Logo" />

<style>
    .breach-alert {
        background-color: #f8d7da;
        color: #721c24;
        border: 1px solid #f5c6cb;
        border-radius: 5px;
        padding: 1rem;
        margin-top: 1rem;
        position: relative;
    }
    .breach-list, .compromised-fields {
        list-style-type: none;
        padding: 0;
    }
    .breach-list li, .compromised-fields li {
        background: #f1f1f1;
        margin: 0.5rem 0;
        padding: 0.5rem;
        border-radius: 3px;
        display: flex;
        align-items: center;
    }
    .breach-list li strong {
        color: #d9534f;
        margin-left: 0.5rem;
    }
    .compromised-fields li {
        background: #fff3cd;
        color: #856404;
    }
    .favicon {
        width: 16px;
        height: 16px;
        margin-right: 0.5rem;
    }
    .ignore-button {
        background-color: #007bff;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        cursor: pointer;
        position: absolute;
        bottom: 1rem;
        right: 1rem;
    }
    .ignore-button:hover {
        background-color: #0056b3;
    }
    img {
        display: block;
        max-width: 100%;
        margin-top: 1rem;
    }
</style>
