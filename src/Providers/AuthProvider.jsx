import {
  GoogleAuthProvider,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
  } from "firebase/auth";
  import { createContext, useEffect, useState } from "react";
  import auth from "../Firebase/Firebase.config";
  
  export const AuthContext = createContext(null);
  const googleProvider = new GoogleAuthProvider();
  
  const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
  
    const CreateUser = (email, password) => {
      return createUserWithEmailAndPassword(auth, email, password);
    };
  
    const signInUser = (email, password) => {
      setLoading(true);
      return signInWithEmailAndPassword(auth, email, password);
    }

    const googleSignIn = () => {
      setLoading(true);
      return signInWithPopup(auth, googleProvider)
    }
  
    const SignOutUser = () => {
      setLoading(true);
      return signOut(auth)
    }
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (createUser) => {
        setUser(createUser);
        setLoading(false);
        console.log(createUser);
      });
      return () => {
        unsubscribe();
      };
    }, []);
    const AuthInfo = { user, loading, CreateUser, googleSignIn, signInUser, SignOutUser };
    return (
      <AuthContext.Provider value={AuthInfo}>{children}</AuthContext.Provider>
    );
  };
  
  export default AuthProvider;