/* eslint-disable react/prop-types */
import Avatar from "../../components/Avatar";
import { useFirestore } from "../../hooks/useFirestore";
import { useAuthContext } from "../../hooks/useAuthContext";

// styles
import "./Project.css";

// Component for displaying a summary of a project
// Receives a 'project' prop containing project details
export default function ProjectSummary({ project }) {
  // Retrieve deleteDocument function from the useFirestore hook
  const { deleteDocument } = useFirestore("projects");
  // Retrieve user information from the authentication context
  const { user } = useAuthContext();

  // Handle click event to delete the project
  const handleClick = () => {
    deleteDocument(project.id);
  };

  return (
    <div>
      {/* Container for project summary */}
      <div className="project-summary">
        {/* Project title */}
        <h2 className="page-title">{project.name}</h2>

        {/* Display name of project creator */}
        <p>Created by {project.createdBy.displayName}</p>

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
      {/* Delete button visible only to user who created the project */}
      {user.uid === project.createdBy.id && (
        <button className="btn" onClick={handleClick}>
          Mark as complete
        </button>
      )}
    </div>
  );
}
