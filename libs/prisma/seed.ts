/**
 * Adds seed data to your db
 *
 * @link https://www.prisma.io/docs/guides/database/seed-database
 */
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const user = await prisma.user.upsert({
        where: {
            id: 1,
        },
        create: {
            id: 1,
            email: 'test@test.com',
            name: 'Tester',
        },
        update: {},
    });
    const post = await prisma.post.upsert({
        where: {
            id: 1,
        },
        create: {
            id: 1,
            title: 'Test Post',
            content: 'Test Content',
            published: false,
            authorId: 1
        },
        update: {},
    });
    console.log({user, post})
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
