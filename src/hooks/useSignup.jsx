import { useState, useEffect } from "react";
import { myFSAuth } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";

// custom hook to handle signup
export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  // handle signup
  const handleSignup = async (name, email, password) => {
    setIsPending(true);
    setError(null);

    try {
      // create user
      const res = await createUserWithEmailAndPassword(
        myFSAuth,
        email,
        password
      );
      console.log(res.user);
      // if error
      if (!res) {
        throw new Error("Could not complete the signup");
      }
      // update user display name
      await updateProfile(res.user, { displayName: name });

      // dispatch login action
      dispatch({ type: "LOGIN", payload: res.user });

      // update state if not cancelled

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
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

  // return the handleSignup function and error
  return {
    error,
    isPending,
    handleSignup,
  };
};
