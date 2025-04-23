<?php
/**
 * Listings API Endpoint
 * 
 * Handles CRUD operations for listings
 */

// Get request method
$method = $_SERVER['REQUEST_METHOD'];

// Get query parameters
$category = isset($_GET['category']) ? $_GET['category'] : null;
$search = isset($_GET['search']) ? $_GET['search'] : null;
$limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 20;
$offset = isset($_GET['offset']) ? (int)$_GET['offset'] : 0;
$sort = isset($_GET['sort']) ? $_GET['sort'] : 'created_at';
$order = isset($_GET['order']) ? strtoupper($_GET['order']) : 'DESC';

// Allow only valid sort fields and orders
$valid_sort_fields = ['created_at', 'price', 'title'];
$sort = in_array($sort, $valid_sort_fields) ? $sort : 'created_at';
$order = in_array($order, ['ASC', 'DESC']) ? $order : 'DESC';

switch ($method) {
    case 'GET':
        // Read operation
        if ($id) {
            // Get a specific listing
            $stmt = $pdo->prepare("
                SELECT l.*, 
                       u.username as seller_name, 
                       u.email as seller_email 
                FROM " . DB_PREFIX . "listings l
                LEFT JOIN " . DB_PREFIX . "users u ON l.user_id = u.id
                WHERE l.id = :id
                LIMIT 1
            ");
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
            $stmt->execute();
            
            $listing = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if (!$listing) {
                http_response_code(404);
                echo json_encode(['error' => 'Listing not found']);
                exit;
            }
            
            // Get images for this listing
            $img_stmt = $pdo->prepare("
                SELECT id, file_name, is_featured 
                FROM " . DB_PREFIX . "images 
                WHERE listing_id = :listing_id
            ");
            $img_stmt->bindParam(':listing_id', $id, PDO::PARAM_INT);
            $img_stmt->execute();
            
            $listing['images'] = [];
            while ($image = $img_stmt->fetch(PDO::FETCH_ASSOC)) {
                $listing['images'][] = [
                    'id' => $image['id'],
                    'url' => SITE_URL . '/uploads/' . $image['file_name'],
                    'is_featured' => (bool)$image['is_featured']
                ];
            }
            
            // Get extra fields based on category
            switch ($listing['category']) {
                case 'imoveis':
                    $detail_stmt = $pdo->prepare("
                        SELECT * FROM " . DB_PREFIX . "real_estate_details 
                        WHERE listing_id = :listing_id
                    ");
                    break;
                case 'autos':
                    $detail_stmt = $pdo->prepare("
                        SELECT * FROM " . DB_PREFIX . "vehicle_details 
                        WHERE listing_id = :listing_id
                    ");
                    break;
                // Add other categories as needed
            }
            
            if (isset($detail_stmt)) {
                $detail_stmt->bindParam(':listing_id', $id, PDO::PARAM_INT);
                $detail_stmt->execute();
                $details = $detail_stmt->fetch(PDO::FETCH_ASSOC);
                
                if ($details) {
                    $listing = array_merge($listing, $details);
                }
            }
            
            echo json_encode($listing);
            
        } else {
            // Get multiple listings
            $params = [];
            $where_clauses = ["status = 'active'"];
            
            // Filter by category if provided
            if ($category && $category !== 'all') {
                $where_clauses[] = "category = :category";
                $params[':category'] = $category;
            }
            
            // Add search functionality
            if ($search) {
                $where_clauses[] = "(title LIKE :search OR description LIKE :search)";
                $params[':search'] = "%$search%";
            }
            
            // Build the WHERE clause
            $where_clause = implode(' AND ', $where_clauses);
            
            // Build query to get listings
            $query = "
                SELECT l.*, 
                       u.username as seller_name
                FROM " . DB_PREFIX . "listings l
                LEFT JOIN " . DB_PREFIX . "users u ON l.user_id = u.id
                WHERE $where_clause
                ORDER BY $sort $order
                LIMIT :limit OFFSET :offset
            ";
            
            // Execute the query
            $stmt = $pdo->prepare($query);
            foreach ($params as $key => $val) {
                $stmt->bindValue($key, $val);
            }
            $stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
            $stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
            $stmt->execute();
            
            $listings = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            // Get subcategories for this category
            $subcategories = [];
            if ($category && $category !== 'all') {
                $subcat_stmt = $pdo->prepare("
                    SELECT DISTINCT subcategory 
                    FROM " . DB_PREFIX . "listings 
                    WHERE category = :category AND subcategory IS NOT NULL
                ");
                $subcat_stmt->bindParam(':category', $category);
                $subcat_stmt->execute();
                
                while ($row = $subcat_stmt->fetch(PDO::FETCH_ASSOC)) {
                    $subcategories[] = $row['subcategory'];
                }
            }
            
            // Get total count for pagination
            $count_query = "SELECT COUNT(*) FROM " . DB_PREFIX . "listings WHERE $where_clause";
            $count_stmt = $pdo->prepare($count_query);
            foreach ($params as $key => $val) {
                $count_stmt->bindValue($key, $val);
            }
            $count_stmt->execute();
            $total_items = $count_stmt->fetchColumn();
            
            // Add image URLs to each listing
            foreach ($listings as &$listing) {
                // Get the featured image
                $img_stmt = $pdo->prepare("
                    SELECT file_name 
                    FROM " . DB_PREFIX . "images 
                    WHERE listing_id = :listing_id 
                    ORDER BY is_featured DESC 
                    LIMIT 1
                ");
                $img_stmt->bindParam(':listing_id', $listing['id'], PDO::PARAM_INT);
                $img_stmt->execute();
                
                $image = $img_stmt->fetch(PDO::FETCH_ASSOC);
                
                $listing['image'] = $image ? SITE_URL . '/uploads/' . $image['file_name'] : null;
                $listing['images'] = [$listing['image']]; // For compatibility with existing code
            }
            
            echo json_encode([
                'listings' => $listings,
                'subcategories' => $subcategories,
                'pagination' => [
                    'total_items' => (int)$total_items,
                    'limit' => $limit,
                    'offset' => $offset
                ]
            ]);
        }
        break;
        
    case 'POST':
        // Create operation
        if (!isAuthenticated()) {
            http_response_code(401);
            echo json_encode(['error' => 'Authentication required']);
            exit;
        }
        
        // Get JSON data
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (!$data) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid request data']);
            exit;
        }
        
        // Start a transaction
        $pdo->beginTransaction();
        
        try {
            // Insert into listings table
            $stmt = $pdo->prepare("
                INSERT INTO " . DB_PREFIX . "listings (
                    title, description, price, category, subcategory, 
                    user_id, status, contact_phone, contact_email, 
                    address, city, state, zipcode, latitude, longitude
                ) VALUES (
                    :title, :description, :price, :category, :subcategory,
                    :user_id, :status, :contact_phone, :contact_email,
                    :address, :city, :state, :zipcode, :latitude, :longitude
                )
            ");
            
            $status = isAdmin() ? 'active' : 'pending';
            $userId = getCurrentUserId();
            
            $stmt->bindParam(':title', $data['title']);
            $stmt->bindParam(':description', $data['description']);
            $stmt->bindParam(':price', $data['price']);
            $stmt->bindParam(':category', $data['category']);
            $stmt->bindParam(':subcategory', $data['subcategory']);
            $stmt->bindParam(':user_id', $userId);
            $stmt->bindParam(':status', $status);
            $stmt->bindParam(':contact_phone', $data['contact_phone']);
            $stmt->bindParam(':contact_email', $data['contact_email']);
            $stmt->bindParam(':address', $data['address']);
            $stmt->bindParam(':city', $data['city']);
            $stmt->bindParam(':state', $data['state']);
            $stmt->bindParam(':zipcode', $data['zipcode']);
            $stmt->bindParam(':latitude', $data['latitude']);
            $stmt->bindParam(':longitude', $data['longitude']);
            
            $stmt->execute();
            $listingId = $pdo->lastInsertId();
            
            // Handle category-specific details
            switch ($data['category']) {
                case 'imoveis':
                    $detail_stmt = $pdo->prepare("
                        INSERT INTO " . DB_PREFIX . "real_estate_details (
                            listing_id, property_type, bedrooms, bathrooms, 
                            area, area_unit, year_built, purpose
                        ) VALUES (
                            :listing_id, :property_type, :bedrooms, :bathrooms,
                            :area, :area_unit, :year_built, :purpose
                        )
                    ");
                    
                    $detail_stmt->bindParam(':listing_id', $listingId);
                    $detail_stmt->bindParam(':property_type', $data['property_type']);
                    $detail_stmt->bindParam(':bedrooms', $data['bedrooms']);
                    $detail_stmt->bindParam(':bathrooms', $data['bathrooms']);
                    $detail_stmt->bindParam(':area', $data['area']);
                    $detail_stmt->bindParam(':area_unit', $data['area_unit']);
                    $detail_stmt->bindParam(':year_built', $data['year_built']);
                    $detail_stmt->bindParam(':purpose', $data['purpose']);
                    
                    $detail_stmt->execute();
                    break;
                    
                case 'autos':
                    $detail_stmt = $pdo->prepare("
                        INSERT INTO " . DB_PREFIX . "vehicle_details (
                            listing_id, make, model, year, mileage,
                            fuel_type, transmission, color, condition
                        ) VALUES (
                            :listing_id, :make, :model, :year, :mileage,
                            :fuel_type, :transmission, :color, :condition
                        )
                    ");
                    
                    $detail_stmt->bindParam(':listing_id', $listingId);
                    $detail_stmt->bindParam(':make', $data['make']);
                    $detail_stmt->bindParam(':model', $data['model']);
                    $detail_stmt->bindParam(':year', $data['year']);
                    $detail_stmt->bindParam(':mileage', $data['mileage']);
                    $detail_stmt->bindParam(':fuel_type', $data['fuel_type']);
                    $detail_stmt->bindParam(':transmission', $data['transmission']);
                    $detail_stmt->bindParam(':color', $data['color']);
                    $detail_stmt->bindParam(':condition', $data['condition']);
                    
                    $detail_stmt->execute();
                    break;
            }
            
            // Process images if provided
            if (!empty($data['images'])) {
                foreach ($data['images'] as $index => $image) {
                    // Save image file and get filename
                    $filename = saveImageFile($image);
                    
                    // Insert image record
                    $img_stmt = $pdo->prepare("
                        INSERT INTO " . DB_PREFIX . "images (
                            listing_id, file_name, is_featured
                        ) VALUES (
                            :listing_id, :file_name, :is_featured
                        )
                    ");
                    
                    $isFeatured = ($index === 0) ? 1 : 0;
                    
                    $img_stmt->bindParam(':listing_id', $listingId);
                    $img_stmt->bindParam(':file_name', $filename);
                    $img_stmt->bindParam(':is_featured', $isFeatured);
                    
                    $img_stmt->execute();
                }
            }
            
            // Commit the transaction
            $pdo->commit();
            
            // Get the complete listing with all relations
            $stmt = $pdo->prepare("
                SELECT * FROM " . DB_PREFIX . "listings
                WHERE id = :id
            ");
            $stmt->bindParam(':id', $listingId);
            $stmt->execute();
            
            $listing = $stmt->fetch(PDO::FETCH_ASSOC);
            
            http_response_code(201); // Created
            echo json_encode([
                'message' => 'Listing created successfully',
                'id' => $listingId,
                'listing' => $listing
            ]);
            
        } catch (Exception $e) {
            // Rollback the transaction on error
            $pdo->rollBack();
            
            http_response_code(500);
            echo json_encode([
                'error' => 'Failed to create listing',
                'message' => DEBUG_MODE ? $e->getMessage() : 'An error occurred'
            ]);
        }
        break;
        
    case 'PUT':
        // Update operation
        if (!$id) {
            http_response_code(400);
            echo json_encode(['error' => 'Listing ID is required']);
            exit;
        }
        
        if (!isAuthenticated()) {
            http_response_code(401);
            echo json_encode(['error' => 'Authentication required']);
            exit;
        }
        
        // Get JSON data
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (!$data) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid request data']);
            exit;
        }
        
        // Check if user owns this listing or is admin
        if (!canEditListing($id)) {
            http_response_code(403);
            echo json_encode(['error' => 'You do not have permission to edit this listing']);
            exit;
        }
        
        // Start a transaction
        $pdo->beginTransaction();
        
        try {
            // Update listings table
            $sql = "UPDATE " . DB_PREFIX . "listings SET ";
            $updateFields = [];
            $params = [':id' => $id];
            
            // Dynamically build the update fields
            $allowedFields = ['title', 'description', 'price', 'subcategory', 
                             'status', 'contact_phone', 'contact_email', 
                             'address', 'city', 'state', 'zipcode', 
                             'latitude', 'longitude', 'featured'];
                             
            foreach ($allowedFields as $field) {
                if (isset($data[$field])) {
                    $updateFields[] = "$field = :$field";
                    $params[":$field"] = $data[$field];
                }
            }
            
            // Add updated_at timestamp
            $updateFields[] = "updated_at = NOW()";
            
            // If no fields to update, just return success
            if (empty($updateFields)) {
                $pdo->commit();
                echo json_encode(['success' => true, 'message' => 'No changes made']);
                exit;
            }
            
            $sql .= implode(', ', $updateFields);
            $sql .= " WHERE id = :id";
            
            $stmt = $pdo->prepare($sql);
            $stmt->execute($params);
            
            // Update category-specific details
            switch ($data['category']) {
                case 'imoveis':
                    // Check if record exists
                    $check_stmt = $pdo->prepare("SELECT COUNT(*) FROM " . DB_PREFIX . "real_estate_details WHERE listing_id = :id");
                    $check_stmt->bindParam(':id', $id);
                    $check_stmt->execute();
                    
                    if ($check_stmt->fetchColumn() > 0) {
                        // Update existing record
                        $detail_sql = "UPDATE " . DB_PREFIX . "real_estate_details SET ";
                        $detailFields = [];
                        $detailParams = [':listing_id' => $id];
                        
                        $detailAllowedFields = ['property_type', 'bedrooms', 'bathrooms', 
                                              'area', 'area_unit', 'year_built', 'purpose'];
                                              
                        foreach ($detailAllowedFields as $field) {
                            if (isset($data[$field])) {
                                $detailFields[] = "$field = :$field";
                                $detailParams[":$field"] = $data[$field];
                            }
                        }
                        
                        if (!empty($detailFields)) {
                            $detail_sql .= implode(', ', $detailFields);
                            $detail_sql .= " WHERE listing_id = :listing_id";
                            
                            $detail_stmt = $pdo->prepare($detail_sql);
                            $detail_stmt->execute($detailParams);
                        }
                    } else {
                        // Insert new record
                        $detail_stmt = $pdo->prepare("
                            INSERT INTO " . DB_PREFIX . "real_estate_details (
                                listing_id, property_type, bedrooms, bathrooms, 
                                area, area_unit, year_built, purpose
                            ) VALUES (
                                :listing_id, :property_type, :bedrooms, :bathrooms,
                                :area, :area_unit, :year_built, :purpose
                            )
                        ");
                        
                        $detail_stmt->bindParam(':listing_id', $id);
                        $detail_stmt->bindParam(':property_type', $data['property_type']);
                        $detail_stmt->bindParam(':bedrooms', $data['bedrooms']);
                        $detail_stmt->bindParam(':bathrooms', $data['bathrooms']);
                        $detail_stmt->bindParam(':area', $data['area']);
                        $detail_stmt->bindParam(':area_unit', $data['area_unit']);
                        $detail_stmt->bindParam(':year_built', $data['year_built']);
                        $detail_stmt->bindParam(':purpose', $data['purpose']);
                        
                        $detail_stmt->execute();
                    }
                    break;
                    
                // Other categories follow the same pattern...
            }
            
            // Handle images if provided
            if (!empty($data['images'])) {
                // New images to add
                foreach ($data['images'] as $image) {
                    // Skip existing images (those with an id)
                    if (isset($image['id'])) continue;
                    
                    // Save image file and get filename
                    $filename = saveImageFile($image['data']);
                    
                    // Insert image record
                    $img_stmt = $pdo->prepare("
                        INSERT INTO " . DB_PREFIX . "images (
                            listing_id, file_name, is_featured
                        ) VALUES (
                            :listing_id, :file_name, :is_featured
                        )
                    ");
                    
                    $isFeatured = !empty($image['is_featured']) ? 1 : 0;
                    
                    $img_stmt->bindParam(':listing_id', $id);
                    $img_stmt->bindParam(':file_name', $filename);
                    $img_stmt->bindParam(':is_featured', $isFeatured);
                    
                    $img_stmt->execute();
                }
            }
            
            // Delete images if specified
            if (!empty($data['delete_images'])) {
                foreach ($data['delete_images'] as $imageId) {
                    // Get filename first
                    $img_stmt = $pdo->prepare("
                        SELECT file_name FROM " . DB_PREFIX . "images
                        WHERE id = :id AND listing_id = :listing_id
                    ");
                    $img_stmt->bindParam(':id', $imageId);
                    $img_stmt->bindParam(':listing_id', $id);
                    $img_stmt->execute();
                    
                    $image = $img_stmt->fetch(PDO::FETCH_ASSOC);
                    
                    if ($image) {
                        // Delete the file
                        $filepath = '../uploads/' . $image['file_name'];
                        if (file_exists($filepath)) {
                            unlink($filepath);
                        }
                        
                        // Delete the database record
                        $del_stmt = $pdo->prepare("
                            DELETE FROM " . DB_PREFIX . "images
                            WHERE id = :id AND listing_id = :listing_id
                        ");
                        $del_stmt->bindParam(':id', $imageId);
                        $del_stmt->bindParam(':listing_id', $id);
                        $del_stmt->execute();
                    }
                }
            }
            
            // Update featured image if specified
            if (!empty($data['featured_image_id'])) {
                // First, set all images as not featured
                $reset_stmt = $pdo->prepare("
                    UPDATE " . DB_PREFIX . "images
                    SET is_featured = 0
                    WHERE listing_id = :listing_id
                ");
                $reset_stmt->bindParam(':listing_id', $id);
                $reset_stmt->execute();
                
                // Then set the specified image as featured
                $feat_stmt = $pdo->prepare("
                    UPDATE " . DB_PREFIX . "images
                    SET is_featured = 1
                    WHERE id = :image_id AND listing_id = :listing_id
                ");
                $feat_stmt->bindParam(':image_id', $data['featured_image_id']);
                $feat_stmt->bindParam(':listing_id', $id);
                $feat_stmt->execute();
            }
            
            // Commit the transaction
            $pdo->commit();
            
            echo json_encode(['success' => true, 'message' => 'Listing updated successfully']);
            
        } catch (Exception $e) {
            // Rollback the transaction on error
            $pdo->rollBack();
            
            http_response_code(500);
            echo json_encode([
                'error' => 'Failed to update listing',
                'message' => DEBUG_MODE ? $e->getMessage() : 'An error occurred'
            ]);
        }
        break;
        
    case 'DELETE':
        // Delete operation
        if (!$id) {
            http_response_code(400);
            echo json_encode(['error' => 'Listing ID is required']);
            exit;
        }
        
        if (!isAuthenticated()) {
            http_response_code(401);
            echo json_encode(['error' => 'Authentication required']);
            exit;
        }
        
        // Check if user owns this listing or is admin
        if (!canEditListing($id)) {
            http_response_code(403);
            echo json_encode(['error' => 'You do not have permission to delete this listing']);
            exit;
        }
        
        // Start a transaction
        $pdo->beginTransaction();
        
        try {
            // Get all images for this listing
            $img_stmt = $pdo->prepare("
                SELECT file_name FROM " . DB_PREFIX . "images
                WHERE listing_id = :listing_id
            ");
            $img_stmt->bindParam(':listing_id', $id);
            $img_stmt->execute();
            
            $images = $img_stmt->fetchAll(PDO::FETCH_COLUMN);
            
            // Delete image files
            foreach ($images as $filename) {
                $filepath = '../uploads/' . $filename;
                if (file_exists($filepath)) {
                    unlink($filepath);
                }
            }
            
            // Delete from database (cascade will handle related tables)
            $stmt = $pdo->prepare("
                DELETE FROM " . DB_PREFIX . "listings
                WHERE id = :id
            ");
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            
            // Commit the transaction
            $pdo->commit();
            
            echo json_encode(['success' => true, 'message' => 'Listing deleted successfully']);
            
        } catch (Exception $e) {
            // Rollback the transaction on error
            $pdo->rollBack();
            
            http_response_code(500);
            echo json_encode([
                'error' => 'Failed to delete listing',
                'message' => DEBUG_MODE ? $e->getMessage() : 'An error occurred'
            ]);
        }
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        break;
}

// Helper function to check if user can edit a listing
function canEditListing($listingId) {
    global $pdo;
    
    // Admins can edit any listing
    if (isAdmin()) {
        return true;
    }
    
    $userId = getCurrentUserId();
    
    // Check if user owns the listing
    $stmt = $pdo->prepare("
        SELECT COUNT(*) FROM " . DB_PREFIX . "listings
        WHERE id = :listing_id AND user_id = :user_id
    ");
    $stmt->bindParam(':listing_id', $listingId);
    $stmt->bindParam(':user_id', $userId);
    $stmt->execute();
    
    return $stmt->fetchColumn() > 0;
}

// Helper function to save an image from base64 data
function saveImageFile($base64Image) {
    $data = explode(',', $base64Image);
    $image_data = base64_decode(end($data));
    
    $filename = uniqid() . '.jpg';
    $filepath = '../uploads/' . $filename;
    
    // Ensure the uploads directory exists
    if (!file_exists('../uploads')) {
        mkdir('../uploads', 0755, true);
    }
    
    file_put_contents($filepath, $image_data);
    
    return $filename;
}

// Helper functions for authentication
function isAuthenticated() {
    // Check for a valid session or token
    return isset($_SESSION['user_id']) || isValidApiToken();
}

function isAdmin() {
    // Check if the current user is an admin
    if (isset($_SESSION['user_role']) && $_SESSION['user_role'] === 'admin') {
        return true;
    }
    
    // Check admin status via API token
    if (isValidApiToken()) {
        global $pdo;
        
        $token = getApiToken();
        $stmt = $pdo->prepare("
            SELECT u.role FROM " . DB_PREFIX . "api_tokens t
            JOIN " . DB_PREFIX . "users u ON t.user_id = u.id
            WHERE t.token = :token AND t.expires_at > NOW()
        ");
        $stmt->bindParam(':token', $token);
        $stmt->execute();
        
        $role = $stmt->fetchColumn();
        return $role === 'admin';
    }
    
    return false;
}

function getCurrentUserId() {
    // Get the current user's ID
    if (isset($_SESSION['user_id'])) {
        return $_SESSION['user_id'];
    }
    
    // Get user ID from API token
    if (isValidApiToken()) {
        global $pdo;
        
        $token = getApiToken();
        $stmt = $pdo->prepare("
            SELECT user_id FROM " . DB_PREFIX . "api_tokens
            WHERE token = :token AND expires_at > NOW()
        ");
        $stmt->bindParam(':token', $token);
        $stmt->execute();
        
        return $stmt->fetchColumn();
    }
    
    return null;
}

function isValidApiToken() {
    // Check if the API token is valid
    $token = getApiToken();
    
    if (!$token) {
        return false;
    }
    
    global $pdo;
    
    $stmt = $pdo->prepare("
        SELECT COUNT(*) FROM " . DB_PREFIX . "api_tokens
        WHERE token = :token AND expires_at > NOW()
    ");
    $stmt->bindParam(':token', $token);
    $stmt->execute();
    
    return $stmt->fetchColumn() > 0;
}

function getApiToken() {
    // Get the API token from the Authorization header
    $headers = getallheaders();
    
    if (isset($headers['Authorization'])) {
        $auth = $headers['Authorization'];
        
        if (preg_match('/Bearer\s+(.+)/', $auth, $matches)) {
            return $matches[1];
        }
    }
    
    return null;
}
