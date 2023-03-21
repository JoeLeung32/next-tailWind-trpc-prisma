export interface StrapiOperator {
    fields?: string[]
    filters?: any
    locale?: string | string[]
    populate?: string | string[]
    publicationState?: 'live' | 'preview'
    sort?: string | string[]
}
