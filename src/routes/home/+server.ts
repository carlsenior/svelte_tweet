import { json, error } from '@sveltejs/kit'
import { getAllTweets } from '$root/utils/prisma'


export async function GET() {
    return json(await getAllTweets())
}