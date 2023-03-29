import React from 'react'
import { ParsedUrlQuery } from 'querystring'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'
import SsrTranslations from '../../utils/SsrTranslations'
import strapi from '../../utils/strapi'
import strapier from '../../utils/strapi/strapier'
import { TutorialsRes } from '../../utils/strapi/dataType/Tutorial'
import styles from './index.module.css'
import BackButton from '../../components/BackButton/BackButton'
import TutorialCategory from '../../components/Tutorial/TutorialCategory'
import TutorialMeta from '../../components/Tutorial/TutorialMeta'
import TutorialTags from '../../components/Tutorial/TutorialTags'
import MDXContent from '../../components/MDX/MDXContent'
import Error404 from '../../components/Errors/404'
import LoadingSpinner from '../../components/LoadingSpinner'

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

const TutorialArticle = (
    props: InferGetStaticPropsType<typeof getStaticProps>
) => {
    const qs = new URLSearchParams()
    const { data, meta, error } = props.res
    const total = meta?.pagination?.total
    const { t, i18n } = useTranslation()
    const [init, setInit] = React.useState(false)
    React.useEffect(() => {
        setInit(true)
    }, [])
    if (!init) return <LoadingSpinner />
    if (data && data.length && total) {
        const { id, attributes } = data[0]
        qs.append(`header`, attributes.title)
        qs.append(`headline`, attributes.headline)
        return (
            <main className={`${styles.main} mb-20`}>
                <Head>
                    <title>{attributes.title}</title>
                    <meta name={`description`} content={attributes.headline} />
                </Head>
                <BackButton text={t('Back to tutorial')} />
                <img src={`/api/og?${qs.toString()}`} />
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
