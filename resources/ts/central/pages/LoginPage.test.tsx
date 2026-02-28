/// <reference types="@testing-library/jest-dom" />
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
    createMemoryHistory,
    createRouter,
    RouterProvider,
} from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { routeTree } from '@central/routeTree.gen';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: { retry: false },
    },
});

function renderLoginPage() {
    const router = createRouter({
        routeTree,
        context: { queryClient },
        history: createMemoryHistory({ initialEntries: ['/login'] }),
        defaultPendingMinMs: 0,
    });

    return render(
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>,
    );
}

describe('LoginPage', () => {
    it('renders login form', async () => {
        renderLoginPage();
        expect(await screen.findByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        const loginButtons = screen.getAllByRole('button', { name: /login/i });
        expect(loginButtons.some((el) => el.getAttribute('type') === 'submit')).toBe(true);
        expect(screen.getByText(/don't have an account/i)).toBeInTheDocument();
    });
});
