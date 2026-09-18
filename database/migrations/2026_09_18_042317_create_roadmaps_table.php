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
    Schema::create('roadmaps', function (Blueprint $table) {
        $table->id();
        $table->string('num', 10); // Số la mã: I, II, III
        $table->string('label'); // Tiêu đề tiếng Việt: Nhập Môn, Nâng Cao
        $table->string('sublabel'); // Phụ đề: Dành cho người mới...
        $table->string('eng'); // Tiêu đề tiếng Anh: Beginner, Advanced
        $table->string('img'); // Đường dẫn ảnh nền
        $table->string('alt')->nullable(); // Thẻ alt cho SEO
        $table->string('weeks'); // Thời lượng: 12 tuần
        $table->string('lessons'); // Số bài: 24 bài học
        $table->text('desc'); // Mô tả chi tiết
        $table->json('tags')->nullable(); // Lưu mảng tag: ["Nhạc Lý", "Hợp Âm Mở"]
        $table->integer('order')->default(0); // Dùng để sắp xếp vị trí hiển thị
        $table->boolean('is_active')->default(true); // Trạng thái Ẩn/Hiện
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('roadmaps');
    }
};
