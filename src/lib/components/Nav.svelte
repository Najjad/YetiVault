<script lang="ts">
	import { page } from "$app/stores";

	export let logged_in = false;

	type link = {
		path: string;
		text: string;
		protected: boolean;
	};

	const links: link[] = [
		{
			path: "/",
			text: "Home",
			protected: false
		},
		{
			path: "/dashboard",
			text: "Dashboard",
			protected: true
		},
		{
			path: "/account",
			text: "Account",
			protected: true
		},
		{
			path: "/password",
			text: "Password Editor",
			protected: true
		},
		{
			path: "/register",
			text: "Register",
			protected: false
		},
		{
			path: "/login",
			text: "Login",
			protected: false
		}
	];
</script>

<nav>
	<ul>
		{#each links as link}
			{#if link.path === "/" || logged_in === link.protected}
				{@const aria_current = $page.url.pathname == link.path ? "page" : "false"}
				<li>
					<a href={link.path} aria-current={aria_current}>
						{link.text}
					</a>
				</li>
			{/if}
		{/each}
	</ul>
</nav>

<style>
	nav {
		padding-block: 1.25rem;
		background-color: var(--nav-color);
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: relative; /* Added relative positioning for logo-container */
	}

	.logo-container {
		position: absolute;
		top: 0.1rem; /* Adjusted top position */
		left: 1rem; /* Adjusted left position */
	}

	.logo-container img {
		width: 150px; /* Adjust this size as needed */
		height: auto;
		border-radius: 50%;
	}

	ul {
		list-style-type: none;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 1.25rem;
		margin: 0;
		padding: 0;
		width: 100%;
	}

	li {
		margin: 0;
	}

	a {
		text-decoration: none;
		color: var(--font-color);
		padding: 0.5rem 1rem;
		border: 2px solid var(--primary-color); /* Border for each nav item */
		border-radius: 0.5rem;
		transition: background-color 0.3s, color 0.3s, border-color 0.3s;
	}

	a:hover,
	a:focus {
		background-color: var(--primary-color);
		color: #fff;
		border-color: var(--highlight-color);
	}
	
	a[aria-current="page"] {
		background-color: var(--highlight-color);
		color: #fff;
		border-color: var(--highlight-color);
	}
</style>
