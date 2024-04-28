import "./index.css";
import Bedroom from "../../components/scene/bedroom/index";
import {Canvas, useFrame, useLoader, useThree} from "@react-three/fiber";
import {Loader, OrbitControls, Scroll, ScrollControls, Sphere} from "@react-three/drei";
import Interfaces, {SkillsScene} from "../../components/interfaces/index.jsx";
import React, {useEffect, useRef, useState} from "react";
import ScrollManager from "../../components/ScrollManager/index.jsx";
import Menu from "../../components/Menu";
import BedroomScene from "../../components/scene/bedroom/index";
import {MotionConfig, motion} from "framer-motion";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js";
import Projects from "../../components/Projects/index.jsx";

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
    const [position, setPosition] = useState({x: 0, y: 0});
    const [overMouse, setOverMouse] = useState(false);
    const handleMouseMove = (event) => {
        setPosition({x: event.clientX, y: event.clientY});
    };
    window.addEventListener("load", () => {
        let loader = document.querySelector('.loader');
        let content = document.querySelector('.content-home');
        loader.style.display = 'none';
        content.style.display = 'block';
    });
    return (
        <div className={`home ${menuOpened ? "menu-opened" : ""}`} style={
            section === 0 ? {
                    backgroundColor: "#F5EFE6"
                } :
                section === 1 ?
                    {
                        backgroundColor: "black"
                    } : {}
        }>
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
                        <ScrollControls pages={4} damping={0.1}>
                            <ScrollManager section={section} onSectionChange={setSection}/>
                            <Scroll>
                                <BedroomScene section={section} menuOpened={menuOpened}/>
                            </Scroll>
                            <Scroll>
                                <SkillsScene section={section}/>
                            </Scroll>
                            <Scroll>
                                <Projects section={section}/>
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
                    <Menu section={section} setSection={setSection} menuOpened={menuOpened}
                          setMenuOpened={setMenuOpened} mouseOver={() => setOverMouse(true)}
                          mouseLeave={() => setOverMouse(false)}/>
                </MotionConfig>
            </div>
            {
                /*

            <div
                className="cursor"
                style={
                    {
                        left: `${position.x - 8}px`,
                        top: `${position.y - 10}px`,
                        backgroundColor: overMouse ? "transparent" : "#e25a64",
                        border: overMouse ? "4px solid black" : "none",
                        transform: overMouse ? "scale(1.2)" : "scale(1)",
                    }
                }
            />
                 */
            }
            <div className="loader"></div>
        </div>
    )
}

export default Home;
