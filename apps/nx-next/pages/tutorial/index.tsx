import React from 'react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import styles from './index.module.css'
import Api from '../../constants/api'
import {
    StrapiTutorialProps,
    StrapiTutorialsResProps
} from '../../constants/strapi/Tutorial'
import Error404 from '../../components/Errors/404'
import TutorialCategory from '../../components/Tutorial/TutorialCategory'
import TutorialMeta from '../../components/Tutorial/TutorialMeta'

export const getStaticProps: GetStaticProps<{
    res: StrapiTutorialsResProps
}> = async () => {
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
            res
        }
    }
}

const TutorialCard = ({
    key,
    attributes
}: {
    key: number
    attributes: StrapiTutorialProps
}) => {
    return (
        <Link
            key={key}
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
    if (data) {
        return (
            <main
                className={`${styles.main} container mx-auto px-4 py-2 mt-5  mb-6`}
            >
                <div className={styles.pageTitle}>
                    <h1>Tutorial</h1>
                </div>
                <div className={`${styles.postList}`}>
                    {data &&
                        data.map((tutorial, index) => (
                            <TutorialCard
                                key={index}
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
