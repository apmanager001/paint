import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./comps/header.jsx";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import "./App.css";
import MainPage from "./comps/MainPage.jsx";

const url = import.meta.env.VITE_API_URL;

axios.defaults.baseURL = url 
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <Header />
      <Toaster position="top-center" toastOptions={{ duration: 8000 }} />
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </>
  );
}

export default App;
