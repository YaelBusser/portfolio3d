import {BrowserRouter as Router} from 'react-router-dom';
import Routes from "./routes/index.jsx";
import "./index.css";
import {Suspense} from "react";
import Loader from "./components/scene/Loader/index.jsx";

const App = () => {
    return (
        <Router>
            <Suspense fallback={<Loader/>}>
                <div className="app">
                    <Routes/>
                </div>
            </Suspense>
        </Router>
    )
}

export default App
