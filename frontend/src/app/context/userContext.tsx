"use client";
import { createContext, useState, useEffect } from "react";

interface User {
  email: string;
  password: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
  otp: string;
  otp_expiry: string;
  isVerified: boolean;
}

const defaultUser: User = {
  email: '',
  password: '',
  fullName: { firstName: '', lastName: '' },
  otp: '',
  otp_expiry: '',
  isVerified: false,
};

interface UserContextProps {
  children: React.ReactNode;
}

const UserContext = createContext<{
  user: User;
  setUser: (user: User) => void;
}>({ user: defaultUser, setUser: () => {} });

const UserProvider = ({ children }: UserContextProps) => {
  const [user, setUser] = useState<User>(defaultUser);

  // Initialize user from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    }
  }, []);

  // Update localStorage when user changes
  const updateUser = (newUser: User) => {
    setUser(newUser);
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(newUser));
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser: updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider };
export default UserContext;