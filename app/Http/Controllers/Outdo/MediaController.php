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
        $size = $request->file->getSize();
        $name = $request->name;
        $workflow_id = $request->workflow_id;
        $path = Storage::disk('public')->put($type, $request->file, 'public');

        $uploadedImage = $this->screen->create([
            'path' => $path,
            'size' => $size,
            'name' => $name,
            'width' => $width,
            'height' => $height,
            'type' => $type,
            'workflow_id' => $workflow_id
        ])->fresh()->toArray();

        return response()->json($uploadedImage);
    }
}
