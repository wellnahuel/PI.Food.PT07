import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Landing from './components/Landing/Landing.jsx';
import Home from './components/Home/Home.jsx';
import Details from './components/Details/Details.jsx';
import SearchBar from './components/Searchbar/SearchBar.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Form from './components/Form/Form.jsx';
import About from './components/About/About.jsx';
import Order from './components/Order/Order.jsx';


import { Switch } from 'react-router'



function App() {
  return (

    <React.Fragment>
      <Navbar />
      <Switch>
        <Route exact path='/'>
          <Landing />
        </Route>
        <Route exact path='/recipes'>
          <SearchBar />
         {/*  <Order /> */}
          <Home />
        </Route>
        <Route exact path='/recipes:id'>
          <Details />
        </Route>
        <Route exact path='/create'>
          <Form />
        </Route>
        <Route exact path='/about'>
          <About />
        </Route>

      </Switch>
    </React.Fragment>

  );
}

export default App;
