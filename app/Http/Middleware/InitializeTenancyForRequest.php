<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Stancl\Tenancy\Resolvers\DomainTenantResolver;
use Stancl\Tenancy\Tenancy;
use Symfony\Component\HttpFoundation\Response;

class InitializeTenancyForRequest
{
    public function __construct(
        protected Tenancy $tenancy,
        protected DomainTenantResolver $resolver
    ) {}

    public function handle(Request $request, Closure $next): Response
    {
        $host = $request->getHost();

        if (in_array($host, config('tenancy.central_domains', []), true)) {
            return $next($request);
        }

        if ($this->tenancy->initialized) {
            return $next($request);
        }

        try {
            $tenant = $this->resolver->resolve($host);
            if ($tenant) {
                $this->tenancy->initialize($tenant);
            }
        } catch (\Throwable) {
            // Not a tenant domain, continue without tenancy
        }

        return $next($request);
    }
}
