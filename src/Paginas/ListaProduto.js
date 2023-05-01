import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import React, { Component } from 'react';
import { Button } from 'primereact/button';

export function ListaProduto(){
    const navigare = useNavigate();

    const [produto, setProduto] = useState([]);

    const obterDados = () =>{
        const api = axios.create({
            baseURL: "http://localhost:3001"
        });
        api.get("/produtos")
            .then((response)=>{
                console.log(response.data)
                setProduto(response.data)
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
                <DataTable value={produto} paginator rows={10} header={ 
                                    <div className="d-flex align-items-center justify-content-between">
                                         <h4>Lista dos Produtos</h4>
                                         <Button label="New" icon="pi pi-plus" className="btn btn-primary p-ml-auto" />
                                    </div>
                            }>
                    <Column field="id" header="#"/>
                    <Column field="nome" header="Nome"/>
                    <Column field="unMedida" header="UnMedida"/>
                    <Column field="valor" header="Valor" />
                </DataTable>
            </div>
        </div>
    </div>
    );
}