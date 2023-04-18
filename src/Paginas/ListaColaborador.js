import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';

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

    return(
    
        <div className="col-md-8 mx-auto">
            <Table bordered hover size="sm" responsive="xl"  className="text-center">
                <thead className="thead-dark">
                    <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th>Telefone</th>
                    <th>Endereço</th>
                    <th>Perfil</th>
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
                    </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}