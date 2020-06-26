<?php

namespace App\repositories;

use App\Models\Project;
use App\interfaces\CrudInterface;
use Illuminate\Http\Request;

class ProjectRepository implements CrudInterface
{
    public function getAll()
    {
        $projects = Project::withCount('tasks')->with('tasks')->orderBy('id', 'desc')->get();
        return $projects;
    }
    public function findById($id)
    {
        $project = Project::with('tasks')
            ->find($id);
        return $project;
    }
    public function create(Request $request)
    {
        $project = new Project();
        $project->name = $request->name;
        $project->description = $request->description;
        $project->user_id = $request->user_id;
        $project->save();
        return $project;
    }
    public function edit(Request $request, $id)
    {
        $project = $this->findById($id);
        $project->name = $request->name;
        $project->description = $request->description;
        $project->user_id = $request->user_id;
        $project->status = $request->status;
        $project->save();
        return $project;
    }
    public function delete($id)
    {
        $project = $this->findById($id);
        $project->tasks()->delete();
        $project->delete();
        return $project;
    }
}
