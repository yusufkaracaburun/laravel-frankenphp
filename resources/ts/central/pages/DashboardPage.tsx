import { Link } from 'react-router-dom';
import { useAuth } from '@central/contexts/AuthContext';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@central/components/ui/card';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Dashboard</CardTitle>
          <CardDescription>
            Welcome, {user?.name}! You are logged in as {user?.email}.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link to="/profile">
            <span className="text-primary hover:underline font-medium">
              Edit your profile
            </span>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
