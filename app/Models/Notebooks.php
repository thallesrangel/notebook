<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Notebooks extends Model
{
    public $timestamps = true;
    protected $connection = 'mysql';
    protected $table = 'notebooks';
}