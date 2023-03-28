import { StrapiOperator } from '../helpers/request'
import strapier from '../strapier'

interface Props {
    noFilters: boolean
}

const tutorialsCacheBuild = {
    res: { data: null },
    req: async (props?: Props) => await query(props),
    data: () => strapier.formatter.getData(tutorialsCacheBuild.res),
    pagination: () => strapier.formatter.getPagination(tutorialsCacheBuild.res)
}

const query = async (props?: Props) => {
    const dt = new Date().toISOString()
    const qs: StrapiOperator = {
        locale: 'all',
        fields: ['title', 'publishedAt', 'scheduleToPublishAt'],
        sort: ['scheduleToPublishAt:DESC', 'publishedAt:DESC']
    }
    const qp = strapier.qs(qs)
    if (!props?.noFilters) {
        qp.append(`filters[scheduleToPublishAt][$lte]`, dt)
        qp.append(`filters[publishedAt][$lte]`, dt)
    }
    const url = `/tutorials?${qp.toString()}`
    return (tutorialsCacheBuild.res = await strapier.fetch(url))
}

export default tutorialsCacheBuild
