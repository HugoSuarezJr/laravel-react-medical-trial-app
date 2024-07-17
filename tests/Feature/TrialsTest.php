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
}
