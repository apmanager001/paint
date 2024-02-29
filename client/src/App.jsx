import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./comps/header.jsx";
import axios from "axios";
import "./App.css";
import MainPage from "./comps/MainPage.jsx";
const url = import.meta.env.API_URL;

axios.defaults.baseURL = url; //|| process.env.API_URL;
axios.defaults.withCredentials = true;
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </>
  );
}

export default App;
