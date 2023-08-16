import React, { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import NavBar from '../components/shared/NavBar';

interface AppWrapperProps {
  children: ReactNode;
}
function AppWrapper({ children }: AppWrapperProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-screen w-screen flex flex-col items-center bg-slate-100">
        <NavBar />
        {children}
      </div>
    </QueryClientProvider>
  );
}

export default AppWrapper;
