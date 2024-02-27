import { Link } from "react-router-dom";

// components
import Avatar from "./Avatar";

// styles
import "./ProjectList.css";

export default function ProjectList({ projects }) {
  return (
    <div className="project-list">
      {projects.length === 0 && <p> No projects yet!</p>}
      {projects.map((project) => (
        <Link to={`/projects/${project.id}`} key={project.id}>
          <h4>{project.name}</h4>
          <p>Due by {project.dueDate.toDate().toDateString()}</p>
          <div className="assigned-to">
            <p>Assigned to:</p>
            <ul>
              {project.assignedUsersList.map((user) => (
                <li key={user.photoURL}>
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
