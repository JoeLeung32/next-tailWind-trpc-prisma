import React from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import Api from '../../constants/api'
import styles from './index.module.css'
import { StrapiDataTutorial } from '../../constants/strapi/Tutorial'
import { Meta } from '../../constants/strapi/Meta'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAt } from '@fortawesome/free-solid-svg-icons'
import Date from '../../components/Date/date'
import { remark } from 'remark'
import html from 'remark-html'

type PageProps = {
    data: StrapiDataTutorial[]
    meta: Meta
} | null

export const getServerSideProps: GetServerSideProps<{
    data: PageProps
}> = async (context) => {
    const { title } = context.query
    const qs = new URLSearchParams()
    if (typeof title === 'string') {
        qs.append(
            `fields`,
            [
                'title',
                'headline',
                'content',
                'updatedAt',
                'publishedAt',
                'scheduleToPublishAt'
            ].join(',')
        )
        qs.append(`filters[title][$eqi]`, title)
        qs.append(`populate`, `createdBy`)
        qs.append(`pagination[limit]`, '1')
        const data: PageProps = await Api.get(`tutorials?${qs.toString()}`)
        return {
            props: { data }
        }
    }
    return {
        props: {
            data: null
        }
    }
}

const BackButton = ({ text }: { text?: string }) => {
    const router = useRouter()
    return (
        <div className={`my-5`}>
            <button
                type={`button`}
                onClick={() => router.back()}
                className={`underline`}
            >
                {text || `Back to previous page`}
            </button>
        </div>
    )
}

const MDXContent = ({ content }: { content: string }) => {
    const [mdx, setMdx] = React.useState<string | null>(null)
    const fetchData = async () => {
        const { value } = await remark().use(html).process(content)
        setMdx(value.toString())
    }
    React.useEffect(() => {
        fetchData().catch(console.error)
    }, [content])
    if (mdx) {
        return (
            <>
                <div
                    className={styles.mdxContent}
                    dangerouslySetInnerHTML={{ __html: mdx }}
                />
            </>
        )
    }
    return <>No Content</>
}

const TutorialArticle = ({
    data
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const res = data?.data[0] || null
    const wrapperClassName = `${styles.main} container mx-auto px-4 py-2 mt-5 mb-2 mb-20`
    if (res) {
        const { attributes } = res
        return (
            <main className={wrapperClassName}>
                <BackButton text={`Back to tutorial`} />
                <article>
                    <h1 className={styles.pageTitle}>{attributes.title}</h1>
                    <div className={`${styles.meta}`}>
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
                    <hr className={`text-neutral-600 mt-3 mb-6`} />
                    {attributes.content && (
                        <MDXContent content={attributes.content} />
                    )}
                </article>
                <BackButton text={`Back to tutorial`} />
            </main>
        )
    }
    return (
        <main className={wrapperClassName}>
            <article>
                <h1 className={styles.pageTitle}>Article Not Found</h1>
                <hr className={`text-neutral-600 my-10`} />
                <p className={`text-gray-500`}>
                    Please contact your administrator to get more details.
                </p>
            </article>
            <BackButton />
        </main>
    )
}

export default TutorialArticle
