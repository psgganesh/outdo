<?php

namespace App\Http\Controllers\Outdo;

use App\Models\Workflow;
use Illuminate\Http\Request;
use App\Http\Resources\WorkflowResource;
use App\Http\Resources\WorkflowCollection;

class WorkflowController
{
    public $workflow;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(Workflow $workflow)
    {
        $this->workflow = $workflow;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $workspace = $request->workspace;
        $records = $this->workflow->of($workspace)->oldest()->get();

        return new WorkflowCollection($records);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $workflow = $this->workflow->create([
            'name' => $request->name,
            'workspace' => $request->workspace
        ])->fresh();
        
        return new WorkflowResource($workflow);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $workflow = $this->workflow->find($id);
        
        return new WorkflowResource($workflow);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $workflow = $this->workflow->find($id);
        
        $screens = $request->screens;
        
        foreach($screens as $screen) {
            logger()->notice($screen['id']);
            $screenToUpdate = $workflow->screens()->find($screen['id']);
            
            // Resetting to avoid dirty data
            if (!empty($screenToUpdate['additional_data'])) {
                $screenToUpdate->additional_data = null;
                $screenToUpdate->save();
            }

            // Adding data
            $screenToUpdate->additional_data = $screen['additional_data'];
            if(empty($screenToUpdate['hotspots'])) {
                $screenToUpdate->hotspots = $screen['hotspots'];
            } else {
                $screenToUpdate->hotspots = array_merge($screenToUpdate->hotspots, $screen['hotspots']);
            }
            $screenToUpdate->save();
        }
        return new WorkflowResource($workflow);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
