import React from 'react';
import './App.css';
import WebcamCapture from './components/WebcamCapture';
import Preview from './components/Preview';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
    <Router>
      <div className="app_body">
        <Switch>
          <Route path="/preview">
              <Preview />
          </Route>
          <Route exact path="/">
              <WebcamCapture />
          </Route>
        </Switch>
      </div>
    </Router>

    </div>
  );
}

export default App;
