import React from 'react'
import BackButton from '../BackButton/BackButton'
import { StrapiError } from '../../constants/strapi/Error'

type PageProps = {
    title?: string
    details?: {
        strapi?: StrapiError
    }
}

const Error404 = ({ title, details }: PageProps) => {
    return (
        <main className={`container mx-auto px-4 py-2 my-20`}>
            <article className={`[&>*]:my-3`}>
                <h1 className={`text-neutral-700 font-bold text-3xl`}>
                    {title || `Page Not Found`}
                </h1>
                <p className={`text-gray-500`}>
                    Please contact your administrator to get more details.
                </p>
                <div className={`flex text-xs`}>
                    <div className={`p-2 px-4 bg-gray-200 rounded-xl`}>
                        {details && details.strapi && (
                            <pre>{JSON.stringify(details.strapi, null, 4)}</pre>
                        )}
                    </div>
                </div>
            </article>
            <BackButton />
        </main>
    )
}

export default Error404
