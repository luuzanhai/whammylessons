<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Roadmap extends Model
{
    use HasFactory;

    protected $fillable = [
        'num',
        'label',
        'sublabel',
        'eng',
        'img',
        'alt',
        'weeks',
        'lessons',
        'desc',
        'tags',
        'order',
        'is_active',
    ];

    // Tự động chuyển đổi chuỗi JSON trong DB thành Array trong React và ngược lại
    protected $casts = [
        'tags' => 'array',
        'is_active' => 'boolean',
    ];
}
