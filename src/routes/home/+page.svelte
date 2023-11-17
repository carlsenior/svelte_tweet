<script lang="ts">
    import type { TweetType } from '$root/lib/types/tweet_type'
    import Tweet from '$lib/tweet.svelte'
    import Compose from '$lib/compose.svelte';

    export let data
    $: tweets = data.tweets
</script>

<svelte:head>
    <title>Home</title>
</svelte:head>

<h1>Feed</h1>

<Compose />


{#each tweets as tweet, i (tweet.id)}
    <Tweet {tweet} />
{/each}


<style>
    h1 {
        position: sticky;
        top: 0;
        padding: var(--spacing-4) var(--spacing-24);
        font-size: var(--font-24);
        backdrop-filter: blur(8px);
    }
</style>