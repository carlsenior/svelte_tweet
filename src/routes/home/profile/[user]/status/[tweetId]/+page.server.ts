import { error } from "@sveltejs/kit"


export async function load({params, fetch}) {
    const res = await fetch(`/home/profile/${params.user}/status/${params.tweetId}`)
    if (!res.ok)
        throw error(500)
    return {
        tweet: await res.json()
    }
}