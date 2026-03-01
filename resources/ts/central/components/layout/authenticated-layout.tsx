import { Outlet } from '@tanstack/react-router'
import { getCookie } from '@central/lib/cookies'
import { cn } from '@central/lib/utils'
import { AuthProvider } from '@central/contexts/AuthContext'
import { LayoutProvider } from '@central/contexts/layout-provider'
import { SearchProvider } from '@central/contexts/search-provider'
import { SidebarInset, SidebarProvider } from '@central/components/ui/sidebar'
import { AppSidebar } from '@central/components/layout/app-sidebar'
import { SkipToMain } from '@central/components/skip-to-main'

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
