import React, { useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { PropsWithChildren } from "react";

const UserContext = React.createContext("");
export const UserProvider = ({ children }: PropsWithChildren) => {
  return (
    <UserContext.Provider value="user context">{children}</UserContext.Provider>
  );
};
// make sure use
export const useUserContext = () => {
  return useContext(UserContext);
};
