import {Canvas, useFrame, useLoader} from "@react-three/fiber";
import {Box, OrbitControls, useAnimations, useFBX, useMotion} from "@react-three/drei";
import BedroomModel from "../../models/Bedroom.jsx";
import "./index.css";
import React, {useEffect, useRef} from "react";
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {animate, useMotionValue} from "framer-motion";
import {motion} from "framer-motion-3d";
import JsModel from "../../models/Js.jsx";

const SceneCharacter = () => {
    const gltf = useLoader(GLTFLoader, '/portfolio3d/models/Character.glb');
    const scale = 5;
    const group = useRef(null);
    const {animations: typingAnimation} = useFBX('animations/Typing.fbx');
    typingAnimation[0].name = 'typing';

    const {actions} = useAnimations(typingAnimation, group);

    useEffect(() => {
        actions['typing']?.reset().play();
    }, []);

    return (
        <group ref={group} position={[3.5, 0, -4.3]} rotation-y={3}>
            <primitive object={gltf.scene} scale={[scale, scale, scale]}/>
        </group>
    );
};
const BedroomScene = (props) => {
    const {section, menuOpened} = props;
    const scale = 5;

    const cameraPositionX = useMotionValue();
    const cameraPositionY = useMotionValue();
    const cameraPositionZ = useMotionValue();
    const cameraLookAt = useMotionValue();

    useEffect(() => {
        animate(cameraPositionX, menuOpened ? 0 : 15);
        animate(cameraPositionY, menuOpened ? 5 : 5);
        animate(cameraPositionZ, menuOpened ? 15 : 8);
        animate(cameraLookAt, menuOpened ? 0 : 0);
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
            <ambientLight color={"white"} />
            <directionalLight position={[0,10,0]} />
            <directionalLight position={[10,0,0]} />
            <directionalLight position={[0,0,10]} />
            <group position={[5, -3, 5]} rotation-y={0.1}>
                <SceneCharacter/>
                <BedroomModel scale={[scale, scale, scale]}/>
            </group>
        </motion.group>
    )
}

export default BedroomScene;