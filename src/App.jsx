import {BrowserRouter as Router} from 'react-router-dom';
import Routes from "./routes/index.jsx";
import "./index.css";
import {Suspense} from "react";

const App = () => {

    return (
        <Router>
            <Suspense fallback={null}>
                <div className="app">
                    <Routes/>
                </div>
            </Suspense>
        </Router>
    )
}

export default App
