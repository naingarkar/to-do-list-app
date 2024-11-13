<?php

namespace App\Http\Controllers;

use App\Services\ResponseService;
use App\Http\Requests\TaskStoreRequest;
use App\Http\Requests\TaskUpdateRequest;
use App\Http\Resources\TaskResource;
use App\Http\Resources\TaskResourceCollection;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function getList()
    {
        $tasks = Task::all();
        return (new TaskResourceCollection($tasks))->additional(
            [
                'code' => 200,
                'message' => 'Tasks retrieved successfully'
            ]
        );
    }

    public function store(TaskStoreRequest $request)
    {
        $task = Task::create($request->validated());
        return (new TaskResource($task))->additional(
            [
                'code' => 200,
                'message' => 'Task created successfully'
            ]
        );
    }

    public function show($id)
    {
        $task = Task::find($id);
        if(empty($task)) {
            return ResponseService::notFoundError("Task not found");
        }

        return (new TaskResource($task))->additional(
            [
                'code' => 200,
                'message' => 'Task retreived successfully'
            ]
        );
    }

    public function update(TaskUpdateRequest $request, $id)
    {
        $task = Task::find($id);
        if(empty($task)) {
            return ResponseService::notFoundError("Task not found");
        }

        $task->update($request->validated());
        return (new TaskResource($task))->additional(
            [
                'code' => 200,
                'message' => 'Task updated successfully'
            ]
        );
    }

    public function destroy($id)
    {
        $task = Task::find($id);

        if(empty($task)) {
            return ResponseService::notFoundError("Task not found");
        }

        $task->delete();
        return (new TaskResource($task))->additional(
            [
                'code' => 200,
                'message' => 'Task deleted successfully'
            ]
        );
    }
}
