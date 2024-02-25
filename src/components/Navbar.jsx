import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

// styles and images
import "./Navbar.css";
import Temple from "../assets/temple.svg";

// Functional component for the Navbar
export default function Navbar() {
  // Destructuring values from the useLogout hook
  const { handleLogout, isPending } = useLogout();

  // Destructuring user from the useAuthContext hook
  const { user } = useAuthContext();

  // Render the Navbar component
  return (
    <div className="navbar">
      <ul>
        {/* Logo section */}
        <li className="logo">
          <img src={Temple} alt="dojo logo" />
          <span>The Dojo</span>
        </li>

        {/* Display login and signup links if there is no user */}
        {!user && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}

        {/* Display logout button if there is a user */}
        {user && (
          <>
            <li>
              {/* Render logout button with appropriate styling and disabled state based on isPending */}
              {!isPending && (
                <button className="btn" onClick={handleLogout}>
                  Logout
                </button>
              )}
              {isPending && (
                <button className="btn" disabled onClick={handleLogout}>
                  Logout
                </button>
              )}
            </li>
          </>
        )}
      </ul>
    </div>
  );
}
