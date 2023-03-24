import axios from 'axios'

export async function registroBd(envio) {

    const peticion = await axios.post("https://midenuncia-database-production.up.railway.app/signUp",envio).then(res => res).catch(err => console.error(err))

}

export async function loginBd(envio) {

    const peticion = axios.post("https://midenuncia-database-production.up.railway.app/signIn",envio).then(res => console.log(res)).catch(err => console.error(err))

}

export function peticiontarjeta(envio){
    const peticion = axios.get
}