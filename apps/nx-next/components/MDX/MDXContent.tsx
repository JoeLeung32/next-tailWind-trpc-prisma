import React from 'react'
import { remark } from 'remark'
import html from 'remark-html'
import styles from './content.module.css'

const MDXContent = ({ content }: { content: string }) => {
    const [mdx, setMdx] = React.useState<string | null>(null)
    const fetchData = async () => {
        const { value } = await remark().use(html).process(content)
        setMdx(value.toString())
    }
    React.useEffect(() => {
        fetchData().catch(console.error)
    }, [content])
    if (mdx) {
        return (
            <>
                <div
                    className={styles.mdxContent}
                    dangerouslySetInnerHTML={{ __html: mdx }}
                />
            </>
        )
    }
    return <>No Content</>
}

export default MDXContent
