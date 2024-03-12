/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 sphere.glb
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

const SphereModel = (props) => {
  const { nodes, materials } = useGLTF('/models/sphere.glb')
  return (
    <group {...props} dispose={null}>
      <group position={[0, 0.001, 0]} rotation={[Math.PI / 2, 0, 0]} scale={2.763}>
        <mesh geometry={nodes.Earth_1.geometry} material={materials['Astronaut 06']} />
        <mesh geometry={nodes.Earth_2.geometry} material={materials['Astronaut 04']} />
      </group>
    </group>
  )
}

useGLTF.preload('/models/sphere.glb')

export default SphereModel;
