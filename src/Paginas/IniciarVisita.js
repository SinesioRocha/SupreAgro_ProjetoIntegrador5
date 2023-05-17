import { Panel } from "primereact/panel";
import { Calendar } from 'primereact/calendar';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Toast } from 'primereact/toast';
import { useHistory } from 'react-router-dom';


export function IniciarVisita(){

    const [selectedTime, setSelectedTime] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [agendamentos, setAgendamento] = useState();

    const options = [
        {
          label: 'Em Andamento',
          value: 'Em Andamento',
        }
    ];
    const toast = useRef(null);//faz o alesta de salvo com sucesso

    const {id} = useParams();
    useEffect(() => {
        buscarDetalhes();
        
     }, []);

     const buscarDetalhes = () => {

        const api = axios.create({
          baseURL: "http://localhost:3000"
      });
    
      api.get(`http://localhost:3001/agendamentos/` + id)
      .then((response) =>  {
                        console.log(response.data);   
                        setAgendamento(response.data); 
                    }
      )
      .catch((err) => {
         console.error("erro ao listar");
      }); 
    
      }

    function gravar(){
        console.log("Clicou no gravar");

        const api = axios.create({
            urlBase: "http://localhost:3000",
        })
        //inserindo dados

        api.post(`http://localhost:3001/visita`, {
            dataVisita:selectedDate,
            horaVisita: selectedTime,
            status: 'Em Andamento',
            agendamentos
           
        }).then(() => {
            toast.current.show({ severity: 'success', summary: 'Mensagem de sucesso', detail: 'Salvo com sucesso!' });
        }).catch(() => {
            toast.current.show({severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro ao Salvar.'})
        });
    }
    return(
        <div>
            <Panel header="Inciciando Visita" className="card flex justify-content-center mt-4" >
            <Toast ref={toast}></Toast>
                <div className="p-col-4 p-md-4">
                    Hora de Iinicio da Visita
                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-hourglass"></i>
                        </span>
                        <Calendar value={selectedTime} onChange={(e) => setSelectedTime(e.value)}timeOnly disabled />
                    </div>
                </div>
                <div className="p-col-4 p-md-4">
                    Data da Visita
                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-calendar"></i>
                        </span>
                        <Calendar dateFormat="dd/mm/yy" id="basic" value={selectedDate} onChange={(e) => setSelectedDate(e.value)} name="dataVenda" required disabled />
                    </div>
                </div>  
                <div className="p-col-4 p-md-4">
                Status da Vivita:
                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-align-justify"></i>
                        </span>
                        <Dropdown value={selectedCategory} onChange={(e) => setSelectedCategory(e.value)} options={options} optionLabel="label" 
                            placeholder="Em Andamento   " className="w-full md:w-14rem" disabled/>
                    </div>
                </div>
                <div className=" flex flex-wrap justify-content-center gap-3 ml-auto">
                    <Button label="Iniciar" raised onClick={()=> gravar(history)}/>
                    <Link to="/Paginas/Agenda"> 
                        <Button label="Cancelar"  raised className="buton-cancel"/>
                    </Link>
                </div>
            </Panel>
        </div>
    )
}