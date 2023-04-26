import { Menubar } from 'primereact/menubar';
import { useHistory } from 'react-router-dom';
import './global.css';

function CollapsibleExample() {
  const items = [
    {
      label: 'Clientes',
      icon: 'pi pi-users',
      command:()=>{
        window.location.href='http://localhost:3000/Paginas/ListaCliente'}
    },
    {
      label: 'Colaboradores',
      icon: 'pi pi-user-plus',
      items: [
        { label: 'Consultar', icon: 'pi pi-file', command:()=>{
          window.location.href='http://localhost:3000/Paginas/ListaColaborador'}
        },
        { label: 'Perfils', icon: 'pi pi-id-card' },
        { label: 'Veiculos', icon: 'pi pi-car' },
      ]
    },
    {
      label: 'Produtos',
      icon: 'pi pi-tags',
      command:()=>{
        window.location.href='http://localhost:3000/Paginas/ListaProduto'}
    },
    {
      label: 'Agenda',
      icon: 'pi pi-book',
      items: [
        { label: 'Consultar', icon: 'pi pi-file', command:()=>{
          window.location.href='http://localhost:3000/Paginas/Agenda'}
        },
        { label: 'Visitas', icon: 'pi pi-briefcase' },
        { label: 'Relatorios', icon: 'pi pi-tablet' },
      ]
    },
    {
      label: 'Pedidos',
      icon: 'pi pi-shopping-bag',
      command:()=>{
        window.location.href='http://localhost:3000/Paginas/Pedidos'}
    },
    {
      label: 'Rotas',
      icon: 'pi pi-map'
    }
  ];
  const onMenuClick = (event) => {
    console.log(event.item);
  };

  const start = <img alt="logo" src="http://supreagro.com.br/wp-content/uploads/2020/08/cropped-Logo-1-Color-2-2048x1030.png" onError={(e) => e.target.src='http://supreagro.com.br/wp-content/uploads/2020/08/cropped-Logo-1-Color-2-2048x1030.png'} height="40" className="p-mr-2"></img>;
  return (
    <div>
    
          <Menubar model={items}start={start}  onItemSelect={onMenuClick}/>

    </div>
  );
}

export default CollapsibleExample;