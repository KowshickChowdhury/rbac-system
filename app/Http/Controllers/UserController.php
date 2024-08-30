<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Traits\CommonTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
}
