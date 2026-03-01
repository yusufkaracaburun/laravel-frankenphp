import { createFileRoute } from '@tanstack/react-router'
import { Dashboard } from '@tenant/pages/dashboard'

export const Route = createFileRoute('/_authenticated/')({
  component: Dashboard,
})
