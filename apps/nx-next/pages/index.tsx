import * as process from "process";
import {inferProcedureInput} from '@trpc/server';
import type {AppRouter} from "../server/routers/_app";
import {trpc} from '../utils/trpc';
import styles from './index.module.css';
import React, {Fragment} from "react";

export async function getServerSideProps() {
    const apiPath = `tutorials?fields=title,headline,publishedAt,scheduleToPublishAt`
    const apiURL = `${process.env.API_URL}${apiPath}`
    const res = await fetch(apiURL, {
        headers: {
            Authorization: `Bearer ${process.env.API_TOKEN}`
        }
    })
    const data = await res.json()
    return {
        props: {
            data: data
        }
    }
}

export function Index(props: any) {
    const utils = trpc.useContext();

    const {data} = props
    const total = data?.meta?.pagination?.total || 0
    const list = data?.data || []
    const error = data?.error || null

    const postsQuery = trpc.post.list.useInfiniteQuery(
        {
            limit: 5,
        },
        {
            getPreviousPageParam(lastPage) {
                return lastPage.nextCursor;
            },
        },
    );

    const addPost = trpc.post.add.useMutation({
        async onSuccess() {
            // refetches posts after a post is added
            await utils.post.list.invalidate();
        },
    });

    const hello = trpc.hello.useQuery({text: 'client'});

    if (!hello.data) {
        return <div className={styles.loading}>Loading...</div>;
    }

    const Content = () => (
        <div className={`mb-12 border-gray-500 border rounded-md p-2 px-4`}>
            <p>Here have 2 data source and 4 hosting used:</p>
            <p>1. <strong>Hosting on Railway.app:</strong> Strapi + PostgreSQL;</p>
            <p>2. <strong>Hosting on Vercel:</strong> Next.js + tailwindcss + tRPC + Prisma ORM;</p>
            <p>3. <strong>Hosting on Supabase:</strong> PostgreSQL (for Next.js use)</p>
            <p>4. <strong>Hosting on Amazon:</strong> S3 (for Strapi use)</p>
        </div>
    )

    const Button = () => (
        <button
            className={styles.btn}
            onClick={() => postsQuery.fetchPreviousPage()}
            disabled={
                !postsQuery.hasPreviousPage || postsQuery.isFetchingPreviousPage
            }
        >
            {postsQuery.isFetchingPreviousPage
                ? 'Loading more...'
                : postsQuery.hasPreviousPage
                    ? 'Load More'
                    : 'Nothing more to load'}
        </button>
    )

    return (
        <div className={styles.page}>
            <Content/>
            <h1 className={`font-bold text-3xl mb-2`}>
                tRPC + Prisma
            </h1>
            {/*---*/}
            <dl className={`mb-5`}>
                <dt className={`font-bold`}>tRPC call - internal</dt>
                <dd>{hello.data.greeting}</dd>
            </dl>
            {/*---*/}
            <dl className={`mb-5`}>
                <dt className={`font-bold`}>tRPC call - external (Load more...)</dt>
                <dd>
                    <h2 className={`font-bold italic mb-2`}>
                        Latest Posts {postsQuery.status === 'loading' && '(loading)'}
                    </h2>
                    <Button/>
                </dd>
            </dl>
            {/*---*/}
            <dl className={`mb-5`}>
                <dt className={`font-bold`}>tRPC call - external (Data List)</dt>
                <dd>
                    <ol className={`list-decimal mx-4`}>
                        {postsQuery.data?.pages.map((page, index) => (
                            <Fragment key={page.items[0]?.id || index}>
                                {page.items.map((item) => (
                                    <li key={item.id} className={`mx-4`}>
                                        <a href={`/post/${item.id}`} className={styles.url}>
                                            #{item.id} {item.title}
                                        </a>
                                    </li>
                                ))}
                            </Fragment>
                        ))}
                    </ol>
                </dd>
            </dl>
            {/*---*/}
            <dl className={`mb-5`}>
                <dt className={`font-bold`}>tRPC call - external (Create Data)</dt>
                <dd>
                    <form
                        onSubmit={async (e) => {
                            /**
                             * In a real app you probably don't want to use this manually
                             * Checkout React Hook Form - it works great with tRPC
                             * @see https://react-hook-form.com/
                             * @see https://kitchen-sink.trpc.io/react-hook-form
                             */
                            e.preventDefault();
                            const $form = e.currentTarget;
                            const values = Object.fromEntries(new FormData($form));
                            type Input = inferProcedureInput<AppRouter['post']['add']>;
                            //    ^?
                            const input: Input = {
                                title: values.title as string,
                                content: values.content as string,
                            };
                            try {
                                await addPost.mutateAsync(input);

                                $form.reset();
                            } catch (cause) {
                                console.error({cause}, 'Failed to add post');
                            }
                        }}
                    >
                        <label htmlFor="title">Title:</label>
                        <br/>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            disabled={addPost.isLoading}
                            className={styles.input}
                        />
                        <br/>
                        <label htmlFor="text">Text:</label>
                        <br/>
                        <textarea id="content" name="content" disabled={addPost.isLoading} className={styles.input}/>
                        <br/>
                        <input type="submit" disabled={addPost.isLoading} className={styles.btn}/>
                        {addPost.error && (
                            <p style={{color: 'red'}}>{addPost.error.message}</p>
                        )}
                    </form>
                </dd>
            </dl>
            {/*---*/}
            <h1 className={`font-bold text-3xl mb-2 mt-12`}>
                Strapi
            </h1>
            <hr/>
            <p>Total: {total}</p>
            {list && list.length ? (
                list.map(({id, attributes}: { id: string, attributes: any }) => (
                    <div key={`ele${id}`}>{attributes.title}</div>
                ))
            ) : (
                <div>
                    <h1>{error.status}</h1>
                    <p>{error.message}</p>
                    <small>{error.name}</small>
                </div>
            )}
            <div className={`mb-12`}></div>
        </div>
    );
}

export default Index;
