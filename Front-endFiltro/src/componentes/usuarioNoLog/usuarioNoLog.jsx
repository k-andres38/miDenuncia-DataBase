import React, { useEffect, useState } from "react";
import Style from "./usuarioNoLog.module.css"
import NavegacionNoLog from "../navegacionNoLog/navegacion";
import FiltrarPor from "../filtrarPor/filtarPor";
import Footer from "../footer/footer";
import Tarjetas from "../tarjetasPublicacion/tarjetasPublicacion";

function UsuarioNoLog() {

    const [publicaciones, setPublicaciones] = useState()
    const [estado, setEstado] = useState()

    useEffect((()=>{
        fetch(`https://midenuncia-database-production.up.railway.app/infoRequestUser?limit=10&offset=0`)
        .then(res => res.json())
        .then(res => setPublicaciones(res.news))
    }),[])

    function tarjetasNoLog() {
        
        //console.log(nuevasTarjetas)
       let publicacionTarjeta= publicaciones.map((api,index)=>{
               // console.log(api)
            return <Tarjetas api={api} index={index} />

        })
        console.log(publicacionTarjeta)

         publicacionTarjeta = publicaciones.filter(publicacion => publicacion ? publicacion.types_request.name===estado  : true)

       return publicacionTarjeta
          
            
        
        // nuevasTarjetas.filter(publicacion => publicacion ? publicacion.types_request===estado  : true)
       // return nuevasTarjetas
    }

    return (
            <div>
                <NavegacionNoLog/>
                <div className={Style.main}>
                <FiltrarPor setEstado={setEstado} />    
                    <div className={`contenedor ${Style.contTarjetas}`}>
                     

                    { publicaciones === undefined ? null : tarjetasNoLog()}

                    </div>
                </div>

                <Footer/>
            </div> 
            
            
            
        )
}

export default UsuarioNoLog;