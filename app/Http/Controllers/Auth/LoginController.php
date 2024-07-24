<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Illuminate\Support\Str;

class LoginController extends Controller
{
    public function index()
    {
        return Inertia::render('Auth/Login');
    }

    public function store(Request $request){
        
        $request->validate([
            'email' => 'required',
            'password' => 'required'
        ]);

        $credentials = $request->only('email','password');

        if(Auth::attempt($credentials)){
            $request->session()->regenerate();
            $token = Str::random(40);
            Session::setId($token);
            Session::start();
            return redirect()->route('dashboard',['tab_token' => $token]);
        }

        return back()->withErrors([
            'errors' => 'The Provided credentials do not match our records.'
        ]);
    }


    public function destroy(){
        auth()->logout();

        return redirect('/login');
    }
}
