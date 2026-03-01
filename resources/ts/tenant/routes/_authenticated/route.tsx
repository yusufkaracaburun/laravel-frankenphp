import { createFileRoute, redirect } from '@tanstack/react-router'
import { AuthenticatedLayout } from '@tenant/components/layout/authenticated-layout'
import { getProfile } from '@tenant/api/profile'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async () => {
    try {
      await getProfile()
    } catch {
      throw redirect({ to: '/login' })
    }
  },
  component: AuthenticatedLayout,
})
