<?php

use App\Enums\TaskPriorityEnums;
use App\Enums\TaskStatusEnums;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->text("title");
            $table->text("description")->nullable();
            $table->enum("priority", array_column(TaskPriorityEnums::cases(), 'value'));
            $table->enum("status", array_column(TaskStatusEnums::cases(), 'value'));
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
