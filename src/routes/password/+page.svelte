<script lang="ts">
    import { onMount } from 'svelte';
    let email: string = '';
    let password: string = '';
    let error: string | null = null;
    let message: string | null = null;
    let masterpass: string;

    export let data: { passwords: { email: string, password: string, createdAt: string }[], error?: string, message?: string };

    onMount(() => {
        if (data.error) {
            error = data.error;
        }
        if (data.message) {
            message = data.message;
        }
    });

    let visible = true;

    function toggleVisible() {
        visible = !visible;
    }

    import { enhance } from "$app/forms";
	import type { ActionData } from "./$types";

	//export let form: ActionData;
</script>

<main>
    <button on:click={toggleVisible}>
        Hide
    </button>

    {#if visible}
    <h1>Password Management</h1>
    <form method="POST">
        
        <div>
            <label for="password">Input password to add:</label>
            <input type="password" id="password" name="password" bind:value={password} required>
        </div>
        <button type="submit">Submit</button>
    </form>
    {#if error}
        <p style="color: red;">{error}</p>
    {/if}
    {#if message}
        <p style="color: green;">{message}</p>
    {/if}

    <h2>Saved Passwords</h2>
    <ul>
        {#each data.passwords as password}
            <li>
                <strong>Password:</strong> {password.password} <br>
                <strong>Created At:</strong> {new Date(password.createdAt).toLocaleString()}
            </li>
        {/each}
    </ul>
    {/if}
</main>
