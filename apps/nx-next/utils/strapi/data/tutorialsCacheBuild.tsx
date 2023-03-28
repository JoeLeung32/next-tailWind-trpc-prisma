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
        sort: ['scheduleToPublishAt:DESC', 'publishedAt:DESC']
    }
    const qp = strapier.qs(qs)
    qp.append(`filters[scheduleToPublishAt][$lte]`, new Date().toISOString())
    qp.append(`filters[publishedAt][$lte]`, new Date().toISOString())
    const url = `/tutorials?${qp.toString()}`
    return (tutorialsCacheBuild.res = await strapier.fetch(url))
}

export default tutorialsCacheBuild
