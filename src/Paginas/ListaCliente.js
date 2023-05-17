import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { ConfirmDialog } from 'primereact/confirmdialog'; // For <ConfirmDialog /> component
import { confirmDialog } from 'primereact/confirmdialog'; // For confirmDialog method
import { Toast } from 'primereact/toast';
     

export function ListaCliente(){

    const navigare = useNavigate();

    const [clientes, setclientes] = useState([]);

    const obterDados = () =>{
        const api = axios.create({
            baseURL: "http://localhost:3001"
        });
        api.get("/clientes")
            .then((response)=>{
                console.log(response.data)
                setclientes(response.data)
            }
        )
        .catch((err) =>{
            console.error("Erro ao Listar");
        });
    }
    useEffect(()=>{
        obterDados();
    },[])
//Metodo para Crirar os Botão de ação
    const mostrarBotoes = (clientes) => {
        return(
            <div className="flex justify-content-center">
                <Button icon="pi pi-home" aria-label="Filter"  style={{marginRight: '10px', backgroundColor: 'gray'}} onClick={() => navigare(`/Paginas/EditarCliente/${clientes.id}`)}/>
                <Button icon="pi pi-file-edit" aria-label="Filter"  style={{marginRight: '10px'}} onClick={() => navigare(`/Paginas/EditarCliente/${clientes.id}`)}/> 
                <Button icon="pi pi-times" severity="danger" className="p-mr-4" style={{marginRight: '10px'}} onClick={() => deletarColaborador(clientes)}/>                
            </div>
        )
    }

//Botão de excluir e função
    const toast = useRef(null);
    const accept = () => {
        toast.current.show({ severity: 'info', summary: 'Confirmou', detail: 'Você Aceitou!', life: 3000 });
        window.location.reload(); 
    }

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rejeitado', detail: 'Você Rejeitou!', life: 3000 });
    }

    const deletarColaborador = (clientes) => {
        confirmDialog({
            message: 'Deseja excluir este registro?',
            header: 'Confirmação de Exclusão',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept,
            reject
        });
        axios.delete(`http://localhost:3001/clientes/${clientes.id}`)
            .then(response => {
                console.log(response.data); 
            })
            .catch(error => {
                console.log(error);
            });
    }
//Interface
    return(    
    <div>
        <div className="datatable-responsive-demo">
            <ConfirmDialog />
            <Toast ref={toast} />
            <div className="card  mt-4">
                <DataTable value={clientes} paginator rows={10} header={ 
                                    <div className="d-flex align-items-center justify-content-between">
                                         <h4>Lista dos Clientes</h4>
                                         <Link to="/Paginas/NovoCliente">                                          
                                             <Button label="Novo" icon="pi pi-plus" className="btn btn-primary p-ml-auto" href="/NovoCliente"/>
                                         </Link>
                                    </div>
                            }>
                    <Column field="id" header="#"/>
                    <Column field="nome" header="Nome"/>
                    <Column field="telefone" header="Telefone"/>
                    <Column field="cnpj" header="CNPJ"/>
                    <Column header="Ações" body={mostrarBotoes}/>
                </DataTable>
            </div>
        </div>
    </div>
);
}