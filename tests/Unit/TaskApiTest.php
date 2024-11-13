<?php

namespace Tests\Unit;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Task;

class TaskApiTest extends TestCase
{
    use RefreshDatabase;

    
    public function it_creates_a_task_successfully()
    {
        $taskData = [
            'title' => 'New Task',
            'description' => 'Task description',
            'priority' => 'medium',
            'status' => 'pending'
        ];

        $response = $this->postJson('/api/tasks', $taskData);

        $response->assertStatus(201)
                 ->assertJson([
                     'data' => [
                         'title' => 'New Task',
                         'description' => 'Task description',
                         'priority' => 'medium',
                         'status' => 'pending'
                     ],
                 ]);

        $this->assertDatabaseHas('tasks', $taskData);
    }

    
    public function it_fails_to_create_task_without_title()
    {
        $taskData = [
            'description' => 'Task description',
            'priority' => 'medium',
            'status' => 'pending'
        ];

        $response = $this->postJson('/api/tasks', $taskData);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['title']);
    }

    public function test_can_retrieve_all_tasks()
    {
        // Seed database with some tasks
        Task::factory()->count(5)->create();

        // Make request to retrieve all tasks
        $response = $this->getJson('/api/tasks');

        // Assert the response is OK and check data structure
        $response->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'title',
                    'description',
                    'priority',
                    'status'
                ]
            ]
        ])->assertJsonCount(5, 'data');
    }

    public function test_task_priority_enum_validation()
    {
        $invalidData = [
            'title' => 'Enum Test Task',
            'description' => 'Testing invalid enum value',
            'priority' => 'urgent', // Assuming 'urgent' is not a valid enum value
        ];

        $response = $this->postJson('/api/tasks', $invalidData);

        $response->assertStatus(422)
                ->assertJsonStructure(['message', 'errors' => ['priority']]);
    }

    public function test_create_task_validation_error()
    {
        $taskData = [
            'title' => '',  // Empty title should trigger validation error
            'description' => 'New Task Description',
            'priority' => 'invalid_priority', // Invalid priority
        ];

        $response = $this->postJson('/api/tasks', $taskData);

        $response->assertStatus(422)
                ->assertJsonStructure(['message', 'errors' => ['title', 'priority']]);
    }

    public function test_can_update_task()
    {
        $task = Task::factory()->create();

        $updateData = [
            'title' => 'Updated Title',
            'description' => 'Updated Description',
            'priority' => 'low',
        ];

        $response = $this->putJson('/api/tasks/' . $task->id, $updateData);

        $response->assertStatus(200)
                ->assertJson([
                    'message' => 'Task updated successfully',
                    'data' => [
                        'id' => $task->id,
                        'title' => 'Updated Title',
                        'description' => 'Updated Description',
                        'priority' => 'low',
                    ]
                ]);

        $this->assertDatabaseHas('tasks', $updateData);
    }

    public function test_update_nonexistent_task()
    {
        $updateData = [
            'title' => 'Updated Title',
            'description' => 'Updated Description',
            'priority' => 'medium',
        ];

        $response = $this->putJson('/api/tasks/9999', $updateData); // ID 9999 doesn't exist

        $response->assertStatus(404)
                ->assertJson([
                    'message' => 'Task not found',
                ]);
    }

    public function test_update_task_validation_error()
    {
        $task = Task::factory()->create();

        $updateData = [
            'title' => '',
            'priority' => 'invalid_priority',
        ];

        $response = $this->putJson('/api/tasks/' . $task->id, $updateData);

        $response->assertStatus(422)
                ->assertJsonStructure(['message', 'errors' => ['title', 'priority']]);
    }

    public function test_can_delete_task()
    {
        $task = Task::factory()->create();

        $response = $this->deleteJson('/api/tasks/' . $task->id);

        $response->assertStatus(200)
                ->assertJson([
                    'message' => 'Task deleted successfully',
                ]);

        $this->assertDatabaseMissing('tasks', ['id' => $task->id]);
    }

    public function test_delete_nonexistent_task()
    {
        $response = $this->deleteJson('/api/tasks/9999'); // ID 9999 doesn't exist

        $response->assertStatus(404)
                ->assertJson([
                    'message' => 'Task not found',
                ]);
    }

    public function test_empty_task_list()
    {
        Task::query()->delete(); // Clear all tasks

        $response = $this->getJson('/api/tasks');

        $response->assertStatus(200)
                ->assertJsonCount(0, 'data'); // Assert that the response is an empty array
    }


}
