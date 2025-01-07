import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

export const StorynestContext = createContext();

// eslint-disable-next-line react/prop-types
export const StorynestProvider =  ({children}) => {
  const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [token, setToken] = useState(localStorage?.getItem('jwt'));
  const [stories, setStories] = useState([]);
  const [story, setStory] = useState([]);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    handleAuthentication();
    if(user){
      setName(user.given_name);
      setUsername(user.nickname);
    }
  }, [isAuthenticated])


  const handleAuthentication = async() => {
    if(isAuthenticated && user){
      try {
        const endpoint = `${import.meta.env.VITE_BACKEND_URL}/signin`;
        console.log({endpoint});
        const response = await axios.post(endpoint, {
          email: user.email
        })
        localStorage.setItem("jwt", response.data.access_token);
        setToken(response.data.access_token)
        console.log({response});
      } catch (error) {
        console.log(error);
      }
    }
  }
  

  return (
    <StorynestContext.Provider
      value={{ logout, loginWithRedirect, name, isAuthenticated, user, stories, setStories, token, story, setStory, comments, setComments, username, setUsername, isLoading, setIsLoading}}
    >
      {children}
    </StorynestContext.Provider>
  );
}

export const useStorynest = () => {
  const context = useContext(StorynestContext);
  if (!context) {
    throw new Error("useStorynest must be used within a StorynestProvider");
  }
  return context;
}
