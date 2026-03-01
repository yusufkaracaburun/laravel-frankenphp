import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AxiosError } from 'axios';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { createHead, UnheadProvider } from '@unhead/react/client';
import { toast } from 'sonner';
import { handleServerError } from '@central/lib/handle-server-error';
import { ThemeProvider } from '@central/contexts/theme-provider';
import { FontProvider } from '@central/contexts/font-provider';
import { routeTree } from '@central/routeTree.gen';
import '@central/i18n';
import '@central/styles/index.css';

const head = createHead();

const router = createRouter({
  routeTree,
  context: { queryClient: undefined! },
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        if (failureCount >= 0 && import.meta.env.DEV) return false;
        if (failureCount > 3 && import.meta.env.PROD) return false;
        return !(
          error instanceof AxiosError &&
          [401, 403].includes(error.response?.status ?? 0)
        );
      },
      refetchOnWindowFocus: import.meta.env.PROD,
      staleTime: 10 * 1000,
    },
    mutations: {
      onError: (error) => {
        handleServerError(error);
        if (error instanceof AxiosError) {
          if (error.response?.status === 304) {
            toast.error('Content not modified!');
          }
        }
      },
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          toast.error('Session expired!');
          router.navigate({ to: '/login' });
        }
        if (error.response?.status === 500) {
          toast.error('Internal Server Error!');
          if (import.meta.env.PROD) {
            router.navigate({ to: '/500' });
          }
        }
      }
    },
  }),
});

const rootElement = document.getElementById('root')!;

if (!rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <UnheadProvider head={head}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <FontProvider>
              <RouterProvider router={router} context={{ queryClient }} />
            </FontProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </UnheadProvider>
    </StrictMode>,
  );
}
