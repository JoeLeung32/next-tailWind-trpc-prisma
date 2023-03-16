import styles from './index.module.css';
import * as process from "process";

export async function getServerSideProps(context) {
    const apiPath = `tutorials?fields=title,headline,publishedAt,scheduleToPublishAt`
    const apiURL = `${process.env.API_URL}${apiPath}`
    const res = await fetch(apiURL, {
        headers: {
            Authorization: `Bearer ${process.env.API_TOKEN}`
        }
    })
    const data = await res.json()
    console.log('~>', data)
    return {
        props: {
            data: data
        }
    }
}

export function Index(props) {
    const {data} = props
    const total = data?.meta?.pagination?.total || 0
    const list = data?.data || []
    const error = data?.error || null
    return (
        <div className={styles.page}>
            <h1>Hello Joe!</h1>
            <p>Total: {total}</p>
            {list && list.length ? (
                list.map(({id, attributes}) => (
                    <div key={`ele${id}`}>{attributes.title}</div>
                ))
            ) : (
                <div>
                    <h1>{error.status}</h1>
                    <p>{error.message}</p>
                    <small>{error.name}</small>
                </div>
            )}
        </div>
    );
}

export default Index;
