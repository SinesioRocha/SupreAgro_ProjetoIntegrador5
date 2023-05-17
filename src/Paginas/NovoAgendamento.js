import { useState, useRef } from "react";
import React, { useEffect } from 'react';
import 'primeicons/primeicons.css';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Link, useNavigate } from "react-router-dom";
import { Panel } from 'primereact/panel';
import axios from 'axios';
import { Calendar } from 'primereact/calendar';
import { useHistory } from 'react-router-dom';


export function NovoAgendamento(){
    const [dataAgendada, setDataAgendada] = useState('');
    const [colaborador, setColaborador] = useState(null);
    const [clientes, setclientes] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedOption2, setSelectedOption2] = useState(null);

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
    }
    
    useEffect(()=>{
        obterDados();
    },[])

    const toast = useRef(null);//faz o alesta de salvo com sucesso

    function gravar(){
        console.log("Clicou no gravar");

        const api = axios.create({
            urlBase: "http://localhost:3000",
        })
        //inserindo dados

        api.post("http://localhost:3001/agendamentos", {
            idCliente: selectedOption2,
            idColaborador: selectedOption,
            dataAgendada
        }).then(() => {
            toast.current.show({ severity: 'success', summary: 'Mensagem de sucesso', detail: 'Salvo com sucesso!' });
        }).catch(() => {
            toast.current.show({severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro ao Salvar.'})
        });
    }
    return(
        <div>
            <Toast ref={toast}></Toast>
            <Panel header="Cadastro Novo Agendamento" className="card flex justify-content-center mt-4" >
                <Toast ref={toast}></Toast>
                <div className="p-col-4 p-md-4 calendar-wrapper">
                    <p>Data da Venda:</p>
                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-calendar-plus"></i>
                        </span>
                        <Calendar dateFormat="dd/mm/yy" id="basic" value={dataAgendada} onChange={(e) => setDataAgendada(e.value)} name="dataVenda" required/>
                    </div>
                </div>
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
                <div className=" flex flex-wrap justify-content-center gap-3 ml-auto">
                    <Button label="Salvar" raised onClick={()=> gravar(history)}/>
                    <Link to="/Paginas/Agenda"> 
                        <Button label="Cancelar"  raised className="buton-cancel"/>
                    </Link>
                </div>
            </Panel>
        </div>
    )
}