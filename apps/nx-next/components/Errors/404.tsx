import React from 'react'
import BackButton from '../BackButton/BackButton'
import { useTranslation } from 'react-i18next'
import { ErrorProps } from '../../utils/strapi/helpers/response'

type PageProps = {
    title?: string | null
    details?: {
        strapi?: ErrorProps
    }
}

const Error404 = ({ title, details }: PageProps) => {
    const { t } = useTranslation()
    return (
        <main className={`container mx-auto px-4 py-2 my-20`}>
            <article className={`[&>*]:my-3`}>
                <h1 className={`text-neutral-700 font-bold text-3xl`}>
                    {title || t(`Page Not Found`)}
                </h1>
                <p className={`text-gray-500`}>
                    {t(
                        `Please contact your administrator to get more details.`
                    )}
                </p>

                {details && details.strapi && (
                    <div className={`flex text-xs`}>
                        <div className={`p-2 px-4 bg-gray-200 rounded-xl`}>
                            <pre>{JSON.stringify(details.strapi, null, 4)}</pre>
                        </div>
                    </div>
                )}
            </article>
            <BackButton />
        </main>
    )
}

export default Error404
