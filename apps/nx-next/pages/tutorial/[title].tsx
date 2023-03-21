import React from 'react'
import { ParsedUrlQuery } from 'querystring'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import { useTranslation } from 'react-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import i18nConfig from '../../next-i18next.config'
import strapi from '../../utils/strapi'
import { TutorialsRes } from '../../utils/strapi/dataType/Tutorial'
import styles from './index.module.css'
import BackButton from '../../components/BackButton/BackButton'
import TutorialCategory from '../../components/Tutorial/TutorialCategory'
import TutorialMeta from '../../components/Tutorial/TutorialMeta'
import TutorialTags from '../../components/Tutorial/TutorialTags'
import MDXContent from '../../components/MDX/MDXContent'
import Error404 from '../../components/Errors/404'
import LoadingSpinner from '../../components/LoadingSpinner'

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
            {
                locale: 'en',
                params: {
                    title: `Day 01 - Strapi run on Railway`
                }
            },
            {
                locale: 'zh',
                params: {
                    title: encodeURIComponent(
                        `第一步：Strapi 在 Railway 上執行`
                    )
                }
            }
        ],
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
            ...(await serverSideTranslations(locale, ['common'], i18nConfig)),
            res: await strapi.tutorial.req({ locale, title })
        }
    }
}

const TutorialArticle = (
    props: InferGetStaticPropsType<typeof getStaticProps>
) => {
    const { data, meta, error } = props.res
    const total = meta?.pagination?.total
    const { t } = useTranslation()
    const [init, setInit] = React.useState(false)
    React.useEffect(() => {
        setInit(true)
    }, [])
    if (!init) return <LoadingSpinner />
    if (data && data.length && total) {
        const { id, attributes } = data[0]
        return (
            <>
                <Head>
                    <title>{attributes.title}</title>
                    <meta name={`description`} content={attributes.headline} />
                </Head>
                <main className={`${styles.main} mb-20`}>
                    <BackButton text={t('Back to tutorial')} />
                    <article className={styles.article}>
                        <div
                            className={`${styles.pageTitle} ${styles.pageHead}`}
                        >
                            <TutorialCategory
                                category={attributes.tutorial_category.data}
                            />
                            <h1>{attributes.title}</h1>
                            <TutorialMeta
                                author={attributes?.updatedBy}
                                date={attributes.publishedAt}
                            />
                            <TutorialTags
                                tags={attributes.tutorial_tags.data}
                            />
                        </div>
                        {attributes.content && (
                            <MDXContent content={attributes.content} />
                        )}
                    </article>
                    <BackButton text={t('Back to tutorial')} />
                </main>
            </>
        )
    }
    return (
        <Error404 title={t(`Article Not Found`)} details={{ strapi: error }} />
    )
}

export default TutorialArticle
