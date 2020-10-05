<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Book extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'author_id' => $this->author_id,
            'author_full_name' => $this->fname . " " . $this->lname,
            'title' => $this->title,
            'isbn' => $this->isbn,
            'publisher' => $this->publisher,
        ];
    }
}
