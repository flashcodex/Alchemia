<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTopicQuizzesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('topic_quizzes', function (Blueprint $table) {
            $table->id();
            $table->integer('admin_create_id')->nullable();
            $table->integer('admin_update_id')->nullable();
            $table->string('type')->nullable();
            $table->integer('topic_id')->nullable();
            $table->string('question')->nullable();
            $table->string('choices')->nullable();
            $table->string('answer')->nullable();
            $table->string('img')->nullable();
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
        Schema::dropIfExists('topic_quizzes');
    }
}
