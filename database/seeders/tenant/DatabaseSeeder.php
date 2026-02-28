<?php

namespace Database\Seeders\Tenant;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the tenant database.
     */
    public function run(): void
    {
        $this->call([RoleSeeder::class, UserSeeder::class]);
    }
}
