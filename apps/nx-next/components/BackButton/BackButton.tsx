import React from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

const BackButton = ({ text }: { text?: string | null }) => {
    const { t, i18n } = useTranslation()
    const router = useRouter()
    const goBack = async () => {
        const url = router.pathname.split('/').slice(0, -1).join('/')
        if (window.history.state && window.history.state.idx > 0) {
            router.back()
        } else {
            await router.replace(
                {
                    pathname: url
                },
                undefined,
                { locale: i18n.language }
            )
        }
    }
    return (
        <div className={`my-5`}>
            <button
                type={`button`}
                onClick={() => goBack()}
                className={`underline`}
            >
                {text || t('Back to previous page')}
            </button>
        </div>
    )
}

export default BackButton
