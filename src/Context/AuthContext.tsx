import { createContext } from "react";
import type { User, UserCredential } from "firebase/auth";
import type { Auth } from "firebase/auth";

export type AuthContextType = {
  user: User | null;
  userInfo: Record<string, unknown> | null;
  loading: boolean;

  createUser: (email: string, password: string) => Promise<UserCredential>;
  sigInUser: (email: string, password: string) => Promise<UserCredential>;
  googleSignIn: () => Promise<UserCredential>;
  signOutUser: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUser: (name: string, photoUrl: string) => Promise<void>;
};

export type UserContextType = {
  user: User | null;
  userInfo: Record<string, unknown> | null;
  loading: boolean;
  auth: Auth;
  signOutUser: () => Promise<void>;
};

// AuthContext (the one you provide in AuthProvider)
export const AuthContext = createContext<AuthContextType | null>(null);

// UserContext (the one you consume inside AuthProvider)
export const UserContext = createContext<UserContextType | null>(null);
