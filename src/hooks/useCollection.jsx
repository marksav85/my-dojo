import { useState, useEffect, useRef } from "react";
import { myFSProject } from "../firebase/config";
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";

// custom hook to fetch collection data in real-time
export const useCollection = (
  collectionData,
  collectionQuery,
  collectionOrder
) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  // use useRef to store the query to avoid re-rendering loop in useEffect dependency array
  const q = useRef(null);
  const o = useRef(null);

  useEffect(() => {
    // Update the ref when collectionQuery changes
    q.current = collectionQuery;
    o.current = collectionOrder;
  }, [collectionQuery, collectionOrder]);

  useEffect(() => {
    // collection ref
    let ref = collection(myFSProject, collectionData);

    // queries user id before retrieving collection data
    if (q.current) {
      ref = query(ref, where(...q.current));
    }
    // orders the collection data
    if (o.current) {
      ref = query(ref, orderBy(...o.current));
    }

    const unsubscribe = onSnapshot(
      ref,
      (snap) => {
        let results = [];
        snap.forEach((doc) => {
          // must wait for the server to create a timestamp & send it back
          results.push({ ...doc.data(), id: doc.id });
        });
        // update state
        setDocuments(results);
        setError(null);
      },
      (error) => {
        console.log(error.message);
        setDocuments(null);
        setError("could not fetch the data");
      }
    );

    // unsubscribe from snapshot when no longer in use
    return () => unsubscribe();
  }, [collectionData, q, o]);

  //return fetched documents
  return { documents, error };
};
