<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Traits\CommonTrait;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    use CommonTrait;

    public function index()
    {
        $roles = Role::all();
        return $this->sendResponse($roles);
    }
}
