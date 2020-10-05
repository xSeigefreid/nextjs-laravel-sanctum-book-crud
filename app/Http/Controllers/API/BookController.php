<?php
   
namespace App\Http\Controllers\API;
   
use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Book;
use Validator;
use App\Http\Resources\Book as BookResource;
use Illuminate\Support\Facades\DB;
   
class BookController extends BaseController
{
    /**
     * Display a listing of the resource.
     *f
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // $book = Book::all();

        $book = DB::table('books')
            ->leftjoin('authors', 'books.author_id', '=', 'authors.id')
            ->select('books.*', 'authors.fname', 'authors.lname')
            ->get()
            ->toArray();

        return $this->sendResponse(BookResource::collection($book), 'Books retrieved successfully.');
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
            'author_id' => 'required|numeric',
            'title' => 'required',
            'isbn' => 'required',
            'publisher' => 'required'
        ]);
   
        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());       
        }
   
        $book = Book::create($input);
   
        return $this->sendResponse(new BookResource($book), 'Book added successfully.');
    } 
   
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $book = Book::find($id);
  
        if (is_null($book)) {
            return $this->sendError('Book not found.');
        }
   
        return $this->sendResponse(new BookResource($book), 'Book retrieved successfully.');
    }
    
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Book $book)
    {
        $input = $request->all();
   
        $validator = Validator::make($input, [
            'author_id' => 'required|numeric',
            'title' => 'required',
            'isbn' => 'required',
            'publisher' => 'required'
        ]);
   
        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());       
        }
   
        $book->author_id = $input['author_id'];
        $book->title = $input['title'];
        $book->isbn = $input['isbn'];
        $book->publisher = $input['publisher'];
        $book->save();

        return $this->sendResponse(new BookResource($book), 'Book updated successfully.');
    }
   
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Book $book)
    {
        $book->delete();
   
        return $this->sendResponse([], 'Book deleted successfully.');
    }
}