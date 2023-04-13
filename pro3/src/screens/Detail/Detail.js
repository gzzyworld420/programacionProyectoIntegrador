import React, { Component } from 'react';
import './Detail.css'
// defino el componente react detalle y su constructor, hereda propiedades y metodos
class Detalle extends Component {
    // primer metodo que se ejecuta 
    constructor(props) {
        // corroboro que funcione correctamente y tiene acceso a las props 
        super(props)
        this.state = { // propiedad de objeto de un componente de react, almaceno y gestiono 
            props: props,
            id: Number(props.match.params.id),
            datosPelicula: [],// array vacio 
            genres: '', // cadena vacia 
            companies: {}, // objeto vacio  
            country: {}, // objeto vacio 
            mensaje: 'Agregar a favoritos',
            iconFav: 'fa-regular fa-heart',
            loader: true
        }
    }
    // componente react DOM - llamo a la api y vemos detalle 
    componentDidMount() {
        // llamada a la api 
        fetch(`https://api.themoviedb.org/3/movie/${this.state.id}?api_key=1845c94396255a256363182ed898e8fc&language=en-US`)
        // convierte la respuesta en un json 
        .then(res => res.json())
            // se actualiza el estado del componente con info de pelicula 
            .then(data => this.setState({
                // propiedades 
                datosPelicula: data,
                genres: data.genres[0].name,
                companies: data.production_companies[0],
                country: data.production_countries[0],
                loader: false
            }))
            // si ocurre algun error lo muestra en pantalla 
            .catch(err => console.log(err))

        let favoritos = []; // variable con array vacio 
        // si hay datos en localstorage se convierte en array 
        let recuperoStorage = localStorage.getItem('favoritos');
        
        // con esto verifico si hay datos 
        if (recuperoStorage !== null) {
            // se convierte en info 
            favoritos = JSON.parse(recuperoStorage);
        };
        // se ejecuta si id esta incluido en array favoritos 
        if (favoritos.includes(this.state.id)) {
            this.setState({
                mensaje: 'Quitar de favoritos',
                iconFav: 'fa-solid fa-heart'
            });
        };
    }
    // defino metodo llamado modificarfavoritos 
    // agrego o quito una pelicula de favoritos 
    modificarFavoritos(id){
        let favoritos = []; // variable de array vacio 
        let recuperoStorage = localStorage.getItem('favoritos');
        // si id esta incluido se ejecuta contenido del bloque 
        if(recuperoStorage !== null){
            let favoritosToArray = JSON.parse(recuperoStorage);
            favoritos = favoritosToArray;
        }
        if(favoritos.includes(id)){
            let sacarFav = favoritos.indexOf(id);
            favoritos.splice(sacarFav, 1);
            this.setState({
                mensaje: 'Agregar a favoritos',
                iconFav: 'fa-regular fa-heart'
            })
        // si no esta incluido el id en el array se ejecuta esto
        } else {
            favoritos.push(id);
            this.setState({
                mensaje: 'Quitar de favoritos',
                iconFav: 'fa-solid fa-heart'
            })
        }
        
        let favoritosToString = JSON.stringify(favoritos);
        localStorage.setItem('favoritos', favoritosToString);

        console.log(localStorage)
    }


    render() {
        return (
            <React.Fragment>
                {this.state.loader === true ?
                <img  src='../../images/loader.gif' alt='loader'/> :
            <article className='detail-card'>

                <img src={`https://image.tmdb.org/t/p/w500/${this.state.datosPelicula.poster_path}`} alt="" />
                <div>
                    <h2 className="title-detail">{this.state.datosPelicula.title}</h2>
                    <p>{this.state.datosPelicula.overview}</p>
                    <p>Fecha de estreno (AA-MM-DD): {this.state.datosPelicula.release_date}</p>
                    <p>Califiación: {Math.round(this.state.datosPelicula.vote_average * 100) / 100}</p>
                    <p>Duración: {this.state.datosPelicula.runtime} minutos</p>
                    <p>Generos: {this.state.genres}</p>
                    <p>Producción: {this.state.companies.name}</p>
                    <p>País de producción: {this.state.country.name}</p>
                    <p className="boton" onClick={()=>this.modificarFavoritos(this.state.id)}><i className={this.state.iconFav}></i> {this.state.mensaje}</p>
                </div>

            </article>
                }
            </React.Fragment>
        )
    }
    
}

export default Detalle;