import React from 'react'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import RoadWorkSign from '../components/RoadWorkAhead/roadWorkSign'

export const getStaticProps: GetStaticProps = async (context) => {
    const locale = context.locale || 'en'
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common']))
        }
    }
}

export function Index() {
    return (
        <div className={`container mx-auto p-2`}>
            <RoadWorkSign />
        </div>
    )
}

export default Index
