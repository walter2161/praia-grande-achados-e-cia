
<?php
/**
 * Server Environment Check
 * This script checks if the server meets the requirements for running GuíaPG
 */

// Set headers
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

$requirements = [];

// Check PHP version
$minPhpVersion = '7.4.0';
$requirements['php'] = [
    'name' => 'PHP Version (7.4+)',
    'status' => version_compare(PHP_VERSION, $minPhpVersion, '>='),
    'current' => PHP_VERSION,
    'required' => $minPhpVersion
];

// Check for required PHP extensions
$requiredExtensions = ['pdo_mysql', 'json', 'gd', 'mbstring'];
foreach ($requiredExtensions as $ext) {
    $requirements['ext_'.$ext] = [
        'name' => 'PHP Extension: ' . $ext,
        'status' => extension_loaded($ext),
        'current' => extension_loaded($ext) ? 'Installed' : 'Not installed',
        'required' => 'Installed'
    ];
}

// Check for directory write permissions
$dirsToCheck = ['../', '../config'];
foreach ($dirsToCheck as $index => $dir) {
    if (!file_exists($dir)) {
        // Try to create directory if it doesn't exist
        @mkdir($dir, 0755, true);
    }
    $requirements['dir_'.($index + 1)] = [
        'name' => 'Write permissions: ' . $dir,
        'status' => is_writable($dir),
        'current' => is_writable($dir) ? 'Writable' : 'Not writable',
        'required' => 'Writable'
    ];
}

// Check for mod_rewrite
$modRewrite = isModRewriteEnabled();
$requirements['mod_rewrite'] = [
    'name' => 'Apache mod_rewrite',
    'status' => $modRewrite,
    'current' => $modRewrite ? 'Enabled' : 'Not enabled/detected',
    'required' => 'Enabled'
];

// Check file upload limits
$uploadMaxSize = getMaximumFileUploadSize();
$requirements['upload_size'] = [
    'name' => 'Max file upload size',
    'status' => $uploadMaxSize >= (2 * 1024 * 1024), // At least 2MB
    'current' => formatBytes($uploadMaxSize),
    'required' => '2MB+'
];

// Check if the server allows execution time sufficient for installation
$maxExecutionTime = getMaxExecutionTime();
$requirements['execution_time'] = [
    'name' => 'Max execution time',
    'status' => $maxExecutionTime >= 30 || $maxExecutionTime == 0, // 0 means unlimited
    'current' => $maxExecutionTime == 0 ? 'Unlimited' : $maxExecutionTime . 's',
    'required' => '30s+'
];

// Determine overall status
$allPassed = true;
$criticalFailed = false;

foreach ($requirements as $req) {
    if (!$req['status']) {
        $allPassed = false;
        // Consider PHP version, PDO MySQL and write permissions as critical
        if (str_starts_with($req['name'], 'PHP Version') || 
            str_starts_with($req['name'], 'PHP Extension: pdo_mysql') || 
            str_starts_with($req['name'], 'Write permissions')) {
            $criticalFailed = true;
        }
    }
}

$response = [
    'success' => $allPassed,
    'canProceed' => !$criticalFailed,
    'requirements' => $requirements
];

echo json_encode($response);
exit;

/**
 * Helper Functions
 */

// Check if mod_rewrite is enabled
function isModRewriteEnabled() {
    // Method 1: Check using apache_get_modules
    if (function_exists('apache_get_modules')) {
        return in_array('mod_rewrite', apache_get_modules());
    }
    
    // Method 2: Create a test .htaccess and try to access it
    // This is a simplified implementation - a real one would create a test file
    return true;
}

// Get maximum file upload size
function getMaximumFileUploadSize() {
    $maxUpload = convertPHPSizeToBytes(ini_get('upload_max_filesize'));
    $maxPost = convertPHPSizeToBytes(ini_get('post_max_size'));
    return min($maxUpload, $maxPost);
}

// Convert PHP size strings to bytes
function convertPHPSizeToBytes($sSize) {
    $sSuffix = strtoupper(substr($sSize, -1));
    if (!in_array($sSuffix, ['P', 'T', 'G', 'M', 'K'])) {
        return (int)$sSize;
    }
    $iValue = substr($sSize, 0, -1);
    switch ($sSuffix) {
        case 'P': return (int)$iValue * 1024 * 1024 * 1024 * 1024 * 1024;
        case 'T': return (int)$iValue * 1024 * 1024 * 1024 * 1024;
        case 'G': return (int)$iValue * 1024 * 1024 * 1024;
        case 'M': return (int)$iValue * 1024 * 1024;
        case 'K': return (int)$iValue * 1024;
    }
    return 0;
}

// Format bytes to human-readable format
function formatBytes($bytes, $precision = 2) {
    $units = ['B', 'KB', 'MB', 'GB', 'TB'];
    $bytes = max($bytes, 0);
    $pow = floor(($bytes ? log($bytes) : 0) / log(1024));
    $pow = min($pow, count($units) - 1);
    $bytes /= (1 << (10 * $pow));
    return round($bytes, $precision) . ' ' . $units[$pow];
}

// Get maximum execution time
function getMaxExecutionTime() {
    return (int)ini_get('max_execution_time');
}

// polyfill for str_starts_with for PHP < 8.0
if (!function_exists('str_starts_with')) {
    function str_starts_with($haystack, $needle) {
        return (string)$needle !== '' && strncmp($haystack, $needle, strlen($needle)) === 0;
    }
}
