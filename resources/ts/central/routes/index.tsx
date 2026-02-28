import { createFileRoute } from '@tanstack/react-router';
import HomePage from '@central/pages/HomePage';

export const Route = createFileRoute('/')({
    component: HomePage,
});
