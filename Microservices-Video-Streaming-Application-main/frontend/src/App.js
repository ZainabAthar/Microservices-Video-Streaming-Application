import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from './pages/ErrorPage.js';
import HomePage from './pages/HomePage.js';
import LoginPage from './pages/LoginPage.js';
import RegisterPage from './pages/RegisterPage';
import VideosPage from './pages/VideosPage.js';
import ProfilePage from './pages/ProfilePage';
import { ToastContainer } from 'react-toastify';

import axios, { AxiosError } from "axios";
import {useDispatch } from "react-redux/es/exports";
import { useIsAuthenticated } from "react-auth-kit";
import { setUserData } from "./store/slices/UserSlice";

import { useAuthUser } from "react-auth-kit";
import { useState,useEffect } from "react";
function App() {


  const isAuthenticated = useIsAuthenticated();
  const auth = useAuthUser();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = auth().userId;
        const token = auth().token;
        console.log(token);
        const config = {
            headers: {
              Authorization: `${token}`,
              'Content-Type': 'multipart/form-data',
            },
          };
        const response = await axios.get(
          `${process.env.REACT_APP_QUERY_BACKEND}/queries/${userId}`,config
        );
        const data = response.data.userData;
        console.log(data)
        dispatch(setUserData({data}))
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    if (isAuthenticated()) {
      fetchData(); 
    }
  }, [dispatch,auth,isAuthenticated]);
  const router = createBrowserRouter([
    {
      path: "/",  
      element: <HomePage />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/gallery",
      element: (
          <VideosPage />
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: "/profile",
      element: (
          <ProfilePage />
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
      errorElement: <ErrorPage />,
    },
  ]);
  
  
  return (
    <div >
      <main>
      <RouterProvider router={router} />
      </main>
      <ToastContainer position="bottom-center" />
    </div>
  );
}

export default App;
