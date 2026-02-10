import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

interface User {
  id: string;
  email: string;
  name: string;
  role: "member" | "mentee" | "mentor";
  phoneNumber?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  loginWithGoogle: (credential: string, role?: User["role"], customName?: string, phoneNumber?: string) => Promise<{ error?: string }>;
  register: (email: string, password: string, name: string, role: User["role"], phoneNumber?: string) => Promise<{ error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser({
          id: session.user.id,
          email: session.user.email!,
          name: session.user.user_metadata.name || session.user.email?.split("@")[0] || "",
          role: session.user.user_metadata.role || "member",
          phoneNumber: session.user.user_metadata.phone_number
        });
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
         setUser({
          id: session.user.id,
          email: session.user.email!,
          name: session.user.user_metadata.name || session.user.email?.split("@")[0] || "",
          role: session.user.user_metadata.role || "member",
          phoneNumber: session.user.user_metadata.phone_number
        });
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<{ error?: string }> => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
       return { error: error.message };
    }
    return {};
  }, []);

  const loginWithGoogle = useCallback(async (credential: string, role?: User["role"], customName?: string, phoneNumber?: string): Promise<{ error?: string }> => {
     // Exchange the Google ID Token for a Supabase Session
     const { data, error } = await supabase.auth.signInWithIdToken({
        provider: 'google',
        token: credential,
     });
     
     if (error) {
        return { error: error.message };
     }
     
     if (data.user) {
        // We rely strictly on the presence of a 'role' in metadata to determine if a user 
        // is fully registered.
        // - New Google Signins have NO role.
        // - Registered users HAVE a role.
        const hasRole = data.user.user_metadata?.role;
        
        // Scenario 1: Registration Flow (Input 'role' is provided from the Register form)
        if (role) {
            // If the user already has a role, they are already registered. Block them.
            if (hasRole) {
                await supabase.auth.signOut();
                return { error: "Account already exists. Please sign in." };
            }
            
            // If they don't have a role (New user or Incomplete profile) -> Update & Allow.
            await supabase.auth.updateUser({
               data: {
                 role,
                 name: customName || data.user.user_metadata?.name,
                 phone_number: phoneNumber
               }
            });
        } 
        // Scenario 2: Login Flow (No 'role' argument provided)
        else {
             // If the user attempts to login but has NO role, they never blindly registered.
             // We block them to prevent "Login without account".
             if (!hasRole) {
                 await supabase.auth.signOut();
                 return { error: "No account found. Please register first." };
             }
             // If they have a role, they are a valid user. Allow login.
        }
     }
     
     return {};
  }, []);

  const register = useCallback(async (email: string, password: string, name: string, role: User["role"], phoneNumber?: string): Promise<{ error?: string }> => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          role,
          phone_number: phoneNumber
        }
      }
    });

    if (error) {
      if (error.message.includes("registered") || error.status === 422) {
        return { error: "Account already exists. Please sign in." };
      }
      return { error: error.message };
    }
    
    // Check if user already exists (strictly via timestamps)
    // If it's a new user, created_at should be very close to NOW.
    if (data.user) {
       // Check 1: Identities array is empty (Supabase signal for duplicate email)
       if (data.user.identities && data.user.identities.length === 0) {
           return { error: "Account already exists. Please sign in." };
       }

       // Check 2: Creation time vs Current time
       const createdAt = new Date(data.user.created_at).getTime();
       const now = Date.now();

       // If account is older than 5 seconds, it is an existing account.
       // (New accounts are created at the moment of request)
       if (now - createdAt > 5000) {
           if (data.session) await supabase.auth.signOut();
           return { error: "Account already exists. Please sign in." };
       }
    }
    
    return {};
  }, []);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
  }, []);


  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        loginWithGoogle,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
