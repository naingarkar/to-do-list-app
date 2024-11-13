<?php
namespace App\Services;

class ResponseService {
    public static function notFoundError($message = "") {
        return response()->json([
            'code' => 404,
            'message' => $message === "" ? "Not Found" : $message
        ], 404);
    }
}