import { PrismaClient } from '@prisma/client'
import { error } from '@sveltejs/kit'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

TimeAgo.addDefaultLocale(en)
const prisma = new PrismaClient()
const timeAgo = new TimeAgo('en-US')

export async function createTweet(content: string) {
    const new_tweet = await prisma.tweet.create({
        data: {
            posted: new Date(),
            url: Math.random().toString(16).slice(2),
            content: content,
            user: {
                connect: {id : 1}
            }
        }
    })

    return new_tweet
}

export async function deleteTweet(t_id: number) {
    await prisma.tweet.delete({
        where: {id: t_id }
    })
}


export async function likeTweet(t_id: number) {
    const tweet = await prisma.tweet.findFirstOrThrow({
        where: {id: t_id},
        include: {user: true, liked: true}
    })
    const isLiked = tweet.liked.filter(l => l.userId == 1); // mock user to first user
    if (isLiked.length == 0) {
        await prisma.liked.create({
            data: {
                tweetId: t_id,
                userId: 1
            }
        })
    } else {
        await prisma.liked.deleteMany({
            where: {
                tweetId: t_id,
                userId: 1
            }
        })
    }
}

export async function getPermalinkTweet(u_id: number, t_id: number) {
    const tweet = await prisma.tweet.findFirst({
        where: {id: t_id},
        include: {user: true, liked: true}
    })

    if (!tweet)
        throw error(404, 'Tweet not found')
    
    return {
        id: tweet.id,
        content: tweet.content,
        posted: timeAgo.format(tweet.posted),
        url: tweet.url,
        user: tweet.user,
        liked: tweet.liked
    }
}

export async function getProfileTweets(id:string) {
    const user = await prisma.user.findFirst({
        where: {
            id: +id
        },
    })

    if (!user)
        throw error(500, 'User not found')

    const _tweets = await prisma.tweet.findMany({
        where: {
            userId: +id
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
            userId: +id
        },
    })

    return {
        user,
        tweets,
        likes
    }
}


export async function getAllTweets() {
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