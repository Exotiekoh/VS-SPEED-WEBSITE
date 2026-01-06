import ferrari488Carbon from '../assets/ferrari-488-carbon.png';
import ferrari812Carbon from '../assets/ferrari-812-carbon.png';
import lpfpE9x from '../assets/lpfp-e9x.jpg';
import vsSpeedTitaniumExhaust from '../assets/vs_speed_titanium_exhaust.png';
import vsSpeedFabricatedWidebody from '../assets/vs_speed_fabricated_widebody.png';
import vsSpeedGT86Widebody from '../assets/vsspeed_gt86_widebody.png';
import customSiliconePipes from '../assets/custom_silicone_pipes.jpg';
import hosesBlueCatalog1 from '../assets/hoses_blue_catalog_1.jpg';
import hosesBlackCatalog from '../assets/hoses_black_catalog.jpg';
import hosesRedCatalog1 from '../assets/hoses_red_catalog_1.jpg';
import hosesBlueSet from '../assets/hoses_blue_set.jpg';
import n54OilFilterHousing from '../assets/n54_oil_filter_housing.jpg';
import lamboTitaniumExhaust from '../assets/lambo_titanium_exhaust.png';
import n54HousingGasketKit from '../assets/n54_housing_gasket_vsspeed.png';
// New images for products with missing/broken images
import unitronicUniflexEvo4 from '../assets/unitronic_uniflex_evo4.png';
import autotechFuelPumpMk6 from '../assets/autotech_fuel_pump_mk6.png';
import vsSpeedVWCoil from '../assets/vsspeed_vw_audi_coil.png';
import boschPencilCoilBMW from '../assets/vsspeed_pencil_coil_bmw.png';
import vsspeedS58FlexFuel from '../assets/vsspeed_s58_flexfuel.png';
import vsspeedGen3TsiCoil from '../assets/vsspeed_gen3_tsi_coil.png';
import vsspeedN54N55Chargepipe from '../assets/vsspeed_n54_n55_chargepipe.png';
import vsspeedN55CeramicDownpipe from '../assets/vsspeed_n55_ceramic_downpipe.png';
import vsspeedS55FfIntakes from '../assets/vsspeed_s55_ff_intakes.png';
import vsspeed25Lcp from '../assets/vsspeed_25_lcp.png';
import vsspeedB58Chargepipe from '../assets/vsspeed_b58_chargepipe.png';
import vsspeedTurboManifold from '../assets/vsspeed_turbo_manifold.png';
import vsspeedRollCage from '../assets/vsspeed_roll_cage.png';
import vsspeedN54Dci from '../assets/vsspeed_n54_dci.png';
import vsspeedE90Catback from '../assets/vsspeed_e90_catback.png';
import vsspeedS55Chargepipe from '../assets/vsspeed_s55_chargepipe.png';
import vsspeedB58Intercooler from '../assets/vsspeed_b58_intercooler.png';
import vsspeedOilCatchCan from '../assets/vsspeed_oil_catch_can.png';
import vsspeedS58Downpipes from '../assets/vsspeed_s58_downpipes.png';
import vsspeedSparkPlugs from '../assets/vsspeed_spark_plugs.png';
import vsspeedUnlockedTcu from '../assets/vsspeed_unlocked_tcu.png';


export const products = [
    // Ferrari / Exotic Section
    {
        id: 401,
        mfgPart: 'F488-MS-KIT',
        title: 'VS SPEED Ferrari 488 Full Carbon Fibre M-Style Body Kit',
        price: '$15,500 USD',
        image: ferrari488Carbon,
        category: 'Body Kits',
        brand: 'Ferrari',
        description: 'The ultimate aggressive transformation for the Ferrari 488 GTB and Spider. Crafted from genuine dry carbon fibre, this M-Style kit delivers unparalleled aesthetics and aerodynamic performance. Includes front bumper, front lip, side skirts, rear diffuser, and performance rear wing. VS SPEED exclusive.',
        features: [
            'Genuine Ultra-Lightweight Dry Carbon Fibre',
            'M-Style (Mansory Style) Aggressive Design',
            'OEM Fitment Guarantee with direct screw-on attachment',
            'High-definition carbon grain with mirror-like finish',
            'Enhanced high-speed stability and downforce',
            'FREE GLOBAL SHIPPING'
        ],
        fitment: [
            '2015+ Ferrari 488 GTB',
            '2015+ Ferrari 488 Spider'
        ]
    },
    {
        id: 402,
        mfgPart: 'F812-MS-TRANS',
        title: 'VS SPEED Ferrari 812 Superfast MS-Style Carbon Transformation',
        price: '$16,500 USD',
        image: ferrari812Carbon,
        category: 'Body Kits',
        brand: 'Ferrari',
        description: 'The definitive MS-style carbon fiber conversion for the Ferrari 812 Superfast and GTS. Engineered from 100% real high-grade carbon fibre for superior weight reduction and aggressive track-ready aesthetics. Includes front bumper assembly, side skirts, and rear diffuser. VS SPEED elite series.',
        features: [
            '100% Real High-Grade Carbon Fibre',
            'MS-Style (Mansory-inspired) aerodynamic design',
            'Direct retrofit fitment for Superfast & GTS models',
            'Enhanced downforce and high-speed stability',
            'Professional technical master oversight',
            'GLOBAL SHIPPING'
        ],
        fitment: [
            '2017+ Ferrari 812 Superfast',
            '2019+ Ferrari 812 GTS'
        ]
    },
    // Body Kits
    {
        id: 203,
        mfgPart: 'VSS-GT86-WB-V3',
        title: 'VS SPEED Wide Body Kit Carbon Fiber - Toyota GT86 / Subaru BRZ',
        price: '$3,500 USD',
        image: vsSpeedGT86Widebody,
        category: 'Body Kits',
        brand: 'VS SPEED',
        description: 'VS SPEED signature widebody kit in premium dry carbon fiber for Toyota GT86/Subaru BRZ. Complete transformation kit includes aggressive fender flares, front lip spoiler, side skirts, rear diffuser, and rear wing. Engineered for performance and aesthetics with precision fitment.',
        features: [
            'Full dry carbon fiber construction with 2x2 twill weave',
            'Aggressive +65mm width increase per side',
            'Complete kit: fender flares, front lip, side skirts, rear diffuser, wing',
            'Enhanced aerodynamics and downforce',
            'Direct bolt-on installation with OEM-quality fitment',
            'Includes all mounting hardware and installation guide',
            'UV-protected clear coat finish',
            'Professional installation recommended'
        ],
        fitment: [
            'Toyota GT86 (2012-2020)',
            'Subaru BRZ (2012-2020)',
            'Scion FR-S (2013-2016)'
        ]
    },
    {
        id: 101,
        mfgPart: 'VSS-E9X-WB-CONCEPT',
        title: 'VS SPEED E9X Widebody Kit (Concept)',
        price: 'Inquire',
        image: vsSpeedFabricatedWidebody,
        category: 'Body Kits',
        brand: 'VS SPEED',
        description: 'Aggressive fitment & stance. Carbon / FRP options available. VS SPEED Fabricated Concept.',
        fitment: ['BMW E90', 'BMW E92']
    },
    // Fuel Pumps
    {
        id: 102,
        mfgPart: 'VSS-E9X-LPFP-V2',
        title: 'E9X / E8X In-Tank Fuel Filter & Regulator (V2)',
        price: '$614.99 CAD',
        image: lpfpE9x,
        category: 'Fuel Pumps',
        brand: 'VS SPEED',
        description: 'E85 compliant Micro-Glass filter with adjustable regulator. Supports 1000+ HP.',
        fitment: ['BMW E90', 'BMW E92', 'BMW E82', 'BMW E88']
    },
    // Engine Components - N54
    {
        id: 129,
        mfgPart: 'VSS-N54-OFH-UPGRADE',
        title: 'N54 Oil Filter Housing Upgrade Kit - Complete System',
        price: '$899.99 CAD',
        image: n54OilFilterHousing,
        category: 'Engine Components',
        brand: 'VS SPEED',
        description: 'Complete N54 Oil Filter Housing Upgrade Kit featuring billet aluminum construction with integrated oil cooler adapter, premium polyurethane bushings, and all necessary hardware. Eliminates common oil filter housing gasket failures while improving oil flow and cooling. Includes red anodized components for premium aesthetics.',
        features:   [
            'Billet 6061-T6 Aluminum Oil Filter Housing',
            'CNC-machined with red anodized finish',
            'Integrated oil cooler adapter plate',
            'Premium polyurethane suspension bushings',
            'High-flow oil filter adapter',
            'Stainless steel hardware kit',
            'Heavy-duty silicone hoses and couplers',
            'Billet aluminum engine mounts',
            'Tool kit included (removal/installation)',
            'Eliminates common BMW gasket failures',
            'Improved oil circulation and cooling',
            'Direct OEM replacement - bolt-on installation'
        ],
        fitment: [
            'BMW 335i N54 (2007-2010)',
            'BMW 335xi N54 (2007-2010)',
            'BMW 135i N54 (2008-2010)',
            'BMW 535i N54 (2008-2010)',
            'BMW Z4 sDrive35i N54',
            'BMW E90 E92 E82 E60'
        ]
    },
    {
        id: 130,
        mfgPart: 'VSS-N54-OFH-GASKET',
        title: 'N54 Oil Filter Housing & Gasket Upgrade Kit',
        price: '$199.99 CAD',
        image: n54HousingGasketKit,
        category: 'Engine Components',
        brand: 'VS SPEED',
        description: 'Complete N54 oil filter housing and gasket upgrade kit designed to eliminate the common BMW N54 oil filter housing gasket failure. This comprehensive kit includes a premium black anodized aluminum oil filter housing, red anodized billet aluminum oil cap, high-quality polyurethane gaskets, professional installation tools, heavy-duty mounting hardware, and precision-machined components. Solves oil leaks permanently while upgrading your engine bay aesthetics with premium VS SPEED quality. FREE SHIPPING included!',
        features: [
            'Complete replacement kit - everything included',
            'Black anodized aluminum oil filter housing',
            'Red anodized billet aluminum oil filler cap',
            'Premium polyurethane gasket set (no more leaks)',
            'Professional installation tool kit included',
            'Heavy-duty stainless steel hardware',
            'Precision CNC-machined components',
            'Red polyurethane motor mounts and bushings',
            'High-flow oil cooler adapter fittings',
            'Upgraded pulley system components',
            'VS SPEED quality guarantee',
            'FREE SHIPPING - Direct bolt-on installation',
            'Eliminates common N54 oil housing gasket failures',
            'Lifetime warranty against leaks'
        ],
        fitment: [
            'BMW 335i N54 (2007-2013)',
            'BMW 335xi N54 (2007-2013)', 
            'BMW 135i N54 (2008-2013)',
            'BMW 535i N54 (2008-2010)',
            'BMW Z4 sDrive35i N54',
            'BMW E90 E92 E82 E60 N54 engines'
        ]
    },
    {
        id: 103,
        mfgPart: 'DW-420-E46',
        title: 'DeatschWerks DW420 420lph In-Tank Fuel Pump BMW E36/E46',
        price: '$272.49 CAD',
        image: 'https://deatschwerks.com/cdn/shop/files/DW-Web-01.png?v=1738698611&width=600',
        category: 'Fuel Pumps',
        brand: 'VS SPEED',
        description: 'High-flow 420lph in-tank fuel pump with install kit for BMW E36/E46. E85 compatible.',
        fitment: ['BMW E36', 'BMW E46']
    },
    {
        id: 104,
        mfgPart: 'DW-430C-G7',
        title: 'DeatschWerks DW430C 430LPH Compact Fuel Pump VW Golf',
        price: '$299.49 CAD',
        image: 'https://deatschwerks.com/cdn/shop/articles/DW430c_In_Tank_Pump_016f90c4-4dab-4724-9a4e-caa4f3bd4a41.png?v=1746806196&width=1100',
        category: 'Fuel Pumps',
        brand: 'VS SPEED',
        description: 'Compact 430lph fuel pump designed for VW Golf MK7 platform. E85 compatible.',
        fitment: ['VW Golf MK7', 'VW Golf R MK7']
    },
    {
        id: 105,
        mfgPart: 'RAD-20-1180',
        title: 'Radium Engineering BMW E46 Fuel Pump Hanger',
        price: '$717.49 CAD',
        image: 'https://www.radiumauto.com/cdn/shop/files/20-1180_E461x1.jpg?v=1748988348&width=1000',
        category: 'Fuel Pumps',
        brand: 'VS SPEED',
        description: 'OEM-quality fuel pump hanger for BMW E46. Supports multiple pump configurations.',
        fitment: ['BMW E46']
    },
    {
        id: 106,
        mfgPart: 'CTS-FPK-001',
        title: 'CTS MK4 Inline Fuel Pump Kit',
        price: '$285.73 CAD',
        image: 'https://ctsturbo.com/wp-content/uploads/2018/11/cts-fpk-001-1-1.jpg',
        category: 'Fuel Pumps',
        brand: 'VS SPEED',
        description: 'Complete inline fuel pump kit for VW MK4 platform. High-flow fuel delivery.',
        fitment: ['VW MK4 GTI', 'VW MK4 Jetta']
    },
    {
        id: 107,
        mfgPart: 'AMS-R35-OMG',
        title: 'AMS Performance Omega Fuel System R35 GT-R',
        price: '$3,125.83 CAD',
        image: 'https://cdn.vividracing.com/file/vr23/449/1/alp.07.07.0010-2_1.webp?w=1024',
        category: 'Fuel Pumps',
        brand: 'VS SPEED',
        description: 'Premium single-pump fuel system for Nissan GT-R R35. 1000+ HP capable.',
        fitment: ['Nissan GT-R R35']
    },
    {
        id: 108,
        mfgPart: 'AUT-MK6-LPFP',
        title: 'Autotech OEM Fuel Pump Assembly MK6 TSI 2.0T',
        price: '$439.99 CAD',
        image: autotechFuelPumpMk6,
        category: 'Fuel Pumps',
        brand: 'VS SPEED',
        description: 'OEM-spec fuel pump assembly for VW MK6 2.0T TSI engines.',
        fitment: ['VW MK6 GTI', 'VW MK6 Jetta']
    },
    // Ignition Systems
    {
        id: 109,
        mfgPart: 'APR-MS1001',
        title: 'APR Ignition Coil Pack - Red/Grey/Blue',
        price: '$64.28 CAD',
        image: 'https://images.goapr.com/ms100192_001.jpg',
        category: 'Ignition',
        brand: 'VS SPEED',
        description: 'High-performance ignition coil pack from APR. Multiple color options available.',
        fitment: ['Audi S3', 'VW Golf GTI', 'Audi A3']
    },
    {
        id: 110,
        mfgPart: 'DIN-D650-000',
        title: 'DINAN Ignition Coil N-Series (N20/N52/N54/N55/S55/S63)',
        price: '$41.40 CAD',
        image: 'https://images.dinancars.com/1024x/3d29bb5cf93284b69ad19950cf3f7f767737ba1d.jpg',
        category: 'Ignition',
        brand: 'VS SPEED',
        description: 'High-output ignition coil for BMW N-Series engines. Red, Black, or Blue options.',
        fitment: ['BMW E90', 'BMW E92', 'BMW F30', 'BMW F80']
    },
    // VRSF Products
    {
        id: 200,
        mfgPart: 'VRSF-S58-DP-CAT',
        title: 'VRSF Catted Downpipes for 2019 – 2022 BMW X3M & X4M S58 F97 F98',
        price: '$1,200 CAD',
        image: 'https://vrspeed.com/cdn/shop/files/vrsf-10972011_321x218.jpg',
        category: 'Exhaust',
        brand: 'VS SPEED',
        description: 'Catted downpipes for BMW X3M & X4M S58 models, improving exhaust flow and sound.',
        fitment: ['BMW X3M', 'BMW X4M', 'BMW F97', 'BMW F98']
    },
    {
        id: 201,
        mfgPart: 'VRSF-S58-DP-RACE',
        title: 'VRSF Racing Downpipes S58 2019 – 2022 BMW X3M & X4M F97 F98',
        price: '$1,150 CAD',
        image: 'https://vrspeed.com/cdn/shop/files/vrsf-10972010_321x218.jpg',
        category: 'Exhaust',
        brand: 'VS SPEED',
        description: 'Racing downpipes for BMW X3M & X4M S58 models, delivering high performance.',
        fitment: ['BMW X3M', 'BMW X4M', 'BMW F97', 'BMW F98']
    },
    // VRSF Performance Products
    {
        id: 204,
        mfgPart: 'VSS-N54-FMIC-75',
        title: 'VS SPEED 1000whp 7.5" Stepped Race Intercooler FMIC Upgrade Kit',
        price: '$549.99 CAD',
        image: '/assets/product-images/vsspeed-fmic-intercooler.jpg',
        gallery: [
            '/assets/product-images/vrsf-fmic-couplers.jpg',
            '/assets/product-images/vrsf-fmic-installed-blue.jpg',
            '/assets/product-images/vrsf-fmic-installed-black.jpg'
        ],
        category: 'Intercoolers',
        brand: 'VS SPEED',
        description: 'High-density stepped core designed for maximum cooling efficiency and minimal pressure drop. Capable of supporting up to 1000whp.',
        features: [
            'High-density stepped core design',
            'Maximum cooling efficiency',
            'Minimal pressure drop',
            'Supports up to 1000whp',
            'Direct bolt-on installation'
        ],
        fitment: ['BMW 135i', 'BMW 335i', 'BMW E82', 'BMW E90', 'BMW E92']
    },
    {
        id: 205,
        mfgPart: 'VSS-N54-DCI',
        title: 'VS SPEED Dual Cone Intake (DCI)',
        price: '$109.99 CAD',
        image: vsspeedN54Dci,
        gallery: [
            'https://vrspeed.com/cdn/shop/files/vrsf-n54-dci-2.jpg'
        ],
        category: 'Intakes',
        brand: 'VS SPEED',
        description: 'Replaces the restrictive factory intake system with open air filters to increase airflow in the mid to upper RPM range.',
        features: [
            'Replaces restrictive factory intake',
            'Open air filter design',
            'Increased airflow mid to upper RPM',
            'Direct bolt-on',
            'Includes all hardware'
        ],
        fitment: ['BMW 135i', 'BMW 335i', 'BMW 535i', 'BMW Z4']
    },
    {
        id: 206,
        mfgPart: 'VSS-E90-35-CB',
        title: 'VS SPEED 3.5" Street Stainless Steel Catback Exhaust',
        price: '$999.99 CAD',
        image: vsspeedE90Catback,
        gallery: [
            'https://vrspeed.com/cdn/shop/files/vrsf-10202020B.jpg'
        ],
        category: 'Exhaust',
        brand: 'VS SPEED',
        description: 'High-quality stainless steel catback exhaust designed for maximum flow and an aggressive sound profile.',
        features: [
            'High-quality stainless steel construction',
            'Maximum exhaust flow',
            'Aggressive sound profile',
            '3.5" diameter piping',
            'Complete bolt-on kit'
        ],
        fitment: ['BMW 335i', 'BMW 335is', 'BMW E90', 'BMW E92']
    },
    {
        id: 207,
        mfgPart: 'VSS-B58-DP',
        title: 'VS SPEED B58 Downpipe Upgrade',
        price: '$319.99 CAD',
        image: vsspeedB58Chargepipe,
        gallery: [
            'https://vrspeed.com/cdn/shop/files/vrsf_10582020.jpg',
            'https://vrspeed.com/cdn/shop/files/58hs.png'
        ],
        category: 'Downpipes',
        brand: 'VS SPEED',
        description: 'Eliminates the restrictive factory catalytic converter for increased power and throttle response on B58 engines.',
        features: [
            'Eliminates restrictive factory cat',
            'Increased power and throttle response',
            'Stainless steel construction',
            '3.5" diameter',
            'Direct bolt-on installation'
        ],
        fitment: ['BMW M240i', 'BMW 340i', 'BMW 440i', 'BMW 540i', 'BMW 740i', 'BMW 840i']
    },
    {
        id: 208,
        mfgPart: 'VSS-N54-CP',
        title: 'VS SPEED Chargepipe Upgrade Kit (N54/N55)',
        price: '$149.99 CAD',
        image: vsspeedN54N55Chargepipe,
        gallery: [
            'https://vrspeed.com/cdn/shop/files/vrsf-10901020c_2.jpg',
            'https://vrspeed.com/cdn/shop/files/tialblack.png'
        ],
        category: 'Charge Pipes',
        brand: 'VS SPEED',
        description: 'Mandrel-bent aluminum charge pipe replaces the fragile plastic factory pipe to prevent failure under high boost.',
        features: [
            'Mandrel-bent aluminum construction',
            'Prevents factory pipe failure',
            'High boost capable',
            'Direct OEM fitment',
            'Includes silicone couplers and clamps'
        ],
        fitment: ['BMW 135i', 'BMW 335i', 'BMW 335is', 'BMW X1']
    },
    {
        id: 209,
        mfgPart: 'VSS-N55-DP-CERAMIC',
        title: 'VS SPEED Ceramic Coated Downpipe Upgrade (N55)',
        price: '$309.99 CAD',
        image: vsspeedN55CeramicDownpipe,
        gallery: [
            'https://vrspeed.com/cdn/shop/files/vrsf-10902015_6.jpg'
        ],
        category: 'Downpipes',
        brand: 'VS SPEED',
        description: 'Ceramic coated for heat management, this downpipe improves exhaust flow and significantly increases performance.',
        features: [
            'Ceramic coating for heat management',
            'Improved exhaust flow',
            'Significant performance increase',
            'Stainless steel construction',
            'Direct bolt-on'
        ],
        fitment: ['BMW 135i', 'BMW 335i', 'BMW X1']
    },
    {
        id: 210,
        mfgPart: 'VSS-S55-FF-INTAKE',
        title: 'VS SPEED Front Facing Air Intakes (S55)',
        price: '$469.99 CAD',
        image: vsspeedS55FfIntakes,
        gallery: [
            'https://vrspeed.com/cdn/shop/files/vrsf-s55-front-facing-intake.jpg'
        ],
        category: 'Intakes',
        brand: 'VS SPEED',
        description: 'Positions air filters directly behind the front grilles for the coldest air intake possible on S55 engines.',
        features: [
            'Front-facing cold air intake design',
            'Maximum air temperature reduction',
            'High-flow air filters',
            'Aluminum construction',
            'Dyno-proven power gains'
        ],
        fitment: ['BMW M3 F80', 'BMW M4 F82']
    },
    {
        id: 211,
        mfgPart: 'VRSF-S55-CP',
        title: 'VS SPEED Charge Pipe Upgrade Kit (S55)',
        price: '$319.99 CAD',
        image: vsspeedS55Chargepipe,
        gallery: [
            'https://vrspeed.com/cdn/shop/files/vrsf-10801050_4.jpg'
        ],
        category: 'Charge Pipes',
        brand: 'VS SPEED',
        description: 'Strong aluminum construction prevents the common factory charge pipe failures on high-boost M3/M4 models.',
        features: [
            'Strong aluminum construction',
            'Prevents factory pipe failure',
            'High boost capable',
            'Direct OEM fitment',
            'Includes all necessary hardware'
        ],
        fitment: ['BMW M3 F80', 'BMW M4 F82', 'BMW M2 Competition']
    },
    {
        id: 212,
        mfgPart: 'VRSF-B58-FMIC',
        title: 'VS SPEED B48 B46 B58 Front Mount Intercooler Upgrade',
        price: '$469.99 CAD',
        image: vsspeedB58Intercooler,
        category: 'Intercoolers',
        brand: 'VS SPEED',
        description: 'Enhanced cooling for the newer B-series engines, providing consistent performance and lower intake temps.',
        features: [
            'Enhanced cooling for B-series engines',
            'Lower intake temperatures',
            'Consistent high performance',
            'Direct bolt-on installation',
            'High-flow core design'
        ],
        fitment: ['BMW M140i', 'BMW M240i', 'BMW 340i', 'BMW 440i']
    },
    {
        id: 213,
        mfgPart: 'VSS-E90-LCP',
        title: 'VS SPEED 2.5" Lower Charge Pipe LCP',
        price: '$92.99 CAD',
        image: vsspeed25Lcp,
        category: 'Charge Pipes',
        brand: 'VS SPEED',
        description: 'High-flow aluminum lower charge pipe that smooths air path to the intercooler.',
        features: [
            'High-flow aluminum construction',
            'Smoother air path to intercooler',
            'Reduced turbulence',
            'Direct OEM fitment',
            'Includes silicone couplers'
        ],
        fitment: ['BMW 135i', 'BMW 335i']
    },
    {
        id: 214,
        mfgPart: 'VRSF-N54-OCC',
        title: 'VS SPEED Aluminum Oil Catch Can',
        price: '$199.99 CAD',
        image: vsspeedOilCatchCan,
        gallery: [
            'https://vrspeed.com/cdn/shop/files/vrsf-205420_1.jpg'
        ],
        category: 'Accessories',
        brand: 'VS SPEED',
        description: 'Prevents oil vapors from entering the intake system, keeping valves clean and preventing carbon buildup.',
        features: [
            'Prevents oil vapor in intake',
            'Keeps valves clean',
            'Prevents carbon buildup',
            'Billet aluminum construction',
            'Easy drain design'
        ],
        fitment: ['BMW 135i', 'BMW 335i', 'BMW 535i']
    },
    {
        id: 219,
        mfgPart: 'VRSF-E90-MD',
        title: 'VS SPEED Stainless Steel Muffler Delete (E90/E92 335i)',
        price: '$269.99 CAD',
        image: vsspeedE90Catback,
        gallery: [
            'https://vrspeed.com/cdn/shop/files/VRSF-502055.jpg'
        ],
        category: 'Exhaust',
        brand: 'VS SPEED',
        description: 'Eliminates heavy factory mufflers for weight savings and a more aggressive tone.',
        features: [
            'Lightweight stainless steel constructon',
            'Significant weight reduction',
            'Aggressive exhaust note',
            'Direct bolt-on',
            'Includes all hardware'
        ],
        fitment: ['BMW 335i', 'BMW 335is', 'BMW E90', 'BMW E92']
    },
    {
        id: 215,
        mfgPart: 'VRSF-S58-CP-DS',
        title: 'VS SPEED Catted Downpipes (S58)',
        price: '$619.99 CAD',
        image: vsspeedS58Downpipes,
        gallery: [
            'https://vrspeed.com/cdn/shop/files/vrsf-gas100_2.jpg'
        ],
        category: 'Downpipes',
        brand: 'VS SPEED',
        description: 'High-flow catalytic converters provide increased power while maintaining emissions compliance for S58 engines.',
        features: [
            'High-flow catalytic converters',
            'Emissions compliant',
            'Significant power increase',
            'Stainless steel construction',
            'Direct bolt-on installation'
        ],
        fitment: ['BMW X3M S58', 'BMW X4M S58', 'BMW M3 G80', 'BMW M4 G82']
    },
    {
        id: 216,
        mfgPart: 'VRSF-F80-TIPS',
        title: 'VS SPEED 90mm Stainless Steel Exhaust Tips',
        price: '$189.99 CAD',
        image: vsspeedE90Catback,
        gallery: [
            'https://vrspeed.com/cdn/shop/files/vrsf-f80-tips-installed.jpg'
        ],
        category: 'Exhaust',
        brand: 'VS SPEED',
        description: 'Upgraded large-diameter stainless steel tips for a more aggressive look on the M3 and M4.',
        features: [
            '90mm diameter tips',
            'Stainless steel construction',
            'Aggressive styling',
            'Direct bolt-on',
            'Polished finish'
        ],
        fitment: ['BMW M3 F80', 'BMW M4 F82']
    },
    {
        id: 217,
        mfgPart: 'VRSF-B58-CP',
        title: 'VS SPEED Charge Pipe Upgrade Kit (B58)',
        price: '$239.99 CAD',
        image: vsspeedB58Chargepipe,
        category: 'Charge Pipes',
        brand: 'VS SPEED',
        description: 'Designed to withstand higher boost pressures on B58 engines, replacing the weak plastic factory unit.',
        features: [
            'Withstands higher boost pressures',
            'Replaces weak plastic factory pipe',
            'Aluminum construction',
            'Direct OEM fitment',
            'Includes all hardware'
        ],
        fitment: ['BMW M140i', 'BMW M240i', 'BMW 340i', 'BMW 440i', 'BMW 540i']
    },
    {
        id: 218,
        mfgPart: 'VRSF-VBAND-35',
        title: 'VS SPEED 3.5" Turbo to Downpipe V-Band Exhaust Clamp',
        price: '$38.99 CAD',
        image: 'https://vrspeed.com/cdn/shop/files/dp-clamp-100.jpg',
        category: 'Accessories',
        brand: 'VS SPEED',
        description: 'High-strength V-band clamp for securing the downpipe to the turbo housing.',
        features: [
            'High-strength V-band design',
            '3.5" diameter',
            'Stainless steel construction',
            'Easy installation',
            'Leak-proof seal'
        ],
        fitment: ['Universal BMW Turbo']
    },
    {
        id: 111,
        mfgPart: 'CTS-IGN-N54',
        title: 'VS SPEED High Performance Ignition Coil BMW N54/N55',
        price: '$31.55 CAD',
        image: vsSpeedVWCoil,
        category: 'Ignition',
        brand: 'VS SPEED',
        description: 'Performance ignition coil for BMW N20/N52/N54/N55/S55 engines. 15% stronger spark.',
        fitment: ['BMW N54', 'BMW N55', 'BMW S55']
    },
    {
        id: 112,
        mfgPart: 'DIN-D650-B58',
        title: 'VS SPEED Ignition Coil B-Series (B58/S58)',
        price: '$49.98 CAD',
        image: boschPencilCoilBMW,
        category: 'Ignition',
        brand: 'VS SPEED',
        description: 'High-output ignition coil for BMW B-Series engines (B58/S58). Red or Black.',
        fitment: ['BMW B58', 'BMW S58']
    },
    {
        id: 113,
        mfgPart: 'APR-Z1003100',
        title: 'VS SPEED Iridium Pro Spark Plugs (Set of 4)',
        price: '$148.00 CAD',
        image: vsspeedSparkPlugs,
        category: 'Ignition',
        brand: 'VS SPEED',
        description: 'APR Iridium Pro Spark Plugs. Heat Range 10 - ideal for tuned applications.',
        fitment: ['VW/Audi 2.0T TSI', 'Audi RS3']
    },
    // Fuel Lines
    {
        id: 114,
        mfgPart: 'CTS-HW-267',
        title: 'VS SPEED Bosch 60mm Fuel Pump Adapter Kit',
        price: '$154.91 CAD',
        image: 'https://ctsturbo.com/wp-content/uploads/2018/11/cts-hw-267-1.jpg',
        category: 'Fuel Lines',
        brand: 'VS SPEED',
        description: 'Fuel pump adapter kit for Bosch 60mm pumps. Universal application.',
        fitment: ['Universal']
    },
    {
        id: 115,
        mfgPart: '034-106-Z068',
        title: 'VS SPEED High Pressure Fuel Pump Tool EA839',
        price: '$27.40 CAD',
        image: 'https://www.034motorsport.com/media/catalog/product/h/i/high-pressure-fuel-pump-tool-ea839-v6-engines-2-9t-3-0t-034-106-z068-1.jpg',
        category: 'Fuel Lines',
        brand: 'VS SPEED',
        description: 'HPFP tool for EA839 V6 engines (2.9T/3.0T). Essential for fuel system service.',
        fitment: ['Audi RS5 2.9T', 'Audi S4 3.0T']
    },
    {
        id: 116,
        mfgPart: 'RAD-20-0435',
        title: 'VS SPEED Porsche 996 Fuel Pump Install Kit',
        price: '$78.49 CAD',
        image: 'https://www.radiumauto.com/cdn/shop/files/20-0435_1.jpg',
        category: 'Fuel Lines',
        brand: 'VS SPEED',
        description: 'Fuel pump installation kit for Porsche 911/996. Pump not included.',
        fitment: ['Porsche 996']
    },
    {
        id: 117,
        mfgPart: 'RAD-20-0440',
        title: 'VS SPEED BMW E36 Fuel Pump Hanger',
        price: '$717.49 CAD',
        image: 'https://www.radiumauto.com/cdn/shop/files/20-0440_1.jpg',
        category: 'Fuel Lines',
        brand: 'VS SPEED',
        description: 'Complete fuel pump hanger kit for BMW E36. Multiple pump configurations.',
        fitment: ['BMW E36']
    },
    // Filtration & Regulation
    {
        id: 118,
        mfgPart: 'BM3-FLEX-E85',
        title: 'VS SPEED FlexFuel Kit with Ethanol Sensor',
        price: '$899.00 CAD',
        image: 'https://www.protuningfreaks.com/cdn/shop/products/IG-1_900x.jpg',
        category: 'Filtration',
        brand: 'VS SPEED',
        description: 'Complete flex fuel kit from Bootmod3. Includes ethanol sensor and wiring.',
        fitment: ['BMW F-Series', 'BMW G-Series']
    },
    {
        id: 119,
        mfgPart: 'VSS-S58-FLEX',
        title: 'VS SPEED Flex Fuel Kit S58 BMW G80 M3 / G82 M4',
        price: '$629.99 CAD',
        image: vsspeedS58FlexFuel,
        category: 'Filtration',
        brand: 'VS SPEED',
        description: 'Complete flex fuel kit for BMW S58 engines. G80 M3 and G82/G83 M4 compatible.',
        fitment: ['BMW M3 G80', 'BMW M4 G82']
    },
    {
        id: 120,
        mfgPart: 'UNI-TSI-EVO4-FLEX',
        title: 'VS SPEED UniFLEX Hardware Kit 2.0TSI EVO4',
        price: '$559.99 CAD',
        image: unitronicUniflexEvo4,
        category: 'Filtration',
        brand: 'VS SPEED',
        description: 'UniFLEX hardware kit with ethanol sensor for 2.0TSI EVO4 engines.',
        fitment: ['VW Golf R MK8', 'Audi S3 8Y']
    },
    // Port Injection / Electronics
    {
        id: 121,
        mfgPart: '034-605-1017',
        title: 'VS SPEED Ethanol Content Gauge Kit RS3/TTRS',
        price: '$767.52 CAD',
        image: 'https://www.034motorsport.com/media/catalog/product/0/3/034-605-1017-1.jpg',
        category: 'Port Injection',
        brand: 'VS SPEED',
        description: 'Ethanol content gauge kit for Audi RS3 (8V.5) and TTRS (8S). Real-time monitoring of ethanol levels.',
        fitment: ['Audi RS3 8V.5', 'Audi TTRS 8S']
    },
    {
        id: 122,
        mfgPart: 'RL-IGN-VW',
        title: 'VS SPEED High-Output Ignition Coil VW/Audi',
        price: '$65.00 CAD',
        image: 'https://www.racingline.com/cdn/shop/files/RacingLineHighOutputIgnitionCoil.jpg',
        category: 'Electronics',
        brand: 'VS SPEED',
        description: 'High-output ignition coil for VW/Audi vehicles. Improved spark energy and performance.',
        fitment: ['VW Golf GTI MK7', 'Audi S3 8V', 'VW Golf R MK7']
    },
    {
        id: 123,
        mfgPart: 'VSS-VW-COIL',
        title: 'VS SPEED VW/Audi OEM Performance Ignition Coil Pack',
        price: '$69.99 CAD',
        image: vsSpeedVWCoil,
        category: 'Electronics',
        brand: 'VS SPEED',
        description: 'OEM-spec performance ignition coil for VW/Audi platforms. Red top design with VS SPEED branding.',
        fitment: ['VW Golf GTI MK6', 'Audi A3 8P']
    },
    {
        id: 124,
        mfgPart: 'VSS-0221-BMW',
        title: 'VS SPEED Pencil Type Ignition Coil BMW',
        price: '$28.49 CAD',
        image: boschPencilCoilBMW,
        category: 'Fittings',
        brand: 'VS SPEED',
        description: 'OEM Bosch pencil-type ignition coil for BMW vehicles. Direct replacement.',
        fitment: ['BMW E46', 'BMW E90', 'BMW E60']
    },
    // Accessories
    {
        id: 125,
        mfgPart: 'VSS-IGN-007',
        title: 'VS SPEED High Performance Ignition Coil Gen3 TSI',
        price: '$45.89 CAD',
        image: vsspeedGen3TsiCoil,
        category: 'Accessories',
        brand: 'VS SPEED',
        description: 'Performance ignition coil for Gen3 TSI engines (1.8T-4.0T).',
        fitment: ['VW Golf GTI MK7', 'Audi S3 8V']
    },
    {
        id: 126,
        mfgPart: 'CTS-IGN-B58',
        title: 'VS SPEED BMW/Toyota High-Performance Ignition Coil B58',
        price: '$39.58 CAD',
        image: 'https://ctsturbo.com/wp-content/uploads/2018/11/cts-ign-009-4.jpg',
        category: 'Fuel Pumps',
        brand: 'VS SPEED',
        description: 'Performance ignition coil for BMW B58/S58 and Toyota Supra.',
        fitment: ['BMW B58', 'BMW S58', 'Toyota Supra A90']
    },
    {
        id: 127,
        mfgPart: '034-EA8XX-COIL',
        title: 'VS SPEED High Output Ignition Coil EA8XX',
        price: '$68.50 CAD',
        image: 'https://www.034motorsport.com/media/catalog/product/0/3/034-106-1014-1.jpg',
        category: 'Fuel Pumps',
        brand: 'VS SPEED',
        description: 'High-output ignition coil for EA8XX engines. Performance upgrade.',
        fitment: ['Audi RS3 8V', 'VW Golf R MK7']
    },
    // Drivetrain - Unitronic
    {
        id: 128,
        mfgPart: 'UNI-DQ381-TCU',
        title: 'VS SPEED DQ381.2 Unlocked TCU (UH002-DR2)',
        price: '$1,299.99 CAD',
        image: vsspeedUnlockedTcu,
        category: 'Drivetrain',
        brand: 'VS SPEED',
        description: 'Genuine Bosch DQ381.2 Unlocked TCU for 2022+ MK8 GTI, Golf R, and 8Y S3. Plug-n-Play solution for locked "401" TCUs. Supports up to 600Nm clutch pressure, faster shifts, dual-setpoint launch control, and in-dash gear display. Requires Unitronic TCU Performance Software. Provide TCU ID, TCU Revision, and VIN when ordering.',
        features: [
            'Genuine Bosch DQ381.2 TCU',
            'Plug-n-Play installation',
            'Unlocks locked "401" bootloader TCUs',
            'Supports up to 600Nm clutch clamping pressure',
            'Faster, crisper gear shifts',
            'Advanced torque management',
            'Adjustable dual-setpoint Launch Control',
            'In-dash gear display',
            'Compatible with Stage 1, 1+, 2, and 3 software'
        ],
        fitment: [
            'VW Golf R MK8',
            'Audi S3 8Y',
            'VW GTI MK8'
        ]
    },
    // Custom Fabrication Section
    {
        id: 300,
        mfgPart: 'VSS-TITAN-EXH',
        title: 'VS SPEED Signature Titanium Exhaust System',
        price: 'Request Quote',
        image: vsSpeedTitaniumExhaust,
        category: 'Custom Fabrication',
        brand: 'VS SPEED',
        description: 'Fully custom, hand-built titanium exhaust systems for supercars. Optimized for weight and acoustics. Features signature pie-cut welding and laser-etched VS SPEED branding.',
        features: [
            'Hand-welded Grade 5 Titanium',
            'Custom tip designs (3.5" - 4")',
            'Valved or non-valved options',
            'Precision fitment',
            'Signature Heat Gradients'
        ],
        fitment: ['Ferrari 488', 'Ferrari 812', 'Lamborghini Huracan', 'BMW M-Cars']
    },
    {
        id: 301,
        mfgPart: 'VSS-TIG-MANI',
        title: 'VS SPEED Hand-Built Turbo Manifold - N54/N55',
        price: '$1,850 CAD',
        image: vsspeedTurboManifold,
        category: 'Custom Fabrication',
        brand: 'Custom Fabrication',
        description: 'TIG-welded, back-purged custom turbo manifold for maximum flow and reliability.',
        features: [
            '304L Stainless Steel',
            'Precision CNC Flanges',
            'Optimized Runner Design',
            'Lifetime Warranty on welds'
        ],
        fitment: ['BMW N54', 'BMW N55']
    },
    {
        id: 303,
        mfgPart: 'VSS-SILICONE-CUSTOM',
        title: 'VS SPEED Custom Heat-Resistant Silicone Pipes',
        price: 'Request Quote',
        image: customSiliconePipes,
        category: 'Custom Fabrication',
        brand: 'VS SPEED',
        description: 'Premium custom-fabricated heat-resistant silicone piping for high-performance turbo and intercooler applications. Engineered for extreme temperatures and boost pressures. Built to your exact specifications.',
        features: [
            'High-Temperature Silicone (up to 450°F)',
            '5-ply reinforced construction',
            'Custom colors available (Black, Blue, Red)',
            'T-bolt clamps included',
            'Pressure rated to 150 PSI',
            'Custom bends and reducers'
        ],
        fitment: ['Universal - Custom Fitment']
    },
    {
        id: 304,
        mfgPart: 'VSS-LAMBO-TITAN-EXH',
        title: 'VS SPEED Titanium Exhaust System - Lamborghini Huracan',
        price: '$18,500 USD',
        image: lamboTitaniumExhaust,
        category: 'Custom Fabrication',
        brand: 'VS SPEED',
        description: 'Hand-built titanium exhaust masterpiece for Lamborghini Huracan. Features aerospace-grade Grade 5 titanium construction with signature blue-purple heat gradient. Precision TIG-welded pie cuts, laser-etched VS SPEED branding, and custom 4-inch polished tips. Weight savings of 60% over OEM while delivering an incredible symphony of sound.',
        features: [
            'Aerospace Grade 5 Titanium construction',
            'Hand TIG-welded pie cuts with back purging',
            'Signature blue-purple heat gradient finish',
            'Laser-etched VS SPEED branding on tips',
            'Custom 4-inch polished titanium tips',
            'Perfect circular welds - show-quality finish',
            '60% weight reduction vs OEM (45 lbs total)',
            'Valved or non-valved configurations available',
            'Dyno-proven 15-25 HP gains',
            'Exotic symphony exhaust note',
            'Lifetime warranty on welds',
            'Includes installation hardware'
        ],
        fitment: [
            'Lamborghini Huracan LP610-4',
            'Lamborghini Huracan LP580-2',
            'Lamborghini Huracan Performante',
            'Lamborghini Huracan EVO'
        ]
    },
    {
        id: 302,
        mfgPart: 'VSS-ROLL-CAGE',
        title: 'VS SPEED Custom Roll Cage / Aero Fabrication',
        price: 'Request Quote',
        image: vsspeedRollCage,
        category: 'Custom Fabrication',
        brand: 'Custom Fabrication',
        description: 'Specialized fabrication services for safety and aerodynamics. Custom roll cages, splitters, and wings.',
        features: [
            'FIA/SCCA Spec Cages',
            'Carbon Fiber Aero components',
            'Precision chassis reinforcement'
        ],
        fitment: ['Universal Chassis']
    },
    
    // Air/Coolant/Fuel/Oil Line & Hose Upgrades
    {
        id: 500,
        mfgPart: 'VSS-HOSE-BLUE-KIT',
        title: 'VS SPEED Blue Silicone Hose Kit - Complete Coolant System',
        price: '$67.99 USD',
        image: hosesBlueSet,
        category: 'Air/Coolant/Fuel/Oil Lines',
        brand: 'VS SPEED',
        description: 'Complete high-performance silicone coolant hose kit. Replace all factory rubber hoses with premium 5-layer reinforced silicone. Available in VS SPEED signature blue with laser-etched logo.',
        features: [
            '5-layer aramid reinforced construction',
            'Temperature rated: -60°F to 350°F',
            'Pressure rated: 150 PSI burst',
            'VS SPEED logo laser-etched',
            'Includes all clamps and hardware',
            'Lifetime warranty'
        ],
        fitment: ['BMW N54', 'BMW N55', 'BMW B58']
    },
    {
        id: 501,
        mfgPart: 'VSS-ELBOW-90-LARGE',
        title: 'VS SPEED 90° Silicone Elbow - Large (3.5")',
        price: '$44.99 USD',
        image: hosesBlueCatalog1,
        category: 'Air/Coolant/Fuel/Oil Lines',
        brand: 'VS SPEED',
        description: 'Large diameter 90-degree silicone elbow for turbo inlet/outlet applications. 5-ply reinforced with polyester fabric. VS SPEED embossed logo.',
        features: [
            '3.5" (89mm) inner diameter',
            '5-ply reinforced silicone',
            'Temperature range: -60°F to 350°F',
            'Pressure rated: 150 PSI',
            'Available in Blue, Black, Red'
        ],
        fitment: ['Universal - Turbo Applications']
    },
    {
        id: 502,
        mfgPart: 'VSS-ELBOW-45-MED',
        title: 'VS SPEED 45° Silicone Elbow - Medium (2.5")',
        price: '$44.99 USD',
        image: hosesRedCatalog1,
        category: 'Air/Coolant/Fuel/Oil Lines',
        brand: 'VS SPEED',
        description: 'Medium diameter 45-degree silicone elbow. Perfect for intercooler piping and tight engine bay routing. Heat-resistant red silicone with VS SPEED branding.',
        features: [
            '2.5" (63.5mm) inner diameter',
            '4-ply reinforced construction',
            'Temperature range: -60°F to 350°F',
            'Includes stainless T-bolt clamps',
            'VS SPEED logo embossed'
        ],
        fitment: ['Universal - FMIC Piping']
    },
    {
        id: 503,
        mfgPart: 'VSS-STRAIGHT-SMALL',
        title: 'VS SPEED Straight Silicone Coupler - Small (1.5")',
        price: '$24.99 USD',
        image: hosesBlackCatalog,
        category: 'Air/Coolant/Fuel/Oil Lines',
        brand: 'VS SPEED',
        description: 'Small diameter straight silicone coupler for vacuum lines, PCV systems, and coolant routing. Black silicone with subtle VS SPEED logo.',
        features: [
            '1.5" (38mm) inner diameter',
            '3-ply reinforced',
            'Temperature range: -40°F to 300°F',
            'Flexible and durable',
            'Set of 2 included'
        ],
        fitment: ['Universal - All Vehicles']
    },
    {
        id: 504,
        mfgPart: 'VSS-REDUCER-LARGE',
        title: 'VS SPEED Silicone Reducer - Large (3.0" to 2.5")',
        price: '$44.99 USD',
        image: hosesBlueCatalog1,
        category: 'Air/Coolant/Fuel/Oil Lines',
        brand: 'VS SPEED',
        description: 'High-flow silicone reducer for turbo inlet/outlet transitions. Smooth taper design minimizes turbulence. VS SPEED quality construction.',
        features: [
            '3.0" to 2.5" stepped reduction',
            '5-ply aramid reinforced',
            'Smooth internal finish',
            'Temperature rated: -60°F to 350°F',
            'VS SPEED logo embossed'
        ],
        fitment: ['Universal - Turbo Systems']
    },
    {
        id: 505,
        mfgPart: 'VSS-HUMP-MED',
        title: 'VS SPEED Silicone Hump Hose - Medium (2.0")',
        price: '$44.99 USD',
        image: hosesRedCatalog1,
        category: 'Air/Coolant/Fuel/Oil Lines',
        brand: 'VS SPEED',
        description: 'Flexible hump hose for vibration dampening and misalignment compensation. Perfect for coolant and intake applications. Red silicone with VS SPEED branding.',
        features: [
            '2.0" (51mm) inner diameter',
            'Double-hump flexible design',
            '4-ply reinforced construction',
            'Absorbs engine movement',
            'Temperature rated: -60°F to 350°F'
        ],
        fitment: ['Universal - Engine Bay']
    },
    {
        id: 506,
        mfgPart: 'VSS-T-PIECE-MED',
        title: 'VS SPEED Silicone T-Piece - Medium (2.0")',
        price: '$44.99 USD',
        image: hosesBlackCatalog,
        category: 'Air/Coolant/Fuel/Oil Lines',
        brand: 'VS SPEED',
        description: 'T-junction silicone connector for boost reference, coolant distribution, or vacuum routing. Black silicone with clean VS SPEED logo.',
        features: [
            '2.0" main, 0.75" branch',
            '4-ply reinforced',
            'Precision molded',
            'Temperature rated: -60°F to 350°F',
            'Includes hose clamps'
        ],
        fitment: ['Universal - All Applications']
    },
    {
        id: 507,
        mfgPart: 'VSS-ELBOW-135-SMALL',
        title: 'VS SPEED 135° Silicone Elbow - Small (1.75")',
        price: '$24.99 USD',
        image: hosesBlueCatalog1,
        category: 'Air/Coolant/Fuel/Oil Lines',
        brand: 'VS SPEED',
        description: 'Tight-radius 135-degree elbow for cramped engine bay routing. Small diameter for PCV, vacuum, and coolant lines. Blue silicone with VS SPEED logo.',
        features: [
            '1.75" (45mm) inner diameter',
            '3-ply reinforced',
            'Tight bend radius',
            'Temperature rated: -40°F to 300°F',
            'Flexible for tight spaces'
        ],
        fitment: ['Universal - Compact Routing']
    }
];

export const categories = [
    'Air/Coolant/Fuel/Oil Lines',
    'Custom Fabrication',
    'Body Kits',
    'Fuel Pumps',
    'Ignition',
    'Fuel Lines',
    'Filtration',
    'Port Injection',
    'Electronics',
    'Fittings',
    'Accessories',
    'Drivetrain',
    'Exhaust'
];
export const brands = ['Ferrari', 'VS SPEED'];

export default products;
