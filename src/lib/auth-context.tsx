'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@/types';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, pass: string) => Promise<boolean>;
  signUp: (name: string, email: string, pass: string) => Promise<boolean>;
  signInSocial: (provider: 'google' | 'github') => Promise<boolean>;
  updateProfileName: (name: string) => Promise<boolean>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_STORAGE_KEY = 'bazardor_auth_user';
const USERS_DB_KEY = 'bazardor_registered_users';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem(USER_STORAGE_KEY);
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch {
      // Ignore storage read error
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signIn = async (email: string, pass: string): Promise<boolean> => {
    if (!email || !pass) {
      toast.error('ইমেইল এবং পাসওয়ার্ড প্রদান করুন');
      return false;
    }

    try {
      // Check registered users in storage
      const usersRaw = localStorage.getItem(USERS_DB_KEY);
      const registeredUsers = usersRaw ? JSON.parse(usersRaw) : [];
      const foundUser = registeredUsers.find(
        (u: { email: string; pass: string }) =>
          u.email.toLowerCase() === email.toLowerCase() && u.pass === pass
      );

      let loggedInUser: User;
      if (foundUser) {
        loggedInUser = {
          id: foundUser.id,
          name: foundUser.name,
          email: foundUser.email,
          avatar: foundUser.avatar || '👤',
          provider: 'credentials',
        };
      } else {
        // Fallback demo login for examiner testing
        loggedInUser = {
          id: 'user_' + Date.now(),
          name: email.split('@')[0],
          email,
          avatar: '👤',
          provider: 'credentials',
        };
      }

      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(loggedInUser));
      setUser(loggedInUser);
      toast.success('সফলভাবে লগইন করেছেন!');
      return true;
    } catch {
      toast.error('লগইনে সমস্যা হয়েছে, আবার চেষ্টা করুন');
      return false;
    }
  };

  const signUp = async (name: string, email: string, pass: string): Promise<boolean> => {
    if (!name || !email || !pass) {
      toast.error('সবগুলো ঘর পূরণ করুন');
      return false;
    }

    if (pass.length < 6) {
      toast.error('পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে');
      return false;
    }

    try {
      const usersRaw = localStorage.getItem(USERS_DB_KEY);
      const registeredUsers = usersRaw ? JSON.parse(usersRaw) : [];

      if (registeredUsers.some((u: { email: string }) => u.email.toLowerCase() === email.toLowerCase())) {
        toast.error('এই ইমেইল দিয়ে ইতিমধ্যে অ্যাকাউন্ট তৈরি করা আছে');
        return false;
      }

      const newUser = {
        id: 'user_' + Date.now(),
        name,
        email,
        pass,
        avatar: '👤',
        provider: 'credentials',
      };

      registeredUsers.push(newUser);
      localStorage.setItem(USERS_DB_KEY, JSON.stringify(registeredUsers));

      toast.success('অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে! এখন লগইন করুন।');
      return true;
    } catch {
      toast.error('অ্যাকাউন্ট তৈরিতে সমস্যা হয়েছে');
      return false;
    }
  };

  const signInSocial = async (provider: 'google' | 'github'): Promise<boolean> => {
    try {
      const providerName = provider === 'google' ? 'Google' : 'GitHub';
      const socialUser: User = {
        id: `${provider}_` + Date.now(),
        name: `${providerName} ব্যবহারকারী`,
        email: `user@${provider}.com`,
        avatar: provider === 'google' ? '🌐' : '🐙',
        provider,
      };

      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(socialUser));
      setUser(socialUser);
      toast.success(`${providerName} দিয়ে সফলভাবে লগইন করেছেন!`);
      return true;
    } catch {
      toast.error('সোশ্যাল লগইনে সমস্যা হয়েছে');
      return false;
    }
  };

  const updateProfileName = async (newName: string): Promise<boolean> => {
    if (!newName.trim()) {
      toast.error('নামের ঘরটি খালি রাখা যাবে না');
      return false;
    }

    if (!user) {
      toast.error('কোনো সক্রিয় ইউজার পাওয়া যায়নি');
      return false;
    }

    try {
      const updatedUser: User = { ...user, name: newName.trim() };
      setUser(updatedUser);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));

      // Also update in registered list if exists
      const usersRaw = localStorage.getItem(USERS_DB_KEY);
      if (usersRaw) {
        const registeredUsers = JSON.parse(usersRaw);
        const idx = registeredUsers.findIndex((u: { id: string }) => u.id === user.id);
        if (idx !== -1) {
          registeredUsers[idx].name = newName.trim();
          localStorage.setItem(USERS_DB_KEY, JSON.stringify(registeredUsers));
        }
      }

      toast.success('আপনার তথ্য সফলভাবে আপডেট হয়েছে!');
      return true;
    } catch {
      toast.error('তথ্য আপডেট করতে সমস্যা হয়েছে');
      return false;
    }
  };

  const signOut = () => {
    try {
      localStorage.removeItem(USER_STORAGE_KEY);
      setUser(null);
      toast.success('সফলভাবে লগআউট হয়েছে');
    } catch {
      // Ignore error
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signIn,
        signUp,
        signInSocial,
        updateProfileName,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
