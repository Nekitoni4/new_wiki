<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAtomArticleTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('atom_article', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->unsignedBigInteger('atom_id');
            $table->unsignedBigInteger('article_id');
            $table->integer('occurrences');
            $table->foreign('atom_id')->references('id')->on('atom')->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreign('article_id')->references('id')->on('article')->cascadeOnUpdate()->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('atom_article');
    }
}
