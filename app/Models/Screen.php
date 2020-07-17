<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Screen extends Model
{
    protected $table = "screens";

    /**
     * Static boot method which calls itself, everytime
     * a instance of this model is created anywhere
     * within the application.
     *
     * @return void;
     */
    protected static function boot()
    {
        parent::boot();
    
        static::creating(function ($screen) {
            $screen->user_id = auth()->guard('api')->user()->id;
            $screen->created_by = auth()->guard('api')->user()->username;
        });
    }
 
    /**
     * The attributes that are guarded.
     *
     * @var array
     */
    protected $guarded = [
        'id'
    ];

    /**
     * The attributes that should be appended on every toArray() result set.
     *
     * @var array
     */
    protected $appends = [
        'url',
        'uploaded_time',
        'size_in_kb'
    ];

    public function getUrlAttribute()
    {
        return Storage::disk('local')->url($this->path);
    }

    public function getUploadedTimeAttribute()
    {
        return $this->created_at->diffForHumans();
    }

    public function getSizeInKbAttribute()
    {
        return round($this->size / 1024, 2);
    }

    public function project()
    {
        return $this->belongsTo('App\Models\Project', 'project_id');
    }

    public function user()
    {
        return $this->belongsTo('App\Models\User', 'user_id');
    }
}
