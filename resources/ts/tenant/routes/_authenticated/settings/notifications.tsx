import { createFileRoute } from '@tanstack/react-router'
import { SettingsNotifications } from '@tenant/pages/settings/notifications'

export const Route = createFileRoute('/_authenticated/settings/notifications')({
  component: SettingsNotifications,
})
