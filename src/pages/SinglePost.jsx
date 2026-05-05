import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../utils/api";

function SinglePost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  const fetchPost = async () => {
    try {
      const res = await API.get(`/posts/${id}`);
      setPost(res.data.post);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  if (!post) return <p>Loading...</p>;

  return (
    <div>
      <h2>{post.title}</h2>

      {post.image && (
        <img
          src={`http://localhost:5000/uploads/${post.image}`}
          alt=""
          width="300"
        />
      )}

      <p>{post.content}</p>

      <p>By: {post.author?.name}</p>
    </div>
  );
}

export default SinglePost;
