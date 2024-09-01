<?php

namespace App\Http\Controllers;

use App\Models\Role;
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
        $user = Auth::user()->load('roles.permissions');
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

    public function edit(Request $request, string $id)
    {
        // dd($id);
        $user = User::with('roles')->findOrFail($id);
        return $this->sendResponse($user);
    }

    public function update(Request $request, string $id)
    {
        // dd($request);
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $id,
            'password' => 'nullable|string|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Find the user
        $user = User::findOrFail($id);

        // dd($user);
        // Update user details
        $user->name = $request->name;
        $user->email = $request->email;

        // Only update the password if it's provided
        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
        }

        $user->save();

        // Update the role if role_id is provided
        if ($request->has('role_id')) {
            $user->roles()->sync([$request->role_id]);
        }

        return $this->sendResponse(['message' => 'User has been updated', 'success' => true]);
    }

    public function destroy(string $id)
    {
        // dd($id);
        $user = User::findOrFail($id);
        $user->roles()->detach();
        $user->delete();
        return $this->sendResponse(['message' => 'User has been deleted successfully']);
    }

}
