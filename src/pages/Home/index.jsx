import "./index.css";
import Bedroom from "../../components/scene/bedroom/index";
import {Canvas, useFrame} from "@react-three/fiber";
import {OrbitControls, Scroll, ScrollControls, Sphere} from "@react-three/drei";
import Interfaces from "../../components/interfaces/index.jsx";
import SkillsScene from "../../components/scene/Skills/index.jsx";
import {useEffect, useState} from "react";
import ScrollManager from "../../components/ScrollManager/index.jsx";
import Menu from "../../components/Menu";
import BedroomScene from "../../components/scene/bedroom/index";
import SpaceModel from "../../components/models/Space.jsx";
import {MotionConfig} from "framer-motion";

const Home = () => {
    const [section, setSection] = useState(0);
    const [menuOpened, setMenuOpened] = useState(false);
    const scaleSpace = 0.05;
    useEffect(() => {
        setMenuOpened(false);
    }, [section]);
    /*<SpaceModel scale={[scaleSpace, scaleSpace, scaleSpace]} />*/
    return (
        <div className={"home"}>
            <div className={"content-home"}>
                <MotionConfig transition={{
                    type: "spring",
                    mass: 5,
                    stiffness: 500,
                    damping: 50,
                    restDelta: 0.0001,
                    delay: 0.8
                }}>
                    <Canvas camera={{position: [15, 5, 8]}}>
                        <ScrollControls pages={4} damping={0.1}>
                            <ScrollManager section={section} onSectionChange={setSection}/>
                            <Scroll>
                                <BedroomScene section={section} menuOpened={menuOpened}/>
                            </Scroll>
                            <Scroll html>
                                <Interfaces/>
                            </Scroll>
                        </ScrollControls>
                    </Canvas>
                    <Menu setSection={setSection} menuOpened={menuOpened} setMenuOpened={setMenuOpened}/>
                </MotionConfig>
            </div>
        </div>
    )
}

export default Home;
