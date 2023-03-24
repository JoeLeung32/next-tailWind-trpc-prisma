import React from 'react'
import styles from './index.module.css'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import strapi from '../../utils/strapi'
import {
    AttributeBaseWithAuthor,
    StrapiResProps
} from '../../utils/strapi/helpers/response'
import MDXContent from '../../components/MDX/MDXContent'
import Error404 from '../../components/Errors/404'
import LoadingSpinner from '../../components/LoadingSpinner'
import BackButton from '../../components/BackButton/BackButton'

interface ContentProps extends AttributeBaseWithAuthor {
    title: string
    content: string
}

interface PageProps extends StrapiResProps {
    data: {
        id: number
        attributes: ContentProps
    } | null
}

export const getStaticProps: GetStaticProps<{
    res: PageProps
}> = async (context) => {
    const locale = context.locale || 'en'
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
            res: await strapi.aboutJoe.req({ locale })
        }
    }
}

const AboutJoeIndex = (
    props: InferGetStaticPropsType<typeof getStaticProps>
) => {
    const { data, meta, error } = props.res
    const { t } = useTranslation()
    const [init, setInit] = React.useState(false)
    React.useEffect(() => {
        setInit(true)
    }, [])
    if (!init) return <LoadingSpinner />
    if (data) {
        const { attributes } = data
        return (
            <main className={`${styles.main} my-5`}>
                <BackButton />
                <article className={styles.article}>
                    <div className={styles.pageTitle}>
                        <h1>{attributes.title}</h1>
                    </div>
                    {attributes.content && (
                        <MDXContent content={attributes.content} />
                    )}
                </article>
                <BackButton />
            </main>
        )
    }
    return <Error404 title={`Where is Joe?`} details={{ strapi: error }} />
}

export default AboutJoeIndex
