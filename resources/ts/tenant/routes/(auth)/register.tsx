import { createFileRoute } from '@tanstack/react-router'
import { Register } from '@tenant/pages/auth/register'

export const Route = createFileRoute('/(auth)/register')({
  component: Register,
})
