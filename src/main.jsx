import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import MRU from './components/MRU.jsx'
import RoundRobin from './components/RoundRobin.jsx'
import './index.css'
import {NextUIProvider} from "@nextui-org/react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Bankers from './components/Bankers.jsx'
import ScanDisk from './components/ScanDisk.jsx'
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/round-robin",
    element : <RoundRobin />,
  },
  {
    path : "/bankers",
    element : <Bankers />
  },
  {
    path : "/scan-disk",
    element : <ScanDisk/>
  },
  {
    path : "/mru-page-replacement",
    element : <MRU/>
  }

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NextUIProvider>
    <RouterProvider router={router} />
    </NextUIProvider>
  </React.StrictMode>,
)
