<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NotebookParagraphs extends Model
{
    public $timestamps = true;
    protected $connection = 'mysql';
    protected $table = 'notebook_paragraphs';
    protected $with = ['notebook'];

    public function notebook()
    {
        return $this->belongsTo(Notebooks::class, 'notebook_id', 'id');
    }
}

