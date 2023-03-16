import NextError from 'next/error';
import {useRouter} from 'next/router';
import {RouterOutput, trpc} from "../../utils/trpc";

type PostByIdOutput = RouterOutput['post']['byId'];

function PostItem(props: { post: PostByIdOutput }) {
    const {post} = props;
    return (
        <>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <h2>Raw data:</h2>
            <pre>{JSON.stringify(post, null, 4)}</pre>
        </>
    );
}

const PostViewPage = () => {
    const id = useRouter().query.id as string;
    let postQuery

    if (id) {
        postQuery = trpc.post.byId.useQuery({id})
    }

    if (postQuery) {
        if (postQuery.status === 'success') {
            return <PostItem post={postQuery.data}/>;
        }
        if (postQuery.error) {
            return (
                <NextError
                    title={postQuery.error.message}
                    statusCode={postQuery.error.data?.httpStatus ?? 500}
                />
            );
        }
    }

    return <>Loading...</>;
};

export default PostViewPage;
