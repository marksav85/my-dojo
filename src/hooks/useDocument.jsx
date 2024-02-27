import { useEffect, useState } from "react";
import { myFSProject } from "../firebase/config";
import { collection, doc, onSnapshot } from "firebase/firestore";

export const useDocument = (collectionName, id) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);

  // realtime document data
  useEffect(() => {
    let documentRef = doc(collection(myFSProject, collectionName), id);
    const unsubscribe = onSnapshot(
      documentRef,
      (snapshot) => {
        // need to make sure the doc exists & has data
        if (snapshot.data()) {
          setDocument({ ...snapshot.data(), id: snapshot.id });
          setError(null);
        } else {
          setError("No such document exists");
        }
      },
      (err) => {
        console.log(err.message);
        setError("failed to get document");
      }
    );

    // unsubscribe on unmount
    return () => unsubscribe();
  }, [collectionName, id]);

  return { document, error };
};
