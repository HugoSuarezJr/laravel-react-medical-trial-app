<?php

namespace Tests\Feature;

use App\Models\Trial;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

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

        $trial = Trial::create($data);

        $this->assertDatabaseHas('trials', $data);
        $this->assertEquals('Test Trial', $trial->name);
        $this->assertEquals('This is a test Trial', $trial->description);
        $this->assertEquals('in_progress', $trial->status);
        $this->assertEquals('high', $trial->priority);
        $this->assertEquals(null, $trial->image_path);
        $this->assertEquals(null, $trial->due_date);
        $this->assertEquals(1, $trial->created_by);
        $this->assertEquals(1, $trial->updated_by);
        $this->assertEquals(1, $trial->assigned_user_id);
    }
}
