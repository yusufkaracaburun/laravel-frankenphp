import type { router as centralRouter } from './central/app';

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof centralRouter;
    }
}