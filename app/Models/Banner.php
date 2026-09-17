<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Banner extends Model
{
    use HasFactory;

    // Cho phép thêm/sửa dữ liệu hàng loạt vào các cột này
    protected $fillable = [
        'image_url',
        'label',
        'title',
        'subtitle',
        'tag',
        'text_position',
        'order',
        'is_active'
    ];
}
