import { useContext, type ReactNode } from "react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { AuthContext, UserContext } from "./AuthContext";

export default function AuthProvider({ children }: { children: ReactNode }) {
    const userCtx = useContext(UserContext);
    const googleProvider = new GoogleAuthProvider();
    if (!userCtx) throw new Error("UserContext is missing. Wrap app with UserContext Provider.");

    const { user, userInfo, loading, auth, signOutUser } = userCtx;
    
    const updateUser = (name: string, photoUrl: string) => {
        if (!auth.currentUser) throw new Error("No user is currently signed in.");
        return updateProfile(auth.currentUser, { displayName: name, photoURL: photoUrl });
    }
    const createUser = (email: string, password: string) => createUserWithEmailAndPassword(auth, email, password)
    const sigInUser = (email: string, password: string) => signInWithEmailAndPassword(auth, email, password)
    const googleSignIn = () => signInWithPopup(auth, googleProvider)
    const resetPassword = (email: string) => sendPasswordResetEmail(auth, email)

    return (
        <AuthContext.Provider value={{ user, userInfo, loading, createUser, updateUser, sigInUser, signOutUser, googleSignIn, resetPassword }}>
            {children}
        </AuthContext.Provider>
    )
}