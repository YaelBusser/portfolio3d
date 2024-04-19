/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 react.glb 
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function ReactModel(props) {
  const { nodes, materials } = useGLTF('/portfolio3d/models/react.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Sphere_1.geometry} material={materials['Material.001']} />
      <mesh geometry={nodes.Sphere_2.geometry} material={materials['Material.003']} />
    </group>
  )
}

useGLTF.preload('/portfolio3d/models/react.glb')
