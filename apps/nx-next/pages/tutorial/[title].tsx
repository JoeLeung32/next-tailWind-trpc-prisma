import React from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import Api from '../../constants/api'
import styles from './index.module.css'
import { StrapiDataTutorial } from '../../constants/strapi/Tutorial'
import { Meta } from '../../constants/strapi/Meta'
import BackButton from '../../components/BackButton/BackButton'
import TutorialCategory from '../../components/Tutorial/TutorialCategory'
import TutorialMeta from '../../components/Tutorial/TutorialMeta'
import TutorialTags from '../../components/Tutorial/TutorialTags'
import MDXContent from '../../components/MDX/MDXContent'

type PageProps = {
    data: StrapiDataTutorial[]
    meta: Meta
} | null

export const getServerSideProps: GetServerSideProps<{
    data: PageProps
}> = async (context) => {
    const { title } = context.query
    const qs = new URLSearchParams()
    if (typeof title === 'string') {
        qs.append(
            `fields`,
            [
                'title',
                'headline',
                'content',
                'updatedAt',
                'publishedAt',
                'scheduleToPublishAt'
            ].join(',')
        )
        qs.append(`filters[title][$eqi]`, title)
        qs.append(
            `populate`,
            ['createdBy', 'tutorial_category', 'tutorial_tags'].join(',')
        )
        qs.append(`pagination[limit]`, '1')
        const data: PageProps = await Api.get(`tutorials?${qs.toString()}`)
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

const TutorialArticle = ({
    data
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const res = data?.data[0] || null
    if (res) {
        const { attributes } = res
        return (
            <>
                <Head>
                    <title>{attributes.title}</title>
                    <meta name={`description`} content={attributes.headline} />
                </Head>
                <main
                    className={`${styles.main} container mx-auto px-4 py-2 mt-5 mb-2 mb-20`}
                >
                    <BackButton text={`Back to tutorial`} />
                    <article className={styles.article}>
                        <div className={styles.pageTitle}>
                            <h1>{attributes.title}</h1>
                            <div className={styles.meta}>
                                <TutorialCategory
                                    category={
                                        attributes.tutorial_category?.data
                                    }
                                />
                                <TutorialMeta
                                    author={attributes?.updatedBy}
                                    date={attributes.publishedAt}
                                />
                            </div>
                            <div className={`mt-2`}>
                                <TutorialTags
                                    tags={attributes.tutorial_tags?.data}
                                />
                            </div>
                        </div>
                        {attributes.content && (
                            <MDXContent content={attributes.content} />
                        )}
                    </article>
                    <BackButton text={`Back to tutorial`} />
                </main>
            </>
        )
    }
    return (
        <main className={`container mx-auto px-4 py-2 my-20`}>
            <article>
                <h1 className={`text-neutral-700 font-bold text-3xl mb-5`}>
                    Article Not Found
                </h1>
                <p className={`text-gray-500`}>
                    Please contact your administrator to get more details.
                </p>
            </article>
            <BackButton />
        </main>
    )
}

export default TutorialArticle
