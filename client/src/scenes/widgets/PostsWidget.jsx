import PostWidget from "./PostWidget";

const { useEffect } = require("react");
const { useDispatch, useSelector } = require("react-redux");
const { setPosts } = require("state");

const PostsWidget = ({ userId, isProfile = false }) => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    const token = useSelector((state) => state.token);

    const getPosts = async () => {
        const response = await fetch("http://localhost:3001/posts", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },

        });
        const data = await response.json();
        dispatch(setPosts({ posts: data }));
    }

    const getUserPosts = async () => {
        const response = await fetch(`http://localhost:3001/posts/${userId}/posts`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },

        });
        const data = await response.json();
        dispatch(setPosts({ posts: data }));
    };

    useEffect(() => {
        if (isProfile) {
            getUserPosts();
        } else {
            getPosts();
        }

    }, []); // eslint-disable-next-line react-hooks/exhaustive-deps

    return (
        <>
            {posts.map(
                ({
                    _id,
                    userId,
                    firstName,
                    lastName,
                    description,
                    location,
                    userPicturePath,
                    picturePath,
                    likes,
                    comments
                }) => {
                    <PostWidget
                        key={_id}
                        postId={_id}
                        postUserId={userId}
                        name={`${firstName} ${lastName}`}
                        description={description}
                        location={location}
                        userPicturePath={userPicturePath}
                        picturePath={picturePath}
                        likes={likes}
                        comments={comments} />
                })}
        </>
    )
}

export default PostsWidget;