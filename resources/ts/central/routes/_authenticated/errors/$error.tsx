import { createFileRoute } from '@tanstack/react-router'
import { ConfigDrawer } from '@central/components/config-drawer'
import { Header } from '@central/components/layout/header'
import { ProfileDropdown } from '@central/components/profile-dropdown'
import { Search } from '@central/components/search'
import { ThemeSwitch } from '@central/components/theme-switch'
import { ForbiddenError } from '@central/pages/errors/forbidden'
import { GeneralError } from '@central/pages/errors/general-error'
import { MaintenanceError } from '@central/pages/errors/maintenance-error'
import { NotFoundError } from '@central/pages/errors/not-found-error'
import { UnauthorisedError } from '@central/pages/errors/unauthorized-error'

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
