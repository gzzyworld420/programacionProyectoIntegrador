import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
// aca abajo conecte los archivos. 
import SongDetail from './components/SongDetail/SongDetail';
import AlbumDetail from './components/AlbumDetail/AlbumDetail';
// aca abajo enlaces para favoritos 
import Favoritos from './components/Favoritos/Favoritos';
import NotFound from './components/NotFound/NotFound';

import Home from './screens/Home/Home'


// aca abajo agregue las rutas de AlbumDetails & SongDetails
// asi como favoritos, cancion y album. todas dentro del switch. 
function App() {
  return (
    <>
      <Navbar/>
          <Switch>
              <Route path='./' exact={true} component={Home}/>
              <Route path="/favoritos" component={Favoritos} />
              <Route path="/song/:id" component={SongDetail} />
              <Route path="/album/:id" component={AlbumDetail} />
              <Route path="/cancion/:id" component={SongDetail} />
              <Route path="/album/:id" component={AlbumDetail} />
              <Route component={NotFound} />
          </Switch>
      <Footer/>
    </>
  );
}

export default App;