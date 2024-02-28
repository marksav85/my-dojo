import { useState } from "react";
import { Timestamp } from "firebase/firestore";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";

export default function ProjectComments({ project }) {
  const { response, updateDocument } = useFirestore("projects");
  const [newComment, setNewComment] = useState("");
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("project", project);

    const commentToAdd = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: newComment,
      createdAt: Timestamp.now(),
      id: Math.random(),
    };

    await updateDocument(project.id, {
      comments: [...project.comments, commentToAdd],
    });
    if (!response.error) {
      setNewComment("");
    }
  };

  return (
    <div className="project-comments">
      <h4>Project Comments</h4>

      <form className="add-comment" onSubmit={handleSubmit}>
        <label>
          <span>Add new comment:</span>
          <textarea
            required
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
          ></textarea>
        </label>
        <button className="btn">Add comment</button>
      </form>
    </div>
  );
}
