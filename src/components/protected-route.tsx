'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push('/login');
      }
      setIsInitialLoad(false);
    }
  }, [user, isLoading, router]);

  if (isLoading || isInitialLoad) {
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-400">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
