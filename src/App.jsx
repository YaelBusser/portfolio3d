import { BrowserRouter as Router } from 'react-router-dom';
import Routes from "./routes/index.jsx";
import "./index.css";
const App = () => {
    return (
        <Router>
            <div className="app">
                <Routes/>
            </div>
        </Router>
    )
}

export default App
