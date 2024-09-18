import { Suspense, useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Environment } from '@react-three/drei'
import * as THREE from 'three'
import { WINDOW_INNER_WIDTH_MD, WINDOW_INNER_WIDTH_XL, WINDOW_INNER_WIDTH_XXL } from '../../../../global/constants'

interface RotatingMeshProps {
  scene: THREE.Group
}

const RotatingMesh = ({ scene }: RotatingMeshProps) => {
  const meshRef = useRef<THREE.Group>(null)
  const [scale, setScale] = useState([1.5, 1.5, 1.5])
  const [rotationSpeeds] = useState({
    y: Math.random() * 0.1 + 0.2,
  })
  const [swayAmplitude] = useState(0.1)
  const [swaySpeed] = useState(1)

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      switch (true) {
        case width < WINDOW_INNER_WIDTH_MD:
          setScale([1.5, 1.5, 1.5])
          break
        case width < WINDOW_INNER_WIDTH_XL:
          setScale([1.2, 1.2, 1.2])
          break
        case width < WINDOW_INNER_WIDTH_XXL:
          setScale([1.4, 1.4, 1.4])
          break
        default:
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
      meshRef.current.rotation.y = elapsedTime * rotationSpeeds.y
      meshRef.current.position.y = Math.sin(elapsedTime * swaySpeed) * swayAmplitude
    }
  })

  return (
    <primitive
      ref={meshRef}
      object={scene}
      scale={scale}
      position={[0, 0, 0]}
      rotation={[2, Math.PI, 0.5]}
    />
  )
}

const Logo3D = () => {
  const { scene } = useGLTF('/models/logo3d.glb')
  const lightRef = useRef<THREE.DirectionalLight>(null)

  useEffect(() => {
    if (lightRef.current) {
      lightRef.current.target.position.set(10, 10, 10)
      lightRef.current.updateMatrixWorld()
    }
  }, [])

  return (
    <Canvas className='canvas'>
      <ambientLight intensity={0.8} />
      <directionalLight
        ref={lightRef}
        position={[10, 10, 10]}
        intensity={1.2}
        castShadow
      />
      <pointLight
        position={[2, 2, 2]}
        intensity={1.8}
        distance={20}
        decay={1}
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