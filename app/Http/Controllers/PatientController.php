<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePatientRequest;
use App\Http\Requests\UpdatePatientRequest;
use App\Http\Resources\TrialResource;
use App\Http\Resources\PatientResource;
use App\Http\Resources\UserResource;
use App\Models\Trial;
use App\Models\Patient;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class PatientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Patient::query();

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

        return inertia("Patient/Index", [
            "patients" => PatientResource::collection($patients),
            'queryParams' => request()->query() ?: null,
            'success' => session('success')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $trials = Trial::query()->orderBy('name')->get();
        $users = User::query()->orderBy('name')->get();
        return inertia("Patient/Create", [
            "trials" => TrialResource::collection($trials),
            "users" => UserResource::collection($users)
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePatientRequest $request)
    {
        $data = $request->validated();
        /** @var $image \Illuminate\Http\UploadedFile */
        $image = $data['image'] ?? null;
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();
        if($image) {
            $data['image_path'] = $image->store('patient-/'.Str::random(), 'public');
        }

        Patient::create($data);

        return to_route('patient.index')->with('success', 'Your patient has been created!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Patient $patient)
    {
        return Inertia('Patient/Show', [
            'patient' => new PatientResource($patient)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Patient $patient)
    {
        $trials = Trial::query()->orderBy('name')->get();
        $users = User::query()->orderBy('name')->get();
        return inertia("Patient/Edit", [
            'patient' => new PatientResource($patient),
            "trials" => TrialResource::collection($trials),
            "users" => UserResource::collection($users)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePatientRequest $request, Patient $patient)
    {
        $data = $request->validated();
        $data['updated_by'] = Auth::id();
        $image = $data['image'] ?? null;
        if($image) {
            if($patient->image_path){
                Storage::disk('public')->deleteDirectory(dirname($patient->image_path));
            }
            $data['image_path'] = $image->store('patient-/'.Str::random(), 'public');
        }
        $patient->update($data);
        return to_route('patient.index')->with('success', "Patient \"$patient->name\" was updated.");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Patient $patient)
    {
        $name = $patient->name;
        $patient->delete();
        if($patient->image_path){
            Storage::disk('public')->deleteDirectory(dirname($patient->image_path));
        }
        return to_route('patient.index')->with('success', "Patient \"$name\" was deleted.");
    }

    /**
     * Show only the users assigned patients.
     */
    public function myPatients(Patient $patient)
    {
        $user = auth()->user();
        $query = Patient::query()->where('assigned_user_id', $user->id);

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

        return inertia("Patient/Index", [
            "patients" => PatientResource::collection($patients),
            'queryParams' => request()->query() ?: null,
            'success' => session('success')
        ]);
    }
}
