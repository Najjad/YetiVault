<svelte:head>
    <title>Welcome to YetiVault</title>
    <meta name="description" content="YetiVault: Secure and easy-to-use password management solution with encryption and breach monitoring.">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</svelte:head>

<style>
    html, body {
        height: 100%;
        margin: 0;
        padding: 0;
        font-family: Arial, sans-serif;
        background: linear-gradient(to right, #d0e6f0, #b4c8d8);
        color: #333;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }

    header {
        background: #1f2a38;
        color: #fff;
        padding: 1rem;
        width: 100%;
    }

    h1 {
        margin: 0;
        font-size: 2.5rem;
    }

    h2 {
        margin-top: 1rem;
        font-size: 2rem;
        color: #4a90e2; /* Color for the features header */
    }

    p {
        font-size: 1.2rem;
        line-height: 1.6;
        margin: 1rem 0;
    }

    a {
        color: #4a90e2;
        text-decoration: none;
        font-weight: bold;
    }

    a:hover {
        text-decoration: underline;
    }

    main {
        flex: 1; /* Allow the main section to expand and fill available space */
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        padding: 1rem;
    }

    .features {
        background: #fff;
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        width: 100%;
        max-width: 600px; /* Maintain a maximum width but center it */
        text-align: left;
        color: #4a90e2; /* Match the text color with the features header */
    }

    .features h2 {
        margin-bottom: 1rem;
    }

    .features ul {
        list-style-type: none;
        padding: 0;
    }

    .features li {
        background: #f4f6f9;
        margin: 0.5rem 0;
        padding: 0.75rem;
        border-radius: 4px;
    }

    .features li:nth-child(odd) {
        background: #e9f1f7;
    }

    footer {
        background: #1f2a38;
        color: #fff;
        padding: 1rem;
        font-size: 0.9rem;
        width: 100%;
    }
</style>

<header>
    <h1>Welcome to YetiVault!</h1>
    <p>Your ultimate password management solution.</p>
</header>

<main>
    <div class="features">
        <h2>Features:</h2>
        <ul>
            <li>Secure password storage with a master password</li>
            <li>Edit and delete passwords easily</li>
            <li>Dashboard to check if your passwords are compromised</li>
            <li>All data is encrypted for maximum security</li>
            <li>Easy-to-use interface with modern design</li>
        </ul>
    </div>
</main>

<footer>
    <p>Check out the code on our <a href="https://github.com/Najjad/YetiVault" target="_blank">GitHub</a>.</p>
</footer>
