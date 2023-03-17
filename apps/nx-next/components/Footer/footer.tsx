import React from 'react'
import Link from 'next/link'
import source from '../../constants/sentence.json'
import styles from './footer.module.css'

const Footer = () => {
    const [word, setWord] = React.useState('')
    React.useEffect(() => {
        const randomWordingIndex = Math.floor(Math.random() * source.length)
        setWord(source[randomWordingIndex])
    }, [])

    return (
        <div className={`${styles.container} container`}>
            <div className={styles.brand}>
                <div className={styles.logo}>
                    <Link href={`/`}>Learnbook</Link>
                </div>
                <div className={`flex flex-row justify-end items-center gap-5`}>
                    <span className={`tracking-wider`}>{word}</span>
                </div>
            </div>
            <hr className={`text-neutral-800 my-5`} />
            <div className={`${styles.footer} [&>*]:mb-3`}>
                <span>&copy; 2023, All rights reserved.</span>
                <span className={`text-sm uppercase`}>Be Prepared</span>
            </div>
        </div>
    )
}

export default Footer
