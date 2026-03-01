import { createFileRoute } from '@tanstack/react-router'
import { Settings } from '@tenant/pages/settings'

export const Route = createFileRoute('/_authenticated/settings')({
  component: Settings,
})
