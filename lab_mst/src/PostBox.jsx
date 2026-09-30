import { useState } from "react";

const MAX_LENGTH = 100;

export default function PostBox() {
  // Controlled textarea: the post content lives in React state
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);

  const length = content.length;
  const isOverLimit = length > MAX_LENGTH;
  const isEmpty = content.trim().length === 0;

  // Post button is disabled when empty or over the limit
  const isDisabled = isEmpty || isOverLimit;

  const handleChange = (e) => setContent(e.target.value);

  const handlePost = () => {
    if (isDisabled) return;
    setPosts([content.trim(), ...posts]);
    setContent("");
  };

  return (
    <section className="postbox">
      <h1>Post Box</h1>

      <textarea
        className={isOverLimit ? "input input-error" : "input"}
        value={content}
        onChange={handleChange}
        placeholder="What's on your mind?"
        rows={4}
        aria-invalid={isOverLimit}
        aria-describedby="post-error post-counter"
      />

      <div className="meta">
        <p id="post-error" className="error" role="alert">
          {isOverLimit
            ? `Post is ${length - MAX_LENGTH} character${
                length - MAX_LENGTH === 1 ? "" : "s"
              } too long. Limit is ${MAX_LENGTH}.`
            : ""}
        </p>
        <span
          id="post-counter"
          className={isOverLimit ? "counter counter-error" : "counter"}
        >
          {length}/{MAX_LENGTH}
        </span>
      </div>

      <button className="btn" onClick={handlePost} disabled={isDisabled}>
        Post
      </button>

      {posts.length > 0 && (
        <ul className="posts">
          {posts.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
