import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { myFSAuth, myFSProject } from "../firebase/config";
import { doc, updateDoc } from "firebase/firestore";

// custom hook to handle logout
export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch, user } = useAuthContext();

  // handle logout
  const handleLogout = async () => {
    setIsPending(true);
    setError(null);

    // sign user out
    try {
      // update online status
      const { uid } = user;
      // Assuming you have the UID in the variable 'uid'
      const userDocRef = doc(myFSProject, "users", uid);

      // Update the document
      await updateDoc(userDocRef, {
        online: false,
      });

      await myFSAuth.signOut();

      // dispatch logout action
      dispatch({ type: "LOGOUT" });

      // update state if not cancelled
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
      // catch any errors
    } catch (err) {
      if (!isCancelled) {
        setIsPending(false);
        setError(err.message);
      }
    }
  };

  // cleanup function
  useEffect(() => {
    return () => {
      setIsCancelled(true);
    };
  }, []);

  // return the handleLogout function and error
  return { handleLogout, error, isPending };
};
