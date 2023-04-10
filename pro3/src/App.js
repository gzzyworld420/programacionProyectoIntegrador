import React from 'react';
import {Route, Switch} from 'react-router-dom';
//Punto 2 y 3
import Header from './components/Header/Header';
import Home from './screens/Home/Home';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <>
      <React.Fragment>
    <Header/>

      <Switch>
        <Route path='/' exact component={ Home }/>
        {/* ACA VAN LAS RUTAS DE LOS OTROS PUNTOS */}




      </Switch>
    <Footer/>
    </React.Fragment>
    </>
  );
}

export default App;




