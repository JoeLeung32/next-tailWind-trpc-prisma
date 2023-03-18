import { Author } from './Author'

export interface StrapiDataTutorial {
    id: number
    attributes: {
        title: string
        headline: string
        content?: string
        createdAt: string
        createdBy: Author
        updatedAt?: string
        updatedBy?: Author
        publishedAt?: string
        scheduleToPublishAt?: string
    }
}
