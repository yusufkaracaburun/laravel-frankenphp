import { createFileRoute } from '@tanstack/react-router'
import { ConfigDrawer } from '@tenant/components/config-drawer'
import { Header } from '@tenant/components/layout/header'
import { ProfileDropdown } from '@tenant/components/profile-dropdown'
import { Search } from '@tenant/components/search'
import { ThemeSwitch } from '@tenant/components/theme-switch'
import { ForbiddenError } from '@tenant/pages/errors/forbidden'
import { GeneralError } from '@tenant/pages/errors/general-error'
import { MaintenanceError } from '@tenant/pages/errors/maintenance-error'
import { NotFoundError } from '@tenant/pages/errors/not-found-error'
import { UnauthorisedError } from '@tenant/pages/errors/unauthorized-error'

export const Route = createFileRoute('/_authenticated/errors/$error')({
  component: RouteComponent,
})

// eslint-disable-next-line react-refresh/only-export-components
function RouteComponent() {
  const { error } = Route.useParams()

  const errorMap: Record<string, React.ComponentType> = {
    unauthorized: UnauthorisedError,
    forbidden: ForbiddenError,
    'not-found': NotFoundError,
    'internal-server-error': GeneralError,
    'maintenance-error': MaintenanceError,
  }
  const ErrorComponent = errorMap[error] || NotFoundError

  return (
    <>
      <Header fixed className='border-b'>
        <Search />
        <div className='ms-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>
      <div className='flex-1 [&>div]:h-full'>
        <ErrorComponent />
      </div>
    </>
  )
}
