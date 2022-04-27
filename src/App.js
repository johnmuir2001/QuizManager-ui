import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import PlayQuiz from "./pages/PlayQuiz";
import ViewQuiz from "./pages/ViewQuiz";
import EditQuiz from "./pages/EditQuiz";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={ <Login />} />
      <Route path="/" element={
        <Home />
      }/>
      <Route path="/playQuiz" element={
        <PlayQuiz />
      }/>
      <Route path="/viewQuiz" element={
        <ViewQuiz />
      }/>
      <Route path="/editQuiz" element={
        <EditQuiz />
      }/>
    </Routes>
  );
}

export default App;
