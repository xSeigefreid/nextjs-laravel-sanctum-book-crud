<?php
   
namespace App\Http\Controllers\API;
   
use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Author;
use Validator;
use App\Http\Resources\Author as AuthorResource;
   
class AuthorController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $author = Author::all();
    
        return $this->sendResponse(AuthorResource::collection($author), 'Authors retrieved successfully.');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $input = $request->all();
   
        $validator = Validator::make($input, [
            'fname' => 'required',
            'lname' => 'required',
            'description' => 'required'
        ]);
   
        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());       
        }
   
        $author = Author::create($input);
   
        return $this->sendResponse(new AuthorResource($author), 'Author added successfully.');
    } 
   
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $author = Author::find($id);
  
        if (is_null($author)) {
            return $this->sendError('Author not found.');
        }
   
        return $this->sendResponse(new AuthorResource($author), 'Author retrieved successfully.');
    }
    
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Author $author)
    {
        $input = $request->all();
   
        $validator = Validator::make($input, [
            'fname' => 'required',
            'lname' => 'required',
            'description' => 'required'
        ]);
   
        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());       
        }
   
        $author->fname = $input['fname'];
        $author->lname = $input['lname'];
        $author->description = $input['description'];
        $author->save();
   
        return $this->sendResponse(new AuthorResource($author), 'Author updated successfully.');
    }
   
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Author $author)
    {
        $author->delete();
   
        return $this->sendResponse([], 'Author deleted successfully.');
    }
}