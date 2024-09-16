import { Suspense, useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Environment } from '@react-three/drei'
import * as THREE from 'three'
import { WINDOW_INNER_WIDTH_MD } from '../../../../global/constants'

interface RotatingMeshProps {
  scene: THREE.Group
}

const RotatingMesh = ({ scene }: RotatingMeshProps) => {
  const meshRef = useRef<THREE.Group>(null)
  const [scale, setScale] = useState([1.5, 1.5, 1.5])
  const [rotationSpeeds] = useState({
    x: Math.random() * 0.1 + 0.2,
    y: Math.random() * 0.1 + 0.2,
    z: Math.random() * 0.3 + 0.1,
  })

 
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < WINDOW_INNER_WIDTH_MD) {
        setScale([1.2, 1.2, 1.2]) 
      } else {
        setScale([1.5, 1.5, 1.5])
      }
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const elapsedTime = clock.getElapsedTime()
      meshRef.current.rotation.x = elapsedTime * rotationSpeeds.x
      meshRef.current.rotation.y = elapsedTime * rotationSpeeds.y
      meshRef.current.rotation.z = elapsedTime * rotationSpeeds.z
    }
  })

  return <primitive ref={meshRef} object={scene} scale={scale} />
}

const Logo3D = () => {
  const { scene } = useGLTF('/models/logo3d.glb')
  const lightRef = useRef<THREE.DirectionalLight>(null)

  useEffect(() => {
    if (lightRef.current) {
      lightRef.current.target.position.set(40, 30, -40)
      lightRef.current.updateMatrixWorld()
    }
  }, [])

  return (
    <Canvas>
      <ambientLight intensity={1} />
      <directionalLight
        ref={lightRef}
        position={[1, 1, 0]}
        intensity={1.5}
        castShadow
      />
      <pointLight
        position={[12, 24, 10]}
        intensity={1}
        distance={20}
        decay={2}
        color="#ffffff"
      />
      <Environment preset="night" />
      <RotatingMesh scene={scene as THREE.Group} />
    </Canvas>
  )
}

const Logo3DWithSuspense = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Logo3D />
  </Suspense>
)

export default Logo3DWithSuspense
