/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 earth.glb
Author: Loïc Norgeot (https://sketchfab.com/norgeotloic)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/earthquakes-2010-2011-3a57cfbbcb1c45278c13bc66886dd6ee
Title: Earthquakes - 2010 & 2011
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

const EarthModel = (props) => {
  const { nodes, materials } = useGLTF('/portfolio3d/models/earth.glb')
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.007}>
        <points geometry={nodes.Object_2.geometry} material={materials['Scene_-_Root']} />
        <points geometry={nodes.Object_3.geometry} material={materials['Scene_-_Root']} />
        <points geometry={nodes.Object_4.geometry} material={materials['Scene_-_Root']} />
        <points geometry={nodes.Object_5.geometry} material={materials['Scene_-_Root']} />
      </group>
    </group>
  )
}

useGLTF.preload('/portfolio3d/models/earth.glb')

export default EarthModel;
