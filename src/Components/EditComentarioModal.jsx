import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export const EditComentarioModal = ({ comentarioId }) => {
    const [comentario, setComentario] = useState('');

    useEffect(() => { 
        const getEditComentario = async () => {
            const url = `http://192.168.1.42:7000/api/comentarios/editar/${comentarioId}`
            const resul = await axios.get(url)
            setComentario(resul.data)
        }
        getEditComentario();
    }, [comentarioId]);

    const handleInputChange = (event) => {
        setComentario(event.target.value);
    };

    const putComentario = async () =>{
        const url = `http://192.168.1.42:7000/api/comentarios/editComentario/${comentarioId}`
        const data={
            caption: comentario
        }
        const result = await axios.put(url, data)

    }

    return (
        <>

            <div className="container-fluid rt">
                <div className="row rt">
                    <div className="col-12">
                        <div className="contenedor-input">
                            <form >
                                <fieldset>
                                    <div className="row" bis_skin_checked="1">
                                        <div className="col-sm-9 content-input" bis_skin_checked="1">
                                            <input type="text" value={comentario} onChange={handleInputChange} onClick={() => putComentario} className="form-control-plaintext" id="staticEmail" name='caption' placeholder='Escribe un comentario' ></input>
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
        </>
    )
}
