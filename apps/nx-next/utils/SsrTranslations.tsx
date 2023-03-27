import { Namespace } from 'i18next'
import { UserConfig } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import i18nConfig from '../next-i18next.config'
type ArrayElementOrSelf<T> = T extends Array<infer U> ? U[] : T[]
const SsrTranslations = async (
    initialLocale: string,
    namespacesRequired?: ArrayElementOrSelf<Namespace> | undefined,
    configOverride?: UserConfig | null,
    extraLocales?: string[] | false
) => await serverSideTranslations(initialLocale, namespacesRequired, i18nConfig)

export default SsrTranslations
