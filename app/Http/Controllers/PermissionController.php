<?php

namespace App\Http\Controllers;

use App\Models\Permission;
use App\Traits\CommonTrait;
use Illuminate\Http\Request;

class PermissionController extends Controller
{
    use CommonTrait;

    public function index()
    {
        $permissions = Permission::all();
        return $this->sendResponse($permissions);
    }
}
