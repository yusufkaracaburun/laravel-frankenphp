<?php

declare(strict_types=1);

namespace Database\Seeders\Tenant;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Tenant Admin',
            'email' => 'tenant@test.com',
            'password' => Hash::make('test123'),
        ])->assignRole('admin');
    }
}
