import "./index.css";
import Bedroom from "../../components/scene/bedroom/index";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Scroll, ScrollControls, Sphere } from "@react-three/drei";
import Interfaces from "../../components/interfaces/index.jsx";
import SkillsScene from "../../components/scene/Skills/index.jsx";
import { useEffect, useState } from "react";
import ScrollManager from "../../components/ScrollManager/index.jsx";
import Menu from "../../components/Menu";
import BedroomScene from "../../components/scene/bedroom/index";
import SpaceModel from "../../components/models/Space.jsx";
import { MotionConfig, motion } from "framer-motion";

const Home = () => {
    const [section, setSection] = useState(0);
    const [menuOpened, setMenuOpened] = useState(false);
    const [color, setColor] = useState("#F4EEDA"); // Garder useState pour la couleur

    useEffect(() => {
        setMenuOpened(false);
    }, [section]);

    useEffect(() => {
        // Mise à jour de la couleur d'arrière-plan en fonction de menuOpened
        setColor(menuOpened ? "#E25A64" : "#F4EEDA");
    }, [menuOpened]);

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
                    <Canvas camera={{ position: [0, 10, 0] }}>
                        <ScrollControls pages={4} damping={0.1}>
                            <ScrollManager section={section} onSectionChange={setSection} />
                            <Scroll>
                                <BedroomScene section={section} menuOpened={menuOpened} />
                            </Scroll>
                            <Scroll html>
                                <Interfaces menuOpened={menuOpened} setSection={setSection} />
                            </Scroll>
                        </ScrollControls>
                    </Canvas>
                    <Menu section={section} setSection={setSection} menuOpened={menuOpened} setMenuOpened={setMenuOpened} />
                </MotionConfig>
            </div>
        </div>
    )
}

export default Home;
