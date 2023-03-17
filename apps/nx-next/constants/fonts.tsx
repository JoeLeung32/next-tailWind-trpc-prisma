// Fonts
import { Inter, Noto_Sans_TC, Nunito, Rubik } from '@next/font/google'

export const inter = Inter({
    style: ['normal'],
    subsets: ['latin'],
    variable: '--font-inter'
})

export const notoSansTC = Noto_Sans_TC({
    weight: ['400', '700'],
    style: ['normal'],
    subsets: ['latin'],
    variable: '--font-notoSansTC'
})

export const nunito = Nunito({
    style: ['normal'],
    subsets: ['latin'],
    variable: '--font-nunito'
})

export const rubik = Rubik({
    style: ['normal', 'italic'],
    subsets: ['latin'],
    variable: '--font-rubik'
})
