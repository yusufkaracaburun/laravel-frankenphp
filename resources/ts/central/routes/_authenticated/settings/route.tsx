import { createFileRoute } from '@tanstack/react-router'
import { Settings } from '@central/pages/settings'

export const Route = createFileRoute('/_authenticated/settings')({
  component: Settings,
})
