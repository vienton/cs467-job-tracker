import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard'
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Landing from './pages/Landing';
import { Redirect } from 'react-router';
const App = () => {

  useEffect(() => {
    // store csrf token locally to use with forms 
    (async () => {
      const response = await fetch("/csrf");
      const { csrf } = await response.json()
      localStorage.setItem('csrf', csrf)
    })()
  }, [])


    return (
    <Router>
      <Switch>
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/signin" exact component={SignIn} />
        <Route path="/" exact component={Landing} />
        <Route component={Dashboard} />
      </Switch>
    </Router>
  )
  }

export default App