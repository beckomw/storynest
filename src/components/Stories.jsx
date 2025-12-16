import { useState } from "react";
import Navbar from "./Navbar.jsx";
import { useStorynest } from "../context/StorynestContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentAlt } from "@fortawesome/free-regular-svg-icons";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import "../App.css";

function Stories() {
  const { stories, setStories, setStory, username } = useStorynest();
  const [hoveredStoryId, setHoveredStoryId] = useState(null);
  const navigate = useNavigate();

  const handleClick = (id) => {
    const clickedStory = stories.filter((story) => story.id === id);
    setStory(clickedStory);
    navigate(`/stories/${id}`);
  };

  const handleLikes = (story) => {
    story.likes_count += 1;
    setStories([...stories]);
  };

  const handleDislikes = (story) => {
    story.dislikes_count += 1;
    setStories([...stories]);
  };

  const handleEdit = (e, id) => {
    e.stopPropagation();
    navigate(`/stories/${id}/edit`);
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    const updatedStories = stories.filter((story) => story.id !== id);
    setStories(updatedStories);
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

  return (
    <main style={{ maxWidth: "1000px" }}>
      <Navbar />
      <div
        style={{
          right: "20px",
          zIndex: "100",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "black",
          padding: "10px",
          width: "500px",
          margin: "0 auto",
          marginBottom: '-1rem'
        }}
      >
        <h1>Stories</h1>
        <Link to="/stories/create">
          <button
            style={{
              padding: "10px 20px",
              borderRadius: "5px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            Create Story
          </button>
        </Link>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          padding: "20px",
          borderRadius: "15px",
          boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
          textAlign: "center",
          margin: "0 auto",
          maxWidth: "100%",
        }}
      >
        <div style={{ maxWidth: "1100px" }}>
          {stories
            ?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .map((story) => {
              const timeAgo = calculateTimeAgo(story.created_at);
              return (
                <div
                  key={story.id}
                  style={{
                    cursor: "pointer",
                    backgroundColor:
                      hoveredStoryId === story.id ? "#e8effe" : "white",
                    borderRadius: "8px",
                    padding: "10px 15px",
                    margin: "8px 0",
                    transition: "all 0.25s ease",
                    textAlign: "left",
                    transform:
                      hoveredStoryId === story.id ? "scale(1.02)" : "scale(1)",
                    boxShadow:
                      hoveredStoryId === story.id
                        ? "0 4px 12px rgba(0, 0, 0, 0.15)"
                        : "none",
                  }}
                  onClick={() => handleClick(story.id)}
                  onMouseEnter={() => setHoveredStoryId(story.id)}
                  onMouseLeave={() => setHoveredStoryId(null)}
                >
                  <h2
                    style={{
                      fontSize: "12px",
                    }}
                  >
                    - {story.author} * {timeAgo}
                  </h2>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      zIndex: "200",
                    }}
                  >
                    <h3
                      style={{
                        margin: "10px 0",
                        fontSize: "1.5rem",
                        color: "#333",
                      }}
                    >
                      {story.title}
                    </h3>
                    {story.author === username && (
                      <div>
                        <button
                          onClick={(e) => handleEdit(e, story.id)}
                          style={{
                            zIndex: "300",
                            background: "white",
                            padding: "4px 4px",
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faEdit}
                            style={{ color: "gray", cursor: "pointer" }}
                          />
                        </button>
                        <button
                          onClick={(e) => handleDelete(e, story.id)}
                          style={{
                            zIndex: "300",
                            background: "white",
                            padding: "4px 4px",
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faTrash}
                            style={{ color: "gray", cursor: "pointer" }}
                          />
                        </button>
                      </div>
                    )}
                  </div>

                  <p
                    style={{
                      fontSize: "1rem",
                      color: "#555",
                      maxWidth: "500px",
                    }}
                  >
                    {story.content}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      gap: "10px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: "#f0f0f0",
                        borderRadius: "10px",
                        gap: "3px",
                      }}
                    >
                      <button
                        className="arrow"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLikes(story);
                        }}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          padding: "0px 6px",
                          marginTop: "2px",
                          color: "gray",
                        }}
                      >
                        <FaArrowUp className="fa-arrow-up" size={15} />
                      </button>
                      <span>{story.likes_count - story.dislikes_count}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDislikes(story);
                        }}
                        className="arrow"
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          padding: "0px 6px",
                          marginTop: "2px",
                          color: "gray",
                        }}
                      >
                        <FaArrowDown className="fa-arrow-down" size={15} />
                      </button>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: "#f0f0f0",
                        borderRadius: "10px",
                        padding: "5px 10px",
                        gap: "10px",
                      }}
                    >
                      <FontAwesomeIcon icon={faCommentAlt} size="sm" />
                      <span>{story.comments_count}</span>
                    </div>
                  </div>
                  <div
                    style={{
                      borderBottom: "1px solid #e0e2e5",
                      marginTop: ".5rem",
                      width: "500px",
                    }}
                  ></div>
                </div>
              );
            })}
        </div>
      </div>
    </main>
  );
}

export default Stories;
