import { StrapiOperator } from '../helpers/request'
import strapier from '../strapier'

interface Props {
    locale: string
}

const aboutJoe = {
    res: { data: null },
    req: async (props: Props) => await query(props),
    data: () => strapier.formatter.getData(aboutJoe.res),
    pagination: () => strapier.formatter.getPagination(aboutJoe.res)
}

const query = async (props: Props) => {
    const nextLocale = props.locale || 'en'
    const qs: StrapiOperator = {
        locale: strapier.locale(nextLocale)
    }
    const qp = strapier.qs(qs)
    const url = `/about-joe?${qp.toString()}`
    return (aboutJoe.res = await strapier.fetch(url))
}

export default aboutJoe
