import "./index.css";
import {Button, TextField} from "@mui/material";
import {Float, Loader, OrbitControls, Sphere, useAnimations, useFBX, useScroll} from "@react-three/drei";
import {Canvas, useFrame, useLoader} from "@react-three/fiber";
import React, {useEffect, useRef, useState} from "react";
import HtmlModel from "../models/Html.jsx";
import SphereModel from "../models/Sphere.jsx";
import ReactModel from "../models/React.jsx";
import CssModel from "../models/Css.jsx";
import PhpModel from "../models/Php.jsx";
import {motion, useMotionValue} from "framer-motion"
import JsModel from "../models/Js.jsx";
import NodeJsModel from "../models/Nodejs.jsx";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js";
import SpeedModel from "../models/Speed.jsx";

const Section = (props) => {
    const {children} = props;

    return (
        <motion.section
            className={"section"}
            initial={
                {
                    opacity: 0,
                    y: 50
                }
            }
            whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                    duration: 1,
                    delay: 0.5
                }
            }}
        >
            {children}
        </motion.section>
    )
}

const AboutSection = (props) => {
    const {setSection, menuOpened} = props;
    return (
        <Section>
            <motion.div
                animate={{
                    x: menuOpened ? "-250%" : 0,
                }}
                transition={{
                    type: "spring",
                    stiffness: 75
                }}
                className={`about-section ${menuOpened ? "hideAbout" : "showAbout"}`}
            >
                <h1>Hi, I'm <br/>
                    <span className={"my-name"}>Yaël Busser</span>
                </h1>
                <p>I'm a fullstack developper !</p>
                <Button variant="contained" className={"button"} onClick={() => setSection(3)}>Contact me</Button>
            </motion.div>
        </Section>
    )
}
const SkillOrbit = ({azimuthAngle, elevationAngle, model, scale}) => {
    const meshRef = useRef();
    const scaleIcon = scale;
    const radius = 3;
    let x, y, z;

    useFrame(() => {
        // Mise à jour de l'angle horizontal pour faire tourner l'objet en orbite
        azimuthAngle += 0.007; // Vous pouvez ajuster la vitesse de rotation ici

        // Calcul des nouvelles positions en utilisant des coordonnées sphériques
        x = radius * Math.cos(azimuthAngle) * Math.cos(elevationAngle);
        y = radius * Math.sin(elevationAngle);
        z = radius * Math.sin(azimuthAngle) * Math.cos(elevationAngle);

        meshRef.current.position.set(x, y, z);
        meshRef.current.rotation.z += 0.01;
        meshRef.current.rotation.x += 0.01;
        meshRef.current.rotation.y += 0.01;
    });

    return (
        <group ref={meshRef} scale={[scaleIcon, scaleIcon, scaleIcon]}>
            {model}
        </group>
    );
};
const SkillsScene = () => {
    const groupRef = useRef();

    useFrame(() => {
        groupRef.current.rotation.y += 0.005;
    });
    //<EarthModel scale={[scale, scale, scale]}/>
    const scale = 0.7;
    return (
        <group position={[0, -0.3, 0]}>
            <group ref={groupRef} position={[0, 0, 0]}>
                <SphereModel scale={[scale, scale, scale]}/>
            </group>
            <group position={[0, 0, 0]}>
                <SkillOrbit
                    scale={5}
                    azimuthAngle={0}
                    elevationAngle={0}
                    model={<HtmlModel/>}
                />
                <SkillOrbit
                    scale={0.15}
                    azimuthAngle={0.5}
                    elevationAngle={0.3}
                    model={<ReactModel/>}
                />
                <SkillOrbit
                    scale={0.1}
                    azimuthAngle={3}
                    elevationAngle={0.2}
                    model={<CssModel/>}
                />
                <SkillOrbit
                    scale={4}
                    azimuthAngle={15}
                    elevationAngle={0.3}
                    model={<PhpModel/>}
                />
                <SkillOrbit
                    scale={4}
                    azimuthAngle={4}
                    elevationAngle={0.1}
                    model={<JsModel/>}
                />
                <SkillOrbit
                    scale={4}
                    azimuthAngle={5}
                    elevationAngle={0.1}
                    model={<NodeJsModel/>}
                />
            </group>
        </group>
    );
};
const SkillsSection = () => {
    /*<div className={"sphere"}>
        <Canvas>
            <ambientLight castShadow intensity={1}/>
            <directionalLight castShadow color="white" position={[0, 0, 5]}/>
            <SkillsScene/>
        </Canvas>
     </div>*/
    const scale = 2;
    return (
        <Section>

            <h1 className={"skills"}>Skills</h1>
            <Canvas>
                <ambientLight castShadow intensity={1}/>
                <directionalLight castShadow color="white" position={[0, 0, 5]}/>
            </Canvas>
        </Section>
    )
}
const ProjectsSection = () => {
    return (
        <Section>
            <h1>Projects</h1>
        </Section>
    )
}
const ContactSection = () => {
    const constraintsRef = useRef(null)

    return (
        <Section>
            <div
                className={"contact-section"} id={"contact-section"}>
                <h1>Contact me</h1>
                <motion.div
                    ref={constraintsRef}
                    className={"block-form"}
                >
                    <motion.div
                        whileHover={{scale: 1.05}}
                        whileTap={{
                            rotate: 2
                        }}
                        drag
                        dragConstraints={constraintsRef}
                        className={"form"}>
                        <TextField style={{}} label="Name" variant="outlined"/>
                        <TextField label="email" variant="outlined"/>
                        <TextField
                            label="Message"
                            multiline
                            rows={5}
                        />
                        <Button variant="contained" className={"button"}>Submit</Button>
                    </motion.div>
                </motion.div>
            </div>
        </Section>
    )
}

const Interfaces = (props) => {
    const {setSection, menuOpened} = props;
    return (
        <div className={"sections"}>
            <AboutSection menuOpened={menuOpened} setSection={setSection}/>
            <SkillsSection/>
            <ProjectsSection/>
            <ContactSection/>
            <Loader/>
        </div>
    )
}

export default Interfaces;
