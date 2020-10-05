<?php
   
namespace App\Http\Controllers\API;
   
use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use App\User;
use Illuminate\Support\Facades\Auth;
use Validator;
   
class RegisterController extends BaseController {
    /**
     * Register api
     *
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request) {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
            'c_password' => 'required|same:password',
        ]);
   
        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());       
        }
   
        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $user = User::create($input);
        $data['token'] =  $user->createToken('user-token')->plainTextToken;
        $data['name'] =  $user->name;
        $data['email'] =  $user->email;
   
        return $this->sendResponse($data, 'User register successfully.');
    }
   
    /**
     * Login api
     *
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request) {
        if(Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = Auth::user();
            $data['token'] =  $user->createToken('user-token')->plainTextToken;
            $data['name'] =  $user->name;
            $data['email'] =  $user->email;
   
            return $this->sendResponse($data, 'User login successfully.');
        } 
        else {
            return $this->sendError('Unauthorised.', ['error'=>'Unauthorised']);
        } 
    }

    public function logout() {
        // $user = Auth::user();
        // $user->tokens()->delete();
        $data['status'] = "Success";

        return $this->sendResponse($data, 'User Logout successfully.');
        // if(Auth::attempt(['email' => $request->email])) {
        // } 
    }
}