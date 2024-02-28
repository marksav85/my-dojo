import { Link } from "react-router-dom";

// components
import Avatar from "./Avatar";

// styles
import "./ProjectList.css";

// Component for displaying a list of projects
export default function ProjectList({ projects }) {
  // Render the project list component
  return (
    <div className="project-list">
      {/* Display a message if there are no projects */}
      {projects.length === 0 && <p> No projects yet!</p>}

      {/* Map through projects and render details for each project */}
      {projects.map((project) => (
        // Link to the detailed view of the project
        <Link to={`/projects/${project.id}`} key={project.id}>
          {/* Project title */}
          <h4>{project.name}</h4>

          {/* Project due date */}
          <p>Due by {project.dueDate.toDate().toDateString()}</p>

          {/* List of assigned users with avatars */}
          <div className="assigned-to">
            <p>Assigned to:</p>
            <ul>
              {project.assignedUsersList.map((user) => (
                <li key={user.photoURL}>
                  {/* Display user avatar */}
                  <Avatar src={user.photoURL} alt={user.displayName} />
                </li>
              ))}
            </ul>
          </div>
        </Link>
      ))}
    </div>
  );
}
