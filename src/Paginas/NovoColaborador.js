import { useState, useRef } from "react";
import 'primeicons/primeicons.css';
import React, { Component } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Link, useNavigate } from "react-router-dom";
import { Panel } from 'primereact/panel';
import axios from 'axios';

export function NovoColaborador(){  
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [nome, setNome] = useState();
    const [telefone, setTelfone] = useState();

    const options = [
        {
          label: 'Administrador',
          value: 'Administrador',
        },
        {
          label: 'Vendedor',
          value: 'Vendedor',
        },
        {
            label: 'Gerente',
            value: 'Gerente',  
        }
    ];

    const toast = useRef(null);//faz o alesta de salvo com sucesso

    function gravar(){
        console.log("Clicou no gravar");

        const api = axios.create({
            urlBase: "http://localhost:3000",
        })
        //inserindo dados

        api.post(`http://localhost:3001/colaboradores`, {
            nome,
            telefone,
            idPerfil:selectedCategory
           
        }).then(() => {
            toast.current.show({ severity: 'success', summary: 'Mensagem de sucesso', detail: 'Salvo com sucesso!' });
        }).catch(() => {
            toast.current.show({severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro ao Salvar.'})
        });
    }

    return(
        <div>
            <Toast ref={toast}></Toast>
            <Panel header="Cadastro Novo Colaborador" className="card flex justify-content-center mt-4" >
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
                        <InputMask id="Telefone" mask="(999) 99999-9999" placeholder="(999) 99999-9999" value={telefone} onChange={(e) => setTelfone(e.target.value)}></InputMask>
                    </div>
                </div>
                <div className="p-col-4 p-md-4">
                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-align-justify"></i>
                        </span>
                        <Dropdown value={selectedCategory} onChange={(e) => setSelectedCategory(e.value)} options={options} optionLabel="label" 
                            placeholder="Selecione Perfil" className="w-full md:w-14rem" />
                    </div>
                </div>
                <div className=" flex flex-wrap justify-content-center gap-3 ml-auto">
                    <Button label="Salvar" raised onClick={()=> gravar(history)}/>
                    <Link to="/Paginas/ListaColaborador"> 
                        <Button label="Cancelar"  raised className="buton-cancel"/>
                    </Link>
                </div>
            </Panel>
        </div>
    )
}