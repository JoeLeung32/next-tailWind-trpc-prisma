import React from 'react'
import styles from './meta.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAt } from '@fortawesome/free-solid-svg-icons'
import Date from '../Date/date'
import { UserProfile } from '../../utils/strapi/helpers/response'

interface Props {
    author?: UserProfile
    date?: string
}

const TutorialMeta = (props: Props) => {
    const { author, date } = props
    return (
        <div className={`${styles.meta}`}>
            {author && (
                <div className={styles.author}>
                    {author?.firstname} {author?.lastname}
                </div>
            )}
            <FontAwesomeIcon icon={faAt} />
            {date && (
                <div className={styles.publish}>
                    {Date(date, 'LLL d, yyyy')}
                </div>
            )}
        </div>
    )
}

export default TutorialMeta
