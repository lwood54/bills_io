import { ApiError, Provider, Session, User } from "@supabase/supabase-js";
import * as React from "react";
import { supabase } from "../supabase";

interface AuthData {
  email: string;
  password: string;
  phone: string;
}

interface AuthData {
  signUp: (data: AuthData) => Promise<{
    user: User | null;
    session: Session | null;
    error: ApiError | null;
  }>;
  signIn: (data: AuthData) => Promise<{
    session: Session | null;
    user: User | null;
    provider?: Provider | undefined;
    url?: string | null | undefined;
    error: ApiError | null;
  }>;
  signOut: () => Promise<{
    error: ApiError | null;
  }>;
  user: User;
}

// const AuthContext = React.createContext<AuthData>({} as AuthData);
const AuthContext = React.createContext<any>({} as AuthData);

export function AuthProvider({ children }: { children: any }) {
  const [user, setUser] = React.useState<User | null>();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Check active sessions and sets the user
    const session = supabase.auth.session();

    setUser(session?.user ?? null);
    setLoading(false);

    // Listen for changes on auth state (logged in, signed out, etc.)
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => {
      listener?.unsubscribe();
    };
  }, []);

  // Will be passed down to Signup, Login and Dashboard components
  const value = {
    signUp: (data: AuthData) => supabase.auth.signUp(data),
    signIn: (data: AuthData) => supabase.auth.signIn(data),
    signOut: () => supabase.auth.signOut(),
    user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return React.useContext(AuthContext);
}
