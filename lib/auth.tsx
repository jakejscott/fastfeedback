import { createContext, useContext, useEffect, useState } from "react";
import firebase from "./firebase";
import Router from "next/router";

const authContext = createContext(null);

export function AuthProvider({ children }) {
  const auth = useAuthProvider();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useAuthProvider() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleUser = async (rawUser) => {
    if (rawUser) {
      const user = await formatUser(rawUser);
      setUser(user);
      setLoading(false);
      return user;
    } else {
      setUser(false);
      setLoading(false);
      return false;
    }
  };

  const signinWithGitHub = async (redirect) => {
    setLoading(true);
    return (
      firebase
        .auth()
        //.signInWithRedirect(new firebase.auth.GithubAuthProvider())
        .signInWithPopup(new firebase.auth.GithubAuthProvider())
        .then((response) => {
          handleUser(response.user);

          if (redirect) {
            Router.push(redirect);
          }
        })
    );
  };

  const signout = () => {
    Router.push("/");

    return firebase
      .auth()
      .signOut()
      .then(() => handleUser(false));
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onIdTokenChanged(handleUser);

    return () => unsubscribe();
  }, []);

  return {
    user,
    loading,
    signinWithGitHub,
    signout,
  };
}

const formatUser = async (user) => {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
  };
};
