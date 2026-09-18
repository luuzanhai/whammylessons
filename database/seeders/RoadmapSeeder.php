<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Roadmap;

class RoadmapSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Danh sách 3 cấp độ học lấy từ file React cũ
        $levels = [
            [
                'num' => 'I',
                'label' => 'Nhập Môn',
                'sublabel' => 'Dành cho người mới, từ con số 0',
                'eng' => 'Beginner',
                'img' => 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&h=560&fit=crop&auto=format',
                'alt' => 'Bàn tay chơi guitar acoustic',
                'weeks' => '12 tuần',
                'lessons' => '24 bài học',
                'desc' => 'Nhạc lý căn bản, tư thế, hợp âm mở, bài dân ca đơn giản. Từ chưa biết gì đến tự đệm hát được.',
                'tags' => ["Nhạc Lý", "Hợp Âm Mở", "Picking"],
                'order' => 1,
                'is_active' => true,
            ],
            [
                'num' => 'II',
                'label' => 'Nâng Cao',
                'sublabel' => 'Dành cho người đã biết chơi cơ bản',
                'eng' => 'Advanced',
                'img' => 'https://images.unsplash.com/photo-1501962679900-bea61483313b?w=800&h=560&fit=crop&auto=format',
                'alt' => 'Guitarist biểu diễn trên sân khấu',
                'weeks' => '16 tuần',
                'lessons' => '32 bài học',
                'desc' => 'Hợp âm nâng cao, fingerpicking, capo, chuyển điệu. Chơi được nhạc trữ tình, bolero, nhạc vàng.',
                'tags' => ["Fingerpicking", "Capo", "Bolero"],
                'order' => 2,
                'is_active' => true,
            ],
            [
                'num' => 'III',
                'label' => 'Chuyên Nghiệp',
                'sublabel' => 'Dành cho biểu diễn chuyên nghiệp',
                'eng' => 'Profi',
                'img' => 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&h=560&fit=crop&auto=format',
                'alt' => 'Phòng thu âm chuyên nghiệp',
                'weeks' => '20 tuần',
                'lessons' => '40 bài học',
                'desc' => 'Hoà âm phối khí, solo, ứng tấu, thu âm, và kỹ thuật biểu diễn sân khấu chuyên nghiệp.',
                'tags' => ["Solo", "Hoà Âm", "Thu Âm"],
                'order' => 3,
                'is_active' => true,
            ],
        ];

        // Lặp qua mảng và lưu từng cái vào Database
        foreach ($levels as $level) {
            Roadmap::create($level);
        }
    }
}
