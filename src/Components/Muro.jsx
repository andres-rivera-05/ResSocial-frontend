import React,{ useEffect, useState, useContext  } from 'react'
import axios from 'axios';
import UserContext from './UsuarioProvider';
import { Comentarios } from './Comentarios';

export const Muro = () => {

  const [dataMuro, setDataMuro] = useState([]);
  const [contador, setContador] = useState(0)
  const [caption, setCaption] = useState('')
  const {usuario} = useContext(UserContext)
  const [resultado, setResultado] = useState('')
  const [resultadoID, setResultadoID] = useState('')
  const [caprions, setCaptions]= useState('')

  console.log("este es mi resultado",resultadoID)

  const handleResultData = (data) => {
    setResultado(data);
    // Haz lo que necesites con el resultado
  };
  
  const handlerId = (id) =>{
    setResultadoID(id)
  }
  
  const getDatos = async () => {
    try {
      const url = "http://192.168.1.42:7000/api/publicacion";
      const response = await axios.get(url);
      setDataMuro(response.data);
    } catch (err) {
      throw new err("Error al cargar los datos");
    } 
  }

  useEffect(() => {
    getDatos();
  }, [contador])

  const captionHandler = (event) => {
    const { value } = event.target;
    setCaption(value)
  }

  const submitHandler = async () => {
    event.preventDefault();
    try {
      const url = "http://192.168.1.42:7000/api/publicacion";

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
        setCaption('');
      }
    } catch (err) {
      console.error(err)
    }
  }

  const onChangeinput =()=>{
      const {value} = event.target;
      setResultado(value)
      console.log(value)
  }
  
  const url = `http://192.168.1.42:7000/api/comentarios/editComentario/${resultadoID}`
  console.log(url)


  const putComentario = async () => {

    const data = {
      caption: resultado,
      nombre_usuario: usuario
    }
    const result = await axios.put(url, data)
  }
  return (
    <>

      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Editar Comentario</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">X</button>
            </div>
            <div className="modal-body">
              <div className="container-fluid rt">
                <div className="row rt">
                  <div className="col-12">
                    <div className="contenedor-input">
                      <form onSubmit={putComentario}>
                        <fieldset>
                          <div className="row" bis_skin_checked="1">
                            <div className="col-sm-9 content-input" bis_skin_checked="1">
                              <input type="text" value={resultado} onChange={onChangeinput} className="form-control-plaintext" id="staticEmail" name='caption' placeholder='Escribe un comentario'></input>
                            </div>
                            <div className="col-sm-3" bis_skin_checked="1">
                              <button type="submit" className="btn btn-primary">Responder</button>
                            </div>
                          </div>
                        </fieldset>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Understood</button>
            </div>
          </div>
        </div>
      </div>
      
      <div className='container mt-1 px-0'>
        <div className="col-12 col-sm-12 col-md-12 col-lg-6 contenedor-border mx-auto">
          <div className="col-12 col-sm-12 col-md-12 col-lg-12">
            <form className='mx-auto' onSubmit={submitHandler} >
              <fieldset>
                <div className="form-group row">
                  <div className="form-floating col-sm-12 ">
                    <textarea className="form-control textarea-no-resize" name='caption' placeholder={`Que estas pensando? ${usuario}`} value={caption} onChange={captionHandler} id="floatingTextarea"></textarea>
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
                    {item.nombre_usuario} <svg viewBox="0 0 22 22" aria-label="Cuenta verificada" role="img" width={"18px"} height={"18px"} fill='#0786ff' data-testid="icon-verified"><g><path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"></path></g></svg>
                  </div>
                  <div className="card-footer"><p className='contenedor-muro'>{item.caption}</p></div>
                  <p className="d-inline-flex gap-4">
                    <a className="btn btn-primary m-1 w-100 tr" data-bs-toggle="collapse" href={`#coment${item.id}`} role="button" aria-expanded="false" aria-controls="collapseExample"> Comentarios
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={15} height={15} fill='#FFFFFF'><path d="M512 240c0 114.9-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6C73.6 471.1 44.7 480 16 480c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4l0 0 0 0 0 0 0 0 .3-.3c.3-.3 .7-.7 1.3-1.4c1.1-1.2 2.8-3.1 4.9-5.7c4.1-5 9.6-12.4 15.2-21.6c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208z" /></svg>
                    </a>
                  </p>
                  <div className="collapse" id={`coment${item.id}`}>
                    <div className="card card-body p-0">     
                      <Comentarios id={item.id} onResultData={handleResultData} onIdSelec={handlerId}/>        
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>

      </div>
    </>
  )
}
