import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import React, { Component } from 'react';
import { Button } from 'primereact/button';

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
//Interface
  
    return(
    
        <div>
            <div className="datatable-responsive-demo">
                
                <div className="card  mt-4  ">
                    <DataTable value={colaborador} paginator rows={10} showGridlines  header={ 
                                        <div className="d-flex align-items-center justify-content-between">
                                             <h4    >Lista dos Colaboradores</h4>
                                             <Link to="/Paginas/NovoColaborador">                                          
                                             <Button label="Novo" icon="pi pi-plus" className="btn btn-primary p-ml-auto" href="/NovoColaborador"/>
                                             </Link>
                                        </div>
                                }>
                        <Column field="id" header="#"/>
                        <Column field="nome" header="Nome"/>
                        <Column field="telfone" header="Telefone"/>
                        <Column field="endereco" header="Endereço" />
                        <Column field="idPerfil" header="Perfil" />
                    </DataTable>
                </div>
            </div>
        </div>
    );
}