<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function roles() {
        return $this->belongsToMany(Role::class)->withTimestamps();
    }

    public function assignRole($role) {

        if (is_string($role)) {
            // Role::whereName($role)->firstOrCreate(['name' => $role]);  // Matos: if we want to create a new Role
            Role::whereName($role)->firstOrFail(); // either gives the correct role or throw error
        }

        // $this->roles()->save($role); // Matos: this will add and save the data. But,  if we had already the data, it will give an err
        // $this->roles()->sync($role); // Matos: this will erase all data in the table and replace with this one.
        $this->roles()->syncWithoutDetaching($role); // Matos: this will just add data without erasing existing data from the table.
    }

    public function abilities() {
        return $this->roles->map->abilities->flatten()->pluck('name')->unique();
    }

    public function is_admin() {
        if ($this->roles->flatten()->pluck('name')->unique()->contains('admin')) {
            return true;
        }
    }

    public function roullotes() {
        return $this->hasMany(Roullote::class);
    }
}
