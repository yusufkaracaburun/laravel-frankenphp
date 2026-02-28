import { createFileRoute } from '@tanstack/react-router';
import RegisterPage from '@central/pages/RegisterPage';

export const Route = createFileRoute('/register')({
    component: RegisterPage,
});
