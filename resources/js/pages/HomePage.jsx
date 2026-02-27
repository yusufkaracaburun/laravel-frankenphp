import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function HomePage() {
    const { user } = useAuth();

    return (
        <div className="text-center py-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Welcome to {import.meta.env.VITE_APP_NAME || 'Laravel'}
            </h1>
            <p className="text-gray-600 mb-8">
                {user
                    ? `Hello, ${user.name}! You are logged in.`
                    : 'Register or login to get started.'}
            </p>
            {user ? (
                <Link
                    to="/dashboard"
                    className="inline-flex px-6 py-3 text-base font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                >
                    Go to Dashboard
                </Link>
            ) : (
                <div className="flex gap-4 justify-center">
                    <Link
                        to="/login"
                        className="inline-flex px-6 py-3 text-base font-medium text-indigo-600 bg-white border border-indigo-600 rounded-md hover:bg-indigo-50"
                    >
                        Login
                    </Link>
                    <Link
                        to="/register"
                        className="inline-flex px-6 py-3 text-base font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                    >
                        Register
                    </Link>
                </div>
            )}
        </div>
    );
}
