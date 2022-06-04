<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTopicQuizRecordsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('topic_quiz_records', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id')->nullable();
            $table->integer('topic_id')->nullable();
            $table->string('score')->nullable();
            $table->string('grade')->nullable();
            $table->string('total_questions')->nullable();
            $table->string('type')->nullable();
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
        Schema::dropIfExists('topic_quiz_records');
    }
}
