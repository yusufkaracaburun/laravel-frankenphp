<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AppController;

require __DIR__.'/socialite.php';

// Central SPA catch-all: only for central domains (tenant routes handle tenant domains)
$centralDomains = config('tenancy.central_domains', ['central.test', '127.0.0.1']);
foreach ($centralDomains as $domain) {
    Route::domain($domain)->get('/{any?}', [AppController::class, 'central'])
    ->where('any', '.*')
    ->name("{$domain}.central");
}
