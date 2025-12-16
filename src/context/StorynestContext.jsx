import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export const StorynestContext = createContext();

// Demo user for the application
const DEMO_USER = {
  name: 'Demo User',
  username: 'demo_user',
  email: 'demo@storynest.app'
};

// Sample stories for demo
const DEMO_STORIES = [
  {
    id: 1,
    title: "The Adventure Begins",
    content: "In a land far away, where dragons soared through crimson skies and ancient forests whispered secrets of old, a young traveler set out on a journey that would change everything. Armed with nothing but courage and curiosity, they stepped into the unknown, ready to face whatever challenges lay ahead. The path was treacherous, winding through mountains and valleys, but with each step, the traveler grew stronger and wiser.",
    author: "storyteller",
    likes_count: 45,
    dislikes_count: 2,
    comments_count: 12,
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 2,
    title: "Midnight Mystery",
    content: "The clock struck twelve when Sarah first noticed the shadow moving across her bedroom wall. It wasn't her shadow—she was lying perfectly still. Heart pounding, she watched as the dark figure seemed to dance in the moonlight, growing larger with each passing second. Was it her imagination, or did she hear whispers coming from the darkness? Sarah reached for the lamp, but something told her that revealing the shadow's true form might be more terrifying than the mystery itself.",
    author: "nightwriter",
    likes_count: 32,
    dislikes_count: 1,
    comments_count: 8,
    created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 3,
    title: "Code & Coffee",
    content: "Every morning started the same way—terminal open, coffee brewing, and the soft glow of monitors illuminating the quiet office. But today was different. Today, the code seemed to write itself, flowing from fingertips like poetry. Variables danced, functions harmonized, and for one perfect moment, the developer felt truly connected to the machine. It was in these moments of flow that the magic of programming revealed itself.",
    author: "devdreamer",
    likes_count: 28,
    dislikes_count: 0,
    comments_count: 15,
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 4,
    title: "The Last Garden",
    content: "In a world of concrete and steel, she found the last garden. Hidden behind an abandoned warehouse, it bloomed with flowers that shouldn't exist—colors that had no names and fragrances that triggered memories of places she'd never been. An old woman sat on a stone bench, watering roses that glowed faintly in the twilight. 'You found it,' the woman said without turning around. 'Now you must decide: share its location or keep it secret forever.'",
    author: "urbanmystic",
    likes_count: 67,
    dislikes_count: 3,
    comments_count: 23,
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 5,
    title: "Letters from Tomorrow",
    content: "The first letter arrived on a Tuesday, postmarked with a date three years in the future. 'Dear Marcus,' it began, 'I know you won't believe this, but I'm writing from 2027. The lottery numbers for next week are...' Marcus laughed it off as a prank, until every prediction in the letter came true. Now, a second letter has arrived, and this one contains a warning that will change everything.",
    author: "timekeeper",
    likes_count: 89,
    dislikes_count: 5,
    comments_count: 31,
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  }
];

// Sample comments for demo
const DEMO_COMMENTS = {
  1: [
    { id: 101, author: "reader42", content: "What an incredible opening! Can't wait to read more.", likes_count: 5, dislikes_count: 0, story_id: 1, created_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), updated_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString() },
    { id: 102, author: "bookworm", content: "The imagery here is absolutely stunning.", likes_count: 3, dislikes_count: 0, story_id: 1, created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(), updated_at: new Date(Date.now() - 30 * 60 * 1000).toISOString() }
  ],
  2: [
    { id: 201, author: "nightowl", content: "This gave me chills! Perfect atmospheric horror.", likes_count: 8, dislikes_count: 0, story_id: 2, created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), updated_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() }
  ],
  3: [
    { id: 301, author: "coder101", content: "As a developer, I felt this in my soul.", likes_count: 12, dislikes_count: 0, story_id: 3, created_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), updated_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString() },
    { id: 302, author: "techwriter", content: "Beautifully captures the zen of coding.", likes_count: 6, dislikes_count: 0, story_id: 3, created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), updated_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString() }
  ],
  4: [
    { id: 401, author: "naturelover", content: "This is hauntingly beautiful.", likes_count: 15, dislikes_count: 0, story_id: 4, created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() }
  ],
  5: [
    { id: 501, author: "scifan", content: "Time travel done right! More please!", likes_count: 20, dislikes_count: 1, story_id: 5, created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() }
  ]
};

// eslint-disable-next-line react/prop-types
export const StorynestProvider = ({ children }) => {
  const [name, setName] = useState(DEMO_USER.name);
  const [username, setUsername] = useState(DEMO_USER.username);
  const [stories, setStories] = useState(DEMO_STORIES);
  const [story, setStory] = useState([]);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [allComments, setAllComments] = useState(DEMO_COMMENTS);

  // Demo user is always "authenticated"
  const isAuthenticated = true;
  const isGuest = false;
  const user = DEMO_USER;
  const token = 'demo-token';

  // Get comments for a specific story
  const getStoryComments = (storyId) => {
    return allComments[storyId] || [];
  };

  // Add a comment to a story
  const addComment = (storyId, commentData) => {
    const newComment = {
      id: Date.now(),
      ...commentData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    setAllComments(prev => ({
      ...prev,
      [storyId]: [...(prev[storyId] || []), newComment]
    }));
    // Update comment count on story
    setStories(prev => prev.map(s =>
      s.id === parseInt(storyId)
        ? { ...s, comments_count: s.comments_count + 1 }
        : s
    ));
    return newComment;
  };

  // Add a new story
  const addStory = (storyData) => {
    const newStory = {
      id: Date.now(),
      ...storyData,
      author: username,
      likes_count: 0,
      dislikes_count: 0,
      comments_count: 0,
      created_at: new Date().toISOString()
    };
    setStories(prev => [newStory, ...prev]);
    return newStory;
  };

  // Placeholder functions for compatibility
  const logout = () => {};
  const loginWithRedirect = () => {};
  const loginAsGuest = () => {};

  return (
    <StorynestContext.Provider
      value={{
        logout,
        loginWithRedirect,
        loginAsGuest,
        name,
        isAuthenticated,
        isGuest,
        user,
        stories,
        setStories,
        token,
        story,
        setStory,
        comments,
        setComments,
        username,
        setUsername,
        isLoading,
        setIsLoading,
        getStoryComments,
        addComment,
        addStory,
        allComments
      }}
    >
      {children}
    </StorynestContext.Provider>
  );
};

export const useStorynest = () => {
  const context = useContext(StorynestContext);
  if (!context) {
    throw new Error("useStorynest must be used within a StorynestProvider");
  }
  return context;
};
