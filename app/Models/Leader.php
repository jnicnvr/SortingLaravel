<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Leader extends Model
{
    use HasFactory;

    protected $fillable = [
        'fname',
        'mname',
        'lname',
        'suffix',
        'contact_no',
        'precinct_no',
        'address',
    ];
}
