import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer'
import Home from './screens/Home/Home'



function App() {
  return (
    <>
      <Navbar/>
          <Switch>
              <Route path='./' exact={true} component={Home}/>
          </Switch>
      <Footer/>
    </>
  );
}

export default App;
