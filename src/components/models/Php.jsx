/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 php.glb 
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function PhpModel(props) {
  const { nodes, materials } = useGLTF('/portfolio3d/models/php.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Sphere.geometry} material={materials['Material.001']} />
    </group>
  )
}

useGLTF.preload('/portfolio3d/models/php.glb')
