import { IoIosPaperPlane } from 'react-icons/io'
import { IoDocumentTextOutline, IoCloseSharp } from 'react-icons/io5'
import style from './peticionesUsuarios.module.css'
/* importar el react-hook para iniciar el formulario */
import { useForm } from 'react-hook-form'
import {CiInboxOut } from "react-icons/ci";

export default function FormularioPeticion ({user}) {
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
		defaultValues: {...user}
	})

  const enviar = (values) => {
		console.log(values)
	}

  /* contenedor form */
  return (
    <form action=""  encType="multipart/form-data" className={style.contenedorform} onSubmit={handleSubmit(enviar)}>
      <p className={style.contenedortext}>
          Registro de solicitud - Recuerda que los campos con * son obligatorios
      </p>
      {/* select para elegir el tipo de solicitud */}
      <div className={style.contenedorSolicitud}>
          <label className={style.solilabel}>Tipo de solicitud:</label>
          <select {...register('type_request', {
            required: true
          })} id="" className={style.contenedorselect}>
              <option value="">
                  Tipo de solicitud
              </option>
              <option value="malla">
                  Malla vial
              </option>
          </select>
          {errors.type_request && <p className={style.palabraError}>El tipo de solicitud es requerido</p>}
      </div>
      {/* inicio de datos personales */}
      <div className={style.contenedorprinDatos}>
              <div className={style.contenedoricotex}>
                  <IoDocumentTextOutline className={style.icontext} />
                  <p>Datos personales:</p>
              </div>
          <div className={style.contenedorDatos}>

              <div className={style.info}>
                  <p>* Tipo de documento:</p>
                  <select {...register('type_document', {
                    required: true,
                  })} id="" disabled={Boolean(user.type_document)}>
                      <option value="">
                          tipo de documento
                      </option>
                      <option value="cc" selected>
                          Cedula de ciudadania
                      </option>
                      <option value="ti" selected>
                          Tarjeta identidad
                      </option>
                      <option value="pp" selected>
                          Pasaporte
                      </option>
                      <option value="ce" selected>
                          Cedula de extranjeria
                      </option>
                  </select>
                  {errors.type_document && <p className={style.palabraError}>El tipo de documento es requerido</p>}
              </div>

              <div className={style.infolabel}>
                  <label htmlFor="documento">* Número de documento:</label>
                  <input type="text" placeholder="91287459" id='documento' disabled={user.document} {...register('document', {
                    required: true,
                    pattern: /^[0-9]{7,11}$/,
                    minLength: 7,
                    maxLength: 11
                  })} />
                  {errors.document?.type === 'required' && <p className={style.palabraError}>El numero de documento es requerido</p>}
                  {errors.document?.type === 'pattern' && <p className={style.palabraError}>Solo puede ingresar numeros</p>}
                  {errors.document?.type === 'minLength' && <p className={style.palabraError}>El numero de documento debe tener al menos 7 numeros</p>}
                  {errors.document?.type === 'maxLength' && <p className={style.palabraError}>El numero de documento no puede tener mas de 11 numeros</p>}
              </div>
              {!user.document
              && <div className={style.infolabel}>
                    <label htmlFor="cofirmacionDocumento">
                        * Confirmación de documento:
                    </label>
                    <input type="text" placeholder="91287459" id='cofirmacionDocumento' {...register('retry_document', {
                      required: true,
                      validate: (value) => {
                        if (watch('document') !== value) return 'El documento no esta correcto'
                      }
                    })} />
                    {errors.retry_document?.type === 'required' && <p className={style.palabraError}>El numero de confirmacion del documento es requerido</p>}
                    {errors.retry_document?.type === 'validate' && <p className={style.palabraError}>{errors.retry_document.message}</p>}
                </div>
              }

              <div className={style.infolabel}>
                  <label htmlFor="expedicion">
                    * Lugar de expedición:
                  </label>
                  <input type="text" placeholder="Bucaramanga"  id='expedicion' disabled={user.place_get_document} {...register('place_get_document', {
                    required: true,
                    pattern: /^[a-zA-Z]*$/,
                  })}
                  />
                  {errors.place_get_document?.type === 'required' && <p className={style.palabraError}>El lugar de expedición es requerido</p>}
                  {errors.place_get_document?.type === 'pattern' && <p className={style.palabraError}>Solo puede ingresar letras</p>}
              </div>

              <div className={style.infolabel}>
                  <label htmlFor="nombre">
                      Nombres:
                  </label>
                  <input type="text" disabled {...register('name')}/>
              </div>

              <div className={style.infolabel}>
                  <label htmlFor="last_name">
                      Apellidos:
                  </label>
                  <input type="text" disabled {...register('last_name')}/>
              </div>

              <div className={style.infolabel}>
                  <label htmlFor="direccion">
                    * Dirección
                  </label>
                  <input type="text" placeholder=" cll 01 #02-03" id='direccion' disabled={user.address} {...register('address', {
                    required: true,
                    minLength: 7
                  })}
                  />
                  {errors.address?.type === 'required' && <p className={style.palabraError}>La dirección es requerida</p>}
                  {errors.address?.type === 'minLength' && <p className={style.palabraError}>Debe ingresar al menos 7 caracteres</p>}
              </div>

              <div className={style.infolabel}>
                  <label htmlFor="barrioper">
                    * Barrio
                  </label>
                  <input type="text" placeholder="García Rovira" disabled={user.neighborhood} id='barrioper'
                  {...register('neighborhood', {
                    required: true,
                    minLength: 4
                  })}
                  />
                  {errors.neighborhood?.type === 'required' && <p className={style.palabraError}>El barrio es requerido</p>}
                  {errors.neighborhood?.type === 'minLength' && <p className={style.palabraError}>Debe ingresar al menos 4 caracteres</p>}
              </div>
              <div className={style.infolabel}>
                  <label htmlFor="telefono">
                    * Telefono:
                  </label>
                  <input type="text" placeholder="3157845257" disabled={user.contact_phone} id='telefono'
                  {...register('contact_phone', {
                    required: true,
                    pattern: /^[0-9]{7,10}$/,
                    minLength: 7,
                    maxLength: 10
                    
                  })}
                  />
                  {errors.contact_phone?.type === 'required' && <p className={style.palabraError}>El número de telefono es requerido</p>}
                  {errors.contact_phone?.type === 'pattern' && <p className={style.palabraError}>Solo puede ingresar numeros</p>}
                  {errors.contact_phone?.type === 'minLength' && <p className={style.palabraError}>El numero de telefono debe tener al menos 7 numeros</p>}
                  {errors.contact_phone?.type === 'maxLength' && <p className={style.palabraError}>El numero de telefono no puede tener mas de 10 numeros</p>}
              </div>
          </div>
      </div>
      {/* siguiente información para llenar la petición */}
      <div>
          <div className={style.complinf}>
              <label htmlFor="asunto">
                * Asunto del problema:
              </label>
              <input type="text" placeholder="Daño en el alcantarillado" id='asunto' 
              {...register('case', {
                required: true
              })}
              />
              {errors.case?.type === 'required' && <p className={style.palabraError}>El asunto del problema es requerido</p>}	
          </div>
          <div className={style.complinf}>
              <label htmlFor="descripcion">
              * Descripción del problema:
              </label>
              <input type="text" placeholder="Debido a esto se han ocacionado muchos accidentes en la via, por el robo de una tapa de la alcantandarilla" id='descripcion' 
              {...register('description', {
                required: true
              })}
              />
              {errors.description?.type === 'required' && <p className={style.palabraError}>La descripción del problema es requerida</p>}
          </div>
          <div className={style.textdes}>
              <label htmlFor="desSolicitud">
                * Descripción de la solicitud:
              </label>
              <textarea type="text" rows={15} placeholder="Quisiera reportar este  incidente ante las entidades gubernamentales para que hagan acción..." id='desSolicitud'
              {...register('request_description', {
                required: true
              })}
              />
              {errors.request_description?.type === 'required' && <p className={style.palabraError}>La descripción de la solicitud es requerida</p>}
          </div>
      </div>
      {/* datos de localizacion sobre el problema */}
          <h3 className={style.textlocal}>Localización del problema:</h3>
      <div className={style.inflocal}>
          <div className={style.infbar}>
              <label htmlFor="barrio">
              * Barrio:
              </label>
              <input type="text" placeholder="García Rovira" id='barrio' 
              {...register('neighborhood_request', {
                required: true,
                minLength: 4
              })}
              />
              {errors.neighborhood_request?.type === 'required' && <p className={style.palabraError}>El barrio es requerido</p>}
              {errors.neighborhood_request?.type === 'minLength' && <p className={style.palabraError}>Debe ingresar al menos 4 caracteres</p>}
          </div>
          <div className={style.infodesp}>
              <label htmlFor="descripcion">* Descripción de la localización:</label>
              <textarea  id="descripcion" cols="45" rows="8" placeholder="Este incidente se encuentra en la carrera 13 #31-34..." {...register('description_place_request', {
                required: true
              })}></textarea>
              {errors.description_place_request?.type === 'required' && <p className={style.palabraError}>La descripción de la localización es requerida</p>}
          </div>
      </div>
      {/* adjuntar la imagen de la petición */}
      <div className={style.infoimg}>
          <h3>Archivos adjuntos:</h3>
          <p>Señor/a usuario debe adjuntar solo fotos con un peso máximo de 5mb</p>
          <input type="file"  id="file" accept='image/*' className={style.inputfile}
          {...register('image', {
            required: true
          })}	
          />
          <label htmlFor='file'>
          <CiInboxOut size={25}/>
          <span className={style.iborrainputfile}>{watch("image")? watch("image")[0].name:"Seleccionar archivo"}</span>
          </label>
          {errors.image?.type === 'required' && <p className={style.palabraError}>La imagen es requerido</p>}
      </div>
      {/* texto importante para erl usuario */}
      <div className={style.textusu}>
          <p>
              Respuesta: Es importante revisar periódicamente el correo electrónico que registraste en la página, durante un plazo aproximado de 15 días hábiles, ya que es la forma más probable de respuesta a tu peticón. Sin embargo, también podrías recibir alguna respuesta por correspondencia física o solicitar  más información por teléfono.
          </p>
      </div>
      {/* firma del usuario */}
      <div className={style.infofirma}>

      </div>
      {/* termino de datos */}
      <div className={style.infoterminos}>
          <div className={style.terminosDatos}>
              <h3>Tratamiento de datos:</h3>
              <div className={style.datostext}>
                  <input type="checkbox" id="" 
                  {...register('accept_data_treatment', {
                    required: true
                  })}	
              />
                  <label>He leído y acepto las <span>políticas de Privacidad y tratamiento de Datos Personales.</span></label>
              </div>
              {errors.accept_data_treatment?.type === 'required' && <p className={style.palabraError}>Las politicas de privacidad son requeridas</p>}														
          </div>
          <div>
              <h3>Terminos y condiciones:</h3>
              <div className={style.datostext}>
                  <input type="checkbox" id="" 
                  {...register('accept_conditions_terms', {
                    required: true
                  })}	
              />
              <label>He leído y acepto los <span>términos y condiciones de esta petición.</span></label>
              </div>
              {errors.accept_conditions_terms?.type === 'required' && <p className={style.palabraError}>Los terminos y condiciones son requeridos</p>}	
          </div>
      </div>
      {/* botenes */}
      <div className={style.botones}>
          <button className={style.boton1} type='submit'>Enviar<IoIosPaperPlane/></button>
          <button className={style.boton2}>Cancelar<IoCloseSharp/></button>

      </div>
  </form>
  )
}