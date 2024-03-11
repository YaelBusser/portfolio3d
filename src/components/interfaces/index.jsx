import "./index.css";
import {Button, TextField} from "@mui/material";
import {OrbitControls, Sphere} from "@react-three/drei";
import {Canvas, useFrame} from "@react-three/fiber";
import {useRef} from "react";
import HtmlModel from "../models/Html.jsx";
import SphereModel from "../models/Sphere.jsx";
import ReactModel from "../models/React.jsx";
import CssModel from "../models/Css.jsx";
import PhpModel from "../models/Php.jsx";
import JsModel from "../models/Js.jsx";
import NodeJsModel from "../models/Nodejs.jsx";
import EarthModel from "../models/Earth.jsx";
import * as THREE from "three";

const Section = (props) => {
    const {children} = props;

    return (
        <section className={"section"}>
            {children}
        </section>
    )
}

const AboutSection = () => {
    return (
        <Section>
            <div className={"about-section"}>
                <h1>Hi, I'm <br/>
                    <span className={"my-name"}>Yaël Busser</span>
                </h1>
                <p>I'm a fullstack developper !</p>
                <Button variant="contained" className={"button"}>Contact me</Button>
            </div>
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
        azimuthAngle += 0.02; // Vous pouvez ajuster la vitesse de rotation ici

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
    return (
        <Section>
            <h1>Skills</h1>
            <div className={"sphere"}>
                <Canvas>
                    <ambientLight intensity={1}/>
                    <directionalLight color="white" position={[0, 0, 5]}/>
                    <SkillsScene/>
                </Canvas>
            </div>
        </Section>
    )
}
const ProjectsSection = () => {
    return (
        <Section>
            <h1>Project</h1>
        </Section>
    )
}
const ContactSection = () => {
    return (
        <Section>
            <div className={"contact-section"} id={"contact-section"}>
                <h1>Contact me</h1>
                <div className={"form"}>
                    <TextField label="Name" variant="outlined"/>
                    <TextField label="email" variant="outlined"/>
                    <TextField
                        label="Message"
                        multiline
                        rows={5}
                    />
                    <Button variant="contained" className={"button"}>Submit</Button>
                </div>
            </div>
        </Section>
    )
}

const Interfaces = () => {
    return (
        <div className={"sections"}>
            <AboutSection/>
            <SkillsSection/>
            <ProjectsSection/>
            <ContactSection/>
        </div>
    )
}

export default Interfaces;
