import { useState } from 'react'
import { useStorynest } from '../context/StorynestContext'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

const StoryForm = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const { username, addStory } = useStorynest();
  const navigate = useNavigate();

  const handleTitleChange = (event) => {
    const titleValue = event.target.value;
    setTitle(titleValue);
  }

  const handleContentChange = (event) => {
    const contentValue = event.target.value;
    setContent(contentValue);
  }

  const handleReset = () => {
    setTitle('');
    setContent('');
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if(title.length === 0 || content.length === 0){
      alert('Please fill in both title and content');
      return;
    }

    const storyData = {
      title: title,
      content: content,
    };

    addStory(storyData);
    navigate('/stories');
  }

  return (
    <main style={{ maxWidth: "1000px" }}>
      <Navbar />
      <form
        onSubmit={handleSubmit}
        style={{
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          maxWidth: "400px",
          margin: "20px auto",
          backgroundColor: "white",
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "#333" }}>Create a New Story</h2>

        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              fontSize: "16px",
              fontWeight: "bold",
              marginBottom: "5px",
              color: "#333",
            }}
          >
            Title:
            <input
              onChange={handleTitleChange}
              type="text"
              name="title"
              value={title}
              placeholder="Enter your story title"
              style={{
                width: "100%",
                padding: "8px",
                boxSizing: "border-box",
                borderRadius: "4px",
                border: "1px solid #ccc",
                marginTop: "5px",
              }}
            />
          </label>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              fontSize: "16px",
              fontWeight: "bold",
              marginBottom: "5px",
              color: "#333",
            }}
          >
            Content:
            <textarea
              onChange={handleContentChange}
              name="content"
              rows="6"
              value={content}
              placeholder="Write your story here..."
              style={{
                width: "100%",
                padding: "8px",
                boxSizing: "border-box",
                borderRadius: "4px",
                border: "1px solid #ccc",
                marginTop: "5px",
              }}
            />
          </label>
        </div>

        <p style={{ fontSize: "12px", color: "#666", marginBottom: "15px" }}>
          Posting as: <strong>{username}</strong>
        </p>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Submit
          </button>
          <button
            type="button"
            onClick={() => handleReset()}
            style={{
              padding: "10px 20px",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Reset
          </button>
        </div>
      </form>
    </main>
  );
}

export default StoryForm
