"use client";
import { createContext, useState } from "react";

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
  const [user, setUser] = useState(defaultUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider };
export default UserContext;