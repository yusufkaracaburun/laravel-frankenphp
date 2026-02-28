import { createFileRoute, Outlet } from '@tanstack/react-router';
import ProtectedRoute from '@tenant/components/ProtectedRoute';

export const Route = createFileRoute('/_authenticated')({
    component: () => (
        <ProtectedRoute>
            <Outlet />
        </ProtectedRoute>
    ),
});
