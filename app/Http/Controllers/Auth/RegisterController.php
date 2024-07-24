<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
// use Illuminate\Support\Facades\Validator;

class RegisterController extends Controller
{
    public function index(){
        return Inertia::render("Auth/Register");
    }

    public function store(Request $request){

        
        
        $validator = Validator::make($request->all(),[
            'name' => 'required',
            'email' => 'required|unique:users',
            'password' => 'required|confirmed'
        ]);

        
        if($validator->fails()){
            
            return redirect()->back()->withErrors($validator);
        }

        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = $request->password;
        $user->save();

        return redirect('/login')->with('status','Register Behasil');
    }
}
