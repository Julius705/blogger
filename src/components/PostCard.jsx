import { Link, useNavigate } from "react-router-dom";
import API from "../utils/api";

function PostCard({ post, showActions = false, onDelete }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const isOwner = user?.id === post.author?._id;

  const handleDelete = async () => {
    if (!window.confirm("Delete this post?")) return;

    try {
      await API.delete(`/posts/${post._id}`);
      alert("Deleted successfully");
      if (onDelete) onDelete(post._id);
    } catch (err) {
      alert("Error deleting post");
    }
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
      {post.image && <img src={post.image} alt={post.title} width="200" />}

      <h3>{post.title}</h3>
      <p>{post.content?.substring(0, 100)}...</p>
      <p>By: {post.author?.name || "Unknown"}</p>

      <Link to={`/post/${post._id}`}>Read More</Link>

      {showActions && isOwner && (
        <div style={{ marginTop: "10px" }}>
          <button onClick={() => navigate(`/edit/${post._id}`)}>Edit</button>
          <button onClick={handleDelete} style={{ marginLeft: "10px" }}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default PostCard;
