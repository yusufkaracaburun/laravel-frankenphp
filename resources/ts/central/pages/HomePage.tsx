import { Link } from 'react-router-dom';
import { useAuth } from '@shared/contexts/AuthContext';
import { Button } from '@shared/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@shared/components/ui/card';

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="text-center py-12">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl">
            Welcome to {import.meta.env.VITE_APP_NAME || 'Laravel'}
          </CardTitle>
          <CardDescription className="text-base">
            {user
              ? `Hello, ${user.name}! You are logged in.`
              : 'Register or login to get started.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {user ? (
            <Link to="/dashboard">
              <Button size="lg">Go to Dashboard</Button>
            </Link>
          ) : (
            <div className="flex gap-4 justify-center">
              <Link to="/login">
                <Button variant="outline" size="lg">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button size="lg">Register</Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
