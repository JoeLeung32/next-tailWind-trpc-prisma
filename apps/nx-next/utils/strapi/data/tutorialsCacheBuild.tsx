import { StrapiOperator } from '../helpers/request'
import strapier from '../strapier'

const tutorialsCacheBuild = {
    res: { data: null },
    req: async () => await query(),
    data: () => strapier.formatter.getData(tutorialsCacheBuild.res),
    pagination: () => strapier.formatter.getPagination(tutorialsCacheBuild.res)
}

const query = async () => {
    const qs: StrapiOperator = {
        locale: 'all',
        fields: ['title', 'publishedAt', 'scheduleToPublishAt'],
        sort: ['updatedAt:DESC']
    }
    const qp = strapier.qs(qs)
    const url = `/tutorials?${qp.toString()}`
    return (tutorialsCacheBuild.res = await strapier.fetch(url))
}

export default tutorialsCacheBuild
