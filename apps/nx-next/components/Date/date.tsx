import { parseISO, format } from 'date-fns'

const defaultFormat = 'LLLL d, yyyy'
export default function Date(dateString: string, formatString?: string) {
    const date = parseISO(dateString)
    return (
        <time dateTime={dateString}>
            {format(date, formatString || defaultFormat)}
        </time>
    )
}
