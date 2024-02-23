// Import necessary dependencies from React and Firebase
import { useState, useEffect } from "react";
import { myFSAuth, myFSStorage } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";

// Custom hook to handle signup logic
export const useSignup = () => {
  // State variables for cancellation flag, error handling, and loading state
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext(); // Accessing the authentication context

  // Function to handle user signup
  const handleSignup = async (name, email, password, thumbnail) => {
    setIsPending(true);
    setError(null);

    try {
      // Create a new user with email and password
      const res = await createUserWithEmailAndPassword(
        myFSAuth,
        email,
        password
      );
      console.log(res.user);

      // Check if user creation was successful
      if (!res) {
        throw new Error("Could not complete the signup");
      }

      // upload user thumbnail
      const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`;
      const img = await myFSStorage.ref(uploadPath).put(thumbnail);

      // Update user display name
      await updateProfile(res.user, { displayName: name, photoURL: null });

      // Dispatch login action to update authentication state
      dispatch({ type: "LOGIN", payload: res.user });

      // Update state if the signup process is not cancelled
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      // Update state with error details if the signup process is not cancelled
      if (!isCancelled) {
        setIsPending(false);
        setError(err.message);
      }
    }
  };

  // Cleanup function to set the cancellation flag when the component unmounts
  useEffect(() => {
    return () => {
      setIsCancelled(true);
    };
  }, []);

  // Return the handleSignup function and associated state variables for external use
  return {
    error,
    isPending,
    handleSignup,
  };
};
