import './App.css';
import NavigationBar from "./components/NavigationBar/NavigationBar";
import {Route, Routes} from "react-router-dom";
import TestResults from "./components/TestResults/TestResults";
import ChartsPage from "./components/ChartsPage/ChartsPage";

function App() {
    return (
        <div className="App">
            <NavigationBar type="header"/>

            <Routes>
                <Route path={""} Component={TestResults}/>
                <Route path={"charts"} Component={ChartsPage}/>
            </Routes>
        </div>
    );
}

export default App;
