import "./index.css";
import {Button, TextField} from "@mui/material";
import {
    Billboard,
    CameraControls,
    Float, Html,
    Loader,
    OrbitControls,
    Sphere,
    useAnimations,
    useFBX,
    useScroll
} from "@react-three/drei";
import {Canvas, useFrame, useLoader, useThree} from "@react-three/fiber";
import React, {useEffect, useRef, useState} from "react";
import HtmlModel from "../models/Html.jsx";
import SphereModel from "../models/Sphere.jsx";
import ReactModel from "../models/React.jsx";
import CssModel from "../models/Css.jsx";
import PhpModel from "../models/Php.jsx";
import {animate, motion, useMotionValue} from "framer-motion"
import JsModel from "../models/Js.jsx";
import NodeJsModel from "../models/Nodejs.jsx";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js";
import SpeedModel from "../models/Speed.jsx";
import {SceneCharacter} from "../scene/bedroom/index.jsx";
import StarsModel from "../models/Stars.jsx";
import {Bloom, EffectComposer} from "@react-three/postprocessing";
import * as THREE from "three";

const Section = (props) => {
    const {children, name} = props;

    return (
        <div
            className={`container-section ${name === "skills" ? "skills-section" : ""} ${name === "contact" ? "contact-container" : ""}`}>
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
        </div>
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
                <Button variant="contained" className={"button"} onClick={() => setSection(3)}>Get in touch</Button>
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
/*
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
            <group position={[0, 0, -50]}>
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
 */
const SkillPlanet = ({rotation, model, scale}) => {
    const meshRef = useRef();
    const scaleIcon = scale;
    useFrame(() => {
        if (rotation) {
            meshRef.current.rotation.y += rotation;
        }
    }, []);
    return (
        <group ref={meshRef} scale={[scaleIcon, scaleIcon, scaleIcon]}>
            {model}
        </group>
    );
};
export const SkillsScene = (props) => {
    const {section} = props;
    const [timeElapsed, setTimeElapsed] = useState(0);
    const controlsRef = useRef(null);
    const phpGroupRef = useRef(null);
    const cssGroupRef = useRef(null);
    const reactGroupRef = useRef(null);
    const jsModelRef = useRef(null);
    const [trackingObject, setTrackingObject] = useState(null);
    const [isTracking, setIsTracking] = useState(false);
    const handlePlanetClick = (groupRef) => {
        // Check if the group reference exists
        if (groupRef.current) {
            setTrackingObject(groupRef.current);
            setIsTracking(true);
        }
    };
    useEffect(() => {
        setIsTracking(false);
    }, [section]);
    const {camera} = useThree();
    useFrame((state, delta) => {
        if (section === 1) {
            if (controlsRef.current) {
                controlsRef.current.autoRotateSpeed = 0.5;
                controlsRef.current.autoRotate = true;
            }

            setTimeElapsed((prevTime) => prevTime + delta);

            if (phpGroupRef.current && jsModelRef.current) {
                const jsModelPosition = jsModelRef.current.position;
                const radius = 30;
                const orbitSpeed = 0.5;
                phpGroupRef.current.position.x = jsModelPosition.x + radius * Math.sin(orbitSpeed * timeElapsed);
                phpGroupRef.current.position.y = jsModelPosition.y;
                phpGroupRef.current.position.z = jsModelPosition.z + radius * Math.cos(orbitSpeed * timeElapsed);
            }
            if (cssGroupRef.current && jsModelRef.current) {
                const jsModelPosition = jsModelRef.current.position;
                const radius = 50;
                const orbitSpeed = 0.5;
                cssGroupRef.current.position.x = jsModelPosition.x + radius * Math.sin(orbitSpeed * timeElapsed + 10);
                cssGroupRef.current.position.y = jsModelPosition.y;
                cssGroupRef.current.position.z = jsModelPosition.z + radius * Math.cos(orbitSpeed * timeElapsed + 10);
            }
            if (reactGroupRef.current && jsModelRef.current) {
                const jsModelPosition = jsModelRef.current.position;
                const radius = 50;
                const orbitSpeed = 0.5;
                reactGroupRef.current.position.x = jsModelPosition.x + radius * Math.sin(orbitSpeed * timeElapsed + 20);
                reactGroupRef.current.position.y = jsModelPosition.y;
                reactGroupRef.current.position.z = jsModelPosition.z + radius * Math.cos(orbitSpeed * timeElapsed + 20);
            }
            if (isTracking && trackingObject) {
                // Animate camera position and lookAt
                const targetPosition = new THREE.Vector3();
                targetPosition.copy(trackingObject.position);
                targetPosition.z += 20; // Adjust the distance from the object as needed
                // Linear interpolation for smooth animation
                camera.position.lerp(targetPosition, 1); // Adjust the speed as needed
                camera.lookAt(trackingObject.position);
            }
        }
    }, []);
    return (
        <>
            {
                section === 1 && (
                    <>
                        <group>
                            <Html>
                                <div className={"info-click-planet"}>
                                    <p>Click on planet !</p>
                                </div>
                            </Html>
                            <StarsModel scale={5}/>
                            <OrbitControls ref={controlsRef} enableZoom={false} target={[0, 0, 0]} minDistance={100}
                                           maxDistance={100}/>
                            <group position-y={-20}>
                                <group position={[30, 0, 0]} ref={cssGroupRef}
                                       onClick={() => handlePlanetClick(cssGroupRef)}>
                                    <SkillPlanet rotation={0.02} scale={2} model={<CssModel/>}/>
                                </group>
                                <group position={[20, 0, 0]} ref={phpGroupRef}
                                       onClick={() => handlePlanetClick(phpGroupRef)}>
                                    <SkillPlanet rotation={0.02} scale={5} model={<PhpModel/>}/>
                                </group>
                                <group position={[20, 0, 0]} ref={reactGroupRef}
                                       onClick={() => handlePlanetClick(reactGroupRef)}>
                                    <SkillPlanet rotation={0.02} scale={5} model={<ReactModel/>}/>
                                </group>
                                <group position={[0, 0, 0]} ref={jsModelRef} onClick={() => handlePlanetClick(jsModelRef)}>
                                    <ambientLight
                                        color="white"
                                        intensity={1}
                                        position={[0, 0, 0]}
                                    />
                                    <SkillPlanet rotation={0.02} scale={10} model={<JsModel/>}/>
                                </group>
                            </group>
                            {
                                isTracking && (
                                    <Html>
                                        <div className={"info-skill"}>
                                            <div className={"content-info-skill"}>
                                                <Button variant="contained" className={"button"}
                                                        onClick={() => setIsTracking(false)}>BACK</Button>
                                            </div>
                                        </div>
                                    </Html>
                                )
                            }
                        </group>
                    </>
                )
            }
        </>
    )
}
const SkillsSection = () => {
    const scale = 2;
    return (
        <Section name={"skills"}>
            <h1 className={"skills"}>Skills</h1>
            <p className={"info-click-planet"}>Click on planets !</p>
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
        <Section name={"contact"}>
            <div
                className={"contact-section"} id={"contact-section"}>
                <h1>Get in touch</h1>
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
