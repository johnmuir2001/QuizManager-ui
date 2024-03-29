import React, { useEffect }  from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import PlayQuiz from "./pages/PlayQuiz";
import ViewQuiz from "./pages/ViewQuiz";
import EditQuiz from "./pages/EditQuiz";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {

  useEffect(() => {
    localStorage.setItem("currentUser", JSON.stringify({ role: "Restricted" }))
  }, [])

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
      <Route path="/viewQuiz/:id" element={
        <PrivateRoute roles={["View", "Edit"]}>
          <ViewQuiz />
        </PrivateRoute>
      }/>
      <Route path="/editQuiz/:id" element={
        <PrivateRoute roles={["Edit"]}>
          <EditQuiz />
        </PrivateRoute>
      }/>
    </Routes>
  );
}

export default App;
