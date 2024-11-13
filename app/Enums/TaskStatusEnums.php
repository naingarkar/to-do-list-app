<?php
namespace App\Enums;

enum TaskStatusEnums: string
{
    case PENDING = 'pending';
    case IN_PROGRESS = 'in_progress';
    case COMPLETED = 'completed';
}
