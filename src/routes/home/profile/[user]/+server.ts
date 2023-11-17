import { PrismaClient } from '@prisma/client'
import { error, json } from '@sveltejs/kit'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

// TimeAgo.addDefaultLocale(en)
const prisma = new PrismaClient()
const timeAgo = new TimeAgo('en-US')

export async function GET({params}) {

    const user = await prisma.user.findFirst({
        where: {
            id: +params.user
        },
    })

    if (!user)
        throw error(500, 'User not found')

    const _tweets = await prisma.tweet.findMany({
        where: {
            userId: +params.user
        },
        include: {
            user: true, liked: true
        },
        orderBy: {
            posted: 'desc'
        }
    })

    const tweets = _tweets.map(t => {
        return {
            id: t.id,
            content: t.content,
            posted: timeAgo.format(t.posted),
            url: t.url,
            user: t.user,
            liked: t.liked
        }
    })

    const likes = await prisma.liked.findMany({
        where: {
            userId: +params.user
        },
    })

    return json({
        user,
        tweets,
        likes
    })
}