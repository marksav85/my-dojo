import { NavLink } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import Avatar from "./Avatar";

// styles and images
import "./Sidebar.css";
import DashboardIcon from "../assets/dashboard_icon.svg";
import AddIcon from "../assets/add_icon.svg";

// Functional component for the Sidebar
export default function Sidebar() {
  // Destructure the 'user' object from the authentication context
  const { user } = useAuthContext();

  return (
    // Main container for the sidebar
    <div className="sidebar">
      {/* Container for the content of the sidebar */}
      <div className="sidebar-content">
        {/* Display user information */}
        <div className="user">
          <Avatar src={user.photoURL} /> {/* Display user avatar */}
          <p>Hey {user.displayName}</p> {/* Display username */}
        </div>

        {/* Navigation links */}
        <nav className="links">
          <ul>
            {/* Dashboard link */}
            <li>
              <NavLink to="/">
                <img src={DashboardIcon} alt="dashboard icon" />{" "}
                {/* Display dashboard icon */}
                <span>Dashboard</span> {/* Display dashboard text */}
              </NavLink>
            </li>

            {/* New Project link */}
            <li>
              <NavLink to="/create">
                <img src={AddIcon} alt="Add project icon" />{" "}
                {/* Display add project icon */}
                <span>New Project</span> {/* Display add project text */}
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
