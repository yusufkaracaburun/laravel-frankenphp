import { createFileRoute, Outlet } from '@tanstack/react-router';
import ProtectedRoute from '@shared/components/ProtectedRoute';

export const Route = createFileRoute('/_authenticated')({
    component: () => (
        <ProtectedRoute>
            <Outlet />
        </ProtectedRoute>
    ),
});
