<?php
  
namespace App;
   
use Illuminate\Database\Eloquent\Model;
   
class Author extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'fname', 'lname', 'description'
    ];

    public function books() {
        return $this->hasMany('App\Models\Book');
    }
}