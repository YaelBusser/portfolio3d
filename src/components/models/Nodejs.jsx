/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 nodejs.glb
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

const NodeJsModel = (props) => {
  const { nodes, materials } = useGLTF('/portfolio3d/models/nodejs.glb')
  return (
    <group {...props} dispose={null}>
      <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
        <mesh geometry={nodes.back.geometry} material={materials.back} />
        <mesh geometry={nodes.LOGO.geometry} material={materials.logo} position={[-0.003, 0.469, 0.009]} />
      </group>
    </group>
  )
}

useGLTF.preload('/portfolio3d/models/nodejs.glb')

export default NodeJsModel;
