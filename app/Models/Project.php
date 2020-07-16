<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
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
    
        static::creating(function ($image) {
            $image->user_id = auth()->guard('api')->user()->id;
            $image->created_by = auth()->guard('api')->user()->email;
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
     * Published scope to filter and return only user's projects
     *
     * @param $query
     *
     * @return $query
     */
    public function scopeList($query)
    {
        return $query->where('useri_id', auth()->guard('api')->user()->id);
    }

}
