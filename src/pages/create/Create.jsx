import { useState } from "react";

// styles
import "./Create.css";

export default function Create() {
  // form field values
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("");
  const [assignedUsers, setAssignedUsers] = useState([]);

  // handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="create-form">
      <h2 className="page-title">Create a new project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Project name:</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          <span>Project details:</span>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            required
          ></textarea>
        </label>
        <label>
          <span>Set due date:</span>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </label>
        <label>
          <span>Project category:</span>
        </label>
        <label>
          <span>Assign to:</span>
          <input
            type="text"
            value={assignedUsers}
            onChange={(e) => setAssignedUsers(e.target.value)}
          />
        </label>

        <button className="btn">Add project</button>
      </form>
    </div>
  );
}
