import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import React, { Component } from 'react';
import { Button } from 'primereact/button';

export function ListaPedidos(){
    const navigare = useNavigate();

    const [pedidos, setPedidos] = useState([]);

    const obterDados = () =>{
        const api = axios.create({
            baseURL: "http://localhost:3001"
        });
        api.get("/pedidos")
            .then((response)=>{
                console.log(response.data)
                setPedidos(response.data)
            }
        )
        .catch((err) =>{
            console.error("Erro ao Listar");
        });
    }
    useEffect(()=>{
        obterDados();
    },[])

    return(
        <div>
        <div className="datatable-responsive-demo">
            <div className="card  mt-4">
                <DataTable value={pedidos} paginator rows={10} header={ 
                                    <div className="d-flex align-items-center justify-content-between">
                                         <h4>Lista de Pedidos</h4>
                                         <Button label="Novo" icon="pi pi-plus"  className="btn btn-primary p-ml-auto" href="/NovoPedido"/>
                                    </div>
                            }>
                    <Column field="id" header="#"/>
                    <Column field="idCliente" header="Cliente"/>
                    <Column field="idColaborador" header="Colaborador"/>
                    <Column field="dataVenda" header="Data" />
                    <Column field="valorTotal" header="Total (R$)" />
                </DataTable>
            </div>
        </div>
    </div>
    );
}
