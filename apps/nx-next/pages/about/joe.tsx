import React from 'react'
import styles from './index.module.css'
import Api from '../../constants/api'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { DataSubsetBaseWithAuthor } from '../../constants/strapi/Meta'
import { StrapiResponseProps } from '../../constants/strapi/Response'
import MDXContent from '../../components/MDX/MDXContent'
import Error404 from '../../components/Errors/404'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import i18nConfig from '../../next-i18next.config'
import { useTranslation } from 'react-i18next'
import LoadingSpinner from '../../components/LoadingSpinner'
import BackButton from '../../components/BackButton/BackButton'
import { localeMapping } from '../../constants/LocaleMapping'

interface ContentProps extends DataSubsetBaseWithAuthor {
    title: string
    content: string
}

interface PageProps extends StrapiResponseProps {
    data: {
        id: number
        attributes: ContentProps
    }
}

export const getStaticProps: GetStaticProps<{
    res: PageProps
}> = async (context) => {
    const locale = context.locale || 'en'
    const localeForStrapi = localeMapping[locale]
    const res: PageProps = await Api.get(`about-joe?locale=${localeForStrapi}`)
    return {
        props: {
            res,
            ...(await serverSideTranslations(locale, ['common'], i18nConfig))
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
