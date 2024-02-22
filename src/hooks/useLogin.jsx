import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { myFSAuth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";

// custom hook to handle login
export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  // handle login
  const handleLogin = async (email, password) => {
    setIsPending(true);
    setError(null);

    // sign user out
    try {
      const res = await signInWithEmailAndPassword(myFSAuth, email, password);

      // dispatch logout action
      dispatch({ type: "LOGIN", payload: res.user });

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

  // return the handleLogin function and error
  return { handleLogin, error, isPending };
};
