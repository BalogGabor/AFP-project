CREATE DATABASE IF NOT EXISTS veload
CHARACTER SET utf8mb4
COLLATE utf8mb4_hungarian_ci;

USE veload;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(30) NOT NULL,
    role ENUM('szallito', 'megbizo') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS cargo_offers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,

    cargo_type VARCHAR(50) NOT NULL,
    weight_kg DECIMAL(10,2) NOT NULL,
    volume_info VARCHAR(255) NOT NULL,

    loading_country VARCHAR(100) NOT NULL,
    loading_city VARCHAR(100) NOT NULL,
    unloading_country VARCHAR(100) NOT NULL,
    unloading_city VARCHAR(100) NOT NULL,

    loading_date DATE NOT NULL,
    unloading_date DATE NOT NULL,

    target_price DECIMAL(12,2) NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS vehicle_capacity (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,

    vehicle_type VARCHAR(50) NOT NULL,
    body_type VARCHAR(50) NOT NULL,
    max_weight_kg DECIMAL(10,2) NOT NULL,
    license_plate VARCHAR(20) NOT NULL,
    free_space_info VARCHAR(255) NOT NULL,

    departure_country VARCHAR(100) NOT NULL,
    departure_city VARCHAR(100) NOT NULL,
    destination_country VARCHAR(100) NOT NULL,
    destination_city VARCHAR(100) NOT NULL,

    available_from DATE NOT NULL,
    available_to DATE NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id)
);
