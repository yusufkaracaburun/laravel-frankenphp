import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@tenant/contexts/AuthContext';
import { LogOut } from 'lucide-react';
import { Button } from '@tenant/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@tenant/components/ui/dropdown-menu';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-6">
              <Link to="/" className="text-xl font-semibold text-foreground">
                {import.meta.env.VITE_APP_NAME || 'Laravel'}
              </Link>
              {user && (
                <nav className="flex gap-4">
                  <Link
                    to="/dashboard"
                    className="text-muted-foreground hover:text-foreground font-medium"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/profile"
                    className="text-muted-foreground hover:text-foreground font-medium"
                  >
                    Profile
                  </Link>
                </nav>
              )}
            </div>
            <div className="flex items-center gap-4">
              {user ? (
                <>
                  <span className="text-sm text-muted-foreground">
                    {user.name}
                  </span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        Account
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="cursor-pointer"
                      >
                        <LogOut className="size-4" aria-hidden />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="ghost">Login</Button>
                  </Link>
                  <Link to="/register">
                    <Button>Register</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
