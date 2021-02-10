import { createContext, useContext, useEffect, useState } from "react";
import firebase from "./firebase";
import { createUser } from "./firestore";

interface User {
  uid: string;
  email: string;
  name: string;
  provider: string;
  photoUrl: string;
}

interface UserAuthProvider {
  loading: boolean;
  user: User | false;
  signinWithGitHub(): Promise<User | false>;
  signout(): Promise<void>;
}

const authContext = createContext<UserAuthProvider>(null);

export function AuthProvider({ children }) {
  const auth = useAuthProvider();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export function useAuth() {
  return useContext(authContext);
}

function useAuthProvider(): UserAuthProvider {
  const [user, setUser] = useState<User | false>(null);
  const [loading, setLoading] = useState<boolean>(true);

  async function handleUser(rawUser): Promise<User | false> {
    if (rawUser) {
      const user = formatUser(rawUser);
      await createUser(user.uid, user);
      setUser(user);
      setLoading(false);
      return user;
    } else {
      setUser(false);
      setLoading(false);
      return false;
    }
  }

  async function signinWithGitHub(): Promise<User | false> {
    setLoading(true);
    const provider = new firebase.auth.GithubAuthProvider();
    try {
      const credential = await firebase.auth().signInWithPopup(provider);
      return handleUser(credential?.user);
    } catch (error) {
      return handleUser(false);
    }
  }

  async function signout() {
    try {
      await firebase.auth().signOut();
    } catch (error) {}
    handleUser(false);
  }

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

function formatUser(user): User {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
  };
}
