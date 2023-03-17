import React from 'react'
import NextError from 'next/error'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { RouterOutput, trpc } from '../../utils/trpc'
import styles from './index.module.css'

type PostByIdOutput = RouterOutput['post']['byId']

function PostItem(props: { post: PostByIdOutput }) {
    const router = useRouter()
    const { post } = props
    return (
        <div className={`${styles.main} container mx-auto px-4 py-2 mt-5`}>
            <Link href={`../`} onClick={() => router.back()}>
                Back
            </Link>
            <article className={`mt-5`}>
                <h1 className={styles.pageTitle}>{post.title}</h1>
                <hr className={`text-neutral-600 my-5`} />
                <p>{post.content}</p>
                <h2>Raw data:</h2>
                <pre>{JSON.stringify(post, null, 4)}</pre>
            </article>
        </div>
    )
}

const TutorialArticle = () => {
    const router = useRouter()
    const id = router.query.id as string
    let postQuery

    if (id) {
        postQuery = trpc.post.byId.useQuery({ id })
    }

    if (postQuery) {
        if (postQuery.status === 'success') {
            return <PostItem post={postQuery.data} />
        }
        if (postQuery.error) {
            return (
                <NextError
                    title={postQuery.error.message}
                    statusCode={postQuery.error.data?.httpStatus ?? 500}
                />
            )
        }
    }

    return (
        <article className={`${styles.main} container mx-auto px-4 py-2 mt-5`}>
            <Link href={`../`} onClick={() => router.back()}>
                Back
            </Link>
            <div className={`my-10`}>Loading...</div>
        </article>
    )
}

export default TutorialArticle
