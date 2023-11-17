<script lang="ts">
    import { fly, fade } from 'svelte/transition'
    import Icon from '$lib/icon.svelte'
    import type { TweetType } from '$lib/types/tweet_type'
	import { enhance } from '$app/forms'

    export let tweet: TweetType
</script>


<article class="tweet-container" transition:fade>
    <a class="avatar" href="/home/profile/{tweet.user.name}">
        <img src="{tweet.user.avatar}" alt="{tweet.user.name}" />
    </a>
    <div class="tweet-details">
        <div>
            <a href="/home/profile/{tweet.user.name}" class="user">
                {tweet.user.name}
            </a>
            <span class="handle">{tweet.user.handle}</span>
            <span class="posted"> • {tweet.posted}</span>
        </div>

        <div class="tweet">
            <div class="content">
                {tweet.content}
            </div>

            <div class="actions">
                <form action="/home?/like_tweet" method="post" use:enhance>
                    <input type="hidden" name="id" value="{tweet.id}" />
                    <button class="btn like" title="like" type="submit">
                        <div class="circle">
                            <Icon width="24" height="24" name="like" class="{tweet.liked.length > 0 ? 'liked' : ''}" />
                        </div>                        
                        <span class="count">
							<!-- {#key tweet.liked.length } -->
								{#if tweet.liked.length > 0}
									<div in:fly={{ y:40 }} out:fly={{ y:40 }}>
										{tweet.liked.length}
									</div>
								{/if}
							<!-- {/key} -->
                        </span>
                    </button>
                </form>

                <a href="/home/profile/{tweet.user.id}/status/{tweet.id}" class="permalink" title="Permalink">
                    <div class="circle">
                        <Icon width="24" height="24" name="permalink" />
                    </div>
                </a>

                <form action="/home?/delete_tweet" method="post" use:enhance>
                    <input type="hidden" name="id" value={tweet.id} />
                    <button type="submit" aria-label="Remove tweet" class="btn remove" title="Remove">
                        <div class="circle">
                            <Icon width="24" height="24" name="remove" />
                        </div>
                    </button>
                </form>
            </div>
        </div>
    </div>
</article>

<style>
	.avatar {
		align-self: start;
	}

	img {
		width: 48px;
		height: 48px;
		border-radius: 50%;
	}

	button {
		font-size: var(--font-16);
		padding: var(--spacing-16);
	}

	.tweet-container:hover {
		background-color: var(--color-bg-secondary);
	}

	.tweet-container {
		display: grid;
		grid-template-columns: min-content 1fr;
		gap: var(--spacing-16);
		padding: var(--spacing-16) var(--spacing-24);
		transition: all 0.3s;
	}

	.tweet-container:not(:last-child) {
		border-bottom: 1px solid var(--color-border-primary);
	}

	.tweet-details {
		display: grid;
		gap: var(--spacing-8);
	}

	.user {
		font-weight: 700;
		text-transform: capitalize;
	}

	.user:hover {
		text-decoration: underline;
	}

	.handle,
	.posted {
		font-size: var(--font-16);
		color: var(--color-text-muted);
	}

	.content {
		font-size: var(--font-16);
	}

	.actions {
		display: flex;
		gap: var(--spacing-32);
		margin-top: var(--spacing-16);
	}

	.actions button,
	.actions a {
		padding: 0;
		color: var(--color-text-muted);
		background: none;
		transition: all 0.3s;
	}

	.circle {
		width: 24px;
		height: 24px;
		display: grid;
		place-content: center;
		padding: var(--spacing-16);
		border-radius: 50%;
		transition: all 0.3s;
	}

	.circle > :global(.liked) {
		color: hsl(9 100% 64%);
		fill: hsl(9 100% 64%);
	}

	.like {
		display: flex;
		align-items: center;
	}

	.like:hover {
		color: hsl(9 100% 64%);
	}

	.like:hover .circle {
		background: hsla(9 100% 64% / 10%);
	}

	.permalink:hover {
		color: hsl(120 100% 40%);
	}

	.permalink:hover .circle {
		background-color: hsla(120 100% 50% / 4%);
	}

	.remove:hover {
		color: hsl(0 100% 50%);
	}

	.remove:hover .circle {
		background-color: hsla(0 100% 50% / 4%);
	}

	.like,
	.remove,
	.permalink {
		width: 80px;
	}

	.count {
		margin-left: var(--spacing-16);
		font-size: 1.4rem;
		font-weight: 400;
		overflow: hidden;
	}
</style>