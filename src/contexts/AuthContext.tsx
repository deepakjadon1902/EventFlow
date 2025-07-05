import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, userData: any) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    console.log('AuthProvider: Initializing...');
    
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('AuthProvider: Initial session:', session);
      setSession(session);
      setUser(session?.user ?? null);
      checkAdminStatus(session?.user);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('AuthProvider: Auth state changed:', event, session);
        setSession(session);
        setUser(session?.user ?? null);
        checkAdminStatus(session?.user);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const checkAdminStatus = async (user: User | null) => {
    console.log('AuthProvider: Checking admin status for user:', user?.email);
    
    if (!user) {
      console.log('AuthProvider: No user, setting isAdmin to false');
      setIsAdmin(false);
      return;
    }

    try {
      // First check if email matches admin email
      const isAdminEmail = user.email === 'deepakjadon1902@gmail.com';
      console.log('AuthProvider: Is admin email?', isAdminEmail);

      if (isAdminEmail) {
        setIsAdmin(true);
        console.log('AuthProvider: Set isAdmin to true (email match)');
        return;
      }

      // Then check database role
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      console.log('AuthProvider: Profile data:', profile, 'Error:', error);

      if (error) {
        console.error('AuthProvider: Error fetching profile:', error);
        setIsAdmin(isAdminEmail); // Fallback to email check
        return;
      }

      const isAdminRole = profile?.role === 'admin';
      console.log('AuthProvider: Is admin role?', isAdminRole);
      
      setIsAdmin(isAdminEmail || isAdminRole);
      console.log('AuthProvider: Final isAdmin status:', isAdminEmail || isAdminRole);
    } catch (error) {
      console.error('AuthProvider: Error checking admin status:', error);
      setIsAdmin(user.email === 'deepakjadon1902@gmail.com');
    }
  };

  const signIn = async (email: string, password: string) => {
    console.log('AuthProvider: Signing in user:', email);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    console.log('AuthProvider: Sign in result:', error);
    return { error };
  };

  const signUp = async (email: string, password: string, userData: any) => {
    console.log('AuthProvider: Signing up user:', email, 'with data:', userData);
    
    try {
      // Sign up with user metadata
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: userData.name,
            phone: userData.phone,
            address: userData.address,
            dateOfBirth: userData.dateOfBirth,
          }
        }
      });

      if (authError) {
        console.error('AuthProvider: Auth signup error:', authError);
        return { error: authError };
      }

      if (!authData.user) {
        console.error('AuthProvider: No user returned from signup');
        return { error: new Error('Registration failed - no user created') };
      }

      console.log('AuthProvider: User signed up successfully:', authData.user.id);

      // Wait for the trigger to create the profile
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Verify profile was created
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authData.user.id)
        .single();

      if (profileError || !profile) {
        console.warn('AuthProvider: Profile not found, creating manually...');
        
        // Create profile manually if trigger failed
        const { error: manualProfileError } = await supabase
          .from('profiles')
          .insert({
            id: authData.user.id,
            email: userData.email,
            name: userData.name,
            phone: userData.phone,
            address: userData.address,
            date_of_birth: userData.dateOfBirth,
            role: email === 'deepakjadon1902@gmail.com' ? 'admin' : 'user',
          });

        if (manualProfileError) {
          console.error('AuthProvider: Manual profile creation failed:', manualProfileError);
          // Don't return error as user is already created
        } else {
          console.log('AuthProvider: Profile created manually');
        }
      } else {
        console.log('AuthProvider: Profile found/created by trigger:', profile);
      }

      return { error: null };
    } catch (error) {
      console.error('AuthProvider: Unexpected error during signup:', error);
      return { error };
    }
  };

  const signOut = async () => {
    console.log('AuthProvider: Signing out user');
    await supabase.auth.signOut();
  };

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    isAdmin,
  };

  console.log('AuthProvider: Current state:', {
    user: user?.email,
    isAdmin,
    loading
  });

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}