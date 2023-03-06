import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {
  const [title, setTitle] = useState("");
  const [body, setbody] = useState("");
  const [author, setAuthor] = useState("");
  const [ispending, setIspending] = useState(false);
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { title, body, author };
    setIspending(true);
    console.log(blog);

    fetch("http://localhost:8000/blogs/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog),
    }).then(() => {
      console.log("new blog added");
      setIspending(false);
      history.push("/");
    });
  };
  return (
    <div className="create">
      <h2>Add New Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Blog body:</label>
        <textarea
          required
          value={body}
          onChange={(e) => setbody(e.target.value)}
        ></textarea>
        <label> Blog author:</label>
        <select value={author} onChange={(e) => setAuthor(e.target.value)}>
          <option value="yoshi">yoshi</option>
          <option value="mario">mario</option>
        </select>
        {!ispending && <button>Add Blog</button>}
        {ispending && <button disabled>Adding Blog...</button>}
      </form>
    </div>
  );
};

export default Create;
