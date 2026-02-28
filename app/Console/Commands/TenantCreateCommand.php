<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Models\Tenant;
use Illuminate\Console\Command;

class TenantCreateCommand extends Command
{
    protected $signature = 'tenants:create
                            {domain : The domain for the tenant (e.g. acme.localhost)}
                            {--name= : Optional tenant name for display}';

    protected $description = 'Create a new tenant with a domain';

    public function handle(): int
    {
        $domain = $this->argument('domain');
        $name = $this->option('name') ?? $domain;

        if (Tenant::query()->whereHas('domains', fn ($q) => $q->where('domain', $domain))->exists()) {
            $this->error("A tenant with domain '{$domain}' already exists.");

            return self::FAILURE;
        }

        $tenant = Tenant::create([
            'name' => $name,
        ]);

        $tenant->domains()->create(['domain' => $domain]);

        $this->info("Tenant created: {$tenant->id}");
        $this->info("Domain: {$domain}");
        $this->newLine();
        $this->comment('Add to /etc/hosts for local testing:');
        $this->line("  127.0.0.1 {$domain}");

        return self::SUCCESS;
    }
}
