import React, { Component } from 'react';
import Card from '../../components/Card/Card';
import './home.css';
import { Link } from 'react-router-dom';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            props: props,
            peliculas: [],
            valor: '',
            resultadosDeBusqueda: [],
            peliculasEnCartel: [],
            mensaje: '',
            loader: true
        };
    };

    componentDidMount() {
        //Buscamos datos
        fetch('https://api.themoviedb.org/3/movie/popular?api_key=1845c94396255a256363182ed898e8fc&language=en-US&page=1')
            .then(res => res.json())
            .then(data => this.setState({
                peliculas: data.results,
                loader: false
            }))
            .catch(err => console.log(err))

        // Buscamos peliculas en cartel y las guardamos en el state peliculasEnCartel
        // Trabajamos con la API para obtener las peliculas en cartel
        fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=1845c94396255a256363182ed898e8fc&language=en-US&page=1')
            .then(response => response.json())
            .then(data => this.setState({
                peliculasEnCartel: data.results,
                loader: false

            }))
            // Atrapamos el error
            .catch(error => console.log(error));
    }


    // Funcion para buscar peliculas y guardarlas en el state resultadosDeBusqueda
    // Esta funcion se ejecuta cuando se hace submit en el formulario
    // Esta funcion recibe el evento del submit
    // Prevent default para que no se recargue la pagina
    buscarPeliculas(event) {
        event.preventDefault();
        if (this.state.valor === '') {
            this.setState({
                mensaje: 'No has escrito nada'
            })
        } else {
            // Trabajamos con la API para obtener los resultados de la busqueda
            fetch(`https://api.themoviedb.org/3/search/movie?query=${this.state.valor}&api_key=1845c94396255a256363182ed898e8fc&language=en-US`)
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        resultadosDeBusqueda: data.results
                    });
                    if (data.results.length === 0) {
                        this.setState({
                            mensaje: 'No se enontraron resultados'
                        })

                    }

                })
                .catch(error => console.log(error))

        }
    }

    // Funcion para controlar los cambios en el input del buscador y guardarlos en el state valor
    cambiosInput(event) {
        this.setState(
            {
                valor: event.target.value,
                mensaje: '',
                resultadosDeBusqueda: []
            },
            () => console.log(event.target.value));
    }


    render() {
        console.log(localStorage)
        return (
            <main>
                <div className="buscador-home">
                    <form onSubmit={(event) => this.buscarPeliculas(event)}>
                        <input type="text" placeholder='Find here...' onChange={(event) => this.cambiosInput(event)} value={this.state.valor} />
                        <button type="submit"><i className="fa fa-search"></i></button>
                    </form>
                    <p>{this.state.mensaje}</p>
                </div>

                {/* La siguiente linea es para mostrar el loader y el resto de la pagina cuando se cargan los datos y la logica de la pagina */}
                {this.state.loader === true ?
                    <img src='../../img/loader.gif' alt="Loader"/>  :
                    <React.Fragment>
                        <section className='cardContainer'>
                            {this.state.resultadosDeBusqueda.map((peliculaBuscada, idx) => <Card key={peliculaBuscada.title + idx} datosPelicula={peliculaBuscada} />)}
                        </section>

                        {/*  Seccion de peliculas populares */}
                        <div className='title-seeall'>
                            <h2 className="title-condiv">Popular Movies</h2>
                            <Link to='/populares'>
                                <i className='fa-solid fa-plus'></i> View all
                            </Link>
                        </div>
                        <section className='cardContainer'>
                            {
                                this.state.peliculas.map((pelicula, idx) => <Card key={pelicula.title + idx} datosPelicula={pelicula} />)
                            }
                        </section >
                        
                        {/* Seccion de peliculas en Estreno */}
                        <div className='title-seeall'>
                            <h2 className="title-home">Upcoming Movies</h2>
                            <Link to='/estrenos'>
                                <i className='fa-solid fa-plus'></i> View all
                            </Link>
                        </div>

                        <section className='cardContainer'>
                            {this.state.peliculasEnCartel.map((elm, idx) => <Card key={elm.title + idx} datosPelicula={elm} />)}
                        </section>

                        
                    </React.Fragment>
                }

            </main>
        )
    }

}

export default Home;