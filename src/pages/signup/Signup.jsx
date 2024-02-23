import { useState } from "react";

// styles
import "./Signup.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);

  // Function to handle form submission
  const handleSubmit = (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();

    // Log form input values (assuming email, password, displayName, and thumbnail are defined elsewhere)
    console.log(email, password, displayName, thumbnail);
  };

  // Function to handle changes in the selected file input
  const handleFileChange = (e) => {
    // Reset the thumbnail state to null initially
    setThumbnail(null);

    // Get the first file selected by the user from the event
    let selectedFile = e.target.files[0];

    // Check if a file is selected
    if (!selectedFile) {
      setThumbnailError("Please select a file");
      return;
    }

    // Check if the selected file is an image
    if (!selectedFile.type.includes("image")) {
      setThumbnailError("Please select an image file");
      return;
    }

    // Check if the file size is within the allowed limit (100kb)
    if (selectedFile.size > 100000) {
      setThumbnailError("File size should be less than 100kb");
      return;
    }

    // Reset any previous thumbnail error
    setThumbnailError(null);

    // Set the selected file as the thumbnail
    setThumbnail(selectedFile);

    // Log the selected file details
    console.log(selectedFile);
  };

  return (
    /* Signup form with input fields for email, password, display name, and profile thumbnail */
    <form className="auth-form" onSubmit={handleSubmit}>
      {/* Heading for the signup section */}
      <h2>Signup</h2>

      {/* Input field for email */}
      <label>
        <span>email:</span>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>

      {/* Input field for password */}
      <label>
        <span>password:</span>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>

      {/* Input field for display name */}
      <label>
        <span>display name:</span>
        <input
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
        />
      </label>

      {/* Input field for profile thumbnail with associated error message */}
      <label>
        <span>profile thumbnail:</span>
        <input type="file" required onChange={handleFileChange} />
        {thumbnailError && <p className="error">{thumbnailError}</p>}
      </label>

      {/* Signup button */}
      <button className="btn">Signup</button>
    </form>
  );
}
