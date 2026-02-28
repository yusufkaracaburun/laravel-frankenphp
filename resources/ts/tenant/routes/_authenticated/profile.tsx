import { createFileRoute } from '@tanstack/react-router';
import ProfilePage from '@tenant/pages/ProfilePage';

export const Route = createFileRoute('/_authenticated/profile')({
    component: ProfilePage,
});
