<?php

namespace App\Models;

use Illuminate\Support\Str;
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
    
        static::creating(function ($workflow) {
            $workflow->{$workflow->getKeyName()} = (string) Str::uuid();
            $workflow->user_id = auth()->guard('api')->user()->id;
            $workflow->created_by = auth()->guard('api')->user()->username;
        });
    }

    /**
     * The attributes that are guarded.
     *
     * @var array
     */
    protected $guarded = [];

    public function getIncrementing()
    {
        return false;
    }

    public function getKeyType()
    {
        return 'string';
    }

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'additional_data' => 'array'
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
            'screens_count' => (empty($this->screens)) ? 0 : $this->screens->count(),
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
     * Relationship with screens table
     */
    public function screens()
    {
        return $this->hasMany('App\Models\Screen', 'workflow_id', 'id');
    }
}
