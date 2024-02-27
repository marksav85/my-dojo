import { useParams } from "react-router-dom";
import { useDocument } from "../../hooks/useDocument";

// styles
import "./Project.css";
import ProjectSummary from "./ProjectSummary";

export default function Project() {
  const { id } = useParams();
  const { error, document } = useDocument("projects", id);

  if (error) {
    return <div>{error.message}</div>;
  }
  if (!document) {
    return <div>Loading...</div>;
  }

  return (
    <div className="project-details">
      <ProjectSummary project={document} />
    </div>
  );
}
