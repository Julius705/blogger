import { useEffect, useState } from "react";
import API from "../utils/api";
import PostCard from "../components/PostCard";

function Dashboard() {
  const [posts, setPosts] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchPosts = async () => {
    try {
      const res = await API.get("/posts");

      // Filter only user's posts
      const myPosts = res.data.posts.filter((p) => p.author?._id === user.id);

      setPosts(myPosts);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <h2>My Posts</h2>

      {posts.length === 0 ? (
        <p>You have not created any posts yet</p>
      ) : (
        posts.map((post) => <PostCard key={post._id} post={post} showActions />)
      )}
    </div>
  );
}

export default Dashboard;
