import { createFileRoute, redirect } from '@tanstack/react-router'
import { AuthenticatedLayout } from '@central/components/layout/authenticated-layout'
import { getProfile } from '@central/api/profile'

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
