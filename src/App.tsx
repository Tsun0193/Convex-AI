import { useQuery, useMutation } from "convex/react";
import { Routes, Route, Link, useNavigate, Navigate } from "react-router-dom";
import { api } from "../convex/_generated/api";
import { useEffect, useState } from "react";
import Login from './Login.tsx'
import Home from './Home.tsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={"/login"} />} />
      <Route path='/home' element={<Home />} />
      <Route
        path="/login"
        element={
          sessionStorage.getItem("user") ? <Navigate to={"/home"} /> : <Login />
        }
      />
    </Routes>
  )
}