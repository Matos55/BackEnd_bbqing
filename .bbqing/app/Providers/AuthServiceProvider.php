<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use app\Models\User;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        // Matos: run this before any authorization
        // If Admin, it's ok, return. 
        Gate::before(function (User $user) {
            if ($user->is_admin()) {
                return true;
            }
           });

        // Otherwise, does this user has the ability to edit_roullotes ?
        Gate::before(function ($user, $ability) {
         if ($user->abilities()->contains($ability)) {
             return true;
         }
        });


        //
    }
}
