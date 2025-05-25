<?php

namespace App\Http\Controllers;

use App\Models\Users;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function profile()
    {
        $user = Users::find(1);
        return view('user.profile', ['user' => $user]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'full_name' => 'required|string|max:255',
        ]);

        $user = Users::find(1);

        if (!$user) {
            return redirect()->back()->with('error', 'User not found.');
        }

        $user->name = $request->full_name   ;
        $user->save();

        return redirect()->back()->with('success', 'Profile updated successfully.');
    }

}
