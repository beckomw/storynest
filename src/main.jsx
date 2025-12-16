import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider} from "react-router-dom";

import App from './App.jsx'
import './index.css'
import { StorynestProvider } from './context/StorynestContext.jsx';
import Stories from './components/Stories.jsx';
import Documentation from './components/Documentation.jsx';
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
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <StorynestProvider>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </StorynestProvider>
  </StrictMode>
);
