import { Outlet } from '@tanstack/react-router'
import { getCookie } from '@tenant/lib/cookies'
import { cn } from '@tenant/lib/utils'
import { AuthProvider } from '@tenant/contexts/AuthContext'
import { LayoutProvider } from '@tenant/contexts/layout-provider'
import { SearchProvider } from '@tenant/contexts/search-provider'
import { SidebarInset, SidebarProvider } from '@tenant/components/ui/sidebar'
import { AppSidebar } from '@tenant/components/layout/app-sidebar'
import { SkipToMain } from '@tenant/components/skip-to-main'

type AuthenticatedLayoutProps = {
  children?: React.ReactNode
}

export function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  const defaultOpen = getCookie('sidebar_state') !== 'false'
  return (
    <AuthProvider>
    <SearchProvider>
      <LayoutProvider>
        <SidebarProvider defaultOpen={defaultOpen}>
          <SkipToMain />
          <AppSidebar />
          <SidebarInset
            className={cn(
              // Set content container, so we can use container queries
              '@container/content',

              // If layout is fixed, set the height
              // to 100svh to prevent overflow
              'has-data-[layout=fixed]:h-svh',

              // If layout is fixed and sidebar is inset,
              // set the height to 100svh - spacing (total margins) to prevent overflow
              'peer-data-[variant=inset]:has-data-[layout=fixed]:h-[calc(100svh-(var(--spacing)*4))]'
            )}
          >
            {children ?? <Outlet />}
          </SidebarInset>
        </SidebarProvider>
      </LayoutProvider>
    </SearchProvider>
    </AuthProvider>
  )
}
