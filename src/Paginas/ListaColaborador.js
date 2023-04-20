import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { PencilSquare, Trash3, PlusSquare } from 'react-bootstrap-icons';


export function ListaColaborador(){
    
    const navigate = useNavigate();

    const [colaborador, setColaborador] = useState([]);

    const obterDados = () =>{
        const api = axios.create({
            baseURL: "http://localhost:3001"
        });
        api.get("/colaborador")
            .then((response) => {
                console.log(response.data)
                setColaborador(response.data)
            }
        )
        .catch((err) => {
            console.error("Erro ao Listar");
        });
    }
    useEffect(() => {
        obterDados();
    }, [])

    const chamarEditar = () => {
        console.log("Clicou em Editar")
    }

    const chamarExclusao = () => {
        console.log("Clicou em Excluir")
      }

    return(
    
        <div className="col-md-8 mx-auto ">
            <br></br>
            <Button variant="secondary" className="mb-3 ml-auto" href="/NovoColaborador"><PlusSquare/> Novo Colaborador</Button>
            <Table bordered hover size="sm" responsive="xl"  className="text-center">
                <thead className="thead-dark">
                    <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th>Telefone</th>
                    <th>Endereço</th>
                    <th>Perfil</th>
                    <th>Ação</th>
                    </tr>
                </thead>
                <tbody>
                {colaborador.map(user => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.nome}</td>
                        <td>{user.telfone}</td>
                        <td>{user.endereco}</td>
                        <td>{user.Perfil}</td>
                        <td>
                            <Button variant="secondary" onClick={() => chamarEditar(user.id)}><PencilSquare/></Button>{' '}
                            <Button variant="secondary" onClick={() => chamarExclusao(user.id)}><Trash3></Trash3></Button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}