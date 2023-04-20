import { useState } from "react";
import axios from "axios";
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


export function NovoColaborador(){
    return(
        <div className="col-md-5 mx-auto ">
            <p className="text-center mt-3"><h3>Cadastro de Colaborador</h3></p>
            <form>
                <Form.Group controlId="formNome">
                    <Form.Label>Nome completo</Form.Label>
                    <Form.Control type="text" placeholder="Digite seu nome" />
                </Form.Group>
                <Form.Group controlId="formTelefone">
                    <Form.Label>Telefone</Form.Label>
                    <Form.Control type="text" placeholder="(xx) xxxxx-xxxx" />
                </Form.Group>
                <Form.Group controlId="formEndreco">
                    <Form.Label>Endereço</Form.Label>
                    <Form.Control type="text" placeholder="Rua Xxxxx, Nº xx" />
                </Form.Group>
                <Button variant="secondary" className="mb-3 ml-auto mt-2" type="submit">Salvar</Button>
            </form>
        </div>
    )
}