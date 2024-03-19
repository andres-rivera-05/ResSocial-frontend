import axios from 'axios';
import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import UserContext from './UsuarioProvider';

export const InicioSesion = () => {

  const [dataForm, setDataForm] = useState({ nombre_usuario: " ", pass: " " });
  const [estado, setEstado] = useState('')
  const navigate = useNavigate();
  //const { setUsuario } = useContext(UserContext)
  const { actualizarUsuario } = useContext(UserContext);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setDataForm({ ...dataForm, [name]: value });
  }

  const onClickNavigate = () => {
    navigate('/registro')
  }

  const onSubmitHandler = async () => {
    event.preventDefault();
    const url = `http://localhost:7000/api/usuario/${dataForm.nombre_usuario}/${dataForm.pass}`

    try {
      const result = await axios.get(url)
      const resultData = (result).data;
      actualizarUsuario(resultData[0].nombre_usuario);
      // aqui guardo el nombre de usuario en el localStorage
      localStorage.setItem('nombreUsuario', resultData[0].nombre_usuario);
      //setUsuario(resultData[0].nombre_usuario)
      navigate('/muro')
    } catch (err) {
      setEstado("Usuario o Contrasena incorrectos.")
      console.error(err)
    }
  }

  return (
    <div>
      <div className='container mt-5' >
        <div className="col-12 col-sm-12 col-md-7 col-lg-5 mx-auto contenedor-registro">
          <form className='mx-auto' onSubmit={onSubmitHandler} >
            <fieldset>
              <legend className='text-center'>Iniciar Sesion</legend>

              <div className="form-group row">
                <label className="col-sm-12 col-form-label">Usuario</label>
                <div className="col-sm-12">
                  <input type="text" className="form-control-plaintext"
                    name="nombre_usuario" placeholder='nombre de usuario' onChange={onChangeHandler}/>
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-12 col-form-label">Contraseña</label>
                <div className="col-sm-12">
                  <input type="password" className="form-control-plaintext"
                    name="pass" placeholder='Contrasena' onChange={onChangeHandler}/>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-sm-12 mx-auto">
                  <button type="submit" className="btn btn-primary w-100">Iniciar Sesion</button>
                </div>
              </div>
            </fieldset>
          </form>
          <div className="form-group row">
            <div className="col-sm-12 mx-auto">
              <button type="buttom" onClick={onClickNavigate} className="btn btn-primary w-100">Registrarse</button>
            </div>
          </div>
          <div className="estado">{estado}</div>
        </div>
      </div>
    </div>
  )
}
