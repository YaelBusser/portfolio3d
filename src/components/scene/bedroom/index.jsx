import {Canvas, useFrame, useLoader} from "@react-three/fiber";
import {Box, CameraControls, OrbitControls, useAnimations, useFBX, useMotion, useScroll} from "@react-three/drei";
import BedroomModel from "../../models/Bedroom.jsx";
import "./index.css";
import React, {useEffect, useRef, useState} from "react";
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {animate, useMotionValue} from "framer-motion";
import {motion} from "framer-motion-3d";
import JsModel from "../../models/Js.jsx";
import {Physics, RigidBody} from "@react-three/rapier";
import {Vector3} from "three";

export const SceneCharacter = (props) => {
    const {section, menuOpened} = props;
    const gltf = useLoader(GLTFLoader, '/portfolio3d/models/Character.glb');
    const scale = 7;
    const group = useRef(null);
    const {animations: typingAnimation} = useFBX('animations/Typing.fbx');
    typingAnimation[0].name = 'typing';
    const {animations: fallingAnimation} = useFBX('animations/Falling Idle.fbx');
    fallingAnimation[0].name = 'falling';
    const {animations: standingAnimation} = useFBX('animations/Standing W_Briefcase Idle.fbx');
    standingAnimation[0].name = 'standing';
    const {animations: falling2Animation} = useFBX('animations/Falling.fbx');
    falling2Animation[0].name = 'falling2';

    const {actions} = useAnimations([typingAnimation[0], fallingAnimation[0], standingAnimation[0], falling2Animation[0]], group);
    useEffect(() => {
        actions["typing"]?.reset().play();
    }, [actions, section]);

    return (
        <motion.group
            animate={
                {
                    x: 11,
                    y: 0.65,
                    z: 0,
                    rotateY: 3,
                    scale: 1
                }
            }
            transition={
                {
                    type: "spring",
                }
            }
            ref={group}
        >
            <primitive object={gltf.scene} scale={[scale, scale, scale]}/>
        </motion.group>
    );
};
const BedroomScene = (props) => {
    const {section, menuOpened} = props;
    const scale = 7;

    const cameraPositionX = useMotionValue(0);
    const cameraPositionY = useMotionValue(0);
    const cameraPositionZ = useMotionValue(0);
    const cameraLookAt = useMotionValue(0);
    const duration = 0.5;


    useFrame((state) => {
        if (section === 0) {
            animate(cameraPositionX, menuOpened ? 5 : 0, {duration: duration});
            animate(cameraPositionY, menuOpened ? 10 : 10, {duration: duration});
            animate(cameraPositionZ, menuOpened ? -0 : 20, {duration: duration});
            animate(cameraLookAt, menuOpened ? 12 : 0, {duration: duration});
        }
        if (section === 1) {
            animate(cameraPositionX, 10, {duration: duration});
            animate(cameraPositionY, 100, {duration: duration});
            animate(cameraPositionZ, 5, {duration: duration});
        }
        if (section === 0) {
            state.camera.position.x = cameraPositionX.get();
            state.camera.position.y = cameraPositionY.get();
            state.camera.position.z = cameraPositionZ.get();
            state.camera.lookAt(cameraLookAt.get(), 5, 0);
        }
    });
    return (
        <motion.group
            animate={{
                y: section === 0 ? 0 : 5,
                scale: section === 0 ? 1 : 0
            }}
        >
            <motion.group
                position={[5, -3, 5]}
                rotation-y={-0.1}
                animate={{
                    scale: section === 0 ? 1 : 0,
                    y: 0,
                }}
                transition={
                    {
                        type: "spring",
                    }
                }
            >
                <BedroomModel scale={[scale, scale, scale]}/>
                <mesh position={[0, -0.5, -5]} receiveShadow>
                    <boxGeometry args={[50, 0.01, 22]}/>
                    <meshPhysicalMaterial transparent opacity={0.05}/>
                </mesh>
            </motion.group>
            <group>
                <SceneCharacter section={section} menuOpened={menuOpened}/>
            </group>
            {
                section === 0 && (
                    <>
                        <spotLight
                            position={[0, 25, 0]}
                            intensity={1000}
                            color={"white"}
                            castShadow
                        />
                    </>
                )
            }
        </motion.group>
    )
}

export default BedroomScene;