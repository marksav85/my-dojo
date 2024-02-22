import { Routes, Route, Navigate } from "react-router-dom";

// components
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Create from "./pages/create/Create";
import Project from "./pages/project/Project";

// styles
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="container">
        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/create" element={<Create />}></Route>
          <Route path="/projects/:id" element={<Project />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
