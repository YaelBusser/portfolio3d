import {Canvas, useFrame, useLoader} from "@react-three/fiber";
import {Box, OrbitControls, useAnimations, useFBX, useMotion} from "@react-three/drei";
import BedroomModel from "../../models/Bedroom.jsx";
import "./index.css";
import React, {useEffect, useRef} from "react";
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {animate, useMotionValue} from "framer-motion";
import {motion} from "framer-motion-3d";
import JsModel from "../../models/Js.jsx";

const SceneCharacter = (props) => {
    const {menuOpened} = props;
    const gltf = useLoader(GLTFLoader, '/portfolio3d/models/Character.glb');
    const scale = 7;
    const group = useRef(null);
    const {animations: typingAnimation} = useFBX('animations/Typing.fbx');
    typingAnimation[0].name = 'typing';

    const {actions} = useAnimations(typingAnimation, group);
    const headFollow = useMotionValue();

    useEffect(() => {
        actions['typing']?.reset().play();
    }, []);
    useFrame((state) => {
        if (menuOpened) {
            //group.current.getObjectByName("Head").lookAt(state.camera.position);
            //group.current.getObjectByName("Head").lookAt([6,-5,5]);
        }
    });
    return (
        <group ref={group} position={[5, 0.55, -5.5]} rotation-y={3}>
            <primitive object={gltf.scene} scale={[scale, scale, scale]}/>
        </group>
    );
};
const BedroomScene = (props) => {
    const {section, menuOpened} = props;
    const scale = 7;

    const cameraPositionX = useMotionValue();
    const cameraPositionY = useMotionValue();
    const cameraPositionZ = useMotionValue();
    const cameraLookAt = useMotionValue();
    const duration = 1.5;
    useEffect(() => {
        animate(cameraPositionX, menuOpened ? -2 : 20, {duration: duration});
        animate(cameraPositionY, menuOpened ? 5 : 13, {duration: duration});
        animate(cameraPositionZ, menuOpened ? -2 : 10, {duration: duration});
        animate(cameraLookAt, menuOpened ? 12 : 0, {duration: duration});
    }, [menuOpened]);

    useFrame((state) => {
        state.camera.position.x = cameraPositionX.get();
        state.camera.position.y = cameraPositionY.get();
        state.camera.position.z = cameraPositionZ.get();
        state.camera.lookAt(cameraLookAt.get(), -1, -1);
    });
    /*
            <pointLight position={[0, 10, 0]} intensity={300} color={"white"} castShadow/>
            <pointLight position={[10, 0, 0]} intensity={300} color={"white"} castShadow/>
            <pointLight position={[0, 0, 10]} intensity={300} color={"white"} castShadow/>
*/
    return (
        <motion.group
            animate={{
                y: section === 0 ? 0 : -1,
                scale: section === 0 ? 1 : 0
            }}
        >
            <ambientLight color={"white"}/>
            <directionalLight castShadow intensity={1} position={[0, 5, 0]}/>
            <directionalLight castShadow intensity={1} position={[5, 0, 0]}/>
            <directionalLight castShadow intensity={1} position={[0, 0, 5]}/>
            <group position={[5, -3, 5]} rotation-y={0.1}>
                <SceneCharacter menuOpened={menuOpened}/>
                <BedroomModel scale={[scale, scale, scale]}/>
            </group>
        </motion.group>
    )
}

export default BedroomScene;