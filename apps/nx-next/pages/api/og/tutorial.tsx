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
        const username = qs('username')
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
                        tw={`bg-white flex flex-col flex-1 rounded-3xl overflow-hidden shadow-xl`}
                    >
                        <div tw={`flex flex-row flex-1 px-12 pt-12`}>
                            <div
                                tw={`flex flex-col flex-1 justify-start items-start pr-12`}
                            >
                                <div
                                    tw={`uppercase text-2xl`}
                                    style={{ fontFamily: '"nunito-bold"' }}
                                >
                                    Learnbook
                                </div>
                                <div
                                    tw={`text-6xl my-3`}
                                    style={{ fontFamily: '"nunito-bold"' }}
                                >
                                    {header}
                                </div>
                                <div
                                    tw={`flex text-3xl mb-6`}
                                    style={{ fontFamily: '"nunito-light"' }}
                                >
                                    {headline}
                                </div>
                                <div tw={`flex flex-row`}>
                                    {tags &&
                                        tags.split(',').map((tag, index) => (
                                            <div
                                                key={index}
                                                tw={`mr-3 px-5 py-1 bg-gray-200 rounded-2xl text-lg`}
                                            >
                                                {tag}
                                            </div>
                                        ))}
                                </div>
                            </div>
                            <div
                                tw={`flex flex-col justify-start items-center`}
                            >
                                {username && username.length && (
                                    <img
                                        width={256}
                                        height={256}
                                        src={`https://github.com/${username}.png`}
                                        tw={`rounded-full`}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    <div
                        tw={`bg-transparent text-teal-50 flex flex-row justify-between items-center pt-3 text-3xl`}
                        style={{ fontFamily: '"nunito-bold"' }}
                    >
                        <div tw={`flex flex-row pl-8 justify-start items-end`}>
                            <div>{createdBy}</div>
                            <div tw={`flex text-xl uppercase`}>
                                <div tw={`ml-2`}>/</div>
                                <div tw={`mr-2`}>/</div>
                                <div>{publishedAt}</div>
                            </div>
                        </div>
                        <div tw={`flex text-2xl pr-8`}>learn.chunkit.hk</div>
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
