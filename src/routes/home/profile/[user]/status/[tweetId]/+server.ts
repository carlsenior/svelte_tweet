import { PrismaClient } from '@prisma/client'
import { error, json } from '@sveltejs/kit'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

// TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')

const prisma = new PrismaClient()

export async function GET({params}) {
    const tweet = await prisma.tweet.findFirst({
        where: {id: +params.tweetId},
        include: {user: true, liked: true}
    })

    if (!tweet)
        throw error(404, 'Tweet not found')
    
    return json({
        id: tweet.id,
        content: tweet.content,
        posted: timeAgo.format(tweet.posted),
        url: tweet.url,
        user: tweet.user,
        liked: tweet.liked
    })
}