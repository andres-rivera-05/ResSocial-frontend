import React, {useState, useEffect, useContext} from 'react'
import UserContext from './UsuarioProvider';
import axios from 'axios';

export const Comentarios = ({id}) => {

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
        //  console.log(response.data[0].num_comentarios)
      } catch (err) {
        console.error('Error al obtener los comentarios:', err);
      }
    }

    getComentarios();
  }, [contador])


  const captionHandler = (event) => {
    const { name, value } = event.target;
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
    } catch (err) {
      console.error("error en", err)
    }

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
                    <p className='autor-comentario'>{item.usuario_nombre}</p>
                    <p className='fecha-comentario'>{item.comentario_fecha}</p>
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
                    <div className="col-sm-10 content-input" bis_skin_checked="1">
                      <input type="text" className="form-control-plaintext" id="staticEmail" name='caption' placeholder='Escribe un comentario' onChange={captionHandler}></input>
                    </div>
                    <div className="col-sm-2" bis_skin_checked="1">
                      <button type="submit" className="btn btn-primary">Enviar</button>
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
