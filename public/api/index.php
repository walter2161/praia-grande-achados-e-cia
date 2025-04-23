
<?php
/**
 * GuíaPG API Router
 * 
 * Main entry point for all API requests. Routes requests to appropriate handlers.
 */

// Set headers for API responses
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Load configuration
require_once '../config.php';

// Handle preflight OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Basic sanitization
$request_uri = filter_var($_SERVER['REQUEST_URI'], FILTER_SANITIZE_URL);
$path = parse_url($request_uri, PHP_URL_PATH);

// Remove base path to get the API endpoint
$base_path = '/api/';
$api_path = substr($path, strlen($base_path));

// Split path into segments
$segments = explode('/', $api_path);
$resource = $segments[0] ?? '';
$id = $segments[1] ?? null;
$action = $segments[2] ?? null;

// Connect to database
try {
    $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME;
    $pdo = new PDO($dsn, DB_USER, DB_PASSWORD);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Database connection failed',
        'message' => DEBUG_MODE ? $e->getMessage() : 'Please check your database settings'
    ]);
    exit;
}

// Router
try {
    switch ($resource) {
        case 'listings':
            require_once 'endpoints/listings.php';
            break;
            
        case 'categories':
            require_once 'endpoints/categories.php';
            break;
            
        case 'settings':
            require_once 'endpoints/settings.php';
            break;
            
        case 'users':
            require_once 'endpoints/users.php';
            break;
            
        case 'auth':
            require_once 'endpoints/auth.php';
            break;
            
        case 'media':
            require_once 'endpoints/media.php';
            break;
            
        default:
            http_response_code(404);
            echo json_encode(['error' => 'Resource not found']);
            exit;
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Internal server error',
        'message' => DEBUG_MODE ? $e->getMessage() : 'An unexpected error occurred'
    ]);
}
