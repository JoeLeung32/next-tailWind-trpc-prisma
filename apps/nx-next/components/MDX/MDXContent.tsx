import React from 'react'
import { remark } from 'remark'
// import html from 'remark-html'
import breaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeStringify from 'rehype-stringify'
// import { toString } from 'hast-util-to-string'
import { h } from 'hastscript'
import styles from './content.module.css'

const Icon = () => {
    return <span>123</span>
}

const MDXContent = ({ content }: { content: string }) => {
    const [mdx, setMdx] = React.useState<string | null>(null)
    const fetchData = async () => {
        const { value } = await remark()
            .use(breaks)
            .use(remarkGfm)
            .use(remarkRehype)
            .use(rehypeSlug)
            .use(rehypeAutolinkHeadings, {
                content() {
                    return [h(`i.${styles.icon}`, { ariaHidden: 'true' })]
                }
            })
            .use(rehypeStringify)
            // .use(html)
            .process(content)
        setMdx(value.toString())
    }
    React.useEffect(() => {
        fetchData().catch(console.error)
    }, [content])
    if (mdx) {
        return (
            <div
                className={styles.mdxContent}
                dangerouslySetInnerHTML={{ __html: mdx }}
            />
        )
    }
    return <>No Content</>
}

export default MDXContent
