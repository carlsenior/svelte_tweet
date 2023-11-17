import { getProfileTweets } from '$root/utils/prisma.js'
import { json } from '@sveltejs/kit'


export async function GET({params}) {
    return json(await getProfileTweets(params.user))
}