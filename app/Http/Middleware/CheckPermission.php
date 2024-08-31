<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckPermission
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle($request, Closure $next, $permission)
    {
        $user = Auth::user();

        // Check if any of the user's roles have the specified permission
        if ($user->roles()->whereHas('permissions', function ($query) use ($permission) {
            $query->where('name', $permission);
        })->exists()) {
            return $next($request);
        }

        // If the user doesn't have the required permission, return a 403 Forbidden response
        return response()->json(['message' => 'Forbidden'], 403);
    }
}
