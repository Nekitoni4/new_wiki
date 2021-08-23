<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;
/** Промежуточная модель **/
class AtomArticle extends Pivot
{

    public $incrementing = true;

    public $table = 'atom_article';

    protected $fillable = [
      'atom_id',
      'article_id',
      'occurrences'
    ];
}
