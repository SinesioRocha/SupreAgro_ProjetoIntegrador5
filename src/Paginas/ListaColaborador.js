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
     
export function ListaColaborador(){
    
    const navigare = useNavigate();

    const [colaborador, setColaborador] = useState([]);

    const obterDados = () =>{
        const api = axios.create({
            baseURL: "http://localhost:3001"
        });
        api.get("/colaboradores")
            .then((response)=>{
                console.log(response.data)
                setColaborador(response.data)
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
    const mostrarBotoes = (colaboradores) => {
        return(
            <div className="flex justify-content-center">
                <Button icon="pi pi-file-edit" aria-label="Filter"  style={{marginRight: '10px'}} onClick={() => navigare(`/Paginas/EditarColaboradores/${colaboradores.id}`)}/> 
                <Button icon="pi pi-times" severity="danger" className="p-mr-4" style={{marginRight: '10px'}} onClick={() => deletarColaborador(colaboradores)}/>
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

    const deletarColaborador = (colaboradores) => {
        confirmDialog({
            message: 'Deseja excluir este registro?',
            header: 'Confirmação de Exclusão',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept,
            reject
        });
        axios.delete(`http://localhost:3001/colaboradores/${colaboradores.id}`)
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
                <div className="card  mt-4  ">
                    <DataTable value={colaborador} paginator rows={10} showGridlines  header={ 
                                        <div className="d-flex align-items-center justify-content-between">
                                             <h4>Lista dos Colaboradores</h4>
                                             <Link to="/Paginas/NovoColaborador">                                          
                                             <Button label="Novo" icon="pi pi-plus" className="btn btn-primary p-ml-auto" href="/NovoColaborador"/>
                                             </Link>
                                        </div>
                                }>
                        <Column field="id" header="#"/> 
                        <Column field="nome" header="Nome"/>
                        <Column field="telefone" header="Telefone"/>
                        <Column field="idPerfil" header="Perfil" />
                        <Column header="Ações" body={mostrarBotoes}/>
                    </DataTable>
                </div>
            </div>
        </div>
    );
}