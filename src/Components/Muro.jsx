import React,{ useEffect, useState, useContext  } from 'react'
import axios from 'axios';
import UserContext from './UsuarioProvider';

export const Muro = () => {

  const [dataMuro, setDataMuro] = useState([]);
  const [contador, setContador] = useState(0)
  const [caption, setCaption] = useState('')
  const {usuario} = useContext(UserContext)
  const [disable, setDisable] = useState("disabled")
  
  const getDatos = async () => {
    try {
      const url = "http://localhost:7000/api/publicacion";
      const response = await axios.get(url);
      setDataMuro(response.data);
    } catch (err) {
      throw new err("Error al cargar los datos");
    } 
  }

  useEffect(() => {
    getDatos();
  }, [contador])

  const captionHandler = () => {
    const { name, value } = event.target;
    setCaption(value)
  }

  const submitHandler = async () => {
    event.preventDefault();
    try {
      const url = "http://localhost:7000/api/publicacion";

      const data = {
        caption: caption,
        nombre_usuario: usuario
      }
      if(caption.trim() === ''){
        alert("No has escrito nada")
      }else{
        const result = await axios.post(url, data);
        const resultData = (result).data;
        setContador(contador + 1)
        console.log(resultData)
      }
    } catch (err) {
      console.error(err)
    }

  }



  return (
    <div>
      <div className='container mt-1' >
        <div className="col-12 col-sm-12 col-md-12 col-lg-6 contenedor-border mx-auto">
          <div className="col-12 col-sm-12 col-md-12 col-lg-12">
            <form className='mx-auto' onSubmit={submitHandler} >
              <fieldset>
                <div className="form-group row">
                  <div className="form-floating col-sm-12 ">
                    <textarea className="form-control textarea-no-resize" name='caption' placeholder={`Que estas pensando? ${usuario}`} onChange={captionHandler} id="floatingTextarea"></textarea>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-sm-12 d-flex justify-content-end">
                    <button type="submit" className="btn-close btn btn-primary w-50">Postear</button>
                  </div>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
        <div className="col-12 col-sm-12 col-md-12 col-lg-6 contenedor-border mx-auto p-0 rt">
          <div className="col-12 col-sm-12 col-md-12 col-lg-12 px-0">
            {
              dataMuro.map((item) => (
                <div key={item.id} className="card text-white bg-secondary mx-auto " bis_skin_checked="1">
                  <div className="card-header" bis_skin_checked="1">
                    {item.nombre_usuario} 
                  </div>
                  <div className="card-footer"><p>{item.caption}</p></div>
                  <p className="d-inline-flex gap-4">
                    <a className="btn btn-primary m-1 w-100 tr" data-bs-toggle="collapse" href={`#coment${item.id}`} role="button" aria-expanded="false" aria-controls="collapseExample"> Comentarios
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={15} height={15} fill='#FFFFFF'><path d="M512 240c0 114.9-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6C73.6 471.1 44.7 480 16 480c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4l0 0 0 0 0 0 0 0 .3-.3c.3-.3 .7-.7 1.3-1.4c1.1-1.2 2.8-3.1 4.9-5.7c4.1-5 9.6-12.4 15.2-21.6c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208z" /></svg>
                    </a>
                  </p>
                  <div className="collapse" id={`coment${item.id}`}>
                    <div className="card card-body">             
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>

      </div>
    </div>
  )
}
