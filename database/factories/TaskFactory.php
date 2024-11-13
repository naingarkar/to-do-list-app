<?php

namespace Database\Factories;

use App\Enums\TaskPriorityEnums;
use App\Enums\TaskStatusEnums;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence,
            'description' => $this->faker->paragraph,
            'priority' => $this->faker->randomElement(array_column(TaskPriorityEnums::cases(), 'value')),
            'status' => $this->faker->randomElement(array_column(TaskStatusEnums::cases(), 'value')),
        ];
    }
}
