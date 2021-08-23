<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/** Модель атомов и определение обратной связи с моделью Статей**/
class Atoms extends Model
{

    public $table = 'atom';

    public $fillable = ['title'];

    public function articles() {
        return $this->belongsToMany(Articles::class, 'atom_article', 'atom_id', 'article_id')
            ->using(AtomArticle::class)->withPivot('occurrences');
    }
}
