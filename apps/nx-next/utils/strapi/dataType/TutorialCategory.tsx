import { AttributeBase } from '../helpers/response'

interface TutorialCategoryProps extends AttributeBase {
    name: string
    locale: string
}

export interface TutorialCategory {
    id: number
    attributes: TutorialCategoryProps
}
