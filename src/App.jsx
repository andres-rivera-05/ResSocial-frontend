import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './Styles.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Muro } from './Components/Muro'
import { InicioSesion } from './Components/InicioSesion'
import { Registro } from './Components/Registro'
import { Comentarios } from './Components/Comentarios'

function App() {

  return (
    <>
      <BrowserRouter>
       <Routes>
        <Route path='' element={<InicioSesion/>}/>
        <Route path='/muro' element={<Muro />} />
        <Route path='/registro' element={<Registro />} />
        <Route path='/comentarios' element={<Comentarios />} />
       </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
