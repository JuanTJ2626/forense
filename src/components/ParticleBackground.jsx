import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'

function InteractiveGrid({ theme }) {
  const meshRef = useRef()
  const { mouse, viewport } = useThree()
  
  const count = 1200
  const isDark = theme === 'dark'

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const originalPos = new Float32Array(count * 3)
    
    let i = 0
    // Create a 3D grid/cloud
    for (let x = -10; x < 10; x += 0.8) {
      for (let y = -10; y < 10; y += 0.8) {
        for (let z = -2; z < 2; z += 0.6) {
          if (i >= count) break
          const px = x + (Math.random() - 0.5)
          const py = y + (Math.random() - 0.5)
          const pz = z + (Math.random() - 0.5)
          
          positions[i*3] = px
          positions[i*3+1] = py
          positions[i*3+2] = pz
          
          originalPos[i*3] = px
          originalPos[i*3+1] = py
          originalPos[i*3+2] = pz
          
          if (isDark) {
            colors[i*3] = 0.9; colors[i*3+1] = 0.15; colors[i*3+2] = 0.15;
          } else {
            colors[i*3] = 0.3; colors[i*3+1] = 0.3; colors[i*3+2] = 0.3;
          }
          i++
        }
      }
    }
    return { positions, originalPos, colors }
  }, [theme])

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime()
    const positions = meshRef.current.geometry.attributes.position.array
    const orig = particles.originalPos
    
    const mx = (mouse.x * viewport.width) / 2
    const my = (mouse.y * viewport.height) / 2

    for (let i = 0; i < count; i++) {
      const ix = i * 3
      const iy = i * 3 + 1
      const iz = i * 3 + 2

      const dx = orig[ix] - mx
      const dy = orig[iy] - my
      const dist = Math.sqrt(dx*dx + dy*dy)
      
      let force = 0
      if (dist < 4) {
        force = (4 - dist) * 0.4
      }

      const breath = Math.sin(time + orig[ix]) * 0.15

      positions[ix] = orig[ix] + (dx/dist)*force + breath
      positions[iy] = orig[iy] + (dy/dist)*force + breath
      positions[iz] = orig[iz] + Math.cos(time * 0.5 + orig[iy]) * 0.15
    }
    
    meshRef.current.geometry.attributes.position.needsUpdate = true
    meshRef.current.rotation.y = Math.sin(time * 0.1) * 0.15
    meshRef.current.rotation.x = Math.cos(time * 0.1) * 0.15
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={particles.positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={particles.colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial 
        size={isDark ? 0.05 : 0.07} 
        vertexColors 
        transparent 
        opacity={isDark ? 0.8 : 0.4} 
        blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending} 
      />
    </points>
  )
}

export default function ParticleBackground({ theme }) {
  const container = useRef()
  
  useEffect(() => {
    gsap.fromTo(container.current, { opacity: 0 }, { opacity: 1, duration: 2, ease: "power2.inOut" })
  }, [])

  return (
    <div ref={container} className="canvas-container">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }} dpr={[1, 2]} gl={{ antialias: true, alpha: false }}>
        <color attach="background" args={[theme === 'dark' ? '#050505' : '#f2f2f2']} />
        <InteractiveGrid theme={theme} />
      </Canvas>
      {/* HTML Vignette overlay moved outside Canvas */}
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
        pointerEvents: 'none',
        background: theme === 'dark' ? 'radial-gradient(circle, transparent 40%, #050505 140%)' : 'radial-gradient(circle, transparent 40%, #f2f2f2 140%)'
      }} />
    </div>
  )
}
