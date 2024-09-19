import { useState } from 'react';
import PostForm from "./PostForm";
import PostList from "./PostList";

const PostTab = () => {
    const [postsUpdated, setPostsUpdated] = useState(false);

    const handleSuccess = () => {
        console.log('Post submitted successfully');
        setPostsUpdated(prev => !prev);
    }

    return (
        <div className="tab-content">
            <PostList postsUpdated={postsUpdated} />
            <PostForm onSuccess={handleSuccess} />
        </div>
    );
}

export default PostTab;
