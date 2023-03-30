import React from 'react'
import { ParsedUrlQuery } from 'querystring'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'
import SsrTranslations from '../../utils/SsrTranslations'
import strapi from '../../utils/strapi'
import strapier from '../../utils/strapi/strapier'
import { TutorialsRes } from '../../utils/strapi/dataType/Tutorial'
import { UserProfile } from '../../utils/strapi/helpers/response'
import styles from './index.module.css'
import BackButton from '../../components/BackButton/BackButton'
import TutorialCategory from '../../components/Tutorial/TutorialCategory'
import TutorialMeta from '../../components/Tutorial/TutorialMeta'
import TutorialTags from '../../components/Tutorial/TutorialTags'
import MDXContent from '../../components/MDX/MDXContent'
import Error404 from '../../components/Errors/404'
import LoadingSpinner from '../../components/LoadingSpinner'
import { format } from 'date-fns'

interface CacheList {
    locale: string
    params: {
        title: string
    }
}

export const getStaticPaths: GetStaticPaths = async (context) => {
    const BreakException = {}
    const list: CacheList[] = []
    const articles: TutorialsRes = await strapi.tutorialsCacheBuild.req()
    if (articles.data && Array.isArray(articles.data)) {
        try {
            articles.data.forEach(({ attributes }) => {
                if (typeof attributes.locale === undefined) throw BreakException
                if (typeof attributes.title === undefined) throw BreakException
                list.push({
                    locale: strapier.searchLocale(attributes.locale) || 'en',
                    params: { title: attributes.title }
                })
            })
        } catch (e) {
            if (e !== BreakException) throw e
        }
    }
    if (list) {
        return {
            paths: list.map((item) => ({
                locale: item.locale,
                params: {
                    ...item.params,
                    title: encodeURIComponent(item.params.title)
                }
            })),
            fallback: 'blocking'
        }
    }
    return {
        paths: [],
        fallback: 'blocking'
    }
}

interface Output {
    res: TutorialsRes
}

interface Input extends ParsedUrlQuery {
    title: string
}

export const getStaticProps: GetStaticProps<Output, Input> = async (
    context
) => {
    const locale: string = context.locale || 'en'
    const title = context.params?.title || ''
    return {
        revalidate: 60,
        props: {
            ...(await SsrTranslations(locale, ['common'])),
            res: await strapi.tutorial.req({ locale, title })
        }
    }
}

interface OGImage {
    title: string
    headline: string
    createdBy: UserProfile
    scheduleToPublishAt: Date
    publishedAt: Date
    tutorial_tags: {
        data: TutorialTags[]
    }
}

const ogImage = (attributes: OGImage) => {
    const qs = new URLSearchParams()
    qs.append(`header`, attributes.title)
    qs.append(`headline`, attributes.headline)
    qs.append(
        `createdBy`,
        `${attributes?.createdBy.firstname} ${attributes?.createdBy.lastname}`
    )
    if (attributes.scheduleToPublishAt || attributes.publishedAt) {
        const dateTimeFormat: Date =
            attributes.scheduleToPublishAt || attributes.publishedAt
        qs.append(`publishedAt`, format(dateTimeFormat, 'LLL d, yyyy'))
    }
    if (attributes.tutorial_tags.data) {
        qs.append(
            `tags`,
            attributes.tutorial_tags.data
                .map(({ attributes }) => attributes.name)
                .join(',')
        )
    }
    return qs
}

const TutorialArticle = (
    props: InferGetStaticPropsType<typeof getStaticProps>
) => {
    const { data, meta, error } = props.res
    const total = meta?.pagination?.total
    const { t } = useTranslation()
    const [init, setInit] = React.useState(false)
    const HTMLHead = () => {
        if (data && data.length && total) {
            const { attributes } = data[0]
            const qs = ogImage({
                title: attributes.title,
                headline: attributes.headline,
                createdBy: attributes.createdBy,
                scheduleToPublishAt: new Date(
                    attributes.scheduleToPublishAt || ''
                ),
                publishedAt: new Date(attributes.publishedAt || ''),
                tutorial_tags: attributes.tutorial_tags
            })
            return (
                <Head>
                    <title>{attributes.title}</title>
                    <meta name={`description`} content={attributes.headline} />
                    <meta name={`og:site_name`} content={`Learnbook`} />
                    <meta property={`og:title`} content={attributes.title} />
                    <meta
                        property={`og:description`}
                        content={attributes.headline}
                    />
                    <meta
                        property={`og:image`}
                        content={`${
                            typeof window !== 'undefined'
                                ? window.location.origin
                                : ''
                        }/api/og/tutorial?t=${new Date(
                            attributes.updatedAt || attributes.createdAt
                        ).getTime()}&${qs.toString()}`}
                    />
                </Head>
            )
        }
        return (
            <Head>
                <title></title>
            </Head>
        )
    }
    React.useEffect(() => {
        setInit(true)
    }, [])
    if (!init)
        return (
            <LoadingSpinner>
                <HTMLHead />
            </LoadingSpinner>
        )
    if (data && data.length && total) {
        const { id, attributes } = data[0]
        return (
            <main className={`${styles.main} mb-20`}>
                <HTMLHead />
                <BackButton text={t('Back to tutorial')} />
                <article className={styles.article}>
                    <div className={`${styles.pageTitle} ${styles.pageHead}`}>
                        <TutorialCategory
                            category={attributes.tutorial_category.data}
                        />
                        <h1>{attributes.title}</h1>
                        <TutorialMeta
                            author={attributes?.createdBy}
                            date={
                                attributes.scheduleToPublishAt ||
                                attributes.publishedAt
                            }
                        />
                        <TutorialTags tags={attributes.tutorial_tags.data} />
                    </div>
                    {attributes.content && (
                        <MDXContent content={attributes.content} />
                    )}
                </article>
                <BackButton text={t('Back to tutorial')} />
            </main>
        )
    }
    return (
        <Error404 title={t(`Article Not Found`)} details={{ strapi: error }} />
    )
}

export default TutorialArticle
