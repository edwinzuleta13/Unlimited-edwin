"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { OrbitControls, PerspectiveCamera } from "@react-three/drei"
import type * as THREE from "three"

function Model() {
  const mesh = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.getElapsedTime() * 0.5
      mesh.current.rotation.z = state.clock.getElapsedTime() * 0.2
      mesh.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.2
    }
  })

  return (
    <mesh ref={mesh}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color="#9333ea"
        metalness={0.9}
        roughness={0.1}
        emissive="#9333ea"
        emissiveIntensity={0.5}
        wireframe={true}
      />
    </mesh>
  )
}

export default function Scene() {
  return (
    <div className="h-full w-full min-h-[400px]">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Model />
      </Canvas>
    </div>
  )
}

