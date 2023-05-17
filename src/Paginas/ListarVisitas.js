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
import { format } from 'date-fns';


export function ListaVisitas(){
        const navigare = useNavigate();

        const [visitas, setVisitas] = useState([]);

        const obterDados = () =>{
            const api = axios.create({
                baseURL: "http://localhost:3001"
            });
            api.get("/visita")
                .then((response)=>{
                    console.log(response.data)
                    setVisitas(response.data)
                }
            )
            .catch((err) =>{
                console.error("Erro ao Listar");
            });
        }
        useEffect(()=>{
            obterDados();
        },[])


        const mostrarBotoes = (visita) => {
            return(
                <div className="flex justify-content-center">
                    <Button icon="pi pi-file-edit" aria-label="Filter"  style={{marginRight: '10px'}} onClick={() => navigare(`/Paginas/EditarVisita/${visita.id}`)}/>
                    <Button icon="pi pi-times" severity="danger" className="p-mr-4" style={{marginRight: '10px'}} onClick={() => deletarVisita(visita)}/>                    
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

    const deletarVisita = (visita) => {
        confirmDialog({
            message: 'Deseja excluir este registro?',
            header: 'Confirmação de Exclusão',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept,
            reject
        });
        axios.delete(`http://localhost:3001/visita/${visita.id}`)
            .then(response => {
                console.log(response.data); 
            })
            .catch(error => {
                console.log(error);
            });
    }

//Funão para formatar a data
        function formatDate(dateString) {
            const date = new Date(dateString);
            return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
        }
// Formatar Hora
function formatTime(timeString) {
    const date = new Date(timeString);
    const formattedTime = format(date, 'HH:mm');
    return formattedTime;
  }

//Interface

    return(
        <div>
            <div className="datatable-responsive-demo">
            <ConfirmDialog />
            <Toast ref={toast} />
                <div className="card  mt-4">
                    <DataTable value={visitas} paginator rows={10} header={ 
                                        <div className="d-flex align-items-center justify-content-between">
                                            <h4>Lista das Visita</h4>
                                        </div>
                                }>
                        <Column field="id" header="#"/>
                        <Column field="dataVisita" header="Data da Visita"  body={(rowData) => formatDate(rowData.dataVisita)}/>
                        <Column field="horaVisita" header="Hora Visita" body={(rowData) => formatTime(rowData.horaVisita)} />
                        <Column field="status" header="Status"/>
                        <Column header="Ações" body={mostrarBotoes}/>
                    </DataTable>
                </div>
            </div>            
        </div>
    )
}