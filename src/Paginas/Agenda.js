import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { ConfirmDialog } from 'primereact/confirmdialog'; // For <ConfirmDialog /> component
import { confirmDialog } from 'primereact/confirmdialog'; // For confirmDialog method
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { IniciarVisita } from "./IniciarVisita";



export function Agenda(){
    
    const navigare = useNavigate();
    const [agenda, setAgenda] = useState([]);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [selectedId, setSelectedId] = useState(null);



    const obterDados = () =>{
        const api = axios.create({
            baseURL: "http://localhost:3001"
        });
        api.get("/agendamentos")
            .then((response)=>{
                console.log(response.data)
                setAgenda(response.data)
            }
        )
        .catch((err) =>{
            console.error("Erro ao Listar");
        });
    }
    useEffect(()=>{
        obterDados();
    },[])
//Funão para formatar a data
    function formatDate(dateString) {
        const date = new Date(dateString);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    }

    //Metodo para Crirar os Botão de ação
    const mostrarBotoes = (agendamentos) => {
        return(
            <div className="flex justify-content-center">
                <Button icon="pi pi-file-edit" aria-label="Filter"  style={{marginRight: '10px'}} onClick={() => navigare(`/Paginas/EditarAgendamento/${agendamentos.id}`)}/> 
                <Button icon="pi pi-times" severity="danger" className="p-mr-4" style={{marginRight: '10px'}} onClick={() => deletarAgendamento(agendamentos)}/>
                <Button icon="pi pi-flag" label="Iniciar" className="p-mr-4" style={{marginRight: '10px'}}  onClick={() => handleOpenDialog(agendamentos.id)}/>
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

        const deletarAgendamento = (agendamentos) => {
            confirmDialog({
                message: 'Deseja excluir este registro?',
                header: 'Confirmação de Exclusão',
                icon: 'pi pi-info-circle',
                acceptClassName: 'p-button-danger',
                accept,
                reject
            });
            axios.delete(`http://localhost:3001/agendamentos/${agendamentos.id}`)
                .then(response => {
                    console.log(response.data); 
                })
                .catch(error => {
                    console.log(error);
                });
        }

        const handleOpenDialog = (id) => {
            setSelectedId(id);
            setDialogVisible(true);
          };
          
//Interface
    return(    
        <div>
            <div className="datatable-responsive-demo">
                <div className="card  mt-4">
                    <ConfirmDialog />
                    <Toast ref={toast} />

                    <Dialog visible={dialogVisible} style={{ width: '50vw' }} onHide={() => setDialogVisible(false)}>
                    
                    <IniciarVisita/>
                    
                    
                    </Dialog>
                    <DataTable value={agenda} paginator rows={10} header={ 
                                        <div className="d-flex align-items-center justify-content-between">
                                            <h4>Agendamentos</h4>
                                            <Link to="/Paginas/NovoAgendamento">                                          
                                                <Button label="Novo" icon="pi pi-plus" className="btn btn-primary p-ml-auto" href="/NovoAgendamento"/>
                                             </Link>                                        </div>
                                }>
                        <Column field="id" header="#"/>
                        <Column field="dataAgendada" header="Data" body={(rowData) => formatDate(rowData.dataAgendada)}/>
                        <Column field="idColaborador.nome" header="Colaborador"/>
                        <Column field="idCliente.nome" header="Cliente"/>
                        <Column header="Ações" body={mostrarBotoes}/>
                    </DataTable>
                </div>
            </div>
        </div>
    );
}