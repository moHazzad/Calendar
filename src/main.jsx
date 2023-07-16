import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ContextWrapper from './Context/ContextWrapper.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import CardEvents from './Components/Home/CardEvents.jsx'
import Home from './Components/Home/Home.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[
      {
        path:'/',
        element:<Home />,
      },
      {
        path:'cards',
        element:<CardEvents />,
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextWrapper>
    <RouterProvider router={router} />
    </ContextWrapper>
  </React.StrictMode>,
)
