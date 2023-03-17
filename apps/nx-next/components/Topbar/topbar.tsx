import React from 'react'
import Link from 'next/link'
import styles from './topbar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

const menu = [
    { label: 'Home', name: 'home', url: '#home' },
    { label: 'Blog', name: 'blog', url: '#blog' },
    { label: 'About', name: 'about', url: '#about' }
]

const TopBar = () => {
    return (
        <div>
            <input
                type={`checkbox`}
                id={`burgerMenuToggle`}
                className={styles.burgerMenuToggleObj}
            />
            <div className={styles.topbar}>
                <div className={`container ${styles.wrapper}`}>
                    <div className={styles.logo}>
                        <Link href={`/`}>Learnbook</Link>
                    </div>
                    <div className={styles.burgerMenuCom}>
                        <label
                            className={`block md:hidden px-2`}
                            htmlFor={`burgerMenuToggle`}
                        >
                            <FontAwesomeIcon icon={faBars} />
                        </label>
                    </div>
                    <div
                        className={`${styles.burgerMenu} ${styles.burgerMenuFull}`}
                    >
                        {menu &&
                            menu.map((item, index) => (
                                <div key={index}>
                                    <Link href={item.url}>{item.label}</Link>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
            <div
                className={`${styles.burgerMenu} ${styles.burgerMenuMob} container`}
            >
                <div>
                    {menu &&
                        menu.map((item, index) => (
                            <div key={index} className={``}>
                                <Link href={item.url}>{item.label}</Link>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}

export default TopBar
