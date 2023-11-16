import PrismaClientPkg from '@prisma/client'
import { faker } from '@faker-js/faker'



const PrismaClient = PrismaClientPkg.PrismaClient
const prisma = new PrismaClient()

export function randomUrl(): string {
    return Math.random().toString(16).slice(2)
}

export function randomDate(): string {
    const offset = 24 * 60 * 60 * 1000 + 1
    const current = new Date().getTime()
    const random = Math.random() * offset;
    const difference = new Date(current - random)
    return difference.toISOString()
}

function getFaker() {
    const name = faker.person.fullName()
    return {
        name,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`
    }
}

function getUsers() {
    const faker1 = getFaker()
    const faker2 = getFaker()
    return [
        {
            name: faker1.name,
            handle: '@joyofcodedev',
            email: faker.internet.email(),
            avatar: faker1.avatar,
            about: 'Likes long walks on the beach. 😘',
            tweets: {
                create: [
                    {
                        url: randomUrl(),
                        posted: randomDate(),
                        content: 'SvelteKit is lit. 💥',
                        likes: 10
                    },
                    {
                        url: randomUrl(),
                        posted: randomDate(),
                        content: 'I love SvelteKit! ❤',
                        likes: 24
                    },
                    {
                        url: randomUrl(),
                        posted: randomDate(),
                        content: 'Sometimes when I\'m writing JavaScript I want to throw up my hands and say "this is crazy!" but I can\'t remember what "this" refers to. 🤪',
                        likes: 8
                    },
                    {
                        url: randomUrl(),
                        posted: randomDate(),
                        content: 'How do you comfort a JavaScript bug? You console it. 😚',
                        likes: 0
                    }
                ]
            }
        },
        {
            name: faker2.name,
            handle: '@bobross',
            email: faker.internet.email(),
            avatar: faker2.avatar,
            about: 'Likes painting.',
            tweets: {
                create: [
                    {
                        url: randomUrl(),
                        posted: randomDate(),
                        content: `Use your imagination. Wind it up, blend it together. The joy of painting really is universal.`,
                        likes: 1
                    },
                    {
                        url: randomUrl(),
                        posted: randomDate(),
                        content: `The only thing I have control over is taking out the trash. 😂`,
                        likes: 4
                    },
                    {
                        url: randomUrl(),
                        posted: randomDate(),
                        content:
                            'Painting is as individual as people are. 👩‍🎨',
                        likes: 0
                    },
                    {
                        url: randomUrl(),
                        posted: randomDate(),
                        content:
                            'All we do is just sorta have an idea in our mind, and we just sorta let it happen. 🌈',
                        likes: 10
                    }
                ]
            }
        }
    ]
}

async function seed() {
    const users = getUsers()
    for (const user of users) {
        await prisma.user.create({data: user})
    }
}

seed()