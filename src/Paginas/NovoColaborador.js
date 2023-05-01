import { useState, useRef } from "react";
import 'primeicons/primeicons.css';
import React, { Component } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';


export function NovoColaborador(){  
    const [selectedCategory, setSelectedCategory] = useState(null);

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
    const toast = useRef(null);



    return(
        <div className="card flex justify-content-center mt-4" >
            <Toast ref={toast}></Toast>
            <div className="p-col-4 p-md-4">
                <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-user"></i>
                    </span>
                    <InputText placeholder="Nome" />
                </div>
            </div>
            <div  className="p-col-4 p-md-4">
                <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-phone"></i>
                    </span>
                    <InputMask id="Telefone" mask="(999) 99999-9999" placeholder="(999) 99999-9999" ></InputMask>
                </div>
            </div>
            <div  className="p-col-4 p-md-4">
                <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-building"></i>
                    </span>
                    <InputText placeholder="Endreço:" />
                </div>
            </div>
            <div className="p-col-4 p-md-4">
                <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-user"></i>
                    </span>
                    <Dropdown value={selectedCategory} onChange={(e) => setSelectedCategory(e.value)} options={options} optionLabel="label" 
                        placeholder="Select Perfil" className="w-full md:w-14rem" />
                </div>
            </div>
            <div className=" flex flex-wrap justify-content-center gap-3 ml-auto">
                <Button label="Salvar" raised/>
                <Button label="Cancelar"  raised />
            </div>
        </div>
    )
}