import * as process from 'process'
import React from 'react'
import styles from './index.module.css'

export function Index({ title }: { title: string }) {
    return (
        <>
            <div className={styles.main}>
                <p className={`text-main`}>Learnbook</p>
            </div>
        </>
    )
}

export default Index
