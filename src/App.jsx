import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

// pages and components
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Create from "./pages/create/Create";
import Project from "./pages/project/Project";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

// styles
import "./App.css";

function App() {
  const { user, authIsReady } = useAuthContext();

  return (
    <div className="App">
      {authIsReady && (
        <>
          {user && <Sidebar />}
          <div className="container">
            <Navbar></Navbar>
            <Routes>
              <Route
                path="/"
                element={
                  !user ? <Navigate to="/login" replace /> : <Dashboard />
                }
              ></Route>
              <Route
                path="/create"
                element={!user ? <Navigate to="/login" replace /> : <Create />}
              ></Route>
              <Route
                path="/projects/:id"
                element={!user ? <Navigate to="/login" replace /> : <Project />}
              ></Route>
              <Route
                path="/login"
                element={user ? <Navigate to="/" replace /> : <Login />}
              ></Route>
              <Route
                path="/signup"
                element={user ? <Navigate to="/" replace /> : <Signup />}
              ></Route>
            </Routes>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
