import { createFileRoute } from '@tanstack/react-router'
import { ForgotPassword } from '@tenant/pages/auth/forgot-password'

export const Route = createFileRoute('/(auth)/forgot-password')({
  component: ForgotPassword,
})
