import { AttributeBase } from '../helpers/response'

interface TutorialTagProps extends AttributeBase {
    name: string
    locale: string
}

export interface TutorialTags {
    id: number
    attributes: TutorialTagProps
}
