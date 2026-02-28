<?php

declare(strict_types=1);

namespace App\Services;

use App\DTOs\UserData;
use App\Events\UserRegistered;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserService
{
    public function create(UserData $data): User
    {
        $attributes = [
            'name' => $data->name,
            'email' => $data->email,
        ];

        if ($data->password !== null) {
            $attributes['password'] = Hash::make($data->password);
        }

        $user = User::create($attributes);

        event(new UserRegistered($user));

        return $user;
    }

    public function update(User $user, UserData $data): User
    {
        $attributes = [
            'name' => $data->name,
            'email' => $data->email,
        ];

        if ($data->password !== null) {
            $attributes['password'] = Hash::make($data->password);
        }

        $user->update($attributes);

        return $user->fresh();
    }
}
