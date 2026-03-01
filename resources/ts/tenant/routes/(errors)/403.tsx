import { createFileRoute } from '@tanstack/react-router'
import { ForbiddenError } from '@tenant/pages/errors/forbidden'

export const Route = createFileRoute('/(errors)/403')({
  component: ForbiddenError,
})
