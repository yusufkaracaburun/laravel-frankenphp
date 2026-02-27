import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { updateProfile } from '../api/profile';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
});

type ProfileFormValues = z.infer<typeof schema>;

export default function ProfilePage() {
  const { user, setUser, refetchUser } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(schema),
    values: {
      name: user?.name ?? '',
      email: user?.email ?? '',
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    setSubmitting(true);
    try {
      const updated = await updateProfile(data);
      setUser(updated);
      await refetchUser();
      toast.success('Profile updated successfully');
    } catch (err: unknown) {
      const res = (
        err as {
          response?: {
            status?: number;
            data?: { errors?: Record<string, string[]>; message?: string };
          };
        }
      )?.response;
      if (res?.status === 422 && res?.data?.errors) {
        Object.entries(res.data.errors).forEach(([field, messages]) => {
          form.setError(field as keyof ProfileFormValues, {
            message: messages[0],
          });
        });
      } else {
        toast.error(res?.data?.message || 'Update failed');
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Update your account information</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <FormControl>
                      <Input
                        id="name"
                        type="text"
                        autoComplete="name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        autoComplete="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={submitting} className="w-full">
                {submitting ? 'Saving...' : 'Save changes'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
