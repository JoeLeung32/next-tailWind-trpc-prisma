import React from 'react'
import styles from './index.module.css'
import Api from '../../constants/api'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { DataSubsetBaseWithAuthor } from '../../constants/strapi/Meta'
import BackButton from '../../components/BackButton/BackButton'
import MDXContent from '../../components/MDX/MDXContent'

interface ContentProps extends DataSubsetBaseWithAuthor {
    title: string
    content: string
}

type PageProps = {
    data: {
        id: number
        attributes: ContentProps
    }
    meta: object
} | null

export const getServerSideProps: GetServerSideProps<{
    data: PageProps
}> = async (context) => {
    const data: PageProps = await Api.get(`about-me`)
    if (data) {
        return {
            props: { data }
        }
    }
    return {
        props: {
            data: null
        }
    }
}

const AboutMeIndex = ({
    data
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    if (data) {
        const { attributes } = data.data
        return (
            <main className={`${styles.main} container mx-auto px-4 py-2 my-5`}>
                <article className={styles.article}>
                    <div className={styles.pageTitle}>
                        <h1>{attributes.title}</h1>
                    </div>
                    {attributes.content && (
                        <MDXContent content={attributes.content} />
                    )}
                </article>
            </main>
        )
    }
    return (
        <main className={`container mx-auto px-4 py-2 my-20`}>
            <article>
                <h1 className={`text-neutral-700 font-bold text-3xl mb-5`}>
                    Page Not Found
                </h1>
                <p className={`text-gray-500`}>
                    Please contact your administrator to get more details.
                </p>
            </article>
            <BackButton />
        </main>
    )
}

export default AboutMeIndex
