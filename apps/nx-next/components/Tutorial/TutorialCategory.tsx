import React from 'react'
import styles from './category.module.css'
import { TutorialCategory } from '../../utils/strapi/dataType/TutorialCategory'

const TutorialCategory = ({ category }: { category: TutorialCategory }) => {
    if (!category) return null
    const { id, attributes } = category
    return (
        <div key={id} className={styles.category}>
            <span>{attributes.name}</span>
        </div>
    )
}

export default TutorialCategory
