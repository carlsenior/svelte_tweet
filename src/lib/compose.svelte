<script lang="ts">
	import { enhance } from "$app/forms"

    let tweet = ''
    let maxCharacter = 140
    $: characterLeft = maxCharacter - tweet.length
</script>

<div class="compose">
    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=none" alt="Avatar" />
    <form action="?/create_tweet" method="post" autocomplete="off" use:enhance>
        <input type="text" aria-label="Enter your tweet" bind:value={tweet} name="tweet" placeholder="What's your hot take?" />
        <button type="submit" class="btn" class:error={characterLeft < 0} disabled={tweet.length == 0 || characterLeft <= 0}>
            {characterLeft == maxCharacter ? 'Tweet' : characterLeft} 
        </button>
    </form>
</div>


<style>
	.compose {
		display: grid;
		grid-template-columns: min-content 1fr;
		align-items: center;
		gap: var(--spacing-16);
		padding: var(--spacing-16) var(--spacing-24);
		border-bottom: 1px solid var(--color-border-primary);
	}

	img {
		width: 48px;
		height: 48px;
		border-radius: 50%;
	}

	form {
		display: flex;
		align-items: center;
		gap: var(--spacing-16);
	}

	input {
		color: var(--color-text-primary);
		background-color: transparent;
	}

	button {
		min-width: 80px;
		font-size: var(--font-16);
		padding: var(--spacing-16);
	}

	.error {
		color: tomato;
	}
</style>