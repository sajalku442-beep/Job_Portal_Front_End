import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./components/shared/Navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/home";
import Job from "./components/JOb";
import Browse from "./components/Browse";
import Profile from "./components/Profile";
import JobDescription from "./components/JobDescription";
import Company from "./components/admin/Company";
import CompanyCreate from "./components/admin/CompanyCreate";
import CompanySetUp from "./components/admin/CompanySetUp";
import AdminJobs from "./components/admin/AdminJobs";
import PostJobs from "./components/admin/PostJobs";
import Applicants from "./components/admin/Applicants";
import ProtectedRoute from "./components/admin/ProtectRoutes";

function App() {
  const approuter = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/job",
      element: <Job />,
    },
    {
      path: "/des/:id",
      element: <JobDescription />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },

    //admin
    {
      path: "/admin/companies",
      element: (
        <ProtectedRoute>
          <Company />,
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/companies/create",
      element: (
        <ProtectedRoute>
          <CompanyCreate />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/companies/:id",
      element: (
        <ProtectedRoute>
          <CompanySetUp />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/jobs",
      element: (
        <ProtectedRoute>
          <AdminJobs />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/jobs/create",
      element: (
        <ProtectedRoute>
          <PostJobs />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/jobs/:id/applicants",
      element: (
        <ProtectedRoute>
          <Applicants />
        </ProtectedRoute>
      ),
    },
  ]);

  return (
    <>
      <RouterProvider router={approuter} />
    </>
  );
}

export default App;
