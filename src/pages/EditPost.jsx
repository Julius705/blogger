import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../utils/api";

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      const res = await API.get(`/posts/${id}`);
      setTitle(res.data.post.title);
      setContent(res.data.post.content);
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/posts/${id}`, { title, content });
      alert("Updated");
      navigate("/dashboard");
    } catch (err) {
      alert("Error updating");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Post</h2>

      <input value={title} onChange={(e) => setTitle(e.target.value)} />

      <textarea value={content} onChange={(e) => setContent(e.target.value)} />

      <button type="submit">Update</button>
    </form>
  );
}

export default EditPost;
