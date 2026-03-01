import { createFileRoute } from '@tanstack/react-router'
import { Chats } from '@central/pages/chats'

export const Route = createFileRoute('/_authenticated/chats/')({
  component: Chats,
})
