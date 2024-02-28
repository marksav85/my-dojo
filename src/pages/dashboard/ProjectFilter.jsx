// styles
import "./Dashboard.css";

// List of available project filter options
const filterList = [
  "all",
  "mine",
  "development",
  "design",
  "marketing",
  "sales",
];

// Component for filtering projects based on categories
export default function ProjectFilter({ currentFilter, changeFilter }) {
  // Function to handle button click and update the filter
  const handleClick = (newFilter) => {
    changeFilter(newFilter);
  };

  // Render the project filter component
  return (
    <div className="project-filter">
      {/* Navigation bar for project filtering */}
      <nav>
        {/* Display a label for the filter options */}
        <p>Filter by:</p>

        {/* Map through filterList and render a button for each filter option */}
        {filterList.map((filter) => (
          <button
            key={filter}
            onClick={() => handleClick(filter)} // Handle click event to update the filter
            className={currentFilter === filter ? "active" : ""} // Apply 'active' class if the filter is currently selected
          >
            {filter}
          </button>
        ))}
      </nav>
    </div>
  );
}
