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
        $record = $this->workflow->create($request->all())->fresh();
        
        return new WorkflowResource($record);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $record = $this->workflow->find($id);
        
        return new WorkflowResource($record);
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
        // Update screens based on workflow
        return response()->json(['data'=>'done'], 200);
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
