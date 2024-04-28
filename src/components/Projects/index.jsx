import {useFrame, useThree} from "@react-three/fiber";
import {motion} from "framer-motion-3d";
import {Image, OrbitControls, Text} from "@react-three/drei"
import {animate, useMotionValue} from "framer-motion";
import React, {useEffect, useRef} from "react";
import {atom, useAtom} from "jotai";

export const AllProjects = [
    {
        title: "Makee",
        url: "https://makee.io/",
        image: "/portfolio3d/images/makee.png",
        description: "Welcome to Makee, the leading online challenge platform for students, schools and recruiters!"
    },
    {
        title: "Aupres De Vous",
        url: "#",
        image: "/portfolio3d/images/aupresdevous.png",
        description: "Home help service. Thanks to the application, a person in need of help can quickly find a caregiver to assist them in their daily life."
    },
    {
        title: "Aupres De Vous",
        url: "#",
        image: "/portfolio3d/images/aupresdevous.png",
        description: "Home help service. Thanks to the application, a person in need of help can quickly find a caregiver to assist them in their daily life."
    },
    {
        title: "Aupres De Vous",
        url: "#",
        image: "/portfolio3d/images/aupresdevous.png",
        description: "Home help service. Thanks to the application, a person in need of help can quickly find a caregiver to assist them in their daily life."
    }
]

const Project = (props) => {
    const {project, highlighted} = props;

    const background = useRef();
    const bgOpacity = useMotionValue(0.5);

    useEffect(() => {
        animate(bgOpacity, highlighted ? 1 : 0.5)
    }, [bgOpacity, highlighted]);

    useFrame(() => {
        background.current.material.opacity = bgOpacity.get();
    });

    return (
        <group {...props}>
            <mesh position-z={-1.01} onClick={() => window.open(project.url, "_blank")} ref={background}>
                <boxGeometry args={[2, 3, 2]}/>
                <meshBasicMaterial color={"#e25a64"} transparent/>
            </mesh>
            <Image scale={[2, 1.2, 1]} url={project.image} toneMapped={false} position-y={0.9}/>
            <Text maxWidth={2} anchorX={"center"} color={"black"} anchorY={"top"} fontSize={0.2} position={[0, 0.2, 0]}>
                {project.title.toUpperCase()}
            </Text>
            <Text maxWidth={1.5} anchorX={"center"} color={"black"} fillOpacity={0.8} anchorY={"top"} fontSize={0.1}
                  position={[0, -0.3, 0]}>
                {project.description}
            </Text>
        </group>
    )
}
export const currentProjectAtom = atom(Math.floor(AllProjects.length / 2));

const Projects = (props) => {
    const {section} = props;
    const {viewport} = useThree();
    const [currentProject] = useAtom(currentProjectAtom);
    useFrame((state) => {
        if (section === 2) {
            state.camera.position.x = 0;
            state.camera.position.y = 0.1;
            state.camera.position.z = 28;
        }
    });
    const controls = useRef();
    return (
        <motion.group
            animate={{
                scale: section === 2 ? 1 : 0,
            }}
            transition={
                {
                    type: "spring",
                }
            }
            position={[0, -viewport.height * 2, 24]}>
            <OrbitControls ref={controls} enableZoom={false} minDistance={100} maxDistance={100}/>
            {
                AllProjects.map((project, index) => (
                    <motion.group key={"project_" + index} position={[index * 3, 0, 0]}
                                  animate={{
                                      scale: currentProject === index ? 1 : 0.7,
                                      x: 0 - (index - currentProject) * 3,
                                      z: currentProject === index ? 0 : (index - currentProject) * 2,
                                      rotateX: currentProject === index ? 0 : 0.5
                                  }}
                                  transition={
                                      {
                                          type: "spring",
                                      }
                                  }
                    >
                        <Project project={project} highlighted={index == currentProject}/>
                    </motion.group>
                ))
            }
        </motion.group>
    )
}

export default Projects;