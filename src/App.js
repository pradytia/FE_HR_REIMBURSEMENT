import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NavbarComp from './component/navbar';
import HomePage from './pages/Home';
import LoginPage from './pages/LoginPage';
import ProfilePages from './pages/ProfiePages';

function App() {
  return (
    <div className="App">
      <NavbarComp/>
      <Switch>
        <Route path="/" component={LoginPage} exact />
        <Route path="/dashboard" component={HomePage} exact />
        <Route path="/profile" component={ProfilePages} exact />
      </Switch>
    </div>
  );
}

export default App;
