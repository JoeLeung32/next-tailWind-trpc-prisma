import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import styles from './topbar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faEarthAsia } from '@fortawesome/free-solid-svg-icons'

const menu = [
    { label: 'Home', name: 'home', url: '/' },
    { label: 'Tutorial', name: 'tutorial', url: '/tutorial' },
    { label: 'About', name: 'about', url: '/about' }
]

const TopBar = () => {
    const { t, i18n } = useTranslation()
    const router = useRouter()
    const [init, setInit] = React.useState(false)
    const [languageToggle, setLanguageToggle] = React.useState(false)
    const [menuToggle, setMenuToggle] = React.useState(false)
    const reset = () => {
        setMenuToggle(false)
        setLanguageToggle(false)
    }
    const changeLanguage = async (locale: string) => {
        await router.replace(
            {
                pathname: router.pathname,
                query: router.query
            },
            router.asPath,
            { locale }
        )
    }

    React.useEffect(() => {
        setInit(true)

        const routeChangeComplete = () => {
            setMenuToggle(false)
            setLanguageToggle(false)
        }
        router.events.on('routeChangeComplete', routeChangeComplete)
        return () => {
            router.events.off('routeChangeComplete', routeChangeComplete)
        }
    }, [])
    return (
        <div>
            <div className={styles.top}>
                <div className={styles.wrapper}>
                    <div className={styles.logo}>
                        <Link href={`/`}>Learnbook</Link>
                    </div>
                    <div className={styles.menus}>
                        <div className={styles.menuItem}>
                            <div className={styles.menuIcon}>
                                <label
                                    htmlFor={`languageToggle`}
                                    onClick={() => {
                                        reset()
                                        setLanguageToggle(!languageToggle)
                                    }}
                                >
                                    <FontAwesomeIcon icon={faEarthAsia} />
                                </label>
                            </div>
                            <input
                                type={`checkbox`}
                                id={`languageToggle`}
                                className={`${styles.toggles} ${styles.menuToggle}`}
                                checked={languageToggle}
                                readOnly
                            />
                            <div className={styles.menu} data-is={`language`}>
                                <a onClick={() => changeLanguage('en')}>
                                    <span>ENG</span>
                                    <span data-for={`mobile`}>English</span>
                                </a>
                                <a onClick={() => changeLanguage('zh')}>
                                    <span>繁中</span>
                                    <span data-for={`mobile`}>繁體中文</span>
                                </a>
                            </div>
                        </div>
                        <div className={styles.menuItem}>
                            <div className={styles.menuIcon}>
                                <label
                                    htmlFor={`menuToggle`}
                                    onClick={() => {
                                        reset()
                                        setMenuToggle(!menuToggle)
                                    }}
                                >
                                    <FontAwesomeIcon icon={faBars} />
                                </label>
                            </div>
                            <input
                                type={`checkbox`}
                                id={`menuToggle`}
                                className={`${styles.toggles} ${styles.menuToggle}`}
                                checked={menuToggle}
                                readOnly
                            />
                            <div className={styles.menu}>
                                {init &&
                                    menu &&
                                    menu.map((item, index) => (
                                        <Link key={index} href={item.url}>
                                            {t(item.label)}
                                        </Link>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopBar
