//el componente "Footer" permanece en la carpeta "components", ya que es un componente reutilizable, que puede ser utilizado en diferentes pantallas.
import React from "react";
import './footer.css'

function Footer(props){

    return(
        <footer>
            <p>Manuel Firpo</p>
            <p className="separador">|</p>
            <p>Ignacio Aracena</p>
            <p className="separador">|</p>
            <p>Bruno Ebert</p>
        </footer>
    )
}

export default Footer