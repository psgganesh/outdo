<?php

namespace App\Http\Controllers\Outdo;

use App\Models\Screen;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class MediaController extends Controller
{
    public $screen;

    public function __construct(Screen $screen)
    {
        $this->screen = $screen;
    }

    public function upload(Request $request, $type)
    {
        if (empty($type)) {
            $type = 'default';
        }
        $imgSize = getimagesize($request->file);
        $width = $imgSize[0];
        $height = $imgSize[1];

        $path = Storage::disk('public')->put($type, $request->file, 'public');

        $request->merge([
            'path' => $path,
            'size' => $request->file->getSize(),
            'name' => $request->name,
            'width' => ($width)?? null,
            'height' => ($height) ?? null
        ]);

        $uploadedImage = $this->screen->create([
            'path' => $request->path,
            'size' => $request->size,
            'name' => $request->name,
            'width' => $request->width,
            'height' => $request->height,
            'type' => $type
        ])->fresh()->toArray();

        return response()->json($uploadedImage);
    }
}
