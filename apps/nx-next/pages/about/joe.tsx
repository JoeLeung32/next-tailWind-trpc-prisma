import React from 'react'
import styles from './index.module.css'
import Api from '../../constants/api'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { DataSubsetBaseWithAuthor } from '../../constants/strapi/Meta'
import { StrapiResponseProps } from '../../constants/strapi/Response'
import MDXContent from '../../components/MDX/MDXContent'
import Error404 from '../../components/Errors/404'

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
    const res: PageProps = await Api.get(`about-joe`)
    return {
        props: {
            res
        }
    }
}

const AboutJoeIndex = (
    props: InferGetStaticPropsType<typeof getStaticProps>
) => {
    const { data, meta, error } = props.res
    if (data) {
        const { attributes } = data
        return (
            <main className={`${styles.main} container mx-auto px-4 py-2 my-5`}>
                <article className={styles.article}>
                    <div className={styles.pageTitle}>
                        <h1>{attributes.title}</h1>
                    </div>
                    {attributes.content && (
                        <MDXContent content={attributes.content} />
                    )}
                </article>
            </main>
        )
    }
    return <Error404 title={`Where is Joe?`} details={{ strapi: error }} />
}

export default AboutJoeIndex
