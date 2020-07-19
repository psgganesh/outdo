<?php

namespace App\Models;

use Illuminate\Support\Str;
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
            $screen->{$screen->getKeyName()} = (string) Str::uuid();
            $screen->user_id = auth()->guard('api')->user()->id;
            $screen->created_by = auth()->guard('api')->user()->username;
        });
    }
 
    /**
     * The attributes that are guarded.
     *
     * @var array
     */
    protected $guarded = [];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'additional_data' => 'array',
        'default_images' => 'array',
        'seo' => 'array',
        'product_attributes' => 'array'
    ];

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = [
        'created_at',
        'updated_at'
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

    public function getIncrementing()
    {
        return false;
    }

    public function getKeyType()
    {
        return 'string';
    }

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

    /**
     * Get the additional_data value.
     *
     * @param  string  $value
     * @return void
     */
    public function getAdditionalDataAttribute($value)
    {
        if (filled($value)) {
            return json_decode($value);
        }

        return null;
    }

    public function workflow()
    {
        return $this->belongsTo('App\Models\Workflow', 'workflow_id');
    }

    public function user()
    {
        return $this->belongsTo('App\Models\User', 'user_id');
    }
}
