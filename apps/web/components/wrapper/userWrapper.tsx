import { FC, PropsWithChildren } from "react";
import { UserProvider } from "@auth0/nextjs-auth0/client";

const UserWrapper: FC<PropsWithChildren> = ({ children }) => {
  return <UserProvider>{children}</UserProvider>;
};

export default UserWrapper;
