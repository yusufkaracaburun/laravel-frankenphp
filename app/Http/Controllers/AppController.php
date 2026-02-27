<?php

namespace App\Http\Controllers;

use App\Models\User;

class AppController extends Controller
{
    public function central()
    {
        return view('central');
    }

    public function tenant()
    {
        return 'This is your multi-tenant application. The name of the current tenant is '.tenant('id');
        // return view('tenant');
    }
}
