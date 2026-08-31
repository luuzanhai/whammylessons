// File: app/Http/Controllers/UserController.php

namespace App\Http\Controllers;

use App\Models\User; // Nạp Model User
use Inertia\Inertia; // Nạp thư viện Inertia

class UserController extends Controller
{
    public function index()
    {
        // 1. Lấy danh sách users từ Database
        $users = User::all(); // Lấy tất cả user

        // 2. Trả về component React có tên là 'Users/Index' 
        // và gửi kèm biến $users dưới tên gọi là 'users'
        return Inertia::render('Users/Index', [
            'users' => $users
        ]);
    }
}