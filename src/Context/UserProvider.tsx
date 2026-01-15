import { useEffect, useState, type ReactNode } from "react";
import { onAuthStateChanged, signOut, getIdToken, type User } from "firebase/auth";
import { auth } from "../Firebase/Firebase.config";
import axios from "axios";
import { UserContext } from "./AuthContext";

export default function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [userInfo, setUserInfo] = useState(null)
    const [loading, setLoading] = useState(true)
    const signOutUser = () => signOut(auth)
    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setLoading(true);

      if (u) {
        setUser(u);

        try {
          const token = await getIdToken(u);
          const res = await axios.get(
            `${import.meta.env.VITE_SERVER}/userInfo`,
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          );
          setUserInfo(res.data);
        } catch (error) {
          console.error("User Info Error:", error);
          setUserInfo(null);
        }
      } else {
        setUser(null);
        setUserInfo(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

    return (
        <UserContext.Provider value={{ user, userInfo, loading, auth, signOutUser }}>
            {children}
        </UserContext.Provider>
    )
}