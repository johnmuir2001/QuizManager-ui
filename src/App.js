import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import PlayQuiz from "./pages/PlayQuiz";
import ViewQuiz from "./pages/ViewQuiz";
import EditQuiz from "./pages/EditQuiz";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={ <Login />} />
      <Route path="/" element={
        <PrivateRoute>
          <Home />
        </PrivateRoute>
      }/>
      <Route path="/playQuiz/:id" element={
        <PrivateRoute>
          <PlayQuiz />
        </PrivateRoute>
      }/>
      <Route path="/viewQuiz" element={
        <PrivateRoute roles={["Admin", "SuperAdmin"]}>
          <ViewQuiz />
        </PrivateRoute>
      }/>
      <Route path="/editQuiz" element={
        <PrivateRoute roles={["SuperAdmin"]}>
          <EditQuiz />
        </PrivateRoute>
      }/>
    </Routes>
  );
}

export default App;
