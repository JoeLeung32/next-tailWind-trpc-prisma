import { AttributeBaseWithAuthor, StrapiResProps } from '../helpers/response'
import { TutorialCategory } from './TutorialCategory'
import { TutorialTags } from './TutorialTags'

export interface TutorialPropsSource extends AttributeBaseWithAuthor {
    title: string
    headline: string
    content?: string
    scheduleToPublishAt?: string

    tutorial_category: {
        data: TutorialCategory
    }
    tutorial_tags: {
        data: TutorialTags[]
    }
}

export interface TutorialProps extends TutorialPropsSource {
    localizations?: {
        data: [
            {
                id: number
                attributes: TutorialPropsSource
            }
        ]
    }
}

export interface TutorialsRes extends StrapiResProps {
    data:
        | [
              {
                  id: number
                  attributes: TutorialProps
              }
          ]
        | null
}
