import React from 'react'
import Link from 'next/link'
import styles from './index.module.css'
import Date from '../../components/Date/date'
import Api from '../../constants/api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAt } from '@fortawesome/free-solid-svg-icons'

export async function getServerSideProps() {
    const data = await Api.get(
        `tutorials?fields=${[
            'title',
            'headline',
            'updatedAt',
            'publishedAt',
            'scheduleToPublishAt'
        ].join(',')}&populate=createdBy&sort[0]=updatedAt:DESC`
    )
    return {
        props: {
            data
        }
    }
}

const BlogIndex = ({ data }: any) => {
    const { data: posts } = data
    return (
        <main className={`${styles.main} container mx-auto px-4 py-2 mt-5`}>
            <h1 className={styles.pageTitle}>Tutorial</h1>
            <hr className={`text-neutral-600 my-10`} />
            <div className={`${styles.postList}`}>
                {posts.map(({ id, attributes }: any, index: number) => (
                    <Link
                        key={index}
                        href={`/tutorial/${id}`}
                        className={styles.post}
                    >
                        <div className={styles.title}>{attributes.title}</div>
                        <div className={styles.headline}>
                            {attributes.headline}
                        </div>
                        <div className={styles.meta}>
                            <div className={styles.author}>
                                {attributes.updatedBy.firstname}{' '}
                                {attributes.updatedBy.lastname}
                            </div>
                            <FontAwesomeIcon icon={faAt} />
                            <div className={styles.publish}>
                                {Date(attributes.publishedAt, 'LLL d, yyyy')}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    )
}

export default BlogIndex
