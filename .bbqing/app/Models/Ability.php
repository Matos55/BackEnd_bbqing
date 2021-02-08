<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ability extends Model
{
    use HasFactory;

    protected $guarded = [];

    // Each Ability has many roles
    public function roles() {
        return $this->belongsToMany(Role::class)->withTimestamps();
    }
}
