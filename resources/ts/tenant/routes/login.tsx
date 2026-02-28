import { z } from 'zod';
import { createFileRoute } from '@tanstack/react-router';
import LoginPage from '@tenant/pages/LoginPage';

const loginSearchSchema = z.object({
    redirect: z.string().optional(),
});

export const Route = createFileRoute('/login')({
    component: LoginPage,
    validateSearch: loginSearchSchema,
});
