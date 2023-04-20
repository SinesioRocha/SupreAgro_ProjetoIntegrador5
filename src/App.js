import { BrowserRouter, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./Navbar.js";
import {ListaColaborador} from './Paginas/ListaColaborador';
import { Agenda } from './Paginas/Agenda.js';
import { ListaProduto } from './Paginas/ListaProduto.js';
import { ListaCliente } from './Paginas/ListaCliente.js';
import { NovoColaborador } from './Paginas/NovoColaborador.js';


function App() {
  return (
    <div className="App">
       <Navbar/>
   
      <BrowserRouter>
        <Routes>
          <Route path='/ListaColaborador' element={<ListaColaborador/>}/>

          <Route path='/ListaCliente' element={<ListaCliente/>}/>

          <Route path='/ListaProduto' element={<ListaProduto/>}/>

          <Route path='/Agenda' element={<Agenda/>}/>

          <Route path='/NovoColaborador' element={<NovoColaborador/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
