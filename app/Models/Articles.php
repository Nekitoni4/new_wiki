<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/** Модель для статей - определяем связь с моделью Атомов(слов)**/
class Articles extends Model
{

    public $table = "article";

    protected $fillable = [
        'options->enabled',
        'title',
        'content',
        'count_words',
        'size',
        'url'
    ];

    public function atoms() {
        return $this->belongsToMany(Atoms::class, 'atom_article', 'article_id', 'atom_id')
            ->using(AtomArticle::class);
    }
}
