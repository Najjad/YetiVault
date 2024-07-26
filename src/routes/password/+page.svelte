<script lang="ts">
    import { onMount } from 'svelte';

    let email: string = '';
    let password: string = '';
    let service: Array<String>;
    let description: string = '';

    let website: string = '';
    let app: string = '';

    let error: string | null = null;
    let message: string | null = null;

    let email_check: boolean = false;
    let website_check: boolean = false;
    let app_check: boolean = false;

    export let data: {
        passwords: { email: string, password: string, createdAt: string, service: { name: string, type: string }, favicon?: string }[],
        error?: string,
        message?: string
    };

    export let isAuthenticated: boolean | undefined; // Adjust this to handle the expected type

    onMount(() => {
        if (data.error) {
            error = data.error;
        }
        
        if (data.message) {
            message = data.message;
        }

        if (isAuthenticated !== undefined) {
            console.log("Is Authenticated:", isAuthenticated);
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

    let passwordsVisibility = data.passwords.map(() => true);

    function togglePasswordVisibility(index: number) {
        passwordsVisibility[index] = !passwordsVisibility[index];
    }
</script>


<style>
    .checkbox-container {
        display: flex;
        align-items: center;
        vertical-align: middle;
    }
    .checkbox-container input[type="checkbox"] {
        margin-right: 300px; /* Adjust this value as needed */
        vertical-align: middle;
    }
    .password-item {
        margin-bottom: 1rem;
    }
    .password-item label {
        display: block;
        margin-bottom: 0.5rem;
    }
    .password-item input[type="text"] {
        margin-right: 1rem;
    }
    .favicon {
        margin-right: 5px;
    }
</style>

<main>
    <button on:click={toggleVisible}>
        {visible ? "Hide" : "Show"}
    </button>

    <form method="POST" action="?/masterForm">
        <div>
            <label for="master-input">Input Masterpassword</label>
            <input type="password" id="master-input" name="master-input">
        </div>
    </form>

    {#if visible}
    <h1>Password Management</h1>
    <form method="POST" action="?/passForm">
        <div class="checkbox-container">
            <label for="email-check">Email</label>
            <input type="checkbox" id="email-check" name="email-check" bind:checked={email_check} value="true" on:change={() => handleCheckboxChange('email')}>
        </div>
        <div class="checkbox-container">
            <label for="website-check">Website</label>
            <input type="checkbox" id="website-check" name="website-check" bind:checked={website_check} value="true" on:change={() => handleCheckboxChange('website')}>
        </div>
        <div class="checkbox-container">
            <label for="app-check">App</label>
            <input type="checkbox" id="app-check" name="app-check" bind:checked={app_check} value="true" on:change={() => handleCheckboxChange('app')}>
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
    {#each data.passwords as password, index}
    <div class="password-item">
        <label>
            {#if password.service.type === 'website' && password.favicon}
                <img src={password.favicon} alt="Favicon" class="favicon">
            {/if}
            {password.service.name} ({password.service.type})
        </label>
        <input type={passwordsVisibility[index] ? "password" : "text"} value={password.password} readonly>
        <button type="button" on:click={() => togglePasswordVisibility(index)}>
            {passwordsVisibility[index] ? "Show" : "Hide"}
        </button>
    </div>
    {/each}
    {/if}
</main>
