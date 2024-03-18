import axios from 'axios';
import React, { useEffect, useState } from 'react'

export const Registro = () => {

  const url = "http://192.168.1.42:7000/api/usuario"

  const [usuario, setUsuario] = useState('');
  const [correo, setCorreo] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [pass, setPass] = useState('');
  const [passConfirm, setPassConfirm] = useState('');
  const [estado, setEstado] = useState('');


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
    
    if(pass === passConfirm){
      const result = await axios.post(url, data);
      const resultData = (result).data;
      setEstado("Registrado con Exito")
    }else{
      setEstado("Las contrasenas no coinciden")
    }
  }

  return (
    <div>

      <div className='container mt-5' >
        <div className="col-12 col-sm-12 col-md-8 col-lg-6 mx-auto contenedor-registro">
          <form onSubmit={submitHnadler} >
            <fieldset>
              <legend className='text-center mb-5'>Registrarse</legend>

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
