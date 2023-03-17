import { StrapiMeta } from './Meta'
import { StrapiError } from './Error'

interface SimpleDataset {
    id?: number
    attributes?: object
}

export interface StrapiResponseProps {
    data: SimpleDataset | [SimpleDataset]
    meta?: StrapiMeta
    error?: StrapiError
}
