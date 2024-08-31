<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Traits\CommonTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    use CommonTrait;

    public function index()
    {
        $user = Auth::user();
        return $this->sendResponse($user);
    }

    public function allUsers()
    {
        $users = User::with('roles')->get();
        return $this->sendResponse($users);
    }

    public function store(Request $request)
    {
        // dd($request);
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Create the user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        if ($request->has('role_id')) {
            // Attach the role to the user
            $user->roles()->attach($request->role_id);
        }

        return $this->sendResponse(['message' => 'User has created', 'success' => true]);
    }
}
