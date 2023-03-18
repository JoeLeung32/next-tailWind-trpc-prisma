import React from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Link from 'next/link'
import styles from './index.module.css'
import Api from '../../constants/api'
import { StrapiDataTutorial } from '../../constants/strapi/Tutorial'
import { Meta } from '../../constants/strapi/Meta'
import TutorialCategory from '../../components/Tutorial/TutorialCategory'
import TutorialMeta from '../../components/Tutorial/TutorialMeta'

type PageProps = {
    data: StrapiDataTutorial[]
    meta: Meta
} | null

export const getServerSideProps: GetServerSideProps<{
    data: PageProps
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
    const data: PageProps = await Api.get(`tutorials?${qs.toString()}`)
    return {
        props: { data }
    }
}

const TutorialCard = ({
    data: { id, attributes },
    index
}: {
    data: StrapiDataTutorial
    index: number
}) => {
    return (
        <Link
            key={index}
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
            <div className={`mt-3 mb-6`}>
                <TutorialMeta
                    author={attributes?.updatedBy}
                    date={attributes.publishedAt}
                />
            </div>
        </Link>
    )
}

const TutorialIndex = ({
    data
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <main className={`${styles.main} container mx-auto px-4 py-2 mt-5`}>
            <div className={styles.pageTitle}>
                <h1>Tutorial</h1>
            </div>
            <div className={`${styles.postList}`}>
                {data &&
                    data.data.map((d, index: number) => (
                        <TutorialCard data={d} index={index} key={index} />
                    ))}
            </div>
        </main>
    )
}

export default TutorialIndex
