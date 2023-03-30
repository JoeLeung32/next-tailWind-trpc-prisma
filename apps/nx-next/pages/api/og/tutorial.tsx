import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { ImageResponse } from '@vercel/og'
import { nunito, nunitoBold, nunitoLight } from './fonts'

export const config = {
    runtime: 'experimental-edge'
}

const handler: NextApiHandler = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const nunitoData = await nunito
    const nunitoLightData = await nunitoLight
    const nunitoBoldData = await nunitoBold
    const { searchParams } = new URL(req.url || '')
    const qs = (name: string) => {
        return searchParams.has(name) ? searchParams.get(name) : ''
    }
    try {
        const header = qs('header')
        const headline = qs('headline')
        const tags = qs('tags')
        const createdBy = qs('createdBy')
        const publishedAt = qs('publishedAt')
        return new ImageResponse(
            (
                <div
                    tw={`bg-teal-700 flex flex-col w-full h-full p-8 pb-4`}
                    style={{
                        backgroundImage:
                            'linear-gradient(to right, #ec4899, #ef4444, #eab308)',
                        backgroundPosition: '0 0, 50% 50%, 0 0',
                        backgroundSize: '100% 100%',
                        backgroundRepeat: 'no-repeat'
                    }}
                >
                    <div
                        tw={`bg-white flex flex-row flex-1 rounded-3xl overflow-hidden shadow-xl`}
                    >
                        <div
                            tw={`flex flex-col flex-1 justify-start items-start p-12`}
                        >
                            <div
                                tw={`uppercase text-4xl`}
                                style={{ fontFamily: '"nunito-light"' }}
                            >
                                Learnbook
                            </div>
                            <div
                                tw={`tracking-wide text-6xl my-6`}
                                style={{ fontFamily: '"nunito-bold"' }}
                            >
                                {header}
                            </div>
                            <div
                                tw={`flex tracking-wider text-3xl mb-6`}
                                style={{ fontFamily: '"nunito-light"' }}
                            >
                                {headline}
                            </div>
                        </div>
                        <div
                            tw={`flex flex-col justify-start items-center p-12 tracking-wider text-lg`}
                        >
                            {tags &&
                                tags.split(',').map((tag, index) => (
                                    <div
                                        key={index}
                                        tw={`my-3 px-5 py-1 bg-gray-200 rounded-2xl`}
                                        style={{
                                            fontFamily: '"nunito-light"'
                                        }}
                                    >
                                        {tag}
                                    </div>
                                ))}
                        </div>
                    </div>
                    <div
                        tw={`bg-transparent text-teal-50 flex flex-row justify-between items-center pt-3 text-3xl`}
                    >
                        <div tw={`flex flex-row pl-8 justify-start items-end`}>
                            <div>{createdBy}</div>
                            <div tw={`ml-2 pb-1 text-sm`}>{publishedAt}</div>
                        </div>
                        <div tw={`flex text-xl pr-8`}>learn.chunkit.hk</div>
                    </div>
                </div>
            ),
            {
                fonts: [
                    {
                        name: 'nunito',
                        data: nunitoData,
                        style: 'normal'
                    },
                    {
                        name: 'nunito-light',
                        data: nunitoLightData,
                        style: 'normal'
                    },
                    {
                        name: 'nunito-bold',
                        data: nunitoBoldData,
                        style: 'normal'
                    }
                ]
            }
        )
    } catch {
        return new Response(`Failed to generate the image`, {
            status: 500
        })
    }
}

export default handler
