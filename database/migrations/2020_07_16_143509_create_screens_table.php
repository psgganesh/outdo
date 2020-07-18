<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateScreensTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('screens', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('path')->nullable();
            $table->string('size', 255)->nullable();
            $table->string('name', 255)->nullable();
            $table->integer('width')->nullable();
            $table->integer('height')->nullable();
            $table->string('type', 255)->nullable();
            $table->json('additional_data', 255)->nullable()->comment('JSON hotspots of the image');
            $table->bigInteger('workflow_id')->nullable();
            $table->unsignedInteger('user_id')->nullable();
            $table->string('created_by')->nullable()->comment('Username / email id of the user who created this record');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('screens');
    }
}
