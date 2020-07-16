<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class ProjectCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'data' => $this->collectResource($this->collection)->transform(function ($item) {
                return [
                    'id' => $item->id,
                    'name' => $item->name,
                    'screens_id' => $item->screens_id,
                    'user_id' => $item->user_id,
                    'created_by' => $item->created_by,
                ];
            })
        ];
    }
}
