import React from "react";
import  Style from './filtarPor.module.css'
import { AiFillAlert } from "react-icons/ai";
import { TbRoad } from "react-icons/tb";
import { BsFillSignStopFill } from "react-icons/bs";
import { BsFillTreeFill } from "react-icons/bs";
import { GiDoubleStreetLights  } from "react-icons/gi";
import { TbRecycleOff } from "react-icons/tb";

function FiltarPor ({setEstado}){
    return(
        <div >
            <div className={Style.filtrar}>
                <h1 >Filtrar Por: </h1>
              <ul>
                <li className={Style.Cseguridad} onClick={()=>{setEstado('Seguridad')}}><AiFillAlert className={`icon ${Style.seguridad}`}/>Seguridad</li>
                <li className={Style.Mvial} onClick={()=>{setEstado('Malla Vial')}}><TbRoad className={`icon ${Style.Malla}`}/> Malla Vial </li>
                <li className={Style.Svial}  onClick={()=>{setEstado('Señalizacion Vial')}}><BsFillSignStopFill className={`icon ${Style.Senalizacion}`}/> Señalizacion Vial</li>
                <li className={Style.Epublicos}  onClick={()=>{setEstado('Espacios Públicos')}}><BsFillTreeFill className={`icon ${Style.Espacios}`}/>Espacios Públicos </li>
                <li className={Style.Apublicos}  onClick={()=>{setEstado('Alumbrado Público')}}> <GiDoubleStreetLights className={`icon ${Style.Alumbrado}`}/>Alumbrado Público</li>
                <li className={Style.Cambiental}  onClick={()=>{setEstado('Contaminacion Ambiental')}}><TbRecycleOff className={`icon ${Style.Ambiental}`}/>Contaminacion Ambiental</li>
              </ul>
                
            </div>
        </div>
    )

}

export default FiltarPor

