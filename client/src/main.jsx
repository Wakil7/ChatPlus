import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Signup from './pages/authentication/Signup'
import Login from './pages/authentication/Login'
import Home from './pages/home/Home'
import {store} from './store/store.js'
import {Provider} from 'react-redux'
import ProtectedRoute from './components/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute>
              <Home />
            </ProtectedRoute>
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  }
])

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
    <RouterProvider router={router} />
  </Provider>
)
