<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $adminRole = Role::create(['name' => 'Admin']);
        $managerRole = Role::create(['name' => 'Manager']);
        $userRole = Role::create(['name' => 'User']);

        $permissions = ['create-users', 'edit-users', 'delete-users', 'view-users'];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        $adminRole->permissions()->attach(Permission::all());
        $managerRole->permissions()->attach(Permission::where('name', '!=', 'delete-users')->get());
        $userRole->permissions()->attach(Permission::where('name', 'view-users')->get());
    }
}
