// Fonts
import { Inter, Noto_Sans_TC, Nunito, Rubik } from '@next/font/google'

export const inter = Inter({
    weight: ['100', '900'],
    style: ['normal'],
    subsets: ['latin'],
    variable: '--font-inter'
})

export const notoSansTC = Noto_Sans_TC({
    weight: ['100', '900'],
    style: ['normal'],
    subsets: ['latin'],
    variable: '--font-notoSansTC'
})

export const nunito = Nunito({
    weight: ['300', '900'],
    style: ['normal'],
    subsets: ['latin'],
    variable: '--font-nunito'
})

export const rubik = Rubik({
    weight: ['300', '900'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
    variable: '--font-rubik'
})
