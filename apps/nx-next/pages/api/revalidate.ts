import { NextApiRequest, NextApiResponse } from 'next'
import { TutorialsRes } from '../../utils/strapi/dataType/Tutorial'
import strapi from '../../utils/strapi'
import strapier from '../../utils/strapi/strapier'

const BreakException = {}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const pages: string[] = ['/en/tutorial', '/zh/tutorial']

    if (req.query.secret !== process.env.REVALIDATE_TOKEN) {
        return res.status(401).json({ message: 'Invalid token' })
    }

    try {
        const tutorials = await tutorialList()
        const list: string[] = [...pages, ...tutorials].sort()

        list.map(async (path) => {
            await res.revalidate(path)
        })
        return res.json({
            revalidated: true
        })
    } catch (err) {
        return res.status(500).send('Error revalidating')
    }
}

const tutorialList = async () => {
    const list: string[] = []
    const articles: TutorialsRes = await strapi.tutorialsCacheBuild.req({
        noFilters: true
    })
    if (articles.data && Array.isArray(articles.data)) {
        try {
            articles.data.forEach(({ attributes }) => {
                if (typeof attributes.locale === undefined) throw BreakException
                if (typeof attributes.title === undefined) throw BreakException
                const locale = strapier.searchLocale(attributes.locale) || 'en'
                const url = `/${locale}/tutorial/${attributes.title}`
                list.push(url)
            })
        } catch (e) {
            if (e !== BreakException) throw e
        }
    }
    return list
}
