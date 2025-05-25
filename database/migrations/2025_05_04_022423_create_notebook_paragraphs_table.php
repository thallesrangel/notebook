<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('notebook_paragraphs', function (Blueprint $table) {
            $table->id();
            $table->integer('notebook_id')->unsigned();
            $table->text('content')->nullable();
            $table->text('corrected_content')->nullable();
            $table->text('feedback')->nullable();
            $table->string('CEFR')->nullable();
            $table->boolean('deleted')->default(0);
            $table->timestamps();
        });

        Schema::table('notebook_paragraphs', function ($table) {
            $table->foreign('notebook_id')->references('id')->on('notebooks')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notebook_paragraphs');
    }
};