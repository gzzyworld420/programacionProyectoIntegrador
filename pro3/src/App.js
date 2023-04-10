import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer'
// aca abajo conecte los archivos. 
import SongDetail from './screens/SongDetail/SongDetail';
import AlbumDetail from './screens/AlbumDetail/AlbumDetail';
// aca abajo enlaces para favoritos 
import Favoritos from './screens/Favoritos/Favoritos';
import NotFound from './screens/NotFound/NotFound';
// aca abajo punto 7 
import HomePage from './screens/HomePage/HomePage';

// // Punto 9
import Spinner from "./components/Spinner/Spinner";
import "./components/Spinner/Spinner.css";


// aca abajo agregue las rutas de AlbumDetails & SongDetails
// asi como favoritos, cancion y album. todas dentro del switch. 
function App() {
  return (
    <>
      <Navbar/>
          <Switch>
              <Route path='./' exact={true} component={HomePage}/>
              <Route path="/favoritos" component={Favoritos} />
              <Route path="/song/:id" component={SongDetail} />
              <Route path="/album/:id" component={AlbumDetail} />
              <Route path="/cancion/:id" component={SongDetail} />
              <Route path="/album/:id" component={AlbumDetail} />
              <Route exact path="/" component={HomePage} />
              <Route component={NotFound} />
              <Route component={Spinner} />
          </Switch>
      <Footer/>
    </>
  );
}

export default App;



// export default function App() {
//   return (
//     <div className="pos-center">
//       <Spinner />
//     </div>
//   );
// }
