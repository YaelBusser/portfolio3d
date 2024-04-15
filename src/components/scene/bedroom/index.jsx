import {Canvas, useFrame, useLoader} from "@react-three/fiber";
import {Box, OrbitControls, useAnimations, useFBX, useMotion, useScroll} from "@react-three/drei";
import BedroomModel from "../../models/Bedroom.jsx";
import "./index.css";
import React, {useEffect, useRef, useState} from "react";
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {animate, useMotionValue} from "framer-motion";
import {motion} from "framer-motion-3d";
import JsModel from "../../models/Js.jsx";
import {Physics, RigidBody} from "@react-three/rapier";

const SceneCharacter = (props) => {
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
    const headFollow = useMotionValue();
    let animation;
    const data = useScroll();
    const [scrollY, setScrollY] = useState();
    useEffect(() => {
        if (section === 0) {
            animation = "typing";
        }
    }, [section]);
    useEffect(() => {
        if (scrollY === 0) {
            actions["typing"]?.reset().fadeIn(0.2).play();
        }
        return () => {
            if (section === 0) {
                actions["typing"]?.reset().fadeOut(0.2).play();
            }
        }
    }, [actions, menuOpened, section, scrollY]);

    useFrame((state) => {
        setScrollY(data.scroll.current)
        if (section === 1) {
            group.current.rotation.y = 3;
        }
    });
    return (
        <motion.group
            animate={
                {
                    x: section === 0 ? 11 : 0,
                    y: section === 0 ? 0 : 0,
                    z: section === 0 ? -0 : 0,
                    rotateY: section === 0 ? 3 : 0,
                    scale: section === 0 ? 1 : 1
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

    const cameraPositionX = useMotionValue();
    const cameraPositionY = useMotionValue();
    const cameraPositionZ = useMotionValue();
    const cameraLookAt = useMotionValue();
    const duration = 1;

    useEffect(() => {
        if (section === 0) {
            animate(cameraPositionX, menuOpened ? -5 : 0, {duration: duration});
            animate(cameraPositionY, menuOpened ? 10 : 10, {duration: duration});
            animate(cameraPositionZ, menuOpened ? -10 : 20, {duration: duration});
            animate(cameraLookAt, menuOpened ? 12 : 0, {duration: duration});
        }
    }, [cameraLookAt, cameraPositionX, cameraPositionY, cameraPositionZ, menuOpened, section]);

    useFrame((state) => {
        if (section === 0) {
            state.camera.position.x = cameraPositionX.get();
            state.camera.position.y = cameraPositionY.get();
            state.camera.position.z = cameraPositionZ.get();
            state.camera.lookAt(cameraLookAt.get(), 5, 0);
        }
    });
    /*
            <pointLight position={[0, 10, 0]} intensity={300} color={"white"} castShadow/>
            <pointLight position={[10, 0, 0]} intensity={300} color={"white"} castShadow/>
            <pointLight position={[0, 0, 10]} intensity={300} color={"white"} castShadow/>
*/
    return (
        <motion.group
            animate={{
                //y: section === 0 ? 0 : 5,
                //scale: section === 0 ? 1 : 0
            }}
        >
            <motion.group
                position={[5, -3, 5]}
                rotation-y={-0.1}
                animate={{
                    scale: section === 0 ? 1 : 0,
                    y: section === 0 ? 0 : 0
                }}
                transition={
                    {
                        type: "spring",
                    }
                }
            >
                <BedroomModel scale={[scale, scale, scale]}/>
                <mesh position={[0, -0.5, -5]} receiveShadow>
                    <boxGeometry args={[150, 0.1, 22]}/>
                    <meshPhysicalMaterial transparent opacity={0.1}/>
                </mesh>
                <mesh position={[0, 50, -14.7]} rotation={[0, Math.PI / 2, Math.PI / 2]} receiveShadow>
                    <boxGeometry args={[100, 0.01, 150]}/>
                    <meshPhysicalMaterial transparent opacity={0.1}/>
                </mesh>
            </motion.group>
            <group>
                <SceneCharacter section={section} menuOpened={menuOpened}/>
            </group>
            <spotLight
                position={[0, 20, 0]}
                intensity={500}
                color={"blue"}
                castShadow
            />
            <spotLight
                position={[-30, 20, 0]}
                intensity={500}
                color={"red"}
                castShadow
            />
            <spotLight
                position={[30, 20, 0]}
                intensity={500}
                color={"green"}
                castShadow
            />
            <spotLight
                position={[0, 30, 5]}
                intensity={1000}
                color={"white"}
                castShadow
            />
        </motion.group>
    )
}

export default BedroomScene;