import React from 'react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import i18nConfig from '../../next-i18next.config'
import styles from './index.module.css'
import Api from '../../constants/api'
import {
    StrapiTutorialProps,
    StrapiTutorialsResProps
} from '../../constants/strapi/Tutorial'
import Error404 from '../../components/Errors/404'
import TutorialCategory from '../../components/Tutorial/TutorialCategory'
import TutorialMeta from '../../components/Tutorial/TutorialMeta'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import LoadingSpinner from '../../components/LoadingSpinner'

export const getStaticProps: GetStaticProps<{
    res: StrapiTutorialsResProps
}> = async (context) => {
    const locale = context.locale || 'en'
    const qs = new URLSearchParams()
    qs.append(
        `fields`,
        [
            'title',
            'headline',
            'updatedAt',
            'publishedAt',
            'scheduleToPublishAt'
        ].join(',')
    )
    qs.append(
        `populate`,
        ['createdBy', 'tutorial_category', 'tutorial_tags'].join(',')
    )
    qs.append(`sort`, 'updatedAt:DESC')
    const res: StrapiTutorialsResProps = await Api.get(
        `tutorials?${qs.toString()}`
    )
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'], i18nConfig)),
            res
        }
    }
}

const TutorialCard = ({
    id,
    attributes
}: {
    id: number
    attributes: StrapiTutorialProps
}) => {
    return (
        <Link
            key={id}
            href={`/tutorial/${attributes.title}`}
            className={styles.postCard}
        >
            <div className={`mb-3`}>
                <TutorialCategory
                    category={attributes.tutorial_category?.data}
                />
            </div>
            <div className={styles.title}>{attributes.title}</div>
            <div className={styles.headline}>{attributes.headline}</div>
            <div className={`my-3`}>
                <TutorialMeta
                    author={attributes?.updatedBy}
                    date={attributes.publishedAt}
                />
            </div>
        </Link>
    )
}

const TutorialIndex = (
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
        return (
            <main className={`${styles.main} mb-6`}>
                <div className={styles.pageTitle}>
                    <h1>{t('Tutorial')}</h1>
                </div>
                <div className={`${styles.postList}`}>
                    {data &&
                        data.map((tutorial, index) => (
                            <TutorialCard
                                key={index}
                                id={tutorial.id}
                                attributes={tutorial.attributes}
                            />
                        ))}
                </div>
            </main>
        )
    }
    return <Error404 details={{ strapi: error }} />
}

export default TutorialIndex
