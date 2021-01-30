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

        Gate::resource('roullotes', 'App\Policies\RoullotePolicy');


        /*
        // MATOS EXAMPLES:

        Gate::define('create-post', function ($user) {
            return $user->id == 1;
        });

        In the above example, we’re allowing only the user id 1 to have the authority to create a post. Other than that, nobody will have the authorization to add a new post to your website.

        Gate::allows('create-post');

        That will return a boolean value denoting if the user is allowed or rejected. Simple, right? Do you see that $user variable in the closure’s first param? It’s passed to all the defined gates and policies by default. It’s the currently logged-in user.
        //
        */
    }
}
