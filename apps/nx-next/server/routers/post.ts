/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import {z} from 'zod';
import {Prisma} from '@prisma/client';
import {TRPCError} from '@trpc/server';
import {router, procedure} from '../trpc';
import {prisma} from '../prisma';
import now = jest.now;

/**
 * Default selector for Post.
 * It's important to always explicitly say which fields you want to return in order to not leak extra information
 * @see https://github.com/prisma/prisma/issues/9353
 */
const defaultPostSelect = Prisma.validator<Prisma.PostSelect>()({
    id: true,
    title: true,
    content: true,
    published: true,
    authorId: true,
});

export const postRouter = router({
    list: procedure
        .input(
            z.object({
                limit: z.number().min(1).max(100).nullish(),
                cursor: z.string().nullish(),
            }),
        )
        .query(async ({input}) => {
            /**
             * For pagination docs you can have a look here
             * @see https://trpc.io/docs/useInfiniteQuery
             * @see https://www.prisma.io/docs/concepts/components/prisma-client/pagination
             */

            const limit = input.limit ?? 50;
            const {cursor} = input;

            const items = await prisma.post.findMany({
                select: defaultPostSelect,
                // get an extra item at the end which we'll use as next cursor
                take: limit + 1,
                where: {},
                cursor: cursor
                    ? {
                        id: parseInt(cursor),
                    }
                    : undefined,
                orderBy: {
                    id: 'desc',
                },
            });
            let nextCursor: typeof cursor | undefined = undefined;
            if (items.length > limit) {
                // Remove the last item and use it as next cursor

                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                const nextItem = items.pop()!;
                nextCursor = nextItem.id.toString();
            }

            return {
                items: items.reverse(),
                nextCursor,
            };
        }),
    byId: procedure
        .input(
            z.object({
                id: z.string(),
            }),
        )
        .query(async ({input}) => {
            const {id} = input;
            const post = await prisma.post.findUnique({
                where: {id: parseInt(id)},
                select: defaultPostSelect,
            });
            if (!post) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: `No post with id '${id}'`,
                });
            }
            return post;
        }),
    add: procedure
        .input(
            z.object({
                id: z.string().uuid().optional(),
                title: z.string().min(1).max(32),
                content: z.string().min(1),
            }),
        )
        .mutation(async ({input}) => {
            const post = await prisma.post.create({
                data: {
                    title: input.title,
                    content: input.content,
                    published: false,
                    authorId: 1
                },
                select: defaultPostSelect,
            });
            return post;
        }),
});
