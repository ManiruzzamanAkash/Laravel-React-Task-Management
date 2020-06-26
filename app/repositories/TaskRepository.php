<?php

namespace App\repositories;

use App\Models\Task;
use App\interfaces\CrudInterface;
use Illuminate\Http\Request;

class TaskRepository implements CrudInterface
{
    public function getAll()
    {
        $tasks = Task::orderBy('id', 'desc')->get();
        return $tasks;
    }
    public function findById($id)
    {
        $task = Task::with('project')
            ->find($id);
        return $task;
    }
    public function create(Request $request)
    {
        $task = new Task();
        $task->name = $request->name;
        $task->description = $request->description;
        $task->project_id = $request->project_id;
        $task->status = 0;
        $task->save();
        return $task;
    }
    public function edit(Request $request, $id)
    {
        $task = $this->findById($id);
        $task->name = $request->name;
        $task->description = $request->description;
        $task->project_id = $request->project_id;
        $task->status = $request->status;
        $task->save();
        return $task;
    }
    public function delete($id)
    {
        $task = $this->findById($id);
        $task->delete();
        return $task;
    }
}
