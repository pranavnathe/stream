import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { 
  Channel,
  EditVideo,
  Home, 
  Landing, 
  LikedContent, 
  Login, 
  Playlist, 
  Register, 
  Subscription, 
  Dashboard, 
  UploadVideo, 
  Video, 
  WatchHistory,
  SinglePlaylist
} from "./pages/"
import { AuthLayout } from './components/'

import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Landing/>
      },
      {
        path: "/home",
        element: (
          <AuthLayout authentication>
            <Home />
          </AuthLayout>
        )
      },
      {
        path: "/history",
        element: (
          <AuthLayout authentication>
            <WatchHistory />
          </AuthLayout>
        )
      },
      {
        path: "/likedvids",
        element: (
          <AuthLayout authentication>
            <LikedContent />
          </AuthLayout>
        )
      },
      {
        path: "/playlist",
        element: (
          <AuthLayout authentication>
            <Playlist />
          </AuthLayout>
        )
      },
      {
        path: "/playlist/view/:playlistId",
        element: (
          <AuthLayout authentication>
            <SinglePlaylist />
          </AuthLayout>
        )
      },
      {
        path: "/channel/:username",
        element: (
          <AuthLayout authentication>
            <Channel />
          </AuthLayout>
        )
      },
      {
        path: "/login",
        element: (
            <AuthLayout authentication={false}>
                <Login />
            </AuthLayout>
        )
      },
      {
        path: "/dashboard",
        element: (
          <AuthLayout authentication>
            <Dashboard />
          </AuthLayout>
        )
      },
      {
        path: "/register",
        element: (
          <AuthLayout authentication={false}>
            <Register/>
          </AuthLayout>
        )
      },
      {
        path: "/upload-video",
        element: (
          <AuthLayout authentication>
            <UploadVideo />
          </AuthLayout>
        )
      },
      {
        path: "/edit-video/:videoId",
        element: (
          <AuthLayout authentication>
            <EditVideo />
          </AuthLayout>
        )
      },
      {
        path: "/subscription",
        element: (
          <AuthLayout authentication>
            <Subscription />
          </AuthLayout>
        )
      },
      {
        path: "/watch/:videoId",
        element: (
          <AuthLayout authentication>
            <Video/>
          </AuthLayout>
        )
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
