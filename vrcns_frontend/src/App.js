import './App.css';
import NavigationBar from "./components/NavigationBar/NavigationBar";
import {Route, Routes} from "react-router-dom";
import TestResults from "./components/TestResults/TestResults";

function App() {
    return (
        <div className="App">
            <NavigationBar type="header"/>

            <Routes>
                <Route path={"test-results"} Component={TestResults}/>
            </Routes>
        </div>
    );
}

export default App;
