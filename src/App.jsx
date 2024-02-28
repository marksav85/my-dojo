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
import OnlineUsers from "./components/OnlineUsers";

// styles
import "./App.css";

// Main App component
function App() {
  // Retrieve user and authIsReady from the authentication context
  const { user, authIsReady } = useAuthContext();

  return (
    <div className="App">
      {/* Render the app contents only when authentication is ready */}
      {authIsReady && (
        <>
          {/* Render Sidebar component if the user is authenticated */}
          {user && <Sidebar />}

          {/* Main container for the application */}
          <div className="container">
            {/* Render the Navbar component */}
            <Navbar></Navbar>

            {/* Define routes for the application */}
            <Routes>
              <Route
                path="/"
                element={
                  // Redirect to login if the user is not authenticated, otherwise render Dashboard
                  !user ? <Navigate to="/login" replace /> : <Dashboard />
                }
              ></Route>
              <Route
                path="/create"
                element={
                  // Redirect to login if the user is not authenticated, otherwise render Create
                  !user ? <Navigate to="/login" replace /> : <Create />
                }
              ></Route>
              <Route
                path="/projects/:id"
                element={
                  // Redirect to login if the user is not authenticated, otherwise render Project
                  !user ? <Navigate to="/login" replace /> : <Project />
                }
              ></Route>
              <Route
                path="/login"
                element={
                  // Redirect to the home page if the user is already authenticated, otherwise render Login
                  user ? <Navigate to="/" replace /> : <Login />
                }
              ></Route>
              <Route
                path="/signup"
                element={
                  // Redirect to the home page if the user is already authenticated, otherwise render Signup
                  user ? <Navigate to="/" replace /> : <Signup />
                }
              ></Route>
            </Routes>
          </div>

          {/* Render OnlineUsers component if the user is authenticated */}
          {user && <OnlineUsers />}
        </>
      )}
    </div>
  );
}

export default App;
