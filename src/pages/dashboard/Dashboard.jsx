import ProjectList from "../../components/ProjectList";
import { useCollection } from "../../hooks/useCollection";
import ProjectFilter from "./ProjectFilter";
import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

// styles
import "./Dashboard.css";

// Component for displaying the dashboard with a list of projects
export default function Dashboard() {
  // Fetch the project documents and potential error using the 'useCollection' hook
  const { documents, error } = useCollection("projects");

  // State to manage the current filter applied to the project list
  const [currentFilter, setCurrentFilter] = useState("all");

  // Fetch the user object from the authentication context
  const { user } = useAuthContext();

  // Function to update the current filter
  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter);
  };

  // Filter projects based on the current filter
  const filteredProjects = documents
    ? documents.filter((document) => {
        switch (currentFilter) {
          case "all":
            // Display all projects
            return true;
          case "mine":
            // Display projects assigned to the current user
            return document.assignedUsersList.some((u) => user.uid === u.id);

          case "development":
          case "design":
          case "sales":
          case "marketing":
            // Display projects based on their category
            console.log(document.category, currentFilter);
            return document.category === currentFilter;

          default:
            // Display all projects if no specific filter is applied
            return true;
        }
      })
    : null;

  // Render the dashboard component
  return (
    <div>
      {/* Page title */}
      <h2 className="page-title">Dashboard</h2>

      {/* Display error message if there's an error fetching documents */}
      {error && <p className="error">{error}</p>}

      {/* Display project filter component if documents are available */}
      {documents && (
        <ProjectFilter
          currentFilter={currentFilter}
          changeFilter={changeFilter}
        />
      )}

      {/* Display the list of projects based on the applied filter */}
      {documents && <ProjectList projects={filteredProjects} />}
    </div>
  );
}
