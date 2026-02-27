import api from '../lib/axios';

export async function getProfile() {
    const { data } = await api.get('/v1/user');
    return data;
}

export async function updateProfile(profileData) {
    const { data } = await api.put('/user/profile-information', profileData);
    return data.user;
}
