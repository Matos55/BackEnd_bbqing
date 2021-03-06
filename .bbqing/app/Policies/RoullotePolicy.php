<?php

namespace App\Policies;

use App\Models\Roullote;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class RoullotePolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function viewAny(User $user)
    {
        //
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Roullote  $roullote
     * @return mixed
     */
    public function view(User $user, Roullote $roullote)
    {
        // return TRUE;
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        // return $user->id > 0;
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Roullote  $roullote
     * @return mixed
     */
    public function update(User $user, Roullote $roullote)
    {
        // foreach($user->abilities() as $abilities) {

        //     if ($abilities->contains('edit_roullotes')) {
        //         return true;
        //     }
        // }

        // return false;

        return $user->id === $roullote->user_id;
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Roullote  $roullote
     * @return mixed
     */
    public function delete(User $user, Roullote $roullote)
    {
        // return $user->id === $roullote->user_id;
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Roullote  $roullote
     * @return mixed
     */
    public function restore(User $user, Roullote $roullote)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Roullote  $roullote
     * @return mixed
     */
    public function forceDelete(User $user, Roullote $roullote)
    {
        //
    }
}
