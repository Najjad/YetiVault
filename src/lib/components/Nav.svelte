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
	<div class="logo-container">
		<a href="https://github.com/najjad/yetivault" target="_blank">
			<img src="/YETIVAULTLOGO.png" alt="Yeti Vault Logo" />
		</a>
	</div>
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
	}

	.logo-container {
		position: absolute;
		top: -1.23rem;
		left: 3rem;
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
		margin: 0 auto; /* Center the links */
		padding: 0;
		width: 100%;
	}

	li {
		margin: 0;
	}

	a {
		text-decoration: none;
		color: inherit;
	}
</style>
