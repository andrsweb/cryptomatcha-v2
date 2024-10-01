
// Libs
import { Suspense, useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useGLTF, Environment } from '@react-three/drei'
// Constants
import { WINDOW_INNER_WIDTH_XXL, WINDOW_INNER_WIDTH_MD } from '../../../../global/constants'

export interface RotatingMeshProps {
	scene: THREE.Group
	scrollY: number
	isScrolling: boolean
}

const RotatingMesh = ({ scene, scrollY, isScrolling }: RotatingMeshProps) => {
	const meshRef = useRef<THREE.Group>(null)
	const [scale, setScale] = useState([1.3, 1.3, 1.3])
	const [rotationSpeed, setRotationSpeed] = useState(0)

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

	useFrame(() => {
		if (meshRef.current) {
			meshRef.current.rotation.y += rotationSpeed


			if (!isScrolling) {
				setRotationSpeed((prevSpeed) => Math.max(prevSpeed - 0.0005, 0))
			} else {
				setRotationSpeed(0.04)
			}
		}
	})

	useEffect(() => {
		scene.traverse((child) => {
			if (child instanceof THREE.Mesh) {
				child.material = new THREE.MeshStandardMaterial({
					metalness: 1,
					roughness: 0.2,
					color: child.material.color,
				})
			}
		})
	}, [scene])

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

interface Logo3DProps {
	scrollY: number
	isScrolling: boolean
}

const Logo3D = ({ scrollY, isScrolling }: Logo3DProps) => {
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
			<RotatingMesh scene={scene as THREE.Group} scrollY={scrollY} isScrolling={isScrolling} />
		</Canvas>
	)
}

const Logo3DWithSuspense = ({ scrollY, isScrolling }: Logo3DProps) => (
	<Suspense fallback={<div>Loading...</div>}>
		<Logo3D scrollY={scrollY} isScrolling={isScrolling} />
	</Suspense>
)

export default Logo3DWithSuspense
