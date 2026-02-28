import type { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext, Link, Outlet } from '@tanstack/react-router';
import { Toaster } from 'sonner';
import { AuthProvider } from '@shared/contexts/AuthContext';
import i18n from '@shared/i18n';
import { I18nextProvider } from 'react-i18next';
import Layout from '@shared/components/Layout';
import UnauthenticatedHandler from '@shared/components/UnauthenticatedHandler';

function NotFound() {
    return (
        <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
            <p className="text-muted-foreground">Page not found.</p>
            <Link to="/" className="text-primary underline">
                Go home
            </Link>
        </div>
    );
}

export const Route = createRootRouteWithContext<{
    queryClient: QueryClient;
}>()({
    component: () => (
        <I18nextProvider i18n={i18n}>
            <AuthProvider>
                <UnauthenticatedHandler />
                <Layout>
                    <Outlet />
                </Layout>
                <Toaster position="top-right" richColors />
            </AuthProvider>
        </I18nextProvider>
    ),
    notFoundComponent: NotFound,
});
