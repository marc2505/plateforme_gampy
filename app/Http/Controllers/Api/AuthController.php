<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginAdminRequest;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function signup(SignupRequest $request) {
        $data = $request->validated();
        $name = $data['nom'].' '.$data['prenom'];
        $user = User::create([
            'name'=>$name,
            'pseudo'=>$data['pseudo'],
            'email'=>$data['email'],
            'password'=>$data['password'], 
            'role'=>$data['role'],
        ]);
        $token = $user->createToken('main')->plainTextToken;
        return response([
            'user'=>$user,
            'token'=>$token
        ]);
    }

    public function login(LoginRequest $request) {
        // dd($request);
        $credentials = $request->validated();
        // dd($credentials);
        if (!Auth::attempt($credentials)) {
            return response([
                'message' => 'email or password incorrect ...'
            ], 422);
        }
        /**@var User $user */
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;
        if ($request->from == 'devenirhote') {
            // return redirect('/annonces');
            return response()->json([
                'redirect_to' => '/annonce',
                'user' => $user,
                'token' => $token
            ]);
        } else if (strpos($request->from,'terrain') !== false) {
            
            $terrainId = str_replace('terrain','',$request->from);
            // dd($terrainId);
            return response()->json([
                'redirect_to' => "/terrain/$terrainId/login",
                'user' => $user,
                'token' => $token
            ]);
        }
        return response(compact('user', 'token'));
    }

    public function loginAdmin(LoginAdminRequest $request) {
        $credentials = $request->validated();
        $u = User::where('email',$credentials['email'])->get()->first();
        if ($u) {
            $role = $u->role;
            $credentials['role'] = $role;
        }
        if (!Auth::attempt(($credentials))) {
            return response([
                'message' => 'Email ou mot de passe incorrect ...'
            ], 422);
        }
        if (!isset($credentials['role']) || $credentials['role'] != 'admin') {
            return response([
                'message' => 'Vous n\'êtes pas autorisé à vous connecter ici ...'
            ], 404);
        }
        /**@var User $user */
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;
        $user = $user->only(['id','name','pseudo','email','role']);
        return response(compact('user', 'token'));
    }

    public function logout(Request $request) {
        /**@var User $user */
        $user = $request->user();
        // $user->currentAccessToken()->delete();
        $user->tokens()->where('id',$user->currentAccessToken()->id)->delete();
        return response('', 204);
    }
}
