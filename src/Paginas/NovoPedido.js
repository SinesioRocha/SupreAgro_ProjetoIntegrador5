import { useState, useEffect } from "react";
import 'primeicons/primeicons.css';
import React, { Component, useRef} from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputNumber } from 'primereact/inputnumber';
import './style.css';
import { Calendar } from 'primereact/calendar';
import { Toast } from 'primereact/toast';
import { Link, useNavigate } from "react-router-dom";



export function NovoPedido(props){
    //Selects Dropdown
    const [colaborador, setColaborador] = useState(null);
    const [clientes, setclientes] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedOption2, setSelectedOption2] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');


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
        })
        api.get("/clientes")
        .then((response)=>{
            console.log(response.data)
            setclientes(response.data)
        }
        )
        .catch((err) =>{
            console.error("Erro ao Listar");
        })
        api.get("/produtos")
            .then((response)=>{
                console.log(response.data)
                setProduto(response.data)
            }
        )
        .catch((err) =>{
            console.error("Erro ao Listar");
        });;
    }
    
    useEffect(()=>{
        obterDados();
    },[])

//Função para Salvar
    const toast = useRef(null);//faz o alesta de salvo com sucesso

    function gravar(){
        const valorTotal = calculateTotal(cart);
        console.log("Clicou no gravar");

        const api = axios.create({
            urlBase: "http://localhost:3000",
        })
        //inserindo dados

        api.post("http://localhost:3001/pedidos", {
            idCliente: selectedOption2,
            idColaborador: selectedOption,
            dataVenda: selectedDate,
            valorTotal: valorTotal,
            produtos: {cart},
        }).then(() => {
            toast.current.show({ severity: 'success', summary: 'Mensagem de sucesso', detail: 'Salvo com sucesso!' });
        }).catch(() => {
            toast.current.show({severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro ao Salvar.'})
        });
    }

// Parte de compras
    const [cart, setCart] = useState([]);
    const [produto, setProduto] = useState([]);

    //Tabelas para Adicionar Produtos
    function handleAddToCart(product) {
        const newProduct = { ...product, quant: 1 };
        setCart([...cart, product]);
      }
    
      function handleRemoveFromCart(product) {
        setCart(cart.filter(p => p.id !== product.id));
      }
    
      const productColumns = [
        { field: 'nome', header: 'Nome' },
        { field: 'unMedida', header: 'UnMedida'},   
        { field: 'valor', header: 'Valor(R$)' },
        { header: 'Quantidade', body: (produto) =>(
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <InputNumber value={produto.quant} onValueChange={(e) => produto.quant = e.value} showButtons buttonLayout="vertical" style={{ width: '4rem'}} 
                decrementButtonClassName="p-button-success" incrementButtonClassName="p-button-success" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" />
            </div>
        )},
        { header: 'Ações',body: (produto) => (
            <Button label="Adicionar" onClick={() => handleAddToCart(produto)} raised icon="pi pi-plus"/>
        )}
      ];
    //Carrinho de compras
      const cartColumns = [
        { field: 'nome', header: 'Nome' },
        { field: 'unMedida', header: 'UnMedida'},
        { field: 'valor', header: 'Valor(R$)' },
        { field: 'quant', header:'Quantidade'},
        { header: 'Ações',body: (produto) => (
          <Button label="Remove" onClick={() => handleRemoveFromCart(produto)} className="buton-cancel " raised icon="pi pi-times"/>
        )}
      ];
    
      function calculateTotal(cart) {
        return cart.reduce((total, produto) => total + (produto.valor * produto.quant), 0);
    }


    return(
        <div className="card flex justify-content-center mt-4" >
            <Toast ref={toast}></Toast>
            <div className="p-col-4 p-md-4">
                <p>Colaborador:</p>
                <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-user"></i>
                    </span>
                    <Dropdown value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)} options={colaborador} optionLabel="nome" 
                    placeholder="Selecione o Colaborador" className="w-full md:w-14rem" required />
                </div>
            </div>
            <div className="p-col-4 p-md-4">
                <p>Cliente:</p>
                <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-users"></i>
                    </span>
                    <Dropdown value={selectedOption2} onChange={(e) => setSelectedOption2(e.target.value)} options={clientes} optionLabel="nome" 
                    placeholder="Selecione o Colaborador" className="w-full md:w-14rem" required/>
                </div>
            </div>
            <div className="p-col-4 p-md-4 calendar-wrapper">
                <p>Data da Venda:</p>
                <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-calendar-plus"></i>
                    </span>
                    <Calendar dateFormat="dd/mm/yy" id="basic" value={selectedDate} onChange={(e) => setSelectedDate(e.value)} name="dataVenda" required/>
                </div>
            </div>




            <div className="p-col-4 p-md-4 flex justify-content-center">
                
                <DataTable value={produto} className="datatable-responsive-demo tabela-produto" paginator rows={10}
                    header={
                            <div>
                                <i className="pi pi-list"  style={{ fontSize: '30px' }}></i> 
                                <h4>Lista de Produtos</h4>
                            </div>}>
                        {productColumns.map((column, i) => <Column key={i} field={column.field} 
                        header={column.header} body={column.body} />)}
                </DataTable>
                <br/>
                <DataTable value={cart} className="datatable-responsive-demo tabela-produto" paginator rows={10}
                header={<div>
                            <i className="pi pi-shopping-cart" style={{ fontSize: '30px' }}></i> 
                            <h4>Carrinho de Compras</h4>
                        </div>}>
                        {cartColumns.map((column, i) => <Column key={i} field={column.field} 
                        header={column.header} body={column.body} />)}
                </DataTable>
                <div className="p-col-4 p-md-4">
                    <p>Total a Pagar:</p>
                    <div className="p-inputgroup input-money">
                        <span className="p-inputgroup-addon">
                        <i className="pi pi-dollar"></i>
                        </span>
                        <InputText type="text" value={calculateTotal(cart)} disabled />
                    </div>
                </div>
            </div>

           <div className=" flex flex-wrap justify-content-center gap-3 ml-auto">
                <Button label="Salvar" raised onClick={()=> gravar(history)}/>
                <Link to="/Paginas/Pedidos"> 
                    <Button label="Cancelar"  raised className="buton-cancel"/>
                </Link>
            </div>
        </div>
    )
}
