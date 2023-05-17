import { useState, useRef } from "react";
import 'primeicons/primeicons.css';
import React, { Component } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Link, useNavigate } from "react-router-dom";
import { Panel } from 'primereact/panel';
import axios from 'axios';
import { InputNumber } from 'primereact/inputnumber';
import { useHistory } from 'react-router-dom';

export function NovoProduto(){
    const[nome, setNome] = useState();
    const[unMedida, setUnMedida] = useState();
    const[valor, setValor] = useState();

    const toast = useRef(null);//faz o alesta de salvo com sucesso

    function gravar(){
        console.log("Clicou no gravar");

        const api = axios.create({
            urlBase: "http://localhost:3000",
        })
        //inserindo dados

        api.post(`http://localhost:3001/produtos`, {
            nome,
            unMedida,
            valor
           
        }).then(() => {
            toast.current.show({ severity: 'success', summary: 'Mensagem de sucesso', detail: 'Salvo com sucesso!' });
        }).catch(() => {
            toast.current.show({severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro ao Salvar.'})
        });
    }



    return(
        <di>
            <Toast ref={toast}></Toast>
            <Panel header="Cadastro Novo Produto" className="card flex justify-content-center mt-4" >
                <div className="p-col-4 p-md-4">
                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-user"></i>
                        </span>
                        <InputText placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)}/>
                    </div>
                </div>
                <div  className="p-col-4 p-md-4">
                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            Un
                        </span>
                        <InputText placeholder="Unidade de Medida" value={unMedida} onChange={(e) => setUnMedida(e.target.value)}/>                    </div>
                </div>
                <div  className="p-col-4 p-md-4">
                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            R$
                        </span>
                        <InputNumber placeholder="Valor R$" value={valor} onValueChange={(e) => setValor(e.value)} minFractionDigits={2} maxFractionDigits={5} />                </div>
                </div>
                <div className=" flex flex-wrap justify-content-center gap-3 ml-auto">
                    <Button label="Salvar" raised onClick={()=> gravar(history)}/>
                    <Link to="/Paginas/ListaProduto"> 
                        <Button label="Cancelar"  raised className="buton-cancel"/>
                    </Link>
                </div>
            </Panel>
        </di>
    )
}