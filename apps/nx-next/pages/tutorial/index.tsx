import React from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Link from 'next/link'
import styles from './index.module.css'
import Date from '../../components/Date/date'
import Api from '../../constants/api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAt } from '@fortawesome/free-solid-svg-icons'
import { StrapiDataTutorial } from '../../constants/strapi/Tutorial'
import { Meta } from '../../constants/strapi/Meta'

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
    qs.append(`populate`, `createdBy`)
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
            className={styles.post}
        >
            <div className={styles.title}>{attributes.title}</div>
            <div className={styles.headline}>{attributes.headline}</div>
            <div className={`${styles.meta} mt-3 mb-6`}>
                {attributes?.updatedBy && (
                    <div className={styles.author}>
                        {attributes?.updatedBy?.firstname}{' '}
                        {attributes?.updatedBy?.lastname}
                    </div>
                )}
                <FontAwesomeIcon icon={faAt} />
                {attributes.publishedAt && (
                    <div className={styles.publish}>
                        {Date(attributes.publishedAt, 'LLL d, yyyy')}
                    </div>
                )}
            </div>
        </Link>
    )
}

const TutorialIndex = ({
    data
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <main className={`${styles.main} container mx-auto px-4 py-2 mt-5`}>
            <h1 className={styles.pageTitle}>Tutorial</h1>
            <hr className={`text-neutral-600 my-10`} />
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
