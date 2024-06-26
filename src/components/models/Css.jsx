/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 css.glb 
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function CssModel(props) {
  const { nodes, materials } = useGLTF('/portfolio3d/models/css.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Sphere_1.geometry} material={materials['Material.001']} />
      <mesh geometry={nodes.Sphere_2.geometry} material={materials['Material.002']} />
    </group>
  )
}

useGLTF.preload('/portfolio3d/models/css.glb')
