import { useEffect } from 'react';
import { useRouter } from '@tanstack/react-router';
import { setUnauthenticatedHandler } from '@shared/lib/axios';
import { useAuth } from '@shared/contexts/AuthContext';

export default function UnauthenticatedHandler() {
  const { setUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setUnauthenticatedHandler(() => {
      setUser(null);
      router.navigate({ to: '/login', replace: true });
    });
  }, [setUser, router]);

  return null;
}
