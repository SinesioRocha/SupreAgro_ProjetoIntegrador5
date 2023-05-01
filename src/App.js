import { BrowserRouter, BrowserRouter as Router,Route, Routes } from 'react-router-dom';
import Navbar from "./Navbar.js";
import { Agenda } from './Paginas/Agenda.js';
import { ListaProduto } from './Paginas/ListaProduto.js';
import { ListaCliente } from './Paginas/ListaCliente.js';
import { NovoColaborador } from './Paginas/NovoColaborador.js';
import { ListaPedidos } from './Paginas/ListarPedidos.js';
import { NovoPedido } from './Paginas/NovoPedido.js';

import 'primereact/resources/themes/fluent-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { ListaColaborador } from './Paginas/ListaColaborador.js';




function App() {
  return (
    <div className="App">
       <Navbar/>
   
      <BrowserRouter>
        <Routes>
          <Route path='/Paginas/ListaColaborador' element={<ListaColaborador/>}/>

          <Route path='/Paginas/ListaCliente' element={<ListaCliente/>}/>

          <Route path='/Paginas/ListaProduto' element={<ListaProduto/>}/>

          <Route path='/Paginas/Agenda' element={<Agenda/>}/>

          <Route path='/Paginas/Pedidos' element={<ListaPedidos/>}/>

          <Route path='/Paginas/NovoColaborador' element={<NovoColaborador/>}/>

          <Route path='/Paginas/NovoPedido' element={<NovoPedido/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
