import { StrapiOperator } from '../helpers/request'
import strapier from '../strapier'

interface Props {
    locale: string
}

const aboutLearnbook = {
    res: { data: null },
    req: async (props: Props) => await query(props),
    data: () => strapier.formatter.getData(aboutLearnbook.res),
    pagination: () => strapier.formatter.getPagination(aboutLearnbook.res)
}

const query = async (props: Props) => {
    const nextLocale = props.locale || 'en'
    const qs: StrapiOperator = {
        locale: strapier.locale(nextLocale)
    }
    const qp = strapier.qs(qs)
    const url = `/about-learnbook?${qp.toString()}`
    return (aboutLearnbook.res = await strapier.fetch(url))
}

export default aboutLearnbook
