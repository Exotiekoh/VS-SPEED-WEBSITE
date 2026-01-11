-- =====================================
-- Anti-Gravity Google Integration Schema
-- =====================================
-- Advanced experimental schema for anti-gravity device management
-- Integrates with Google APIs for telemetry and synchronization

CREATE TABLE IF NOT EXISTS antigravity_configs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  google_api_key VARCHAR(500) NOT NULL,
  enabled BOOLEAN DEFAULT TRUE,
  gravity_multiplier FLOAT DEFAULT 0.0,
  lift_force_coefficient FLOAT DEFAULT 1.0,
  stability_factor FLOAT DEFAULT 0.95,
  max_altitude_m INT DEFAULT 100000,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_enabled (enabled)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS antigravity_devices (
  id INT AUTO_INCREMENT PRIMARY KEY,
  device_id VARCHAR(255) NOT NULL UNIQUE,
  user_id INT,
  config_id INT NOT NULL,
  device_type ENUM('satellite', 'drone', 'aircraft', 'spacecraft', 'experimental') NOT NULL,
  mass_kg FLOAT NOT NULL,
  current_altitude_m FLOAT DEFAULT 0,
  current_velocity_ms FLOAT DEFAULT 0,
  antigravity_intensity FLOAT DEFAULT 0.5,
  power_consumption_watts FLOAT DEFAULT 0,
  status ENUM('inactive', 'activating', 'active', 'deactivating', 'error') DEFAULT 'inactive',
  last_activation TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_user_id (user_id),
  INDEX idx_config_id (config_id),
  INDEX idx_status (status),
  INDEX idx_device_type (device_type),
  FOREIGN KEY (config_id) REFERENCES antigravity_configs(id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS antigravity_telemetry (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  device_id INT NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  altitude_m FLOAT,
  velocity_ms FLOAT,
  acceleration_ms2 FLOAT,
  gravity_offset FLOAT,
  field_strength FLOAT,
  power_status INT,
  temperature_c FLOAT,
  system_health INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_device_timestamp (device_id, timestamp),
  INDEX idx_timestamp (timestamp),
  INDEX idx_altitude (altitude_m),
  FOREIGN KEY (device_id) REFERENCES antigravity_devices(id) ON DELETE CASCADE,
  CONSTRAINT chk_health CHECK (system_health >= 0 AND system_health <= 100),
  CONSTRAINT chk_power CHECK (power_status >= 0 AND power_status <= 100)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS antigravity_google_sync (
  id INT AUTO_INCREMENT PRIMARY KEY,
  device_id INT NOT NULL,
  google_resource_id VARCHAR(500),
  sync_status ENUM('pending', 'synced', 'failed', 'retrying') DEFAULT 'pending',
  last_sync TIMESTAMP NULL,
  sync_count INT DEFAULT 0,
  error_message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_device_id (device_id),
  INDEX idx_sync_status (sync_status),
  INDEX idx_last_sync (last_sync),
  FOREIGN KEY (device_id) REFERENCES antigravity_devices(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS antigravity_events (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  device_id INT NOT NULL,
  event_type ENUM('activation', 'deactivation', 'altitude_change', 'power_surge', 'field_anomaly', 'sync_error', 'calibration') NOT NULL,
  severity ENUM('info', 'warning', 'critical') DEFAULT 'info',
  description TEXT,
  metadata JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_device_event (device_id, event_type),
  INDEX idx_severity (severity),
  INDEX idx_created_at (created_at),
  FOREIGN KEY (device_id) REFERENCES antigravity_devices(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================
-- Default Configurations
-- =====================================

INSERT INTO antigravity_configs (name, google_api_key, enabled, gravity_multiplier, lift_force_coefficient, stability_factor, max_altitude_m)
VALUES 
  ('default_config', 'YOUR_GOOGLE_API_KEY_HERE', TRUE, 0.0, 1.0, 0.95, 100000),
  ('experimental_high_gravity', 'YOUR_GOOGLE_API_KEY_HERE', FALSE, -0.5, 1.2, 0.85, 150000),
  ('low_orbit_stable', 'YOUR_GOOGLE_API_KEY_HERE', FALSE, -0.3, 0.9, 0.98, 200000);

-- =====================================
-- Sample Device (For Testing)
-- =====================================

INSERT INTO antigravity_devices (device_id, user_id, config_id, device_type, mass_kg, antigravity_intensity, status)
VALUES 
  ('AG-DRONE-001', NULL, 1, 'drone', 5.2, 0.5, 'inactive'),
  ('AG-SAT-ALPHA', NULL, 1, 'satellite', 250.0, 0.3, 'inactive');

-- =====================================
-- Views for Monitoring
-- =====================================

CREATE OR REPLACE VIEW antigravity_active_devices AS
SELECT 
    d.device_id,
    d.device_type,
    d.mass_kg,
    d.current_altitude_m,
    d.current_velocity_ms,
    d.antigravity_intensity,
    d.status,
    c.name AS config_name,
    c.gravity_multiplier,
    d.last_activation
FROM antigravity_devices d
JOIN antigravity_configs c ON d.config_id = c.id
WHERE d.status IN ('activating', 'active');

CREATE OR REPLACE VIEW antigravity_telemetry_summary AS
SELECT 
    d.device_id,
    COUNT(t.id) AS telemetry_records,
    MAX(t.altitude_m) AS max_altitude,
    AVG(t.system_health) AS avg_health,
    MAX(t.timestamp) AS last_reading
FROM antigravity_devices d
LEFT JOIN antigravity_telemetry t ON d.id = t.device_id
GROUP BY d.device_id;

-- =====================================
-- Stored Procedures
-- =====================================

DELIMITER //

CREATE PROCEDURE activate_antigravity_device(
    IN p_device_id VARCHAR(255),
    IN p_intensity FLOAT
)
BEGIN
    DECLARE v_device_pk INT;
    DECLARE v_config_enabled BOOLEAN;
    
    -- Get device primary key and check config
    SELECT d.id, c.enabled INTO v_device_pk, v_config_enabled
    FROM antigravity_devices d
    JOIN antigravity_configs c ON d.config_id = c.id
    WHERE d.device_id = p_device_id;
    
    IF v_config_enabled = FALSE THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Configuration is disabled';
    END IF;
    
    -- Update device status
    UPDATE antigravity_devices
    SET status = 'activating',
        antigravity_intensity = p_intensity,
        last_activation = NOW()
    WHERE device_id = p_device_id;
    
    -- Log activation event
    INSERT INTO antigravity_events (device_id, event_type, severity, description)
    VALUES (v_device_pk, 'activation', 'info', CONCAT('Device activated with intensity: ', p_intensity));
    
    SELECT 'Device activation initiated' AS result;
END //

CREATE PROCEDURE log_telemetry(
    IN p_device_id VARCHAR(255),
    IN p_latitude DECIMAL(10,8),
    IN p_longitude DECIMAL(11,8),
    IN p_altitude FLOAT,
    IN p_velocity FLOAT,
    IN p_acceleration FLOAT,
    IN p_gravity_offset FLOAT,
    IN p_field_strength FLOAT,
    IN p_power_status INT,
    IN p_temperature FLOAT,
    IN p_system_health INT
)
BEGIN
    DECLARE v_device_pk INT;
    
    SELECT id INTO v_device_pk
    FROM antigravity_devices
    WHERE device_id = p_device_id;
    
    INSERT INTO antigravity_telemetry (
        device_id, latitude, longitude, altitude_m, velocity_ms,
        acceleration_ms2, gravity_offset, field_strength,
        power_status, temperature_c, system_health
    ) VALUES (
        v_device_pk, p_latitude, p_longitude, p_altitude, p_velocity,
        p_acceleration, p_gravity_offset, p_field_strength,
        p_power_status, p_temperature, p_system_health
    );
    
    -- Update device current status
    UPDATE antigravity_devices
    SET current_altitude_m = p_altitude,
        current_velocity_ms = p_velocity
    WHERE id = v_device_pk;
END //

DELIMITER ;

-- =====================================
-- Triggers
-- =====================================

DELIMITER //

CREATE TRIGGER after_telemetry_insert
AFTER INSERT ON antigravity_telemetry
FOR EACH ROW
BEGIN
    -- Log critical health warnings
    IF NEW.system_health < 20 THEN
        INSERT INTO antigravity_events (device_id, event_type, severity, description)
        VALUES (NEW.device_id, 'field_anomaly', 'critical', 
                CONCAT('Critical system health: ', NEW.system_health, '%'));
    END IF;
    
    -- Log altitude changes
    IF NEW.altitude_m > 50000 THEN
        INSERT INTO antigravity_events (device_id, event_type, severity, description)
        VALUES (NEW.device_id, 'altitude_change', 'warning', 
                CONCAT('High altitude reached: ', NEW.altitude_m, 'm'));
    END IF;
END //

DELIMITER ;

-- =====================================
-- Indexes for Performance
-- =====================================

-- Additional indexes for common queries
CREATE INDEX idx_telemetry_device_health ON antigravity_telemetry(device_id, system_health);
CREATE INDEX idx_events_severity_timestamp ON antigravity_events(severity, created_at);

-- =====================================
-- End of Anti-Gravity Schema
-- =====================================

SELECT 'Anti-Gravity Google Integration Schema installed successfully!' AS Status;
