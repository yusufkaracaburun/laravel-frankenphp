<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Tenant;
use Illuminate\Database\Seeder;

class TenantSeeder extends Seeder
{
    public function run(): void
    {
        foreach (['tenant1', 'tenant2'] as $id) {
            Tenant::factory()
            ->withId($id)
            ->withDomain("$id.test")
            ->create();
        }
    }
}

