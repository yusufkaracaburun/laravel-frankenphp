<?php

use Illuminate\Support\Facades\Route;

require __DIR__.'/socialite.php';

// Central SPA catch-all: only for central domains (tenant routes handle tenant domains)
$centralDomains = config('tenancy.central_domains', ['localhost', '127.0.0.1']);
foreach ($centralDomains as $domain) {
    Route::domain($domain)->get('/{any?}', function () {
        return view('app');
    })->where('any', '.*');
}
