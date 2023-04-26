import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import React, { Component } from 'react';
import { Button } from 'primereact/button';

export function Agenda(){
    
    const navigare = useNavigate();

    const [agenda, setAgenda] = useState([]);

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
//Interface
    return(    
        <div>
            <div className="datatable-responsive-demo">
                <div className="card  mt-4">
                    <DataTable value={agenda} paginator rows={10} header={ 
                                        <div className="d-flex align-items-center justify-content-between">
                                            <h4>Agendamentos</h4>
                                            <Button label="New" icon="pi pi-plus" className="btn btn-primary p-ml-auto" />
                                        </div>
                                }>
                        <Column field="id" header="#"/>
                        <Column field="dataAgendada" header="Data"/>
                        <Column field="idColaborador" header="Colaborador"/>
                        <Column field="idCliente" header="Cliente"/>
                    </DataTable>
                </div>
            </div>
        </div>
    );
}