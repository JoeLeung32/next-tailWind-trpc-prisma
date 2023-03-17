import { DataSubsetBase, DataSubsetBaseWithAuthor } from './Meta'
import { StrapiResponseProps } from './Response'

interface AttributesTutorialCategory extends DataSubsetBase {
    name: string
    locale: string
}

export interface StrapiDataTutorialCategory extends DataSubsetBase {
    id: number
    attributes: AttributesTutorialCategory
}

interface AttributesTutorialTag extends DataSubsetBase {
    name: string
    locale: string
}

export interface StrapiDataTutorialTag extends DataSubsetBase {
    id: number
    attributes: AttributesTutorialTag
}

export interface StrapiTutorialProps extends DataSubsetBaseWithAuthor {
    title: string
    headline: string
    content?: string
    scheduleToPublishAt?: string
    tutorial_category: {
        data: StrapiDataTutorialCategory
    }
    tutorial_tags: {
        data: [StrapiDataTutorialTag]
    }
}

export interface StrapiTutorialsResProps extends StrapiResponseProps {
    data: [
        {
            id: number
            attributes: StrapiTutorialProps
        }
    ]
}
