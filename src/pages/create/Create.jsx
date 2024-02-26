import { useState, useEffect } from "react";
import Select from "react-select";
import { Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

// hooks
import { useCollection } from "../../hooks/useCollection";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";

// styles
import "./Create.css";

// form categories
const categories = [
  { value: "development", label: "Development" },
  { value: "design", label: "Design" },
  { value: "sales", label: "Sales" },
  { value: "marketing", label: "Marketing" },
];

// Define component to create a new project
export default function Create() {
  // Retrieve user information from the authentication context
  const { user } = useAuthContext();

  // Retrieve the list of users from the database using the useCollection hook
  const { documents } = useCollection("users");

  // Retrieve addDocument and response info from the useFirestore hook
  const { addDocument, response } = useFirestore("projects");

  // Use the useNavigate hook to redirect the user after creating a project
  const navigate = useNavigate();

  // State to manage form field values
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("");
  const [assignedUsers, setAssignedUsers] = useState([]);

  // Effect to update the list of users when the documents change
  useEffect(() => {
    if (documents) {
      // Map users to the format expected by the Select component
      setUsers(
        documents.map((user) => ({
          value: { ...user, id: user.id },
          label: user.displayName,
        }))
      );
    }
  }, [documents]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Format assigned users for storage in the project
    const assignedUsersList = assignedUsers.map((u) => ({
      displayName: u.value.displayName,
      photoURL: u.value.photoURL,
      id: u.value.id,
    }));

    // Format user who created the project
    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid,
    };

    // Create a project object with form field values
    const project = {
      name,
      details,
      category: category.value,
      dueDate: Timestamp.fromDate(new Date(dueDate)),
      assignedUsersList,
      createdBy,
      comments: [],
    };

    // Add the project to the database
    await addDocument(project);
    if (!response.error) {
      navigate("/");
    }
  };

  // Render the create project form
  return (
    <div className="create-form">
      {/* Display the page title */}
      <h2 className="page-title">Create a new project</h2>

      {/* Form for creating a new project */}
      <form onSubmit={handleSubmit}>
        {/* Input field for project name */}
        <label>
          <span>Project name:</span>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </label>

        {/* Textarea for project details */}
        <label>
          <span>Project details:</span>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            required
          ></textarea>
        </label>

        {/* Input field for setting due date */}
        <label>
          <span>Set due date:</span>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </label>

        {/* Select component for choosing project category */}
        <label>
          <span>Project category:</span>
          <Select
            value={category}
            onChange={(selectedOption) => setCategory(selectedOption)}
            options={categories}
            required
          />
        </label>

        {/* Select component for assigning users to the project */}
        <label>
          <span>Assign to:</span>
          <Select
            options={users}
            onChange={(selectedUser) => setAssignedUsers(selectedUser)}
            isMulti
            required
          />
        </label>

        {/* Submit button for adding the project */}
        <button className="btn">Add project</button>
      </form>
    </div>
  );
}
