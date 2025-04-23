
<?php
/**
 * GuíaPG Configuration Template
 * 
 * This file will be used to generate the final config.php file during installation.
 * Do not modify this file directly unless you are developing the application.
 */

// Database configuration
define('DB_HOST', '{{DB_HOST}}');
define('DB_PORT', '{{DB_PORT}}');
define('DB_NAME', '{{DB_NAME}}');
define('DB_USER', '{{DB_USER}}');
define('DB_PASSWORD', '{{DB_PASSWORD}}');
define('DB_PREFIX', '{{DB_PREFIX}}');

// Site configuration
define('SITE_URL', '{{SITE_URL}}');
define('SITE_NAME', '{{SITE_NAME}}');
define('ADMIN_EMAIL', '{{ADMIN_EMAIL}}');

// Security
define('AUTH_KEY', '{{AUTH_KEY}}');
define('SECURE_AUTH_KEY', '{{SECURE_AUTH_KEY}}');
define('LOGGED_IN_KEY', '{{LOGGED_IN_KEY}}');
define('NONCE_KEY', '{{NONCE_KEY}}');
define('AUTH_SALT', '{{AUTH_SALT}}');
define('SECURE_AUTH_SALT', '{{SECURE_AUTH_SALT}}');
define('LOGGED_IN_SALT', '{{LOGGED_IN_SALT}}');
define('NONCE_SALT', '{{NONCE_SALT}}');

// Debug mode (set to false in production)
define('DEBUG_MODE', {{DEBUG_MODE}});

// API configuration
define('USE_API_PROXY', {{USE_API_PROXY}});
define('API_BASE_URL', '{{API_BASE_URL}}');
