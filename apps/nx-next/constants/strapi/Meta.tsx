import { Author } from './Author'

export interface DataSubsetBase {
    createdAt: string
    updatedAt?: string
    publishedAt?: string
}

export interface DataSubsetBaseWithAuthor extends DataSubsetBase {
    createdBy: Author
    updatedBy?: Author
}

export interface StrapiMeta {
    pagination?: {
        page: number
        pageSize: number
        pageCount: number
        total: number
    }
}
