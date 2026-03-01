import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { getProfile, updateProfile } from '@central/api/profile'
import { Button } from '@central/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@central/components/ui/form'
import { Input } from '@central/components/ui/input'
import { ContentSection } from '@central/pages/settings/components/content-section'

const profileSchema = z.object({
  name: z
    .string()
    .min(1, 'Please enter your name.')
    .min(2, 'Name must be at least 2 characters.')
    .max(255, 'Name must not be longer than 255 characters.'),
})

type ProfileFormValues = z.infer<typeof profileSchema>

export function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [currentEmail, setCurrentEmail] = useState<string>('')

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: '' },
  })

  useEffect(() => {
    getProfile()
      .then((user) => {
        form.reset({ name: user.name ?? '' })
        setCurrentEmail(user.email ?? '')
      })
      .catch(() => {})
  }, [form])

  async function onSubmit(data: ProfileFormValues) {
    if (!currentEmail) return
    setIsLoading(true)
    try {
      await updateProfile({ name: data.name, email: currentEmail })
      toast.success('Profile updated successfully.')
    } catch {
      toast.error('Failed to update profile. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ContentSection
      title="Profile"
      desc="Update your profile information."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your name"
                    data-testid="name-input"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading || !currentEmail} data-testid="profile-save-button">
            Save changes
          </Button>
        </form>
      </Form>
    </ContentSection>
  )
}
