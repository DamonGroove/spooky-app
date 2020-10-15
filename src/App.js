import React, { useEffect, useState } from "react";
import {Synth} from "./components/Synth";
import {Visualizer} from "./components/Visualizer";
// import {
//   Route,
//   BrowserRouter as Router,
//   Switch,
//   Redirect,
// } from "react-router-dom";
// import Home from './pages/Home';
// import Jam from './pages/Jam';
// import Instrument from './pages/Instrument';
// import Signup from './pages/Signup';
// import Login from './pages/Login';
// import { auth } from './services/firebase';

function App() {

    const [durations, setDurations] = useState([]);

    function handleNewNote(d) {
        setDurations(durations => [...durations, d]);
        // console.log(durations);
    }

    return (
        <div>
            <Visualizer durations={durations}/>
            <Synth onNewNote={handleNewNote}/>
        </div>
    );
}

export default App;
