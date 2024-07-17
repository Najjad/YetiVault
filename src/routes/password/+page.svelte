<script lang="ts">
    import { onMount } from 'svelte';
    let email: string = '';
    let email_check: boolean = false;
    let website_check: boolean = false;
    let password: string = '';
    let website: string = '';
    let description: string = '';
    let app_check: boolean = false;
    let app: string = '';
    let error: string | null = null;
    let message: string | null = null;

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

    function handleCheckboxChange(type: string) {
        email_check = type === 'email';
        website_check = type === 'website';
        app_check = type === 'app';
    }
</script>

<style>
    .checkbox-container {
        text-align: left;
    }
</style>

<main>
    <button on:click={toggleVisible}>
        Hide
    </button>

    {#if visible}
    <h1>Password Management</h1>
    <form method="POST">
        <div class="checkbox-container">
            <label for="email-check">Email</label>
            <input type="checkbox" id="email-check" name="email-check" bind:checked={email_check} on:change={() => handleCheckboxChange('email')}>
        </div>
        <div class="checkbox-container">
            <label for="website-check">Website</label>
            <input type="checkbox" id="website-check" name="website-check" bind:checked={website_check} on:change={() => handleCheckboxChange('website')}>
        </div>
        <div class="checkbox-container">
            <label for="app-check">App</label>
            <input type="checkbox" id="app-check" name="app-check" bind:checked={app_check} on:change={() => handleCheckboxChange('app')}>
        </div>
        {#if website_check}
        <div>
            <label for="website">Enter Website</label>
            <input type="url" id="website" name="website" bind:value={website} required>
        </div>
        {/if}
        {#if email_check}
        <div>
            <label for="email">Email</label>
            <input type="email" id="email" name="email" bind:value={email} required>
        </div>
        {/if}
        {#if app_check}
        <div>
            <label for="app">App name</label>
            <input type="text" id="app" name="app" bind:value={app} required>
        </div>
        {/if}
        <div>
            <label for="description">Password Description (what is the password for?)</label>
            <input type="text" id="description" name="description" bind:value={description} required>
        </div>
        <div>
            <label for="password">Enter Password</label>
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