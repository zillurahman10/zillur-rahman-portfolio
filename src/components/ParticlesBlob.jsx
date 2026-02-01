import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import { useRef, useMemo } from "react"

function Blob() {
    const ref = useRef()
    const particles = 20000

    const positions = useMemo(() => {
        const arr = new Float32Array(particles * 3)

        for (let i = 0; i < particles; i++) {
            const u = Math.random()
            const v = Math.random()

            const theta = 2 * Math.PI * u
            const phi = Math.acos(2 * v - 1)

            const radius = Math.pow(Math.random(), 1.8) * 3

            arr[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
            arr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
            arr[i * 3 + 2] = radius * Math.cos(phi)
        }

        return arr
    }, [])


    useFrame(({ clock }) => {
        const t = clock.elapsedTime
        ref.current.rotation.y = t * 0.06
        ref.current.rotation.x = t * 0.03
    })
    
    return (
        <Points ref={ref} positions={positions} scale={2.5}>
            <PointMaterial
                transparent
                color="#9bbcff"
                size={0.012}
                sizeAttenuation
                depthWrite={false}
                opacity={0.7}
            />
        </Points>
    )
}

export default function ParticleBlob() {
    return (
        <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={0.5} />
            <Blob />
        </Canvas>
    )
}
