import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from '../../contexts/ThemeContext';

// Floating Particles System - Dynamic Color Theme
const Particles = ({ themeColors }) => {
    const particlesRef = useRef();
    const [mousePos, setMousePos] = useState(new THREE.Vector2(0, 0));
    const particleCount = 2000;

    // Use useState lazy initializer to generate random values only once at mount
    const [particles] = useState(() => {
        const positions = new Float32Array(particleCount * 3);
        const velocities = [];
        const colors = new Float32Array(particleCount * 3);

        // Generate all random values at initialization time
        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 40;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 30;

            velocities.push({
                x: (Math.random() - 0.5) * 0.015,
                y: (Math.random() - 0.5) * 0.015,
                z: (Math.random() - 0.5) * 0.01
            });

            // Use theme colors for particles
            const colorIndex = Math.floor(Math.random() * themeColors.length);
            const themeColor = themeColors[colorIndex];
            const hexColor = new THREE.Color(themeColor);
            colors[i * 3] = hexColor.r;
            colors[i * 3 + 1] = hexColor.g;
            colors[i * 3 + 2] = hexColor.b;
        }

        return { positions, velocities, colors };
    });

    useFrame((state) => {
        const positions = particlesRef.current.geometry.attributes.position.array;
        const time = state.clock.getElapsedTime();

        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] += particles.velocities[i].x;
            positions[i * 3 + 1] += Math.sin(time * 0.5 + i) * 0.002 + particles.velocities[i].y;
            positions[i * 3 + 2] += particles.velocities[i].z;

            // Stronger mouse repulsion
            const dx = positions[i * 3] - mousePos.x * 15;
            const dy = positions[i * 3 + 1] - mousePos.y * 10;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 8) {
                const force = (8 - distance) * 0.02;
                positions[i * 3] += (dx / distance) * force;
                positions[i * 3 + 1] += (dy / distance) * force;
            }

            if (positions[i * 3] > 20) positions[i * 3] = -20;
            if (positions[i * 3] < -20) positions[i * 3] = 20;
            if (positions[i * 3 + 1] > 15) positions[i * 3 + 1] = -15;
            if (positions[i * 3 + 1] < -15) positions[i * 3 + 1] = 15;
        }

        particlesRef.current.geometry.attributes.position.needsUpdate = true;
    });

    useEffect(() => {
        const handleMouse = (e) => {
            setMousePos(new THREE.Vector2(
                (e.clientX / window.innerWidth) * 2 - 1,
                -(e.clientY / window.innerHeight) * 2 + 1
            ));
        };
        window.addEventListener('mousemove', handleMouse);
        return () => window.removeEventListener('mousemove', handleMouse);
    }, []);

    return (
        <points ref={particlesRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particleCount}
                    array={particles.positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={particleCount}
                    array={particles.colors}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.08}
                vertexColors
                transparent
                opacity={0.4}
                sizeAttenuation={true}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
};

// Floating Geometric Shapes with Theme  
const FloatingShapes = ({ themeColors }) => {
    // Use useState lazy initializer to generate random values only once at mount
    const [shapes] = useState(() => {
        // Generate all random values at initialization time
        return Array.from({ length: 8 }, () => ({
            position: [
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 10
            ],
            rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
            scale: 0.3 + Math.random() * 0.7,
            rotationSpeed: [(Math.random() - 0.5) * 0.01, (Math.random() - 0.5) * 0.01, (Math.random() - 0.5) * 0.01],
            type: Math.floor(Math.random() * 3),
            colorIndex: Math.floor(Math.random() * themeColors.length)
        }));
    });

    return (
        <>
            {shapes.map((shape, i) => (
                <FloatingShape key={i} {...shape} themeColor={themeColors[shape.colorIndex]} />
            ))}
        </>
    );
};

const FloatingShape = ({ position, rotation, scale, rotationSpeed, type, themeColor }) => {
    const meshRef = useRef();

    useFrame((state) => {
        if (!meshRef.current) return;
        
        meshRef.current.rotation.x += rotationSpeed[0];
        meshRef.current.rotation.y += rotationSpeed[1];
        meshRef.current.rotation.z += rotationSpeed[2];

        // Gentle floating motion
        meshRef.current.position.y += Math.sin(state.clock.getElapsedTime() + position[0]) * 0.005;
    });

    const geometry = type === 0 
        ? <boxGeometry args={[1, 1, 1]} />
        : type === 1 
        ? <sphereGeometry args={[0.5, 16, 16]} />
        : <octahedronGeometry args={[0.6, 0]} />;

    return (
        <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
            {geometry}
            <meshStandardMaterial
                color={themeColor}
                wireframe={true}
                transparent
                opacity={0.2}
                emissive={themeColor}
                emissiveIntensity={0.3}
            />
        </mesh>
    );
};

// Enhanced Wave Field with dynamic theme colors
const WaveField = ({ waveColor1, waveColor2 }) => {
    const meshRef = useRef();

    const shaderArgs = useMemo(() => ({
        uniforms: {
            uTime: { value: 0 },
            uColorLow: { value: new THREE.Vector3(...waveColor1) },
            uColorHigh: { value: new THREE.Vector3(...waveColor2) }
        },
        vertexShader: `
            uniform float uTime;
            varying vec2 vUv;
            varying float vElevation;
            
            void main() {
                vUv = uv;
                vec4 modelPosition = modelMatrix * vec4(position, 1.0);
                
                // More complex wave pattern
                float elevation = sin(modelPosition.x * 2.0 + uTime * 0.5) * 
                                  sin(modelPosition.z * 1.5 + uTime * 0.3) * 0.4;
                elevation += sin(modelPosition.x * 0.5 + uTime * 0.7) * 
                            cos(modelPosition.z * 0.8 + uTime * 0.4) * 0.3;
                
                modelPosition.y += elevation;
                vElevation = elevation;
                
                vec4 viewPosition = viewMatrix * modelPosition;
                vec4 projectionPosition = projectionMatrix * viewPosition;
                gl_Position = projectionPosition;
            }
        `,
        fragmentShader: `
            uniform vec3 uColorLow;
            uniform vec3 uColorHigh;
            varying float vElevation;
            varying vec2 vUv;
            
            void main() {
                float mixStrength = (vElevation + 0.7) * 0.8;
                vec3 color = mix(uColorLow, uColorHigh, mixStrength);
                float alpha = 0.1 + abs(vElevation) * 0.2;
                gl_FragColor = vec4(color, alpha);
            }
        `
    }), [waveColor1, waveColor2]);

    useFrame((state) => {
        const { clock } = state;
        meshRef.current.material.uniforms.uTime.value = clock.getElapsedTime();
    });

    return (
        <mesh ref={meshRef} rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -3, 0]}>
            <planeGeometry args={[25, 25, 150, 150]} />
            <shaderMaterial
                args={[shaderArgs]}
                transparent={true}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
};

// Rotating Background Images Component
const RotatingBackgroundImages = () => {
    const backgroundImages = [
        '/images/backgrounds/vsspeed-studio-m4.jpg',
        '/images/backgrounds/vsspeed-sunset-m4.jpg',
        '/images/backgrounds/vsspeed-track-m3.jpg',
        '/images/backgrounds/vsspeed-carbon-parts.jpg',
        '/images/backgrounds/vsspeed-worldwide-delivery.jpg'
    ];
    
    const [currentIndex, setCurrentIndex] = useState(0);
    const [nextIndex, setNextIndex] = useState(1);
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsTransitioning(true);
            
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % backgroundImages.length);
                setNextIndex((prev) => (prev + 1) % backgroundImages.length);
                setIsTransitioning(false);
            }, 1500); // 1.5s transition duration
        }, 30000); // 30 seconds

        return () => clearInterval(interval);
    }, [backgroundImages.length]);

    return (
        <>
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url(${backgroundImages[currentIndex]})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    opacity: isTransitioning ? 0 : 0.3,
                    transition: 'opacity 1.5s ease-in-out',
                    filter: 'brightness(0.5) contrast(1.2)',
                    zIndex: 1
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url(${backgroundImages[nextIndex]})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    opacity: isTransitioning ? 0.3 : 0,
                    transition: 'opacity 1.5s ease-in-out',
                    filter: 'brightness(0.5) contrast(1.2)',
                    zIndex: 1
                }}
            />
        </>
    );
};

const Background3D = () => {
    const { currentTheme } = useTheme();

    if (!currentTheme) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
            pointerEvents: 'none',
            opacity: 0.7
        }}>
            <RotatingBackgroundImages />
            <Canvas camera={{ position: [0, 3, 12], fov: 50 }} style={{ position: 'relative', zIndex: 2 }}>
                <color attach="background" args={['rgba(8, 8, 12, 0.2)']} />
                <ambientLight intensity={0.6} />
                <pointLight position={[10, 10, 10]} intensity={1.2} color={currentTheme.secondary} />
                <pointLight position={[-10, -10, -10]} intensity={0.8} color={currentTheme.primary} />
                
                <WaveField waveColor1={currentTheme.waveColor1} waveColor2={currentTheme.waveColor2} />
                <Particles themeColors={currentTheme.particleColors} />
                <FloatingShapes themeColors={currentTheme.particleColors} />
            </Canvas>
        </div>
    );
};

export default Background3D;
