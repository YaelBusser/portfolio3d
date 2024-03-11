import "./index.css";
import Bedroom from "../../components/scene/bedroom/index";
import {Canvas} from "@react-three/fiber";
import {OrbitControls, Scroll, ScrollControls, Sphere} from "@react-three/drei";
import Interfaces from "../../components/interfaces/index.jsx";

const Home = () => {
    return (
        <div className={"home"}>
            <section className={"bedroom"}>
                <Canvas camera={{position: [15, 5, 8]}}>
                    <ScrollControls pages={4} damping={0.1}>
                        <Bedroom/>
                        <Scroll html>
                            <Interfaces/>
                        </Scroll>
                    </ScrollControls>
                </Canvas>
            </section>
        </div>
    )
}

export default Home;