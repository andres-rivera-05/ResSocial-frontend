import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const Registro = () => {

  const url = "http://localhost:7000/api/usuario"

  const [usuario, setUsuario] = useState('');
  const [correo, setCorreo] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [pass, setPass] = useState('');
  const [passConfirm, setPassConfirm] = useState('');
  const [estado, setEstado] = useState('');

  const navigate = useNavigate()


  const submitHnadler = async () => {
    event.preventDefault();
    const data = {
          nombre_usuario: usuario,
          correo_electronico: correo,
          contrasena: pass,
          nombre: nombre,
          apellido: apellido,
          confirmacion_con: passConfirm
    }
    
    if (usuario.length ===0 || correo.length === 0 || nombre.length ===0 
      || apellido.length === 0 || pass.length === 0 || passConfirm.length ===0){
      setEstado('completa todos los campos')
      return
    }
    
    if(pass === passConfirm){
      const result = await axios.post(url, data);
      const resultData = (result).data;
      setEstado("Registrado con Exito")
    }else{
      setEstado("Las contrasenas no coinciden")
    }
  }

  const onClickLogin = () => {
      navigate('/')
  }

  return (
    <div>

      <div className='container mt-5' >
        <div className="col-12 col-sm-12 col-md-8 col-lg-6 mx-auto contenedor-registro">
          <form onSubmit={submitHnadler} >
            <fieldset>
              <legend className='text-center mb-5'>
                <button type="button" onClick={onClickLogin} className="btn btn-primary btn-sm trt"><svg xmlns="http://www.w3.org/2000/svg" className="sert" width={15} viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" /></svg></button>
                Registrarse</legend>

              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Usuario</label>
                <div className="col-sm-9">
                  <input type="text" className="form-control-plaintext"
                    name="usuario" value={usuario} onChange={(e) => { setUsuario(e.target.value) }} placeholder='Ingrese el nombre de usuario'
                  />
                </div>
              </div>

              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Email</label>
                <div className="col-sm-9">
                  <input type="text" className="form-control-plaintext" name="correo" placeholder="Ingrese su Correo" value={correo} onChange={(e) => setCorreo(e.target.value)} />
                </div>
              </div>

              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Nombre</label>
                <div className="col-sm-9">
                  <input type="text" className="form-control-plaintext" name="nombre"
                    placeholder="Ingrese su Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                </div>
              </div>

              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Apellido</label>
                <div className="col-sm-9">
                  <input type="text" className="form-control-plaintext" name="apellido" placeholder="Ingrese su Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} />
                </div>
              </div>

              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Contrasena</label>
                <div className="col-sm-9">
                  <input type="text" className="form-control-plaintext" name="pass" placeholder="Ingrese su Contrasena" value={pass} onChange={(e) => setPass(e.target.value)} />
                </div>
              </div>

              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Confirmación</label>
                <div className="col-sm-9">
                  <input type="text" className="form-control-plaintext"
                    name="passConfirm" placeholder="Confirme su Contraseña" onChange={(e) => setPassConfirm(e.target.value)} />
                </div>
              </div>

              <button type="submit" className="btn btn-primary w-100">Registrar</button>
            </fieldset>
            <div className="estado">{estado}</div>
          </form>
        </div>
      </div>
    </div>
  )
}
