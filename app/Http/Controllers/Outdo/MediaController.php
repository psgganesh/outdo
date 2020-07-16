<?php

namespace App\Http\Controllers\Outdo;

use App\Models\Image;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class MediaController extends Controller
{
    public $image;

    public function __construct(Image $image)
    {
        $this->image = $image;
    }

    public function upload(Request $request, $type)
    {
        if (empty($type)) {
            $type = 'default';
        }
        $imgSize = getimagesize($request->file);
        $dimension = $imgSize[0].'x'.$imgSize[1];

        $path = Storage::disk('local')->put($type, $request->file);

        $request->merge([
            'path' => $path,
            'size' => $request->file->getSize(),
            'name' => $request->name,
            'dimension' => ($dimension)?? null
        ]);

        $uploadedImage = $this->image->create([
            'path' => $request->path,
            'size' => $request->size,
            'name' => $request->name,
            'dimension' => $request->dimension,
            'type' => $type
        ])->fresh()->toArray();

        return response()->json($uploadedImage);
    }
}
