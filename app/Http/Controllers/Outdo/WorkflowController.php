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
        $records = $this->workflow->of($workspace)->get();

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
        $workflow = $this->workflow->create($request->all())->fresh();
        
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
        
        foreach($request->screens as $screen) {
            if(isset($screen->additional_data)) {
                $screenToUpdate = $workflow->screens()->find($screen->id);
                $screenToUpdate->additional_data = $screen->additional_data;
                $screenToUpdate->save();
            } else {
                logger()->notice('No additional_data');
            }
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
