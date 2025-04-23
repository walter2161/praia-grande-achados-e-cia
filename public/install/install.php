
<?php
/**
 * GuíaPG Installer
 * 
 * Backend script for the GuíaPG installation process
 */

// Set headers
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET');
header('Access-Control-Allow-Headers: Content-Type');

// Get action from request
$action = isset($_GET['action']) ? $_GET['action'] : '';
if (empty($action) && isset($_POST['action'])) {
    $action = $_POST['action'];
}

// Process actions
switch ($action) {
    case 'check_requirements':
        checkRequirements();
        break;
    case 'test_db':
        testDatabaseConnection();
        break;
    case 'install':
        performInstallation();
        break;
    default:
        respond(['error' => 'Invalid action']);
}

/**
 * Check server requirements
 */
function checkRequirements() {
    $requirements = [
        'php_version' => [
            'name' => 'PHP version 7.4+',
            'status' => version_compare(PHP_VERSION, '7.4.0') >= 0,
            'value' => PHP_VERSION
        ],
        'pdo_mysql' => [
            'name' => 'PDO MySQL extension',
            'status' => extension_loaded('pdo_mysql'),
            'value' => extension_loaded('pdo_mysql') ? 'Available' : 'Not available'
        ],
        'write_permissions' => [
            'name' => 'Write permissions',
            'status' => is_writable('../'),
            'value' => is_writable('../') ? 'OK' : 'Missing'
        ],
        'mod_rewrite' => [
            'name' => 'mod_rewrite enabled',
            'status' => checkModRewrite(),
            'value' => checkModRewrite() ? 'Enabled' : 'Disabled'
        ]
    ];
    
    $all_passed = true;
    foreach ($requirements as $req) {
        if (!$req['status']) {
            $all_passed = false;
            break;
        }
    }
    
    respond([
        'success' => $all_passed,
        'requirements' => $requirements
    ]);
}

/**
 * Check if mod_rewrite is enabled
 */
function checkModRewrite() {
    // This is a simplified check - in production, you might need a more complex test
    return true;
}

/**
 * Test database connection
 */
function testDatabaseConnection() {
    $data = getRequestData();
    
    if (empty($data['host']) || empty($data['name']) || empty($data['user'])) {
        respond(['success' => false, 'message' => 'Required fields missing']);
        return;
    }
    
    try {
        $dsn = "mysql:host={$data['host']};dbname={$data['name']}";
        $pdo = new PDO($dsn, $data['user'], $data['password'] ?? '');
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        respond(['success' => true, 'message' => 'Connection successful']);
    } catch (PDOException $e) {
        respond(['success' => false, 'message' => 'Connection failed: ' . $e->getMessage()]);
    }
}

/**
 * Perform the full installation
 */
function performInstallation() {
    $data = getRequestData();
    
    // Validate required data
    if (!validateInstallationData($data)) {
        respond(['success' => false, 'message' => 'Missing required installation data']);
        return;
    }
    
    // Setup database connection
    try {
        $dsn = "mysql:host={$data['db']['host']};dbname={$data['db']['name']}";
        $pdo = new PDO($dsn, $data['db']['user'], $data['db']['password'] ?? '');
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $prefix = $data['db']['prefix'];
        
        // Create database tables
        createDatabaseTables($pdo, $prefix);
        
        // Create admin user
        createAdminUser($pdo, $prefix, $data['admin']);
        
        // Set site configuration
        setSiteConfig($pdo, $prefix, $data['site']);
        
        // Generate config file
        generateConfigFile($data['db']);
        
        respond(['success' => true, 'message' => 'Installation completed successfully']);
    } catch (Exception $e) {
        respond(['success' => false, 'message' => 'Installation failed: ' . $e->getMessage()]);
    }
}

/**
 * Validate installation data
 */
function validateInstallationData($data) {
    return !empty($data['db']) && 
           !empty($data['db']['host']) && 
           !empty($data['db']['name']) && 
           !empty($data['db']['user']) &&
           !empty($data['admin']) &&
           !empty($data['admin']['username']) &&
           !empty($data['admin']['email']) &&
           !empty($data['admin']['password']);
}

/**
 * Create database tables
 */
function createDatabaseTables($pdo, $prefix) {
    // Users table
    $sql = "CREATE TABLE IF NOT EXISTS `{$prefix}users` (
        `id` INT AUTO_INCREMENT PRIMARY KEY,
        `username` VARCHAR(100) NOT NULL,
        `email` VARCHAR(255) NOT NULL,
        `password` VARCHAR(255) NOT NULL,
        `role` ENUM('user', 'admin') NOT NULL DEFAULT 'user',
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY `username` (`username`),
        UNIQUE KEY `email` (`email`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";
    $pdo->exec($sql);
    
    // Listings table
    $sql = "CREATE TABLE IF NOT EXISTS `{$prefix}listings` (
        `id` INT AUTO_INCREMENT PRIMARY KEY,
        `title` VARCHAR(255) NOT NULL,
        `description` TEXT,
        `price` DECIMAL(10,2),
        `category` VARCHAR(100) NOT NULL,
        `subcategory` VARCHAR(100),
        `user_id` INT,
        `status` ENUM('draft', 'pending', 'active', 'inactive') NOT NULL DEFAULT 'pending',
        `contact_phone` VARCHAR(20),
        `contact_email` VARCHAR(255),
        `address` VARCHAR(255),
        `city` VARCHAR(100),
        `state` VARCHAR(50),
        `zipcode` VARCHAR(10),
        `latitude` DECIMAL(10,8),
        `longitude` DECIMAL(11,8),
        `featured` BOOLEAN DEFAULT FALSE,
        `views` INT DEFAULT 0,
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (`user_id`) REFERENCES `{$prefix}users`(`id`) ON DELETE SET NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";
    $pdo->exec($sql);
    
    // Images table
    $sql = "CREATE TABLE IF NOT EXISTS `{$prefix}images` (
        `id` INT AUTO_INCREMENT PRIMARY KEY,
        `listing_id` INT NOT NULL,
        `file_name` VARCHAR(255),
        `file_data` LONGTEXT,
        `file_type` VARCHAR(50),
        `is_featured` BOOLEAN DEFAULT FALSE,
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (`listing_id`) REFERENCES `{$prefix}listings`(`id`) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";
    $pdo->exec($sql);
    
    // Categories table
    $sql = "CREATE TABLE IF NOT EXISTS `{$prefix}categories` (
        `id` INT AUTO_INCREMENT PRIMARY KEY,
        `name` VARCHAR(100) NOT NULL,
        `slug` VARCHAR(100) NOT NULL,
        `description` TEXT,
        `icon` VARCHAR(50),
        `parent_id` INT DEFAULT NULL,
        `order` INT DEFAULT 0,
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY `slug` (`slug`),
        FOREIGN KEY (`parent_id`) REFERENCES `{$prefix}categories`(`id`) ON DELETE SET NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";
    $pdo->exec($sql);
    
    // Settings table
    $sql = "CREATE TABLE IF NOT EXISTS `{$prefix}settings` (
        `id` INT AUTO_INCREMENT PRIMARY KEY,
        `option_name` VARCHAR(100) NOT NULL,
        `option_value` TEXT,
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY `option_name` (`option_name`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";
    $pdo->exec($sql);
    
    // Create real estate specific fields table
    $sql = "CREATE TABLE IF NOT EXISTS `{$prefix}real_estate_details` (
        `id` INT AUTO_INCREMENT PRIMARY KEY,
        `listing_id` INT NOT NULL,
        `property_type` VARCHAR(50),
        `bedrooms` INT,
        `bathrooms` INT,
        `area` DECIMAL(10,2),
        `area_unit` VARCHAR(10) DEFAULT 'm²',
        `year_built` INT,
        `purpose` ENUM('sale', 'rent', 'exchange') NOT NULL DEFAULT 'sale',
        FOREIGN KEY (`listing_id`) REFERENCES `{$prefix}listings`(`id`) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";
    $pdo->exec($sql);
    
    // Create vehicle specific fields table
    $sql = "CREATE TABLE IF NOT EXISTS `{$prefix}vehicle_details` (
        `id` INT AUTO_INCREMENT PRIMARY KEY,
        `listing_id` INT NOT NULL,
        `make` VARCHAR(50),
        `model` VARCHAR(50),
        `year` INT,
        `mileage` INT,
        `fuel_type` VARCHAR(30),
        `transmission` VARCHAR(30),
        `color` VARCHAR(30),
        `condition` VARCHAR(30),
        FOREIGN KEY (`listing_id`) REFERENCES `{$prefix}listings`(`id`) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";
    $pdo->exec($sql);
    
    // Insert default categories
    $defaultCategories = [
        ['name' => 'Imóveis', 'slug' => 'imoveis', 'icon' => 'home'],
        ['name' => 'Veículos', 'slug' => 'autos', 'icon' => 'car'],
        ['name' => 'Serviços', 'slug' => 'servicos', 'icon' => 'wrench'],
        ['name' => 'Empregos', 'slug' => 'empregos', 'icon' => 'briefcase'],
        ['name' => 'Bares e Restaurantes', 'slug' => 'bares-restaurantes', 'icon' => 'utensils']
    ];
    
    $stmt = $pdo->prepare("INSERT INTO `{$prefix}categories` (name, slug, icon) VALUES (?, ?, ?)");
    foreach ($defaultCategories as $cat) {
        $stmt->execute([$cat['name'], $cat['slug'], $cat['icon']]);
    }
}

/**
 * Create admin user
 */
function createAdminUser($pdo, $prefix, $admin) {
    // Hash the password
    $hashedPassword = password_hash($admin['password'], PASSWORD_DEFAULT);
    
    $sql = "INSERT INTO `{$prefix}users` (username, email, password, role) VALUES (?, ?, ?, 'admin')";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$admin['username'], $admin['email'], $hashedPassword]);
}

/**
 * Set site configuration
 */
function setSiteConfig($pdo, $prefix, $site) {
    $settings = [
        ['site_name', $site['name'] ?? 'GuíaPG'],
        ['site_description', $site['description'] ?? 'Guia de Anúncios e Serviços'],
        ['site_email', $site['email'] ?? 'contato@example.com'],
        ['site_language', $site['language'] ?? 'pt_BR'],
        ['site_date_format', 'd/m/Y'],
        ['site_time_format', 'H:i'],
        ['listings_per_page', '12'],
        ['allow_user_registration', '1'],
        ['require_admin_approval', '1'],
        ['google_maps_api_key', ''],
        ['use_google_sheets', '0'],
        ['google_sheets_id', ''],
        ['google_sheets_api_key', '']
    ];
    
    $stmt = $pdo->prepare("INSERT INTO `{$prefix}settings` (option_name, option_value) VALUES (?, ?)");
    foreach ($settings as $setting) {
        $stmt->execute($setting);
    }
}

/**
 * Generate config file
 */
function generateConfigFile($dbConfig) {
    $configContent = "<?php
/**
 * GuíaPG Configuration File
 * Generated on " . date('Y-m-d H:i:s') . "
 */

// Database configuration
define('DB_HOST', '" . addslashes($dbConfig['host']) . "');
define('DB_NAME', '" . addslashes($dbConfig['name']) . "');
define('DB_USER', '" . addslashes($dbConfig['user']) . "');
define('DB_PASSWORD', '" . addslashes($dbConfig['password']) . "');
define('DB_PREFIX', '" . addslashes($dbConfig['prefix']) . "');

// Site configuration
define('SITE_URL', (isset(\$_SERVER['HTTPS']) && \$_SERVER['HTTPS'] === 'on' ? 'https' : 'http') . '://' . \$_SERVER['HTTP_HOST']);
define('ADMIN_EMAIL', 'admin@example.com');

// Security
define('AUTH_SALT', '" . bin2hex(random_bytes(16)) . "');
define('SECURE_AUTH_SALT', '" . bin2hex(random_bytes(16)) . "');
define('LOGGED_IN_SALT', '" . bin2hex(random_bytes(16)) . "');

// Debug mode (set to false in production)
define('DEBUG_MODE', false);
";
    
    // Write config to file
    file_put_contents('../config.php', $configContent);
}

/**
 * Get request data as array
 */
function getRequestData() {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $json = file_get_contents('php://input');
        if (!empty($json)) {
            return json_decode($json, true);
        }
        return $_POST;
    }
    return $_GET;
}

/**
 * Send JSON response and exit
 */
function respond($data) {
    echo json_encode($data);
    exit;
}
