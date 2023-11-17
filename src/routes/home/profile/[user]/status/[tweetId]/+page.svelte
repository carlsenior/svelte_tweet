<script lang="ts">
    import Tweet from '$lib/tweet.svelte'


	export let data

    $: tweet = data.tweet
    const content = data.tweet.content.slice(0, 60)
</script>

<svelte:head>
	<title>{tweet.user.name} on Twittr: "{content}..."</title>
</svelte:head>

<Tweet {tweet} />