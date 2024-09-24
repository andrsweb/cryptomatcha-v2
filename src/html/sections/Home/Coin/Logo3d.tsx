import { Suspense, useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Environment } from '@react-three/drei'
import { WINDOW_INNER_WIDTH_XXL, WINDOW_INNER_WIDTH_MD } from '../../../../global/constants'
import * as THREE from 'three'

export interface RotatingMeshProps {
	scene: THREE.Group
}

const RotatingMesh = ({ scene }: RotatingMeshProps) => {
	const meshRef = useRef<THREE.Group>(null)
	const [scale, setScale] = useState([1.3, 1.3, 1.3])
	const rotationSpeed = useRef(0.25)
	const swayAmplitude = 0.1
	const swaySpeed = 2.2

	const updateScale = () => {
		const width = window.innerWidth
		if (width < WINDOW_INNER_WIDTH_MD) {
			setScale([1.5, 1.5, 1.5])
		} else if (width < WINDOW_INNER_WIDTH_XXL) {
			setScale([1.1, 1.1, 1.1])
		} else {
			setScale([1.2, 1.2, 1.2])
		}
	}

	useEffect(() => {
		updateScale()
		const handleResize = () => updateScale()
		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	useFrame(({ clock }, delta) => {
		if (meshRef.current) {
			const elapsedTime = clock.getElapsedTime()
			meshRef.current.rotation.y += rotationSpeed.current * delta 
			meshRef.current.position.y = Math.sin(elapsedTime * swaySpeed) * swayAmplitude
		}
	})

	useEffect(() => {
		scene.traverse((child) => {
		  if (child instanceof THREE.Mesh) {
			child.material = new THREE.MeshStandardMaterial({
			  metalness: 1, 
			  roughness: 0.2,
			  color: child.material.color
			})
		  }
		})
	  }, [])

	return (
		<primitive
			ref={meshRef}
			object={scene}
			scale={scale}
			position={[0, 0, 0]}
			rotation={[2.2, Math.PI, 0.5]}
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
			<Environment preset="forest" />
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
