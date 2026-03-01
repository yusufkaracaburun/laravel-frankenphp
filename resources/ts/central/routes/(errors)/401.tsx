import { createFileRoute } from '@tanstack/react-router'
import { UnauthorisedError } from '@central/pages/errors/unauthorized-error'

export const Route = createFileRoute('/(errors)/401')({
  component: UnauthorisedError,
})
