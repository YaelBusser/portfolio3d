import "./index.css";
import Bedroom from "../../components/scene/bedroom/index";
import {Canvas, useFrame, useLoader, useThree} from "@react-three/fiber";
import {Loader, OrbitControls, Scroll, ScrollControls, Sphere} from "@react-three/drei";
import Interfaces from "../../components/interfaces/index.jsx";
import SkillsScene from "../../components/scene/Skills/index.jsx";
import React, {useEffect, useRef, useState} from "react";
import ScrollManager from "../../components/ScrollManager/index.jsx";
import Menu from "../../components/Menu";
import BedroomScene from "../../components/scene/bedroom/index";
import {MotionConfig, motion} from "framer-motion";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js";
import SpeedModel from "../../components/models/Speed.jsx";

const Home = () => {
    const [loading, setLoading] = useState(true);

    const [section, setSection] = useState(0);
    const [menuOpened, setMenuOpened] = useState(false);
    const [color, setColor] = useState("#F4EEDA"); // Garder useState pour la couleur

    useEffect(() => {
        // Déclenche l'événement de chargement lorsque loading devient false
        if (!loading) {
            const event = new Event('componentLoaded');
            document.dispatchEvent(event);
        }
    }, [loading]);

    useEffect(() => {
        setMenuOpened(false);
    }, [section]);

    useEffect(() => {
        setColor(menuOpened ? "#E25A64" : "#F4EEDA");
    }, [menuOpened]);
    const SceneSkybox = (props) => {
        const gltf = useLoader(GLTFLoader, '/portfolio3d/models/skybox_anim.glb');
        const scale = 1;
        const group = useRef(null);
        const [isBottom, setIsBottom] = useState(false);
        useFrame(() => {
                if (section === 1) {
                    if (!isBottom) {
                        if (group.current.position.y === 500) {
                            group.current.position.y = 0;
                            setIsBottom(true);
                        } else {
                            group.current.position.y += 0.1;
                        }
                    } else {
                        setIsBottom(false);
                        group.current.position.y -= 0.1;
                    }
                }
            }
        )
        ;
        return (
            <group
                ref={group}
            >
                <primitive object={gltf.scene} scale={[scale, scale, scale]}/>
            </group>
        );
    }
    const CameraControls = () => {
        const {camera, gl} = useThree();

        useEffect(() => {
            const onMouseMove = (event) => {
                const {clientX, clientY} = event;
                const mouseX = (clientX / window.innerWidth) * 2 - 1;
                const mouseY = -(clientY / window.innerHeight) * 2 + 1;
                camera.position.x = mouseX * 10;
                camera.position.y = mouseY * 10;
                camera.lookAt(0, 0, 0);
            };

            gl.domElement.addEventListener('mousemove', onMouseMove);

            return () => {
                gl.domElement.removeEventListener('mousemove', onMouseMove);
            };
        }, [camera, gl]);

        return null;
    };
    const scale = 20;
    return (
        <div className={`home ${menuOpened ? "menu-opened" : ""}`}>
            {/* Appliquer la couleur d'arrière-plan en fonction de l'état de color */}
            <div className={"content-home"}>
                <MotionConfig transition={{
                    type: "spring",
                    mass: 5,
                    stiffness: 500,
                    damping: 50,
                    restDelta: 0.0001,
                    delay: 0.3
                }}>
                    <Canvas shadows camera={{position: [0, 10, 0]}}>
                        <group>
                            <OrbitControls enableZoom={false}/>
                            <CameraControls/>
                            {
                                /*
                            <SceneSkybox/>
                               
                                 */
                            }
                        </group>
                        <ScrollControls pages={4} damping={0.1}>
                            <ScrollManager section={section} onSectionChange={setSection}/>
                            <Scroll>
                                <BedroomScene section={section} menuOpened={menuOpened}/>
                            </Scroll>
                            <Scroll html>
                                <Interfaces menuOpened={menuOpened} setSection={setSection}/>
                            </Scroll>
                        </ScrollControls>
                        {
                            /*
                            section === 1 && (
                                <SpeedModel position={[0, 0, 0]} scale={[scale, scale, scale]}
                                            rotation={[0, -1, 0.1]}/>
                            )
                             */
                        }
                    </Canvas>
                    <Loader/>
                    <Menu section={section} setSection={setSection} menuOpened={menuOpened}
                          setMenuOpened={setMenuOpened}/>
                </MotionConfig>
            </div>
        </div>
    )
}

export default Home;
