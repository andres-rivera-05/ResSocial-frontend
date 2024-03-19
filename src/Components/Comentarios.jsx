import React, { useState, useEffect, useContext } from 'react'
import UserContext from './UsuarioProvider';
import axios from 'axios';

export const Comentarios = ({ id, onResultData, onIdSelec }) => {

  const [comentario, setComentario] = useState([]);
  const [caption, setCaption] = useState('')
  const [contador, setContador] = useState(0)
  const { usuario } = useContext(UserContext);
 

  useEffect(() => {
    const getComentarios = async () => {
      try {
        const url = `http://localhost:7000/api/comentarios/${id}`;
        const response = await axios.get(url);
        setComentario(response.data)
        // console.log(response.data[0].num_comentarios)
      } catch (err) {
        console.error('Error al obtener los comentarios:', err);
      }
    }

    getComentarios();
  }, [contador])

  const captionHandler = (event) => {
    const { value } = event.target;
    setCaption(value)
  }

  const submitHandler = async () => {
    event.preventDefault();
    try {
      const url = `http://localhost:7000/api/comentarios/comentarios/${id}`;

      const data = {
        nombre_usuario: usuario,
        caption: caption
      }
      const result = await axios.post(url, data);
      setContador(contador + 1)
      setCaption('')
    } catch (err) {
      console.error("error en", err)
    }

  }

  const deleteComentario = async (id) => {
    const url = `http://localhost:7000/api/comentarios/delete/${id}`;
    const result = await axios.delete(url);
    const resultData = (result).data;
    setContador(contador + 1)
  }



  const getEditComentario = async (comentarioEditadoId) => {
    const url = `http://localhost:7000/api/comentarios/editar/${comentarioEditadoId}`
    const resul = await axios.get(url)
    const resultData = (resul.data[0].caption)
    onResultData(resultData)
  }

    const handlerEditId = (id) => {
      onIdSelec(id)
      console.log(id)
    }

  return (
    <>

      <div className="container-coment">
        <div className="row">
          <div className="col-12 contenedor-comentarios">
            {
              comentario.map((item) => (
                <div className='contenido-comentario' key={item.comentario_id}>
                  <div className='header-comentario'>
                    <div className="conente-user-date">
                      <p className='autor-comentario'>{item.usuario_nombre}</p>
                      <p className='fecha-comentario'>{item.comentario_fecha}</p>
                    </div>
                    <div className="content-btns">
                      <div className="btn-group dropstart">
                        <button type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width={15} height={15}><path d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z" /></svg>
                        </button>
                        <ul className="dropdown-menu">
                          <li>
                            <button type="button" className="btn btn-closes" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => {
                              getEditComentario(item.comentario_id); handlerEditId(item.comentario_id);
                            }}>Editar comentario</button></li>
                          <li> <button type="button" className="btn btn-closes t" onClick={() => deleteComentario(item.comentario_id)}>Eliminar comentario</button> </li>
                        </ul>
                      </div>
                   </div>             
                  </div>
                  <p className='caption-comentario'>{item.comentario_contenido}</p>
                </div>
              ))
            }
          </div>
        </div>
      </div>
      <div className="container-fluid rt">
        <div className="row rt">
          <div className="col-12">
            <div className="contenedor-input">
              <form onSubmit={submitHandler}>
                <fieldset>
                  <div className="row" bis_skin_checked="1">
                    <div className="col-sm-12 content-input" bis_skin_checked="1">
                      <input type="text" className="form-control-plaintext" id="staticEmail" name='caption' placeholder='Escribe un comentario' value={caption} onChange={captionHandler}></input>
                    </div>
                    <div className="col-sm-12 mt-2" bis_skin_checked="1">
                      <button type="submit" className="btn btn-primary">Responder</button>
                    </div>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
