import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { createHead, UnheadProvider } from '@unhead/react/client';
import { routeTree } from '@central/routeTree.gen';
import './i18n';

const head = createHead();

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60,
        },
    },
});

const router = createRouter({
    routeTree,
    context: { queryClient },
});

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <UnheadProvider head={head}>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        </UnheadProvider>
    </StrictMode>,
);
