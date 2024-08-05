<script lang="ts">
	import { enhance } from "$app/forms";
	import type { ActionData, PageData } from "./$types";
	import { onMount } from "svelte";
  
	export let form: ActionData;
	export let data: PageData;
	let showTextInput = false;
	let showPasswordInput = false;
	let confirmationText = "";
	let newPassword = "";
  
	const handleNukeClick = () => {
	  showTextInput = true;
	};
  
	const handleConfirmationSubmit = (event: any) => {
	  event.preventDefault();
	  if (confirmationText === "NUKE") {
		showPasswordInput = true;
	  }
	};
  
	onMount(() => {
	  if (form?.message || form?.error) {
		showTextInput = false;
		showPasswordInput = false;
	  }
	});
  </script>
  
  <svelte:head>
	<title>Account</title>
  </svelte:head>
  
  <h1>Account</h1>
  
  <form action="?/name" method="POST" autocomplete="off" use:enhance class="update-form">
	<div>
	  <label for="name_input">Name</label>
	  <input type="text" id="name_input" name="name" value={data.name} />
	</div>
	<button aria-label="update name">Update</button>
  </form>
  
  <form action="?/email" method="POST" autocomplete="off" use:enhance class="update-form">
	<div>
	  <label for="email_input">Email</label>
	  <input type="email" id="email_input" name="email" value={data.email} />
	</div>
	<button aria-label="update email">Update</button>
  </form>
  
  {#if form?.message}
	<p class="success">{form.message}</p>
  {/if}
  
  {#if form?.error}
	<p class="error">{form.error}</p>
  {/if}
  
  <form action="/logout" method="POST" class="logout-form">
	<button>Logout</button>
  </form>
  
  <div class="danger">!!!DANGER ZONE!!!</div>
  
  {#if showPasswordInput}
	<form class="form-container" action="?/NUKE" method="POST" use:enhance>
	  <input type="hidden" name="confirmation" value={confirmationText} />
	  <input type="password" name="new_password" bind:value={newPassword} placeholder="Enter new password" required />
	  <button class="nuke-button" type="submit">Confirm Nuke</button>
	</form>
  {:else if showTextInput}
	<form class="form-container" on:submit|preventDefault={handleConfirmationSubmit}>
	  <input type="text" name="confirmation" bind:value={confirmationText} placeholder="Type 'NUKE' to confirm" required />
	  <button class="nuke-button" type="submit">Confirm</button>
	</form>
  {:else}
	<div class="form-container">
	  <button class="nuke-button" type="button" on:click={handleNukeClick}>Nuke</button>
	</div>
  {/if}
  
  <div class="description">
	<h3>In the event of a data breach or if you suspect your account has been compromised, use this button to immediately clear all cookies, remove your user tag from our database, and log you out. You will be prompted to change your password and redirected to the login page. This action should only be used in emergencies to ensure your account's security.</h3>
  </div>
  
  <style>
	.update-form {
	  display: grid;
	  grid-template-columns: 1fr auto;
	  align-items: end;
	  gap: 1rem;
	}
  
	.logout-form {
	  margin-top: 1.5rem;
	}
  
	.form-container {
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  min-height: 200px;
	  padding: 1rem;
	  flex-direction: column;
	}
  
	.nuke-button {
	  background-color: red;
	  color: white;
	  border: none;
	  border-radius: 8px;
	  padding: 1rem 2rem;
	  font-size: 1.5rem;
	  font-weight: 600;
	  cursor: pointer;
	  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
	  transition: background-color 0.3s, transform 0.2s;
	}
  
	.nuke-button:hover {
	  background-color: darkred;
	}
  
	.nuke-button:active {
	  transform: scale(0.95);
	}
  
	.danger {
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  color: red;
	}
  
	.description {
	  background-color: #ffdddd; /* Light red background */
	  color: #d8000c; /* Dark red text */
	  border: 1px solid #d8000c; /* Dark red border */
	  padding: 1rem; /* Space around the text */
	  border-radius: 8px; /* Rounded corners */
	  font-weight: bold; /* Bold text */
	  font-size: 1.2rem; /* Larger font size for emphasis */
	  text-align: center; /* Center align the text */
	  margin: 1rem 0; /* Space above and below the element */
	  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Shadow for better visibility */
	}
  </style>
  