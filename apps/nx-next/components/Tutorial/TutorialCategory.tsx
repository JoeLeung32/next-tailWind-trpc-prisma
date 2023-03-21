import React from 'react'
import styles from './category.module.css'
import { StrapiDataTutorialCategory } from '../../constants/strapi/Tutorial'

const TutorialCategory = ({
    category
}: {
    category: StrapiDataTutorialCategory
}) => {
    if (!category) return null
    const { id, attributes } = category
    return (
        <div key={id} className={styles.category}>
            <span>{attributes.name}</span>
        </div>
    )
}

export default TutorialCategory
