<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use App\Traits\CommonTrait;
use Illuminate\Http\Request;

class RolePermissionController extends Controller
{
    use CommonTrait;

    public function index()
    {
        $rolePermissions = Role::with('permissions')->get();
        return $this->sendResponse($rolePermissions);
    }

    // Assign permission to role
    public function store(Request $request)
    {
        // dd($request);
        $validatedData = $request->validate([
            'role_id' => 'required|exists:roles,id',
            'permission_ids' => 'required|array',
            'permission_ids.*' => 'exists:permissions,id',
        ]);

        $role = Role::findOrFail($request->role_id);
        // dd($role);
        $role->permissions()->attach($validatedData['permission_ids']);

        return $this->sendResponse(['message' => 'Role Permissions added successfully']);
    }

    public function edit(Request $request, string $id)
    {
        // dd($id);
        $rolePermissions = Role::with('permissions')->findOrFail($id);
        return $this->sendResponse($rolePermissions);
    }

    public function update(Request $request, string $id)
    {
        // dd($request);
        $validatedData = $request->validate([
            'role_id' => 'required|exists:roles,id',
            'permission_ids' => 'required|array',
            'permission_ids.*' => 'exists:permissions,id',
        ]);

        $role = Role::findOrFail($id);
        // dd($role);
        $role->permissions()->sync($validatedData['permission_ids']);

        return $this->sendResponse(['message' => 'Role Permissions updated successfully']);

        return response()->json($role);
    }

    public function destroy(string $id) 
    {
        // dd($id);
        $role = Role::findOrFail($id);
        $role->permissions()->detach();
        return $this->sendResponse(['message' => 'Permissions has been deleted from the role']);
    }
}
