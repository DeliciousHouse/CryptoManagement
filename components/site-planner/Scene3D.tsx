'use client'

import { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Grid } from '@react-three/drei'
import * as THREE from 'three'
import { ContainerConfig, GeneratorConfig, SiteDimensions } from '@/lib/types'

interface ContainerProps {
  config: ContainerConfig
  index: number
}

function Container({ config, index }: ContainerProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      // Subtle animation
      meshRef.current.position.y = config.z + Math.sin(state.clock.elapsedTime + index) * 0.1
    }
  })

  return (
    <group
      position={[config.x, config.z, config.y]}
      rotation={[0, (config.rotation * Math.PI) / 180, 0]}
    >
      <mesh ref={meshRef} castShadow receiveShadow>
        <boxGeometry args={[6, 2.6, 12]} />
        <meshStandardMaterial
          color="#f97316"
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>
      {/* Container label */}
      <mesh position={[0, 1.5, 0]}>
        <planeGeometry args={[4, 0.5]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
    </group>
  )
}

interface GeneratorProps {
  config: GeneratorConfig
  index: number
}

function Generator({ config, index }: GeneratorProps) {
  const meshRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (meshRef.current) {
      // Rotating fan animation
      const fan = meshRef.current.children[0]
      if (fan) {
        fan.rotation.y = state.clock.elapsedTime * 2
      }
    }
  })

  return (
    <group
      position={[config.x, config.z, config.y]}
      rotation={[0, (config.rotation * Math.PI) / 180, 0]}
      ref={meshRef}
    >
      {/* Generator base */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[4, 2, 4]} />
        <meshStandardMaterial
          color="#3b82f6"
          metalness={0.5}
          roughness={0.6}
        />
      </mesh>
      {/* Rotating fan */}
      <mesh position={[0, 1.5, 0]} castShadow>
        <cylinderGeometry args={[1.5, 1.5, 0.2, 8]} />
        <meshStandardMaterial color="#60a5fa" />
      </mesh>
    </group>
  )
}

interface Scene3DProps {
  containers: ContainerConfig[]
  generators: GeneratorConfig[]
  siteDimensions: SiteDimensions
}

export function Scene3D({
  containers,
  generators,
  siteDimensions,
}: Scene3DProps) {
  return (
    <Canvas
      shadows
      className="w-full h-full"
      gl={{ antialias: true, alpha: true }}
    >
      <PerspectiveCamera makeDefault position={[50, 40, 50]} fov={50} />
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={20}
        maxDistance={200}
      />

      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[50, 50, 50]}
        intensity={0.8}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-50, 30, -50]} intensity={0.3} />

      {/* Ground grid */}
      <Grid
        args={[siteDimensions.width, siteDimensions.length]}
        cellColor="#404040"
        sectionColor="#1a1a1a"
        cellThickness={0.5}
        sectionThickness={1}
        fadeDistance={100}
        fadeStrength={1}
      />

      {/* Ground plane */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[siteDimensions.width / 2, 0, siteDimensions.length / 2]}
        receiveShadow
      >
        <planeGeometry
          args={[siteDimensions.width, siteDimensions.length]}
        />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Render containers */}
      {containers.map((container, index) => (
        <Container key={container.id} config={container} index={index} />
      ))}

      {/* Render generators */}
      {generators.map((generator, index) => (
        <Generator key={generator.id} config={generator} index={index} />
      ))}
    </Canvas>
  )
}

