import React from 'react'
import styles from './tags.module.css'
import { StrapiDataTutorialTag } from '../../constants/strapi/Tutorial'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTags } from '@fortawesome/free-solid-svg-icons'

const TutorialTags = ({ tags }: { tags: StrapiDataTutorialTag[] }) => {
    return (
        <div className={styles.tags}>
            <FontAwesomeIcon icon={faTags} className={`text-sm px-3`} />
            {tags.map(({ id, attributes }, index) => (
                <span key={index}>{attributes.name}</span>
            ))}
        </div>
    )
}

export default TutorialTags
