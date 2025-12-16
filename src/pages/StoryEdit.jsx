import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar';
import { useStorynest } from '../context/StorynestContext';

const StoryEdit = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const { stories, setStories } = useStorynest();

  useEffect(() => {
    // Find the story from local state
    const storyToEdit = stories.find(s => s.id === parseInt(id));
    if (storyToEdit) {
      setTitle(storyToEdit.title);
      setContent(storyToEdit.content);
    }
  }, [id, stories]);

  const handleSave = (e) => {
    e.preventDefault();

    if (title.length === 0 || content.length === 0) {
      alert('Please fill in both title and content');
      return;
    }

    // Update the story in local state
    setStories(stories.map(s =>
      s.id === parseInt(id)
        ? { ...s, title, content, updated_at: new Date().toISOString() }
        : s
    ));

    navigate('/stories');
  }

  return (
    <form onSubmit={handleSave}>
      <Navbar />
      <div
        style={{
          maxWidth: "800px",
          padding: "20px",
          position: "absolute",
          top: "10rem",
          left: "50%",
          transform: "translateX(-50%)",
          border: "1px solid #ccc",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
          minWidth: "400px"
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "#333" }}>Edit Story</h2>

        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="title"
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            Title
          </label>
          <input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              fontSize: "16px",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="content"
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              fontSize: "16px",
              boxSizing: "border-box",
              minHeight: "150px",
            }}
          ></textarea>
        </div>

        <div
          style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}
        >
          <button
            type="button"
            onClick={() => navigate('/stories')}
            style={{
              padding: "10px 20px",
              backgroundColor: "transparent",
              color: "#0079D3",
              borderRadius: "4px",
              border: "1px solid #0079D3",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              backgroundColor: "#0079D3",
              color: "white",
              borderRadius: "4px",
              border: "none",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}

export default StoryEdit
