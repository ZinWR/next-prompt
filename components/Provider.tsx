import { FC, ReactNode } from 'react';
import  { SessionProvider } from 'next-auth/react';

interface ProviderProps {
  session: any;
  children: ReactNode;
};

const Provider: FC<ProviderProps> = ({ children, session }) => {
  return (
    <SessionProvider
      session={session}
    >
      {children}
    </SessionProvider>
  );
};

export default Provider;