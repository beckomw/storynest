import React, { useEffect, useState, useRef } from 'react'
import { useStorynest } from '../context/StorynestContext'
import { useParams } from "react-router-dom";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import Navbar from '../components/Navbar.jsx';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

const Story = () => {
  const { id } = useParams();
  const { stories, setStory, story, username, user, getStoryComments, addComment, allComments } = useStorynest();
  const [isFocused, setIsFocused] = useState(false);
  const [comment, setComment] = useState("");
  const [isEditing, setIsEditing] = useState(null);
  const [editedContent, setEditedContent] = useState('');
  const [comments, setComments] = useState([]);
  const textareaRef = useRef(null);

  useEffect(() => {
    // Load comments for this story from context
    const storyComments = getStoryComments(id);
    setComments(storyComments);
  }, [id, allComments]);

  useEffect(() => {
    const selectedStory = stories.filter(s => s.id === parseInt(id));
    if(selectedStory){
      setStory(selectedStory)
    }
  }, [id, stories]);

  useEffect(() => {
    if (isFocused && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isFocused]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setComment("");
  };

  const handleSubmit = (e) => {
    if(comment.length === 0){
      e.preventDefault();
      return;
    }
    e.preventDefault();

    const commentData = {
      id: uuidv4(),
      email: user.email,
      author: username,
      story_id: id,
      content: comment,
      likes_count: 0,
      dislikes_count: 0
    };

    handleBlur();
    addComment(id, commentData);
  };

  const handleEdit = (commentId) => {
    setIsEditing(commentId);
    const commentToEdit = comments.find((c) => c.id === commentId);
    setEditedContent(commentToEdit?.content);
  };

  const handleDelete = (e, commentId) => {
    e.stopPropagation();
    setComments(comments.filter((c) => c.id !== commentId));
  };

  const handleCancel = () => {
    setIsEditing(null);
  };

  const handleSave = (commentId) => {
    setComments(comments.map(c =>
      c.id === commentId ? { ...c, content: editedContent } : c
    ));
    setIsEditing(null);
  };

  const calculateTimeAgo = (createdAt) => {
    const now = new Date();
    const createdTime = new Date(createdAt);
    const diffInSeconds = Math.abs((now - createdTime) / 1000);

    if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    } else {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} day${days !== 1 ? "s" : ""} ago`;
    }
  };

  const timeAgo = calculateTimeAgo(story[0]?.created_at);

  return (
    <main style={{ maxWidth: "1000px" }}>
      <Navbar />
      <div
        style={{
          padding: "20px",
          maxWidth: "600px",
          margin: "0",
          position: "absolute",
          top: "5rem",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <p style={{ fontWeight: "600", textAlign: "left" }}>
          - {story[0]?.author} * {timeAgo}
        </p>

        <h1
          style={{
            fontSize: "24px",
            marginBottom: "1.5rem",
            textAlign: "left",
          }}
        >
          {story[0]?.title}
        </h1>
        <p
          style={{
            fontSize: "16px",
            color: "#333",
            marginBottom: "20px",
            textAlign: "left",
          }}
        >
          {story[0]?.content}
        </p>

        <div style={{ marginBottom: "20px" }}>
          {!isFocused ? (
            <input
              type="text"
              placeholder="Add a comment"
              onFocus={handleFocus}
              style={{
                outline: "none",
                borderRadius: "1rem",
                width: "100%",
                padding: "10px",
                border: "1px solid #d1d5d8",
                backgroundColor: "#F6F7F8",
                color: "#1A1A1B",
                fontSize: "14px",
                transition: "all 0.3s ease-in-out",
              }}
            />
          ) : (
            <div
              style={{
                position: "relative",
                width: "100%",
                marginTop: "10px",
                borderRadius: "1rem",
              }}
            >
              <textarea
                ref={textareaRef}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                style={{
                  outline: "none",
                  borderRadius: "1rem",
                  width: "100%",
                  maxWidth: "600px",
                  padding: "10px",
                  border: "1px solid #d1d5d8",
                  backgroundColor: "#F6F7F8",
                  color: "#1A1A1B",
                  fontSize: "14px",
                  minHeight: "80px",
                  boxSizing: "border-box",
                  transition: "all 0.3s ease-in-out",
                }}
                placeholder="Add a comment"
              />

              <div
                style={{
                  marginTop: "10px",
                  display: "flex",
                  gap: "10px",
                  justifyContent: "flex-end",
                }}
              >
                <button
                  onClick={handleBlur}
                  style={{
                    padding: "8px 12px",
                    backgroundColor: "transparent",
                    color: "#0079D3",
                    borderRadius: "4px",
                    border: "1px solid #0079D3",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  style={{
                    padding: "8px 12px",
                    backgroundColor: "#0079D3",
                    color: "white",
                    borderRadius: "4px",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Comment
                </button>
              </div>
            </div>
          )}
        </div>
          <div>
            {comments
              .sort((a, b) => new Date(b.updated_at || b.created_at) - new Date(a.updated_at || a.created_at))
              .map((c) => (
                <div
                  key={c.id}
                  style={{
                    marginBottom: "15px",
                    padding: "10px",
                    borderBottom: "1px solid #EDEFF1",
                    textAlign: "left",
                  }}
                >
                  <p>{c.author}</p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    {isEditing === c.id ? (
                      <input
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                        style={{
                          fontSize: "14px",
                          color: "#333",
                          padding: "4px",
                          borderRadius: "4px",
                          border: "1px solid #ccc",
                        }}
                      />
                    ) : (
                      <p style={{ fontSize: "14px", color: "#333" }}>
                        {c.content}
                      </p>
                    )}

                    {c.author === username &&
                      (isEditing === c.id ? (
                        <div>
                          <button
                            onClick={() => handleCancel()}
                            style={{
                              zIndex: "300",
                              background: "white",
                              padding: "4px 4px",
                              borderRadius: "4px",
                              border: "1px solid #0079D3",
                              cursor: "pointer",
                              marginRight: "10px",
                            }}
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleSave(c.id)}
                            style={{
                              zIndex: "300",
                              background: "#0079D3",
                              color: "white",
                              padding: "4px 4px",
                              borderRadius: "4px",
                              border: "none",
                              cursor: "pointer",
                            }}
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <div>
                          <button
                            style={{
                              zIndex: "300",
                              background: "white",
                              padding: "4px 4px",
                              borderRadius: "4px",
                              border: "1px solid #ccc",
                              cursor: "pointer",
                              marginRight: "10px",
                            }}
                            onClick={() => handleEdit(c.id)}
                          >
                            <FontAwesomeIcon
                              icon={faEdit}
                              style={{ color: "gray", cursor: "pointer" }}
                            />
                          </button>
                          <button
                            onClick={(e) => handleDelete(e, c.id)}
                            style={{
                              zIndex: "300",
                              background: "white",
                              padding: "4px 4px",
                              borderRadius: "4px",
                              border: "1px solid #ccc",
                              cursor: "pointer",
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faTrash}
                              style={{ color: "gray", cursor: "pointer" }}
                            />
                          </button>
                        </div>
                      ))}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      gap: "10px",
                    }}
                  >
                    <button
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      <FaArrowUp size={24} color="gray" />
                    </button>
                    <span style={{ fontSize: "14px", color: "#333" }}>
                      {c.likes_count - c.dislikes_count}
                    </span>
                    <button
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      <FaArrowDown size={24} color="gray" />
                    </button>
                  </div>
                </div>
              ))}
          </div>
      </div>
    </main>
  );
}

export default Story
