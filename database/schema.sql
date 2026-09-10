CREATE DATABASE IF NOT EXISTS zln_db;

USE zln_db;

CREATE TABLE estates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    guard_contact_number VARCHAR(30),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE residents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    estate_id INT,
    full_name VARCHAR(150) NOT NULL,
    whatsapp_number VARCHAR(30) NOT NULL,
    id_number VARCHAR(50),
    street_address VARCHAR(255),
    unit_or_stand VARCHAR(100),
    password_hash VARCHAR(255) NOT NULL,
    latitude DECIMAL(10,7),
    longitude DECIMAL(10,7),
    account_status ENUM('active','suspended') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (estate_id) REFERENCES estates(id)
);

CREATE TABLE visitor_codes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    resident_id INT NOT NULL,
    code VARCHAR(10) NOT NULL UNIQUE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (resident_id) REFERENCES residents(id)
);

CREATE TABLE alerts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    resident_id INT NOT NULL,
    type ENUM(
        'panic',
        'electricity_outage',
        'water_outage',
        'pothole',
        'illegal_dumping'
    ) NOT NULL,
    status ENUM('active','resolved','pending') DEFAULT 'active',
    latitude DECIMAL(10,7),
    longitude DECIMAL(10,7),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (resident_id) REFERENCES residents(id)
);