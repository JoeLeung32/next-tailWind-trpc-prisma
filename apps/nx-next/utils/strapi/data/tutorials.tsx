import { StrapiOperator } from '../helpers/request'
import strapier from '../strapier'

interface Props {
    locale: string
}

const tutorials = {
    res: { data: null },
    req: async (props: Props) => await query(props),
    data: () => strapier.formatter.getData(tutorials.res),
    pagination: () => strapier.formatter.getPagination(tutorials.res)
}

const query = async (props: Props) => {
    const nextLocale = props.locale || 'en'
    const qs: StrapiOperator = {
        locale: strapier.locale(nextLocale),
        fields: [
            'title',
            'headline',
            'updatedAt',
            'publishedAt',
            'scheduleToPublishAt'
        ],
        populate: [
            'createdBy',
            'localizations',
            'tutorial_category',
            'tutorial_tags'
        ],
        sort: ['updatedAt:DESC']
    }
    const qp = strapier.qs(qs)
    const url = `/tutorials?${qp.toString()}`
    return (tutorials.res = await strapier.fetch(url))
}

export default tutorials
