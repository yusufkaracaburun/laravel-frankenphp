<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Tenant;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Artisan;

/**
 * @extends Factory<Tenant>
 */
class TenantFactory extends Factory
{
    protected $model = Tenant::class;

    /**
     * Define the tenant's default state (name is stored in data column).
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id' => fake()->company(),
        ];
    }

    /**
     * Create the tenant and attach a domain (e.g. for testing).
     */
    public function withDomain(string $domain): static
    {
        return $this->afterCreating(function (Tenant $tenant) use ($domain): void {
            $tenant->domains()->create(['domain' => $domain]);
        });
    }

    public function withId(string $id): static
    {
        return $this->state(function (array $attributes) use ($id): array {
            return ['id' => $id];
        });
    }
}
