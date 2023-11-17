import { json, error } from '@sveltejs/kit'
import { PrismaClient } from '@prisma/client'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

TimeAgo.addDefaultLocale(en)
const prisma = new PrismaClient()
const timeAgo = new TimeAgo('en-US')

const getItems = async () => {
    const items = await prisma.tweet.findMany({
        include: {user: true, liked: true},
        orderBy: {posted: 'desc'}
    })

    const tweets = items.map(tweet => {
        return {
            id: tweet.id,
            content: tweet.content,
            posted: timeAgo.format(tweet.posted),
            url: tweet.url,
            user: tweet.user,
            liked: tweet.liked
        }
    })

    return tweets
}

export async function GET() {
    return json(await getItems())
}