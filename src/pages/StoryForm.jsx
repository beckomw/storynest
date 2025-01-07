import { useState } from 'react'
import { createStory } from '../api/api'
import { useAuth0 } from '@auth0/auth0-react'
import { useStorynest } from '../context/StorynestContext'
import { useNavigate } from 'react-router-dom'

const StoryForm = () => {

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const {user} = useAuth0();
  const {token, username} = useStorynest();
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

  const handleSubmit = async (event) => {
    if(title.length === 0 && content.length === 0){
      event.preventDefault();
      return;
    }
    event.preventDefault()
    
    const storyData = {
      "email": user.email,
      "title": title,
      "author": username,
      "content": content,
      "views_count": 0,
      "likes_count": 0,
      "dislikes_count": 0,
      "comments_count": 0,
      "tags": ["story", "something"],
      "created_at": new Date().toISOString(),
      "is_featured": false,
    };
    console.log("Submitting storyData:", storyData);

    try {
      const response = await createStory(token, storyData);
      console.log('RESPONSE CREATING A STORY ', response);
      
      navigate("/stories");
    } catch (error) {
      console.error(
        "Error creating story:",
        error.response?.data || error.message
      );
    }
    
    navigate('/stories');
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        maxWidth: "400px",
        margin: "0 auto",
      }}
    >
      <div style={{ marginBottom: "15px" }}>
        <label
          style={{
            display: "block",
            fontSize: "16px",
            fontWeight: "bold",
            marginBottom: "5px",
          }}
        >
          Title:
          <input
            onChange={handleTitleChange}
            type="text"
            name="title"
            value={title}
            style={{
              width: "100%",
              padding: "8px",
              boxSizing: "border-box",
              borderRadius: "4px",
              border: "1px solid #ccc",
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
          }}
        >
          Content:
          <textarea
            onChange={handleContentChange}
            name="content"
            rows="4"
            cols="50"
            value={content}
            style={{
              width: "100%",
              padding: "8px",
              boxSizing: "border-box",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </label>
      </div>

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
  );
}

export default StoryForm