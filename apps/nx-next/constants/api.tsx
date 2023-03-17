import process from 'process'

const Api = {
    get: async (path: string) => {
        const res = await fetch(`${process.env.API_URL}${path}`, {
            headers: {
                Authorization: `Bearer ${process.env.API_TOKEN}`
            }
        })
        return await res.json()
    }
}

export default Api
