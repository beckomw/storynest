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
  const { isAuthenticated: auth0Authenticated, user, loginWithRedirect, logout: auth0Logout } = useAuth0();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [token, setToken] = useState(localStorage?.getItem('jwt'));
  const [stories, setStories] = useState([]);
  const [story, setStory] = useState([]);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isGuest, setIsGuest] = useState(localStorage?.getItem('isGuest') === 'true');

  // Combined authentication status (Auth0 or Guest)
  const isAuthenticated = auth0Authenticated || isGuest;

  // Guest login function
  const loginAsGuest = () => {
    setIsGuest(true);
    setName('Guest');
    setUsername('guest');
    localStorage.setItem('isGuest', 'true');
  };

  // Combined logout function
  const logout = (options) => {
    if (isGuest) {
      setIsGuest(false);
      setName('');
      setUsername('');
      localStorage.removeItem('isGuest');
    } else {
      auth0Logout(options);
    }
  };

  useEffect(() => {
    handleAuthentication();
    if(user){
      setName(user.given_name);
      setUsername(user.nickname);
    }
  }, [auth0Authenticated])


  const handleAuthentication = async() => {
    if(auth0Authenticated && user){
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
      value={{ logout, loginWithRedirect, loginAsGuest, name, isAuthenticated, isGuest, user, stories, setStories, token, story, setStory, comments, setComments, username, setUsername, isLoading, setIsLoading}}
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
