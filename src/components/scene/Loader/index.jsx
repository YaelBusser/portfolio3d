import LoaderModel from "../../models/Loader.jsx";
import "./index.css";
import {Canvas} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";

const Loader = () => {
    return (
        <div className={"loader"}>

        <Canvas className={"loader-content"}>
            <OrbitControls/>
            <LoaderModel position={[-1, 0, 0]}/>
        </Canvas>
        </div>
    )
}
export default Loader;