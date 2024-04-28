import "./index.css";
import {Button, TextField} from "@mui/material";
import {
    Html,
    Loader,
    OrbitControls,
} from "@react-three/drei";
import {useFrame, useThree} from "@react-three/fiber";
import React, {useEffect, useRef, useState} from "react";
import HtmlModel from "../models/Html.jsx";
import ReactModel from "../models/React.jsx";
import CssModel from "../models/Css.jsx";
import PhpModel from "../models/Php.jsx";
import {motion} from "framer-motion"
import JsModel from "../models/Js.jsx";
import NodeJsModel from "../models/Nodejs.jsx";
import StarsModel from "../models/Stars.jsx";
import * as THREE from "three";
import MaterialUiModel from "../models/MaterialUi.jsx";
import SkillsModel from "../models/Skills.jsx";
import ExpressModel from "../models/Express.jsx";
import SequelizeModel from "../models/Sequelize.jsx";
import LaravelModel from "../models/Laravel.jsx";
import TailwindModel from "../models/Tailwind.jsx";
import {AwesomeButton, AwesomeButtonProgress} from 'react-awesome-button';
import * as AwesomeButtonStyles from 'react-awesome-button/src/styles/styles.scss';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {useAtom} from "jotai";
import projects, {AllProjects, currentProjectAtom} from "../Projects/index.jsx";

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
                <AwesomeButtonProgress
                    cssModule={AwesomeButtonStyles}
                    type="primary"
                    onPress={async (event, release) => {
                        await setSection(3);
                        release();
                    }}
                >
                    Get in touch
                </AwesomeButtonProgress>
                {
                    /*
                <Button variant="contained" className={"button"} onClick={() => setSection(3)}>Get in touch</Button>
                     */
                }
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
    const laravelGroupRef = useRef(null);
    const cssGroupRef = useRef(null);
    const htmlGroupRef = useRef(null);
    const materialUiGroupRef = useRef(null);
    const tailwindGroupRef = useRef(null);
    const reactGroupRef = useRef(null);
    const nodejsRef = useRef(null);
    const expressRef = useRef(null);
    const sequelizeRef = useRef(null);
    const jsModelRef = useRef(null);
    const skillsRef = useRef(null);
    const [trackingObject, setTrackingObject] = useState(null);
    const [isTracking, setIsTracking] = useState(false);
    const [skillSelected, setSkillSelected] = useState();
    const cancel = () => {
        setIsTracking(false);
    }
    const handlePlanetClick = (groupRef, skillName) => {
        if (groupRef.current) {
            setTrackingObject(groupRef.current);
            setIsTracking(true);
            setSkillSelected(`${skillName}`);
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
            if (jsModelRef.current && skillsRef.current) {
                const skillsModelPosition = skillsRef.current.position;
                const radius = 70;
                const orbitSpeed = 0.1;
                jsModelRef.current.position.x = skillsModelPosition.x + radius * Math.sin(orbitSpeed * timeElapsed + 50);
                jsModelRef.current.position.y = skillsModelPosition.y;
                jsModelRef.current.position.z = skillsModelPosition.z + radius * Math.cos(orbitSpeed * timeElapsed + 50);
                if (reactGroupRef.current) {
                    const jsModelPosition = jsModelRef.current.position;
                    const radius = 30;
                    const orbitSpeed = 0.5;
                    reactGroupRef.current.position.x = jsModelPosition.x + radius * Math.sin(orbitSpeed * timeElapsed + 20);
                    reactGroupRef.current.position.y = jsModelPosition.y;
                    reactGroupRef.current.position.z = jsModelPosition.z + radius * Math.cos(orbitSpeed * timeElapsed + 20);
                }
                if (nodejsRef.current) {
                    const jsModelPosition = jsModelRef.current.position;
                    const radius = 30;
                    const orbitSpeed = 0.5;
                    nodejsRef.current.position.x = jsModelPosition.x + radius * Math.sin(orbitSpeed * timeElapsed + 60);
                    nodejsRef.current.position.y = jsModelPosition.y;
                    nodejsRef.current.position.z = jsModelPosition.z + radius * Math.cos(orbitSpeed * timeElapsed + 60);
                    if (expressRef.current) {
                        const nodejsPosition = nodejsRef.current.position;
                        const radius = 10;
                        const orbitSpeed = 1;
                        expressRef.current.position.x = nodejsPosition.x + radius * Math.sin(orbitSpeed * timeElapsed + 30);
                        expressRef.current.position.y = nodejsPosition.y;
                        expressRef.current.position.z = nodejsPosition.z + radius * Math.cos(orbitSpeed * timeElapsed + 30);
                    }
                    if (sequelizeRef.current) {
                        const nodejsPosition = nodejsRef.current.position;
                        const radius = 10;
                        const orbitSpeed = 1;
                        sequelizeRef.current.position.x = nodejsPosition.x + radius * Math.sin(orbitSpeed * timeElapsed - 80);
                        sequelizeRef.current.position.y = nodejsPosition.y;
                        sequelizeRef.current.position.z = nodejsPosition.z + radius * Math.cos(orbitSpeed * timeElapsed - 80);
                    }
                }

            }
            if (phpGroupRef.current && skillsRef.current) {
                const skillsModelPosition = skillsRef.current.position;
                const radius = 120;
                const orbitSpeed = 0.1;
                phpGroupRef.current.position.x = skillsModelPosition.x + radius * Math.sin(orbitSpeed * timeElapsed + 20);
                phpGroupRef.current.position.y = skillsModelPosition.y;
                phpGroupRef.current.position.z = skillsModelPosition.z + radius * Math.cos(orbitSpeed * timeElapsed + 20);
                if (laravelGroupRef.current) {
                    const phpPosition = phpGroupRef.current.position;
                    const radius = 30;
                    const orbitSpeed = 0.5;
                    laravelGroupRef.current.position.x = phpPosition.x + radius * Math.sin(orbitSpeed * timeElapsed + 20);
                    laravelGroupRef.current.position.y = phpPosition.y;
                    laravelGroupRef.current.position.z = phpPosition.z + radius * Math.cos(orbitSpeed * timeElapsed + 20);
                }
            }
            if (cssGroupRef.current && skillsRef.current) {
                const skillsModelPosition = skillsRef.current.position;
                const radius = 200;
                const orbitSpeed = 0.1;
                cssGroupRef.current.position.x = skillsModelPosition.x + radius * Math.sin(orbitSpeed * timeElapsed + 10);
                cssGroupRef.current.position.y = skillsModelPosition.y;
                cssGroupRef.current.position.z = skillsModelPosition.z + radius * Math.cos(orbitSpeed * timeElapsed + 10);
                if (materialUiGroupRef.current) {
                    const cssModelPosition = cssGroupRef.current.position;
                    const radius = 20;
                    const orbitSpeed = 0.5;
                    materialUiGroupRef.current.position.x = cssModelPosition.x + radius * Math.sin(orbitSpeed * timeElapsed + 10);
                    materialUiGroupRef.current.position.y = cssModelPosition.y;
                    materialUiGroupRef.current.position.z = cssModelPosition.z + radius * Math.cos(orbitSpeed * timeElapsed + 10);
                }
                if (tailwindGroupRef.current) {
                    const cssModelPosition = cssGroupRef.current.position;
                    const radius = 20;
                    const orbitSpeed = 0.5;
                    tailwindGroupRef.current.position.x = cssModelPosition.x + radius * Math.sin(orbitSpeed * timeElapsed + 20);
                    tailwindGroupRef.current.position.y = cssModelPosition.y;
                    tailwindGroupRef.current.position.z = cssModelPosition.z + radius * Math.cos(orbitSpeed * timeElapsed + 20);
                }
            }
            if (htmlGroupRef.current && skillsRef.current) {
                const skillsModelPosition = skillsRef.current.position;
                const radius = 200;
                const orbitSpeed = 0.1;
                htmlGroupRef.current.position.x = skillsModelPosition.x + radius * Math.sin(orbitSpeed * timeElapsed + 20);
                htmlGroupRef.current.position.y = skillsModelPosition.y;
                htmlGroupRef.current.position.z = skillsModelPosition.z + radius * Math.cos(orbitSpeed * timeElapsed + 20);
            }
            if (isTracking && trackingObject) {
                const targetPosition = new THREE.Vector3();
                targetPosition.copy(trackingObject.position);
                targetPosition.z += 20;
                camera.position.lerp(targetPosition, 0.1);
                camera.lookAt(trackingObject.position);
            }
        }
    }, []);
    const Ring = (props) => {
        const ref = useRef(null);
        const {innerRadius, outerRadius, color, rotation} = props;
        return (
            <>
                <mesh
                    rotation={[-Math.PI / 2, rotation ? rotation : 0, 0]}
                    ref={ref}
                >
                    <ringGeometry args={[innerRadius, outerRadius, 100]}/>
                    <meshBasicMaterial attach="material" color={"white"}/>
                </mesh>
                <mesh
                    rotation={[Math.PI / 2, rotation ? -rotation : 0, 0]}
                    ref={ref}
                >
                    <ringGeometry args={[innerRadius, outerRadius, 100]}/>
                    <meshBasicMaterial attach="material" color={"white"}/>
                </mesh>
            </>
        );
    }
    return (
        <>
            {
                section === 1 && (
                    <>
                        <motion.group
                            animate={{
                                scale: section === 1 ? 1 : 0
                            }}
                            transition={
                                {
                                    type: "spring",
                                }
                            }
                        >
                            <StarsModel scale={6}/>
                            <OrbitControls ref={controlsRef} enableZoom={false} target={[0, 0, 0]}
                                           minDistance={isTracking ? 90 : 400}
                                           maxDistance={1000}/>
                            <group position-y={-20}>
                                <group ref={skillsRef}
                                       onClick={() => handlePlanetClick(skillsRef, "skills")}
                                >
                                    <pointLight castShadow intensity={10000}/>
                                    <SkillPlanet rotation={0.005} scale={10} model={<SkillsModel/>}/>
                                    <ambientLight intensity={3}/>
                                    {
                                        !isTracking && (
                                            <Html>
                                                <p className={"planet-name"}
                                                   onClick={() => handlePlanetClick(skillsRef, "skills")}>My Skills</p>
                                            </Html>
                                        )
                                    }
                                    <Ring innerRadius={70} outerRadius={70.5}/>
                                    <Ring innerRadius={200} outerRadius={200.5}/>
                                    <Ring innerRadius={120} outerRadius={120.5}/>
                                </group>
                                <group ref={cssGroupRef} onClick={() => handlePlanetClick(cssGroupRef, "css")}>
                                    <SkillPlanet rotation={0.005} scale={5} model={<CssModel/>}/>
                                    {
                                        !isTracking && (
                                            <Html>
                                                <p className={"planet-name little-planet"}
                                                   onClick={() => handlePlanetClick(cssGroupRef, "css")}>CSS</p>
                                            </Html>
                                        )
                                    }
                                    <Ring innerRadius={20} outerRadius={20.5} color={"white"}/>
                                </group>
                                <group ref={htmlGroupRef} onClick={() => handlePlanetClick(htmlGroupRef, "html")}>
                                    <SkillPlanet rotation={0.005} scale={5} model={<HtmlModel/>}/>
                                    {
                                        !isTracking && (
                                            <Html>
                                                <p className={"planet-name little-planet"}
                                                   onClick={() => handlePlanetClick(htmlGroupRef, "html")}>HTML</p>
                                            </Html>
                                        )
                                    }
                                </group>
                                <group ref={materialUiGroupRef}
                                       onClick={() => handlePlanetClick(materialUiGroupRef, "materialUi")}>
                                    <SkillPlanet rotation={0.005} scale={3} model={<MaterialUiModel/>}/>
                                    {
                                        !isTracking && (
                                            <Html>
                                                <p className={"planet-name sub-planet"}
                                                   onClick={() => handlePlanetClick(materialUiGroupRef, "materialUi")}>MaterialUi</p>
                                            </Html>
                                        )
                                    }
                                </group>
                                <group ref={tailwindGroupRef}
                                       onClick={() => handlePlanetClick(tailwindGroupRef, "tailwind")}>
                                    <SkillPlanet rotation={0.005} scale={3} model={<TailwindModel/>}/>
                                    {
                                        !isTracking && (
                                            <Html>
                                                <p className={"planet-name sub-planet"}
                                                   onClick={() => handlePlanetClick(tailwindGroupRef, "tailwind")}>Tailwind</p>
                                            </Html>
                                        )
                                    }
                                </group>
                                <group ref={jsModelRef} onClick={() => handlePlanetClick(jsModelRef, "js")}>
                                    <SkillPlanet rotation={0.005} scale={5} model={<JsModel/>}/>
                                    {
                                        !isTracking && (
                                            <Html>
                                                <p className={"planet-name little-planet"}
                                                   onClick={() => handlePlanetClick(jsModelRef, "js")}>JavaScript</p>
                                            </Html>
                                        )
                                    }
                                    <Ring innerRadius={30} outerRadius={30.5}/>
                                </group>
                                <group ref={reactGroupRef} onClick={() => handlePlanetClick(reactGroupRef, "react")}>
                                    <SkillPlanet rotation={0.005} scale={3} model={<ReactModel/>}/>
                                    {
                                        !isTracking && (
                                            <Html>
                                                <p className={"planet-name sub-planet"}
                                                   onClick={() => handlePlanetClick(reactGroupRef, "react")}>React</p>
                                            </Html>
                                        )
                                    }
                                </group>
                                <group ref={nodejsRef} onClick={() => handlePlanetClick(nodejsRef, "nodejs")}>
                                    <SkillPlanet rotation={0.005} scale={3} model={<NodeJsModel/>}/>
                                    {
                                        !isTracking && (
                                            <Html>
                                                <p className={"planet-name sub-planet"}
                                                   onClick={() => handlePlanetClick(nodejsRef, "nodejs")}>NodeJs</p>
                                            </Html>
                                        )
                                    }
                                    <Ring innerRadius={10} outerRadius={10.5} color={"white"}/>
                                </group>
                                <group ref={expressRef} onClick={() => handlePlanetClick(expressRef, "express")}>
                                    <SkillPlanet rotation={0.005} scale={2} model={<ExpressModel/>}/>
                                    {
                                        !isTracking && (
                                            <Html>
                                                <p className={"planet-name sub-sub-planet"}
                                                   onClick={() => handlePlanetClick(expressRef, "express")}>Express</p>
                                            </Html>
                                        )
                                    }
                                </group>
                                <group ref={sequelizeRef} onClick={() => handlePlanetClick(sequelizeRef, "sequelize")}>
                                    <SkillPlanet rotation={0.005} scale={2} model={<SequelizeModel/>}/>
                                    {
                                        !isTracking && (
                                            <Html>
                                                <p className={"planet-name sub-sub-planet"}
                                                   onClick={() => handlePlanetClick(sequelizeRef, "sequelize")}>Sequelize</p>
                                            </Html>
                                        )
                                    }
                                </group>
                                <group ref={phpGroupRef} onClick={() => handlePlanetClick(phpGroupRef, "php")}>
                                    <SkillPlanet rotation={0.005} scale={5} model={<PhpModel/>}/>
                                    {
                                        !isTracking && (
                                            <Html>
                                                <p className={"planet-name little-planet"}
                                                   onClick={() => handlePlanetClick(phpGroupRef, "php")}>PHP</p>
                                            </Html>
                                        )
                                    }
                                    <Ring innerRadius={30} outerRadius={30.5}/>
                                </group>
                                <group ref={laravelGroupRef} onClick={() => handlePlanetClick(laravelGroupRef, "laravel")}>
                                    <SkillPlanet rotation={0.005} scale={5} model={<LaravelModel/>}/>
                                    {
                                        !isTracking && (
                                            <Html>
                                                <p className={"planet-name little-planet"}
                                                   onClick={() => handlePlanetClick(laravelGroupRef, "laravel")}>Laravel</p>
                                            </Html>
                                        )
                                    }
                                </group>
                            </group>
                            {
                                isTracking && (
                                    <Html>
                                        <motion.div
                                            className={"info-skill"}
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
                                                    delay: 0
                                                }
                                            }}
                                        >
                                            <div className={"content-info-skill"}>
                                                {
                                                    skillSelected === "js" && (
                                                        <>
                                                            <h1>JavaScript</h1>
                                                        </>
                                                    )
                                                }
                                                {
                                                    skillSelected === "react" && (
                                                        <>
                                                            <h1>React</h1>
                                                        </>
                                                    )
                                                }
                                                {
                                                    skillSelected === "php" && (
                                                        <>
                                                            <h1>PHP</h1>
                                                        </>
                                                    )
                                                }
                                                {
                                                    skillSelected === "css" && (
                                                        <>
                                                            <h1>CSS</h1>
                                                        </>
                                                    )
                                                }
                                                {
                                                    skillSelected === "materialUi" && (
                                                        <>
                                                            <h1>Material ui</h1>
                                                        </>
                                                    )
                                                }
                                                {
                                                    skillSelected === "html" && (
                                                        <>
                                                            <h1>HTML</h1>
                                                        </>
                                                    )
                                                }
                                                {
                                                    skillSelected === "tailwind" && (
                                                        <>
                                                            <h1>Tailwind</h1>
                                                        </>
                                                    )
                                                }
                                                {
                                                    skillSelected === "laravel" && (
                                                        <>
                                                            <h1>Laravel</h1>
                                                        </>
                                                    )
                                                }
                                                {
                                                    skillSelected === "nodejs" && (
                                                        <>
                                                            <h1>Node JS</h1>
                                                        </>
                                                    )
                                                }
                                                {
                                                    skillSelected === "express" && (
                                                        <>
                                                            <h1>Express</h1>
                                                        </>
                                                    )
                                                }{
                                                skillSelected === "sequelize" && (
                                                    <>
                                                        <h1>Sequelize</h1>
                                                    </>
                                                )
                                            }
                                                <Button variant="contained" className={"button"}
                                                        onClick={() => cancel()}>BACK</Button>
                                            </div>
                                        </motion.div>
                                    </Html>
                                )
                            }
                            {
                                !isTracking && (
                                    <Html>
                                        <Section name={"skills"}>
                                            <motion.div className={"section-skills"}
                                                        initial={
                                                            {
                                                                opacity: 0,
                                                                y: 10
                                                            }
                                                        }
                                                        whileInView={{
                                                            opacity: 1,
                                                            y: 0,
                                                            transition: {
                                                                duration: 1,
                                                            }
                                                        }}
                                            >
                                                <div className={"content-skills"}>
                                                    <h1 className={"skills"}>Skills</h1>
                                                    <p className={"info-click-planet"}>Click on planets !</p>
                                                </div>
                                            </motion.div>
                                        </Section>
                                    </Html>
                                )
                            }
                        </motion.group>
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

        </Section>
    )
}
const ProjectsSection = () => {
    const [currentProject, setCurrentProject] = useAtom(currentProjectAtom);
    const nextProject = () => {
        setCurrentProject((currentProject - 1 + AllProjects.length) % AllProjects.length);
    }
    const previousProject = () => {
        setCurrentProject((currentProject + 1 + AllProjects.length) % AllProjects.length);
    }

    return (
        <Section>
            <h1>Projects</h1>
            <div className={"button-previous-next"}>
                <AwesomeButton
                    cssModule={AwesomeButtonStyles}
                    type="primary"
                    onPress={() => {
                        previousProject();
                    }}
                >
                    <NavigateBeforeIcon/>
                </AwesomeButton>
                <AwesomeButton
                    cssModule={AwesomeButtonStyles}
                    type="primary"
                    onPress={() => {
                        nextProject();
                    }}                >
                    <NavigateNextIcon/>
                </AwesomeButton>
            </div>
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
