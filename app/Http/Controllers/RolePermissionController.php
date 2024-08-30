<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;

class RolePermissionController extends Controller
{
    public function assignRole(Request $request, $userId)
    {
        $validatedData = $request->validate([
            'role_id' => 'required|exists:roles,id',
        ]);

        $user = User::findOrFail($userId);
        $role = Role::findOrFail($validatedData['role_id']);

        $user->roles()->syncWithoutDetaching([$role->id]);

        return response()->json($user);
    }

    // Assign permission to role
    public function assignPermissionToRole(Request $request, $roleId)
    {
        $validatedData = $request->validate([
            'permission_id' => 'required|exists:permissions,id',
        ]);

        $role = Role::findOrFail($roleId);
        $role->permissions()->attach($validatedData['permission_id']);

        return response()->json($role);
    }

}
