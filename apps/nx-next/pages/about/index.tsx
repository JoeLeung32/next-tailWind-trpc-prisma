import React from 'react'
import styles from './index.module.css'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import strapi from '../../utils/strapi'
import {
    AttributeBaseWithAuthor,
    StrapiResProps
} from '../../utils/strapi/helpers/response'
import Error404 from '../../components/Errors/404'
import MDXContent from '../../components/MDX/MDXContent'
import LoadingSpinner from '../../components/LoadingSpinner'

interface ContentProps extends AttributeBaseWithAuthor {
    title: string
    content: string
}

interface TeamProps extends AttributeBaseWithAuthor {
    name: string
    profile: string
    tags: string
    link: string
}

interface PageProps extends StrapiResProps {
    data: {
        id?: number
        attributes: ContentProps
    } | null
}

interface TeamMemberProps extends StrapiResProps {
    data:
        | [
              {
                  id?: number
                  attributes: TeamProps
              }
          ]
        | null
}

export const getStaticProps: GetStaticProps<{
    res: PageProps
    team: TeamMemberProps
}> = async (context) => {
    const locale = context.locale || 'en'
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
            res: await strapi.aboutLearnbook.req({ locale }),
            team: await strapi.teamMembers.req()
        }
    }
}

const Content = ({ data }: { data: PageProps }) => {
    const { data: resData, meta, error: resError } = data
    if (resData) {
        const { attributes } = resData
        return (
            <article className={styles.article}>
                <div className={styles.pageTitle}>
                    <h1>{attributes.title}</h1>
                </div>
                {attributes.content && (
                    <MDXContent content={attributes.content} />
                )}
            </article>
        )
    }
    return <Error404 details={{ strapi: resError }} />
}

const TeamCard = ({
    data: { attributes }
}: {
    data: { attributes: TeamProps }
}) => {
    const tags = attributes.tags.split(',')
    return (
        <Link href={attributes.link} className={styles.card}>
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{attributes.name}</div>
                <p className="text-gray-700 text-base">{attributes.profile}</p>
            </div>
            <div className="px-6 pt-4 pb-2">
                {tags &&
                    tags.map((tag, index) => (
                        <span
                            key={index}
                            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2"
                        >
                            {tag}
                        </span>
                    ))}
            </div>
        </Link>
    )
}

const AboutMeIndex = (
    props: InferGetStaticPropsType<typeof getStaticProps>
) => {
    const { t } = useTranslation()
    const [init, setInit] = React.useState(false)
    React.useEffect(() => {
        setInit(true)
    }, [])
    if (!init) return <LoadingSpinner />
    return (
        <main className={`${styles.main} mt-5 mb-12`}>
            <div className={styles.pageTitle}>
                <h1>{t('About')}</h1>
            </div>
            <Content data={props.res} />
            <div className={`${styles.gradient} ${styles.style1} my-5 py-5`} />
            <section className={styles.team}>
                <div className={styles.pageTitle}>{t('Team')}</div>
                <div
                    className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4`}
                >
                    {props.team &&
                        props.team.data &&
                        props.team.data.map((data, index) => (
                            <TeamCard key={index} data={data} />
                        ))}
                </div>
            </section>
            <div className={`${styles.gradient} ${styles.style2} my-5 py-5`} />
            <section className={styles.stack}>
                <div className={styles.pageTitle}>{t('Stack')}</div>
                <div className={`p-2 px-4 prose lg:prose-xl`}>
                    <strong>Learnbook is using:</strong>
                    <ol>
                        <li>
                            <a href={`https://railway.app`} target={`_railway`}>
                                Railway.app
                            </a>{' '}
                            for host Strapi and PostgreSQL for itself use.
                        </li>
                        <li>
                            <a href={`https://vercel.com`} target={`_vercel`}>
                                Vercel.com
                            </a>{' '}
                            for host this website which using Next.JS + tailwind
                            CSS + tPRC + Prisma ORM.
                        </li>
                        <li>
                            Another PostgreSQL hosted on{' '}
                            <a
                                href={`https://supabase.com//`}
                                target={`_supabase`}
                            >
                                Supabase
                            </a>
                            .
                        </li>
                        <li>
                            Static Resources hosted on{' '}
                            <a
                                href={`https://aws.amazon.com/pm/serv-s3`}
                                target={`_aws`}
                            >
                                AWS S3
                            </a>
                            .
                        </li>
                    </ol>
                </div>
            </section>
        </main>
    )
}

export default AboutMeIndex
