import axios from 'axios'
import { json } from 'react-router-dom'


export async function registroBd(envio) {

    const peticion = await axios.post("https://midenuncia-database-production.up.railway.app/signUp",envio).then(res => res).catch(err => console.error(err))

}

export async function loginBd(envio) {

    return axios.post("https://midenuncia-database-production.up.railway.app/signIn",envio);
   
    
}

export function peticiontarjeta(envio){
    const peticion = axios.get
}