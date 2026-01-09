import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Deterministic pseudo-random generator (pure across renders)
// https://stackoverflow.com/a/47593316 (mulberry32)
function mulberry32(seed) {
    let a = seed >>> 0;
    return function rand() {
        a |= 0;
        a = (a + 0x6D2B79F5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

// Floating Particles System - Google Antigravity Style
const Particles = () => {
    const particlesRef = useRef();
    const [mousePos, setMousePos] = useState(() => new THREE.Vector2(0, 0));
    const particleCount = 2000; // Signficantly increased for high performance workload

    // Pure/deterministic generation (no Math.random in render)
    const particles = useMemo(() => {
        const rand = mulberry32(0x5A17C0DE); // deterministic seed
        const positions = new Float32Array(particleCount * 3);
        const velocities = [];
        const colors = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (rand() - 0.5) * 40;
            positions[i * 3 + 1] = (rand() - 0.5) * 30;
            positions[i * 3 + 2] = (rand() - 0.5) * 30;

            velocities.push({
                x: (rand() - 0.5) * 0.015,
                y: (rand() - 0.5) * 0.015,
                z: (rand() - 0.5) * 0.01
            });

            const useGold = rand() > 0.7;
            if (useGold) {
                colors[i * 3] = 1.0;
                colors[i * 3 + 1] = 0.84;
                colors[i * 3 + 2] = 0.0;
            } else {
                colors[i * 3] = 0.8 + rand() * 0.2;
                colors[i * 3 + 1] = 0.1 + rand() * 0.2;
                colors[i * 3 + 2] = 0.1;
            }
        }

        return { positions, velocities, colors };
    }, [particleCount]);

    useFrame((state) => {
        if (!particlesRef.current) return;
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
                // Avoid division by zero
                const safeDistance = distance || 0.0001;
                positions[i * 3] += (dx / safeDistance) * force;
                positions[i * 3 + 1] += (dy / safeDistance) * force;
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

// Floating Geometric Shapes
const FloatingShapes = () => {
    const shapes = useMemo(() => {
        const rand = mulberry32(0x00F10A7); // deterministic seed
        return Array.from({ length: 8 }, () => ({
            position: [
                (rand() - 0.5) * 20,
                (rand() - 0.5) * 15,
                (rand() - 0.5) * 10
            ],
            rotation: [rand() * Math.PI, rand() * Math.PI, rand() * Math.PI],
            scale: 0.3 + rand() * 0.7,
            rotationSpeed: [(rand() - 0.5) * 0.01, (rand() - 0.5) * 0.01, (rand() - 0.5) * 0.01],
            type: Math.floor(rand() * 3) // 0: box, 1: sphere, 2: octahedron
        }));
    }, []);

    return (
        <>
            {shapes.map((shape, i) => (
                <FloatingShape key={i} {...shape} />
            ))}
        </>
    );
};

const FloatingShape = ({ position, rotation, scale, rotationSpeed, type }) => {
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
                color={type === 1 ? '#fccf31' : '#ff3c3c'}
                wireframe={true}
                transparent
                opacity={0.2}
                emissive={type === 1 ? '#fccf31' : '#ff3c3c'}
                emissiveIntensity={0.3}
            />
        </mesh>
    );
};

// Enhanced Wave Field with more dynamic motion
const WaveField = () => {
    const meshRef = useRef();

    const shaderArgs = useMemo(() => ({
        uniforms: {
            uTime: { value: 0 },
            uColorLow: { value: new THREE.Color('#ff2222') },
            uColorHigh: { value: new THREE.Color('#ffcc00') }
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
    }), []);

    useFrame((state) => {
        const { clock } = state;
        if (!meshRef.current) return;
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

const Background3D = () => {
    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
            pointerEvents: 'none',
            opacity: 0.7
        }}>
            <Canvas camera={{ position: [0, 3, 12], fov: 50 }}>
                <color attach="background" args={['#08080c']} />
                <ambientLight intensity={0.6} />
                <pointLight position={[10, 10, 10]} intensity={1.2} color="#fccf31" />
                <pointLight position={[-10, -10, -10]} intensity={0.8} color="#ff3c3c" />
                
                <WaveField />
                <Particles />
                <FloatingShapes />
            </Canvas>
        </div>
    );
};

export default Background3D;
