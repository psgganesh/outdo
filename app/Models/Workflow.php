<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Workflow extends Model
{
    protected $table = "workflows";

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
            $image->created_by = auth()->guard('api')->user()->username;
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
     * Function to return selected response in JSON collection / resource
     *
     * @return array
     */
    public function toArray()
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'screens' => $this->screens,
            'user_id' => $this->user_id,
            'created_by' => $this->created_by,
            'created_at' =>  $this->created_at,
        ];
    }

    /**
     * Published scope to filter and return only workspace's workflows
     *
     * @param $query
     *
     * @return $query
     */
    public function scopeOf($query, $workspace)
    {
        return $query->where('created_by', $workspace);
    }

    /**
     * Relationship with workflow table
     */
    public function workflow()
    {
        return $this->hasOne('App\Models\Workflow', 'workflow_id', 'id');
    }
}
