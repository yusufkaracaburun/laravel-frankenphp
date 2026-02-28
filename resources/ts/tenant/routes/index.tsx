import { createFileRoute } from '@tanstack/react-router';
import HomePage from '@tenant/pages/HomePage';

export const Route = createFileRoute('/')({
    component: HomePage,
});
