import Avatar from "../../components/Avatar";

// styles
import "./Project.css";

// Component for displaying a summary of a project
// Receives a 'project' prop containing project details
export default function ProjectSummary({ project }) {
  return (
    <div>
      {/* Container for project summary */}
      <div className="project-summary">
        {/* Project title */}
        <h2 className="page-title">{project.name}</h2>

        {/* Project due date */}
        <p className="due-date">
          Project due by {project.dueDate.toDate().toDateString()}
        </p>

        {/* Project details */}
        <p className="details">{project.details}</p>

        {/* Assigned users section */}
        <h4>Project is assigned to:</h4>

        {/* Display avatars of assigned users */}
        <div className="assigned-users">
          {project.assignedUsersList.map((user) => (
            <div key={user.id}>
              {/* Avatar component for each assigned user */}
              <Avatar src={user.photoURL} alt={user.displayName} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
