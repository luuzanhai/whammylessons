<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\BannerController;
use App\Models\Banner;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Trang Landing Page (Mặc định)
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'banners' => Banner::query()
            ->where('is_active', true)
            ->orderBy('order')
            ->get(),
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// ==========================================
// CÁC ROUTE MỚI CHO DASHBOARD
// ==========================================
Route::get('/home', function () {
    return Inertia::render('Welcome', [
        'banners' => Banner::query()
            ->where('is_active', true)
            ->orderBy('order')
            ->get(),
    ]);
})->name('home');

Route::get('/classes', function () {
    return Inertia::render('Classes');
})->name('classes');

Route::get('/alerts', function () {
    return Inertia::render('Alerts');
})->name('alerts');

Route::get('/settings', function () {
    return Inertia::render('Settings');
})->name('settings');
// ==========================================


// Khu vực bảo mật (Chỉ khi đăng nhập mới vào được)
Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    // Các Route quản lý Banner
    Route::get('/admin/banners', [BannerController::class, 'index'])->name('admin.banners');
    Route::post('/admin/banners', [BannerController::class, 'store']);
    Route::put('/admin/banners/{banner}', [BannerController::class, 'update']);
    Route::put('/admin/banners/{banner}/toggle', [BannerController::class, 'toggle']);
    Route::delete('/admin/banners/{banner}', [BannerController::class, 'destroy']);

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

});

require __DIR__.'/auth.php';
