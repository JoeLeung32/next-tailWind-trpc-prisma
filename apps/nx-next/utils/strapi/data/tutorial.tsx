import { StrapiOperator } from '../helpers/request'
import strapier from '../strapier'

interface Props {
    locale: string
    title: string
}

const tutorial = {
    res: { data: null },
    req: async (props: Props) => await query(props),
    data: () => strapier.formatter.getData(tutorial.res),
    pagination: () => strapier.formatter.getPagination(tutorial.res)
}

const query = async (props: Props) => {
    const dt = new Date().toISOString()
    const nextLocale = props.locale || 'en'
    const title = props.title
    const qs: StrapiOperator = {
        locale: strapier.locale(nextLocale),
        fields: [
            'title',
            'headline',
            'content',
            'updatedAt',
            'publishedAt',
            'scheduleToPublishAt'
        ],
        populate: [
            'createdBy',
            'localizations',
            'tutorial_category',
            'tutorial_tags'
        ]
    }
    const qp = strapier.qs(qs)
    qp.append(`filters[title][$eqi]`, title)
    qp.append(`filters[scheduleToPublishAt][$lte]`, dt)
    qp.append(`filters[publishedAt][$lte]`, dt)
    const url = `/tutorials?${qp.toString()}`
    return (tutorial.res = await strapier.fetch(url))
}

export default tutorial
