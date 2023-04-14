import React, { useEffect } from "react";
import Style from "./filtarPor.module.css";
import { AiFillAlert } from "react-icons/ai";
import { TbRoad } from "react-icons/tb";
import { BsFillSignStopFill } from "react-icons/bs";
import { BsFillTreeFill } from "react-icons/bs";
import { GiDoubleStreetLights } from "react-icons/gi";
import { TbRecycleOff } from "react-icons/tb";
import { tarjetas } from "../baseDedatos";
//import { tamanoPeticiones } from "../baseDedatos";
import { useState } from "react";

function FiltarPor() {
  const [count, setCount] = useState(null);
  const [res, setRes] = useState([]);

  useEffect(() => {
    tarjetas()
      .then(({ data }) => {
        setRes(data);
      })
      .catch((err) => console.log(err));
  }, []);

  // for(let i=1; i<=count;i++){
  //     tarjetas(i).then(data=>{
  //     if(data.status === 200){
  //      console.log(data.data.news)
  //     }else{
  //       //console.log(data.response.data)
  //     }

  //   });
  // }

  return (
    <div>
      <div className={Style.filtrar}>
        <h1>Filtrar Por: </h1>
        <ul>
          <li className={Style.Cseguridad}>
            <AiFillAlert className={`icon ${Style.seguridad}`} />
            Seguridad
          </li>
          <li className={Style.Mvial}>
            <TbRoad className={`icon ${Style.Malla}`} /> Malla Vial{" "}
          </li>
          <li className={Style.Svial}>
            <BsFillSignStopFill className={`icon ${Style.Senalizacion}`} />{" "}
            Señalizacion Vial
          </li>
          <li className={Style.Epublicos}>
            <BsFillTreeFill className={`icon ${Style.Espacios}`} />
            Espacios Publicos{" "}
          </li>
          <li className={Style.Apublicos}>
            {" "}
            <GiDoubleStreetLights className={`icon ${Style.Alumbrado}`} />
            Alumbrado Publico
          </li>
          <li className={Style.Cambiental}>
            <TbRecycleOff className={`icon ${Style.Ambiental}`} />
            Contaminacion Ambiental
          </li>
        </ul>
      </div>

      <div>
        {res.news
          ? res.news.map((data, index) => {
              return (
                <div key={index}>
                  <h2>prueba</h2>
                  <h2 style={{ color: "red", width:"100px", margin:"0 auto", "border-bottom":"5px solid green" }}>{data.problem}</h2>
                  {data.comments.map((comment, index2) => {
                    return (
                      <h4 style={{ color: "white", width:"100px", margin:"0 auto","border-bottom":"2px solid purple"  }} key={index2}>
                        {comment.description}
                      </h4>
                    );
                  })}
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}

export default FiltarPor;
