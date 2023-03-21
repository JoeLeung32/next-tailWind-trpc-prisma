import process from 'process'
import { StrapiOperator } from './helpers/request'
import { StrapiResProps } from './helpers/response'

interface LocaleMapping {
    [key: string]: string
}

const mapping: LocaleMapping = {
    en: 'en',
    zh: 'zh-Hant',
    'zh-HK': 'zh-Hant',
    'zh-TW': 'zh-Hant',
    'zh-CN': 'zh-Hant'
}

const strapier = {
    qs: (q: StrapiOperator) => {
        const qs = new URLSearchParams()
        Object.entries(q).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                qs.append(key, value.join(','))
            } else {
                qs.append(key, value.toString())
            }
        })
        return qs
    },
    fetch: async (path: string) => {
        const input = `${process.env.STRAPI_API_URL}${path}`
        const res = await fetch(input, {
            headers: {
                Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
            }
        })
        return await res.json()
    },
    formatter: {
        getData: ({ data }: StrapiResProps) => {
            const isArray = Array.isArray(data)
            let result
            if (data) {
                if (!isArray) {
                    result = {
                        id: data.id,
                        ...data.attributes
                    }
                } else {
                    result = data.map((d) => {
                        return {
                            id: d.id,
                            ...d.attributes
                        }
                    })
                }
            }
            return result
        },
        getPagination: ({ meta }: StrapiResProps) => {
            return {
                ...meta?.pagination
            }
        }
    },
    locale: (nextLocale: string) => mapping[nextLocale] || 'en'
}

export default strapier
