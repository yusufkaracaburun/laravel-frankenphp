import api from '../lib/axios';

export interface Profile {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string | null;
  created_at?: string;
  updated_at?: string;
}

export async function getProfile(): Promise<Profile> {
  const { data } = await api.get<Profile>('/v1/user');
  return data;
}

export async function updateProfile(profileData: {
  name?: string;
  email?: string;
}): Promise<Profile> {
  const { data } = await api.put<{ user: Profile }>(
    '/user/profile-information',
    profileData
  );
  return data.user;
}
