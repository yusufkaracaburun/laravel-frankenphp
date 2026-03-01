import type { router as tenantRouter } from './tenant/app';

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof tenantRouter;
    }
}