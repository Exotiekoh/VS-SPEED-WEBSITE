-- ============================================
-- VSSPEED.IO - Complete Database Schema
-- Vehicle Tuning & Diagnostics Platform
-- ============================================

-- ============================================
-- 1. USERS & AUTHENTICATION
-- ============================================

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE,
    password_hash VARCHAR(255),
    
    -- Profile
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(20),
    
    -- Subscription
    tier VARCHAR(20) DEFAULT 'free' CHECK (tier IN ('free', 'premium', 'shop', 'enterprise')),
    subscription_expires_at TIMESTAMP,
    
    -- OAuth providers
    google_id VARCHAR(255),
    microsoft_id VARCHAR(255),
    github_id VARCHAR(255),
    apple_id VARCHAR(255),
    
    -- Preferences
    preferences JSONB DEFAULT '{}'::jsonb,
    
    -- Metadata
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    last_login TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    email_verified BOOLEAN DEFAULT FALSE,
    
    -- Indexes
    CONSTRAINT valid_tier CHECK (tier IN ('free', 'premium', 'shop', 'enterprise'))
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_tier ON users(tier);
CREATE INDEX idx_users_created ON users(created_at);

-- ============================================
-- 2. VEHICLES & PROFILES
-- ============================================

CREATE TABLE vehicles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID REFERENCES users(id) ON DELETE CASCADE,
    
    -- Basic Info
    make VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    year INT NOT NULL CHECK (year >= 1900 AND year <= EXTRACT(YEAR FROM NOW()) + 2),
    trim VARCHAR(100),
    vin VARCHAR(17) UNIQUE,
    
    -- Engine Details
    engine VARCHAR(100),
    engine_code VARCHAR(50),
    displacement DECIMAL(4,2), -- Liters
    cylinders INT,
    aspiration VARCHAR(20) CHECK (aspiration IN ('naturally_aspirated', 'turbocharged', 'supercharged', 'twin_turbo')),
    fuel_type VARCHAR(20) CHECK (fuel_type IN ('gasoline', 'diesel', 'e85', 'flex_fuel', 'hybrid', 'electric')),
    
    -- Transmission
    transmission VARCHAR(100),
    transmission_type VARCHAR(20) CHECK (transmission_type IN ('manual', 'automatic', 'dct', 'cvt')),
    drivetrain VARCHAR(10) CHECK (drivetrain IN ('fwd', 'rwd', 'awd', '4wd')),
    
    -- Usage & Condition
    mileage INT,
    usage_type VARCHAR(20) DEFAULT 'street' CHECK (usage_type IN ('daily_driver', 'street', 'weekend', 'track', 'show', 'racing')),
    condition VARCHAR(20) DEFAULT 'good' CHECK (condition IN ('excellent', 'good', 'fair', 'poor', 'project')),
    
    -- User Goals & Preferences
    budget_range VARCHAR(20) CHECK (budget_range IN ('under_1k', '1k_3k', '3k_5k', '5k_10k', '10k_20k', 'unlimited')),
    reliability_priority INT DEFAULT 5 CHECK (reliability_priority >= 1 AND reliability_priority <= 10),
    performance_goal VARCHAR(50), -- e.g., "500hp", "10s quarter mile", "reliable daily"
    
    -- Stock Specs
    stock_horsepower INT,
    stock_torque INT,
    stock_weight INT,
    
    -- Current Specs (after mods)
    current_horsepower INT,
    current_torque INT,
    estimated_horsepower INT,
    
    -- Metadata
    nickname VARCHAR(100),
    photo_url VARCHAR(500),
    is_project BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    -- AI Context
    ai_context JSONB DEFAULT '{}'::jsonb -- Stores historical recommendations, preferences learned
);

CREATE INDEX idx_vehicles_owner ON vehicles(owner_id);
CREATE INDEX idx_vehicles_make_model ON vehicles(make, model);
CREATE INDEX idx_vehicles_year ON vehicles(year);
CREATE INDEX idx_vehicles_engine ON vehicles(engine);
CREATE INDEX idx_vehicles_vin ON vehicles(vin);

-- ============================================
-- 3. PARTS CATALOG
-- ============================================

CREATE TABLE parts_catalog (
    id SERIAL PRIMARY KEY,
    
    -- Part Details
    mfg_part_number VARCHAR(100) UNIQUE,
    title VARCHAR(500) NOT NULL,
    brand VARCHAR(100),
    category VARCHAR(100) NOT NULL,
    subcategory VARCHAR(100),
    
    -- Pricing
    price DECIMAL(10,2),
    msrp DECIMAL(10,2),
    sale_price DECIMAL(10,2),
    currency VARCHAR(3) DEFAULT 'USD',
    
    -- Specifications
    description TEXT,
    specifications JSONB,
    
    -- Performance Impact
    estimated_hp_gain INT,
    estimated_tq_gain INT,
    
    -- Reliability Impact (-10 to +10, where negative is less reliable)
    reliability_impact INT DEFAULT 0 CHECK (reliability_impact >= -10 AND reliability_impact <= 10),
    
    -- Installation
    install_difficulty INT CHECK (install_difficulty >= 1 AND install_difficulty <= 5),
    install_time_hours DECIMAL(4,1),
    requires_tune BOOLEAN DEFAULT FALSE,
    
    -- Compatibility
    compatible_makes TEXT[], -- Array of compatible makes
    compatible_models TEXT[], -- Array of compatible models
    compatible_years INT[], -- Array of compatible years
    compatible_engines TEXT[], -- Array of compatible engines
    
    -- Dependencies
    required_mods JSONB DEFAULT '[]'::jsonb, -- Parts that must be installed first
    recommended_mods JSONB DEFAULT '[]'::jsonb, -- Parts that work well together
    incompatible_mods JSONB DEFAULT '[]'::jsonb, -- Parts that can't be used together
    
    -- Stock & Availability
    in_stock BOOLEAN DEFAULT TRUE,
    stock_quantity INT DEFAULT 0,
    supplier VARCHAR(100),
    supplier_sku VARCHAR(100),
    
    -- Media
    image_url VARCHAR(500),
    images JSONB DEFAULT '[]'::jsonb,
    video_url VARCHAR(500),
    
    -- Metadata
    is_active BOOLEAN DEFAULT TRUE,
    weight_lbs DECIMAL(6,2),
    dimensions_inches VARCHAR(50),
    warranty_months INT,
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_parts_category ON parts_catalog(category);
CREATE INDEX idx_parts_brand ON parts_catalog(brand);
CREATE INDEX idx_parts_price ON parts_catalog(price);
CREATE INDEX idx_parts_compatibility ON parts_catalog USING GIN (compatible_makes);

-- ============================================
-- 4. VEHICLE MODIFICATIONS
-- ============================================

CREATE TABLE vehicle_modifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vehicle_id UUID REFERENCES vehicles(id) ON DELETE CASCADE,
    part_id INT REFERENCES parts_catalog(id),
    
    -- Mod Details
    mod_type VARCHAR(50) NOT NULL CHECK (mod_type IN (
        'engine', 'turbo', 'exhaust', 'intake', 'intercooler', 'fuel_system',
        'ecu_tune', 'transmission', 'suspension', 'brakes', 'wheels',
        'aero', 'interior', 'exterior', 'electrical', 'other'
    )),
    
    -- Installation Info
    installed_date DATE,
    installed_mileage INT,
    install_cost DECIMAL(10,2),
    installed_by VARCHAR(100), -- Shop name or DIY
    
    -- Performance Impact
    hp_gain INT,
    tq_gain INT,
    weight_change_lbs INT, -- Negative for weight reduction
    
    -- Cost Analysis
    part_cost DECIMAL(10,2),
    labor_cost DECIMAL(10,2),
    total_cost DECIMAL(10,2),
    
    -- Reliability & Issues
    has_issues BOOLEAN DEFAULT FALSE,
    issue_description TEXT,
    would_recommend BOOLEAN,
    reliability_rating INT CHECK (reliability_rating >= 1 AND reliability_rating <= 5),
    
    -- Notes
    notes TEXT,
    
    -- Status
    status VARCHAR(20) DEFAULT 'installed' CHECK (status IN ('planned', 'ordered', 'installed', 'removed', 'failed')),
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_mods_vehicle ON vehicle_modifications(vehicle_id);
CREATE INDEX idx_mods_type ON vehicle_modifications(mod_type);
CREATE INDEX idx_mods_status ON vehicle_modifications(status);

-- ============================================
-- 5. RELIABILITY SCORING SYSTEM
-- ============================================

CREATE TABLE reliability_data (
    id SERIAL PRIMARY KEY,
    
    -- Vehicle Reference
    make VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    year INT NOT NULL,
    engine VARCHAR(100),
    
    -- Mileage Brackets
    mileage_bracket VARCHAR(20) CHECK (mileage_bracket IN (
        '0_30k', '30k_60k', '60k_100k', '100k_150k', '150k_plus'
    )),
    
    -- Common Issues
    common_issues JSONB DEFAULT '[]'::jsonb,
    /* Format:
    [
        {
            "issue": "Turbo failure",
            "frequency": "15%",
            "cost_range": "$2000-4000",
            "mileage_occurrence": "80k-120k"
        }
    ]
    */
    
    -- Reliability Metrics
    overall_reliability_score INT CHECK (overall_reliability_score >= 1 AND overall_reliability_score <= 100),
    engine_reliability INT CHECK (engine_reliability >= 1 AND engine_reliability <= 10),
    transmission_reliability INT CHECK (transmission_reliability >= 1 AND transmission_reliability <= 10),
    electrical_reliability INT CHECK (electrical_reliability >= 1 AND electrical_reliability <= 10),
    
    -- Tuning Potential
    tuning_reliability_impact INT DEFAULT 0 CHECK (tuning_reliability_impact >= -50 AND tuning_reliability_impact <= 50),
    max_safe_horsepower INT,
    max_aggressive_horsepower INT,
    known_weak_points TEXT[],
    
    -- Maintenance Costs
    avg_annual_maintenance DECIMAL(10,2),
    avg_repair_cost DECIMAL(10,2),
    
    -- Community Data
    total_reports INT DEFAULT 0,
    last_updated TIMESTAMP DEFAULT NOW(),
    
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_reliability_vehicle ON reliability_data(make, model, year);
CREATE INDEX idx_reliability_mileage ON reliability_data(mileage_bracket);

-- ============================================
-- 6. COST ANALYSIS & BUDGETING
-- ============================================

CREATE TABLE build_cost_analysis (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vehicle_id UUID REFERENCES vehicles(id) ON DELETE CASCADE,
    
    -- Build Goals
    target_horsepower INT,
    target_quarter_mile DECIMAL(4,2),
    build_purpose VARCHAR(50),
    
    -- Cost Breakdown
    parts_total DECIMAL(10,2) DEFAULT 0,
    labor_total DECIMAL(10,2) DEFAULT 0,
    tuning_total DECIMAL(10,2) DEFAULT 0,
    maintenance_annual DECIMAL(10,2) DEFAULT 0,
    insurance_increase DECIMAL(10,2) DEFAULT 0,
    
    grand_total DECIMAL(10,2) GENERATED ALWAYS AS (
        parts_total + labor_total + tuning_total
    ) STORED,
    
    -- Cost Per HP
    cost_per_hp DECIMAL(10,2),
    
    -- Budget Tracking
    budget DECIMAL(10,2),
    spent DECIMAL(10,2) DEFAULT 0,
    remaining DECIMAL(10,2) GENERATED ALWAYS AS (budget - spent) STORED,
    
    -- Time Analysis
    estimated_completion_months INT,
    actual_completion_months INT,
    
    -- Risk Assessment
    financial_risk VARCHAR(20) CHECK (financial_risk IN ('low', 'medium', 'high', 'extreme')),
    reliability_risk VARCHAR(20) CHECK (reliability_risk IN ('low', 'medium', 'high', 'extreme')),
    
    -- ROI if selling
    estimated_resale_value DECIMAL(10,2),
    roi DECIMAL(10,2),
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_cost_analysis_vehicle ON build_cost_analysis(vehicle_id);

-- ============================================
-- 7. AI RECOMMENDATIONS
-- ============================================

CREATE TABLE ai_recommendations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- User & Vehicle Context
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    vehicle_id UUID REFERENCES vehicles(id) ON DELETE CASCADE,
    
    -- AI Agent Type
    agent_type VARCHAR(50) NOT NULL CHECK (agent_type IN ('tuner', 'mechanic', 'consultant', 'predictive')),
    
    -- User Query
    user_query TEXT NOT NULL,
    user_intent VARCHAR(100), -- Classified intent: "increase_power", "fix_issue", "reduce_cost", etc.
    
    -- AI Response
    summary TEXT NOT NULL,
    full_recommendation JSONB NOT NULL,
    /* Format:
    {
        "summary": "Recommended path for 500hp",
        "actions": [
            {
                "priority": 1,
                "action": "Install FMIC",
                "part_id": 123,
                "cost_range": "$600-800",
                "hp_gain": "20-30",
                "reliability_impact": -2,
                "required": true
            }
        ],
        "total_cost_range": "$5000-7000",
        "total_hp_gain": "150-200",
        "reliability_impact": -15,
        "warnings": ["Requires E85 for safety", "May void warranty"],
        "next_steps": ["Order parts", "Schedule dyno tune"]
    }
    */
    
    -- Confidence & Context
    confidence_score DECIMAL(3,2) CHECK (confidence_score >= 0 AND confidence_score <= 1),
    based_on_data_points INT, -- How many similar builds were analyzed
    
    -- User Preferences Applied
    cost_preference VARCHAR(20) CHECK (cost_preference IN ('cheapest', 'mid_range', 'premium', 'unrestricted')),
    reliability_preference VARCHAR(20) CHECK (reliability_preference IN ('maximum', 'balanced', 'aggressive', 'extreme')),
    
    -- Outcome Tracking
    user_feedback INT CHECK (user_feedback >= 1 AND user_feedback <= 5),
    was_helpful BOOLEAN,
    was_followed BOOLEAN,
    actual_cost DECIMAL(10,2),
    actual_result TEXT,
    
    -- Metadata
    processing_time_ms INT,
    model_version VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_ai_recs_user ON ai_recommendations(user_id);
CREATE INDEX idx_ai_recs_vehicle ON ai_recommendations(vehicle_id);
CREATE INDEX idx_ai_recs_agent ON ai_recommendations(agent_type);
CREATE INDEX idx_ai_recs_created ON ai_recommendations(created_at);

-- ============================================
-- 8. DIAGNOSTICS & TROUBLE CODES
-- ============================================

CREATE TABLE dtc_codes (
    code VARCHAR(10) PRIMARY KEY,
    description TEXT NOT NULL,
    severity VARCHAR(20) CHECK (severity IN ('critical', 'severe', 'moderate', 'minor', 'informational')),
    
    -- Common Causes
    common_causes JSONB,
    
    -- Typical Fixes
    typical_fixes JSONB,
    
    -- Cost Estimates
    repair_cost_min DECIMAL(10,2),
    repair_cost_max DECIMAL(10,2),
    
    -- Drivability
    safe_to_drive BOOLEAN DEFAULT TRUE,
    urgency VARCHAR(20) CHECK (urgency IN ('immediate', 'soon', 'when_convenient', 'monitor')),
    
    category VARCHAR(50)
);

CREATE TABLE vehicle_diagnostics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vehicle_id UUID REFERENCES vehicles(id) ON DELETE CASCADE,
    
    -- Scan Info
    scanned_at TIMESTAMP NOT NULL,
    scan_tool VARCHAR(100),
    mileage_at_scan INT,
    
    -- Codes Found
    dtc_codes TEXT[], -- Array of codes
    
    -- AI Analysis
    ai_diagnosis TEXT,
    recommended_actions JSONB,
    estimated_repair_cost DECIMAL(10,2),
    priority_level INT CHECK (priority_level >= 1 AND priority_level <= 5),
    
    -- Resolution
    resolved BOOLEAN DEFAULT FALSE,
    resolution_notes TEXT,
    actual_fix TEXT,
    actual_cost DECIMAL(10,2),
    
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_diagnostics_vehicle ON vehicle_diagnostics(vehicle_id);
CREATE INDEX idx_diagnostics_codes ON vehicle_diagnostics USING GIN (dtc_codes);

-- ============================================
-- 9. DECISION ENGINE PREFERENCES
-- ============================================

CREATE TABLE user_decision_preferences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
    
    -- Cost Preferences (1-10 scale)
    cost_sensitivity INT DEFAULT 5 CHECK (cost_sensitivity >= 1 AND cost_sensitivity <= 10),
    -- 1 = Always cheapest, 10 = Always best regardless of cost
    
    -- Reliability Preferences (1-10 scale)
    reliability_priority INT DEFAULT 5 CHECK (reliability_priority >= 1 AND reliability_priority <= 10),
    -- 1 = Maximum performance, 10 = Maximum reliability
    
    -- Risk Tolerance (1-10 scale)
    risk_tolerance INT DEFAULT 5 CHECK (risk_tolerance >= 1 AND risk_tolerance <= 10),
    -- 1 = Conservative, 10 = Aggressive
    
    -- Feature Preferences
    prefer_oem BOOLEAN DEFAULT FALSE,
    prefer_proven_mods BOOLEAN DEFAULT TRUE,
    prefer_reversible_mods BOOLEAN DEFAULT FALSE,
    
    -- Decision Weights (must sum to 100)
    weight_cost INT DEFAULT 25 CHECK (weight_cost >= 0 AND weight_cost <= 100),
    weight_performance INT DEFAULT 35 CHECK (weight_performance >= 0 AND weight_performance <= 100),
    weight_reliability INT DEFAULT 30 CHECK (weight_reliability >= 0 AND weight_reliability <= 100),
    weight_aesthetics INT DEFAULT 10 CHECK (weight_aesthetics >= 0 AND weight_aesthetics <= 100),
    
    CONSTRAINT weights_sum_100 CHECK (
        weight_cost + weight_performance + weight_reliability + weight_aesthetics = 100
    ),
    
    updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- 10. SAFETY & LEGAL GUARDRAILS
-- ============================================

CREATE TABLE user_agreements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    
    agreement_type VARCHAR(50) NOT NULL CHECK (agreement_type IN (
        'terms_of_service',
        'ai_disclaimer',
        'tuning_liability',
        'emissions_compliance',
        'track_use_only',
        'professional_install_recommended'
    )),
    
    version VARCHAR(20) NOT NULL,
    agreed_at TIMESTAMP NOT NULL DEFAULT NOW(),
    ip_address INET,
    user_agent TEXT
);

CREATE TABLE tuning_legality_checks (
    id SERIAL PRIMARY KEY,
    
    state_province VARCHAR(50),
    country VARCHAR(50),
    
    -- Legal Status
    ecu_tuning_legal BOOLEAN,
    emissions_delete_legal BOOLEAN,
    cat_delete_legal BOOLEAN,
    headers_legal BOOLEAN,
    exhaust_mods_legal BOOLEAN,
    
    -- Restrictions
    noise_limit_db INT,
    emissions_testing_required BOOLEAN,
    visual_inspection_required BOOLEAN,
    
    notes TEXT,
    last_updated DATE
);

CREATE TABLE ai_safety_flags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    recommendation_id UUID REFERENCES ai_recommendations(id),
    
    flag_type VARCHAR(50) CHECK (flag_type IN (
        'emissions_illegal',
        'safety_risk',
        'warranty_void',
        'requires_professional',
        'track_only',
        'high_failure_risk',
        'legal_gray_area'
    )),
    
    severity VARCHAR(20) CHECK (severity IN ('info', 'warning', 'critical')),
    description TEXT,
    user_acknowledged BOOLEAN DEFAULT FALSE,
    acknowledged_at TIMESTAMP
);

-- ============================================
-- 11. PERFORMANCE CATEGORIES (Decision-Based)
-- ============================================

CREATE TABLE decision_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    parent_id INT REFERENCES decision_categories(id),
    
    -- Category Info
    slug VARCHAR(100) UNIQUE,
    description TEXT,
    icon VARCHAR(50),
    sort_order INT DEFAULT 0,
    
    -- Decision Focus
    decision_type VARCHAR(50) CHECK (decision_type IN (
        'diagnostic', 'maintenance', 'performance', 
        'software', 'hardware', 'reliability', 'cost_optimization'
    )),
    
    -- AI Agent Mapping
    primary_agent VARCHAR(50),
    
    is_active BOOLEAN DEFAULT TRUE
);

-- Insert decision-based categories
INSERT INTO decision_categories (name, parent_id, slug, decision_type, primary_agent, sort_order) VALUES
-- Top Level Categories
('Diagnose Issues', NULL, 'diagnose', 'diagnostic', 'mechanic', 1),
('Maintain & Protect', NULL, 'maintain', 'maintenance', 'mechanic', 2),
('Increase Performance', NULL, 'performance', 'performance', 'tuner', 3),
('Optimize Software', NULL, 'software', 'software', 'tuner', 4),
('Upgrade Hardware', NULL, 'hardware', 'hardware', 'consultant', 5),
('Improve Reliability', NULL, 'reliability', 'reliability', 'mechanic', 6),
('Reduce Costs', NULL, 'cost', 'cost_optimization', 'consultant', 7),

-- Diagnose Issues Subcategories
('Check Engine Light', 1, 'cel', 'diagnostic', 'mechanic', 1),
('Performance Issues', 1, 'performance-issues', 'diagnostic', 'mechanic', 2),
('Strange Noises', 1, 'noises', 'diagnostic', 'mechanic', 3),
('Fluid Leaks', 1, 'leaks', 'diagnostic', 'mechanic', 4),

-- Maintain & Protect Subcategories
('Preventive Maintenance', 2, 'preventive', 'maintenance', 'mechanic', 1),
('High Mileage Care', 2, 'high-mileage', 'maintenance', 'mechanic', 2),
('Track Prep', 2, 'track-prep', 'maintenance', 'mechanic', 3),

-- Performance Subcategories
('Add Horsepower', 3, 'add-hp', 'performance', 'tuner', 1),
('Improve Handling', 3, 'handling', 'performance', 'tuner', 2),
('Better Acceleration', 3, 'acceleration', 'performance', 'tuner', 3),
('Top Speed Goals', 3, 'top-speed', 'performance', 'tuner', 4);

-- ============================================
-- 12. HELPER VIEWS
-- ============================================

-- View: Complete Vehicle Profile
CREATE VIEW vehicle_profiles AS
SELECT 
    v.*,
    u.username AS owner_name,
    u.tier AS owner_tier,
    COUNT(DISTINCT vm.id) AS total_mods,
    SUM(vm.total_cost) AS total_invested,
    COALESCE(SUM(vm.hp_gain), 0) AS total_hp_gain,
    rd.overall_reliability_score,
    rd.engine_reliability,
    bca.budget,
    bca.spent AS budget_spent,
    bca.remaining AS budget_remaining
FROM vehicles v
LEFT JOIN users u ON v.owner_id = u.id
LEFT JOIN vehicle_modifications vm ON v.id = vm.vehicle_id AND vm.status = 'installed'
LEFT JOIN reliability_data rd ON v.make = rd.make AND v.model = rd.model AND v.year = rd.year
LEFT JOIN build_cost_analysis bca ON v.id = bca.vehicle_id
GROUP BY v.id, u.username, u.tier, rd.overall_reliability_score, rd.engine_reliability, bca.budget, bca.spent, bca.remaining;

-- View: AI Recommendation Summary
CREATE VIEW ai_recommendation_summary AS
SELECT 
    ar.id,
    ar.user_id,
    ar.vehicle_id,
    v.make,
    v.model,
    v.year,
    ar.agent_type,
    ar.summary,
    ar.confidence_score,
    ar.cost_preference,
    ar.reliability_preference,
    ar.user_feedback,
    ar.was_helpful,
    ar.created_at
FROM ai_recommendations ar
JOIN vehicles v ON ar.vehicle_id = v.id;

-- ============================================
-- 13. FUNCTIONS & TRIGGERS
-- ============================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_vehicles_updated_at BEFORE UPDATE ON vehicles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_mods_updated_at BEFORE UPDATE ON vehicle_modifications
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Calculate cost per HP when build analysis is updated
CREATE OR REPLACE FUNCTION calculate_cost_per_hp()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.target_horsepower > 0 THEN
        NEW.cost_per_hp = NEW.grand_total / NEW.target_horsepower;
    END IF;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER calculate_build_cost_per_hp BEFORE INSERT OR UPDATE ON build_cost_analysis
    FOR EACH ROW EXECUTE FUNCTION calculate_cost_per_hp();

-- ============================================
-- 14. SAMPLE DATA FOR TESTING
-- ============================================

-- Sample User
INSERT INTO users (email, username, first_name, last_name, tier)
VALUES ('demo@vsspeed.io', 'demo_user', 'Demo', 'User', 'premium');

-- Sample Vehicle
INSERT INTO vehicles (
    owner_id, make, model, year, engine, mileage, usage_type,
    budget_range, reliability_priority, performance_goal,
    stock_horsepower, stock_torque
)
SELECT 
    id, 'BMW', '335i', 2011, 'N54', 75000, 'street',
    '5k_10k', 7, '500hp on pump gas',
    300, 300
FROM users WHERE username = 'demo_user';

-- Sample Reliability Data
INSERT INTO reliability_data (
    make, model, year, engine, mileage_bracket,
    overall_reliability_score, engine_reliability,
    max_safe_horsepower, max_aggressive_horsepower,
    known_weak_points
)
VALUES (
    'BMW', '335i', 2011, 'N54', '60k_100k',
    75, 7,
    450, 650,
    ARRAY['HPFP', 'Wastegate rattle', 'Injectors', 'Charge pipe']
);

-- ============================================
-- END OF SCHEMA
-- ============================================

-- Indexes Summary
SELECT 
    schemaname,
    tablename,
    indexname,
    indexdef
FROM pg_indexes
WHERE schemaname = 'public'
ORDER BY tablename, indexname;

-- Database Statistics
SELECT 
    table_name,
    pg_size_pretty(pg_total_relation_size(quote_ident(table_name))) AS total_size
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY pg_total_relation_size(quote_ident(table_name)) DESC;
