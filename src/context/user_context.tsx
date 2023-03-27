import React, { useContext, useEffect, useState } from "react";
import { PropsWithChildren } from "react";
import { auth } from "../firebase";
import { User, UserCredential } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
} from "firebase/auth";

interface UserContextType {
  currentUser: User | null;
  signup: (email: string, password: string) => Promise<UserCredential> | void;
  login: (email: string, password: string) => Promise<UserCredential> | void;
  logout: () => Promise<void> | void;
  resetPassword: (email: string) => Promise<void> | void;
  updateUserEmail: (email: string) => Promise<void> | void;
  updateUserPassword: (password: string) => Promise<void> | void;
  isAuthenticated: () => boolean | void;
  isLoading: () => boolean | void;
}

const initialValue = {
  currentUser: null,
  signup: () => {},
  login: () => {},
  logout: () => {},
  resetPassword: () => {},
  updateUserEmail: () => {},
  updateUserPassword: () => {},
  isAuthenticated: () => false,
  isLoading: () => true,
};

const UserContext = React.createContext<UserContextType>(initialValue);

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  function signup(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function logout() {
    return signOut(auth);
  }
  async function resetPassword(email: string) {
    return sendPasswordResetEmail(auth, email);
  }
  async function updateUserEmail(email: string) {
    return updateEmail(auth.currentUser!, email);
  }
  async function updateUserPassword(password: string) {
    return updatePassword(auth.currentUser!, password);
  }
  function isAuthenticated() {
    return currentUser !== null;
  }
  function isLoading() {
    return loading;
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);
  return (
    <UserContext.Provider
      value={{
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        updateUserEmail,
        updateUserPassword,
        isAuthenticated,
        isLoading,
      }}
    >
      {!loading && children}
    </UserContext.Provider>
  );
};
// make sure use
export const useUserContext = () => {
  return useContext(UserContext);
};
