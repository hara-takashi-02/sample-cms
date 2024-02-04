<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AllController extends Controller

{
    /*------------------
    //サイト
    -------------------*/
    public function showsite() //サイト用
    {
        return view('site');
    }

    public function showAdmin() //
    {
        $auth_type = 1;
        return view('admin', compact('auth_type'));

        /*if (Auth::user()) {
            $auth_type = Auth::user()->type;
            return view('admin', compact('auth_type'));
        }
        return redirect('login');*/
    }
}
