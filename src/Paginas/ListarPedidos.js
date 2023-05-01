import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import React, { Component } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

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
    
//Funão para formatar a data
    function formatDate(dateString) {
        const date = new Date(dateString);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
      }
//Metodo para Crirar os Botão de ação
      const mostrarBotoes = (pedido) => {
        return(
            <div className="flex justify-content-center">
                <Button icon="pi pi-file-edit" aria-label="Filter"  style={{marginRight: '10px'}}/> 
                <Button icon="pi pi-times" severity="danger" className="p-mr-4" style={{marginRight: '10px'}}/>
                <Button icon="pi pi-inbox" severity="success" aria-label="Search" style={{marginRight: '10px'}} onClick={() => mostrarProdutos(pedido)}/>
            </div>
        )
      }
//Listar produtos do Pedido
    const [visible, setVisible] = useState(false);
    const [produtosPedido, setProdutosPedido] = useState([]);

    const mostrarProdutos = (pedido) => {
        axios.get(`http://localhost:3001/pedidos/${pedido.id}`)
          .then((response) => {
            console.log(response.data)
            setProdutosPedido(response.data.produtos.cart);
            setVisible(true);
          })
          .catch((error) => console.log(error));
      };

    return(
        <div>
            <div className="datatable-responsive-demo">
                <Dialog header="Lista de Produtos" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                    <DataTable value={produtosPedido} paginator rows={10}>
                        <Column field="nome" header="Produto" />
                        <Column field="quant" header="Quantidade" />
                    </DataTable>
                </Dialog>
                <div className="card  mt-4">
                    <DataTable value={pedidos} paginator rows={10} header={ 
                                        <div className="d-flex align-items-center justify-content-between">
                                            <h4>Lista de Pedidos</h4>
                                            <Link to="/Paginas/NovoPedido">  
                                                <Button label="Novo" icon="pi pi-plus"  className="btn btn-primary p-ml-auto" href="/NovoPedido"/>
                                            </Link>
                                        </div>
                                }>
                        <Column field="id" header="#"/>
                        <Column field="idCliente.selectedOption.nome" header="Cliente"/>
                        <Column field="idColaborador.selectedOption2.nome" header="Colaborador"/>
                        <Column field="dataVenda" header="Data" body={(rowData) => formatDate(rowData.dataVenda)}/>
                        <Column field="valorTotal" header="Total (R$)" />
                        <Column header="Ações" body={mostrarBotoes}/>
                    </DataTable>
                </div>
            </div>
        </div>
    );
}
