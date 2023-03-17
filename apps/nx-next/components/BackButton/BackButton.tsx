import React from 'react'
import { useRouter } from 'next/router'

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

export default BackButton
