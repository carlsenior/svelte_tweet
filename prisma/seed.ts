import PrismaClientPkg from '@prisma/client'

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


function getUsers() {
    return [
        {
            name: 'matia',
            handle: '@joyofcodedev',
            email: 'matia@example.test',
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=matia`,
            about: 'Likes long walks on the beach. 😘',
            tweets: {
                create: [
                    {
                        url: randomUrl(),
                        posted: randomDate(),
                        content: 'SvelteKit is lit. 💥',
                        liked: {
                            create: [
                                {
                                    userId: 2
                                }
                            ]
                        }
                    },
                    {
                        url: randomUrl(),
                        posted: randomDate(),
                        content: 'I love SvelteKit! ❤',
                    },
                    {
                        url: randomUrl(),
                        posted: randomDate(),
                        content: 'Sometimes when I\'m writing JavaScript I want to throw up my hands and say "this is crazy!" but I can\'t remember what "this" refers to. 🤪',
                    },
                    {
                        url: randomUrl(),
                        posted: randomDate(),
                        content: 'How do you comfort a JavaScript bug? You console it. 😚',
                    }
                ]
            }
        },
        {
            name: 'bob',
            handle: '@bobross',
            email: 'bob@example.test',
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=bob`,
            about: 'Likes painting.',
            tweets: {
                create: [
                    {
                        url: randomUrl(),
                        posted: randomDate(),
                        content: `Use your imagination. Wind it up, blend it together. The joy of painting really is universal.`,
                    },
                    {
                        url: randomUrl(),
                        posted: randomDate(),
                        content: `The only thing I have control over is taking out the trash. 😂`,
                    },
                    {
                        url: randomUrl(),
                        posted: randomDate(),
                        content:
                            'Painting is as individual as people are. 👩‍🎨',
                    },
                    {
                        url: randomUrl(),
                        posted: randomDate(),
                        content:
                            'All we do is just sorta have an idea in our mind, and we just sorta let it happen. 🌈',
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