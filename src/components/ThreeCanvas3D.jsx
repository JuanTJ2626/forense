import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// 3D Police Ribbon (Horizontal Header Ribbon)
function CrimeSceneTape3D({ position, rotation, length = 22 }) {
  const tapeTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 64
    const ctx = canvas.getContext('2d')

    ctx.fillStyle = '#eab308'
    ctx.fillRect(0, 0, 512, 64)

    ctx.fillStyle = '#000000'
    for (let i = -64; i < 512 + 64; i += 36) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i + 18, 0)
      ctx.lineTo(i - 8, 64)
      ctx.lineTo(i - 26, 64)
      ctx.fill()
    }

    ctx.fillStyle = '#000000'
    ctx.font = '900 18px monospace'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('ESCENA DEL CRIMEN // POLICÍA FORENSE // PROHIBIDO EL PASO', 256, 32)

    const texture = new THREE.CanvasTexture(canvas)
    texture.wrapS = THREE.RepeatWrapping
    texture.repeat.set(3, 1)
    return texture
  }, [])

  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={[length, 0.4]} />
      <meshBasicMaterial map={tapeTexture} side={THREE.DoubleSide} />
    </mesh>
  )
}

// 3D Evidence Marker Pyramid (01 to 05)
function CrimeEvidenceMarker3D({ position, number }) {
  const groupRef = useRef()

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + number) * 0.03
    }
  })

  const pyramidGeom = useMemo(() => {
    const geom = new THREE.ConeGeometry(0.3, 0.45, 4)
    geom.rotateY(Math.PI / 4)
    return geom
  }, [])

  return (
    <group position={position} ref={groupRef}>
      <mesh geometry={pyramidGeom} position={[0, 0.22, 0]}>
        <meshStandardMaterial
          color="#facc15"
          roughness={0.25}
          metalness={0.3}
          emissive="#eab308"
          emissiveIntensity={0.6}
        />
      </mesh>

      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.15, 0.4, 24]} />
        <meshBasicMaterial color="#facc15" transparent opacity={0.35} />
      </mesh>

      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 1.4, 8]} />
        <meshBasicMaterial color="#ef4444" transparent opacity={0.6} />
      </mesh>
    </group>
  )
}

// 3D Anatomical Body Silhouette (Right side up - Head pointing top-right)
function ChalkBodyOutline3D({ temperature = 29 }) {
  const coreRef = useRef()

  const chalkPoints = useMemo(() => {
    return new Float32Array([
      // Head
      0, 2.0, 0, 0.28, 1.8, 0, 0.22, 1.45, 0,
      // Right Arm
      0.55, 1.35, 0, 0.85, 0.8, 0, 0.75, 0.7, 0, 0.38, 1.2, 0,
      // Right Leg
      0.32, 0.4, 0, 0.48, -0.6, 0, 0.42, -1.5, 0, 0.2, -1.5, 0,
      // Pelvis
      0, -0.4, 0,
      // Left Leg
      -0.2, -1.5, 0, -0.42, -1.5, 0, -0.48, -0.6, 0, -0.32, 0.4, 0,
      // Left Arm
      -0.38, 1.2, 0, -0.75, 0.7, 0, -0.85, 0.8, 0, -0.55, 1.35, 0,
      // Head top
      -0.22, 1.45, 0, -0.28, 1.8, 0, 0, 2.0, 0
    ])
  }, [])

  useFrame((state) => {
    if (coreRef.current) {
      coreRef.current.rotation.z = state.clock.elapsedTime * 0.18
    }
  })

  const thermalColor = useMemo(() => {
    const norm = Math.max(0, Math.min(1, (temperature - 18) / (37 - 18)))
    const color = new THREE.Color()
    color.setHSL(0.6 * (1 - norm), 0.9, 0.5)
    return color
  }, [temperature])

  return (
    <group position={[3.0, 0.02, -0.35]} rotation={[-Math.PI / 2, 0, -Math.PI / 3]} scale={[0.7, 0.7, 0.7]}>
      {/* Chalk Outline Loop with Exact Count */}
      <lineLoop>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={chalkPoints.length / 3}
            array={chalkPoints}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#ffffff" linewidth={3} transparent opacity={0.8} />
      </lineLoop>

      {/* Reticle */}
      <mesh ref={coreRef} position={[0, 0.3, 0]}>
        <ringGeometry args={[1.3, 1.35, 32]} />
        <meshBasicMaterial color={thermalColor} transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>

      {/* Thermal Core */}
      <mesh position={[0, 0.3, -0.01]}>
        <planeGeometry args={[1.4, 2.8]} />
        <meshBasicMaterial color={thermalColor} transparent opacity={0.2} depthWrite={false} />
      </mesh>
    </group>
  )
}

// Master Scene
function MasterCriminologyScene3D({ theme, temperature }) {
  const groupRef = useRef()
  const { mouse } = useThree()

  const rayPoints = useMemo(() => {
    return new Float32Array([
      -3.5, 0.05, 1.0,
      -1.2, 0.05, -2.2,
      2.2, 0.05, -0.4,
      4.5, 0.05, 1.5
    ])
  }, [])

  useFrame(() => {
    if (!groupRef.current) return
    const targetRotX = -Math.PI / 24 + mouse.y * 0.01
    const targetRotY = mouse.x * 0.012

    groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.03
    groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.03
  })

  return (
    <group ref={groupRef} position={[0, -0.18, -0.12]}>
      {/* Ground Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[24, 24]} />
        <meshBasicMaterial color="#06070a" transparent opacity={0.9} />
      </mesh>

      {/* 3D Crime Scene Floor Grid */}
      <gridHelper
        args={[22, 30, '#f59e0b', '#334155']}
        position={[0, 0, 0]}
      >
        <lineBasicMaterial color="#64748b" transparent opacity={0.25} />
      </gridHelper>

      {/* Police Ribbon at Top Horizon */}
      <CrimeSceneTape3D position={[0, 2.3, -6.1]} rotation={[0, 0, 0]} length={20} />

      {/* 3D Chalk Body Outline */}
      <ChalkBodyOutline3D temperature={temperature} />

      {/* Evidence Pyramids 1 to 4 */}
      <CrimeEvidenceMarker3D position={[-3.5, 0, 1.0]} number={1} />
      <CrimeEvidenceMarker3D position={[-1.2, 0, -2.2]} number={2} />
      <CrimeEvidenceMarker3D position={[4.5, 0, 1.5]} number={3} />
      <CrimeEvidenceMarker3D position={[1.5, 0, -2.8]} number={4} />

      {/* Laser Measurement Rays with Dynamic Count */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={rayPoints.length / 3}
            array={rayPoints}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#ef4444" transparent opacity={0.5} />
      </line>

      {/* Studio Lighting */}
      <ambientLight intensity={0.65} />
      <directionalLight position={[6, 12, 8]} intensity={0.95} color="#fde68a" />
      <pointLight position={[3.4, 4, -0.4]} intensity={2.0} color="#ef4444" distance={10} />
      <pointLight position={[-3.8, 3.2, 1.0]} intensity={1.4} color="#eab308" distance={8} />
    </group>
  )
}

export default function ThreeCanvas3D({ theme, temperature }) {
  return (
    <div
      className="canvas-container"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 2.0, 7.0], fov: 46 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#09090b']} />
        <MasterCriminologyScene3D theme={theme} temperature={temperature} />
      </Canvas>

      {/* Vignette Overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          background: 'radial-gradient(circle at 50% 35%, rgba(9,9,11,0.45) 0%, rgba(9,9,11,0.85) 80%)',
        }}
      />
    </div>
  )
}
