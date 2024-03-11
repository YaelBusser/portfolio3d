import {Canvas, useLoader} from "@react-three/fiber";
import {OrbitControls, useAnimations, useFBX} from "@react-three/drei";
import BedroomModel from "../../models/Bedroom.jsx";
import "./index.css";
import {useEffect, useRef} from "react";
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';


const SceneCharacter = () => {
    const gltf = useLoader(GLTFLoader, '/models/Character.glb');
    const scale = 5;
    const group = useRef(null);
    const {animations: typingAnimation} = useFBX('animations/Typing.fbx');
    typingAnimation[0].name = 'typing';

    const {actions} = useAnimations(typingAnimation, group);

    useEffect(() => {
        actions['typing']?.reset().play();
    }, []);

    return (
        <group ref={group} position={[-2.5, -4.9, -14.6]} rotation-y={3}>
            <primitive object={gltf.scene} scale={[scale, scale, scale]}/>
        </group>
    );
};
const Bedroom = () => {
    const scale = 5;
    return (
        <group>
            <directionalLight position={[0, 5, 0]}/>
            <ambientLight intensity={1} color={"white"}/>
            <SceneCharacter/>
            <group position={[40, -5, -10]}>
                <BedroomModel scale={[scale, scale, scale]}/>
            </group>
        </group>
    )
}

export default Bedroom;