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
        Schema::create('banners', function (Blueprint $table) {
            $table->id();

            // Các trường dữ liệu dựa trên defaultSlides của anh
            $table->string('image_url')->nullable(); // Lưu tên file ảnh (vd: carousel-1.webp)
            $table->string('label')->nullable();     // vd: "01 / Khởi Đầu"
            $table->text('title')->nullable();       // Dùng text vì có chứa dấu xuống dòng \n
            $table->text('subtitle')->nullable();    // Dùng text cho nội dung mô tả dài / có xuống dòng
            $table->string('tag')->nullable();       // vd: "Nhập Môn Guitar"

            // (Tùy chọn thêm) Các trường hỗ trợ quản lý
            $table->integer('order')->default(0);    // Để sắp xếp thứ tự hiển thị slide
            $table->boolean('is_active')->default(true); // Bật/tắt slide tạm thời mà không cần xóa

            $table->timestamps(); // Tự động tạo created_at và updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('banners');
    }
};
