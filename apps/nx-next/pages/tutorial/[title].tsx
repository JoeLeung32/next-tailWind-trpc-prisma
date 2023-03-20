import React from 'react'
import { ParsedUrlQuery } from 'querystring'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import Api from '../../constants/api'
import styles from './index.module.css'
import { StrapiTutorialsResProps } from '../../constants/strapi/Tutorial'
import BackButton from '../../components/BackButton/BackButton'
import TutorialCategory from '../../components/Tutorial/TutorialCategory'
import TutorialMeta from '../../components/Tutorial/TutorialMeta'
import TutorialTags from '../../components/Tutorial/TutorialTags'
import MDXContent from '../../components/MDX/MDXContent'
import Error404 from '../../components/Errors/404'
import { useTranslation } from 'react-i18next'

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
            {
                params: { title: `Day 01 - Strapi run on Railway` }
            }
        ],
        fallback: 'blocking'
    }
}

interface Output {
    res: StrapiTutorialsResProps
}

interface Input extends ParsedUrlQuery {
    title: string
}

export const getStaticProps: GetStaticProps<Output, Input> = async (
    context
) => {
    const title = context.params?.title || ''
    const qs = new URLSearchParams()
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
    const res: StrapiTutorialsResProps = await Api.get(
        `tutorials?${qs.toString()}`
    )
    return {
        props: {
            res
        }
    }
}

const TutorialArticle = (
    props: InferGetStaticPropsType<typeof getStaticProps>
) => {
    const { data, meta, error } = props.res
    const total = meta?.pagination?.total
    const { t } = useTranslation()
    if (data && total) {
        const { id, attributes } = data[0]
        return (
            <>
                <Head>
                    <title>{attributes.title}</title>
                    <meta name={`description`} content={attributes.headline} />
                </Head>
                <main className={`${styles.main} mb-20`}>
                    <BackButton text={t('Back to tutorial').toString()} />
                    <article className={styles.article}>
                        <div
                            className={`${styles.pageTitle} ${styles.pageHead}`}
                        >
                            <TutorialCategory
                                category={attributes.tutorial_category?.data}
                            />
                            <h1>{attributes.title}</h1>
                            <TutorialMeta
                                author={attributes?.updatedBy}
                                date={attributes.publishedAt}
                            />
                            <TutorialTags
                                tags={attributes.tutorial_tags?.data}
                            />
                        </div>
                        {attributes.content && (
                            <MDXContent content={attributes.content} />
                        )}
                    </article>
                    <BackButton text={t('Back to tutorial').toString()} />
                </main>
            </>
        )
    }
    return <Error404 title={`Article Not Found`} details={{ strapi: error }} />
}

export default TutorialArticle
