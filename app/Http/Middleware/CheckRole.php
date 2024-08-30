<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string  $role
     * @return mixed
     */
    public function handle(Request $request, Closure $next, $role)
    {
        $user = Auth::user();

        // Check if the authenticated user has the required role
        if ($user && $user->roles()->where('name', $role)->exists()) {
            return $next($request);
        }

        // If the user does not have the required role, return a 403 Forbidden response
        return response()->json(['error' => 'Forbidden'], 403);
    }
}
