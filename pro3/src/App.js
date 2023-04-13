import React from 'react';
import {Route, Switch} from 'react-router-dom';
//Punto 2 y 3
import Header from './components/Header/Header';
import Home from './screens/Home/Home';
import Footer from './components/Footer/Footer';
// punto 5 y 6 
import Detalle from './screens/Detail/Detail';
import Favoritos from './screens/Favoritos/Favoritos';
import NotFound from './screens/NotFound/NotFound';


function App() {
  return (
    <>
      <React.Fragment>
    <Header/>

      <Switch>
        <Route path='/' exact component={ Home }/>
        {/* ACA VAN LAS RUTAS DE LOS OTROS PUNTOS */}
        <Route path='/favoritos' component={ Favoritos }/>
        <Route path='/detallePelicula/id/:id' component={ Detalle }/>
        <Route path='' component={ NotFound }/>


      </Switch>
    <Footer/>
    </React.Fragment>
    </>
  );
}

export default App;




