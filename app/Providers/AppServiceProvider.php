<?php

namespace App\Providers;

use App\Events\UserRegistered;
use App\Listeners\SendWelcomeNotification;
use App\Models\User;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        JsonResource::withoutWrapping();

        Event::listen(UserRegistered::class, SendWelcomeNotification::class);

        Gate::define('viewLogViewer', function (?User $user): bool {
            if (! $user) {
                return false;
            }

            if (app()->environment('local')) {
                return true;
            }

            return $user->hasRole('admin') || $user->can('view log viewer');
        });
    }
}
