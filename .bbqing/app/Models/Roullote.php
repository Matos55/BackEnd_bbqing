<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Roullote extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'address',
        'phone',
    ];

    public function user(){
        return $this->belongsTo(User::class, 'roullotes_id', 'id'); // Matos: the roullotes_id from User::class belongsTo id from Roullote::class
    }
}
