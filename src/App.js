import React from 'react'
import { HashRouter as Router, Route, NavLink as Links, Switch, Redirect } from 'react-router-dom'
import Home from './pages/Home'
import Map from './pages/Map'
import City from './pages/City'
import Error from './pages/Error'
class App extends React.Component {
  render() {
    return (<Router>
      <div>
        <h1>  这是app组价</h1>
        <Switch>
          <Redirect exact from="/" to="/home"></Redirect>
          <Route path='/home' component={Home}></Route>
          <Route path='/city' component={City}></Route>
          <Route path='/map' component={Map}></Route>
          <Route component={Error}></Route>
        </Switch>
      </div>
    </Router>)
  }
}
export default App 