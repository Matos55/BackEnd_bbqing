<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRolesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Roles
        Schema::create('roles', function (Blueprint $table) {
            $table->bigIncrements('id');  // Matos:  Laravel 7+ way to write: $table->id();  
            $table->string('name'); // Matos: name of the role
            $table->string('label')->nullable(); // Matos: Custom Role label, sometimes is easier to understand this way
            $table->timestamps();
        });

        // Permissions === Abilities
        Schema::create('abilities', function (Blueprint $table) {
            $table->bigIncrements('id');  
            $table->string('name'); // Matos: Ex: edit_roulottes
            $table->string('label')->nullable();  // Matos: Ex: edit your roullotes
            $table->timestamps();
        });

        // Many-To-Many Auxiliar Pivot-Table ability_role.  ((single and alphabetic order))
        Schema::create('ability_role', function (Blueprint $table) {
            $table->primary(['role_id', 'ability_id']); // Set Primary Unique Keys. Matos: Another ex: $table->primary('role_id')->unique(); + $table->primary('ability_id')->unique();
            $table->unsignedBigInteger('role_id'); // foreign key (another way of writing)
            $table->unsignedBigInteger('ability_id'); // foreign key
            $table->timestamps();

            $table->foreign('role_id')->references('id')->on('roles')->onDelete('cascade'); // Matos: Cascade => if we delete a role, delete all the records as well in the pivottable.
            $table->foreign('ability_id')->references('id')->on('abilities')->onDelete('cascade');
        });

          // Many-To-Many Auxiliar Pivot-Table role_user.  ((single and alphabetic order))
          Schema::create('role_user', function (Blueprint $table) {
            $table->primary(['user_id', 'role_id']); 
            $table->unsignedBigInteger('user_id'); 
            $table->unsignedBigInteger('role_id');
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('role_id')->references('id')->on('roles')->onDelete('cascade'); 
            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('roles', 'abilities');
    }
}
