import { DataSubsetBase, DataSubsetBaseWithAuthor } from './Meta'

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

interface AttributesTutorial extends DataSubsetBaseWithAuthor {
    title: string
    headline: string
    content?: string
    scheduleToPublishAt?: string
    tutorial_category: {
        data: StrapiDataTutorialCategory
    }
    tutorial_tags: {
        data: StrapiDataTutorialTag[]
    }
}

export interface StrapiDataTutorial {
    id: number
    attributes: AttributesTutorial
}
