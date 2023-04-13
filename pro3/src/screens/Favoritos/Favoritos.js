// importamos biblioteca react 
// importamos el componente link de la biblioteca react-router-dom  
// con esto podemos crear enlaces de navegacion 
import React, { Component } from 'react';
import './Favoritos.css';
import { Link } from 'react-router-dom';

//primero definimos una clase llamada favoritos que hereda component de react 
// la clase favoritos puede usar las caract y metodos de react para componentes personalizados
class Favoritos extends Component {
    // el contructor es un metodo que se llama cuando se crea una nueva instancia 
    // props representa las propiedades que se pasan al componente padre 
    constructor(props) {
        // el super(props) garantiza que la clase component inicie correctaemnte sus propiedades y metodos internos 
        super(props);
        // definimos el estado inicial del componente, es un objeto. 
        // cuando el estado cambia, react vuelve a renderizar el componente 
        this.state = {
            props: props, // almacena propiedades pasadas 
            peliculas: [], // array vacio que almacena peliculas
            borrar: [], // array vacio, almacena elementos q se eliminaran
            loader: true // booleano - indicador de carga 
        };
    };

// metodo de ciclo de vida en react (componente montado en el DOM)
    componentDidMount() {
        // se recupera elemento favoritos y se guarda en la variable recuperoStorage
        let recuperoStorage = localStorage.getItem('favoritos');
        let favoritosToArray; // declaro variable 
        // verifica que no sea null, si hay favoritas, se ejecuta el bloque de codigo.
        if (recuperoStorage !== null) {
            // cadena JSON almacenada en recuperoStorage "array de objetos"
            favoritosToArray = JSON.parse(recuperoStorage); 
            let peliculas = [] // array vacio que almacenara peliculas 
            // bucle for recorre elementos en favoritostoarray
            for(let i = 0; i < favoritosToArray.length; i++){
                if(favoritosToArray[i] !== null){
                    // solicitud de api con el metodo fetch 
                    fetch(`https://api.themoviedb.org/3/movie/${favoritosToArray[i]}?api_key=1845c94396255a256363182ed898e8fc&language=en-US`)
                    // la respuesta se convierte en un objeto javascript con res.json
                    .then(res => res.json())
                    .then(data => {
                        peliculas.push(data)
                        this.setState({
                            peliculas: peliculas, // se agrega al array 
                            loader: false // completo la carga 
                        });
                    })
                    .catch(err => console.log(err))
                }
            }
            

        };
        // se ejecuta si recuperostorage no tiene elementos 
        if (JSON.parse(recuperoStorage).length === 0){
            this.setState({
                loader: false // indica que no hay peliculas 
            })
        }
        
    }
    // esto sirve para borrar una pelicula de la lista de favoritos que almacenamos en localstorage
    borrar(id){ //metodo
        //recuperamos elemento y lo convertimos en un array 
        let recuperoStorage = localStorage.getItem('favoritos');
        let favoritosToArray = JSON.parse(recuperoStorage);
        //aca en favoritostoarray se guarda el array
        // se busca el indice id y se guarda la variable en sacarfav
        let sacarFav = favoritosToArray.indexOf(id);
        // se elimina 1 solo elemento 
        favoritosToArray.splice(sacarFav, 1);
    
        let favoritosToString = JSON.stringify(favoritosToArray);
        //sobrescribe el valor existente 
        localStorage.setItem('favoritos', favoritosToString);
    }
    // como se va a ver el componente en la pantalla 
    // este metodo devuelve el JSX 
    render() {
        // muestra en la consola el array de peliculas 
        console.log(this.state.peliculas)
        // dentro de este bloque return se especifica el JSX
        return (
            <main>
                {this.state.loader === true ?
                    <img src='../../images/loader.gif' alt="Loader" /> :
                    <React.Fragment>
                        <h2 className="titulos">Favoritos</h2>
                        <section className='cardContainer'>
                            {this.state.peliculas.length > 0 ?
                                this.state.peliculas.map((unaPelicula, idx) =>
                                    <article className='movie-card' key={idx}>
                                        <Link to={`/detallePelicula/id/${unaPelicula.id}`}>
                                            <img src={`https://image.tmdb.org/t/p/w500/${unaPelicula.poster_path}`} alt="" />
                                        </Link>
                                        <div className='card-favdiv'>
                                        <h2>{unaPelicula.title}</h2> {/* Nombre */}
                                        <i className="fa-solid fa-heart" onClick={() => {
                                            this.state.borrar.push(unaPelicula.id);
                                            this.setState({
                                                peliculas: this.state.peliculas.filter(pelicula =>
                                                    !this.state.borrar.includes(pelicula.id)
                                                )
                                            });
                                            this.borrar(unaPelicula.id)
                                        }}
                                        ></i>
                                        </div>
                                        <Link to={`/detallePelicula/id/${unaPelicula.id}`}>
                                            <p> Ir a detalles </p>
                                        </Link>
                                        
                                        <p className='more'>Ver más</p>

                                    </article>

                                )
                                :
                                <h3>Todavía no elegiste ningún favorito!</h3>

                            }
                        </section>
                    </React.Fragment>}
            </main>
        )
    }
}

export default Favoritos;