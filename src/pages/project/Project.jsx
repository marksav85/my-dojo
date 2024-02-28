import { useParams } from "react-router-dom";
import { useDocument } from "../../hooks/useDocument";

// styles
import "./Project.css";
import ProjectSummary from "./ProjectSummary";
import ProjectComments from "./ProjectComments";

// Component for displaying detailed information and comments for a project
export default function Project() {
  // Get the 'id' parameter from the route
  const { id } = useParams();

  // Fetch project document using the 'useDocument' hook
  const { error, document } = useDocument("projects", id);

  // If there's an error fetching the document, display the error message
  if (error) {
    return <div>{error.message}</div>;
  }

  // If the document is still loading, display a loading message
  if (!document) {
    return <div>Loading...</div>;
  }

  // Render the detailed information and comments for the project
  return (
    <div className="project-details">
      {/* Render the summary of the project */}
      <ProjectSummary project={document} />

      {/* Render the comments section for the project */}
      <ProjectComments project={document} />
    </div>
  );
}
