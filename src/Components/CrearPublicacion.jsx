import React from 'react'

export const CrearPublicacion = () => {
  return (
    <>
          <div className='container mt-1' >
              <div className="col-12 mx-auto">
                  <form  className='mx-auto' >
                      <fieldset>

                          <div className="form-group row">
                              <div className="col-sm-12">
                                  <input type="text" className="form-control-plaintext"
                                      name="caption" placeholder="Que estas pensando?"
                                 />
                              </div>
                          </div>
                          <div className="form-group row">
                              <div className="col-sm-12">
                                  <button type="submit" className="btn-close btn btn-primary w-100" data-bs-dismiss="modal" >Crear Publicacion</button>
                              </div>
                          </div>

                      </fieldset>
                  </form>
              </div>
          </div>
    </>
  )
}
