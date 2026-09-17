<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Banner;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class BannerController extends Controller
{
    // 1. Gửi danh sách Banners ra trang React
    public function index()
    {
        // Lấy tất cả banner, xếp mới nhất lên đầu
        $banners = Banner::orderBy('created_at', 'desc')->get();
        return Inertia::render('Admin/Banner', [
            'banners' => $banners
        ]);
    }

    // 2. Thêm mới Banner (Giữ nguyên như cũ)
    public function store(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,webp|max:5120',
            'title' => 'required|string|max:255',
        ]);

        $path = $request->file('image')->store('banners', 'public');

        Banner::create([
            'image_url' => $path,
            'title' => $request->title,
            'subtitle' => $request->subtitle,
            'label' => $request->label,
            'tag' => $request->tag,
            'text_position' => $request->text_position ?? 'bottom-left',
            'is_active' => true,
        ]);

        return back();
    }

    public function update(Request $request, Banner $banner)
    {
        $request->validate([
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:5120',
            'title' => 'required|string|max:255',
            'text_position' => 'nullable|in:top-left,top-center,top-right,middle-left,middle-center,middle-right,bottom-left,bottom-center,bottom-right',
        ]);

        $banner->fill([
            'title' => $request->title,
            'subtitle' => $request->subtitle,
            'label' => $request->label,
            'tag' => $request->tag,
            'text_position' => $request->input('text_position', 'bottom-left'),
        ]);

        if ($request->hasFile('image')) {
            if ($banner->image_url && Storage::disk('public')->exists($banner->image_url)) {
                Storage::disk('public')->delete($banner->image_url);
            }

            $banner->image_url = $request->file('image')->store('banners', 'public');
        }

        $banner->save();

        return back();
    }

    // 3. Ẩn / Hiện Banner
    public function toggle(Banner $banner)
    {
        $banner->update(['is_active' => !$banner->is_active]);
        return back();
    }

    // 4. Xóa Banner
    public function destroy(Banner $banner)
    {
        // Xóa file ảnh vật lý trong ổ cứng để không rác server
        if ($banner->image_url && Storage::disk('public')->exists($banner->image_url)) {
            Storage::disk('public')->delete($banner->image_url);
        }

        $banner->delete();
        return back();
    }
}
