import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function CollapsibleExample() {
  return (
    <div>
    <Navbar collapseOnSelect expand="lg" bg="secondary" variant="dark">
      <Container>
        <Navbar.Brand href="#home"><img
            src="http://supreagro.com.br/wp-content/uploads/2020/08/cropped-Logo-1-Color-2-2048x1030.png"
            width="150vh"
            style={{
              marginTop: "10px",
              marginBottom: "10px",
              marginRight: "20px"
            }}
          /></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/ListaCliente">Clientes</Nav.Link>
            <Nav.Link href="/listaColaborador">Colaboradores</Nav.Link>
            <Nav.Link href="/ListaProduto">Produtos</Nav.Link>
            <NavDropdown title="Agenda" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/Agenda">Agenda Do Dia</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Novo Agendamento</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Pedido" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Lista Pedido</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Novo Pedido</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  );
}

export default CollapsibleExample;