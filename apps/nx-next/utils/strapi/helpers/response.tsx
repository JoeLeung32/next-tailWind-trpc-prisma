export interface StrapiResProps {
    data: Data | Data[] | null
    meta?: Meta
    error?: ErrorProps
}

interface Data {
    id?: number
    attributes?: AttributeBase | AttributeBaseWithAuthor
}

interface Meta {
    pagination?: PaginationProps
}

export interface AttributeBase {
    createdAt: string
    updatedAt?: string
    publishedAt?: string
    [key: string]: any
}

export interface AttributeBaseWithAuthor extends AttributeBase {
    createdBy: UserProfile
    updatedBy?: UserProfile
}

export interface UserProfile {
    id: number
    firstname: string
    lastname: string
}

export interface ErrorProps {
    status: number
    name: string
    message: string
    details: {}
}

export interface PaginationProps {
    page: number
    pageSize: number
    pageCount: number
    total: number
}
