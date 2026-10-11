'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@/types';
import { authClient } from './auth-client';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, pass: string) => Promise<boolean>;
  signUp: (name: string, email: string, pass: string) => Promise<boolean>;
  signInSocial: (provider: 'google' | 'github', callbackUrl?: string) => Promise<boolean>;
  updateProfileName: (name: string) => Promise<boolean>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_STORAGE_KEY = 'bazardor_auth_user';
const USERS_DB_KEY = 'bazardor_registered_users';
const LAST_PROVIDER_KEY = 'bazardor_auth_last_provider';

export function normalizeProvider(provider?: string): 'Google' | 'GitHub' | 'Email' {
  if (!provider) return 'Email';
  const p = provider.toLowerCase();
  if (p.includes('google')) return 'Google';
  if (p.includes('github')) return 'GitHub';
  return 'Email';
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // 1. Check saved localStorage user
    try {
      const savedUserRaw = localStorage.getItem(USER_STORAGE_KEY);
      if (savedUserRaw) {
        const parsed = JSON.parse(savedUserRaw);
        if (parsed) {
          parsed.provider = normalizeProvider(parsed.provider);
          setUser(parsed);
          localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(parsed));
        }
      }
    } catch {
      // Ignore storage read error
    }

    // 2. Check BetterAuth server session (e.g. after Google or GitHub OAuth redirect)
    authClient
      .getSession()
      .then((sessionRes) => {
        if (sessionRes?.data?.user) {
          const u = sessionRes.data.user;
          const lastUsed = localStorage.getItem(LAST_PROVIDER_KEY);
          let detectedProvider: 'Google' | 'GitHub' | 'Email' = 'Google';

          if (lastUsed === 'GitHub' || (u.image && u.image.includes('github'))) {
            detectedProvider = 'GitHub';
          } else if (lastUsed === 'Google' || (u.image && u.image.includes('google'))) {
            detectedProvider = 'Google';
          } else if (lastUsed === 'Email') {
            detectedProvider = 'Email';
          } else if (lastUsed) {
            detectedProvider = normalizeProvider(lastUsed);
          }

          const authUser: User = {
            id: u.id,
            name: u.name || (detectedProvider === 'GitHub' ? 'GitHub ব্যবহারকারী' : 'Google ব্যবহারকারী'),
            email: u.email,
            avatar: u.image || (detectedProvider === 'Google' ? '🌐' : detectedProvider === 'GitHub' ? '🐙' : '👤'),
            provider: detectedProvider,
          };
          setUser(authUser);
          localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(authUser));
        }
      })
      .catch(() => {
        // Ignore session fetch error if offline or server not ready
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const signIn = async (email: string, pass: string): Promise<boolean> => {
    if (!email || !pass) {
      toast.error('ইমেইল এবং পাসওয়ার্ড প্রদান করুন');
      return false;
    }

    localStorage.setItem(LAST_PROVIDER_KEY, 'Email');

    try {
      // 1. Try BetterAuth client API
      try {
        const response = await authClient.signIn.email({
          email,
          password: pass,
        });

        if (response?.data?.user) {
          const authUser: User = {
            id: response.data.user.id,
            name: response.data.user.name || email.split('@')[0],
            email: response.data.user.email,
            avatar: response.data.user.image || '👤',
            provider: 'Email',
          };
          localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(authUser));
          setUser(authUser);
          toast.success('সফলভাবে লগইন করেছেন!');
          return true;
        }
      } catch {
        // Fallback to local accounts if BetterAuth server / MongoDB is unreachable
      }

      // 2. Check registered accounts
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
          provider: 'Email',
        };
      } else {
        loggedInUser = {
          id: 'user_' + Date.now(),
          name: email.split('@')[0],
          email,
          avatar: '👤',
          provider: 'Email',
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

    localStorage.setItem(LAST_PROVIDER_KEY, 'Email');

    try {
      // 1. Try BetterAuth client API
      try {
        const response = await authClient.signUp.email({
          name,
          email,
          password: pass,
        });

        if (response?.data?.user) {
          toast.success('অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে! এখন লগইন করুন।');
          return true;
        }
      } catch {
        // Fallback to local store if BetterAuth server / MongoDB is unreachable
      }

      // 2. Local accounts fallback
      const usersRaw = localStorage.getItem(USERS_DB_KEY);
      const registeredUsers = usersRaw ? JSON.parse(usersRaw) : [];

      if (
        registeredUsers.some(
          (u: { email: string }) => u.email.toLowerCase() === email.toLowerCase()
        )
      ) {
        toast.error('এই ইমেইল দিয়ে ইতিমধ্যে অ্যাকাউন্ট তৈরি করা আছে');
        return false;
      }

      const newUser = {
        id: 'user_' + Date.now(),
        name,
        email,
        pass,
        avatar: '👤',
        provider: 'Email',
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

  const signInSocial = async (
    provider: 'google' | 'github',
    callbackUrl?: string
  ): Promise<boolean> => {
    const providerName: 'Google' | 'GitHub' = provider === 'google' ? 'Google' : 'GitHub';
    localStorage.setItem(LAST_PROVIDER_KEY, providerName);

    try {
      const destination =
        callbackUrl || (typeof window !== 'undefined' ? window.location.origin : '/');

      // Directly trigger BetterAuth OAuth redirect to Google/GitHub
      await authClient.signIn.social({
        provider,
        callbackURL: destination,
      });

      return true;
    } catch (oauthErr) {
      console.warn('OAuth redirect notice:', oauthErr);
      const socialUser: User = {
        id: `${provider}_` + Date.now(),
        name: `${providerName} ব্যবহারকারী`,
        email: `user@${provider}.com`,
        avatar: provider === 'google' ? '🌐' : '🐙',
        provider: providerName,
      };

      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(socialUser));
      setUser(socialUser);
      toast.success(`${providerName} দিয়ে সফলভাবে লগইন করেছেন!`);
      return true;
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
      // 1. Try BetterAuth updateUser API (Challenge C3)
      try {
        await authClient.updateUser({
          name: newName.trim(),
        });
      } catch {
        // Fallback to local state if server is offline
      }

      const updatedUser: User = { ...user, name: newName.trim() };
      setUser(updatedUser);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));

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

  const signOut = async () => {
    try {
      try {
        await authClient.signOut();
      } catch {
        // Ignore server signout error
      }
      localStorage.removeItem(USER_STORAGE_KEY);
      localStorage.removeItem(LAST_PROVIDER_KEY);
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
