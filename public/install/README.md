
# GuíaPG Installation System

This directory contains the installation system for the GuíaPG application, allowing users to easily set up the application on their own web hosting.

## Installation Process

1. Upload all files to your web hosting
2. Navigate to `yoursite.com/install` in your web browser
3. Follow the step-by-step installation wizard:
   - Check server requirements
   - Configure database connection
   - Create admin account
   - Set up site configuration
   - Complete installation

## Requirements

- PHP 7.4 or higher
- MySQL 5.7 or higher
- PDO MySQL extension
- mod_rewrite enabled
- Write permissions for the web server

## Directory Structure

```
/install/
  ├── index.html       # Main installation interface
  ├── install.css      # CSS styles for the installer
  ├── install.js       # JavaScript for the installer
  ├── install.php      # Backend installation script
  ├── .htaccess        # Apache configuration 
  └── README.md        # This file
```

## Notes for Deployment

- After successful installation, it is recommended to remove the `/install` directory for security reasons
- The installer will create a `config.php` file in the root directory with your database connection details
- If the automatic installation fails, manual installation instructions are provided in the documentation

## Using Google Sheets as Database

After completing the initial installation with MySQL, you can switch to using Google Sheets as a database by:

1. Logging into the admin panel
2. Navigating to "Google Sheets" in the admin sidebar
3. Configuring your Google Sheets credentials
4. Following the instructions to set up the Google Apps Script

## Support

For support, please contact support@guiapg.com or visit our documentation at https://docs.guiapg.com
