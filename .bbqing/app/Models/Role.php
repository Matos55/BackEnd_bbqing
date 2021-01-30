<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\BelongsToManyRelationship;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Role extends Model
{
    use HasFactory;

    protected $guarded = [];

    // Each Role has many abilities
    public function abilities() {
        return $this->belongsToMany(Ability::class)->withTimestamps();
    }


    // Assign abilities to roles
    public function allowTo($ability) {

        if (is_string($ability)) {
            // Ability::whereName($ability)->firstOrCreate(['name' => $ability]);  // Matos: if we want to create a new Ability
            Ability::whereName($ability)->firstOrFail(); // either gives the correct role or throw error. Search inside colunm "name" for $ability
        }

        $this->abilities()->syncWithoutDetaching($ability);
    }
}
