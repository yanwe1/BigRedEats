// other imports
import { WrappedComponentProps } from 'react-with-firebase-auth';
import { User } from "firebase/auth";
import { createContext, useContext } from "react";

type AuthData = Omit<WrappedComponentProps, 'user'> & {
  user?: User | null;
};

const AuthUserContext = createContext<AuthData | undefined>(undefined);

const AuthUserProvider: FC<WrappedComponentProps> = ({ children, ...auth }) => (
  <AuthUserContext.Provider value={auth}>{children}</AuthUserContext.Provider>
);



export const useAuth = () => {
  const context = useContext(AuthUserContext);
  if (!context) throw new Error('AuthUserContext has no value');
  return context;
};