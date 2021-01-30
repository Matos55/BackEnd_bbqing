<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRoullotesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('roullotes', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('address');
            $table->string('phone');
            $table->string('foto')->nullable();	
            $table->foreignId('user_id')->nullable()->references('id')->on('users')->onDelete('cascade');	
            $table->timestamps();
           
        });

        
        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('roullotes_id')->nullable()->references('id')->on('roullotes');	
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('roullotes');

        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['roullotes_id']);
        });
    }
}
