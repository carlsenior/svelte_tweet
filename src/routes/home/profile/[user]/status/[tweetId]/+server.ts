import { getPermalinkTweet } from '$root/utils/prisma.js'
import { error, json } from '@sveltejs/kit'

export async function GET({params}) {
    return json(await getPermalinkTweet(+params.user, +params.tweetId))
}