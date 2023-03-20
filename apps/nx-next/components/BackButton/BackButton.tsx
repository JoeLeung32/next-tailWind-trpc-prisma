import React from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

const BackButton = ({ text }: { text?: string | undefined }) => {
    const { t } = useTranslation()
    const router = useRouter()
    return (
        <div className={`my-5`}>
            <button
                type={`button`}
                onClick={() => router.back()}
                className={`underline`}
            >
                {text || t('Back to previous page')}
            </button>
        </div>
    )
}

export default BackButton
