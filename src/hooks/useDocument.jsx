import { useEffect, useState } from "react";
import { myFSProject } from "../firebase/config";
import { collection, doc, onSnapshot } from "firebase/firestore";

// Custom hook for fetching real-time document data from Firestore
export const useDocument = (collectionName, id) => {
  // State to hold the document data and any potential error
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);

  // Effect to subscribe to real-time updates and handle unsubscription
  useEffect(() => {
    // Create a reference to the specific document in the specified collection
    let documentRef = doc(collection(myFSProject, collectionName), id);

    // Subscribe to real-time updates using onSnapshot
    const unsubscribe = onSnapshot(
      documentRef,
      // Callback for successful snapshot updates
      (snapshot) => {
        // Check if the document exists and has data
        if (snapshot.exists()) {
          // Update the state with the document data
          setDocument({ ...snapshot.data(), id: snapshot.id });
          // Clear any previous error
          setError(null);
        } else {
          // If the document doesn't exist, set an error
          setError("No such document exists");
        }
      },
      // Callback for errors during snapshot updates
      (err) => {
        // Log the error message to the console
        console.log(err.message);
        // Set an error message in the state
        setError("Failed to get document");
      }
    );

    // Unsubscribe from real-time updates when the component unmounts
    return () => unsubscribe();
  }, [collectionName, id]); // Dependency array to re-run effect when collectionName or id changes

  // Return the document data and error for the component using this hook
  return { document, error };
};
