import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const InicioSesion = () => {

  const [dataForm, setDataForm] = useState({ nombre_usuario: " ", pass: " " });
  const [estado, setEstado] = useState('')
  const navigate = useNavigate();

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setDataForm({ ...dataForm, [name]: value });
  }

  const onSubmitHandler = async () => {
    event.preventDefault();
    const url = `http://localhost:7000/api/usuario/${dataForm.nombre_usuario}/${dataForm.pass}`

    try {
      const result = await axios.get(url)
      const resultData = (result).data;
      navigate('/muro')
    } catch (err) {
      setEstado("Usuario o Contrasena incorrectos.")
      console.error(err)
    }
  }

  return (
    <div>
      <div className='container mt-5' >
        <div className="col-12 col-sm-12 col-md-8 col-lg-6 mx-auto contenedor-registro">
          <form className='mx-auto' onSubmit={onSubmitHandler} >
            <fieldset>
              <legend className='text-center'>Iniciar Sesion</legend>

              <div className="form-group row">
                <label className="col-sm-12 col-form-label">Usuario</label>
                <div className="col-sm-12">
                  <input type="text" className="form-control-plaintext"
                    name="nombre_usuario" onChange={onChangeHandler}

                  />
                </div>
              </div>


              <div className="form-group row">
                <label className="col-sm-12 col-form-label">Contraseña</label>
                <div className="col-sm-12">
                  <input type="password" className="form-control-plaintext"
                    name="pass" onChange={onChangeHandler}
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-sm-7 mx-auto">
                  <button type="submit" className="btn btn-primary w-100">Iniciar Sesion</button>
                </div>
              </div>
            </fieldset>
            <div className="estado">{estado}</div>
          </form>
        </div>
      </div>
    </div>
  )
}
