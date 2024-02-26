import { useCollection } from "../hooks/useCollection";

// components
import Avatar from "./Avatar";

// styles
import "./OnlineUsers.css";

// Functional component for displaying a list of online users
export default function OnlineUsers() {
  // Destructure the results from the useCollection hook: 'error' and 'documents'
  const { error, documents } = useCollection("users");

  // Render the list of online users
  return (
    <div className="user-list">
      <h2>All Users</h2>

      {/* Display an error message if there is an error */}
      {error && <div className="error">{error}</div>}

      {/* Check if there are documents before mapping over them */}
      {documents &&
        documents.map((user) => (
          // Each user is rendered as a list item with a unique key
          <div key={user.id} className="user-list-item">
            {/* Display a green dot if the user is online */}
            {user.online && <span className="online-user"></span>}

            {/* Display the user's display name */}
            <span>{user.displayName}</span>

            {/* Display the user's avatar using the Avatar component */}
            <Avatar src={user.photoURL} />
          </div>
        ))}
    </div>
  );
}
