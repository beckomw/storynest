import React, { useEffect, useState } from 'react'
import { fetchStory, updateStory } from '../api/api'
import { useParams } from "react-router-dom";
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useStorynest } from '../context/StorynestContext';

const StoryEdit = () => {
  const {id} = useParams();
  const [story, setStory] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const {user} = useAuth0();
  const {token} = useStorynest();

  useEffect(() => {
    const getStory = async() => {
      const response = await fetchStory(id);
      setStory(response.data)
      setTitle(response.data.title)
      setContent(response.data.content)
    }
    
    getStory();
  }, [])

  const handleSave = async(e, id) => {
    e.preventDefault();
    const storyData = {
      email: user.email,
      title: title,
      content: content
    }
    try {
      const response = await updateStory(token, id, storyData);
      console.log({response});
      
      if (response.status === 200) {
        navigate(`/stories`)
      } else {
        alert("Error updating story")
      }
    } catch (error) {
      console.log({error});
      
    }
  }

  return (
    <form onSubmit={(e) => handleSave(e, story.id)}>
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
          minWidth:"400px"
        }}
      >
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