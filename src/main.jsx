import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider} from "react-router-dom";

import App from './App.jsx'
import './index.css'
import { Auth0Provider } from "@auth0/auth0-react";
import { StorynestProvider } from './context/StorynestContext.jsx';
import Stories from './components/Stories.jsx';
import Documentation from './components/Documentation.jsx';
import Dashboard from './components/Dashboard.jsx';
import StoryForm from './pages/StoryForm.jsx';
import Story from './pages/Story.jsx';
import StoryEdit from './pages/StoryEdit.jsx';

const router = createBrowserRouter([
  { path: '/', element:  <div> <App /> </div>, },
  { path: '/stories', element:  <div> <Stories /> </div>, },
  { path: '/stories/:id', element:  <div> <Story /> </div>, },
  { path: '/stories/:id/edit', element:  <div> <StoryEdit /> </div>, },
  { path: '/stories/create', element:  <div> <StoryForm /> </div>, },
  { path: '/documentation', element:  <div>  <Documentation /> </div>, },
  { path: '/dashboard', element:  <div> <Dashboard /> </div>, }
]);





const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const redirectUri = import.meta.env.VITE_REDIRECT_URI || window.location.origin;



createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      useRefreshTokens={true}
      cacheLocation="localstorage"
      authorizationParams={{
        redirect_uri: redirectUri,
      }}
    >
      <StorynestProvider>
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </StorynestProvider>
    </Auth0Provider>
  </StrictMode>
);

