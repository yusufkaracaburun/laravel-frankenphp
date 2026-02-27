import { useAuth } from '../contexts/AuthContext';

export default function DashboardPage() {
    const { user } = useAuth();

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Dashboard</h1>
            <p className="text-gray-600">
                Welcome, {user?.name}! You are logged in as {user?.email}.
            </p>
        </div>
    );
}
