// Import necessary dependencies from React and Firebase
import { useState, useEffect } from "react";
import { myFSAuth, myFSStorage, myFSProject } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, doc, setDoc } from "firebase/firestore";

// Custom hook to handle signup logic
export const useSignup = () => {
  // State variables for cancellation flag, error handling, and loading state
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext(); // Accessing the authentication context

  // Function to handle user signup
  const handleSignup = async (email, password, displayName, thumbnail) => {
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
      const img = await uploadBytes(ref(myFSStorage, uploadPath), thumbnail);

      // Get download URL after successful upload
      const imgUrl = await getDownloadURL(img.ref);

      // Use imgUrl as needed in your application
      console.log("Image uploaded successfully. Download URL:", imgUrl);

      // Update user display name
      await updateProfile(res.user, {
        displayName: displayName,
        photoURL: imgUrl,
      });

      // create a user document in Firestore
      const authUserUID = res.user.uid;
      const userDocRef = doc(collection(myFSProject, "users"), authUserUID);

      // use the reference to the created document to set additional data
      await setDoc(userDocRef, {
        online: true,
        displayName: displayName,
        photoURL: imgUrl,
      });

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
