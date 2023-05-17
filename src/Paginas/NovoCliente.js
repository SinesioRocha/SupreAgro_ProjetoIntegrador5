import { useState, useRef } from "react";
import 'primeicons/primeicons.css';
import React, { Component } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Link, useNavigate } from "react-router-dom";
import { Panel } from 'primereact/panel';
import axios from 'axios';

export function NovoCliente(){
    const[nome, setNome] = useState();
    const[telefone, setTelefone] = useState();
    const[cnpj, setCNPJ] = useState();


    function gravar(){
        console.log("Clicou no gravar");

        const api = axios.create({
            urlBase: "http://localhost:3000",
        })
        //inserindo dados

        api.post(`http://localhost:3001/clientes`, {
            nome,
            telefone,
            cnpj
           
        }).then(() => {
            toast.current.show({ severity: 'success', summary: 'Mensagem de sucesso', detail: 'Salvo com sucesso!' });
        }).catch(() => {
            toast.current.show({severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro ao Salvar.'})
        });
    }
    
    const toast = useRef(null);//faz o alesta de salvo com sucesso

    return(
        <div>
            <Toast ref={toast}></Toast>
            <Panel header="Cadastro Novo Cliente" className="card flex justify-content-center mt-4" >
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
                            <i className="pi pi-phone"></i>
                        </span>
                        <InputMask id="Telefone" mask="(999) 99999-9999" placeholder="(000) 00000-0000" value={telefone} onChange={(e) => setTelefone(e.target.value)}></InputMask>
                    </div>
                </div>
                <div  className="p-col-4 p-md-4">
                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-id-card"></i>
                        </span>
                        <InputMask id="CNPJ" mask="99.999.999/9999-99" placeholder="00.000.000/0000-00" value={cnpj} onChange={(e) => setCNPJ(e.target.value)} autoComplete="off"></InputMask>
                    </div>
                </div>

                <div className=" flex flex-wrap justify-content-center gap-3 ml-auto">
                    <Button label="Salvar" raised onClick={()=> gravar(history)}/>
                    <Link to="/Paginas/ListaCliente"> 
                        <Button label="Cancelar"  raised className="buton-cancel"/>
                    </Link>
                </div>
            </Panel>
        </div>
    )
}