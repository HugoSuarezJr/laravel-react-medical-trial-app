<?php

namespace Tests\Feature;

use App\Models\Trial;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Illuminate\Testing\TestResponse;


class TrialsTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_can_create_a_trial()
    {
        User::factory()->create();

        $data = [
            'name' => 'Test Trial',
            'description' => 'This is a test Trial',
            'status' => 'in_progress',
            'priority' => 'high',
            'assigned_user_id' => 1,
            'created_by' => 1,
            'updated_by' => 1
        ];

        Trial::create($data);

        $this->assertDatabaseHas('trials', $data);
    }

    public function test_it_can_store_a_trial()
    {
        $data = [
            'name' => 'Test Trial',
            'description' => 'This is a test Trial',
            'status' => 'in_progress',
            'priority' => 'high',
            'assigned_user_id' => 1,
        ];

        $user = User::factory()->create();

        $response = $this->actingAs($user)->post(route('trial.store'), $data);

        $this->assertEquals(302, $response->getStatusCode());
        $response->assertRedirectToRoute('trial.index');
        $this->assertDatabaseHas('trials', $data);
    }

    public function test_it_can_have_assigned_user()
    {
        $user = User::factory()->create();

        $trial = Trial::factory()->create(['assigned_user_id' => $user->id]);

        $this->assertTrue(Trial::all()->contains('assigned_user_id', $user->id));
    }

    public function test_it_can_fetch_trials()
    {
        $user = User::factory()->create();

        $trials = Trial::factory()->count(3)->create(['assigned_user_id' => $user->id]);

        $response = $this->actingAs($user)->get('/trial');

        $response->assertStatus(200)
            ->assertJsonCount(3);
    }
}
