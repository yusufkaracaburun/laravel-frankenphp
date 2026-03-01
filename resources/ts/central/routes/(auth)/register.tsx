import { createFileRoute } from '@tanstack/react-router'
import { Register } from '@central/pages/auth/register'

export const Route = createFileRoute('/(auth)/register')({
  component: Register,
})
