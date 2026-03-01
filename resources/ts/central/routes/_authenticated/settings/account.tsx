import { createFileRoute } from '@tanstack/react-router'
import { SettingsAccount } from '@central/pages/settings/account'

export const Route = createFileRoute('/_authenticated/settings/account')({
  component: SettingsAccount,
})
