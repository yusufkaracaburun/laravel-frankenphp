import { Navigate, useRouter } from '@tanstack/react-router';
import { useAuth } from '@shared/contexts/AuthContext';

interface ProtectedRouteProps {
  readonly children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  if (!user) {
    const redirect = router.state.location.pathname;
    return (
      <Navigate
        to="/login"
        search={redirect ? { redirect } : undefined}
        replace
      />
    );
  }

  return <>{children}</>;
}
