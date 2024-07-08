<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTrialRequest;
use App\Http\Requests\UpdateTrialRequest;
use App\Http\Resources\TrialResource;
use App\Http\Resources\PatientResource;
use App\Models\Trial;
use App\Models\Patient;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;

class TrialController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Trial::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", 'desc');

        if(request("name")) {
            $query->where("name", "like", "%". request("name") ."%");
        }
        if(request("status")) {
            $query->where("status", request("status"));
        }

        $trials = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);

        return inertia("Trial/Index", [
            "trials" => TrialResource::collection($trials),
            'queryParams' => request()->query() ?: null,
            'success' => session('success')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("Trial/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTrialRequest $request)
    {
        $data = $request->validated();
        /** @var $image \Illuminate\Http\UploadedFile */
        $image = $data['image'] ?? null;
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();
        if($image) {
            $data['image_path'] = $image->store('trial-/'.Str::random(), 'public');
        }

        Trial::create($data);

        return to_route('trial.index')->with('success', 'Your trial has been created!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Trial $trial)
    {
        $query = $trial->patients();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", 'desc');

        if(request("name")) {
            $query->where("name", "like", "%". request("name") ."%");
        }
        if(request("status")) {
            $query->where("status", request("status"));
        }

        $patients = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);

        return Inertia('Trial/Show', [
            'trial' => new TrialResource($trial),
            "patients" => PatientResource::collection($patients),
            'queryParams' => request()->query() ?: null,
            'success' => session('success')
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Trial $trial)
    {
        return inertia('Trial/Edit', [
            'trial' => new TrialResource($trial)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTrialRequest $request, Trial $trial)
    {
        $data = $request->validated();
        $data['updated_by'] = Auth::id();
        $image = $data['image'] ?? null;
        if($image) {
            if($trial->image_path){
                Storage::disk('public')->deleteDirectory(dirname($trial->image_path));
            }
            $data['image_path'] = $image->store('trial-/'.Str::random(), 'public');
        }
        $trial->update($data);
        return to_route('trial.index')->with('success', "Trial \"$trial->name\" was updated.");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Trial $trial)
    {
        $name = $trial->name;
        $trial->delete();
        if($trial->image_path){
            Storage::disk('public')->deleteDirectory(dirname($trial->image_path));
        }
        return to_route('trial.index')->with('success', "Trial \"$name\" was deleted.");
    }
}
