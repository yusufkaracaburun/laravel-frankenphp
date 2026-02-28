import { z } from 'zod';
import { createFileRoute } from '@tanstack/react-router';
import LoginPage from '@central/pages/LoginPage';

const loginSearchSchema = z.object({
    redirect: z.string().optional(),
});

export const Route = createFileRoute('/login')({
    component: LoginPage,
    validateSearch: loginSearchSchema,
});
