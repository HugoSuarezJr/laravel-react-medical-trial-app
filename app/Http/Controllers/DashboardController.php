<?php

namespace App\Http\Controllers;

use App\Http\Resources\PatientResource;
use App\Models\Patient;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $totalPendingPatients = Patient::query()
            ->where('status', 'pending')
            ->count();
        $myPendingPatients = Patient::query()
            ->where('status', 'pending')
            ->where('assigned_user_id', $user->id)
            ->count();

        $totalInProgressPatients = Patient::query()
            ->where('status', 'in_progress')
            ->count();
        $myInProgressPatients = Patient::query()
            ->where('status', 'in_progress')
            ->where('assigned_user_id', $user->id)
            ->count();

        $totalCompletedPatients = Patient::query()
            ->where('status', 'completed')
            ->count();
        $myCompletedPatients = Patient::query()
            ->where('status', 'completed')
            ->where('assigned_user_id', $user->id)
            ->count();

        $activePatients = Patient::query()
            ->where('assigned_user_id', $user->id)
            ->whereIn('status', ['pending', 'in_progress'])
            ->limit(10)
            ->get();
        $activePatients = PatientResource::collection($activePatients);

        return inertia(
            'Dashboard',
            compact(
                'totalPendingPatients',
                'myPendingPatients',
                'totalInProgressPatients',
                'myInProgressPatients',
                'totalCompletedPatients',
                'myCompletedPatients',
                'activePatients'
            )
        );
    }
}
