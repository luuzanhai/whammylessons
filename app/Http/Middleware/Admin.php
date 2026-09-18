<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class Admin
{
    public function handle(Request $request, Closure $next): Response
    {
        if ((int) $request->user()?->role !== 1) {
            return redirect('/home');
        }

        return $next($request);
    }
}
