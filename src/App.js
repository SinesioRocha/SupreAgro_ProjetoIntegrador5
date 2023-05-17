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
import { EditarPedidos } from './Paginas/EditarPedidos.js';
import { EditarColaboradores } from './Paginas/EditarColaboradores.js';
import { EditarCliente } from './Paginas/EditarCliente.js';
import { NovoCliente } from './Paginas/NovoCliente.js';
import { NovoProduto } from './Paginas/NovoProduto.js';
import { EditarProduto } from './Paginas/EditarProduto.js';
import { NovoAgendamento } from './Paginas/NovoAgendamento.js';
import { EditarAgendamento } from './Paginas/EditarAgendamento.js';
import { IniciarVisita } from './Paginas/IniciarVisita.js';
import { ListaVisitas } from './Paginas/ListarVisitas.js';




function App() {
  return (
    <div className="App">
       <Navbar/>
   
      <BrowserRouter>
        <Routes>
          <Route path='/Paginas/ListaColaborador' element={<ListaColaborador/>}/>

          <Route path='/Paginas/ListaCliente' element={<ListaCliente/>}/>

          <Route path='/Paginas/ListaProduto' element={<ListaProduto/>}/>

          <Route path='/Paginas/ListarVisitas' element={<ListaVisitas/>}/>

          <Route path='/Paginas/Agenda' element={<Agenda/>}/>

          <Route path='/Paginas/Pedidos' element={<ListaPedidos/>}/>

          <Route path='/Paginas/IniciarVisita/agendamento/:id' element={<IniciarVisita/>}/>

          <Route path='/Paginas/NovoColaborador' element={<NovoColaborador/>}/>

          <Route path='/Paginas/NovoPedido' element={<NovoPedido/>}/>

          <Route path='/Paginas/NovoCliente' element={<NovoCliente/>}/>

          <Route path='/Paginas/NovoProduto' element={<NovoProduto/>}/>

          <Route path='/Paginas/NovoAgendamento' element={<NovoAgendamento/>}/>

          <Route path='/Paginas/EditarPedidos/:id' element={<EditarPedidos/>}/>

          <Route path='/Paginas/EditarColaboradores/:id' element={<EditarColaboradores/>}/>

          <Route path='/Paginas/EditarCliente/:id' element={<EditarCliente/>}/>

          <Route path='/Paginas/EditarProduto/:id' element={<EditarProduto/>}/>

          <Route path='/Paginas/EditarAgendamento/:id' element={<EditarAgendamento/>}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
