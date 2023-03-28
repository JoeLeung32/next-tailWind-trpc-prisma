import React from 'react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import SsrTranslations from '../../utils/SsrTranslations'
import strapi from '../../utils/strapi'
import {
    TutorialProps,
    TutorialsRes
} from '../../utils/strapi/dataType/Tutorial'
import styles from './index.module.css'
import Error404 from '../../components/Errors/404'
import TutorialCategory from '../../components/Tutorial/TutorialCategory'
import TutorialMeta from '../../components/Tutorial/TutorialMeta'
import LoadingSpinner from '../../components/LoadingSpinner'

export const getStaticProps: GetStaticProps<{
    res: TutorialsRes
}> = async (context) => {
    const locale: string = context.locale || 'en'
    return {
        props: {
            ...(await SsrTranslations(locale, ['common'])),
            res: await strapi.tutorials.req({ locale })
        }
    }
}

const TutorialCard = ({
    id,
    attributes
}: {
    id: number
    attributes: TutorialProps
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
                    author={attributes?.createdBy}
                    date={
                        attributes.scheduleToPublishAt || attributes.publishedAt
                    }
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
