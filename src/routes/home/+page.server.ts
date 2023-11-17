import { createTweet, deleteTweet, likeTweet } from '$root/utils/prisma.js'
import { error } from '@sveltejs/kit'


export async function load({fetch}) {
    const res = await fetch('/home')
    if (res.ok) return {
        tweets: await res.json()
    }
    throw error(500)
}

export const actions = {
    like_tweet:async ({request}) => {
        const form = await request.formData()
        const id = Number(form.get('id'))
        await likeTweet(id)
    },
    delete_tweet:async ({request}) => {
        const form = await request.formData()
        const tweet_id = Number(form.get('id'))
        await deleteTweet(tweet_id)
    },
    create_tweet: async ({request}) => {
        const form = await request.formData()
        const tweet = String(form.get('tweet'))

        if (tweet.length > 140) {
            throw error(400, 'Maximum Tweet length exceeded.')
        }

        await createTweet(tweet)
    }
}

