-- ============================================
-- VSSPEED.IO - Issue-Based Diagnostic Database
-- Maps symptoms/issues to solutions and parts
-- ============================================

-- ============================================
-- PERFORMANCE ISSUES DATABASE
-- ============================================

CREATE TABLE performance_issues (
    id SERIAL PRIMARY KEY,
    
    -- Issue Classification
    issue_code VARCHAR(20) UNIQUE NOT NULL, -- e.g., "BOOST_LOW", "MISFIRE_RANDOM"
    issue_category VARCHAR(50) NOT NULL CHECK (issue_category IN (
        'power_loss', 'rough_idle', 'overheating', 'poor_fuel_economy',
        'check_engine_light', 'transmission', 'suspension', 'brakes',
        'electrical', 'turbo', 'exhaust', 'intake'
    )),
    
    -- User-Facing Info
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    
    -- Symptoms
    symptoms TEXT[], -- Array of common symptoms
    affected_components TEXT[], -- Parts typically involved
    
    -- Severity
    severity VARCHAR(20) CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    urgency VARCHAR(20) CHECK (urgency IN ('immediate', 'soon', 'when_convenient', 'monitor')),
    safe_to_drive BOOLEAN DEFAULT TRUE,
    
    -- Common Causes
    common_causes JSONB,
    /* Format:
    {
        "causes": [
            {
                "cause": "Wastegate rattle",
                "likelihood": "80%",
                "affected_makes": ["BMW"],
                "affected_models": ["335i", "135i"],
                "mileage_range": "80k-120k"
            }
        ]
    }
    */
    
    -- Vehicle Applicability
    applicable_makes TEXT[],
    applicable_models TEXT[],
    applicable_engines TEXT[],
    
    created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- SOLUTIONS DATABASE
-- ============================================

CREATE TABLE issue_solutions (
    id SERIAL PRIMARY KEY,
    issue_id INT REFERENCES performance_issues(id) ON DELETE CASCADE,
    
    -- Solution Details
    solution_type VARCHAR(50) CHECK (solution_type IN (
        'part_replacement', 'tune', 'maintenance', 'diagnostic',
        'upgrade', 'repair', 'calibration'
    )),
    
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    
    -- Effectiveness
    success_rate INT CHECK (success_rate >= 0 AND success_rate <= 100),
    priority INT CHECK (priority >= 1 AND priority <= 5), -- 1 = try first
    
    -- Cost Analysis
    estimated_cost_min DECIMAL(10,2),
    estimated_cost_max DECIMAL(10,2),
    labor_hours DECIMAL(4,1),
    
    -- Difficulty
    diy_difficulty VARCHAR(20) CHECK (diy_difficulty IN ('easy', 'medium', 'hard', 'professional')),
    tools_required TEXT[],
    
    -- Expected Outcome
    fixes_completely BOOLEAN DEFAULT FALSE,
    improvement_percentage INT, -- Expected improvement
    
    -- Related Parts
    required_parts JSONB,
    /* Format:
    [
        {
            "part_id": 123,
            "quantity": 1,
            "optional": false
        }
    ]
    */
    
    -- Instructions
    procedure_summary TEXT,
    warnings TEXT[],
    
    created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- TUNING RECOMMENDATIONS
-- ============================================

CREATE TABLE tuning_recommendations (
    id SERIAL PRIMARY KEY,
    
    -- Performance Goal
    goal_type VARCHAR(50) NOT NULL CHECK (goal_type IN (
        'add_horsepower', 'improve_throttle_response', 'better_fuel_economy',
        'track_performance', 'daily_drivability', 'towing_capacity',
        'drag_racing', 'autocross', 'reliability'
    )),
    
    goal_description VARCHAR(500),
    target_power INT, -- If applicable
    
    -- Vehicle Specification
    make VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    engine VARCHAR(100) NOT NULL,
    year_range INT[], -- e.g., [2011, 2016]
    
    -- Recommended Path
    stage VARCHAR(20) CHECK (stage IN ('1', '1+', '2', '2+', '3', 'custom')),
    
    required_mods JSONB,
    /* Format:
    [
        {
            "step": 1,
            "mod_name": "Front Mount Intercooler",
            "reason": "Prevents heat soak",
            "cost_range": "$600-900",
            "hp_gain": "20-40",
            "part_ids": [101, 102],
            "required": true
        }
    ]
    */
    
    optional_mods JSONB,
    supporting_mods JSONB,
    
    -- Expected Results
    estimated_hp_gain_min INT,
    estimated_hp_gain_max INT,
    estimated_tq_gain_min INT,
    estimated_tq_gain_max INT,
    
    -- Budget
    total_cost_min DECIMAL(10,2),
    total_cost_max DECIMAL(10,2),
    
    -- Reliability Impact
    reliability_score INT CHECK (reliability_score >= 1 AND reliability_score <= 10),
    reliability_notes TEXT,
    
    -- Requirements
    octane_requirement VARCHAR(20),
    fuel_type VARCHAR(50),
    requires_dyno_tune BOOLEAN DEFAULT FALSE,
    
    -- Warnings
    legal_considerations TEXT[],
    warranty_impact TEXT,
    maintenance_notes TEXT[],
    
    created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- MAINTENANCE SCHEDULES
-- ============================================

CREATE TABLE maintenance_schedules (
    id SERIAL PRIMARY KEY,
    
    -- Vehicle Specification
    make VARCHAR(100),
    model VARCHAR(100),
    engine VARCHAR(100),
    modification_level VARCHAR(20) CHECK (modification_level IN ('stock', 'stage_1', 'stage_2', 'stage_3')),
    
    -- Maintenance Item
    item_name VARCHAR(200) NOT NULL,
    item_category VARCHAR(50) CHECK (item_category IN (
        'oil_change', 'filter_replacement', 'fluid_change', 'inspection',
        'cleaning', 'calibration', 'replacement', 'adjustment'
    )),
    
    -- Schedule
    interval_miles INT,
    interval_months INT,
    interval_description VARCHAR(200), -- e.g., "Every track day" or "Annually"
    
    -- Importance
    importance VARCHAR(20) CHECK (importance IN ('critical', 'recommended', 'optional')),
    skip_consequence TEXT, -- What happens if you skip it
    
    -- Cost
    estimated_cost DECIMAL(10,2),
    estimated_time_hours DECIMAL(4,1),
    
    -- Parts Required
    required_parts JSONB,
    
    -- Instructions
    procedure_notes TEXT,
    diy_friendly BOOLEAN DEFAULT TRUE,
    
    created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- DIAGNOSTIC TROUBLE CODES (DTC) EXPANDED
-- ============================================

CREATE TABLE dtc_solutions (
    id SERIAL PRIMARY KEY,
    dtc_code VARCHAR(10) REFERENCES dtc_codes(code) ON DELETE CASCADE,
    
    -- Specific to Vehicle
    make VARCHAR(100),
    model VARCHAR(100),
    engine VARCHAR(100),
    
    -- Solution Specific to This Vehicle
    most_common_fix VARCHAR(500),
    fix_success_rate INT,
    
    -- Parts Typically Needed
    common_parts JSONB,
    /* Format:
    [
        {
            "part_name": "Oxygen Sensor",
            "part_id": 456,
            "likelihood": "90%"
        }
    ]
    */
    
    -- Diagnostic Steps
    diagnostic_procedure TEXT,
    
    -- Cost for This Vehicle
    typical_repair_cost DECIMAL(10,2),
    
    created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- PARTS COMPATIBILITY MATRIX
-- ============================================

CREATE TABLE parts_compatibility (
    id SERIAL PRIMARY KEY,
    part_id INT REFERENCES parts_catalog(id) ON DELETE CASCADE,
    
    -- Compatibility
    make VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    year_min INT,
    year_max INT,
    engine VARCHAR(100),
    trim VARCHAR(100),
    
    -- Fitment Notes
    direct_fit BOOLEAN DEFAULT TRUE,
    modification_required VARCHAR(500),
    
    -- Performance Impact
    power_gain_min INT,
    power_gain_max INT,
    torque_gain_min INT,
    torque_gain_max INT,
    
    -- Installation
    install_difficulty VARCHAR(20),
    install_time_hours DECIMAL(4,1),
    requires_tune BOOLEAN DEFAULT FALSE,
    
    -- User Feedback
    avg_rating DECIMAL(3,2),
    total_installs INT DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- SAMPLE DATA - COMMON ISSUES
-- ============================================

INSERT INTO performance_issues (issue_code, issue_category, title, description, symptoms, severity, urgency, safe_to_drive, common_causes, applicable_makes, applicable_models, applicable_engines)
VALUES
('BOOST_LOW', 'turbo', 'Low Boost Pressure / Power Loss', 
 'Vehicle is not producing expected boost pressure, resulting in reduced power output.',
 ARRAY['Sluggish acceleration', 'High IATs', 'Wastegate rattle', 'Check engine light P0299'],
 'high', 'soon', TRUE,
 '{"causes": [
    {"cause": "Wastegate stuck open", "likelihood": "60%", "affected_makes": ["BMW"], "mileage_range": "80k-120k"},
    {"cause": "Boost leak (charge pipe)", "likelihood": "30%", "affected_makes": ["BMW", "Audi", "VW"], "mileage_range": "any"},
    {"cause": "Turbo failure", "likelihood": "10%", "affected_makes": ["all"], "mileage_range": "150k+"}
 ]}'::jsonb,
 ARRAY['BMW', 'Audi', 'VW'],
 ARRAY['335i', '135i', '535i', 'A4', 'GTI'],
 ARRAY['N54', 'N55', '2.0T', 'EA888']
),

('MISFIRE_RANDOM', 'power_loss', 'Random Cylinder Misfires (P0300)',
 'Engine misfiring on multiple cylinders with no specific pattern.',
 ARRAY['Rough idle', 'Hesitation', 'Check engine light', 'Reduced power', 'Fuel smell'],
 'high', 'soon', FALSE,
 '{"causes": [
    {"cause": "Bad ignition coils", "likelihood": "70%", "affected_makes": ["BMW", "Audi"], "mileage_range": "60k+"},
    {"cause": "Worn spark plugs", "likelihood": "50%", "affected_makes": ["all"], "mileage_range": "30k+"},
    {"cause": "Carbon buildup", "likelihood": "40%", "affected_makes": ["BMW", "Audi", "VW"], "mileage_range": "80k+"},
    {"cause": "Fuel injector failure", "likelihood": "20%", "affected_makes": ["BMW"], "mileage_range": "100k+"}
 ]}'::jsonb,
 ARRAY['BMW', 'Audi', 'VW', 'Mercedes'],
 ARRAY['335i', 'A4', 'GTI', 'C300'],
 ARRAY['N54', 'N55', '2.0T', 'M274']
),

('OVERHEAT_TRACK', 'overheating', 'Overheating During Track Use',
 'Coolant temperature exceeds safe limits during spirited driving or track days.',
 ARRAY['Temperature gauge rising', 'Limp mode', 'Steam from engine', 'Coolant warning light'],
 'critical', 'immediate', FALSE,
 '{"causes": [
    {"cause": "Inadequate cooling capacity", "likelihood": "80%", "affected_makes": ["all"], "mileage_range": "any"},
    {"cause": "Air pockets in cooling system", "likelihood": "30%", "affected_makes": ["BMW"], "mileage_range": "any"},
    {"cause": "Thermostat failure", "likelihood": "20%", "affected_makes": ["all"], "mileage_range": "60k+"}
 ]}'::jsonb,
 ARRAY['BMW', 'Audi', 'Porsche'],
 ARRAY['M3', 'M4', 'S4', 'Cayman'],
 ARRAY['S55', 'S58', 'EA839', '991']
);

-- ============================================
-- SAMPLE SOLUTIONS
-- ============================================

INSERT INTO issue_solutions (issue_id, solution_type, title, description, success_rate, priority, estimated_cost_min, estimated_cost_max, labor_hours, diy_difficulty, fixes_completely, improvement_percentage)
VALUES
(1, 'diagnostic', 'Boost Leak Test', 
 'Pressurize intake system to identify leaks in charge pipe, intercooler connections, or turbo seals.',
 95, 1, 0, 50, 0.5, 'easy', FALSE, 0
),

(1, 'part_replacement', 'Replace Wastegate Actuators',
 'Install upgraded wastegate actuators to restore proper boost control. Common fix for N54/N55 engines.',
 90, 2, 400, 800, 2.0, 'medium', TRUE, 100
),

(1, 'part_replacement', 'Upgraded Aluminum Charge Pipe',
 'Replace failure-prone plastic charge pipe with aluminum unit to prevent boost leaks.',
 85, 2, 150, 300, 1.0, 'easy', TRUE, 100
),

(2, 'part_replacement', 'Replace Ignition Coils',
 'Install high-output ignition coils. Critical for high-mileage or tuned vehicles.',
 95, 1, 300, 600, 1.5, 'easy', TRUE, 90
),

(2, 'part_replacement', 'Replace Spark Plugs (1-step colder)',
 'Install NGK 97506 or equivalent colder plugs gapped to 0.020" for tuned applications.',
 90, 1, 40, 80, 0.5, 'easy', TRUE, 80
),

(2, 'maintenance', 'Walnut Blast Carbon Cleaning',
 'Remove carbon deposits from intake valves using walnut shell blasting. Essential for direct injection engines.',
 85, 2, 400, 600, 3.0, 'professional', TRUE, 75
);

-- ============================================
-- SAMPLE TUNING RECOMMENDATIONS
-- ============================================

INSERT INTO tuning_recommendations (
    goal_type, goal_description, target_power, make, model, engine, year_range, stage,
    required_mods, estimated_hp_gain_min, estimated_hp_gain_max, total_cost_min, total_cost_max,
    reliability_score, octane_requirement, requires_dyno_tune
)
VALUES
('add_horsepower', '400-450 HP on pump gas', 430, 'BMW', '335i', 'N54', ARRAY[2007, 2013], '2',
 '[
    {"step": 1, "mod_name": "Front Mount Intercooler", "reason": "Prevents heat soak", "cost_range": "$600-900", "hp_gain": "20-40", "required": true},
    {"step": 2, "mod_name": "Catless Downpipes", "reason": "Reduces backpressure", "cost_range": "$500-800", "hp_gain": "30-50", "required": true},
    {"step": 3, "mod_name": "Spark Plugs (NGK 97506)", "reason": "High boost ignition", "cost_range": "$40-60", "hp_gain": "5-10", "required": true},
    {"step": 4, "mod_name": "MHD Stage 2 Tune", "reason": "Optimizes all mods", "cost_range": "$400-600", "hp_gain": "80-120", "required": true}
 ]'::jsonb,
 130, 180, 1540, 2360, 7, '93 octane', TRUE
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

CREATE INDEX idx_issues_category ON performance_issues(issue_category);
CREATE INDEX idx_issues_make ON performance_issues USING GIN (applicable_makes);
CREATE INDEX idx_solutions_issue ON issue_solutions(issue_id);
CREATE INDEX idx_tuning_make_model ON tuning_recommendations(make, model);
CREATE INDEX idx_compatibility_part ON parts_compatibility(part_id);

-- ============================================
-- VIEWS FOR AI QUERIES
-- ============================================

-- View: Complete issue with all solutions
CREATE VIEW issues_with_solutions AS
SELECT 
    i.issue_code,
    i.title AS issue_title,
    i.description AS issue_description,
    i.symptoms,
    i.severity,
    i.urgency,
    i.safe_to_drive,
    i.common_causes,
    json_agg(
        json_build_object(
            'solution_type', s.solution_type,
            'title', s.title,
            'success_rate', s.success_rate,
            'cost_min', s.estimated_cost_min,
            'cost_max', s.estimated_cost_max,
            'difficulty', s.diy_difficulty,
            'fixes_completely', s.fixes_completely
        ) ORDER BY s.priority
    ) AS solutions
FROM performance_issues i
LEFT JOIN issue_solutions s ON i.id = s.issue_id
GROUP BY i.id;

-- View: Tuning paths by vehicle
CREATE VIEW tuning_paths_by_vehicle AS
SELECT 
    make,
    model,
    engine,
    goal_type,
    stage,
    estimated_hp_gain_min || '-' || estimated_hp_gain_max || ' HP' AS power_gain,
    '$' || total_cost_min || '-' || total_cost_max AS budget,
    reliability_score,
    octane_requirement,
    required_mods
FROM tuning_recommendations
ORDER BY make, model, stage;

-- ============================================
-- FUNCTIONS FOR AI QUERIES
-- ============================================

-- Function: Get recommendations for symptoms
CREATE OR REPLACE FUNCTION get_recommendations_by_symptoms(symptom_keywords TEXT[])
RETURNS TABLE (
    issue_code VARCHAR,
    match_score INT,
    title VARCHAR,
    severity VARCHAR,
    top_solution TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        pi.issue_code,
        (SELECT COUNT(*) FROM unnest(symptom_keywords) AS kw WHERE kw = ANY(pi.symptoms)) AS match_score,
        pi.title,
        pi.severity,
        (SELECT s.title FROM issue_solutions s WHERE s.issue_id = pi.id ORDER BY s.priority LIMIT 1) AS top_solution
    FROM performance_issues pi
    WHERE EXISTS (
        SELECT 1 FROM unnest(symptom_keywords) AS kw WHERE kw = ANY(pi.symptoms)
    )
    ORDER BY match_score DESC
    LIMIT 10;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- END OF DIAGNOSTIC DATABASE
-- ============================================
