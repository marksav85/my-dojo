/* eslint-disable react/prop-types */
import { useState } from "react";
import { Timestamp } from "firebase/firestore";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";
import Avatar from "../../components/Avatar";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

// Component for displaying and adding comments to a project
export default function ProjectComments({ project }) {
  // Get response and updateDocument function from useFirestore hook
  const { response, updateDocument } = useFirestore("projects");
  const [newComment, setNewComment] = useState(""); // State to track the new comment input
  const { user } = useAuthContext();

  // Handle form submission to add a new comment
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new comment object
    const commentToAdd = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: newComment,
      createdAt: Timestamp.now(),
      id: Math.random(),
    };

    // Update the project document with the new comment
    await updateDocument(project.id, {
      comments: [...project.comments, commentToAdd],
    });

    // If the update was successful, clear the new comment input
    if (!response.error) {
      setNewComment("");
    }
  };

  // Render the component
  return (
    <div className="project-comments">
      <h4>Project Comments</h4>

      {/* Render existing comments */}
      <ul>
        {project.comments.length > 0 &&
          project.comments.map((comment) => (
            <li key={comment.id}>
              <div className="comment-author">
                {/* Render comment author's avatar and name */}
                <Avatar src={comment.photoURL} alt={comment.displayName} />
                <p>{comment.displayName}</p>
              </div>
              <div className="comment-date">
                {/* Render the relative creation date of the comment */}
                <p>
                  {formatDistanceToNow(comment.createdAt.toDate(), {
                    addSuffix: true,
                  })}
                </p>
              </div>
              <div className="comment-content">
                {/* Render the content of the comment */}
                <p>{comment.content}</p>
              </div>
            </li>
          ))}
      </ul>

      {/* Form for adding a new comment */}
      <form className="add-comment" onSubmit={handleSubmit}>
        <label>
          <span>Add new comment:</span>
          {/* Input field for the new comment */}
          <textarea
            required
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
          ></textarea>
        </label>
        {/* Button to submit the new comment */}
        <button className="btn">Add comment</button>
      </form>
    </div>
  );
}
