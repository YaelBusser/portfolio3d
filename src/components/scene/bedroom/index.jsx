import {Canvas, useFrame, useLoader} from "@react-three/fiber";
import {Box, OrbitControls, useAnimations, useFBX, useMotion, useScroll} from "@react-three/drei";
import BedroomModel from "../../models/Bedroom.jsx";
import "./index.css";
import React, {useEffect, useRef, useState} from "react";
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {animate, useMotionValue} from "framer-motion";
import {motion} from "framer-motion-3d";
import JsModel from "../../models/Js.jsx";

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

    const {actions} = useAnimations([typingAnimation[0], fallingAnimation[0], standingAnimation[0]], group);
    const headFollow = useMotionValue();
    let animation;
    const data = useScroll();
    const [scrollY, setScrollY] = useState();
    useEffect(() => {
        if (section === 0) {
            animation = "typing";
        } else if (section > 0 && section < 1) {
            animation = "falling";
        } else if (section === 1) {
            animation = "standing";
        }
    }, [section]);
    useEffect(() => {
        if (scrollY === 0) {
            actions["typing"]?.reset().fadeIn(0.2).play();
        } else if (section === 1) {
            actions["falling"]?.reset().fadeIn(0).play();
            group.current.rotation.y = 20
        } else if (section === 2) {
            actions["standing"]?.reset().fadeIn(0.2).play();
        }
        console.log(section)
        console.log(menuOpened)
        console.log(scrollY)
        return () => {
            if (section === 0) {
                actions["typing"]?.reset().fadeOut(0.2).play();
            } else if (section === 1) {
                actions["falling"]?.reset().fadeOut(0.2).play();
            } else if (section === 2) {
                actions["standing"]?.reset().fadeOut(1).play();
            }
        }
    }, [actions, menuOpened, section, scrollY]);
    useFrame((state) => {
        setScrollY(data.scroll.current)
    });
    return (
        <motion.group
            animate={
                {
                    x: section === 0 ? 5 : -5,
                    y: section === 0 ? 0.55 : -30,
                    z: section === 0 ? -5.5 : -5,
                    rotateY: section === 0 ? 3 : 1.2,
                    scale: section === 0 ? 1 : 2
                }
            }
            ref={group}
            rotation-y={3}
        >
           <ambientLight color={"white"} intensity={1}/>
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
    const cameraPositionXSection2 = useMotionValue();
    const cameraPositionYSection2 = useMotionValue();
    const cameraPositionZSection2 = useMotionValue();
    const cameraLookAt = useMotionValue();
    const duration = 1;

    useEffect(() => {
        if (section === 0) {
            animate(cameraPositionX, menuOpened ? -5 : 0, {duration: duration});
            animate(cameraPositionY, menuOpened ? 10 : 10, {duration: duration});
            animate(cameraPositionZ, menuOpened ? -10 : 20, {duration: duration});
            animate(cameraLookAt, menuOpened ? 12 : 0, {duration: duration});
        }
        if (section === 1) {
            animate(cameraPositionXSection2, 0, {duration: duration});
            animate(cameraPositionYSection2, 10, {duration: duration});
            animate(cameraPositionZSection2, 0, {duration: duration});
        }
    }, [cameraLookAt, cameraPositionX, cameraPositionY, cameraPositionZ, menuOpened, section]);

    useFrame((state) => {
        if (section === 0) {
            state.camera.position.x = cameraPositionX.get();
            state.camera.position.y = cameraPositionY.get();
            state.camera.position.z = cameraPositionZ.get();
            state.camera.lookAt(cameraLookAt.get(), 5, 0);
        }
        if (section === 1) {
            state.camera.position.z = -5;
            state.camera.position.y = 50;
            state.camera.lookAt(0, -50, -10);
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
                rotation-y={0.1}
                animate={{
                    scale: section === 0 ? 1 : 1,
                    y: section === 0 ? 0 : -400
                }}
            >
                <spotLight
                    position={[0, 20, 0]}
                    intensity={1000}
                    color={"white"}
                    castShadow

                />
                <spotLight
                    position={[20, 20, -15]}
                    intensity={1000}
                    color={"white"}
                    castShadow
                />
                <spotLight
                    position={[-20, 20, -10]}
                    intensity={2000}
                    color={"white"}
                    castShadow
                />
                <BedroomModel scale={[scale, scale, scale]}/>
            </motion.group>
            <group position={[2, 0.3, -4]}>
                <SceneCharacter section={section} menuOpened={menuOpened}/>
            </group>
        </motion.group>
    )
}

export default BedroomScene;