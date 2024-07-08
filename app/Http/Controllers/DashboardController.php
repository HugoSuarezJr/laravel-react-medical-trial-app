<?php

namespace App\Http\Controllers;

use App\Http\Resources\TrialResource;
use App\Models\Trial;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $totalPendingTrials = Trial::query()
            ->where('status', 'pending')
            ->count();
        $myPendingTrials = Trial::query()
            ->where('status', 'pending')
            ->where('assigned_user_id', $user->id)
            ->count();

        $totalInProgressTrials = Trial::query()
            ->where('status', 'in_progress')
            ->count();
        $myInProgressTrials = Trial::query()
            ->where('status', 'in_progress')
            ->where('assigned_user_id', $user->id)
            ->count();

        $totalCompletedTrials = Trial::query()
            ->where('status', 'completed')
            ->count();
        $myCompletedTrials = Trial::query()
            ->where('status', 'completed')
            ->where('assigned_user_id', $user->id)
            ->count();

        $activeTrials = Trial::query()
            ->where('assigned_user_id', $user->id)
            ->whereIn('status', ['pending', 'in_progress'])
            ->limit(10)
            ->get();
        $activeTrials = TrialResource::collection($activeTrials);

        return inertia(
            'Dashboard',
            compact(
                'totalPendingTrials',
                'myPendingTrials',
                'totalInProgressTrials',
                'myInProgressTrials',
                'totalCompletedTrials',
                'myCompletedTrials',
                'activeTrials'
            )
        );
    }
}
