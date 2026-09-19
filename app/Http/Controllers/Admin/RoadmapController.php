<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Roadmap;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class RoadmapController extends Controller
{
    // Hiển thị giao diện Admin
    public function index()
    {
        $roadmaps = Roadmap::orderBy('order', 'asc')->get();
        return Inertia::render('Admin/Roadmap', [
            'roadmaps' => $roadmaps
        ]);
    }

    // Xử lý lưu tất cả cùng lúc (Batch Save)
    public function batchSave(Request $request)
    {
        $request->validate([
            'roadmaps' => ['required', 'array'],
            'roadmaps.*.image_file' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp', 'max:5120'],
        ]);

        // 1. Lấy danh sách các ID được gửi lên
        $incomingIds = collect($request->roadmaps)->pluck('id')->filter();

        // 2. Xóa các Roadmap không còn tồn tại trong danh sách gửi lên
        Roadmap::whereNotIn('id', $incomingIds)->delete();

        // 3. Cập nhật hoặc Tạo mới từng phần tử
        foreach ($request->roadmaps as $index => $item) {

            // Xử lý biến chuỗi tags (cách nhau dấu phẩy) thành Mảng (Array)
            $tagsArray = array_map('trim', explode(',', $item['tags'] ?? ''));
            $tagsArray = array_filter($tagsArray); // Lọc bỏ phần tử rỗng

            $roadmap = !empty($item['id']) ? Roadmap::find($item['id']) : null;
            $imagePath = $item['img'] ?? '';

            if ($request->hasFile("roadmaps.{$index}.image_file")) {
                if ($roadmap && $roadmap->img && !filter_var($roadmap->img, FILTER_VALIDATE_URL)) {
                    Storage::disk('public')->delete($roadmap->img);
                }

                $imagePath = $request->file("roadmaps.{$index}.image_file")
                    ->store('roadmaps', 'public');
            }

            Roadmap::updateOrCreate(
                ['id' => $item['id'] ?? null],
                [
                    'num' => $item['num'] ?? 'I',
                    'label' => $item['label'] ?? '',
                    'sublabel' => $item['sublabel'] ?? '',
                    'eng' => $item['eng'] ?? '',
                    'img' => $imagePath,
                    'weeks' => $item['weeks'] ?? '',
                    'lessons' => $item['lessons'] ?? '',
                    'desc' => $item['desc'] ?? '',
                    'tags' => $tagsArray,
                    'order' => $index, // Tự động sắp xếp theo thứ tự hiển thị
                    'is_active' => $item['is_active'] ?? true,
                ]
            );
        }

        return back();
    }
}
