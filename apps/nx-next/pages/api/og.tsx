import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { ImageResponse } from '@vercel/og'

export const config = {
    runtime: 'experimental-edge'
}

const handler: NextApiHandler = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const { searchParams } = new URL(req.url || '')
    const qs = (name: string) => {
        return searchParams.has(name) ? searchParams.get(name) : ''
    }
    try {
        const header = qs('header')
        const headline = qs('headline')
        const style = {
            bg: {
                backgroundColor: 'white',
                fontSize: 32,
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
            }
        }
        return new ImageResponse(
            (
                <div style={style.bg}>
                    <div>Learnbook</div>
                    <div>{header}</div>
                    <div>{headline}</div>
                </div>
            )
        )
    } catch {
        return new Response(`Failed to generate the image`, {
            status: 500
        })
    }
}

export default handler
