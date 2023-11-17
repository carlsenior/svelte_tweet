import { PrismaClient } from '@prisma/client'
import { error, json, redirect } from '@sveltejs/kit'


const prisma = new PrismaClient()

export async function load({fetch}) {
    const res = await fetch('/api')
    if (res.ok) return {
        tweets: await res.json()
    }
    throw error(500)
}

export const actions = {
    like_tweet:async ({request}) => {
        const form = await request.formData()
        const id = Number(form.get('id'))
        const tweet = await prisma.tweet.findFirstOrThrow({
            where: {id: id},
            include: {user: true, liked: true}
        })
        const isLiked = tweet.liked.filter(l => l.userId == 1); // mock user to first user
        if (isLiked.length == 0) {
            await prisma.liked.create({
                data: {
                    tweetId: id,
                    userId: 1
                }
            })
        } else {
            await prisma.liked.deleteMany({
                where: {
                    tweetId: id,
                    userId: 1
                }
            })
        }
    },
    delete_tweet:async ({request}) => {
        const form = await request.formData()
        const tweet_id = Number(form.get('id'))
        const res = await prisma.tweet.delete({
            where: {id: tweet_id }
        })
    },
    create_tweet: async ({request}) => {
        const form = await request.formData()
        const tweet = String(form.get('tweet'))

        if (tweet.length > 140) {
            throw error(400, 'Maximum Tweet length exceeded.')
        }

        const new_tweet = await prisma.tweet.create({
            data: {
                posted: new Date(),
                url: Math.random().toString(16).slice(2),
                content: tweet,
                user: {
                    connect: {id : 1}
                }
            }
        })
    }
}

