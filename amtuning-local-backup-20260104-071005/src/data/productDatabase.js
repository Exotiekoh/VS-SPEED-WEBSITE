import ferrari488Carbon from '../assets/ferrari-488-carbon.png';
import ferrari812Carbon from '../assets/ferrari-812-carbon.png';
import e9xWidebody from '../assets/e9x-widebody.jpg';
import lpfpE9x from '../assets/lpfp-e9x.jpg';


export const products = [
    // Ferrari / Exotic Section
    {
        id: 401,
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
            'FREE GLOBAL SHIPPING'
        ],
        fitment: [
            '2017+ Ferrari 812 Superfast',
            '2019+ Ferrari 812 GTS'
        ]
    },
    // Body Kits
    {
        id: 203,
        title: 'VRS-Style Wide Body Kit Carbon Fiber - Toyota GT86 / Subaru BRZ',
        price: '$3,500 USD',
        image: '../../../.gemini/antigravity/brain/e7f93852-3e61-40b1-aa40-4f4c06288da8/uploaded_image_1767418668772.jpg',
        category: 'Body Kits',
        brand: 'VS SPEED',
        description: 'VRS-Style widebody kit in carbon fiber for Toyota GT86/Subaru BRZ. Complete kit includes front bumper, fender flares, side skirts, rear diffuser, and rear wing. Aggressive styling with premium carbon fiber construction.',
        features: [
            'Full carbon fiber construction',
            'VRS-inspired aggressive design',
            'Complete widebody transformation',
            'Professional installation recommended',
            'Includes all mounting hardware'
        ],
        fitment: [
            '2012-2020 Toyota GT86',
            '2012-2020 Subaru BRZ',
            '2017-2020 Toyota 86'
        ]
    },
    {
        id: 101,
        title: 'BMW E9X Widebody Kit (Concept)',
        price: 'Inquire',
        image: e9xWidebody,
        category: 'Body Kits',
        brand: 'VS SPEED',
        description: 'Aggressive fitment & stance. Carbon / FRP options available. Test Fit / Concept Ad.'
    },
    // Fuel Pumps
    {
        id: 102,
        title: 'E9X / E8X In-Tank Fuel Filter & Regulator (V2)',
        price: '$614.99 CAD',
        image: lpfpE9x,
        category: 'Fuel Pumps',
        brand: 'VS SPEED',
        description: 'E85 compliant Micro-Glass filter with adjustable regulator. Supports 1000+ HP.'
    },
    {
        id: 103,
        title: 'DeatschWerks DW420 420lph In-Tank Fuel Pump BMW E36/E46',
        price: '$272.49 CAD',
        image: 'https://deatschwerks.com/cdn/shop/files/DW-Web-01.png?v=1738698611&width=600',
        category: 'Fuel Pumps',
        brand: 'DeatschWerks',
        description: 'High-flow 420lph in-tank fuel pump with install kit for BMW E36/E46. E85 compatible.'
    },
    {
        id: 104,
        title: 'DeatschWerks DW430C 430LPH Compact Fuel Pump VW Golf',
        price: '$299.49 CAD',
        image: 'https://deatschwerks.com/cdn/shop/articles/DW430c_In_Tank_Pump_016f90c4-4dab-4724-9a4e-caa4f3bd4a41.png?v=1746806196&width=1100',
        category: 'Fuel Pumps',
        brand: 'DeatschWerks',
        description: 'Compact 430lph fuel pump designed for VW Golf MK7 platform. E85 compatible.'
    },
    {
        id: 105,
        title: 'Radium Engineering BMW E46 Fuel Pump Hanger',
        price: '$717.49 CAD',
        image: 'https://www.radiumauto.com/cdn/shop/files/20-1180_E461x1.jpg?v=1748988348&width=1000',
        category: 'Fuel Pumps',
        brand: 'Radium Engineering',
        description: 'OEM-quality fuel pump hanger for BMW E46. Supports multiple pump configurations.'
    },
    {
        id: 106,
        title: 'CTS MK4 Inline Fuel Pump Kit',
        price: '$285.73 CAD',
        image: 'https://ctsturbo.com/wp-content/uploads/2018/11/cts-fpk-001-1-1.jpg',
        category: 'Fuel Pumps',
        brand: 'CTS Turbo',
        description: 'Complete inline fuel pump kit for VW MK4 platform. High-flow fuel delivery.'
    },
    {
        id: 107,
        title: 'AMS Performance Omega Fuel System R35 GT-R',
        price: '$3,125.83 CAD',
        image: 'https://cdn.vividracing.com/file/vr23/449/1/alp.07.07.0010-2_1.webp?w=1024',
        category: 'Fuel Pumps',
        brand: 'AMS Performance',
        description: 'Premium single-pump fuel system for Nissan GT-R R35. 1000+ HP capable.'
    },
    {
        id: 108,
        title: 'Autotech OEM Fuel Pump Assembly MK6 TSI 2.0T',
        price: '$439.99 CAD',
        image: 'https://www.amtuning.ca/cdn/shop/products/m198644494_1024x1024.jpg?v=1680282688',
        category: 'Fuel Pumps',
        brand: 'Autotech',
        description: 'OEM-spec fuel pump assembly for VW MK6 2.0T TSI engines.'
    },
    // Ignition Systems
    {
        id: 109,
        title: 'APR Ignition Coil Pack - Red/Grey/Blue',
        price: '$64.28 CAD',
        image: 'https://www.amtuning.ca/cdn/shop/products/ms100192_001_1797x.jpg?v=1680263372',
        category: 'Ignition',
        brand: 'APR',
        description: 'High-performance ignition coil pack from APR. Multiple color options available.'
    },
    {
        id: 110,
        title: 'DINAN Ignition Coil N-Series (N20/N52/N54/N55/S55/S63)',
        price: '$41.40 CAD',
        image: 'https://images.dinancars.com/1024x/3d29bb5cf93284b69ad19950cf3f7f767737ba1d.jpg',
        category: 'Ignition',
        brand: 'Dinan',
        description: 'High-output ignition coil for BMW N-Series engines. Red, Black, or Blue options.'
    },
    // VRSF Products
    {
        id: 200,
        title: 'VRSF Catted Downpipes for 2019 – 2022 BMW X3M & X4M S58 F97 F98',
        price: '$1,200 CAD',
        image: 'https://www.vr-speed.com/wp-content/uploads/2021/01/VRSF-10972011-321x218.jpg',
        category: 'Exhaust',
        brand: 'VRSF',
        description: 'Catted downpipes for BMW X3M & X4M S58 models, improving exhaust flow and sound.',
        features: [],
        fitment: []
    },
    {
        id: 201,
        title: 'VRSF Racing Downpipes S58 2019 – 2022 BMW X3M & X4M F97 F98 – 10972010',
        price: '$1,150 CAD',
        image: 'https://www.vr-speed.com/wp-content/uploads/2021/01/VRSF-10972010-321x218.jpg',
        category: 'Exhaust',
        brand: 'VRSF',
        description: 'Racing downpipes for BMW X3M & X4M S58 models, delivering high performance.',
        features: [],
        fitment: []
    },
    // VRSF Performance Products from VR-Speed.com
    {
        id: 204,
        title: 'VRSF 1000whp 7.5" Stepped Race Intercooler FMIC Upgrade Kit',
        price: '$549.99 CAD',
        image: 'https://www.vr-speed.com/wp-content/uploads/2016/08/VRSF-10903050-wpp1600376491148-321x218.jpg',
        gallery: [
            'https://www.vr-speed.com/wp-content/uploads/2012/12/VRSF-10903070-wpp1600377609923.jpg',
            'https://www.vr-speed.com/wp-content/uploads/2012/12/vrsf-n54fmic-competition_2-wpp1600379984227.jpg'
        ],
        category: 'Intercoolers',
        brand: 'VRSF',
        sourceLink: 'https://www.vr-speed.com/product/vrsf-7-5-stepped-race-intercooler-fmic-upgrade-kit-07-12-135i-335i-n54-n55-e82-e90-e92',
        description: 'High-density stepped core designed for maximum cooling efficiency and minimal pressure drop. Capable of supporting up to 1000whp.',
        features: [
            'High-density stepped core design',
            'Maximum cooling efficiency',
            'Minimal pressure drop',
            'Supports up to 1000whp',
            'Direct bolt-on installation'
        ],
        fitment: ['2007-2012 BMW 135i/335i N54 & N55 E82 E90 E92 E93']
    },
    {
        id: 205,
        title: 'VRSF Dual Cone Intake (DCI)',
        price: '$109.99 CAD',
        image: 'https://www.vr-speed.com/wp-content/uploads/2014/05/vrsf-n54-dci-2_1-1400x918.jpg',
        gallery: [
            'https://www.vr-speed.com/wp-content/uploads/2014/05/vrsf-n54-dci-2_1-1400x918.jpg'
        ],
        category: 'Intakes',
        brand: 'VRSF',
        sourceLink: 'https://www.vr-speed.com/product/vrsf-performance-intake-kit-07-13-bmw-n54-e88-e90-e92-e60',
        description: 'Replaces the restrictive factory intake system with open air filters to increase airflow in the mid to upper RPM range.',
        features: [
            'Replaces restrictive factory intake',
            'Open air filter design',
            'Increased airflow mid to upper RPM',
            'Direct bolt-on',
            'Includes all hardware'
        ],
        fitment: ['2007-2013 BMW N54 135i, 335i, 535i, Z4 E88, E89, E90, E92, E60']
    },
    {
        id: 206,
        title: 'VRSF 3.5" Street Stainless Steel Catback Exhaust',
        price: '$999.99 CAD',
        image: 'https://www.vr-speed.com/wp-content/uploads/2014/11/VRSF-10902020.jpg',
        gallery: [
            'https://www.vr-speed.com/wp-content/uploads/2014/11/VRSF-10202020B-wpp1600377289525.jpg'
        ],
        category: 'Exhaust',
        brand: 'VRSF',
        sourceLink: 'https://www.vr-speed.com/product/vrsf-3-5-street-stainless-steel-catback-exhaust-07-12-bmw-335i-335xi',
        description: 'High-quality stainless steel catback exhaust designed for maximum flow and an aggressive sound profile.',
        features: [
            'High-quality stainless steel construction',
            'Maximum exhaust flow',
            'Aggressive sound profile',
            '3.5" diameter piping',
            'Complete bolt-on kit'
        ],
        fitment: ['2007-2013 BMW 335i/335is E90 & E92']
    },
    {
        id: 207,
        title: 'VRSF B58 Downpipe Upgrade',
        price: '$319.99 CAD',
        image: 'https://www.vr-speed.com/wp-content/uploads/2017/01/VRSF_10582010.jpg',
        gallery: [
            'https://www.vr-speed.com/wp-content/uploads/2019/01/VRSF_10582020.jpg',
            'https://www.vr-speed.com/wp-content/uploads/2023/04/58hs.png'
        ],
        category: 'Downpipes',
        brand: 'VRSF',
        sourceLink: 'https://www.vr-speed.com/product/vrsf-4-5-catless-downpipe-b58-2016-bmw-340i-440i-740i-xdrive',
        description: 'Eliminates the restrictive factory catalytic converter for increased power and throttle response on B58 engines.',
        features: [
            'Eliminates restrictive factory cat',
            'Increased power and throttle response',
            'Stainless steel construction',
            '3.5" diameter',
            'Direct bolt-on installation'
        ],
        fitment: ['2016-2022 BMW M240i/340i/440i/540i/740i/840i & xDrive']
    },
    {
        id: 208,
        title: 'VRSF Chargepipe Upgrade Kit (N54/N55)',
        price: '$149.99 CAD',
        image: 'https://www.vr-speed.com/wp-content/uploads/2013/10/VRSF-10901020D_1-wpp1600377200365.jpg',
        gallery: [
            'https://www.vr-speed.com/wp-content/uploads/2013/10/VRSF-10901020C_2-wpp1600377124979.jpg',
            'https://www.vr-speed.com/wp-content/uploads/2018/06/tialblack.png'
        ],
        category: 'Charge Pipes',
        brand: 'VRSF',
        sourceLink: 'https://www.vr-speed.com/product/vrsf-chargepipe-upgrade-07-13-bmw-135i-335i-n54-n55',
        description: 'Mandrel-bent aluminum charge pipe replaces the fragile plastic factory pipe to prevent failure under high boost.',
        features: [
            'Mandrel-bent aluminum construction',
            'Prevents factory pipe failure',
            'High boost capable',
            'Direct OEM fitment',
            'Includes silicone couplers and clamps'
        ],
        fitment: ['2007-2013 BMW 135i, 335i, 335is & X1 N54/N55 E84, E88, E90, E92']
    },
    {
        id: 209,
        title: 'VRSF Ceramic Coated Downpipe Upgrade (N55)',
        price: '$309.99 CAD',
        image: 'https://www.vr-speed.com/wp-content/uploads/2012/12/VRSF-10902015_5-wpp1600377520312.jpg',
        gallery: [
            'https://www.vr-speed.com/wp-content/uploads/2012/12/VRSF-10902015_6jpg-wpp1600377506986.jpg'
        ],
        category: 'Downpipes',
        brand: 'VRSF',
        sourceLink: 'https://www.vr-speed.com/shop',
        description: 'Ceramic coated for heat management, this downpipe improves exhaust flow and significantly increases performance.',
        features: [
            'Ceramic coating for heat management',
            'Improved exhaust flow',
            'Significant performance increase',
            'Stainless steel construction',
            'Direct bolt-on'
        ],
        fitment: ['2010-2013 BMW 135i/335i/X1 N55']
    },
    {
        id: 210,
        title: 'VRSF Front Facing Air Intakes (S55)',
        price: '$469.99 CAD',
        image: 'https://www.vr-speed.com/wp-content/uploads/2017/09/VRSF-10801020.jpg',
        gallery: [
            'https://www.vr-speed.com/wp-content/uploads/2017/09/22091481_329957327415198_349789517_n.jpg',
            'https://www.vr-speed.com/wp-content/uploads/2017/09/20182701_307531116324486_405975654_n.jpg'
        ],
        category: 'Intakes',
        brand: 'VRSF',
        sourceLink: 'https://www.vr-speed.com/product/vrsf-front-facing-air-intakes-2015-bmw-m3-m4-f80-f82-s55',
        description: 'Positions air filters directly behind the front grilles for the coldest air intake possible on S55 engines.',
        features: [
            'Front-facing cold air intake design',
            'Maximum air temperature reduction',
            'High-flow air filters',
            'Aluminum construction',
            'Dyno-proven power gains'
        ],
        fitment: ['2015-2020 BMW M3 & M4 F80 F82 S55']
    },
    {
        id: 211,
        title: 'VRSF Charge Pipe Upgrade Kit (S55)',
        price: '$319.99 CAD',
        image: 'https://www.vr-speed.com/wp-content/uploads/2016/08/VRSF-10801050_1-wpp1600377088223.jpg',
        gallery: [
            'https://www.vr-speed.com/wp-content/uploads/2016/08/VRSF-10801050_4-wpp1600377075576.jpg'
        ],
        category: 'Charge Pipes',
        brand: 'VRSF',
        sourceLink: 'https://www.vr-speed.com/product/vrsf-charge-pipe-upgrade-kit-15-18-bmw-m3-m4-f80-f82-f87-s55',
        description: 'Strong aluminum construction prevents the common factory charge pipe failures on high-boost M3/M4 models.',
        features: [
            'Strong aluminum construction',
            'Prevents factory pipe failure',
            'High boost capable',
            'Direct OEM fitment',
            'Includes all necessary hardware'
        ],
        fitment: ['2015-2019 BMW M3, M4 & M2 Competition F80 F82 F87 S55']
    },
    {
        id: 212,
        title: 'VRSF B48 B46 B58 Front Mount Intercooler Upgrade',
        price: '$469.99 CAD',
        image: 'https://www.vr-speed.com/wp-content/uploads/2022/09/vrsf_10583010-scaled_2048x2048.webp',
        category: 'Intercoolers',
        brand: 'VRSF',
        sourceLink: 'https://www.vr-speed.com/shop',
        description: 'Enhanced cooling for the newer B-series engines, providing consistent performance and lower intake temps.',
        features: [
            'Enhanced cooling for B-series engines',
            'Lower intake temperatures',
            'Consistent high performance',
            'Direct bolt-on installation',
            'High-flow core design'
        ],
        fitment: ['2016-2019 BMW M140i/M240i/340i/440i & xDrive']
    },
    {
        id: 213,
        title: 'VRSF 2.5" Lower Charge Pipe LCP',
        price: '$92.99 CAD',
        image: 'https://www.vr-speed.com/wp-content/uploads/2018/03/vrsf-e90-lcp.jpg',
        category: 'Charge Pipes',
        brand: 'VRSF',
        sourceLink: 'https://www.vr-speed.com/product/vrsf-2-5-lower-chargepipe-lcp-07-12-135i-335i-535i',
        description: 'High-flow aluminum lower charge pipe that smooths air path to the intercooler.',
        features: [
            'High-flow aluminum construction',
            'Smoother air path to intercooler',
            'Reduced turbulence',
            'Direct OEM fitment',
            'Includes silicone couplers'
        ],
        fitment: ['2007-2012 BMW 135i/335i N54 & N55 E82/E90/E92']
    },
    {
        id: 214,
        title: 'VRSF Aluminum Oil Catch Can',
        price: '$199.99 CAD',
        image: 'https://www.vr-speed.com/wp-content/uploads/2019/02/VRSF-205420_3-wpp1600376998669.jpg',
        gallery: [
            'https://www.vr-speed.com/wp-content/uploads/2019/07/VRSF-205420_1-wpp1600377013658.jpg'
        ],
        category: 'Accessories',
        brand: 'VRSF',
        sourceLink: 'https://www.vr-speed.com/shop',
        description: 'Prevents oil vapors from entering the intake system, keeping valves clean and preventing carbon buildup.',
        features: [
            'Prevents oil vapor in intake',
            'Keeps valves clean',
            'Prevents carbon buildup',
            'Billet aluminum construction',
            'Easy drain design'
        ],
        fitment: ['BMW N54 135i, 335i, 535i']
    },
    {
        id: 219,
        title: 'VRSF Stainless Steel Muffler Delete (E90/E92 335i)',
        price: '$269.99 CAD',
        image: 'https://www.vr-speed.com/wp-content/uploads/2018/10/vrsf-e90-n54-ex500-e1642445094222.jpg',
        gallery: [
            'https://www.vr-speed.com/wp-content/uploads/2020/10/VRSF-502055.jpg'
        ],
        category: 'Exhaust',
        brand: 'VRSF',
        sourceLink: 'https://www.vr-speed.com/product/vrsf-stainless-steel-muffler-delete-for-07-13-bmw-335i-335xi-335is-e90-e91-e92-e93-n54-n55',
        description: 'Eliminates heavy factory mufflers for weight savings and a more aggressive tone.',
        features: [
            'Lightweight stainless steel constructon',
            'Significant weight reduction',
            'Aggressive exhaust note',
            'Direct bolt-on',
            'Includes all hardware'
        ],
        fitment: ['2007-2013 BMW 335i/335is E90 E92']
    },
    {
        id: 215,
        title: 'VRSF Catted Downpipes (S58)',
        price: '$619.99 CAD',
        image: 'https://www.vr-speed.com/wp-content/uploads/2021/01/VRSF-10972011.jpg',
        gallery: [
            'https://www.vr-speed.com/wp-content/uploads/2019/02/VRSF-GAS100_2-wpp1600376559330.jpg'
        ],
        category: 'Downpipes',
        brand: 'VRSF',
        sourceLink: 'https://www.vr-speed.com/shop',
        description: 'High-flow catalytic converters provide increased power while maintaining emissions compliance for S58 engines.',
        features: [
            'High-flow catalytic converters',
            'Emissions compliant',
            'Significant power increase',
            'Stainless steel construction',
            'Direct bolt-on installation'
        ],
        fitment: ['2019-2022 BMW X3M & X4M S58 F97 F98']
    },
    {
        id: 216,
        title: 'VRSF 90mm Stainless Steel Exhaust Tips',
        price: '$189.99 CAD',
        image: 'https://www.vr-speed.com/wp-content/uploads/2016/02/VRSF-10802060-wpp1600377211465.jpg',
        gallery: [
            'https://www.vr-speed.com/wp-content/uploads/2016/02/2015-10-27_14.04.45_1.jpg'
        ],
        category: 'Exhaust',
        brand: 'VRSF',
        sourceLink: 'https://www.vr-speed.com/product/vrsf-90mm-stainless-steel-exhaust-tips-14-f80-f82-bmw-m3-m4',
        description: 'Upgraded large-diameter stainless steel tips for a more aggressive look on the M3 and M4.',
        features: [
            '90mm diameter tips',
            'Stainless steel construction',
            'Aggressive styling',
            'Direct bolt-on',
            'Polished finish'
        ],
        fitment: ['2014+ BMW M3 & M4 F80/F82']
    },
    {
        id: 217,
        title: 'VRSF Charge Pipe Upgrade Kit (B58)',
        price: '$239.99 CAD',
        image: 'https://www.vr-speed.com/wp-content/uploads/2019/10/VRSF-10581030_1-wpp1600378261490-321x218.jpg',
        category: 'Charge Pipes',
        brand: 'VRSF',
        description: 'Designed to withstand higher boost pressures on B58 engines, replacing the weak plastic factory unit.',
        features: [
            'Withstands higher boost pressures',
            'Replaces weak plastic factory pipe',
            'Aluminum construction',
            'Direct OEM fitment',
            'Includes all hardware'
        ],
        fitment: ['2016-2023 BMW B58 M140i, M240i, 340i, 440i, 540i, 740i, X3 & X4']
    },
    {
        id: 218,
        title: 'VRSF 3.5" Turbo to Downpipe V-Band Exhaust Clamp',
        price: '$38.99 CAD',
        image: 'https://www.vr-speed.com/wp-content/uploads/2018/07/dp-clamp-100-e1607464095141-321x211.jpg',
        category: 'Accessories',
        brand: 'VRSF',
        description: 'High-strength V-band clamp for securing the downpipe to the turbo housing.',
        features: [
            'High-strength V-band design',
            '3.5" diameter',
            'Stainless steel construction',
            'Easy installation',
            'Leak-proof seal'
        ],
        fitment: ['BMW 135i, 335i, 535i, 640i, Z4, M3, M4, M5, M6 N54/N55/S55']
    },
    {
        id: 111,
        title: 'CTS Turbo High Performance Ignition Coil BMW N54/N55',
        price: '$31.55 CAD',
        image: 'https://ctsturbo.com/wp-content/uploads/2021/10/BMWCOIL-1.jpg',
        category: 'Ignition',
        brand: 'CTS Turbo',
        description: 'Performance ignition coil for BMW N20/N52/N54/N55/S55 engines. 15% stronger spark.'
    },
    {
        id: 112,
        title: 'DINAN Ignition Coil B-Series (B58/S58)',
        price: '$49.98 CAD',
        image: 'https://www.amtuning.ca/cdn/shop/products/d650-0009_1_1800x.jpg?v=1680286834',
        category: 'Ignition',
        brand: 'Dinan',
        description: 'High-output ignition coil for BMW B-Series engines (B58/S58). Red or Black.'
    },
    {
        id: 113,
        title: 'APR Iridium Pro Spark Plugs (Set of 4)',
        price: '$148.00 CAD',
        image: 'https://www.amtuning.ca/cdn/shop/files/z1003100_001_5000x.jpg?v=1715368027',
        category: 'Ignition',
        brand: 'APR',
        description: 'APR Iridium Pro Spark Plugs. Heat Range 10 - ideal for tuned applications.'
    },
    // Fuel Lines
    {
        id: 114,
        title: 'CTS Bosch 60mm Fuel Pump Adapter Kit',
        price: '$154.91 CAD',
        image: 'https://www.amtuning.ca/cdn/shop/products/cts-hw-267-1_1080x.jpg?v=1680275739',
        category: 'Fuel Lines',
        brand: 'CTS Turbo',
        description: 'Fuel pump adapter kit for Bosch 60mm pumps. Universal application.'
    },
    {
        id: 115,
        title: '034 Motorsport High Pressure Fuel Pump Tool EA839',
        price: '$27.40 CAD',
        image: 'https://www.034motorsport.com/media/catalog/product/cache/0835cbe9791b54012685dcc62339b977/h/i/high-pressure-fuel-pump-tool-ea839-v6-engines-2-9t-3-0t-034-106-z068-1.jpg',
        category: 'Fuel Lines',
        brand: '034 Motorsport',
        description: 'HPFP tool for EA839 V6 engines (2.9T/3.0T). Essential for fuel system service.'
    },
    {
        id: 116,
        title: 'Radium Engineering Porsche 996 Fuel Pump Install Kit',
        price: '$78.49 CAD',
        image: 'http://www.amtuning.ca/cdn/shop/files/573e80570bb367076f6c8a052191dd37L_1024x1024.jpg?v=1730234269',
        category: 'Fuel Lines',
        brand: 'Radium Engineering',
        description: 'Fuel pump installation kit for Porsche 911/996. Pump not included.'
    },
    {
        id: 117,
        title: 'Radium Engineering BMW E36 Fuel Pump Hanger',
        price: '$717.49 CAD',
        image: 'http://www.amtuning.ca/cdn/shop/files/80974510f4617026dea9ffb4d2b1b8eaL_1024x1024.jpg?v=1755316332',
        category: 'Fuel Lines',
        brand: 'Radium Engineering',
        description: 'Complete fuel pump hanger kit for BMW E36. Multiple pump configurations.'
    },
    // Filtration & Regulation
    {
        id: 118,
        title: 'BM3 FlexFuel Kit with Ethanol Sensor',
        price: '$899.00 CAD',
        image: 'http://www.amtuning.ca/cdn/shop/files/IG-1_900x_b3f7fe28-bf3c-420b-859e-5228742a46b3_1024x1024.webp?v=1697139756',
        category: 'Filtration',
        brand: 'Bootmod3',
        description: 'Complete flex fuel kit from Bootmod3. Includes ethanol sensor and wiring.'
    },
    {
        id: 119,
        title: 'Fuel-It! Flex Fuel Kit S58 BMW G80 M3 / G82 M4',
        price: '$629.99 CAD',
        image: 'http://www.amtuning.ca/cdn/shop/products/s58_fuel_it_1_1024x1024.jpg?v=1680284983',
        category: 'Filtration',
        brand: 'Burger Motorsports',
        description: 'Complete flex fuel kit for BMW S58 engines. G80 M3 and G82/G83 M4 compatible.'
    },
    {
        id: 120,
        title: 'Unitronic UniFLEX Hardware Kit 2.0TSI EVO4',
        price: '$559.99 CAD',
        image: 'http://www.amtuning.ca/cdn/shop/files/uniflexmqbea888evo4title2aweb_1024x1024.jpg?v=1715355930',
        category: 'Filtration',
        brand: 'Unitronic',
        description: 'UniFLEX hardware kit with ethanol sensor for 2.0TSI EVO4 engines.'
    },
    // Port Injection / Electronics
    {
        id: 121,
        title: '034 Motorsport Ethanol Content Gauge Kit RS3/TTRS',
        price: '$767.52 CAD',
        image: 'http://www.amtuning.ca/cdn/shop/products/034-605-1017-1_1024x1024.jpg?v=1680276848',
        category: 'Port Injection',
        brand: '034 Motorsport',
        description: 'Ethanol content gauge kit for Audi RS3 (8V.5) and TTRS (8S).'
    },
    {
        id: 122,
        title: 'RacingLine High-Output Ignition Coil VW/Audi',
        price: '$65.00 CAD',
        image: 'http://www.amtuning.ca/cdn/shop/files/53089252135_41363b4164_k_1024x1024_2x_254df78b-d3be-4a78-8f10-fd5bcdf42e22_1024x1024.webp?v=1698863587',
        category: 'Electronics',
        brand: 'RacingLine',
        description: 'High-output ignition coil for VW/Audi vehicles. Improved spark energy.'
    },
    {
        id: 123,
        title: 'VW/Audi OEM Performance Ignition Coil Pack',
        price: '$69.99 CAD',
        image: 'https://precisionraceworks.com/cdn/shop/products/N54_Ignition_Kit_grande.jpg',
        category: 'Electronics',
        brand: 'VS SPEED',
        description: 'OEM-spec performance ignition coil for VW/Audi platforms.'
    },
    {
        id: 124,
        title: 'Bosch Pencil Type Ignition Coil BMW',
        price: '$28.49 CAD',
        image: 'http://www.amtuning.ca/cdn/shop/files/2651ade2864581255bef8ad76d67a301_1024x1024.png?v=1719958798',
        category: 'Fittings',
        brand: 'Bosch',
        description: 'OEM Bosch pencil-type ignition coil for BMW vehicles.'
    },
    // Accessories
    {
        id: 125,
        title: 'CTS Turbo High Performance Ignition Coil Gen3 TSI',
        price: '$45.89 CAD',
        image: 'http://www.amtuning.ca/cdn/shop/products/cts-ign-007-2_1024x1024.jpg?v=1680269693',
        category: 'Accessories',
        brand: 'CTS Turbo',
        description: 'Performance ignition coil for Gen3 TSI engines (1.8T-4.0T).'
    },
    {
        id: 126,
        title: 'CTS Turbo BMW/Toyota High-Performance Ignition Coil B58',
        price: '$39.58 CAD',
        image: 'http://www.amtuning.ca/cdn/shop/products/cts-ign-009-4_1024x1024.jpg?v=1680287282',
        category: 'Fuel Pumps',
        brand: 'CTS Turbo',
        description: 'Performance ignition coil for BMW B58/S58 and Toyota Supra.'
    },
    {
        id: 127,
        title: '034 Motorsport High Output Ignition Coil EA8XX',
        price: '$68.50 CAD',
        image: 'http://www.amtuning.ca/cdn/shop/products/screenshot_2022-10-25_130601_1024x1024.png?v=1680289077',
        category: 'Fuel Pumps',
        brand: '034 Motorsport',
        description: 'High-output ignition coil for EA8XX engines. Performance upgrade.'
    },
    // Drivetrain - Unitronic
    {
        id: 128,
        title: 'Unitronic DQ381.2 Unlocked TCU (UH002-DR2)',
        price: '$1,299.99 CAD',
        image: 'http://www.amtuning.ca/cdn/shop/files/blxxx301tcuphotoswebtitle2web_1024x1024.jpg?v=1748106543',
        category: 'Drivetrain',
        brand: 'Unitronic',
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
            '2022+ VW Golf R 2.0TSI EA888.4 MQB EVO',
            '2022+ Audi S3 2.0TSI EA888.4 MQB EVO (8Y)',
            '2022+ VW GTI 2.0TSI EA888.4 MQB EVO (MK8)'
        ]
    },
    // Custom Fabrication Section
    {
        id: 300,
        title: 'Custom VS Speed Titanium Exhaust System',
        price: 'Request Quote',
        image: 'https://cdn.shopify.com/s/files/1/0273/1933/6983/products/Exhaust_1024x1024.jpg?v=1592476571',
        category: 'Custom Fabrication',
        brand: 'Custom Fabrication',
        description: 'Fully custom, hand-built titanium exhaust systems for supercars. Optimized for weight and acoustics.',
        features: [
            'Hand-welded Grade 5 Titanium',
            'Custom tip designs',
            'Valved or non-valved options',
            'Precision fitment'
        ]
    },
    {
        id: 301,
        title: 'Hand-Built Turbo Manifold - N54/N55',
        price: '$1,850 CAD',
        image: 'https://performancebyrogers.com/cdn/shop/products/N54Manifold-1_1024x1024.jpg?v=1614742581',
        category: 'Custom Fabrication',
        brand: 'Custom Fabrication',
        description: 'TIG-welded, back-purged custom turbo manifold for maximum flow and reliability.',
        features: [
            '304L Stainless Steel',
            'Precision CNC Flanges',
            'Optimized Runner Design',
            'Lifetime Warranty on welds'
        ]
    },
    {
        id: 302,
        title: 'Custom Roll Cage / Aero Fabrication',
        price: 'Request Quote',
        image: 'https://www.chassisbuilt.com.au/cdn/shop/files/IMG_3962_600x600.jpg?v=1692244455',
        category: 'Custom Fabrication',
        brand: 'Custom Fabrication',
        description: 'Specialized fabrication services for safety and aerodynamics. Custom roll cages, splitters, and wings.',
        features: [
            'FIA/SCCA Spec Cages',
            'Carbon Fiber Aero components',
            'Precision chassis reinforcement'
        ]
    }
];

export const categories = [
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
export const brands = ['Ferrari', 'Precision Raceworks', 'MOTIV', 'NGK', 'VS SPEED', 'Unitronic', 'APR', 'Dinan', 'CTS Turbo', 'DeatschWerks', '034 Motorsport', 'Radium Engineering', 'AMS Performance', 'Autotech', 'Bootmod3', 'Burger Motorsports', 'RacingLine', 'Bosch', 'VRSF', 'Custom Fabrication'];

export default products;
