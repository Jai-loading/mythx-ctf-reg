"use client"

import React, { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Environment, ContactShadows, useTexture, Decal } from "@react-three/drei"
import * as THREE from "three"

interface LogoProps {
    logoSrc: string
}

function Coin({ logoSrc }: LogoProps) {
    const meshRef = useRef<THREE.Mesh>(null)

    // Load texture inside a suspendable component
    const texture = useTexture(logoSrc)

    // Create a stunning slow continuous rotation
    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.4
            meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
            meshRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.3) * 0.1
        }
    })

    // A sleek dark metallic look for the token base
    const materialProps = {
        color: "#0a1f14",
        metalness: 0.9,
        roughness: 0.1,
        envMapIntensity: 1.5,
    }

    return (
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            <mesh ref={meshRef} castShadow rotation={[Math.PI / 2, 0, 0]}>
                {/* The 3D token body: radius 2.2, thickness 0.4 */}
                <cylinderGeometry args={[2.5, 2.5, 0.35, 64]} />
                <meshStandardMaterial {...materialProps} />

                {/* Front face Decal */}
                <Decal
                    position={[0, 0.176, 0]}
                    rotation={[-Math.PI / 2, 0, 0]}
                    scale={3.6}
                    map={texture}
                />
                {/* Back face Decal */}
                <Decal
                    position={[0, -0.176, 0]}
                    rotation={[Math.PI / 2, 0, Math.PI]}
                    scale={3.6}
                    map={texture}
                />

                {/* Green inner glowing edge (adds MythX branding to the rim) */}
                <mesh position={[0, 0, 0]}>
                    <cylinderGeometry args={[2.51, 2.51, 0.05, 64]} />
                    <meshBasicMaterial color="#218c63" />
                </mesh>
            </mesh>
        </Float>
    )
}

export default function ThreeDLogo({ logoSrc }: LogoProps) {
    return (
        <div className="w-full h-full min-h-[400px] absolute inset-0 rounded-[3rem] overflow-hidden">
            <Canvas shadows camera={{ position: [0, 0, 8], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1.5} color="#00ff9d" />
                <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#ffffff" />

                {/* HDRI lighting for realistic metal reflections */}
                <Environment preset="city" />

                <React.Suspense fallback={null}>
                    <Coin logoSrc={logoSrc} />
                </React.Suspense>

                {/* Soft ground shadow below the coin */}
                <ContactShadows
                    position={[0, -3.5, 0]}
                    opacity={0.4}
                    scale={15}
                    blur={2.5}
                    far={4}
                    color="#00ff9d"
                />
            </Canvas>
        </div>
    )
}
