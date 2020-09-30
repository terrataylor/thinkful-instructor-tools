import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Roster from './components/Roster/Roster';
import Attendance from './components/Attendance/Attendance';
import Organization from './components/Organization/Organization';
import YamlGenerator from './components/YamlGenerator/YamlGenerator';
import Resources from './components/Resources/Resources';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light  justify-content-between">
          <a className="navbar-brand" href="/">Thinkful Instructor Apps</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <Link className="nav-link" to="/">Roster</Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/yaml">Yaml File Generator</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/attendance">Attendance Taker</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/organization">Github Org Invite Sender</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/resources">Resources</Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/yaml">
            <YamlGenerator />
          </Route>
          <Route path="/attendance">
           <Attendance />
          </Route>
          <Route path="/organization">
           <Organization />
          </Route>
          <Route path="/resources">
           <Resources />
          </Route>
          <Route path="/">
            <Roster />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
